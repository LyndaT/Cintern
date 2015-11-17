/**
 * Lynda Tang
 */

var assert = require("assert");
var User = require('../models/User');
var mongoose = require('mongoose');

describe('User', function() {
  beforeEach(function(done) {
    mongoose.connect('mongodb://localhost/testcintern');
    User.remove({}, function() {
      done();
    });
  });

  afterEach(function(done) {
    User.remove({}, function() {
      mongoose.connection.close();
      done();
    });
  });

  describe('#addUser', function() {
    it('should add a User to the database with the correct attributes', function(done) {
      User.addUser('test', 'testpw', false, function(err, user){
      	assert.equal('test', user.email);
      	assert.equal('testpw', user.password);
      	assert.equal(false, user.isStudent);
      });     
      User.addUser('test2', 'test2pw', true, function(err, user){
      	assert.equal('test2', user.email);
      	assert.equal('test2pw', user.password);
      	assert.equal(true, user.isStudent);
      	done();
      });
    });
    
    it('should throw an error if there is another user with the same email', function(done) {
      User.addUser('test', 'testpw', false, function(err, user){
      	User.addUser('test', 'testpw', false, function(err, user){
	      	assert(err);
	      	done();
      	});
      });
    });
    
    it('should add a User to the database with the same password but different email', function(done) {
      User.addUser('test', 'testpw', false, function(err, user){
      	assert.equal('test', user.email);
      	assert.equal('testpw', user.password);
      	assert.equal(false, user.isStudent);
      	
      	User.addUser('test2', 'testpw', false, function(err, user){
	      	assert.equal('test2', user.email);
	      	assert.equal('testpw', user.password);
	      	assert.equal(false, user.isStudent);
	      	done();
      	});
      });
    });   
  });
  
  describe('loginUser', function(){
  	it('should login the right user with the correct email/password', function(done){
  		User.addUser('test', 'testpw', false, function(err, user){
  			User.loginUser('test', 'testpw', function(err, res){
  				assert.equal('test', user.email);
  				assert.equal('testpw', user.password);
  				done();
  			});
  		});
  	});
  	
  	it('should throw an error if the user does not exist', function(done){
  		User.loginUser('test', 'testpw', function(err, res){
  			assert.equal('This user does not exist', err);
  			done();
  		});
  	});
  	
  	it('should throw an error if the user/password combo is wrong', function(done){
  		User.addUser('test', 'testpw', false, function(err, user){
  			User.loginUser('test', 'nottestpw', function(err, res){
  				assert.equal('Wrong username and password',err);
  				done();
  			});
  		});
  	});
  	
  });
});
