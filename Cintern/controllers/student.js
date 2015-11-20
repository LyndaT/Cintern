/**
 * @author: Lynda Tang
 */

var ObjectID = require('mongodb').ObjectID;
var Student = require('../models/Student.js');
var User = require('../models/User.js');
var utils = require('../utils/utils');

/**
 * POST /users/students
 * Adds an Employer to the Database
 * 
 * Request parameters:
 * 		-email: the inputed email of the Employer
 * 		-password: the inputed password of the Employer
 * 
 * Response:
 * 		-success: true if the server succeeded in adding to Student
 * 		-err: on failure (i.e failed in adding Student), an error message
 */
module.exports.createStudent = function(req, res, next){
	var email = req.body.email;
	var password = req.body.password;
	Student.createStudent(email, password, function(errMsg, student){
		if (errMsg){
			utils.sendErrorResponse(res, 403, errMsg);
		} else {
			var currUser = {
				userId: student.user,
				studentInfo : {
					commonFilled : student.commonFilled,
				}
			};
			req.session.user = currUser;
			utils.sendSuccessResponse(res);
		}
	});
};
