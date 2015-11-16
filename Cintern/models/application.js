var mongoose = require("mongoose");
var _ = require("../helpers/lodash");

// Application schema definition
var applicationSchema = mongoose.Schema({
	questions : [{
		"question" : { type : String, required : true, immutable : true },
		"type" : { type : String, required : true, enum : [ "text", "radio", "check" ], immutable : true },
		"required" : { type : Boolean, required : true, immutable : true },
		"answer" : { type : String, default : '' },
		"options" : [{ type : String, immutable : true }],
	}]
});

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
 * Creates an Application where questions are set as questions, 
 * and then runs the callback on the new Application
 *
 * @param{Array} questions is an Array of Objects
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
 * Deletes the application associated with the appId and runs the callback
 *
 * @param{ObjectId} appId
 * @param{Function} callback(err)
 */
applicationSchema.statics.deleteApplication = function(appId, callback) {
	Application.remove({ "_id" : appId }, function(err) {
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
applicationSchema.statics.updateAnswers = function(appId, newQuestions, isSubmission, callback) {
	Application.findOne({ "_id" : appId }, { questions : 1 }, function(err, app) {
		if (err) callback(err.message);
		else if (!app) callback("Invalid application");
		else {
			var readyToUpdate = ((isSubmission && verifyForSubmissions(app.questions, newQuestions)) ||
								(!isSubmission && verifyForUpdate(app.questions, newQuestions)));

			if (readyToUpdate) {
				// TODO: fix setting function
				/*Application.findOneAndUpdate({ "_id" : appId }, { $set : { questions.$ : newQuestions } }, function(err, app) {
					if (err) callback(err.message);
					else callback(null, app);
				});*/
			}
			else callback("Invalid request to update");
		}
	});
};

// TODO: write me
// return an Object format of the application which can be used to generate UI
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
					"answer" : e.answer
				});
			});
			callback(null, formattedQuestions);
		}	
	});
};

/**
 * Checks if newQuestions is okay for submission given origQuestions
 * 
 * @param{Array} origQuestions is an Array of Objects that is the questions
 * 			field for a specific Application
 * @param{Array} newQuestions is an Array of Objects with keys that is "id" 
 * 			(mapping to an Object id), and "answer" (mapping to a String)
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
				if (question2["answer"] == '') verified = false;
			}
		});
		return verified
	}
	return false;
};

/**
 * Checks if newQuestions is okay for updating given origQuestions
 *
 * @param{Array} origQuestions is an Array of Objects that is the questions
 * 			field for a specific Application
 * @param{Array} newQuestions is an Array of Objects with keys that is "id" 
 * 			(mapping to an Object id), and "answer" (mapping to a String)
 *
 * @return Boolean that is true if every question in origQuestions matches
 * every every question in newQuestions (with exception to answers)
 */
var verifyForUpdate = function(origQuestions, newQuestions) {
	// check that both question lists are same length
	if (origQuestions.length !== newQuestions.length) return false;

	var verified = true;

	// initialize array for checking whether or not answers have been correctly submitted
	var verifyAnswers = [];

	// check that all question, required, type, options are the same for question and question2
	origQuestions.forEach(function(question, i) {
		var question2 = newQuestions[i];
		if (question._id !== question2._id) verified = false;
		verifyAnswers.push({
			"question" : question.question,
			"required" : question.required,
			"type" : question.type,
			"options" : question.options,
			"answer" : (question2.answer === '') ? undefined : question.answer
		});
	});

	// if format matches for origQuestions and newQuestions, check that each question is answered correctly
	if (verified) return verifyAnsweredQuestionsCorrectly(newQuestions)
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
};

var Application = mongoose.model("Application", applicationSchema);
module.exports = Application;