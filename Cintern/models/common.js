var mongoose = require("mongoose");
var _ = require("../helpers/lodash");

// Application schema definition
var commonSchema = mongoose.Schema({
	application : { 
		type : mongoose.Schema.Types.ObjectId, 
		ref: "Application", 
		required : true, 
		immutable : true, 
		unique : true 
	}
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
 * Creates a Common where application is an Application with questions set as
 * questions and then runs the callback on the new Common
 *
 * @param{Array} questions is an Array of Objects
 * @param{Function} callback(err, Common)
 */
applicationSchema.statics.createCommon = function(questions, callback) {
	if (verifyForSubmissions(commonQuestions, questions)) createApp(questions, true, callback);
	else callback("Invalid common submission");		
};


var verifyForCommon = function(questionsAll) {
	if (questions.length != commonQuestions.length) return false;
	var verified = true;

	commonQuestions.forEach(function(question, i) {
		if ()
	})
}


var Common = mongoose.model("Common", applicationSchema);
module.exports = Common;

