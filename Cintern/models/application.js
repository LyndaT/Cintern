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
});

/**
 * Creates an Application where questions are set as questions, and then runs
 * the callback on the new Application
 *
 * @param{Object} questions
 * @param{Function} callback(err, Application)
 */
applicationSchema.statics.createApplication = function(questions, callback) {
	var app = { "questions" : questions };
	var newApp = new Application(app);

	// save the new app in the DB
	newApp.save(function(err, newApp) {
		if (err) callback(err.message);
		else callback(null, newApp);
	});
};

/**
 * Deletes the application associated with the appId, and runs the callback
 *
 * @param{ObjectId} appId
 * @param{Function} callback(err)
 */
applicationSchema.statics.deleteApplication = function(appId, callback) {
	Application.remove({ "_id" : this._id }, function(err) {
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
 * @param{Object} newQuestions
 * @param{Boolean} isSubmission
 * @param{Function} callback(err, Application)
 */
applicationSchema.statics.updateQuestions = function(appId, newQuestions, isSubmission, callback) {
	Application.findOne({ "_id", appId }, { questions : 1 }, function(err, app) {
		if (err) callback(err.message);
		else if (!app) callback("Invalid application");
		else {
			var readyToUpdate = ((isSubmission && verifyForSubmissions(app.questions, newQuestions) ||
								(!isSubmission && verifyForSave(app.question, newQuestions));

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
 * Checks if newQuestions is okay for submission given origQuestions
 * @param{Object} origQuestions
 * @param{Object} newQuestions
 *
 * @return Boolean that is true if every question in origQuestions matches
 * every every question in newQuestions (with exception to answers) and that
 * every required question has an answer
 */
var verifyForSubmissions(origQuestions, newQuestions) {
	if (verifyForUpdate(origQuestions, newQuestions)) {
		// check that all required fields are filled out
		origQuestions.forEach(function(question, i) {
			var question2 = newQuestions[i];
			if (question.required) {
				if (!("answer" in question2)) return false;
				if (question2["answer"] == '') return false;
			}
		});
		return true;
	}
	return false;
};

/**
 * Checks if newQuestions is okay for updating given origQuestions
 * @param{Object} origQuestions
 * @param{Object} newQuestions
 *
 * @return Boolean that is true if every question in origQuestions matches
 * every every question in newQuestions (with exception to answers)
 */
var verifyForUpdate(origQuestions, newQuestions) {
	// check that both lists are same length
	if (origQuestions.length !== newQuestions) return false;

	origQuestions.forEach(function(question, i) {
		var question2 = newQuestions[i];
		// check that all question, required, type, options are the same for question and question2
		if (question.question !== question2.question) return false;
		if (question.required !== question2.required) return false;
		if (question.type !== question2.type) return false;
		if (_.isEqual(question.options, quesiton2.options)) return false;

		// check that if type is "box", answer is "yes" or "no" or empty
		if (question.type === "box" && "answer" in question2) {
			if (question2.answer !== "yes" && question2.answer !== "no") return false;
		}
		// check that if type is "options", answer is in options or empty
		if (question.type === "list" && "answer" in question2) {
			if (question.options.indexOf(question2.answer) < 0) return false;
		}
	});
	return true;	
};

var Application = mongoose.model("Application", applicationSchema);
module.exports = Application;