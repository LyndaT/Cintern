// SHOULD APPLICATIONSCHEMA HAVE THE CHECK FOR WHO CAN CALL THE FUNCTIONS?
// SHOULD APPLICATIONSCHEMA HAVE THE CHECK FOR WHO CAN CALL THE FUNCTIONS?

var mongoose = require("mongoose");

var stateTable = {
	"temp" : "template",
	"save" : "saved",
	"subm" : "submitted",
	"star" : "starred",
	"rej" : "rejected",
	"with" : "withdrawn",
	"comm" : "common",
}

// Application schema definition
var applicationSchema = mongoose.Schema({
	listing : { type : mongoose.Schema.Types.ObjectId, ref: "Listing" },
	state : { type: String, enum : Object.keys(stateTable), required : true },
	questions : [{
		"question" : { type : String, required : true },
		"type" : { type : String, required : true, enum : [ "form", "list", "box" ] },
		"required" : { type : Boolean, required : true },
		"answer" : { type : String },
		"options" : [{ type : String }],
	}],
	owner : { type : mongoose.Schema.Types.ObjectId, ref : "User", required : true, immutable : true },
});

/** 
 * Submits a common application for the user with questions that are
 * questions; then calls the callback
 *
 * @param{Object} questions 
 * @param{ObjectId} userId
 * @param{Function} callback(err, Application)
 */
applicationSchema.statics.submitCommon = function(questions, userId, callback) {}

/**
 * Gets all the custom applications where the userId is the owner in the format
 * so that they can be used to generate the student dash; then calls the callback
 *
 * @param{ObjectId} userId
 * @param{Function} callback(err, [Application])
 */
applicationSchema.statics.getAllCustomsForStudDash = function(userId, callback) {}

/**
 * Gets all the submitted or starred custom applications where the listingId is the 
 * listing in the format so that they can be used to generate the listing dash; 
 * then calls the callback on the applications
 *
 * @param{ObjectId} listingId
 * @param{Function} callback(err, [Application])
 */
applicationSchema.statics.getAllCustomsForListingDash = function(listinId, callback) {}

/**
 * Gets the application associated with the appId if the owner is the userId,
 * then runs the callback
 * 
 * @param{ObjectId} userId
 * @param{ObjectId} appId
 * @param{Function} callback(err, Application)
 */
applicationSchema.statics.getAppIfOwner = function(userId, appId) {}

/**
 * Sets the application questions to newQuestions and if isSubmission is true
 * checks if application can be submitted and update state appropriately, then 
 * run the callback
 *
 * @param{Object} newQuestions
 * @param{Boolean} isSubmission
 * @param{Function} callback(err, Application)
 */
applicationSchema.methods.updateQuestions = function(newQuestions, isSubmission, callback) {}

/**
 * Gets the common app associated with the userId, then runs the callback
 *
 * @param{ObjectId} userId
 * @param{Function} callback(err, Application) 
 */
applicationSchema.statics.getCommonApp = function(userId, callback) {}

/**
 * Gets all the common apps where the owners are from userIds, then runs callback
 * on the array of common apps
 * 
 * @param{Array} userIds is an array of ObjectIds
 * @param{Function} callback(err, [Application])
 */
applicationSchema.statics.getCommons = function(userIds, callback) {}


/**
 * Gets a submitted custom application, where the owner is the userId and
 * the listing is the listingId, then runs callback on the submitted custom application
 *
 * @param{ObjectId} userId
 * @param{ObjectId} listingId
 * @param{Function} callback(err, Application)
 */
applicationSchema.statics.getSubmittedCustomAppForListing = function(userId, listingId, callback) {}

/**
 * Creates a template with listing set as listingId, questions set as questions
 * owner is userId, then runs the callback on the template application
 *
 * @param{ObjectId} listingId
 * @param{Object} questions
 * @param{ObjectId} userId
 * @param{Function} callback(err, Application)
 */
applicationSchema.statics.createTemplate = function(listingId, questions, userId, callback) {}

/**
 * Creates a new copy of the application where userId is the owner, then runs callback
 *
 * @param{ObjectId} userId
 * @param{Function} callback(err, application)
 */
applicationSchema.methods.copyTemplate = function(userId, callback) {}

/**
 * Sets a submitted or starred application's state to withdrawn, then runs callback
 *
 * @param{Function} callback(err, application)
 */
applicationSchema.methods.withdraw = function(callback) {}

/**
 * Deletes the application from the db if the application has the saved state,
 * then runs callback
 *
 * @param{Function} callback(err)
 */
applicationSchema.methods.delete = function(callback) {}

/**
 * Sets a submitted application's state to starred, then runs callback
 *
 * @param{Function} callback(err, application)
 */
applicationSchema.methods.star = function(callback) {}

/**
 * Sets a starred application's state to unstar, then runs callback
 *
 * @param{Function} callback(err, application)
 */
applicationSchema.methods.unstar = function(callback) {}

/**
 * Sets a submitted or starred application's state to rejected, thne runs callback
 *
 * @param{Function} callback(err, application)
 */
applicationSchema.methods.reject = function(callback) {}



application.statics.getListingTemplate = function(listing, callback) {
	Application.findOne({ "listing" : listing, "state" : "temp" }, function(err, app) {
		if (err) callback(err.message);
		else if (!app) callback("Invalid listing");
		else callback(null, app);
	})
}

var Application = mongoose.model("Application", applicationSchema);
module.exports = Application;