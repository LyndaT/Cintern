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
	listing : { type : mongoose.Schema.Types.ObjectId, ref: "Listing" },
	state : { type: String, enum : Object.keys(stateTable) },
	application : { type : mongoose.Schema.Types.ObjectId, ref: "Application" },
	owner : { type : mongoose.Schema.Types.ObjectId, ref : "User", required : true, immutable : true },
	isTemplate : { type : Boolean, required : true }
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
customSchema.statics.createTemplate = function(listingId, questions, ownerId, callback) {};

/**
 * Creates a new copy of the custom template associatd with the listingId,
 * where newOwnerId is the owner and the state is set to save and isTemplate is
 * set as False, then runs callback on the new Custom copy
 *
 * @param{ObjectId} listingId
 * @param{ObjectId} newOwnerId
 * @param{Function} callback(err, Custom)
 */
customSchema.methods.copyTemplateToSave = function(listingId, newOwnerId, callback) {};

/**
 * Gets all the Customs where the ownerId is the owner in the format so that they 
 * can be used to generate the student dash; then calls the callback on the Customs
 *
 * @param{ObjectId} ownerId
 * @param{Function} callback(err, [Custom])
 */
customSchema.statics.getCustomsForStudentDash = function(ownerId, callback) {};

/**
 * Gets all the submitted or starred Customs where the listingId is the 
 * listing in the format so that they can be used to generate the listing dash; 
 * then calls the callback on the Customs
 *
 * @param{ObjectId} listingId
 * @param{Function} callback(err, [Custom])
 */
customSchema.statics.getCustomsForListingDash = function(listingId, callback) {};

/**
 * Gets the Custom associated with the appId if the owner is the ownerId,
 * then runs the callback on Custom
 * 
 * @param{ObjectId} ownerId
 * @param{ObjectId} customId
 * @param{Function} callback(err, Custom)
 */
customSchema.statics.getCustomIfOwner = function(ownerId, customId, callback) {};

/**
 * Gets a submitted or starred Custom, where the owner is the ownerId and the listing 
 * is the listingId, then runs callback on the submitted Custom
 *
 * @param{ObjectId} ownerId
 * @param{ObjectId} listingId
 * @param{Function} callback(err, Custom)
 */
customSchema.statics.getCustomForListing = function(ownerId, listingId, callback) {};

/**
 * Gets the template Custom where the state is temp and the listing is listingId
 *
 * @param{ObjectId} listingId
 * @param{Function} callback(err, Custom)
 */
customSchema.statics.getListingTemplate = function(listingId, callback) {};

/**
 * Sets a submitted or starred Custom's state to withdrawn, then runs callback
 *
 * @param{Function} callback(err, Custom)
 */
customSchema.methods.withdraw = function(callback) {};
/**
 * Deletes the Custom from the db if the Custom has the saved state, then runs calblack
 *
 * @param{Function} callback(err)
 */
customSchema.methods.deleteCustom = function(callback) {};

/**
 * Sets a submitted Custom's state to starred, then runs callback
 *
 * @param{Function} callback(err, Custom)
 */
customSchema.methods.star = function(callback) {};
/**
 * Sets a starred Custom's state to unstar, then runs callback
 *
 * @param{Function} callback(err, Custom)
 */
customSchema.methods.unstar = function(callback) {};

/**
 * Sets a submitted or starred Custom's state to rejected, then runs callback
 *
 * @param{Function} callback(err, Custom)
 */
customSchema.methods.reject = function(callback) {};

/**
 * Updates the questions of the Custom to have the answers in answers if 
 * Custom's state is save; if isSubmission is true, set state to subm if 
 * questions are correctly formatted, then runs the callback on the updated Custom
 * 
 * @param{Array} answers is an Array of Objects with keys that is "id" 
 * 			(mapping to an Object id), and "answer" (mapping to a String)
 * @param{Boolean} isSubmission
 * @param{Function} callback(err, Custom)
 */
customSchema.methods.update = function(answers, isSubmission, callback) {};

/**
 * @param{Array} questions is an Array of Objects
 *
 * @return Boolean that is true if each Object in questions does not have
 * the answer field, and false otherwise
 */
var noAnswerInQuestions = function(questions) {};

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
var changeState = function(customId, origState, startStates, endState, callback) {};

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
var createCustom = function(listingId, questions, ownerId, isTemplate, state, callback) {};

var Custom = mongoose.model("Custom", customSchema);
module.exports = Custom;