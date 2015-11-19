/**
 * @author Jennifer Wu
 *
 * Test file for the custom model
 */
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
                Custom.copyTemplateToSave("1", user2._id, function(e, custom) {
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
                Custom.copyTemplateToSave(listings[0]._id, "1", function(e, custom) {
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
                Custom.copyTemplateToSave(listings[0]._id, user2._id, function(e, custom) {
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
  describe('#getCustomsForStudentDash', function() {
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
      Employer.createEmployer("jennwu@mit.edu", "asdf123gh", "abc", function(e, emp) {
        Listing.createListing(emp._id, "title", "desc", "reqs", new Date(), function(e) {
          Listing.find({}, function(e, listings) {
            Custom.createTemplate(listings[0]._id, questions, emp.user, function(e, custom) {
              User.addUser("abc@gmail.com", "abcd", true, function(e, user2) {
                Custom.copyTemplateToSave(listings[0]._id, user2._id, function(e, c1) {
                  Custom.getCustomsForStudentDash(user2._id, function(e, customs) {
                    assert.equal(1, customs.length);
                    assert.equal(listings[0]._id.toString(), customs[0].listing.toString());
                    done();
                  });
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
      Employer.createEmployer("jennwu@mit.edu", "asdf123gh", "abc", function(e, emp) {
        Listing.createListing(emp._id, "title", "desc", "reqs", new Date(), function(e) {
          Listing.find({}, function(e, listings) {
            Custom.createTemplate(listings[0]._id, questions, emp.user, function(e, custom) {
              User.addUser("abc@gmail.com", "abcd", true, function(e, user2) {
                User.addUser("abcd@gmail.com", "abcde", true, function(e, user3) {
                  Custom.copyTemplateToSave(listings[0]._id, user2._id, function(e, custom) {
                    Custom.copyTemplateToSave(listings[0]._id, user3._id, function(e, c2) {
                      Custom.getCustomsForStudentDash(user2._id, function(e, customs) {
                        assert.equal(1, customs.length);
                        assert.equal(listings[0]._id.toString(), customs[0].listing.toString());
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

    it('#should get two customs', function(done) {
      var questions = [];
      var questions2 = [{ "question" : "Email", "type" : "text", "required" : true }];
      Employer.createEmployer("jennwu@mit.edu", "asdf123gh", "abc", function(e, emp) {
        Listing.createListing(emp._id, "title", "desc", "reqs", new Date(), function(e) {
          Listing.createListing(emp._id, "a", "b", "c", new Date(), function(e) {
            Listing.find({}, function(e, listings) {
              Custom.createTemplate(listings[0]._id, questions, emp.user, function(e, custom) {
                Custom.createTemplate(listings[1]._id, questions2, emp.user, function(e, custom2) {
                  User.addUser("abc@gmail.com", "abcd", true, function(e, user2) {
                    Custom.copyTemplateToSave(listings[0]._id, user2._id, function(e, c1) {
                      Custom.copyTemplateToSave(listings[1]._id, user2._id, function(e, c2) {
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
    });
  });

  /**
   * input: listingId
   *    listing has no customs
   *    custom under listing, not subm or star : no customs
   *    custom under listing, subm : 1 custom
   *    custom under listing, star : 1 custom
   */
  describe('#getCustomsForListingDash', function() {
    it('should get no customs', function(done) {
      Employer.createEmployer("jennwu@mit.edu", "asdf123gh", "abc", function(e, emp) {
        Listing.createListing(emp._id, "title", "desc", "reqs", new Date(), function(e) {
          Listing.find({}, function(e, listings) {
            Custom.getCustomsForListingDash(listings[0]._id, function(e, customs) {
              assert.equal(0, customs.length);
              done();
            });
          });
        });
      });
    });

    it('custom under listing, not subm or star', function(done) {
      var questions = [];
      Employer.createEmployer("jennwu@mit.edu", "asdf123gh", "abc", function(e, emp) {
        Listing.createListing(emp._id, "title", "desc", "reqs", new Date(), function(e) {
          Listing.find({}, function(e, listings) {
            Custom.createTemplate(listings[0]._id, questions, emp._id, function(e, t1) {
              User.addUser("abc@gmail.com", "abcd", true, function(e, user2) {
                Custom.copyTemplateToSave(listings[0]._id, user2._id, function(e, c1) {
                  assert.equal("save", c1.state);
                  Custom.getCustomsForListingDash(listings[0]._id, function(e, customs) {
                    assert.equal(0, customs.length);
                    done();
                  });
                });
              });
            });
          });
        });
      });
    });

    it('custom under listing, subm', function(done) {
      var questions = [];
      Employer.createEmployer("jennwu@mit.edu", "asdf123gh", "abc", function(e, emp) {
        Listing.createListing(emp._id, "title", "desc", "reqs", new Date(), function(e) {
          Listing.find({}, function(e, listings) {
            Custom.createTemplate(listings[0]._id, questions, emp._id, function(e, t1) {
              User.addUser("abc@gmail.com", "abcd", true, function(e, user2) {
                Custom.copyTemplateToSave(listings[0]._id, user2._id, function(e, c1) {
                  assert.equal("save", c1.state);
                  Custom.update(c1._id, [], true, function(e, c1) {
                    Custom.getCustomsForListingDash(listings[0]._id, function(e, customs) {
                      assert.equal(1, customs.length);
                      assert.equal("subm", customs[0].state);
                      assert.equal(listings[0]._id.toString(), customs[0].listing.toString());
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

    it('custom under listing, star', function(done) {
      var questions = [];
      Employer.createEmployer("jennwu@mit.edu", "asdf123gh", "abc", function(e, emp) {
        Listing.createListing(emp._id, "title", "desc", "reqs", new Date(), function(e) {
          Listing.find({}, function(e, listings) {
            Custom.createTemplate(listings[0]._id, questions, emp._id, function(e, t1) {
              User.addUser("abc@gmail.com", "abcd", true, function(e, user2) {
                Custom.copyTemplateToSave(listings[0]._id, user2._id, function(e, c1) {
                  assert.equal("save", c1.state);
                  Custom.update(c1._id, [], true, function(e, c1) {
                    assert.equal("subm", c1.state);
                    Custom.star(c1._id, function(e, c2) {
                      Custom.getCustomsForListingDash(listings[0]._id, function(e, customs) {
                        assert.equal(1, customs.length);
                        assert.equal("star", customs[0].state);
                        assert.equal(listings[0]._id.toString(), customs[0].listing.toString());
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
  });

  /**
   * input: ownerId, customId
   *    customId does not match ownerId : false
   *    customId does match ownerId : true
   */
  describe('#getIfOwner', function() {
    it('false if customId does not match ownerId', function(done) {
      var questions = [];
      Employer.createEmployer("jennwu@mit.edu", "asdf123gh", "abc", function(e, emp) {
        Listing.createListing(emp._id, "title", "desc", "reqs", new Date(), function(e) {
          Listing.find({}, function(e, listings) {
            Custom.createTemplate(listings[0]._id, questions, emp.user, function(e, custom) {
              User.addUser("abc@gmail.com", "abcd", true, function(e, user2) {
                Custom.copyTemplateToSave(listings[0]._id, user2._id, function(e, c1) {
                  Custom.getIfOwner(emp.user, c1._id, function(e, c) {
                    assert.equal(true, e !== null)
                    done();
                  });
                });
              });
            });
          });
        });
      });
    });

    it('should get if customId does match ownerId', function(done) {
      var questions = [];
      Employer.createEmployer("jennwu@mit.edu", "asdf123gh", "abc", function(e, emp) {
        Listing.createListing(emp._id, "title", "desc", "reqs", new Date(), function(e) {
          Listing.find({}, function(e, listings) {
            Custom.createTemplate(listings[0]._id, questions, emp.user, function(e, temp) {
              User.addUser("abc@gmail.com", "abcd", true, function(e, user2) {
                Custom.copyTemplateToSave(listings[0]._id, user2._id, function(e, c1) {
                  Custom.getIfOwner(user2._id, c1._id, function(e, c) {
                    assert.equal(true, e === null);
                    Custom.getIfOwner(emp.user, temp._id, function(e, c) {
                      assert.equal(true, e === null);
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

  /**
   * input: ownerId, listingId
   *    ownerId does not match listingId : get none
   *    ownerId does match listingId state is not subm or save : get none
   *    ownerId does match listingId state is subm : get custom
   *    ownerId does match listingId state is star : get custom
   */
  describe('#getStarOrSubmCustomForListing', function() {
    it('should not get if listing does not match owner', function(done) {
      var questions = [];
      Employer.createEmployer("jennwu@mit.edu", "asdf123gh", "abc", function(e, emp) {
        Listing.createListing(emp._id, "title", "desc", "reqs", new Date(), function(e) {
          Listing.find({}, function(e, listings) {
            Custom.createTemplate(listings[0]._id, questions, emp.user, function(e, temp) {
              User.addUser("abc@gmail.com", "abcd", true, function(e, user2) {
                Custom.copyTemplateToSave(listings[0]._id, user2._id, function(e, c1) {
                  Custom.getStarOrSubmCustomForListing("2", listings[0]._id, function(e, custom) {
                    assert.equal(true, e !== null);
                    done();
                  });
                });
              });
            });
          });
        });
      });
    });

    it('should not get if listing match owner but state not subm or save', function(done) {
      var questions = [];
      Employer.createEmployer("jennwu@mit.edu", "asdf123gh", "abc", function(e, emp) {
        Listing.createListing(emp._id, "title", "desc", "reqs", new Date(), function(e) {
          Listing.find({}, function(e, listings) {
            Custom.createTemplate(listings[0]._id, questions, emp.user, function(e, temp) {
              User.addUser("abc@gmail.com", "abcd", true, function(e, user2) {
                Custom.copyTemplateToSave(listings[0]._id, user2._id, function(e, c1) {
                  Custom.getStarOrSubmCustomForListing(user2._id, listings[0]._id, function(e, custom) {
                    assert.equal(true, e !== null);
                    done();
                  });
                });
              });
            });
          });
        });
      });
    });

    it('should get if listing does match owner and state subm', function(done) {
      var questions = [];
      Employer.createEmployer("jennwu@mit.edu", "asdf123gh", "abc", function(e, emp) {
        Listing.createListing(emp._id, "title", "desc", "reqs", new Date(), function(e) {
          Listing.find({}, function(e, listings) {
            Custom.createTemplate(listings[0]._id, questions, emp.user, function(e, temp) {
              User.addUser("abc@gmail.com", "abcd", true, function(e, user2) {
                Custom.copyTemplateToSave(listings[0]._id, user2._id, function(e, c1) {
                  Custom.update(c1._id, [], true, function(e, c1) {
                    Custom.getStarOrSubmCustomForListing(user2._id, listings[0]._id, function(e, custom) {
                      assert.equal("subm", custom.state);
                      assert.equal(user2._id.toString(), custom.owner.toString());
                      assert.equal(listings[0]._id.toString(), custom.listing.toString());
                      done();
                    });
                  })
                });
              });
            });
          });
        });
      });
    });

    it('should get if listing does match owner and state star', function(done) {
      var questions = [];
      Employer.createEmployer("jennwu@mit.edu", "asdf123gh", "abc", function(e, emp) {
        Listing.createListing(emp._id, "title", "desc", "reqs", new Date(), function(e) {
          Listing.find({}, function(e, listings) {
            Custom.createTemplate(listings[0]._id, questions, emp.user, function(e, temp) {
              User.addUser("abc@gmail.com", "abcd", true, function(e, user2) {
                Custom.copyTemplateToSave(listings[0]._id, user2._id, function(e, c1) {
                  Custom.update(c1._id, [], true, function(e, c1) {
                    Custom.star(c1._id, function(e, c1) {
                      Custom.getStarOrSubmCustomForListing(user2._id, listings[0]._id, function(e, custom) {
                        assert.equal("star", custom.state);
                        assert.equal(user2._id.toString(), custom.owner.toString());
                        assert.equal(listings[0]._id.toString(), custom.listing.toString());
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

  });

  /**
   * input: listingId
   *    listingId is not valid : get none
   *    listingId is valid : get template
   */
  describe('#getListingTemplate', function() {
    it('should not get if listing ivalid', function(done) {
      var questions = [];
      Employer.createEmployer("jennwu@mit.edu", "asdf123gh", "abc", function(e, emp) {
        Listing.createListing(emp._id, "title", "desc", "reqs", new Date(), function(e) {
          Listing.find({}, function(e, listings) {
            Custom.createTemplate(listings[0]._id, questions, emp.user, function(e, temp) {
              Custom.getListingTemplate("1", function(e, temp) {
                assert.equal(true, e !== null);
                done();
              });
            });
          });
        });
      });
    });

    it('should get if listing valid', function(done) {
      var questions = [];
      Employer.createEmployer("jennwu@mit.edu", "asdf123gh", "abc", function(e, emp) {
        Listing.createListing(emp._id, "title", "desc", "reqs", new Date(), function(e) {
          Listing.find({}, function(e, listings) {
            Custom.createTemplate(listings[0]._id, questions, emp.user, function(e, temp) {
              Custom.getListingTemplate(listings[0]._id, function(e, temp) {
                assert.equal(true, temp.isTemplate);
                assert.equal(listings[0]._id.toString(), temp.listing.toString());
                assert.equal(emp.user.toString(), temp.owner.toString());
                done();
              });
            });
          });
        });
      });
    });

  });

  /**
   * input: customId
   *    custom is in state save : cannot withdraw
   *    custom is in state subm : can withdraw
   *    custom is in state star : can withdraw
   *    custom is in state rej : cannot withdraw
   *    custom is a template : cannot withdraw
   */
  describe('#withdraw', function() {
    it('cannot withdraw, custom state save', function(done) {
      var questions = [];
      Employer.createEmployer("jennwu@mit.edu", "asdf123gh", "abc", function(e, emp) {
        Listing.createListing(emp._id, "title", "desc", "reqs", new Date(), function(e) {
          Listing.find({}, function(e, listings) {
            Custom.createTemplate(listings[0]._id, questions, emp._id, function(e, t1) {
              User.addUser("abc@gmail.com", "abcd", true, function(e, user2) {
                Custom.copyTemplateToSave(listings[0]._id, user2._id, function(e, c1) {
                  assert.equal("save", c1.state);
                  Custom.withdraw(c1._id, function(e, custom) {
                    assert.equal(true, e !== null);
                    done();
                  });
                });
              });
            });
          });
        });
      });
    });

    it('can withdraw, custom state subm', function(done) {
      var questions = [];
      Employer.createEmployer("jennwu@mit.edu", "asdf123gh", "abc", function(e, emp) {
        Listing.createListing(emp._id, "title", "desc", "reqs", new Date(), function(e) {
          Listing.find({}, function(e, listings) {
            Custom.createTemplate(listings[0]._id, questions, emp._id, function(e, t1) {
              User.addUser("abc@gmail.com", "abcd", true, function(e, user2) {
                Custom.copyTemplateToSave(listings[0]._id, user2._id, function(e, c1) {
                  assert.equal("save", c1.state);
                  Custom.update(c1._id, [], true, function(e, c1) {
                    assert.equal("subm", c1.state);
                    Custom.withdraw(c1._id, function(e, custom) {
                      assert.equal("with", custom.state);
                      assert.equal(listings[0]._id.toString(), custom.listing.toString());
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

    it('can withdraw, custom state star', function(done) {
      var questions = [];
      Employer.createEmployer("jennwu@mit.edu", "asdf123gh", "abc", function(e, emp) {
        Listing.createListing(emp._id, "title", "desc", "reqs", new Date(), function(e) {
          Listing.find({}, function(e, listings) {
            Custom.createTemplate(listings[0]._id, questions, emp._id, function(e, t1) {
              User.addUser("abc@gmail.com", "abcd", true, function(e, user2) {
                Custom.copyTemplateToSave(listings[0]._id, user2._id, function(e, c1) {
                  assert.equal("save", c1.state);
                  Custom.update(c1._id, [], true, function(e, c1) {
                    assert.equal("subm", c1.state);
                    Custom.star(c1._id, function(e, c1) {
                      assert.equal("star", c1.state);
                      Custom.withdraw(c1._id, function(e, custom) {
                        assert.equal("with", custom.state);
                        assert.equal(listings[0]._id.toString(), custom.listing.toString());
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

    it('cannot withdraw, custom state reject', function(done) {
      var questions = [];
      Employer.createEmployer("jennwu@mit.edu", "asdf123gh", "abc", function(e, emp) {
        Listing.createListing(emp._id, "title", "desc", "reqs", new Date(), function(e) {
          Listing.find({}, function(e, listings) {
            Custom.createTemplate(listings[0]._id, questions, emp._id, function(e, t1) {
              User.addUser("abc@gmail.com", "abcd", true, function(e, user2) {
                Custom.copyTemplateToSave(listings[0]._id, user2._id, function(e, c1) {
                  assert.equal("save", c1.state);
                  Custom.update(c1._id, [], true, function(e, c1) {
                    assert.equal("subm", c1.state);
                    Custom.reject(c1._id, function(e, c1) {
                      assert.equal("rej", c1.state);
                      Custom.withdraw(c1._id, function(e, custom) {
                        assert.equal(true, e !== null);
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

    it('cannot withdraw, template', function(done) {
      var questions = [];
      Employer.createEmployer("jennwu@mit.edu", "asdf123gh", "abc", function(e, emp) {
        Listing.createListing(emp._id, "title", "desc", "reqs", new Date(), function(e) {
          Listing.find({}, function(e, listings) {
            Custom.createTemplate(listings[0]._id, questions, emp._id, function(e, t1) {        
              Custom.withdraw(t1._id, function(e, custom) {
                assert.equal(true, e !== null);
                done();
              });
            });
          });
        });
      });
    });
  
  });

  /**
   * input: customId
   *    custom is in state save : can delete
   *    custom is in state subm : cannot delete
   *    custom is in state star : cannot delete
   *    custom is in state with : cannot delete
   *    custom is in state rej : cannot delete
   *    custom is a template : cannot reject
   */
  describe('#deleteCustom', function() {
    it('cannot delete, custom state save', function(done) {
      var questions = [];
      Employer.createEmployer("jennwu@mit.edu", "asdf123gh", "abc", function(e, emp) {
        Listing.createListing(emp._id, "title", "desc", "reqs", new Date(), function(e) {
          Listing.find({}, function(e, listings) {
            Custom.createTemplate(listings[0]._id, questions, emp._id, function(e, t1) {
              User.addUser("abc@gmail.com", "abcd", true, function(e, user2) {
                Custom.copyTemplateToSave(listings[0]._id, user2._id, function(e, c1) {
                  assert.equal("save", c1.state);
                  var appId = c1.application;
                  Custom.deleteCustom(c1._id, function(e) {
                    Custom.find({ "_id" : c1._id }, function(e, customs) {
                      assert.equal(0, customs.length);
                      Application.find({ "_id" : appId }, function(e, applications) {
                        assert.equal(0, customs.length);
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

    it('cannot delete, custom state subm', function(done) {
      var questions = [];
      Employer.createEmployer("jennwu@mit.edu", "asdf123gh", "abc", function(e, emp) {
        Listing.createListing(emp._id, "title", "desc", "reqs", new Date(), function(e) {
          Listing.find({}, function(e, listings) {
            Custom.createTemplate(listings[0]._id, questions, emp._id, function(e, t1) {
              User.addUser("abc@gmail.com", "abcd", true, function(e, user2) {
                Custom.copyTemplateToSave(listings[0]._id, user2._id, function(e, c1) {
                  assert.equal("save", c1.state);
                  Custom.update(c1._id, [], true, function(e, c1) {
                    assert.equal("subm", c1.state);
                    var appId = c1.application;
                    Custom.deleteCustom(c1._id, function(e) {
                      Custom.find({ "_id" : c1._id }, function(e, customs) {
                        assert.equal(1, customs.length);
                        Application.find({ "_id" : appId }, function(e, applications) {
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
      });
    });

    it('cannot delete, custom state star', function(done) {
      var questions = [];
      Employer.createEmployer("jennwu@mit.edu", "asdf123gh", "abc", function(e, emp) {
        Listing.createListing(emp._id, "title", "desc", "reqs", new Date(), function(e) {
          Listing.find({}, function(e, listings) {
            Custom.createTemplate(listings[0]._id, questions, emp._id, function(e, t1) {
              User.addUser("abc@gmail.com", "abcd", true, function(e, user2) {
                Custom.copyTemplateToSave(listings[0]._id, user2._id, function(e, c1) {
                  assert.equal("save", c1.state);
                  Custom.update(c1._id, [], true, function(e, c1) {
                    assert.equal("subm", c1.state);
                    Custom.star(c1._id, function(e, c1) {
                      assert.equal("star", c1.state);
                      var appId = c1.application;
                      Custom.deleteCustom(c1._id, function(e) {
                        Custom.find({ "_id" : c1._id }, function(e, customs) {
                          assert.equal(1, customs.length);
                          Application.find({ "_id" : appId }, function(e, applications) {
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
        });
      });
    });

    it('cannot delete, custom state with', function(done) {
      var questions = [];
      Employer.createEmployer("jennwu@mit.edu", "asdf123gh", "abc", function(e, emp) {
        Listing.createListing(emp._id, "title", "desc", "reqs", new Date(), function(e) {
          Listing.find({}, function(e, listings) {
            Custom.createTemplate(listings[0]._id, questions, emp._id, function(e, t1) {
              User.addUser("abc@gmail.com", "abcd", true, function(e, user2) {
                Custom.copyTemplateToSave(listings[0]._id, user2._id, function(e, c1) {
                  assert.equal("save", c1.state);
                  Custom.update(c1._id, [], true, function(e, c1) {
                    assert.equal("subm", c1.state);
                    Custom.withdraw(c1._id, function(e, custom) {
                      assert.equal("with", custom.state);
                      var appId = c1.application;
                      Custom.deleteCustom(c1._id, function(e) {
                        Custom.find({ "_id" : c1._id }, function(e, customs) {
                          assert.equal(1, customs.length);
                          Application.find({ "_id" : appId }, function(e, applications) {
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
        });
      });
    });

    it('cannot delete, custom state reject', function(done) {
      var questions = [];
      Employer.createEmployer("jennwu@mit.edu", "asdf123gh", "abc", function(e, emp) {
        Listing.createListing(emp._id, "title", "desc", "reqs", new Date(), function(e) {
          Listing.find({}, function(e, listings) {
            Custom.createTemplate(listings[0]._id, questions, emp._id, function(e, t1) {
              User.addUser("abc@gmail.com", "abcd", true, function(e, user2) {
                Custom.copyTemplateToSave(listings[0]._id, user2._id, function(e, c1) {
                  assert.equal("save", c1.state);
                  Custom.update(c1._id, [], true, function(e, c1) {
                    assert.equal("subm", c1.state);
                    Custom.reject(c1._id, function(e, c1) {
                      assert.equal("rej", c1.state);
                      var appId = c1.application;
                      Custom.deleteCustom(c1._id, function(e) {
                        Custom.find({ "_id" : c1._id }, function(e, customs) {
                          assert.equal(1, customs.length);
                          Application.find({ "_id" : appId }, function(e, applications) {
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
        });
      });
    });

    it('cannot delete, template', function(done) {
      var questions = [];
      Employer.createEmployer("jennwu@mit.edu", "asdf123gh", "abc", function(e, emp) {
        Listing.createListing(emp._id, "title", "desc", "reqs", new Date(), function(e) {
          Listing.find({}, function(e, listings) {
            Custom.createTemplate(listings[0]._id, questions, emp._id, function(e, t1) {        
              var appId = t1.application;
              Custom.deleteCustom(t1._id, function(e) {
                Custom.find({ "_id" : t1._id }, function(e, customs) {
                  assert.equal(1, customs.length);
                  Application.find({ "_id" : appId }, function(e, applications) {
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

  /**
   * input: customId
   *    custom is in state save : cannot star
   *    custom is in state subm : can star
   *    custom is in state with : cannot star
   *    custom is in state rej : cannot star
   *    custom is a template : cannot reject
   */
  describe('#star', function() {
    it('cannot star, custom state save', function(done) {
      var questions = [];
      Employer.createEmployer("jennwu@mit.edu", "asdf123gh", "abc", function(e, emp) {
        Listing.createListing(emp._id, "title", "desc", "reqs", new Date(), function(e) {
          Listing.find({}, function(e, listings) {
            Custom.createTemplate(listings[0]._id, questions, emp._id, function(e, t1) {
              User.addUser("abc@gmail.com", "abcd", true, function(e, user2) {
                Custom.copyTemplateToSave(listings[0]._id, user2._id, function(e, c1) {
                  assert.equal("save", c1.state);
                  Custom.star(c1._id, function(e, custom) {
                    assert.equal(true, e !== null);
                    done();
                  });
                });
              });
            });
          });
        });
      });
    });

    it('can star, custom state subm', function(done) {
      var questions = [];
      Employer.createEmployer("jennwu@mit.edu", "asdf123gh", "abc", function(e, emp) {
        Listing.createListing(emp._id, "title", "desc", "reqs", new Date(), function(e) {
          Listing.find({}, function(e, listings) {
            Custom.createTemplate(listings[0]._id, questions, emp._id, function(e, t1) {
              User.addUser("abc@gmail.com", "abcd", true, function(e, user2) {
                Custom.copyTemplateToSave(listings[0]._id, user2._id, function(e, c1) {
                  assert.equal("save", c1.state);
                  Custom.update(c1._id, [], true, function(e, c1) {
                    assert.equal("subm", c1.state);
                    Custom.star(c1._id, function(e, custom) {
                      assert.equal("star", custom.state);
                      assert.equal(listings[0]._id.toString(), custom.listing.toString());
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

    it('cannot star, custom state withdraw', function(done) {
      var questions = [];
      Employer.createEmployer("jennwu@mit.edu", "asdf123gh", "abc", function(e, emp) {
        Listing.createListing(emp._id, "title", "desc", "reqs", new Date(), function(e) {
          Listing.find({}, function(e, listings) {
            Custom.createTemplate(listings[0]._id, questions, emp._id, function(e, t1) {
              User.addUser("abc@gmail.com", "abcd", true, function(e, user2) {
                Custom.copyTemplateToSave(listings[0]._id, user2._id, function(e, c1) {
                  assert.equal("save", c1.state);
                  Custom.update(c1._id, [], true, function(e, c1) {
                    assert.equal("subm", c1.state);
                    Custom.withdraw(c1._id, function(e, c1) {
                      assert.equal("with", c1.state);
                      Custom.star(c1._id, function(e, custom) {
                        assert.equal(true, e !== null);
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

    it('cannot star, custom state reject', function(done) {
      var questions = [];
      Employer.createEmployer("jennwu@mit.edu", "asdf123gh", "abc", function(e, emp) {
        Listing.createListing(emp._id, "title", "desc", "reqs", new Date(), function(e) {
          Listing.find({}, function(e, listings) {
            Custom.createTemplate(listings[0]._id, questions, emp._id, function(e, t1) {
              User.addUser("abc@gmail.com", "abcd", true, function(e, user2) {
                Custom.copyTemplateToSave(listings[0]._id, user2._id, function(e, c1) {
                  assert.equal("save", c1.state);
                  Custom.update(c1._id, [], true, function(e, c1) {
                    assert.equal("subm", c1.state);
                    Custom.reject(c1._id, function(e, c1) {
                      assert.equal("rej", c1.state);
                      Custom.star(c1._id, function(e, custom) {
                        assert.equal(true, e !== null);
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

    it('cannot star, template', function(done) {
      var questions = [];
      Employer.createEmployer("jennwu@mit.edu", "asdf123gh", "abc", function(e, emp) {
        Listing.createListing(emp._id, "title", "desc", "reqs", new Date(), function(e) {
          Listing.find({}, function(e, listings) {
            Custom.createTemplate(listings[0]._id, questions, emp._id, function(e, t1) {        
              Custom.star(t1._id, function(e, custom) {
                assert.equal(true, e !== null);
                done();
              });
            });
          });
        });
      });
    });
  
  });

  /**
   * input: customId
   *    custom is in state save : cannot unstar
   *    custom is in state star : can unstar
   *    custom is in state with : cannot unstar
   *    custom is in state rej : cannot unstar
   *    custom is a template : cannot reject
   */
  describe('#unstar', function() {
    it('cannot unstar, custom state save', function(done) {
      var questions = [];
      Employer.createEmployer("jennwu@mit.edu", "asdf123gh", "abc", function(e, emp) {
        Listing.createListing(emp._id, "title", "desc", "reqs", new Date(), function(e) {
          Listing.find({}, function(e, listings) {
            Custom.createTemplate(listings[0]._id, questions, emp._id, function(e, t1) {
              User.addUser("abc@gmail.com", "abcd", true, function(e, user2) {
                Custom.copyTemplateToSave(listings[0]._id, user2._id, function(e, c1) {
                  assert.equal("save", c1.state);
                  Custom.unstar(c1._id, function(e, custom) {
                    assert.equal(true, e !== null);
                    done();
                  });
                });
              });
            });
          });
        });
      });
    });

    it('can unstar, custom state star', function(done) {
      var questions = [];
      Employer.createEmployer("jennwu@mit.edu", "asdf123gh", "abc", function(e, emp) {
        Listing.createListing(emp._id, "title", "desc", "reqs", new Date(), function(e) {
          Listing.find({}, function(e, listings) {
            Custom.createTemplate(listings[0]._id, questions, emp._id, function(e, t1) {
              User.addUser("abc@gmail.com", "abcd", true, function(e, user2) {
                Custom.copyTemplateToSave(listings[0]._id, user2._id, function(e, c1) {
                  assert.equal("save", c1.state);
                  Custom.update(c1._id, [], true, function(e, c1) {
                    assert.equal("subm", c1.state);
                    Custom.star(c1._id, function(e, c1) {
                      assert.equal("star", c1.state);
                      Custom.unstar(c1._id, function(e, custom) {
                        assert.equal("subm", custom.state);
                        assert.equal(listings[0]._id.toString(), custom.listing.toString());
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

    it('cannot unstar, custom state withdraw', function(done) {
      var questions = [];
      Employer.createEmployer("jennwu@mit.edu", "asdf123gh", "abc", function(e, emp) {
        Listing.createListing(emp._id, "title", "desc", "reqs", new Date(), function(e) {
          Listing.find({}, function(e, listings) {
            Custom.createTemplate(listings[0]._id, questions, emp._id, function(e, t1) {
              User.addUser("abc@gmail.com", "abcd", true, function(e, user2) {
                Custom.copyTemplateToSave(listings[0]._id, user2._id, function(e, c1) {
                  assert.equal("save", c1.state);
                  Custom.update(c1._id, [], true, function(e, c1) {
                    assert.equal("subm", c1.state);
                    Custom.withdraw(c1._id, function(e, custom) {
                      assert.equal("with", custom.state);
                      Custom.unstar(custom._id, function(e, custom) {
                        assert.equal(true, e !== null);
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

    it('cannot unstar, custom state reject', function(done) {
      var questions = [];
      Employer.createEmployer("jennwu@mit.edu", "asdf123gh", "abc", function(e, emp) {
        Listing.createListing(emp._id, "title", "desc", "reqs", new Date(), function(e) {
          Listing.find({}, function(e, listings) {
            Custom.createTemplate(listings[0]._id, questions, emp._id, function(e, t1) {
              User.addUser("abc@gmail.com", "abcd", true, function(e, user2) {
                Custom.copyTemplateToSave(listings[0]._id, user2._id, function(e, c1) {
                  assert.equal("save", c1.state);
                  Custom.update(c1._id, [], true, function(e, c1) {
                    assert.equal("subm", c1.state);
                    Custom.reject(c1._id, function(e, c1) {
                      assert.equal("rej", c1.state);
                      Custom.unstar(c1._id, function(e, custom) {
                        assert.equal(true, e !== null);
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

    it('cannot unstar, template', function(done) {
      var questions = [];
      Employer.createEmployer("jennwu@mit.edu", "asdf123gh", "abc", function(e, emp) {
        Listing.createListing(emp._id, "title", "desc", "reqs", new Date(), function(e) {
          Listing.find({}, function(e, listings) {
            Custom.createTemplate(listings[0]._id, questions, emp._id, function(e, t1) {        
              Custom.unstar(t1._id, function(e, custom) {
                assert.equal(true, e !== null);
                done();
              });
            });
          });
        });
      });
    });

  });

  /**
   * input: customId
   *    custom is in state save : cannot reject
   *    custom is in state subm : can reject
   *    custom is in state star : can reject
   *    custom is in state with : cannot reject
   *    custom is a template : cannot reject
   */
  describe('#reject', function() {
    it('cannot reject, custom state save', function(done) {
      var questions = [];
      Employer.createEmployer("jennwu@mit.edu", "asdf123gh", "abc", function(e, emp) {
        Listing.createListing(emp._id, "title", "desc", "reqs", new Date(), function(e) {
          Listing.find({}, function(e, listings) {
            Custom.createTemplate(listings[0]._id, questions, emp._id, function(e, t1) {
              User.addUser("abc@gmail.com", "abcd", true, function(e, user2) {
                Custom.copyTemplateToSave(listings[0]._id, user2._id, function(e, c1) {
                  assert.equal("save", c1.state);
                  Custom.reject(c1._id, function(e, custom) {
                    assert.equal(true, e !== null);
                    done();
                  });
                });
              });
            });
          });
        });
      });
    });

    it('can reject, custom state subm', function(done) {
      var questions = [];
      Employer.createEmployer("jennwu@mit.edu", "asdf123gh", "abc", function(e, emp) {
        Listing.createListing(emp._id, "title", "desc", "reqs", new Date(), function(e) {
          Listing.find({}, function(e, listings) {
            Custom.createTemplate(listings[0]._id, questions, emp._id, function(e, t1) {
              User.addUser("abc@gmail.com", "abcd", true, function(e, user2) {
                Custom.copyTemplateToSave(listings[0]._id, user2._id, function(e, c1) {
                  assert.equal("save", c1.state);
                  Custom.update(c1._id, [], true, function(e, c1) {
                    assert.equal("subm", c1.state);
                    Custom.reject(c1._id, function(e, custom) {
                      assert.equal("rej", custom.state);
                      assert.equal(listings[0]._id.toString(), custom.listing.toString());
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

    it('can reject, custom state star', function(done) {
      var questions = [];
      Employer.createEmployer("jennwu@mit.edu", "asdf123gh", "abc", function(e, emp) {
        Listing.createListing(emp._id, "title", "desc", "reqs", new Date(), function(e) {
          Listing.find({}, function(e, listings) {
            Custom.createTemplate(listings[0]._id, questions, emp._id, function(e, t1) {
              User.addUser("abc@gmail.com", "abcd", true, function(e, user2) {
                Custom.copyTemplateToSave(listings[0]._id, user2._id, function(e, c1) {
                  assert.equal("save", c1.state);
                  Custom.update(c1._id, [], true, function(e, c1) {
                    assert.equal("subm", c1.state);
                    Custom.star(c1._id, function(e, c1) {
                      assert.equal("star", c1.state);
                      Custom.reject(c1._id, function(e, custom) {
                        assert.equal("rej", custom.state);
                        assert.equal(listings[0]._id.toString(), custom.listing.toString());
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

    it('cannot reject, custom state withdraw', function(done) {
      var questions = [];
      Employer.createEmployer("jennwu@mit.edu", "asdf123gh", "abc", function(e, emp) {
        Listing.createListing(emp._id, "title", "desc", "reqs", new Date(), function(e) {
          Listing.find({}, function(e, listings) {
            Custom.createTemplate(listings[0]._id, questions, emp._id, function(e, t1) {
              User.addUser("abc@gmail.com", "abcd", true, function(e, user2) {
                Custom.copyTemplateToSave(listings[0]._id, user2._id, function(e, c1) {
                  assert.equal("save", c1.state);
                  Custom.update(c1._id, [], true, function(e, c1) {
                    assert.equal("subm", c1.state);
                    Custom.withdraw(c1._id, function(e, custom) {
                      assert.equal("with", custom.state);
                      Custom.reject(c1._id, function(e, c1) {
                        assert.equal(true, e !== null);
                        Custom.findOne({ "_id" : custom._id }, function(e, custom) {
                          assert.equal("with", custom.state);
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
    });

    it('cannot reject, template', function(done) {
      var questions = [];
      Employer.createEmployer("jennwu@mit.edu", "asdf123gh", "abc", function(e, emp) {
        Listing.createListing(emp._id, "title", "desc", "reqs", new Date(), function(e) {
          Listing.find({}, function(e, listings) {
            Custom.createTemplate(listings[0]._id, questions, emp._id, function(e, t1) {        
              Custom.reject(t1._id, function(e, custom) {
                assert.equal(true, e !== null);
                done();
              });
            });
          });
        });
      });
    });
  });

  /**
   * input: customId
   *    custom is in state save, isSubmission is true, all answered : update, state to subm
   *    custom is in state save, isSubmission is true, not all answered : cannot update
   *    custom is in state save, isSubmission is true, answer poorly formatted : cannot update
   *    custom is in state save, isSubmission is false not all answered : update
   *    custom is in state save, isSubmission is false all answered : update
   *    custom is in state not save : cannot update
   *    custom is a template : cannot update
   */
  describe('#update', function() {
    it('can update, custom state save isSubmission true all answered', function(done) {
      var questions = [];
      Employer.createEmployer("jennwu@mit.edu", "asdf123gh", "abc", function(e, emp) {
        Listing.createListing(emp._id, "title", "desc", "reqs", new Date(), function(e) {
          Listing.find({}, function(e, listings) {
            Custom.createTemplate(listings[0]._id, questions, emp._id, function(e, t1) {
              User.addUser("abc@gmail.com", "abcd", true, function(e, user2) {
                Custom.copyTemplateToSave(listings[0]._id, user2._id, function(e, c1) {
                  assert.equal("save", c1.state);
                  Custom.update(c1._id, [], true, function(e, custom) {
                    assert.equal("subm", custom.state);
                    done();
                  });
                });
              });
            });
          });
        });
      });
    });

    it('cannot update, custom state save isSubmission true not all answered', function(done) { 
      var questions = [{
        "question" : "abc",
        "type" : "text",
        "required" : true,
      }];
      Employer.createEmployer("jennwu@mit.edu", "asdf123gh", "abc", function(e, emp) {
        Listing.createListing(emp._id, "title", "desc", "reqs", new Date(), function(e) {
          Listing.find({}, function(e, listings) {
            Custom.createTemplate(listings[0]._id, questions, emp._id, function(e, t1) {
              Application.formatForShow(t1.application, function(e, formatted) {
                var answers = [{ "_id" : formatted[0]._id, "answer" : "" }];
                 User.addUser("abc@gmail.com", "abcd", true, function(e, user2) {
                  Custom.copyTemplateToSave(listings[0]._id, user2._id, function(e, c1) {
                    assert.equal("save", c1.state);
                    Custom.update(c1._id, answers, true, function(e, custom) {
                      assert.equal(true, e !== null);
                      Custom.findOne({ "_id" : c1._id }, function(e, c1) {
                        assert.equal("save", c1.state);
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

    it('cannot update, custom state save isSubmission true wrong format', function(done) { 
      var questions = [{
        "question" : "abc",
        "type" : "check",
        "required" : true,
      }];
      Employer.createEmployer("jennwu@mit.edu", "asdf123gh", "abc", function(e, emp) {
        Listing.createListing(emp._id, "title", "desc", "reqs", new Date(), function(e) {
          Listing.find({}, function(e, listings) {
            Custom.createTemplate(listings[0]._id, questions, emp._id, function(e, t1) {
              Application.formatForShow(t1.application, function(e, formatted) {
                var answers = [{ "_id" : formatted[0]._id, "answer" : "abc" }];
                 User.addUser("abc@gmail.com", "abcd", true, function(e, user2) {
                  Custom.copyTemplateToSave(listings[0]._id, user2._id, function(e, c1) {
                    assert.equal("save", c1.state);
                    Custom.update(c1._id, answers, true, function(e, custom) {
                      assert.equal(true, e !== null);
                      Custom.findOne({ "_id" : c1._id }, function(e, c1) {
                        assert.equal("save", c1.state);
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
    
    it('can update, custom state save isSubmission true all answered', function(done) { 
      var questions = [{
        "question" : "abc",
        "type" : "text",
        "required" : true,
      },
      {
        "question" : "abcd",
        "type" : "text",
        "required" : true,
      }];
      Employer.createEmployer("jennwu@mit.edu", "asdf123gh", "abc", function(e, emp) {
        Listing.createListing(emp._id, "title", "desc", "reqs", new Date(), function(e) {
          Listing.find({}, function(e, listings) {
            Custom.createTemplate(listings[0]._id, questions, emp._id, function(e, t1) {
               User.addUser("abc@gmail.com", "abcd", true, function(e, user2) {
                Custom.copyTemplateToSave(listings[0]._id, user2._id, function(e, c1) {
                  assert.equal("save", c1.state);
                  Application.formatForShow(c1.application, function(e, formatted) {
                    var answers = [
                      { "_id" : formatted[0]._id, "answer" : "abc" }, 
                      { "_id" : formatted[1]._id, "answer" : "def" }
                    ];   
                    Custom.update(c1._id, answers, true, function(e, custom) {
                      assert.equal(true, e === null);
                      Custom.findOne({ "_id" : c1._id }, function(e, c1) {
                        assert.equal("subm", c1.state);
                        assert.equal(true, c1.submitTime !== undefined);
                        Application.formatForShow(c1.application, function(e, formatted) {
                          assert.equal("abc", formatted[0].answer);
                          assert.equal("def", formatted[1].answer);
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
      });
    });

    it('can update, custom state save isSubmission false not all answered', function(done) { 
      var questions = [{
        "question" : "abc",
        "type" : "text",
        "required" : true,
      },
      {
        "question" : "abcd",
        "type" : "text",
        "required" : true,
      }];
      Employer.createEmployer("jennwu@mit.edu", "asdf123gh", "abc", function(e, emp) {
        Listing.createListing(emp._id, "title", "desc", "reqs", new Date(), function(e) {
          Listing.find({}, function(e, listings) {
            Custom.createTemplate(listings[0]._id, questions, emp._id, function(e, t1) {
               User.addUser("abc@gmail.com", "abcd", true, function(e, user2) {
                Custom.copyTemplateToSave(listings[0]._id, user2._id, function(e, c1) {
                  assert.equal("save", c1.state);
                  Application.formatForShow(c1.application, function(e, formatted) {
                    var answers = [
                      { "_id" : formatted[0]._id, "answer" : "abc" }, 
                      { "_id" : formatted[1]._id, "answer" : "" }
                    ];             
                    Custom.update(c1._id, answers, false, function(e, custom) {
                      assert.equal(true, e === null);
                      Custom.findOne({ "_id" : c1._id }, function(e, c1) {
                        assert.equal("save", c1.state);
                        Application.formatForShow(c1.application, function(e, formatted) {
                          assert.equal("abc", formatted[0].answer);
                          assert.equal("", formatted[1].answer);
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
    });

    it('can update, custom state save isSubmission false all answered', function(done) { 
      var questions = [{
        "question" : "abc",
        "type" : "text",
        "required" : true,
      },
      {
        "question" : "abcd",
        "type" : "text",
        "required" : true,
      }];
      Employer.createEmployer("jennwu@mit.edu", "asdf123gh", "abc", function(e, emp) {
        Listing.createListing(emp._id, "title", "desc", "reqs", new Date(), function(e) {
          Listing.find({}, function(e, listings) {
            Custom.createTemplate(listings[0]._id, questions, emp._id, function(e, t1) {
               User.addUser("abc@gmail.com", "abcd", true, function(e, user2) {
                Custom.copyTemplateToSave(listings[0]._id, user2._id, function(e, c1) {
                  assert.equal("save", c1.state);
                  Application.formatForShow(c1.application, function(e, formatted) {
                    var answers = [
                      { "_id" : formatted[0]._id, "answer" : "abc" }, 
                      { "_id" : formatted[1]._id, "answer" : "def" }
                    ];             
                    Custom.update(c1._id, answers, false, function(e, custom) {
                      assert.equal(true, e === null);
                      Custom.findOne({ "_id" : c1._id }, function(e, c1) {
                        assert.equal("save", c1.state);
                        assert.equal(undefined, c1.submitTime);
                        Application.formatForShow(c1.application, function(e, formatted) {
                          assert.equal("abc", formatted[0].answer);
                          assert.equal("def", formatted[1].answer);
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
    });

    it('cannot update, custom state submitted', function(done) { 
      var questions = [{
        "question" : "abc",
        "type" : "text",
        "required" : true,
      },
      {
        "question" : "abcd",
        "type" : "text",
        "required" : true,
      }];
      Employer.createEmployer("jennwu@mit.edu", "asdf123gh", "abc", function(e, emp) {
        Listing.createListing(emp._id, "title", "desc", "reqs", new Date(), function(e) {
          Listing.find({}, function(e, listings) {
            Custom.createTemplate(listings[0]._id, questions, emp._id, function(e, t1) {
               User.addUser("abc@gmail.com", "abcd", true, function(e, user2) {
                Custom.copyTemplateToSave(listings[0]._id, user2._id, function(e, c1) {
                  assert.equal("save", c1.state);
                  Application.formatForShow(c1.application, function(e, formatted) {
                    var answers = [
                      { "_id" : formatted[0]._id, "answer" : "abc" }, 
                      { "_id" : formatted[1]._id, "answer" : "def" }
                    ];             
                    Custom.update(c1._id, answers, true, function(e, custom) {
                      assert.equal(true, e === null);
                      Custom.findOne({ "_id" : c1._id }, function(e, c1) {
                        assert.equal("subm", c1.state);
                        assert.equal(true, c1.submitTime !== undefined);
                        Application.formatForShow(c1.application, function(e, formatted) {
                          assert.equal("abc", formatted[0].answer);
                          assert.equal("def", formatted[1].answer);
                          var answers2 = [
                            { "_id" : formatted[0]._id, "answer" : "abcde" }, 
                            { "_id" : formatted[1]._id, "answer" : "defgh" }
                          ];             
                          Custom.update(c1._id, answers2, false, function(e, custom) {
                            assert.equal(true, e !== null);
                            Custom.findOne({ "_id" : c1._id }, function(e, c1) {
                              assert.equal("subm", c1.state);
                              Application.formatForShow(c1.application, function(e, formatted) {
                                assert.equal("abc", formatted[0].answer);
                                assert.equal("def", formatted[1].answer);
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
          });
        });
      });
    });
    
    it('cannot update, template', function(done) {
      var questions = [{
        "question" : "abc",
        "type" : "text",
        "required" : true,
      },
      {
        "question" : "abcd",
        "type" : "text",
        "required" : true,
      }];
      Employer.createEmployer("jennwu@mit.edu", "asdf123gh", "abc", function(e, emp) {
        Listing.createListing(emp._id, "title", "desc", "reqs", new Date(), function(e) {
          Listing.find({}, function(e, listings) {
            Custom.createTemplate(listings[0]._id, questions, emp._id, function(e, t1) {        
              Application.formatForShow(t1.application, function(e, formatted) {
                var answers = [
                  { "_id" : formatted[0]._id, "answer" : "abc" }, 
                  { "_id" : formatted[1]._id, "answer" : "def" }
                ];             
                Custom.update(t1._id, answers, true, function(e, custom) {
                  assert.equal(true, e !== null);      
                  Application.formatForShow(t1.application, function(e, formatted) {
                    assert.equal("", formatted[0].answer);
                    assert.equal("", formatted[1].answer);
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