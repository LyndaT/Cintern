var assert = require("assert");
var Application = require('../models/application');
var Custom = require('../models/custom');
var mongoose = require('mongoose');

describe('Application', function() {
  beforeEach(function(done) {
    mongoose.connect('mongodb://localhost/test');
    Application.remove({}, function() {
      done();
    });
  });

  afterEach(function(done) {
    Application.remove({}, function() {
      mongoose.connection.close();
      done();
    });
  });

  describe('#createCommon', function() {
    it('should create a common', function(done) {
      var questions = [{
        "question" : "Email",
        "type" : "text",
        "required" : true,
        "answer" : "abc@gmail.com"
      }, {
        "question" : "Name",
        "type" : "text",
        "required" : true,
        "answer" : "Tester Smith"
      }];
      Application.createCommon(questions, function(e, app) {
        Application.find({}, function(err, apps) {
          assert.equal(1, apps.length);
          done();
        });
      });
    });

    it ('should not create a common if question not in commonQuestions', function(done) {
      var questions = [{
        "question" : "Email FRAUD",
        "type" : "text",
        "required" : true,
        "answer" : "abc@gmail.com"
      }, {
        "question" : "Name",
        "type" : "text",
        "required" : true,
        "answer" : "Tester Smith"
      }];
      Application.createCommon(questions, function() {
        Application.find({}, function(err, apps) {
          assert.equal(0, apps.length);
          done();
        });
      });
    });

    it ('should not create a common if question not answered', function(done) {
      var questions = [{
        "question" : "Email",
        "type" : "text",
        "required" : true,
      }, {
        "question" : "Name",
        "type" : "text",
        "required" : true,
        "answer" : "Tester Smith"
      }];
      Application.createCommon(questions, function() {
        Application.find({}, function(err, apps) {
          assert.equal(0, apps.length);
          done();
        });
      });
    });

    it ('should not create a common if type is wrong for in commonQuestions', function(done) {
      var questions = [{
        "question" : "Email",
        "type" : "text",
        "required" : true,
        "answer" : "abc@gmail.com"
      }, {
        "question" : "Name",
        "type" : "radio",
        "required" : true,
        "answer" : "Tester Smith"
      }];
      Application.createCommon(questions, function() {
        Application.find({}, function(err, apps) {
          assert.equal(0, apps.length);
          done();
        });
      });
    });

    it ('should not create a common if type is options when not allowed for in commonQuestions', function(done) {
      var questions = [{
        "question" : "Email",
        "type" : "text",
        "required" : true,
        "answer" : "abc@gmail.com",
        "options" : ["a", "b", "c"]
      }, {
        "question" : "Name",
        "type" : "form",
        "required" : true,
        "answer" : "Tester Smith"
      }];
      Application.createCommon(questions, function() {
        Application.find({}, function(err, apps) {
          assert.equal(0, apps.length);
          done();
        });
      });
    });

    it ('should not create a common if missing question from commonQuestions', function(done) {
      var questions = [{
        "question" : "Email",
        "type" : "text",
        "required" : true,
        "answer" : "abc@gmail.com",
      }];
      Application.createCommon(questions, function() {
        Application.find({}, function(err, apps) {
          assert.equal(0, apps.length);
          done();
        });
      });
    });
  });
});

