/**
 * @author Jennifer Wu
 *
 * Custom model
 */
var mongoose = require("mongoose");
var Application = require("../models/application");
var Listing = require ("../models/listing");
var User = require("../models/User");
var Employer = require("../models/Employer");

var stateTable = {
	"save" : "saved",
	"subm" : "submitted",
	"star" : "starred",
	"rej" : "rejected",
	"with" : "withdrawn",
}

// Custom schema definition
var customSchema = mongoose.Schema({
	listing : { type : mongoose.Schema.Types.ObjectId, ref: "Listing", required: true, immutable : true },
	state : { type: String, enum : Object.keys(stateTable) },
	application : { type : mongoose.Schema.Types.ObjectId, ref: "Application", required : true, immutable : true, unique : true },
	owner : { type : mongoose.Schema.Types.ObjectId, ref : "User", required : true, immutable : true },
	isTemplate : { type : Boolean, required : true, immutable : true },
	submitTime : { type : Date }
});

/**
 * Checks that if the Custom is a template, it does not have a state, and that
 * if the Custom is not a template, it has a state
 */
customSchema.pre("save", function(next) {
	if (this.isTemplate && this.state !== undefined) next(new Error("Invalid template save"));
	if (!this.isTemplate && this.state === undefined) next(new Error("Invalid nontemplate save"));
	next();
});

/**
 * Creates a Custom with listing set as listingId, questions set as questions
 * owner set as ownerId and state set as temp, then runs the callback on the 
 * template Custom
 *
 * @param{ObjectId} listingId
 * @param{Array} questions is an Array of Objects
 * @param{ObjectId} ownerId
 * @param{Function} callback(err, Custom)
 */
customSchema.statics.createTemplate = function(listingId, questions, ownerId, callback) {
	if (noAnswerInQuestions(questions)) createCustom(listingId, questions, ownerId, true, null, callback);	
	else callback("Invalid questions for template");
};


/**
 * Creates a new copy of the custom template associatd with the listingId,
 * where newOwnerId is the owner so long as there is not already a Custom with 
 * listing set as listingId and owner set as newOwnerId; the new custom's
 * state is set to save and isTemplate is set as False, then runs callback on 
 * the new Custom copy
 *
 * @param{ObjectId} listingId
 * @param{ObjectId} newOwnerId
 * @param{Function} callback(err, Custom)
 */
customSchema.statics.copyTemplateToSave = function(listingId, newOwnerId, callback) {
	// check that the newOwner does not already have a custom with the associated listing
	Custom.find({ "owner" : newOwnerId, "listing" : listingId }, function(err, customs) {

		if (err) callback(err.message);
		else if (customs.length > 0) callback("Already have a this listing");
		else {
			// get the template Custom associated with the listing
			Custom.getListingTemplate(listingId, function(errMsg, custom) {

				if (errMsg) callback(errMsg);
				else if (!custom) callback("No template");
				// create copy
				else {
					// get questions in the proper format to run createCustom
					Application.formatForShow(custom.application, function(errMsg, formattedQuestions) {

						if (errMsg) callback(errMsg);
						else {
							var formatForCreate = [];
							formattedQuestions.forEach(function(question) {
								formatForCreate.push({
									"question" : question.question,
									"options" : question.options,
									"type" : question.type,
									"required" : question.required,
								});
							});
							createCustom(listingId, formatForCreate, newOwnerId, false, "save", callback);
						}
					})
				}
			})
		}
	})
};

/**
 * Gets all the Customs where the ownerId is the owner in the format so that they 
 * can be used to generate the student dash; then calls the callback on the Customs
 *
 * @param{ObjectId} ownerId
 * @param{Function} callback(err, [Custom])
 */
customSchema.statics.getCustomsForStudentDash = function(ownerId, callback) {
	Custom.find({ "owner" : ownerId }).populate("owner").populate("listing").exec(function(err, customs) {
		//console.log(customs);
	});

	Custom.find({ "owner" : ownerId })
		.populate("owner")
		.populate("listing")
		.exec(function(err, customs) {
		if (err) callback(err.message);
		else {
			Custom.populate(customs, {
				path: "listing.employerId",
				model: "Employer"
			},
			function(err, populated_customs) {
				if (err) callback(err.message);
				else callback(null, customs);
			});
		}
	});
};

/**
 * Gets all the submitted or starred Customs where the listingId is the 
 * listing in the format so that they can be used to generate the listing dash; 
 * then calls the callback on the Customs
 *
 * @param{ObjectId} listingId
 * @param{Function} callback(err, [Custom])
 */
customSchema.statics.getCustomsForListingDash = function(listingId, callback) {
	Custom.find({
		"listing" : listingId, 
		"state" : { $in : ["subm", "star"]} 
	}).populate("owner").exec(function(err, customs) {
		if (err) callback(err.message);
		else callback(null, customs);
	});
};

/**
 * Runs callback on the Custom that has owner that is ownerId and has
 * the ID customId
 * 
 * @param{ObjectId} ownerId
 * @param{ObjectId} customId
 * @param{Function} callback(err, Custom)
 */
customSchema.statics.getIfOwner = function(ownerId, customId, callback) {
	Custom.findOne({ "_id" : customId, "owner" : ownerId }, function(err, custom) {
		if (err) callback(err.message);
		else if (!custom) callback("Invalid request");
		else {
			callback(null, custom);
		}
	});
};

/**
 * Gets a submitted or starred Custom, where the owner is the ownerId and the listing 
 * is the listingId, then runs callback on the submitted Custom
 *
 * @param{ObjectId} ownerId
 * @param{ObjectId} listingId
 * @param{Function} callback(err, Custom)
 */
customSchema.statics.getStarOrSubmCustomForListing = function(ownerId, listingId, callback) {
	Custom.findOne({ 
		"listing" : listingId, 
		"owner" : ownerId, 
		state : { $in : ["subm", "star"] } 
	}, function(err, custom) {
		if (err) callback(err.message);
		else if (!custom) callback("Invalid custom");
		else callback(null, custom);
	});
};

/**
 * Gets the template Custom where the state is temp and the listing is listingId
 *
 * @param{ObjectId} listingId
 * @param{Function} callback(err, Custom)
 */
customSchema.statics.getListingTemplate = function(listingId, callback) {
	Custom.findOne({ "listing" : listingId, "isTemplate" : true }, function(err, custom) {
		if (err) callback(err.message);
		else if (!custom) callback("Invalid custom");
		else callback(null, custom);
	})
};

/**
 * Gets the Custom where the owner is ownerId and the listing is listingId and run
 * the callback on the Custom; if isStudent is not true, however, only run the callback
 * if the Custom is in state "subm" or "save"
 *
 * @param{ObjectId} ownerId
 * @param{ObjectId} listingId
 * @param{Boolean} isStudent
 * @param{Funciton} callback(err, Custom)
 */
customSchema.statics.getByOwnerAndListing = function(ownerId, listingId, isStudent, callback) {
	Custom.findOne({ "listing" : listingId, "owner" : ownerId }, function(err, custom) {
		if (err) callback(err.message);
		else if (!custom) callback("Invalid custom");
		else if (isStudent) callback(null, custom);
		else {
			if (custom.state === "subm" || custom.state === "star") callback(null, custom);
			else callback("Invalid custom");
		}
	});
};

/**
 * Sets a submitted or starred Custom's state to withdrawn, then runs callback
 *
 * @param{ObjectId} customId
 * @param{Function} callback(err, Custom)
 */
customSchema.statics.withdraw = function(customId, callback) {
	var startStates = ["subm", "star"];
	var endState = "with";
	changeState(customId, startStates, endState, callback);
};

/**
 * Deletes the Custom from the db if the Custom has the saved state, then runs calblack
 *
 * @param{ObjectId} customId
 * @param{Function} callback(err)
 */
customSchema.statics.deleteCustom = function(customId, callback) {
	Custom.findOne({ "_id" : customId, "state" : "save" }, function(err, custom) {
		if (err) callback(err.message);
		else if (!custom) callback("Invalid custom");
		else {
			var applicationId = custom.applicationId;
			// remove the Custom from the DB
			Custom.remove({ "_id" : custom._id }, function(err) {
				if (err) callback(err.message);
				// delete the Application associated with the Custom from the DB
				else Application.deleteApplication(applicationId, callback);
			});
		}
	});
};

/**
 * Sets a submitted Custom's state to starred, then runs callback
 *
 * @param{ObjectId} customId
 * @param{Function} callback(err, Custom)
 */
customSchema.statics.star = function(customId, callback) {
	var startStates = ["subm"];
	var endState = "star";
	changeState(customId, startStates, endState, callback);
};
/**
 * Sets a starred Custom's state to unstar, then runs callback
 *
 * @param{ObjectId} customId
 * @param{Function} callback(err, Custom)
 */
customSchema.statics.unstar = function(customId, callback) {
	var startStates = ["star"];
	var endState = "subm";
	changeState(customId, startStates, endState, callback);
};

/**
 * Sets a submitted or starred Custom's state to rejected, then runs callback
 *
 * @param{ObjectId} customId
 * @param{Function} callback(err, Custom)
 */
customSchema.statics.reject = function(customId, callback) {
	var startStates = ["subm", "star"];
	var endState = "rej";
	changeState(customId, startStates, endState, callback);
};

/**
 * Updates the questions of the Custom to answers if Custom's state is save
 * if isSubmission is true, set state to subm if questions are correctly formatted,
 * then runs the callback on the updated Custom
 * 
 * @param{ObjectId} customId
 * @param{Array} answers is an Array of Objects with keys that is "id" 
 * 			(mapping to an Object id), and "answer" (mapping to a String)
 * @param{Boolean} isSubmission
 * @param{Function} callback(err, Custom)
 */
customSchema.statics.update = function(customId, answers, isSubmission, callback) {
	Custom.findOne({ "_id" : customId, "state" : "save" }, function(err, custom) {
		if (err) callback(err.message);
		else if (!custom) callback("Invalid custom");
		else {
			Application.updateAnswers(custom.application, answers, isSubmission, function(errMsg, app) {
				if (errMsg) callback(errMsg);
				else if (!isSubmission) callback(null, custom)
				else {
					changeState(custom._id, ["save"], "subm", function(errMsg, custom) {
						if (errMsg) callback(errMsg);
						else if (!custom) callback("Invalid state change");
						else { 
							// finding to get the actual updated version of Custom (we found that
							// the custom in the callback of findOneAndUpdate isn't updated yet)
							Custom.findOneAndUpdate({ "_id" : custom._id }, { $set : { submitTime : new Date() } }, function(err, custom) {
								if (err) callback(err.message);
								else callback(null, custom);
							});
						}
					});
				}
			});
		}
	});
};


/*customSchema.methods.formatForShow = function(callback) {
	Application.formatForShow(this.application, function(errMsg, formattedApp) {
		if (errMsg) callback(errMsg);
		else { 
			var formattedCustom = {

				"application" : formattedApp,
				"state" : state,
				"submitTime" : submitTime
			}
		}
	});
};*/


/**
 * Creates a new Custom in the DB with listing set as listingId, state set as state, 
 * owner set as ownerId, and application set as an application with questions set as
 * questions, then runs the callback on the new Custom
 *
 * @param{ObjectId} listingId
 * @param{Object} questions
 * @param{ObjectId} ownerId
 * @param{String} state
 * @param{Function} callback(err, Custom)
 */
var createCustom = function(listingId, questions, ownerId, isTemplate, state, callback) {
	// checks that there are no Customs already where listing is listingId and owner is ownerId
	Custom.findOne({ "listing" : listingId, "owner" : ownerId }, function(err, custom) {
		if (err) callback(err.message);
		else if (custom) callback("Already exists a Custom for the listing and owner");
		else {
			// create the Application for the application field
			Application.createApplication(questions, function(errMsg, app) {
				if (errMsg) callback(errMsg);
				else if (!app) callback("No app created");
				else {
					var custom = { 
						"listing" : listingId,
						"application" : app._id,
						"owner" : ownerId,
						"isTemplate" : isTemplate,
					};
					if (!isTemplate) custom["state"] = state;
					var newCustom = new Custom(custom);

					// save the new custom in the DB
					newCustom.save(function(err, newCustom) {
						if (err) callback(err.message);
						else callback(null, newCustom);
					});
				}
			});
		}
	});
};

/**
 * @param{Array} questions is an Array of Objects
 *
 * @return Boolean that is true if each Object in questions does not have
 * the answer field, and false otherwise
 */
var noAnswerInQuestions = function(questions) {
	var noAnswers = true;
	questions.forEach(function(question) {
		if (question.answer !== undefined) noAnswers = false;
	});
	return noAnswers;
};

/**
 * If the Custom's state is in startStates, then the Custom associated with customId's
 * state is set to the endState, and the callback is run on the updated Custom
 *
 * @param{ObjectId} customId
 * @param{Array} startStates is an Array of Strings that are keys of stateTable
 * @param{String} endState is a String that is a key of stateTable
 * @param{Function} callback(err, Custom)
 */
var changeState = function(customId, startStates, endState, callback) {
	Custom.findOne({ "_id" : customId }, function(err, custom) {
		if (err) callback(err.message);
		else if (!custom) callback("Invalid custom");
		else {
			if (startStates.indexOf(custom.state) > -1) {
				Custom.findOneAndUpdate({ '_id' : customId }, { $set : { "state" : endState }}, function(err, custom){
					if (err) callback(err.message);
					else if (!custom) callback("Invalid");
					else {
						Custom.findOne({ '_id' : customId }, function(err, custom) {
							if (err) callback(err.message);
							else callback(null, custom);
						});
					}
				});
			}
			else callback("Not valid application state change");
		}
	});
};

/**
 * Runs a callback on a Custom Object whose listing, owner, and application
 * have been populated 
 *
 * @param{Function} callback(err, Custom) where Custom has been populated
 */
customSchema.methods.populateCustom = function(callback) {
	Listing.populate(this, { path : 'listing' }, function(err, custom) {
		if (err) callback(err.message);
		else if (!custom) callback("Invalid custom");
		else {
			User.populate(custom, { path : 'owner' }, function(err, custom) {
				if (err) callback(err.message);
				else if (!custom) callback("Invalid custom");
				else {
					Application.populate(custom, { path : 'application' }, function(err, custom) {
						if (err) callback(err.message);
						else if (!custom) callback("Invalid custom");
						else {
							callback(null, custom);
						}
					});
				}
			});
		}
	});
}

var Custom = mongoose.model("Custom", customSchema);
module.exports = Custom;
