var mongoose = require("mongoose");

// Application schema definition
var applicationSchema = mongoose.Schema({
	questions : [{
		"question" : { type : String, required : true },
		"type" : { type : String, required : true, enum : [ "form", "list", "box" ] },
		"required" : { type : Boolean, required : true },
		"answer" : { type : String },
		"options" : [{ type : String }],
	}],
	isCommon : { type : Boolean, required: true }
});

/**
 * Creates an Application where questions are set as questions and isCommon is false, 
 * and then runs the callback on the new Application
 *
 * @param{Array} questions is an Array of Objects
 * @param{Function} callback(err, Application)
 */
applicationSchema.statics.createNotCommon = function(questions, callback) {};

/**
 * Creates an Application where questions are set as questions and isCommon is true, 
 * and the questions is a valid submission for commonQuestions, and then runs the 
 * callback on the new Application
 *
 * @param{Array} questions is an Array of Objects
 * @param{Function} callback(err, Application)
 */
applicationSchema.statics.createCommon = function(questions, callback) {};

/**
 * Deletes the application associated with the appId if it's not a common, 
 * and runs the callback
 *
 * @param{ObjectId} appId
 * @param{Function} callback(err)
 */
applicationSchema.statics.deleteApplication = function(appId, callback) {};

/**
 * Sets the application questions to newQuestions and if isSubmission is true
 * checks if application can be submitted and update state appropriately, then 
 * run the callback
 *
 * @param{ObjectId} appId
 * @param{Array} newQuestions is an Array of Objects
 * @param{Boolean} isSubmission
 * @param{Function} callback(err, Application)
 */
applicationSchema.statics.updateQuestions = function(appId, newQuestions, isSubmission, callback) {};

/**
 * Creates an Application where the questions are set to questions and isCommon
 * is set to isCommon, then runs the callback on the new Application
 * 
 * @param{Array} questions is an Array of Objects
 * @param{Boolean} isCommon
 * @param{Function} callback(err, Application)
 */
var createApp = function(questions, isCommon, callback) {};

/**
 * Checks if newQuestions is okay for submission given origQuestions
 * @param{Array} origQuestions is an Array of Objects
 * @param{Array} newQuestions is an Array of Objects
 *
 * @return Boolean that is true if every question in origQuestions matches
 * every every question in newQuestions (with exception to answers) and that
 * every required question has an answer
 */
var verifyForSubmissions = function(origQuestions, newQuestions) {};

/**
 * Checks if newQuestions is okay for updating given origQuestions
 * @param{Array} origQuestions is an Array of Objects
 * @param{Array} newQuestions is an Array of Objects
 *
 * @return Boolean that is true if every question in origQuestions matches
 * every every question in newQuestions (with exception to answers)
 */
var verifyForUpdate = function(origQuestions, newQuestions) {};

var Application = mongoose.model("Application", applicationSchema);
module.exports = Application;