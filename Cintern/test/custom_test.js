var assert = require("assert");
var Application = require('../models/application');
var Custom = require('../models/custom');
var User = require('../models/User');
var Listing = require('../models/listing');
var mongoose = require('mongoose');
var _ = require("../helpers/lodash");

describe('Custom', function() {
  beforeEach(function(done) {
    mongoose.connect('mongodb://localhost/testcintern');
    Custom.remove({}, function() {
      done();
    });
  });

  afterEach(function(done) {
    Custom.remove({}, function() {
      mongoose.connection.close();
      done();
    });
  });

  /**
   * Input: questions
   *    questions is an empty array : should create
   *    a question in questions is missing the question field : should not create
   *    a question in questions is missing the answer field : should not create
   *    a question in questions has the answer field : should create
   *    a question in questions is missing the required field : should not create
   *    1 question of type radio with options : should create
   *    1 question of type check with no options : should create
   *    1 question of type text with no options : should create
   *    1 question of type radio with no options : should not create
   *    1 question of type radio with 1 option : should not create
   *    1 question of type check with options : should not create
   *    1 question of type text with options : should not create
   *    one poorly formatted question : should not create
   *    all correctly formatted questions : should create
   */
  describe('#createTemplate', function() {
    it('should create template empty', function(done){
      var questions = [];
      User.addUser( function(e, user) {
        Listing....( function(e, listing) {
          Custom.createTemplate(listing._id, questions, user._id, function(e, custom) {
            Custom.find({}, function(err, customs) {
              assert.equal(1, customs.length);
              assert.equal(false, customs[0].isTemplate);
              done();
            });
          });
        });
      });
    });

    it('should not create template, missing question field', function(done) {
      var questions = [{
        "type" : "text",
        "required" : true,
      }];
      User.addUser( function(e, user) {
        Listing....( function(e, listing) {
          Custom.createTemplate(listing._id, questions, user._id, function(e, custom) {
            Custom.find({}, function(err, customs) {
              assert.equal(0, customs.length);
              done();
            });
          });
        });
      });
    });

    it('should create template, missing answer field', function(done) {
      var questions = [{
        "question" : "Email",
        "type" : "text",
        "required" : true,
      }];
      User.addUser( function(e, user) {
        Listing....( function(e, listing) {
          Custom.createTemplate(listing._id, questions, user._id, function(e, custom) {
            Custom.find({}, function(err, customs) {
              assert.equal(1, customs.length);
              assert.equal(false, customs[0].isTemplate);
              done();
            });
          });
        });
      }); 
    });

    it('should not create template, not missing answer field', function(done) {
      var questions = [{
        "question" : "Email",
        "type" : "text",
        "required" : true,
        "answer" : "abc@gmail.com"
      }];
      User.addUser( function(e, user) {
        Listing....( function(e, listing) {
          Custom.createTemplate(listing._id, questions, user._id, function(e, custom) {
            Custom.find({}, function(err, customs) {
              assert.equal(0, customs.length);
              done();
            });
          });
        });
      }); 
    });

    it('should not create template, missing required field', function(done) {
      var questions = [{
        "question" : "Email",
        "type" : "text",
      }];
      User.addUser( function(e, user) {
        Listing....( function(e, listing) {
          Custom.createTemplate(listing._id, questions, user._id, function(e, custom) {
            Custom.find({}, function(err, customs) {
              assert.equal(0, customs.length);
              done();
            });
          });
        });
      }); 
    });

    it('should create template, type radio, with options', function(done) {
      var questions = [{
        "question" : "Email",
        "type" : "radio",
        "required" : true,
        "options" : ["a", "b", "c"]
      }];
      User.addUser( function(e, user) {
        Listing....( function(e, listing) {
          Custom.createTemplate(listing._id, questions, user._id, function(e, custom) {
            Custom.find({}, function(err, customs) {
              assert.equal(1, customs.length);
              assert.equal(false, customs[0].isTemplate);
              done();
            });
          });
        });
      }); 
    });

    it('should create template, type check, no options', function(done) {
      var questions = [{
        "question" : "Email",
        "type" : "check",
        "required" : true
      }];
      User.addUser( function(e, user) {
        Listing....( function(e, listing) {
          Custom.createTemplate(listing._id, questions, user._id, function(e, custom) {
            Custom.find({}, function(err, customs) {
              assert.equal(1, customs.length);
              assert.equal(false, customs[0].isTemplate);
              done();
            });
          });
        });
      }); 
    });

    it('should create template, type text, no options', function(done) {
      var questions = [{
        "question" : "Email",
        "type" : "text",
        "required" : true,
      }];
      User.addUser( function(e, user) {
        Listing....( function(e, listing) {
          Custom.createTemplate(listing._id, questions, user._id, function(e, custom) {
            Custom.find({}, function(err, customs) {
              assert.equal(1, customs.length);
              assert.equal(false, customs[0].isTemplate);
              done();
            });
          });
        });
      }); 
    });

    it('should not create template, type radio, no options', function(done) {
      var questions = [{
        "question" : "Email",
        "type" : "radio",
        "required" : true,
      }];
      User.addUser( function(e, user) {
        Listing....( function(e, listing) {
          Custom.createTemplate(listing._id, questions, user._id, function(e, custom) {
            Custom.find({}, function(err, customs) {
              assert.equal(0, customs.length);
              done();
            });
          });
        });
      }); 
    });

    it('should not create template, type radio, 1 options', function(done) {
      var questions = [{
        "question" : "Email",
        "type" : "radio",
        "required" : true,
        "options" : ["a"]
      }];
      User.addUser( function(e, user) {
        Listing....( function(e, listing) {
          Custom.createTemplate(listing._id, questions, user._id, function(e, custom) {
            Custom.find({}, function(err, customs) {
              assert.equal(0, customs.length);
              done();
            });
          });
        });
      }); 
    });

    it('should not create template, type check, options', function(done) {
      var questions = [{
        "question" : "Email",
        "type" : "check",
        "required" : true,
        "options" : ["a"]
      }];
      User.addUser( function(e, user) {
        Listing....( function(e, listing) {
          Custom.createTemplate(listing._id, questions, user._id, function(e, custom) {
            Custom.find({}, function(err, customs) {
              assert.equal(0, customs.length);
              done();
            });
          });
        });
      }); 
    });

    it('should not create template, type text, options', function(done) {
      var questions = [{
        "question" : "Email",
        "type" : "text",
        "required" : true,
        "options" : ["a"]
      }];
      User.addUser( function(e, user) {
        Listing....( function(e, listing) {
          Custom.createTemplate(listing._id, questions, user._id, function(e, custom) {
            Custom.find({}, function(err, customs) {
              assert.equal(0, customs.length);
              done();
            });
          });
        });
      }); 
    });

    it('should not create template, one poorly formatted', function(done) {
      var questions = [{
        "question" : "Email",
        "type" : "check",
        "required" : true,
      }, {
        "question" : "Email",
        "type" : "check",
        "required" : true,
      }, {
        "question" : "Email",
        "type" : "text",
        "required" : true,
      }];
      User.addUser( function(e, user) {
        Listing....( function(e, listing) {
          Custom.createTemplate(listing._id, questions, user._id, function(e, custom) {
            Custom.find({}, function(err, customs) {
              assert.equal(0, customs.length);
              done();
            });
          });
        });
      }); 
    });

    it('should create template, many', function(done) {
      var questions = [{
        "question" : "Email",
        "type" : "check",
        "required" : true,
      }, {
        "question" : "Email",
        "type" : "radio",
        "required" : true,
        "options" : ["a", "b", "c"]
      }, {
        "question" : "Email",
        "type" : "text",
        "required" : true,
      }];
      User.addUser( function(e, user) {
        Listing....( function(e, listing) {
          Custom.createTemplate(listing._id, questions, user._id, function(e, custom) {
            Custom.find({}, function(err, customs) {
              assert.equal(1, customs.length);
              assert.equal(false, customs[0].isTemplate);
              done();
            });
          });
        });
      }); 
    });
  });

  /** 
   * Input: listingId, newOwnerId
   *    listingId is invalid : should not create
   */
  describe('#copyTemplateToSave', function() {
    it()

  });
  
});


