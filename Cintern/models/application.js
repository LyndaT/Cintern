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
});

/**
 * Creates an Application where questions are set as questions, and then runs
 * the callback on the new Application
 *
 * @param{Object} questions
 * @param{Function} callback(err, Application)
 */
applicationSchema.statics.createApplication = function(questions, callback) {}

/**
 * Deletes the application associated with the appId, and runs the callback
 *
 * @param{ObjectId} appId
 * @param{Function} callback(err)
 */
applicationSchema.statics.deleteApplication = function(appId, callback) {}

/**
 * Sets the application questions to newQuestions and if isSubmission is true
 * checks if application can be submitted and update state appropriately, then 
 * run the callback
 *
 * @param{ObjectId} appId
 * @param{Object} newQuestions
 * @param{Boolean} isSubmission
 * @param{Function} callback(err, Application)
 */
applicationSchema.statics.updateQuestions = function(appId, newQuestions, isSubmission, callback) {}

var Application = mongoose.model("Application", applicationSchema);
module.exports = Application;