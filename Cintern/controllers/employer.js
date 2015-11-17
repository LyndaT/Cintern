/**
 * @author Lynda Tang
 */

var ObjectID = require('mongodb').ObjectID;
var Employer = require('../models/Employer.js');
var User = require('../models/User.js');

/**
 * Adds an Employer to the Database
 * @param {Object} req
 * @param {Object} res 
 */
module.exports.addEmployer = function(req, res){
	email = req.body.email;
	password = req.body.password;
	//TODO: Change
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