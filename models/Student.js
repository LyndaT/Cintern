/**
 * @author Lynda Tang
 */
var mongoose = require("mongoose");
var User = require('../models/User.js');
var Common = require('../models/common.js');

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
			Common.createCommon(user._id, function(errMsg, common) {
				if (errMsg) {
					callback(errMsg);
				} else {
					Student.create({ user: user._id, commonFilled: false }, 
					function(err, student) {
					  	if (err) {
						    callback(err.message);
					  	} else {
						  	callback(null, student);
						}
					});
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
StudentSchema.statics.setCommonFilled = function(userId, callback){
	Student.findOneAndUpdate({user: userId}, {$set: {commonFilled: true}}, function(err, student){
		if (err){
			callback(err.message);
		} else if (!student) {
			callback("Invalid student");
		} else {
			// finding to get the actual updated version of Student (we found that
			// the student in the callback of findOneAndUpdate isn't updated yet)
			Student.findOne({user : userId}, function(err, student) {
				if (err) {
					callback(err.message);
				} else callback(null, student);
			});
		}
	});
};

/**
 * Finds the Student associaed with the userId
 * @param{ObjectId} userId
 * @param{Function} callback(err, Student)
 */
StudentSchema.statics.findByUserId = function(userId, callback) {
	Student.findOne({ "user" : userId }, function(err, student) {
		if (err) {
			callback(err.message);
		} else {
			callback(null, student);
		}
	});
}

var Student = mongoose.model('Student', StudentSchema);
module.exports = mongoose.model("Student", StudentSchema);