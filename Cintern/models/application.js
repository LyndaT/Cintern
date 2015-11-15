var mongoose = require("mongoose");
var _ = require("../helpers/lodash");

// Application schema definition
var applicationSchema = mongoose.Schema({
	questions : [{
		"question" : { type : String, required : true, immutable : true },
		"type" : { type : String, required : true, enum : [ "text", "radio", "check" ], immutable : true },
		"required" : { type : Boolean, required : true, immutable : true },
		"answer" : { type : String },
		"options" : [{ type : String, immutable : true }],
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
];

/**
 * Checks that any "radio" typed question has at least 2 options, checks that
 * any non-"radio" typed question have no options and that no answer is being saved
 */
applicationSchema.pre("save", function(next) {
	this.questions.forEach(function(e) {
		if (e.type === "radio" && e.options.length < 2) {
			return next(new Error("radio questions must have at least one option"));
		} else if (e.type !== "radio" && e.options.length !== 0) {
			return next(new Error("non radio questions don't have options"));
		}
	});
	if(!verifyAnsweredQuestionsCorrectly(this.questions)) {
		next(new Error("answer is wrongly formatted"));
	}
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
applicationSchema.statics.deleteNotCommonApplication = function(appId, callback) {
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
								(!isSubmission && verifyForUpdate(app.questions, newQuestions)));

			if (readyToUpdate) {
				console.log("here");
				console.log(newQuestions);
				Application.findOneAndUpdate({ "_id" : appId }, { $set : { questions : newQuestions } }, function(err, app) {
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
 * @param{Array} newQuestions is an Array of Objects that have keys id
 * (which maps to a question id), and answer, which maps to a string
 *
 * @return Boolean that is true if every question in origQuestions matches
 * every every question in newQuestions and that every required question 
 * has an answer
 */
var verifyForSubmissions = function(origQuestions, newQuestions) {
	if (verifyForUpdate(origQuestions, newQuestions)) {
		var verified = true;

		// check that all required fields are filled out
		origQuestions.forEach(function(question, i) {
			var question2 = newQuestions[i];
			if (question.required) {
				verified = question2["answer"] === '';
			}
		});
		return verified
	}
	return false;
};

/**
 * Checks if newQuestions is okay for updating given origQuestions
 * @param{Array} origQuestions is an Array of Objects
 * @param{Array} newQuestions is an Array of Objects that have keys id
 * (which maps to a question id), and answer, which maps to a string
 *
 * @return Boolean that is true if every question in origQuestions matches
 * every every question in newQuestions (with exception to answers)
 */
var verifyForUpdate = function(origQuestions, newQuestions) {
	// check that both question lists are same length
	if (origQuestions.length !== newQuestions.length) return false;

	var verified = true;

	// formatting an Array of Objects with fields question, required, type, options, and answer
	var verifyAnswersArray = [];

	// check that every question in origQuestions maps to the same question in newQuestions
	origQuestions.forEach(function(question, i) {
		var question2 = newQuestions[i];
		if (question._id !== question2._id) verified = false;
		verifyAnswersArray.push({
			"question" : question.question,
			"required" : question.required,
			"type" : question.type,
			"options" : question.options,
			"answer" : question2.answer
		})
	});

	// if format matches for origQuestions and newQuestions, check that each question is answered correctly
	if (verified) return verifyAnsweredQuestionsCorrectly(verifyAnswersArray);
	else return verified;	
};

var verifyForCommon = function(questionsAll) {
	if (questions.length != commonQuestions.length) return false;
	var verified = true;

	commonQuestions.forEach(function(question, i) {
		if ()
	})
}

/**
 * This function checks if the answer portion of each question in questions is
 * approriate given the type of the question
 *
 * @param{Array} questions is an Array of Objects that contains fields question,
 * required, type, options, and answers
 * @return True if the answer of each question in questions is a valid answer for 
 * the question
 */
var verifyAnsweredQuestionsCorrectly = function(questions) {
	var verified = true
	questions.forEach(function(question) {
		// check that if type is "check", answer is "yes" or "no" or empty
		if (question.type === "check" && question.answer) {
			if (question.answer !== "yes" && question.answer !== "no") verified = false;
		}
		// check that if type is "radio", answer is in options or empty
		if (question.type === "radio" && question.answer) {
			if (question.options.indexOf(question.answer) < 0) verified = false;
		}
	});
	return verified;
}

var Application = mongoose.model("Application", applicationSchema);
module.exports = Application;