/**
 * @author Lynda Tang
 */

var mongoose = require("mongoose");
var User = require('../models/User.js');

var StudentSchema = mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId , ref: 'User', unique: true, immutable: true},
  commonFilled: {type: Boolean, required: true}
});

/**
 * Creates a Student User with the given specs
 * @param {String} email the email of this Student
 * @param {String} password the password of this Student
 * @param {Function} callback the callback with the student user in the form
 * 								(err, Student)
 */
StudentSchema.statics.createStudent = function(email, password, callback){
	User.addUser(email, password, true, function(errMsg, user){
		if (errMsg){
			callback(errMsg);
		} else {
			Student.create({user: user._id, 
	                commonFilled: false}, 
			function(err, student) {
			  if (err) {
			    callback(err.message);
			  } else {
			  	callback(null, student);
			  }
			});
		}
	});
};

/**
 * Changes common filled on a Student to be true
 * @param {Object} studentId the ID of the student
 * @param {Object} callback the callback in the form (err)
 */
StudentSchema.method.setCommonFilledTrue = function(userId, callback){
	Student.update({user: userId}, {$set: {commonFilled: true}});
};


var Student = mongoose.model('Student', StudentSchema);
module.exports = mongoose.model("Student", StudentSchema);