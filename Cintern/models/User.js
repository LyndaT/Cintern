/**
 * @author Lynda Tang
 */

var mongoose = require("mongoose");

var UserSchema = mongoose.Schema({
  email: {type: String, unique: true, required: true},
  password: {type: String, required: true},
  isStudent: {type: Boolean, required: true}
});

/**
 * Adds a User to this Collection
 * @param {String} email the email of this User
 * @param {String} password the password of this User
 * @param {Boolean} isStudent whether or not this User is a Student
 * @param {Function} callback the callback function that sents the user created in the form
 * 								of (err, User)
 */
UserSchema.statics.addUser = function(email, password, isStudent, callback){
	findUser(email, function(err, user){
		if (user){
			callback("This username has already been taken");
		} else {
			User.create({   email: email, 
		                password: password,
		                isStudent: isStudent}, 
			function(err, user) {
			  if (err) {
			    callback(err);
			  } else {
			  	callback(null, {success: true, curruser: email, user: user});
			  }
			});
		}
	});
};

/**
 * Logins a User with the email and password given
 * @param {String} email the given email
 * @param {String} password the given password
 * @param {Function} callback the callback function that sends the current User in the form
 * 								of (err, currUser). Will throw an error if the User with the
 * 								username doesn't exist or if the password does not match
 */
UserSchema.statics.loginUser = function(email, password, callback){
	findUser(email, function(err, user){
		if (user == null) {
			callback({message:"This user does not exist"});
		} else {
			if (user.password == password) {
				callback(null, {success: true, curruser:email});
			} else {
				callback({message: "Wrong username and password"});
			}
		}
	});
};

var findUser = function(email, callback){
	User.findOne({email: email}, callback);
};

var User = mongoose.model('User', UserSchema);
module.exports = mongoose.model("User", UserSchema);