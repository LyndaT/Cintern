/**
 * @author Jennifer Wu
 *
 * Application model
 */
var mongoose = require("mongoose");
var _ = require("../helpers/lodash");

// Application schema definition
var applicationSchema = mongoose.Schema({
	questions : [{
		"question" : { type : String, required : true },
		"type" : { type : String, required : true, enum : [ "text", "dropdown", "radio" ] },
		"required" : { type : Boolean, required : true },
		"answer" : { type : String, default : '' },
		"options" : [{ type : String }],
	}]
});

/**
 * Checks that any "dropdown" typed question has at least 2 options, checks that
 * any non-"dropdown" typed question have no options and that no wrongly formatted
 * answer is being saved
 */
applicationSchema.pre("save", function(next) {
	// check that each question has the appropriate type options relation
	this.questions.forEach(function(e) {
		if (e.type === "dropdown" && e.options.length < 2) {
			return next(new Error("dropdown questions must have at least one option"));
		} 
		else if (e.type !== "dropdown" && e.options.length !== 0) {
			return next(new Error("non dropdown questions don't have options"));
		}
		if (e.type === "radio" && e.required !== true) {
			return next(new Error("radio type questions must be required"));
		}
	});

	// check that all answers are correctly formatted
	if(!verifyAnsweredQuestionsCorrectly(this.questions)) {
		next(new Error("answer is wrongly formatted"));
	}
	
	next(null, this);
});

/**
 * Creates an Application where questions are set as questions, 
 * and then runs the callback on the new Application
 *
 * @param{Array} questions is an Array of Objects with keys that are "question",
 * 		"type", "required", "options" and/or "answer"
 * @param{Function} callback(err, Application)
 */
applicationSchema.statics.createApplication = function(questions, callback) {
	var app = { 
		"questions" : questions,
	};

	var newApp = new Application(app);

	// save the new app in the DB
	newApp.save(function(err, newApp) {
		if (err) callback(err.message);
		else callback(null, newApp);
	});
};

/**
 * Deletes the applications associated with the appIds and runs the callback
 *
 * @param{Array} appIds is an Array of ObjectIds
 * @param{Function} callback(err)
 */
applicationSchema.statics.deleteApplications = function(appIds, callback) {
	Application.remove({ "_id" : { $in : appIds } }, function(err) {
		if (err) callback(err.message);
		else callback(null);
	});
};

/**
 * Sets the application questions to answers and if isSubmission is true
 * checks if application can be submitted and update state appropriately, then 
 * run the callback
 *
 * @param{ObjectId} appId
 * @param{Array} answers is an Array of Objects with keys that is "id" 
 * 			(mapping to an Object id), and "answer" (mapping to a String)
 * @param{Boolean} isSubmission
 * @param{Function} callback(err, Application)
 */
applicationSchema.statics.updateAnswers = function(appId, answers, isSubmission, callback) {
	Application.findOne({ "_id" : appId }, { questions : 1 }, function(err, app) {
		if (err) callback(err.message);
		else if (!app) callback("Invalid application");
		else {
			// ready to update is true if answers is a submission and all required
			// questions have been correctly answered OR if answers is not a submission
			// and all answers are well formed answers to questions
			var readyToUpdate = ((isSubmission && verifyForSubmissions(app.questions, answers)) ||
								(!isSubmission && verifyForUpdate(app.questions, answers)));

			// set each question's answer to the corresponding one in answers
			if (readyToUpdate) {
				app.questions.forEach(function(question, i) {
					app.questions[i].answer = answers[i].answer;
				});
				app.save(callback);
			}
			else callback("Invalid request to update");
		}
	});
};

/**
 * Runs the callback on the Array of Objects that are the questions associated 
 * with the Application with appId in a specific format. The Object has keys 
 * "question", "type", "required", "options", and "answer"
 * 
 * @param{ObjectId} appId
 * @param{Function} callback(err, Array)
 */
applicationSchema.statics.formatForShow = function(appId, callback) {
	Application.findOne({ "_id" : appId }, function(err, app) {
		if (err) callback(err.message);
		else if (!app) callback("Invalid application");
		else {
			var formattedQuestions = [];
			app.questions.forEach(function(e) {
				formattedQuestions.push({
					"question" : e.question,
					"type" : e.type,
					"required" : e.required,
					"options" : e.options,
					"answer" : e.answer,
					"_id" : e._id
				});
			});
			callback(null, formattedQuestions);
		}	
	});
};

/**
 * Checks if answers is okay for submission given origQuestions
 * 
 * @param{Array} origQuestions is an Array of Objects that is the questions
 * 			field for a specific Application
 * @param{Array} answers is an Array of Objects with keys that is "id" 
 * 			(mapping to an Object id), and "answer" (mapping to a String)
 *
 * @return Boolean that is true if every question in origQuestions matches
 * every every question in answers (with exception to answers) and that
 * every required question has an answer
 */
var verifyForSubmissions = function(origQuestions, answers) {
	if (verifyForUpdate(origQuestions, answers)) {
		var verified = true;

		// check that all required fields are filled out
		origQuestions.forEach(function(question, i) {
			var question2 = answers[i];
			if (question.required) {
				if (question2["answer"] == '') verified = false;
			}
		});
		return verified
	}
	return false;
};

/**
 * Checks if answers is okay for updating given origQuestions
 *
 * @param{Array} origQuestions is an Array of Objects that is the questions
 * 			field for a specific Application
 * @param{Array} answers is an Array of Objects with keys that is "id" 
 * 			(mapping to an Object id), and "answer" (mapping to a String)
 *
 * @return Boolean that is true if every question in origQuestions matches
 * every every question in answers (with exception to answers)
 */
var verifyForUpdate = function(origQuestions, answers) {
	// check that both question lists are same length
	if (origQuestions.length !== answers.length) return false;

	var verified = true;

	// initialize array for checking whether or not answers have been correctly submitted
	var verifyAnswers = [];

	// check that all question, required, type, options are the same for question and question2
	origQuestions.forEach(function(question, i) {
		var question2 = answers[i];
		if (question._id.toString() !== question2._id.toString()) verified = false;
		verifyAnswers.push({
			"question" : question.question,
			"required" : question.required,
			"type" : question.type,
			"options" : question.options,
			"answer" : (question2.answer === '') ? undefined : question2.answer
		});
	});

	// if format matches for origQuestions and answers, check that each question is answered correctly
	if (verified) return verifyAnsweredQuestionsCorrectly(verifyAnswers)
	else return verified;	
};


/**
 * Checks if answers in questions are appropriate
 *
 * @param{Array} questions is an Array of Objects with keys question,
 * required, type, options, and answer
 *
 * @return Boolean that is true if each question in questions has an appropriate
 * answer, and false otherwise
 */
var verifyAnsweredQuestionsCorrectly = function(questions) {
	var verified = true
	questions.forEach(function(question) {
		// check that if type is "radio", answer is "yes" or "no" or empty
		if (question.type === "radio" && question.answer) {
			if (question.answer !== "yes" && question.answer !== "no") verified = false;
		}
		// check that if type is "dropdown", answer is in options or empty
		if (question.type === "dropdown" && question.answer) {
			if (question.options.indexOf(question.answer) < 0) verified = false;
		}
	});
	return verified;
};

var Application = mongoose.model("Application", applicationSchema);
module.exports = Application;