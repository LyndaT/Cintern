/**
 * Lynda Tang
 */

var assert = require("assert");
var Student = require('../models/Student');
var User = require('../models/User');
var mongoose = require('mongoose');


describe('Student', function() {
  beforeEach(function(done) {
    mongoose.connect('mongodb://localhost/testcintern');
    User.remove({}, function() {
    });
    Student.remove({}, function(){
    	done();
    });
  });

  afterEach(function(done) {
    User.remove({}, function() {
      mongoose.connection.close();
      done();
    });
  });

  describe('#createStudent', function() {
   	it('should create a Student and a User for that Student', function(done){
   		Student.createStudent('jenn', 'jennpw', function(errMsg, res){
			var id = "";
   			Student.find({}, function(err, students){
   				assert.equal(1, students.length);
   				assert.equal(false, students[0].commonFilled);
 			    id = students[0].user;
   			    
 			    User.findOne({email: 'jenn'}, function(err, user){
     				assert.equal(id, user._id.toString());
     				assert.equal('jenn', user.email);
     				assert.equal('jennpw', user.password);
     				assert.equal(true, user.isStudent);
     				done();
     			});
   			});
   		});
   	});
   	
   	it('should not create an Student with the same email', function(done){
   		Student.createStudent('hee', 'yoon', function(errMsg, res){
   			Student.find({}, function(err, students){
   				assert.equal(1, students.length);
   				assert.equal(false, students[0].commonFilled);
 			    id = students[0].user;
   			    
 			    User.findOne({email:'hee'}, function(err, user){
     				assert.equal('hee', user.email);
     				assert.equal('yoon', user.password);
     				assert.equal(true, user.isStudent);
     				
     				Student.createStudent('hee', 'yoon', function(errMsg, res){
       				assert(errMsg);
       				done();
       			});
   			  });
   			});
   		});
   	});
  }); 
  
  describe('#setCommonFilled', function(){
  	it('should change the status for a student', function(done){
  		Student.createStudent('mdd', 'trains', function(errMsg, student){
  			Student.setCommonFilled(student.user, function(err, res){
  				Student.findOne({user: student.user}, function(err, stud){
  					assert.equal(true, stud.commonFilled);
  					done();
  				});
  			});
  		});
  	});
  });
   
});
