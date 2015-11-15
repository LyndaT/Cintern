/**
 * @author Lynda Tang
 */

var mongoose = require("mongoose");
var User = require('../models/User.js');

var EmployerSchema = mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId , ref: 'User', unique: true, immutable: true},
  company: {type: String, unique: true},
});

/**
 * Creates an Employer User
 * @param {String} email the email of the Employer
 * @param {String} password the password of the Employer
 * @param {String} companyName the name of the company this Employer represents
 * @param {Function} callback the callback function that sends the Employer User in the form
 * 								(err, Employer)
 */
EmployerSchema.statics.createEmployer = function(email, password, companyName, callback){
	User.addUser(email, password, false, function(err, user){
		if (err){
			callback(err);
		} else {
			Employer.create({ user: [user._id], 
							  company: companyName},
							  function(err, employer){
				if (err){
					callback({message: err});
				} else {
					callback(null, employer);
				}
			});
		}
	});
};

var Employer = mongoose.model('Employer', EmployerSchema);
module.exports = mongoose.model("Employer", EmployerSchema);