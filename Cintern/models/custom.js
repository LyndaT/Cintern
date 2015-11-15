var mongoose = require("mongoose");
var Application = require("../models/application");

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
	isTemplate : { type : Boolean, required : true, immutable : true }
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
 * where newOwnerId is the owner and the state is set to save and isTemplate is
 * set as False, then runs callback on the new Custom copy
 *
 * @param{ObjectId} listingId
 * @param{ObjectId} newOwnerId
 * @param{Function} callback(err, Custom)
 */
customSchema.methods.copyTemplateToSave = function(listingId, newOwnerId, callback) {
	// get the template Custom associated with the listing
	Custom.getListingTemplate(listingId, function(errMsg, custom) {
		if (errMsg) callback(errMsg);
		else if (!custom) callback("No template");
		// create copy
		else createCustom(listingId, custom.questions, newOwnerId, false, "save", callback) 
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
	Custom.find({ "owner" : ownerId }, function(err, customs) {
		if (err) callback(err.message);
		else callback(null, customs);
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
		state : { $in : ["subm", "star "]} 
	}, function(err, customs) {
		if (err) callback(err.message);
		else callback(null, customs);
	});
};

/**
 * Gets the Custom associated with the appId if the owner is the ownerId,
 * then runs the callback on Custom
 * 
 * @param{ObjectId} ownerId
 * @param{ObjectId} customId
 * @param{Function} callback(err, Custom)
 */
customSchema.statics.getCustomIfOwner = function(ownerId, customId, callback) {
	Custom.findOne({ "_id" : customId, "owner" : ownerId }, function(err, custom) {
		if (err) callback(err.message);
		else if (!custom) callback("Invalid Custom");
		else callback(null, custom);
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
customSchema.statics.getCustomForListing = function(ownerId, listingId, callback) {
	Custom.findOne({ 
		"listing" : listingId, 
		"owner" : ownerId, 
		state : { $in : ["subm", "star"] } 
	}, function(err, custom) {
		if (err) callback(err.message);
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
		else callback(null, custom);
	})
};

/**
 * Sets a submitted or starred Custom's state to withdrawn, then runs callback
 *
 * @param{Function} callback(err, Custom)
 */
customSchema.methods.withdraw = function(callback) {
	var startStates = ["subm", "star"];
	var endState = "with";
	changeState(this._id, this.state, startStates, endState, callback);
};

/**
 * Deletes the Custom from the db if the Custom has the saved state, then runs calblack
 *
 * @param{Function} callback(err)
 */
customSchema.methods.deleteCustom = function(callback) {
	if (this.state === "save") {
		var applicationId = this.applicationId;
		// remove the Custom from the DB
		Custom.remove({ "_id" : this._id }, function(err) {
			if (err) callback(err.message);
			// delete the Application associated with the Custom from the DB
			else Application.deleteNotCommonApplication(applicationId, callback);
		});
	}
	else callback("Cannot delete this Custom");
};

/**
 * Sets a submitted Custom's state to starred, then runs callback
 *
 * @param{Function} callback(err, Custom)
 */
customSchema.methods.star = function(callback) {
	var startStates = ["subm"];
	var endState = "star";
	changeState(this._id, this.state, startStates, endState, callback);
};
/**
 * Sets a starred Custom's state to unstar, then runs callback
 *
 * @param{Function} callback(err, Custom)
 */
customSchema.methods.unstar = function(callback) {
	var startStates = ["star"];
	var endState = "subm";
	changeState(this._id, this.state, startStates, endState, callback);
};

/**
 * Sets a submitted or starred Custom's state to rejected, then runs callback
 *
 * @param{Function} callback(err, Custom)
 */
customSchema.methods.reject = function(callback) {
	var startStates = ["subm", "star"];
	var endState = "rej";
	changeState(this._id, this.state, startStates, endState, callback);
};

/**
 * Updates the questions of the Custom to newQuestions if Custom's state is save
 * if isSubmission is true, set state to subm if questions are correctly formatted,
 * then runs the callback on the updated Custom
 * 
 * @param{Array} newQuesions is an Array of Objects
 * @param{Boolean} isSubmission
 * @param{Function} callback(err, Custom)
 */
customSchema.methods.update = function(newQuestions, isSubmission, callback) {
	if (this.state === "save") {
		Application.updateQuestions(this.application, newQuestions, isSubmission, function(errMsg, app) {
			if (errMsg) callback(errMsg);
			else if (!isSubmission) callback(null, this)
			else changeState(this._id, this.state, ["save"], "subm", callback);	
		});
	}
};

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
			Application.createNotCommon(questions, function(errMsg, app) {
				if (errMsg) callback(errMsg);
				else if (!app) callback("No app created");
				else {
					var custom = { 
						"listing" : listingId,
						"application" : app._id,
						"owner" : ownerId,
						"isTemplate" : isTemplate
					};
					if (isTemplate) custom["state"] = state;
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
	questions.forEach(function(question) {
		if (question.answer !== undefined) return false;
	});
	return true;
};

/**
 * If the origState is in startStates, then the Custom associated with customId's
 * state is set to the endState, and the callback is run on the updated Custom
 *
 * @param{ObjectId} customId
 * @param{String} origState is the state of the Custom associated with customId
 * @param{Array} startStates is an Array of Strings that are keys of stateTable
 * @param{String} endState is a String that is a key of stateTable
 * @param{Function} callback(err, Custom)
 */
var changeState = function(customId, origState, startStates, endState, callback) {
	// check if origState is in startStates
	if (startStates.indexOf(origState) > -1) {
		Custom.findOneAndUpdate({ '_id' : customId }, { $set : { state : endState }}, function(err, custom){
			if (err) callback(err.message);
			else callback(null, custom);
		});
	}
	else callback( "Not valid application state change" );
};

var Custom = mongoose.model("Custom", customSchema);
module.exports = Custom;