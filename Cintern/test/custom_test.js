var assert = require("assert");
var Custom = require('../models/custom');
var User = require('../models/User');
var Employer = require('../models/Employer');
var Listing = require('../models/listing');
var Application = require('../models/application');
var mongoose = require('mongoose');
var _ = require("../helpers/lodash");

describe('Custom', function() {
  beforeEach(function(done) {
    mongoose.connect('mongodb://localhost/testcintern');
    Custom.remove({}, function() {
      User.remove({}, function() {
        Listing.remove({}, function() {
          Employer.remove({}, function(){
            Application.remove({}, function(){
              done();
            });
          });
        });
      });
    });
  });

  afterEach(function(done) {
    Custom.remove({}, function() {
      User.remove({}, function() {
        Listing.remove({}, function() {
          Employer.remove({}, function() {
            Application.remove({}, function(){
              mongoose.connection.close();
              done();
            })
          });
        });
      });
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
      Employer.createEmployer("jennwu@mit.edu", "asdf123gh", "abc", function(e, emp) {
        Listing.createListing(emp._id, "title", "desc", "reqs", new Date(), function(e) {
          Listing.find({}, function(e, listings) {
            Custom.createTemplate(listings[0]._id, questions, emp.user, function(e, custom) {
              Custom.find({}, function(err, customs) {
                assert.equal(1, customs.length);
                assert.equal(true, customs[0].isTemplate);
                done();
              });
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
      Employer.createEmployer("jennwu@mit.edu", "asdf123gh", "abc", function(e, emp) {
        Listing.createListing(emp._id, "title", "desc", "reqs", new Date(), function(e) {
          Listing.find({}, function(e, listings) {
            Custom.createTemplate(listings[0]._id, questions, emp.user, function(e, custom) {
              Custom.find({}, function(err, customs) {
                assert.equal(0, customs.length);
                done();
              });
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
      Employer.createEmployer("jennwu@mit.edu", "asdf123gh", "abc", function(e, emp) {
        Listing.createListing(emp._id, "title", "desc", "reqs", new Date(), function(e) {
          Listing.find({}, function(e, listings) {
            Custom.createTemplate(listings[0]._id, questions, emp.user, function(e, custom) {
              Custom.find({}, function(err, customs) {
                assert.equal(1, customs.length);
                assert.equal(true, customs[0].isTemplate);
                done();
              });
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
      Employer.createEmployer("jennwu@mit.edu", "asdf123gh", "abc", function(e, emp) {
        Listing.createListing(emp._id, "title", "desc", "reqs", new Date(), function(e) {
          Listing.find({}, function(e, listings) {
            Custom.createTemplate(listings[0]._id, questions, emp.user, function(e, custom) {
              Custom.find({}, function(err, customs) {
                assert.equal(0, customs.length);
                done();
              });
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
      Employer.createEmployer("jennwu@mit.edu", "asdf123gh", "abc", function(e, emp) {
        Listing.createListing(emp._id, "title", "desc", "reqs", new Date(), function(e) {
          Listing.find({}, function(e, listings) {
            Custom.createTemplate(listings[0]._id, questions, emp.user, function(e, custom) {
              Custom.find({}, function(err, customs) {
                assert.equal(0, customs.length);
                done();
              });
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
      Employer.createEmployer("jennwu@mit.edu", "asdf123gh", "abc", function(e, emp) {
        Listing.createListing(emp._id, "title", "desc", "reqs", new Date(), function(e) {
          Listing.find({}, function(e, listings) {
            Custom.createTemplate(listings[0]._id, questions, emp.user, function(e, custom) {
              Custom.find({}, function(err, customs) {
                assert.equal(1, customs.length);
                assert.equal(true, customs[0].isTemplate);
                done();
              });
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
      Employer.createEmployer("jennwu@mit.edu", "asdf123gh", "abc", function(e, emp) {
        Listing.createListing(emp._id, "title", "desc", "reqs", new Date(), function(e) {
          Listing.find({}, function(e, listings) {
            Custom.createTemplate(listings[0]._id, questions, emp.user, function(e, custom) {
              Custom.find({}, function(err, customs) {
                assert.equal(1, customs.length);
                assert.equal(true, customs[0].isTemplate);
                done();
              });
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
      Employer.createEmployer("jennwu@mit.edu", "asdf123gh", "abc", function(e, emp) {
        Listing.createListing(emp._id, "title", "desc", "reqs", new Date(), function(e) {
          Listing.find({}, function(e, listings) {
            Custom.createTemplate(listings[0]._id, questions, emp.user, function(e, custom) {
              Custom.find({}, function(err, customs) {
                assert.equal(1, customs.length);
                assert.equal(true, customs[0].isTemplate);
                done();
              });
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
      Employer.createEmployer("jennwu@mit.edu", "asdf123gh", "abc", function(e, emp) {
        Listing.createListing(emp._id, "title", "desc", "reqs", new Date(), function(e) {
          Listing.find({}, function(e, listings) {
            Custom.createTemplate(listings[0]._id, questions, emp.user, function(e, custom) {
              Custom.find({}, function(err, customs) {
                assert.equal(0, customs.length);
                done();
              });
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
      Employer.createEmployer("jennwu@mit.edu", "asdf123gh", "abc", function(e, emp) {
        Listing.createListing(emp._id, "title", "desc", "reqs", new Date(), function(e) {
          Listing.find({}, function(e, listings) {
            Custom.createTemplate(listings[0]._id, questions, emp.user, function(e, custom) {
              Custom.find({}, function(err, customs) {
                assert.equal(0, customs.length);
                done();
              });
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
      Employer.createEmployer("jennwu@mit.edu", "asdf123gh", "abc", function(e, emp) {
        Listing.createListing(emp._id, "title", "desc", "reqs", new Date(), function(e) {
          Listing.find({}, function(e, listings) {
            Custom.createTemplate(listings[0]._id, questions, emp.user, function(e, custom) {
              Custom.find({}, function(err, customs) {
                assert.equal(0, customs.length);
                done();
              });
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
      Employer.createEmployer("jennwu@mit.edu", "asdf123gh", "abc", function(e, emp) {
        Listing.createListing(emp._id, "title", "desc", "reqs", new Date(), function(e) {
          Listing.find({}, function(e, listings) {
            Custom.createTemplate(listings[0]._id, questions, emp.user, function(e, custom) {
              Custom.find({}, function(err, customs) {
                assert.equal(0, customs.length);
                done();
              });
            });
          });
        });
      }); 
    });

    it('should not create template, one poorly formatted', function(done) {
      var questions = [{
        "question" : "Email",
        "type" : "radio",
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
      Employer.createEmployer("jennwu@mit.edu", "asdf123gh", "abc", function(e, emp) {
        Listing.createListing(emp._id, "title", "desc", "reqs", new Date(), function(e) {
          Listing.find({}, function(e, listings) {
            Custom.createTemplate(listings[0]._id, questions, emp.user, function(e, custom) {
              Custom.find({}, function(err, customs) {
                assert.equal(0, customs.length);
                done();
              });
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
      Employer.createEmployer("jennwu@mit.edu", "asdf123gh", "abc", function(e, emp) {
        Listing.createListing(emp._id, "title", "desc", "reqs", new Date(), function(e) {
          Listing.find({}, function(e, listings) {
            Custom.createTemplate(listings[0]._id, questions, emp.user, function(e, custom) {
              Custom.find({}, function(err, customs) {
                assert.equal(1, customs.length);
                assert.equal(true, customs[0].isTemplate);
                done();
              });
            });
          });
        });
      }); 
    });
  });

  /** 
   * Input: listingId, newOwnerId
   *    listingId is invalid : should not create
   *    newOwnerId is invalid : should not create
   *    listing and ownerId are valid: should create
   */
  describe('#copyTemplateToSave', function() {
    it('listing invalid, should not create', function(done){
      var questions = [];
      Employer.createEmployer("jennwu@mit.edu", "asdf123gh", "abc", function(e, emp) {
        Listing.createListing(emp._id, "title", "desc", "reqs", new Date(), function(e) {
          Listing.find({}, function(e, listings) {
            Custom.createTemplate(listings[0]._id, questions, emp.user, function(e, custom) {
              User.addUser("abc@gmail.com", "abcd", true, function(e, user2) {
                custom.copyTemplateToSave("1", user2._id, function(e, custom) {
                  assert.equal(true, e !== null);
                  done();
                });
              });
            });
          });
        });
      });
    });

    it('new owner invalid, should not create', function(done){
      var questions = [];
      Employer.createEmployer("jennwu@mit.edu", "asdf123gh", "abc", function(e, emp) {
        Listing.createListing(emp._id, "title", "desc", "reqs", new Date(), function(e) {
          Listing.find({}, function(e, listings) {
            Custom.createTemplate(listings[0]._id, questions, emp.user, function(e, custom) {
              User.addUser("abc@gmail.com", "abcd", true, function(e, user2) {
                custom.copyTemplateToSave(listings[0]._id, "1", function(e, custom) {
                  assert.equal(true, e !== null);
                  done();
                });
              });
            });
          });
        });
      });
    });

    it('should create', function(done){
      var questions = [{
        "question" : "Email",
        "type" : "text",
        "required" : true,
      }];
      Employer.createEmployer("jennwu@mit.edu", "asdf123gh", "abc", function(e, emp) {
        Listing.createListing(emp._id, "title", "desc", "reqs", new Date(), function(e) {
          Listing.find({}, function(e, listings) {
            Custom.createTemplate(listings[0]._id, questions, emp.user, function(e, custom) {
              User.addUser("abc@gmail.com", "abcd", true, function(e, user2) {
                custom.copyTemplateToSave(listings[0]._id, user2._id, function(e, custom) {
                  assert.equal(user2._id, custom.owner);
                  assert.equal(listings[0]._id, custom.listing);
                  assert.equal(false, custom.isTemplate);
                  assert.equal("save", custom.state);
                  Application.findOne({ "_id" : custom.application }, function(e, app) {
                    assert.equal(1, app.questions.length);
                    done();
                  })
                });
              });
            }); 
          });
        });
      });
    });
  });

  /**
   * input: userId
   *    user has no customs
   *    user has one custom, one user
   *    user has one custom, multiple users
   *    user has more than one custom
   */
  /*describe('#getCustomsForStudentDash', function() {
    it('#should get no customs', function(done) {
      User.addUser("jennwu@mit.edu", "asdf123gh", true, function(e, user) {
        Custom.getCustomsForStudentDash(user._id, function(e, customs) {
          assert.equal(0, customs.length);
          done();
        });
      });
    });

    it('#should get one custom, one user', function(done) {
      var questions = [];
      User.addUser("jennwu@mit.edu", "asdf123gh", true, function(e, user) {
        Listing....( function(e, l1) {
          Custom.createTemplate(l1._id, questions, user._id, function(e, t1) {
            User.addUser("abc@gmail.com", "abcd", true, function(e, user2) {
              Custom.copyTemplateToSave(l1._id, user2._id, function(e, c1) {
                Custom.getCustomsForStudentDash(user2._id, function(e, customs) {
                  assert.equal(1, customs.length);
                  done();
                });
              });
            });
          });
        });
      });
    });

    it('#should get one custom, multiple users', function(done) {
      var questions = [];
      var questions2 = [{ "question" : "Email", "type" : "text", "required" : true }];
      User.addUser("jennwu@mit.edu", "asdf123gh", true, function(e, user) {
        Listing....( function(e, l1) {
          Custom.createTemplate(l1._id, questions, user._id, function(e, t1) {
            User.addUser("abc@gmail.com", "abcd", true, function(e, user2) {
              User.addUser("abcde@gmail.com", "abcde", true, function(e, user3) {
                Custom.copyTemplateToSave(l1._id, user2._id, function(e, c1) {
                  Custom.copyTemplateToSave(l1._id, user3._id, function(e, c2) {
                    Custom.getCustomsForStudentDash(user2._id, function(e, customs) {
                      assert.equal(1, customs.length);
                      done();
                    });
                  });
                });
              });
            });
          });
        });
      });
    });

    it('#should get two customs', function(done) {
      var questions = [];
      var questions2 = [{ "question" : "Email", "type" : "text", "required" : true }];
      User.addUser("jennwu@mit.edu", "asdf123gh", true, function(e, user) {
        Listing....( function(e, l1) {
          Listing...( function(e, l2) {
            Custom.createTemplate(l1._id, questions, user._id, function(e, t1) {
              Custom.createTemplate(l2._id, questions2, user._id, function(e, t2) {
                User.addUser("abc@gmail.com", "abcd", true, function(e, user2) {
                  Custom.copyTemplateToSave(l1._id, user2._id, function(e, c1) {
                    Custom.copyTemplateToSave(l2._id, user2._id, function(e, c2) {
                      Custom.getCustomsForStudentDash(user2._id, function(e, customs) {
                        assert.equal(2, customs.length);
                        done();
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  });*/

  /**
   * input: listingId
   *    listing has no customs
   *    listing has one custom, one listing
   *    listing has one custom, multiple listings
   *    listing has more than one custom
   */
  /*describe('#getCustomsForListing', function() {
    it('#should get no customs', function(done) {
      Listing.... (function(e, l1) {
        Custom.getCustomsForListing(l1._id, function(e, customs) {
          assert.equal(0, customs.length);
          done();
        });
      });
    });

    it('#should get one custom, one listing', function(done) {
      var questions = [];
      User.addUser("jennwu@mit.edu", "asdf123gh", true, function(e, user) {
        Listing....( function(e, l1) {
          Custom.createTemplate(l1._id, questions, user._id, function(e, t1) {
            User.addUser("abc@gmail.com", "abcd", true, function(e, user2) {
              Custom.copyTemplateToSave(l1._id, user2._id, function(e, c1) {
                Custom.getCustomsForListing(listing._id, function(e, customs) {
                  assert.equal(1, customs.length);
                  done();
                });
              });
            });
          });
        });
      });
    })

    it('#should get one custom, multiple listings', function(done) {
      var questions = [];
      var questions2 = [{ "question" : "Email", "type" : "text", "required" : true }];
      User.addUser("jennwu@mit.edu", "asdf123gh", true, function(e, user) {
        Listing....( function(e, l1) {
          Listing...( function(e, l2) {
            Custom.createTemplate(l1._id, questions, user._id, function(e, t1) {
              Custom.createTemplate(l2._id, questions2, user._id, function(e, t2) {
                User.addUser("abc@gmail.com", "abcd", true, function(e, user2) {
                  Custom.copyTemplateToSave(l1._id, user2._id, function(e, c1) {
                    Custom.copyTemplateToSave(l2._id, user2._id, function(e, c2) {
                      Custom.getCustomsForListing(user2._id, function(e, customs) {
                        assert.equal(2, customs.length);
                        done();
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    });

    it('#should get multiple customs', function(done) {
      var questions = [];
      var questions2 = [{ "question" : "Email", "type" : "text", "required" : true }];
      User.addUser("jennwu@mit.edu", "asdf123gh", true, function(e, user) {
        Listing....( function(e, l1) {
          Custom.createTemplate(l1._id, questions, user._id, function(e, t1) {
            User.addUser("abc@gmail.com", "abcd", true, function(e, user2) {
              User.addUser("abcde@gmail.com", "abcde", true, function(e, user3) {
                Custom.copyTemplateToSave(l1._id, user2._id, function(e, c1) {
                  Custom.copyTemplateToSave(l1._id, user3._id, function(e, c2) {
                    Custom.getCustomsForListing(listing._id, function(e, customs) {
                      assert.equal(2, customs.length);
                      done();
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  });*/

  


/*customSchema.statics.getCustomIfOwner = function(ownerId, customId, callback) {
};

customSchema.statics.getCustomForListing = function(ownerId, listingId, callback) {
};

customSchema.statics.getListingTemplate = function(listingId, callback) {
};

customSchema.methods.withdraw = function(callback) {
};

customSchema.methods.deleteCustom

customSchema.methods.star 

customSchema.methods.unstar 

customSchema.methods.reject

customSchema.methods.update */
  
});



