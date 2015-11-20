/**
 * @author Jennifer Wu
 *
 * Common controller
 */
var Common = require('../models/common.js');
var Student = require('../models/Student.js');
var utils = require('../utils/utils');

/**
 * POST /students/applications/common
 *
 * Submits answers for the common application
 *
 * Request body:
 *	- answers: Object with keys that are "_id" (mapping to questionId)
 *			and "answer" (mapping to a string)
 *
 * Response:
 *	- success: true if succeeded in submitting
 *	- err: on failure (i.e. server fail, invalid submission)
 */ 
exports.submitCommonApplication = function(req, res, next) {
	var currentUser = req.session.user;
	//console.log("relies on common req.session.submittedCommon");
	if (!currentUser.studentInfo.commonFilled) {
		var currentUserId = currentUser.userId;
		var answers = req.body;

		// format answers for model call
		var answerArray = [];
		Object.keys(answers).forEach(function(id) {
	        answerArray.push({
	          "_id" : id,
	          "answer" : answers[id]
	        });
	    });

		// submit the common
		Common.submitCommon(currentUserId, answerArray, function(errMsg, success) {
			if (errMsg) utils.sendErrResponse(res, 403, errMsg);
			else if (!success) utils.sendErrResponse(res, 403, "Could not submit");
			else {
				// student's common is filled
				Student.setCommonFilled(currentUserId, function(errMsg, student) {
					if (errMsg) utils.sendErrResponse(res, 403, errMsg);
					else if (!student) utils.sendErrResponse(res, 403, "Invalid student");
					else {
						req.session.user.studentInfo.commonFilled = true;
						utils.sendSuccessResponse(res);
					}
				});
			}
		});
	}
	else utils.sendErrResponse(res, 403, "Already submitted a common");
};