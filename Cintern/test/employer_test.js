/**
 * Lynda Tang
 */

var assert = require("assert");
var Employer = require('../models/Employer');
var User = require('../models/User');
var mongoose = require('mongoose');


describe('Employer', function() {
  beforeEach(function(done) {
    mongoose.connect('mongodb://localhost/testcintern');
    User.remove({}, function() {
    });
    Employer.remove({}, function(){
    	done();
    });
  });

  afterEach(function(done) {
    User.remove({}, function() {
      mongoose.connection.close();
    });
    Employer.remove({}, function(){
    	mongoose.connection.close();
    	done();
    });
  });

  describe('#createEmployer', function() {
   	it('should create an Employer and a User for that Employer', function(done){
   		Employer.createEmployer('goog', 'googpw', 'Google', function(errMsg, res){
			var id = "";
   			Employer.find({company: 'Google'}, function(err, emps){
   				assert.equal(1, emps.length);
   			    id = emps[0].user;
   			});
   			User.findOne({email: 'goog'}, function(err, user){
   				assert.equal(id, user._id.toString());
   				assert.equal('goog', user.email);
   				assert.equal('googpw', user.password);
   				assert.equal(false, user.isStudent);
   				done();
   			});
   		});
   	});
   	
   	it('should not create an employer with the same email', function(done){
   		Employer.createEmployer('goog', 'googpw', 'Google', function(errMsg, res){
   			User.findOne({email: 'goog'}, function(err, user){
   				assert.equal('goog', user.email);
   				assert.equal('googpw', user.password);
   				assert.equal(false, user.isStudent);
   			});
   			Employer.createEmployer('goog', 'goog1pw', 'Goog', function(errMsg, res){
   				assert(errMsg);
   				done();
   			});
   		});
   	});
   	
   	it('should not create an employer with the same company', function(done){
   		Employer.createEmployer('goog', 'googpw', 'Google', function(errMsg, res){
   			User.findOne({email: 'goog'}, function(err, user){
   				assert.equal('goog', user.email);
   				assert.equal('googpw', user.password);
   				assert.equal(false, user.isStudent);
   			});
   			Employer.createEmployer('goog1', 'goog1pw', 'Google', function(errMsg, res){
   				assert(errMsg);
   				done();
   			});
   		});
   	});
   	
  });  
});
