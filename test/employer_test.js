/**
 * Lynda Tang
 */

var assert = require("assert");
var Employer = require('../models/Employer');
var User = require('../models/User');
var mongoose = require('mongoose');
var passwordHash = require('password-hash');


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
   			  //Checks to make sure that this employer is not verified yet
   			  assert.equal(false, emps[0].verified);
   			    
 			    User.findOne({email: 'goog'}, function(err, user){
     				assert.equal(id, user._id.toString());
     				assert.equal('goog', user.email);
     				assert.equal(true, passwordHash.verify('googpw', user.password));
     				assert.equal(false, user.isStudent);
     				done();
     			});
   			});
   		});
   	});
   	
   	it('should not create an employer with the same email', function(done){
   		Employer.createEmployer('goog', 'googpw', 'Google', function(errMsg, res){
   			User.findOne({email: 'goog'}, function(err, user){
   				assert.equal('goog', user.email);
   				assert.equal(true, passwordHash.verify('googpw', user.password));
   				assert.equal(false, user.isStudent);
   				
   				Employer.createEmployer('goog', 'goog1pw', 'Goog', function(errMsg, res){
     				assert(errMsg);
     				done();
     			});
   			});
   		});
   	});
   	
   	it('should not create an employer with the same company', function(done){
   		Employer.createEmployer('goog', 'googpw', 'Google', function(errMsg, res){
   			User.findOne({email: 'goog'}, function(err, user){
   				assert.equal('goog', user.email);
   				assert.equal(true, passwordHash.verify('googpw', user.password));
   				assert.equal(false, user.isStudent);
   				
   				Employer.createEmployer('goog1', 'goog1pw', 'Google', function(errMsg, res){
     				assert(errMsg);
     				done();
     			});
   			});
   		});
   	});	
  });  
  
  describe('#verifyEmployer', function(){
  	it('should change the verified for an employer ', function(done){
  		Employer.createEmployer('Rito', 'plz', 'Rito', function(errMsg, employer){
  			Employer.verifyEmployer(employer.user, function(err, res){
  				Employer.findOne({user: employer.user}, function(err, emp){
  					assert.equal(true, emp.verified);
  					done();
  				});
  			});
  		});
  	});
  });
});
