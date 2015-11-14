var mongoose = require("mongoose");

var stateTable = {
	"temp" : "template",
	"save" : "saved",
	"subm" : "submitted",
	"star" : "starred",
	"rej" : "rejected",
	"with" : "withdrawn",
}

// Application schema definition
var customSchema = mongoose.Schema({
	listing : { type : mongoose.Schema.Types.ObjectId, ref: "Listing" },
	state : { type: String, enum : Object.keys(stateTable), required : true },
	application : { type : mongoose.Schema.Types.ObjectId, ref: "Application" },
	owner : { type : mongoose.Schema.Types.ObjectId, ref : "User", required : true, immutable : true },
});

/**
 * Gets all the Customs where the userId is the owner in the format so that they 
 * can be used to generate the student dash; then calls the callback on the Customs
 *
 * @param{ObjectId} userId
 * @param{Function} callback(err, [Custom])
 */
customSchema.statics.getCustomsForStudentDash = function(userId, callback) {}

/**
 * Gets all the submitted or starred Customs where the listingId is the 
 * listing in the format so that they can be used to generate the listing dash; 
 * then calls the callback on the Customs
 *
 * @param{ObjectId} listingId
 * @param{Function} callback(err, [Custom])
 */
customSchema.statics.getCustomsForListingDash = function(listingId, callback) {}

/**
 * Gets the Custom associated with the appId if the owner is the userId,
 * then runs the callback on Custom
 * 
 * @param{ObjectId} userId
 * @param{ObjectId} customId
 * @param{Function} callback(err, Custom)
 */
customSchema.statics.getCustomIfOwner = function(userId, customId, callback) {}

/**
 * Gets a submitted or starred Custom, where the owner is the userId and the listing 
 * is the listingId, then runs callback on the submitted Custom
 *
 * @param{ObjectId} userId
 * @param{ObjectId} listingId
 * @param{Function} callback(err, Custom)
 */
customSchema.statics.getCustomForListing = function(userId, listingId, callback) {}

/**
 * Creates a Custom with listing set as listingId, questions set as questions
 * owner set as userId and state set as temp, then runs the callback on the template Custom
 *
 * @param{ObjectId} listingId
 * @param{Object} questions
 * @param{ObjectId} userId
 * @param{Function} callback(err, Custom)
 */
customSchema.statics.createTemplate = function(listingId, questions, userId, callback) {}

/**
 * Gets the template Custom where the state is temp and the listing is listingId
 *
 * @param{ObjectId} listingId
 * @param{Function} callback(err, Custom)
 */
customSchema.statics.getListingTemplate = function(listingId, callback) {}

/**
 * Creates a new copy of the Custom where userId is the owner, then runs callback
 * on the new Custom copy
 *
 * @param{ObjectId} userId
 * @param{Function} callback(err, Custom)
 */
customSchema.methods.copyTemplate = function(userId, callback) {}

/**
 * Sets a submitted or starred Custom's state to withdrawn, then runs callback
 *
 * @param{Function} callback(err, Custom)
 */
customSchema.methods.withdraw = function(callback) {}

/**
 * Deletes the Custom from the db if the Custom has the saved state, then runs calblack
 *
 * @param{Function} callback(err)
 */
customSchema.methods.delete = function(callback) {}

/**
 * Sets a submitted Custom's state to starred, then runs callback
 *
 * @param{Function} callback(err, Custom)
 */
customSchema.methods.star = function(callback) {}

/**
 * Sets a starred Custom's state to unstar, then runs callback
 *
 * @param{Function} callback(err, Custom)
 */
customSchema.methods.unstar = function(callback) {}

/**
 * Sets a submitted or starred Custom's state to rejected, then runs callback
 *
 * @param{Function} callback(err, Custom)
 */
customSchema.methods.reject = function(callback) {}

/**
 * Updates the questions of the Custom to newQuestions if Custom's state is save
 * if isSubmission is true, set state to subm if questions are correctly formatted,
 * then runs the callback on the updated Custom
 * 
 * @param{Object} newQuesions
 * @param{Boolean} isSubmission
 * @param{Function} callback(err, Custom)
 */
customSchema.methods.update = function(newQuestions, isSubmission, callback) {}

