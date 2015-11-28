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

// maps a header to the question
// constraints: no two keys can be the same, and no key can be "owner"
var applicantHeaderInfo = {
	"Email" : "Email",
	"Name": "Name", 
	"University": "University"
};

var commonQuestions = [
	createQuestion(applicantHeaderInfo.Email, "text", true, null),
	createQuestion(applicantHeaderInfo.Name, "text", true, null),
	createQuestion(applicantHeaderInfo.University, "dropdown", true, ["Harvard", "MIT", "Caltech"]),
	//createQuestion("Are you eligible to work in the US", "check", true, null),
];

/**
 * Return the headers for the applicant listing page
 *
 * @param{callback} callback(err, headers)
 */
commonSchema.statics.getHeadersForApplicantList = function() {
	return Object.keys(applicantHeaderInfo);
};

/**
 * Returns common app info for each user specified in the given
 * list of user IDs
 *
 * @param{userIds} a list of user IDs
 * @param{callback} callback(err, commons)
 */
commonSchema.statics.getCommonInfoForApplicantDisplay = function(userIds, callback) {
	var info = [];

	Common.find({ 'owner': { $in: userIds } }).populate("application").exec(function(err, commons) {
		if (err) callback(err.message);
		else if (!commons) callback("Invalid user");
		else {
			// for each common, get the information for the headers supplied in applicantHeader Info
			commons.forEach(function(common) {
				var questions = common.application.questions;
				var commonInfo = {};

				forEachKey(applicantHeaderInfo, function(header) {
					questions.forEach(function(question) {
						if (applicantHeaderInfo[header] === question.question) {
							commonInfo[header] = question.answer;
						}
					});
				});

				commonInfo["owner"] = common.owner;

				info.push(commonInfo);
			});

			callback(null, info);
		}
	});
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

