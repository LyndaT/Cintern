/**
 * @author: Lynda Tang
 */

var ObjectID = require('mongodb').ObjectID;
var Student = require('../models/Student.js');
var User = require('../models/User.js');

/**
 * POST /users/students
 * Adds an Employer to the Database
 * @param {Object} Request body:
 * 		-email: the inputed email of the Employer
 * 		-password: the inputed password of the Employer
 * @param {Object} Response:
 * 		-employer: the Student that is added
 */
module.exports.createStudent = function(req, res, next){
	
};
