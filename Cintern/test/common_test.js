var assert = require("assert");
var Common = require('../models/common');
var User = require('../models/User');
var mongoose = require('mongoose');
var _ = require("../helpers/lodash");

describe('Custom', function() {
  beforeEach(function(done) {
    mongoose.connect('mongodb://localhost/testcintern');
    Common.remove({}, function() {
      User.remove({}, function() {
        done();        
      });
    });
  });

  afterEach(function(done) {
    Common.remove({}, function() {
      User.remove({}, function() {
        mongoose.connection.close();
        done();      
      });
    });
  });

  describe('#createCommon', function() {
    it('should create a common', function(done) {
      User.addUser("jennwu@mit.edu", "asdf123gh", true, function(e, user) {
        assert.equal(true, e === null);
        Common.createCommon(user.user._id, function(e, common) {
          assert.equal(user.user._id, common.owner);
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
  /*describe('#submitCommon', function() {
    it('should not submit common', function(done) {
      User.addUser("jennwu@mit.edu", "asdf123gh", true, function(e, user) {
        assert.equal(true, e === null);
        Common.createCommon(user.user._id, function(e, common) {
          var answers = [];
          assert.equal(user.user._id, common.owner);
          done();
        });
      });
    });
  });*/
});


