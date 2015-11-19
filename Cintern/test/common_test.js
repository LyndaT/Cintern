/**
 * @author Jennifer Wu
 *
 * Test file for the common model
 */
var assert = require("assert");
var Common = require('../models/common');
var User = require('../models/User');
var Application = require('../models/application');
var mongoose = require('mongoose');
var _ = require("../helpers/lodash");

describe('Common', function() {
  beforeEach(function(done) {
    mongoose.connect('mongodb://localhost/testcintern');
    Common.remove({}, function() {
      User.remove({}, function() {
        Application.remove({}, function() {
          done();
        });
      });
    });
  });

  afterEach(function(done) {
    Common.remove({}, function() {
      User.remove({}, function() {
        Application.remove({}, function() {
          mongoose.connection.close();
          done();      
        });
      });
    });
  });

  describe('#createCommon', function() {
    it('should create a common', function(done) {
      User.addUser("jennwu@mit.edu", "asdf123gh", true, function(e, user) {
        assert.equal(true, e === null);
        Common.createCommon(user._id, function(e, common) {
          assert.equal(user._id, common.owner);
          done();
        });
      });
    });
  });

  /**
   * Input: answers
   *    answers is not filled out : should not submit
   *    answers is completely filled out : should submit
   */
  describe('#submitCommon', function() {
    it('should not submit common', function(done) {
      User.addUser("jennwu@mit.edu", "asdf123gh", true, function(e, user) {
        assert.equal(true, e === null);
        Common.createCommon(user._id, function(e, common) {
          var answers = [];
          Application.formatForShow(common.application, function(e, formattedQuestions) {
            formattedQuestions.forEach(function(question) {
              answers.push({ "_id" : question._id, "answer" : "" });
            });
            Common.submitCommon(user._id, answers, function(e, commonSubmitted) {
              assert.equal(false, commonSubmitted);
              Application.formatForShow(common.application, function(e, formattedQuestions) {
                formattedQuestions.forEach(function(question) {
                  assert.equal('',question.answer);
                });
                done();
              });
            });
          });
        });
      });
    });

    it('should submit common', function(done) {
      User.addUser("jennwu@mit.edu", "asdf123gh", true, function(e, user) {
        assert.equal(true, e === null);
        Common.createCommon(user._id, function(e, common) {
          var answers = [];
          Application.formatForShow(common.application, function(e, formattedQuestions) {
            formattedQuestions.forEach(function(question) {
              answers.push({ "_id" : question._id, "answer" : "abc" });
            });
            Common.submitCommon(user._id, answers, function(e, commonSubmitted) {
              assert.equal(true, commonSubmitted);
              Application.formatForShow(common.application, function(e, formattedQuestions) {
                formattedQuestions.forEach(function(question) {
                  assert.equal('abc',question.answer);
                });
                done();
              });
            });
          });
        });
      });
    });
  });
});


