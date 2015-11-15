/**
 * @author Lynda Tang
 */

var mongoose = require("mongoose");
var User = require('../models/User.js');

var StudentSchema = mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId , ref: 'User', unique: true, immutable: true},
  common: {type: mongoose.Schema.Types.ObjectId, ref: 'Common'}
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
			Student.create({user: user.user._id
	                //common: here
	                }, 
			function(err, user) {
			  if (err) {
			    callback(err);
			  } else {
			  	callback(null, {success: true, curruser: email});
			  }
			});
		}
	});
};

/**
 * Gets the common application for the user with the given userId
 * @param {ObjectID} userId the userId of the user for the common application
 * @param {Function} callback the callback function with in the form (err, commonapp)
 */
StudentSchema.statics.getCommon = function(userId, callback){
	Student.findOne({user: userId}).populate("common").exec(function(err, user){
		if (err){
			callback({message: err});
		} else {
			callback(null, user.common);
		}
	});
};

/**
 * Gets the common applications for the users with the given ids
 * @param {ObjectId} userIds a list of userIds 
 * @param {Function} callback the callback function in the form (err, [Common])
 */
StudentSchema.statics.getCommons = function(userIds, callback){
	Student.find({user: {$in: userIds}}, {_id: 0, common : 1}).populate("common").exec(function(err, users){
		if (err){
			callback({message: err});
		} else {
			callback(null, commons);
		}
	});
};

var Student = mongoose.model('Student', StudentSchema);
module.exports = mongoose.model("Student", StudentSchema);