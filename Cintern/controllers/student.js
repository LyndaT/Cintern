/**
 * @author Lynda Tang
 */

var ObjectID = require('mongodb').ObjectID;
var Student = require('../models/Student.js');
var User = require('../models/User.js');

/**
 * Adds a Student to the Database
 * @param {Object} req
 * @param {Object} res 
 */
module.exports.addStudent = function(req, res){
	email = req.body.email;
	password = req.body.password;
	User.addUser(email, password, true, function(errMsg, result){
		if (errMsg) {
			res.send({msg: errMsg});
		} else {
			req.session.email = email;
			res.send(result);
		}
	});
};
