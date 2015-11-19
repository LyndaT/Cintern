/**
 * @author Lynda Tang
 */
/**
 * @author: Lynda Tang
 */

var ObjectID = require('mongodb').ObjectID;
var Employer = require('../models/Employer.js');
var User = require('../models/User.js');
var utils = require('../utils/utils');

/**
 * POST /users/employers
 * Adds an Employer to the Database
 * 
 * Request parameters:
 * 		-email: the inputed email of the Employer
 * 		-password: the inputed password of the Employer
 * 		-company: the inputed company of the Employer
 * 
 * Response:
 * 		-success: true if the server succeeded in adding the Employer
 * 		-err: on failure (i.e failed in adding Employer), an error message
 */
module.exports.createEmployer = function(req, res, next){
	var email = req.body.email;
	var password = req.body.password;
	var company = req.body.company;
	Employer.createEmployer(email, password, company, function(errMsg, employer){
		if (errMsg){
			utils.sendErrResponse(res, 403, errMsg);
		} else {
			var currUser = {
				userId: employer.user,
				isStudent: false,
			};
			req.session.user = currUser;
			utils.sendSuccessResponse(res);
		}
	});
};