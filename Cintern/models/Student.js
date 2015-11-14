var mongoose = require("mongoose");

var StudentSchema = mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId , ref: 'User'},
});

/**
 * Creates a Student User with the given specs
 * @param {String} username the username of this Student
 * @param {String} password the password of this Student
 * @param {Function} callback the callback with the student user in the form
 * 								(err, Student)
 */
StudentSchema.statics.createStudent = function(username, password, name, callback){
	
};

var Student = mongoose.model('Student', StudentSchema);
module.exports = mongoose.model("Student", StudentSchema);