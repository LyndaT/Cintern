var mongoose = require("mongoose");
var _ = require("../helpers/lodash");

// Application schema definition
var applicationSchema = mongoose.Schema({
	questions : [{
		"question" : { type : String, required : true },
		"type" : { type : String, required : true, enum : [ "text", "radio", "check" ] },
		"required" : { type : Boolean, required : true },
		"answer" : { type : String },
		"options" : [{ type : String }],
	}],
	isCommon : { type : Boolean, required: true, immutable : true }
});

var createQuestion = function(question, type, required, answer, options) {
	var q = { "question" : question, "type" : type, "required" : required }
	if (answer !== null) q["answer"] = answer;
	if (options !== null) q["options"] = options;
	return q;
};

var commonQuestions = [
	createQuestion("Email", "text", true, null, null),
	createQuestion("Name", "text", true, null, null)
]

/**
 * Checks that any "list" typed question has at least one option, checks that
 * any non-"list" typed question have no options
 */
applicationSchema.pre("save", function(next) {
	this.questions.forEach(function(e) {
		if (e.type === "list" && e.options.length === 0) {
			return next(new Error("list questions must have at least one option"));
		} else if (e.type !== "list" && e.options.length !== 0) {
			return next(new Error("non list questions don't have options"));
		}
	});
	next();
});

/**
 * Creates an Application where questions are set as questions and isCommon is false, 
 * and then runs the callback on the new Application
 *
 * @param{Array} questions is an Array of Objects
 * @param{Function} callback(err, Application)
 */
applicationSchema.statics.createNotCommon = function(questions, callback) {
	createApp(questions, false, callback);
};

/**
 * Creates an Application where questions are set as questions and isCommon is true, 
 * and the questions is a valid submission for commonQuestions, and then runs the 
 * callback on the new Application
 *
 * @param{Array} questions is an Array of Objects
 * @param{Function} callback(err, Application)
 */
applicationSchema.statics.createCommon = function(questions, callback) {
	if (verifyForSubmissions(commonQuestions, questions)) createApp(questions, true, callback);
	else callback("Invalid common submission");		
};

/**
 * Deletes the application associated with the appId if it's not a common, 
 * and runs the callback
 *
 * @param{ObjectId} appId
 * @param{Function} callback(err)
 */
applicationSchema.statics.deleteApplication = function(appId, callback) {
	Application.remove({ "_id" : appId, "isCommon" : false }, function(err) {
		if (err) callback(err.message);
		else callback(null);
	});
};

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
applicationSchema.statics.updateQuestions = function(appId, newQuestions, isSubmission, callback) {
	Application.findOne({ "_id" : appId }, { questions : 1 }, function(err, app) {
		if (err) callback(err.message);
		else if (!app) callback("Invalid application");
		else {
			var readyToUpdate = ((isSubmission && verifyForSubmissions(app.questions, newQuestions)) ||
								(!isSubmission && verifyForSave(app.question, newQuestions)));

			if (readyToUpdate) {
				Application.findOneAndUpdate({ "_id" : appId }, { $set : newQuestions }, function(err, app) {
					if (err) callback(err.message);
					else callback(null, app);
				});
			}
			else callback("Invalid request to update");
		}
	});
};

/**
 * Creates an Application where the questions are set to questions and isCommon
 * is set to isCommon, then runs the callback on the new Application
 * 
 * @param{Array} questions is an Array of Objects
 * @param{Boolean} isCommon
 * @param{Function} callback(err, Application)
 */
var createApp = function(questions, isCommon, callback) {
	var app = { 
		"questions" : questions,
		"isCommon" : isCommon 
	};
	var newApp = new Application(app);

	// save the new app in the DB
	newApp.save(function(err, newApp) {
		if (err) callback(err.message);
		else callback(null, newApp);
	});
}

/**
 * Checks if newQuestions is okay for submission given origQuestions
 * @param{Array} origQuestions is an Array of Objects
 * @param{Array} newQuestions is an Array of Objects
 *
 * @return Boolean that is true if every question in origQuestions matches
 * every every question in newQuestions (with exception to answers) and that
 * every required question has an answer
 */
var verifyForSubmissions = function(origQuestions, newQuestions) {
	//console.log(newQuestions);
	//console.log(verifyForUpdate(origQuestions, newQuestions));
	if (verifyForUpdate(origQuestions, newQuestions)) {
		var verified = true;

		// check that all required fields are filled out
		origQuestions.forEach(function(question, i) {
			var question2 = newQuestions[i];
			if (question.required) {
				if (!("answer" in question2)) verified = false;
				if (question2["answer"] == '') verified = false;
			}
		});
		return verified
	}
	return false;
};

/**
 * Checks if newQuestions is okay for updating given origQuestions
 * @param{Array} origQuestions is an Array of Objects
 * @param{Array} newQuestions is an Array of Objects
 *
 * @return Boolean that is true if every question in origQuestions matches
 * every every question in newQuestions (with exception to answers)
 */
var verifyForUpdate = function(origQuestions, newQuestions) {
	// check that both lists are same length
	if (origQuestions.length !== newQuestions.length) return false;

	var verified = true;

	origQuestions.forEach(function(question, i) {
		var question2 = newQuestions[i];
		
		// check that all question, required, type, options are the same for question and question2
		if (question.question !== question2.question) verified = false;
		if (question.required !== question2.required) verified = false;
		if (question.type !== question2.type) verified = false;
		if (!(_.isEqual(question.options, question2.options))) verified = false;

		// check that if type is "box", answer is "yes" or "no" or empty
		if (question.type === "box" && "answer" in question2) {
			if (question2.answer !== "yes" && question2.answer !== "no") verified = false;
		}
		// check that if type is "options", answer is in options or empty
		if (question.type === "list" && "answer" in question2) {
			if (question.options.indexOf(question2.answer) < 0) verified = false;
		}
	});
	return verified;	
};

var Application = mongoose.model("Application", applicationSchema);
module.exports = Application;