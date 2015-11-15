var assert = require("assert");
var Application = require('../models/application');
var Custom = require('../models/custom');
var mongoose = require('mongoose');
var _ = require("../helpers/lodash");

describe('Application', function() {
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
   *    questions matches commonQuestions format and answers are filled : should create
   *    not all questions in commonQuesions : should not create
   *    not all required questions are answered : should not create
   *    a field for a question in commonQuestoins has been changed : should not create
   *    questions is missing a question : should not create
   *    questions has an extra question : should not create
   */
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
          assert.equal(true, apps[0].isCommon);
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

  /**
   * Input: questions
   *    questions is an empty array : should create
   *    a question in questions is missing the question field : should not create
   *    a question in questions is missing the answer field : should create
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
  describe('#createNotCommon', function() {
    it('should create app empty', function(done){
      var questions = [];
      Application.createNotCommon(questions, function(e, app) {
        Application.find({}, function(err, apps) {
          assert.equal(1, apps.length);
          assert.equal(false, apps[0].isCommon);
          done();
        });
      });
    });

    it('should not create app, missing question field', function(done) {
      var questions = [{
        "type" : "text",
        "required" : true,
        "answer" : "abc@gmail.com"
      }];
      Application.createNotCommon(questions, function(e, app) {
        Application.find({}, function(err, apps) {
          assert.equal(0, apps.length);
          done();
        });
      });
    });

    it('should create app, missing answer field', function(done) {
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
      Application.createNotCommon(questions, function(e, app) {
        Application.find({}, function(err, apps) {
          assert.equal(1, apps.length);
          assert.equal(false, apps[0].isCommon);
          done();
        });
      });
    });

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
      Application.createNotCommon(questions, function(e, app) {
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
      Application.createNotCommon(questions, function(e, app) {
        Application.find({}, function(err, apps) {
          assert.equal(1, apps.length);
          assert.equal(false, apps[0].isCommon);
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
      Application.createNotCommon(questions, function(e, app) {
        Application.find({}, function(err, apps) {
          assert.equal(1, apps.length);
          assert.equal(false, apps[0].isCommon);
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
      Application.createNotCommon(questions, function(e, app) {
        Application.find({}, function(err, apps) {
          assert.equal(1, apps.length);
          assert.equal(false, apps[0].isCommon);
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
      Application.createNotCommon(questions, function(e, app) {
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
      Application.createNotCommon(questions, function(e, app) {
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
      Application.createNotCommon(questions, function(e, app) {
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
      Application.createNotCommon(questions, function(e, app) {
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
      Application.createNotCommon(questions, function(e, app) {
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
      Application.createNotCommon(questions, function(e, app) {
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
      Application.createNotCommon(questions, function(e, app) {
        Application.find({}, function(err, apps) {
          assert.equal(1, apps.length);
          assert.equal(false, apps[0].isCommon);
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
      Application.createNotCommon(questions, function(e, app) {
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
      Application.createNotCommon(questions, function(e, app) {
        Application.find({}, function(err, apps) {
          assert.equal(1, apps.length);
          assert.equal(3, apps[0].questions.length);
          assert.equal(false, apps[0].isCommon);
          done();
        });
      });
    });
  });

  /**
   * Input : appId
   *    isCommon is true for app associated with appId : should not delete
   *    isCommon is false for app associaed with appId : should delete
   */
  describe('#deleteNotCommonApplication', function() {
    it('should not delete application, common', function(done) {
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
          assert.equal(true, apps[0].isCommon);
          Application.deleteNotCommonApplication(apps[0]._id, function(e) {
            Application.find({}, function(err, apps2) {
              assert.equal(1, apps2.length);
              assert.equal(true, apps2[0].isCommon);
              done();
            });
          });
        });
      });
    });

    it('should delete application, not common', function(done) {
      var questions = [];
      Application.createNotCommon(questions, function(e, app) {
        Application.find({}, function(err, apps) {
          assert.equal(1, apps.length);
          assert.equal(false, apps[0].isCommon);
          Application.deleteNotCommonApplication(apps[0]._id, function(e) {
            Application.find({}, function(err, apps2) {
              assert.equal(0, apps2.length);
              done();
            });
          });
        });
      });
    });
  });
  
  /**
   * Inputs: appId, newQuestions, isSubmission
   *    a question in newQuestions does not have same question field : should error
   *    a question in newQuestions does not have same required field : should error
   *    a question in newQuestions does not have same options field : should error
   *    a question in newQuestions does not have same answer field : should update
   *    a question in newQuestions does not have same text field : should error
   *    a question in newQuestions has the wrong answer field : should error
   *    a question in newQuestions has field required set to true and no answer, isSubmission is true : should error
   *    a question in newQuestions has field required set to false and no answer, isSubmission is true : should update
   *    a question in newQuestions has field required set to true and no answer, isSubmission is false : should update
   *    newQuestions is the same as the original questions for appId, isSubmission is false : should update
   */
  describe('#updateQuestions', function() {
    it('should error if question in newQuestions does not have same question field', function(done) {
      var questions = [{
        "question" : "Email",
        "type" : "radio",
        "required" : true,
        "options" : ["a", "b", "c"]
      }];
      var newQuestions = [{
        "question" : "Jon",
        "type" : "radio",
        "required" : true,
        "options" : ["a", "b", "c"]
      }];
      Application.createNotCommon(questions, function(e, app) {
        Application.find({}, function(err, apps) {
          assert.equal(1, apps.length);
          assert.equal(false, apps[0].isCommon);
          Application.updateQuestions(apps[0]._id, newQuestions, false, function(e, app) {
            assert.equal(true, e !== null);
            done();
          });
        });
      });
    });

    it('should error if question in newQuestions does not have same required field', function(done) {
      var questions = [{
        "question" : "Email",
        "type" : "radio",
        "required" : true,
        "options" : ["a", "b", "c"]
      }];
      var newQuestions = [{
        "question" : "Email",
        "type" : "radio",
        "required" : false,
        "options" : ["a", "b", "c"]
      }];
      Application.createNotCommon(questions, function(e, app) {
        Application.find({}, function(err, apps) {
          assert.equal(1, apps.length);
          assert.equal(false, apps[0].isCommon);
          Application.updateQuestions(apps[0]._id, newQuestions, false, function(e, app) {
            assert.equal(true, e !== null);
            done();
          });
        });
      });
    });

    it('should error if question in newQuestions does not have same options field', function(done) {
      var questions = [{
        "question" : "Email",
        "type" : "radio",
        "required" : true,
        "options" : ["a", "b"]
      }];
      var newQuestions = [{
        "question" : "Email",
        "type" : "radio",
        "required" : true,
        "options" : ["a", "b", "c"]
      }];
      Application.createNotCommon(questions, function(e, app) {
        Application.find({}, function(err, apps) {
          assert.equal(1, apps.length);
          assert.equal(false, apps[0].isCommon);
          Application.updateQuestions(apps[0]._id, newQuestions, false, function(e, app) {
            assert.equal(true, e !== null);
            done();
          });
        });
      });
    });

    it('should error if question in newQuestions does not have same type field', function(done) {
      var questions = [{
        "question" : "Email",
        "type" : "text",
        "required" : true,
      }];
      var newQuestions = [{
        "question" : "Email",
        "type" : "check",
        "required" : false,
      }];
      Application.createNotCommon(questions, function(e, app) {
        Application.find({}, function(err, apps) {
          assert.equal(1, apps.length);
          assert.equal(false, apps[0].isCommon);
          Application.updateQuestions(apps[0]._id, newQuestions, false, function(e, app) {
            assert.equal(true, e !== null);
            done();
          });
        });
      });
    });

    it('should update if question in newQuestions does not have same answer field', function(done) {
      var questions = [{
        "question" : "Email",
        "type" : "text",
        "required" : true,
      }];
      var newQuestions = [{
        "question" : "Email",
        "type" : "text",
        "required" : true,
        "answer" : "yum"
      }];
      Application.createNotCommon(questions, function(e, app) {
        Application.find({}, function(err, apps) {
          assert.equal(1, apps.length);
          assert.equal(false, apps[0].isCommon);
          Application.updateQuestions(apps[0]._id, newQuestions, false, function(e, app) {
            console.log(app + "application");
            assert.equal(true, e === null);
            done();
          });
        });
      });
    });

    it('should error if question in newQuestions has wrong answer', function(done) {
      var questions = [{
        "question" : "Email",
        "type" : "check",
        "required" : true,
      }];
      var newQuestions = [{
        "question" : "Email",
        "type" : "check",
        "required" : true,
        "answer" : "yum"
      }];
      Application.createNotCommon(questions, function(e, app) {
        Application.find({}, function(err, apps) {
          assert.equal(1, apps.length);
          assert.equal(false, apps[0].isCommon);
          Application.updateQuestions(apps[0]._id, newQuestions, false, function(e, app) {
            assert.equal(true, e !== null);
            done();
          });
        });
      });
    });
  });
});


