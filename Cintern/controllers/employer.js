/**
 * @author Lynda Tang
 */
/**
 * @author: Lynda Tang
 */

var ObjectID = require('mongodb').ObjectID;
var Employer = require('../models/Employer.js');
var User = require('../models/User.js');

/**
 * POST /users/employers
 * Adds an Employer to the Database
 * @param {Object} Request body:
 * 		-email: the inputed email of the Employer
 * 		-password: the inputed password of the Employer
 * 		-company: the inputed company of the Employer
 * @param {Object} Response:
 * 		-employer: the Employer that is added
 */
module.exports.addEmployer = function(req, res, next){
	var email = req.body.email;
	var password = req.body.password;
	var company = req.body.company;
	//TODO: Change
	Employer.createEmployer(email, password, company, function(errMsg, employer){
		if (errMsg){
			
		}
	});
	
	User.addUser(email, password, false, function(errMsg, user){
		if (errMsg) {
			res.send({msg: errMsg});
		} else {
		    // req.session.email = email;
			// res.send(result);
			Employer.createEmployer(user._id, "Google", function(errMsg, employer){
				if (errMsg){
					res.send({msg: errMsg});
				} else {
					req.session.email = email;
					res.send(employer);
				}
			});
		}
	});
};