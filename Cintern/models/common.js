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

var applicantInfo = {
	email: "Email",
	name: "Name", 
	university: "University"
};

var commonQuestions = [
	createQuestion(applicantInfo.email, "text", true, null),
	createQuestion(applicantInfo.name, "text", true, null),
	createQuestion(applicantInfo.university, "dropdown", true, ["Harvard", "MIT", "Caltech"]),
	//createQuestion("Are you eligible to work in the US", "check", true, null),
];

/**
 * Return the headers for the applicant listing page
 *
 * @param{callback} callback(err, headers)
 */
commonSchema.statics.getHeadersForApplicantList = function() {
	var headers = [];

	forEachKey(applicantInfo, function(header) {
		headers.push(applicantInfo[header]);
	});

	return headers;
};

/**
 * Returns common app info for each user specified in the given
 * list of user IDs
 *
 * @param{userIds} a list of user IDs
 * @param{callback} callback(err, commons)
 */
commonSchema.statics.getCommonsForApplicantDisplay = function(userIds, callback) {
	var applicantInfo = [];

	Common.find({ 'owner': { $in: userIds } }).populate("application").exec(function(err, commons) {
		if (err) callback(err.message);
		else if (!commons) callback("Invalid user");
		else {
			commons.forEach(function(common) {
				var questions = common.application.questions;
				var commonInfo = [];

				forEachKey(applicantInfo, function(header) {
					questions.forEach(function(question) {
						if (applicantInfo[header] === question.question) {
							commonInfo.push(question.answer);
						}
					});
				});

				applicantInfo.push(commonInfo);
			});
		}
	});

	return applicantInfo;
};

/**
 * @param{ObjectId} ownerId
 * @param{Function} callback(err, Common);
 */
commonSchema.statics.createCommon = function(ownerId, callback){
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
	Common.findOne({ "owner" : ownerId }, function(err, common) {
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

var forEachKey = function(obj, fn) {
  Object.keys(obj).forEach(function(key) {
    if (obj.hasOwnProperty(key)) {
      fn(key);
    }
  });
};

var Common = mongoose.model("Common", commonSchema);
module.exports = Common;

