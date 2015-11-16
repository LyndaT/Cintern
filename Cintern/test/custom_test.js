var assert = require("assert");
var Application = require('../models/application');
var Custom = require('../models/custom');
var mongoose = require('mongoose');
var _ = require("../helpers/lodash");

describe('Custom', function() {
  beforeEach(function(done) {
    mongoose.connect('mongodb://localhost/testcintern');
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
   *    1 question of type radio with options but wrong answer : should not create
   *    1 question of type check with wrong answer : should not create
   *    1 question of type check with right answer : should create
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
      Custom.createTemplate(questions, function(e, custom) {
        Custom.find({}, function(err, customs) {
          assert.equal(0, customs.length);
          done();
        });
      });
    });

    /*
    it('should not create app, missing required field', function(done) {
      var questions = [{
        "question" : "Email",
        "type" : "text",
        "answer" : "abc@gmail.com"
      }, {
        "question" : "Name",
        "type" : "text",
        "required" : true,
        "answer" : "Tester Smith"
      }];
      Application.createTemplate(questions, function(e, app) {
        Application.find({}, function(err, apps) {
          assert.equal(0, apps.length);
          done();
        });
      });
    });

    it('should create app, type radio, with options', function(done) {
      var questions = [{
        "question" : "Email",
        "type" : "radio",
        "required" : true,
        "options" : ["a", "b", "c"]
      }];
      Application.createTemplate(questions, function(e, app) {
        Application.find({}, function(err, apps) {
          assert.equal(1, apps.length);
          done();
        });
      });
    });

    it('should create app, type check, no options', function(done) {
      var questions = [{
        "question" : "Email",
        "type" : "check",
        "required" : true
      }];
      Application.createTemplate(questions, function(e, app) {
        Application.find({}, function(err, apps) {
          assert.equal(1, apps.length);
          done();
        });
      });
    });

    it('should create app, type text, no options', function(done) {
      var questions = [{
        "question" : "Email",
        "type" : "text",
        "required" : true,
      }];
      Application.createTemplate(questions, function(e, app) {
        Application.find({}, function(err, apps) {
          assert.equal(1, apps.length);
          done();
        });
      });
    });

    it('should not create app, type radio, no options', function(done) {
      var questions = [{
        "question" : "Email",
        "type" : "radio",
        "required" : true,
      }];
      Application.createTemplate(questions, function(e, app) {
        Application.find({}, function(err, apps) {
          assert.equal(0, apps.length);
          done();
        });
      });
    });

    it('should not create app, type radio, 1 options', function(done) {
      var questions = [{
        "question" : "Email",
        "type" : "radio",
        "required" : true,
        "options" : ["a"]
      }];
      Application.createTemplate(questions, function(e, app) {
        Application.find({}, function(err, apps) {
          assert.equal(0, apps.length);
          done();
        });
      });
    });

    it('should not create app, type check, options', function(done) {
      var questions = [{
        "question" : "Email",
        "type" : "check",
        "required" : true,
        "options" : ["a"]
      }];
      Application.createTemplate(questions, function(e, app) {
        Application.find({}, function(err, apps) {
          assert.equal(0, apps.length);
          done();
        });
      });
    });

    it('should not create app, type text, options', function(done) {
      var questions = [{
        "question" : "Email",
        "type" : "text",
        "required" : true,
        "options" : ["a"]
      }];
      Application.createTemplate(questions, function(e, app) {
        Application.find({}, function(err, apps) {
          assert.equal(0, apps.length);
          done();
        });
      });
    });

    it('should not create app, type radio, options wrong answer', function(done) {
      var questions = [{
        "question" : "Email",
        "type" : "radio",
        "required" : true,
        "answer" : "dog",
        "options" : ["a", "b", "c"]
      }];
      Application.createTemplate(questions, function(e, app) {
        Application.find({}, function(err, apps) {
          assert.equal(0, apps.length);
          done();
        });
      });
    });

    it('should not create app, type check, wrong answer', function(done) {
      var questions = [{
        "question" : "Email",
        "type" : "check",
        "required" : true,
        "answer" : "yum",
      }];
      Application.createTemplate(questions, function(e, app) {
        Application.find({}, function(err, apps) {
          assert.equal(0, apps.length);
          done();
        });
      });
    });

    it('should create app, type check, right answer', function(done) {
      var questions = [{
        "question" : "Email",
        "type" : "check",
        "required" : true,
        "answer" : "yes",
      }];
      Application.createTemplate(questions, function(e, app) {
        Application.find({}, function(err, apps) {
          assert.equal(1, apps.length);
          done();
        });
      });
    });

    it('should not create app, one poorly formatted', function(done) {
      var questions = [{
        "question" : "Email",
        "type" : "check",
        "required" : true,
        "answer" : "yes",
      }, {
        "question" : "Email",
        "type" : "check",
        "required" : true,
        "answer" : "yum",
      }, {
        "question" : "Email",
        "type" : "text",
        "required" : true,
      }];
      Application.createTemplate(questions, function(e, app) {
        Application.find({}, function(err, apps) {
          assert.equal(0, apps.length);
          done();
        });
      });
    });

    it('should create app, many', function(done) {
      var questions = [{
        "question" : "Email",
        "type" : "check",
        "required" : true,
        "answer" : "yes",
      }, {
        "question" : "Email",
        "type" : "radio",
        "required" : true,
        "answer" : "a",
        "options" : ["a", "b", "c"]
      }, {
        "question" : "Email",
        "type" : "text",
        "required" : true,
      }];
      Application.createTemplate(questions, function(e, app) {
        Application.find({}, function(err, apps) {
          assert.equal(1, apps.length);
          assert.equal(3, apps[0].questions.length);
          done();
        });
      });
    });*/
  });

  
});


