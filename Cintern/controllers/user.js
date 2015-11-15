var ObjectID = require('mongodb').ObjectID;
var User = require('../models/User.js');

/**
 * Adds a User to the Database
 * @param {Object} req
 * @param {Object} res 
 */
module.exports.addUser = function(req, res, next){
	email = req.body.email;
	password = req.body.password;
	User.addUser(email, password, function(errMsg, result){
		if (errMsg) {
			res.send(errMsg);
		} else {
			req.session.email = email;
			res.send(result);
		}
	});
};

/**
 * Logins a User 
 * @param {Object} req
 * @param {Object} res
 */
module.exports.loginUser = function(req, res){
	email = req.body.email;
	password = req.body.password;
	User.loginUser(email, password, function(errMsg, result){
		if (errMsg) {
			res.send(errMsg);
		} else {
			req.session.email = email;
			res.send(result);
		}
	});
};