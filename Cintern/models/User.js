var mongoose = require("mongoose");

var UserSchema = mongoose.Schema({
  email: String,
  password: String,
  isStudent: Boolean
});

/**
 * Adds a User to this Collection
 * @param {String} username the username of this User
 * @param {String} password the password of this User
 * @param {Boolean} isStudent whether or not this User is a Student
 * @param {Function} callback the callback function that sents the user created in the form
 * 								of (err, User)
 */
UserSchema.statics.addUser = function(username, password, isStudent, callback){
	
};

/**
 * Logins a User with the username and password given
 * @param {String} username the given username
 * @param {String} password the given password
 * @param {Function} callback the callback function that sends the current User in the form
 * 								of (err, currUser). Will throw an error if the User with the
 * 								username doesn't exist or if the password does not match
 */
UserSchema.statics.loginUser = function(username, password, callback){

};


var User = mongoose.model('User', UserSchema);
module.exports = mongoose.model("User", UserSchema);