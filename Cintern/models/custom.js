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
var customSchema = mongoose.Schema({
	listing : { type : mongoose.Schema.Types.ObjectId, ref: "Listing" },
	state : { type: String, enum : Object.keys(stateTable), required : true },
	application : { type : mongoose.Schema.Types.ObjectId, ref: "Application" )}
});

/**
 * Gets all the custom applications where the userId is the owner in the format
 * so that they can be used to generate the student dash; then calls the callback
 *
 * @param{ObjectId} userId
 * @param{Function} callback(err, [Application])
 */
customSchema.statics.getAllCustomsForStudDash = function(userId, callback) {}

/**
 * Gets all the submitted or starred custom applications where the listingId is the 
 * listing in the format so that they can be used to generate the listing dash; 
 * then calls the callback on the applications
 *
 * @param{ObjectId} listingId
 * @param{Function} callback(err, [Application])
 */
customSchema.statics.getAllCustomsForListingDash = function(listinId, callback) {}

/**
 * Gets the application associated with the appId if the owner is the userId,
 * then runs the callback
 * 
 * @param{ObjectId} userId
 * @param{ObjectId} appId
 * @param{Function} callback(err, Application)
 */`
customSchema.statics.getCustomIfOwner = function(userId, customId) {}


/**
 * Gets a submitted custom application, where the owner is the userId and
 * the listing is the listingId, then runs callback on the submitted custom application
 *
 * @param{ObjectId} userId
 * @param{ObjectId} listingId
 * @param{Function} callback(err, Application)
 */
customSchema.statics.getSubmittedCustomAppForListing = function(userId, listingId, callback) {}

/**
 * Creates a template with listing set as listingId, questions set as questions
 * owner is userId, then runs the callback on the template application
 *
 * @param{ObjectId} listingId
 * @param{Object} questions
 * @param{ObjectId} userId
 * @param{Function} callback(err, Application)
 */
customSchema.statics.createTemplate = function(listingId, questions, userId, callback) {}

/**
 * Creates a new copy of the application where userId is the owner, then runs callback
 *
 * @param{ObjectId} userId
 * @param{Function} callback(err, application)
 */
customSchema.methods.copyTemplate = function(userId, callback) {}

/**
 */
customSchema.statics.getListingTemplate = function(listingId, callback) {}

/**
 * Sets a submitted or starred application's state to withdrawn, then runs callback
 *
 * @param{Function} callback(err, application)
 */
customSchema.methods.withdraw = function(callback) {}

/**
 * Deletes the application from the db if the application has the saved state,
 * then runs callback
 *
 * @param{Function} callback(err)
 */
customSchema.methods.delete = function(callback) {}

/**
 * Sets a submitted application's state to starred, then runs callback
 *
 * @param{Function} callback(err, application)
 */
customSchema.methods.star = function(callback) {}

/**
 * Sets a starred application's state to unstar, then runs callback
 *
 * @param{Function} callback(err, application)
 */
customSchema.methods.unstar = function(callback) {}

/**
 * Sets a submitted or starred application's state to rejected, thne runs callback
 *
 * @param{Function} callback(err, application)
 */
customSchema.methods.reject = function(callback) {}

/**
 *
 */
customSchema.methods.update = function(newQuestions, isSubmission, callback) {}

