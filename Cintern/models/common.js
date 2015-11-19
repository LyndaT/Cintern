/**
 * @author Jennifer Wu
 *
 * Common model
 */
var mongoose = require("mongoose");
var _ = require("../helpers/lodash");
var Application = require("../models/application");

// Common schema definition
var commonSchema = mongoose.Schema({
	application : { 
		type : mongoose.Schema.Types.ObjectId, 
		ref: "Application", 
		required : true, 
		immutable : true, 
		unique : true 
	},
	owner : { type : mongoose.Schema.Types.ObjectId, required : true, immutable : true, unique : true }
});

var createQuestion = function(question, type, required, options) {
	var q = { "question" : question, "type" : type, "required" : required }
	if (options !== null) q["options"] = options;
	return q;
};

var commonQuestions = [
	createQuestion("Email", "text", true, null),
	createQuestion("Name", "text", true, null)
];

/**
 * @param{ObjectId} ownerId
 * @param{Function} callback(err, Common);
 */
commonSchema.statics.createCommon = function(ownerId, callback){
	var commonQuestions = [
		createQuestion("Email", "text", true, null),
		createQuestion("Name", "text", true, null)
	];
	Application.createApplication(commonQuestions, function(errMsg, app) {
		if (errMsg) callback(errMsg);
		else if (!app) callback("No app");
		else {
			var common = { 
				"application" : app._id,
				"owner" : ownerId
			};
			var newCommon = new Common(common);

			// save the new app in the DB
			newCommon.save(function(err, newCommon) {
				if (err) callback(err.message);
				else callback(null, newCommon);
			});
		}
	});
};

/**
 * Submits answers for the common application with owner userId, and 
 * runs the callback on a Boolean that is true if the submission was 
 * successful, and false if the submission was not successful
 *
 * @param{ObjectId} userId
 * @param{Array} answers is an Array of Objects with keys that is "id" 
 * 			(mapping to an Object id), and "answer" (mapping to a String)
 * @param{Function} callback(err, Boolean)
 */
commonSchema.statics.submitCommon = function(userId, answers, callback) {
	Common.findOne({ "owner" : userId }, function(err, common) {
		if (err) callback(err.message, false);
		else if (!common) callback("Invalid common", false);
		else {
			Application.updateAnswers(common.application, answers, true, function(errMsg, app) {
				if (errMsg) callback(errMsg, false);
				else if (!app) callback("No application", false);
				else callback(null, true)
			})

		}
	})
}

/**
 * Runs callback on the Common with the owner that is ownerId
 *
 * @param{ObjectId} ownerId
 * @param{Function} callback(err, Common)
 */
commonSchema.statics.getCommonByOwnerId = function(ownerId, callback) {
	Common.findOne({ "owner" : ownerId }, function(Err, common) {
		if (err) callback(err.message);
		else if (!common) callback("Invalid common");
		else callback(null, common);
	});
};

/**
 * Runs a callback on a Common Object whose application has been populated
 *
 * @param{Function} callback(err, Common) where Common has been populated
 */
commonSchema.methods.populateCommon = function(callback) {
	Application.populate(this, { path : 'application' }, function(err, common) {
		if (err) callback(err.message);
		else if (!common) callback("Invalid common");
		else callback(null, common);
	})
}

var Common = mongoose.model("Common", commonSchema);
module.exports = Common;

