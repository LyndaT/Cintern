/**
 * @author Lynda Tang
 */

var mongoose = require("mongoose");

var EmployerSchema = mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId , ref: 'User', unique: true, immutable: true},
  company: {type: String, unique: true},
});

/**
 * Creates an Employer User
 * @param {String} username the username of the Employer
 * @param {String} password the password of the Employer
 * @param {String} companyName the name of the company this Employer represents
 * @param {Function} callback the callback function that sends the Employer User in the form
 * 								(err, Employer)
 */
EmployerSchema.statics.createEmployer = function(username, password, companyName, callback){
	
};

var Employer = mongoose.model('Employer', EmployerSchema);
module.exports = mongoose.model("Employer", EmployerSchema);