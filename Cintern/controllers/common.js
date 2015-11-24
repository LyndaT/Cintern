/**
 * @author Jennifer Wu
 *
 * Common controller
 */
var Common = require('../models/common.js');
var Student = require('../models/Student.js');
var utils = require('../utils/utils');

/**
 * GET /students/applications/common
 *
 * Gets the common application associated for the currentUser
 * 
 * Response:
 *  - success: true if succeeded got the common
 *  - err: on failure (i.e. server failure, invalid user);
 */
exports.getCommon = function(req, res, next) {
	var currentUser = req.session.user;
	var userId = currentUser.userId;
	
	Common.getCommonByOwnerId(userId, function(errMsg, common) {
		if (errMsg) utils.sendErrResponse(res, 403, errMsg);
		else if (!common) utils.sendErrResponse(res, 403, "No common");
		else {
			common.populateCommon(function(errMsg, common) {
				if (errMsg) utils.sendErrResponse(res, 403, errMsg);
				else if (!common) utils.sendErrResponse(res, 403, "No common");
				else {
					var content = {
						"application" : common.application,
					};
					utils.sendSuccessResponse(res, content);
				}
			});
		}
	});
};

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
exports.submitCustom = function(req, res, next) {
	var currentUser = req.session.user;
	if (!currentUser.studentInfo.commonFilled) {
		var userId = currentUser.userId;
		var answers = req.body.answers;

		// format answers for model call
		var answerArray = [];
		Object.keys(answers).forEach(function(id) {
	        answerArray.push({
	          "_id" : id,
	          "answer" : answers[id]
	        });
	    });

		// submit the common
		Common.submitCommon(userId, answerArray, function(errMsg, success) {
			if (errMsg) utils.sendErrResponse(res, 403, errMsg);
			else if (!success) utils.sendErrResponse(res, 403, "Could not submit");
			else {
				// student's common is filled
				Student.setCommonFilled(userId, function(errMsg, student) {
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