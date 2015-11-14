var assert = require("assert");
var Application = require('../models/application');
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

  describe('#createTemplate', function() {
    it('should create a template', function(done) {
      Application.createTemplate(null, [], null, function(e, app) {
        Application.find({}, function(err, apps) {
          assert.equal(1, apps.length);
          done();
        });
      });
    });

    it ('should not create a template if list question has no options', function(done) {
      var questionList = [{
        "question" : "Name",
        "type" : "list", 
        "required" : true,
      }];
      Application.createTemplate(null, questionList, null, function() {
        Application.find({}, function(err, apps) {
          assert.equal(0, apps.length);
          done();
        });
      });
    });

    it ('should not create a template if box question has options', function(done) {
      var questionList = [{
        "question" : "Name",
        "type" : "box",
        "options" : ["1", "2"], 
        "required" : true,
      }];
      Application.createTemplate(null, questionList, null, function() {
        Application.find({}, function(err, apps) {
          assert.equal(0, apps.length);
          done();
        });
      });
    });

    it ('should not create a template if form question has options', function(done) {
      var questionList = [{
        "question" : "Name",
        "type" : "form",
        "options" : ["1", "2"], 
        "required" : true,
      }];
      Application.createTemplate(null, questionList, null, function() {
        Application.find({}, function(err, apps) {
          assert.equal(0, apps.length);
          done();
        });
      });
    });

    it ('should create a template if list question has options', function(done) {
      var questionList = [{
        "question" : "Name",
        "type" : "list",
        "options" : ["1", "2"], 
        "required" : true,
      }];
      Application.createTemplate(null, questionList, null, function() {
        Application.find({}, function(err, apps) {
          assert.equal(1, apps.length);
          done();
        });
      });
    });
  });
});
