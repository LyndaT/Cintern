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
	owner : { type : mongoose.Schema.Types.ObjectId, ref : "User", required : true, immutable : true },
});

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