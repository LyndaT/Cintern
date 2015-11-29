var assert = require("assert");
var Listing = require('../models/listing');
var Employer = require('../models/Employer');
var User = require('../models/User');
var mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;
var _ = require("../helpers/lodash");

/**
 * @author: Maddie Dawson
 */

/**
 * Functions to test:
 * createListing
 * deleteListing
 * getAllListings
 * filterListings
 *   (1) no filter provided
 *   (2) filter yields no results
 * getAllEmployerListings
 *   (1) employer exists
 *   (2) employer does not exist
 *   (3) employer ID is not an ObjectId
 * getByListingId
 *   (1) listing exists
 *   (2) listing does not exist
 *   (3) listing ID is not an ObjectId
 * doesEmployerOwnListing
 *   (1) Employer does own the Listing
 *   (2) Employer does not own the Listing
 *   (3) employer ID is not an ObjectId
 *   (4) listing ID is not an ObjectId
 */

var EMPLOYER = {
  email: "abc@google.com",
  password: "pword",
  companyName: "Google"
};

var LISTING1 = {
 	title: "hello",
 	description: "world",
  deadline: new Date()
};

var LISTING2 = {
 	title: "meow",
  deadline: new Date()
};

describe('Listing', function() {
  beforeEach(function(done) {
    mongoose.connect('mongodb://localhost/testcintern');
    Listing.remove({}, function() {
      Employer.remove({}, function() {
        User.remove({}, function() {
          done();
        });
      });
    });
  });

  afterEach(function(done) {
    Listing.remove({}, function() {
      Employer.remove({}, function() {
        User.remove({}, function() {
          mongoose.connection.close();
          done();
        });
      });
    });
  });

  describe('#createListing', function() {
    it('should create a listing given all fields', function(done) {
      Listing.createListing(ObjectId("507f1f77bcf86cd799439011"), "someTitle", "someDescription", "someRequirements", new Date(), function(e, listing) {
        Listing.find({}, function(err, listing) {
          assert.equal(1, listing.length);
          done();
        });
      });
    });

    it('should create a listing given at least employerId and title', function(done) {
      Listing.createListing(ObjectId("507f1f77bcf86cd799439011"), "a title", undefined, undefined, new Date(), function(e, listing) {
        Listing.find({}, function(err, listing) {
          assert.equal(1, listing.length);
          done();
        });
      });
    });

    it('should not create a listing if the employerId is missing', function(done) {
      Listing.createListing(undefined, "title", "desc", "reqs", new Date(), function(e, listing) {
        Listing.find({}, function(err, listing) {
          assert.equal(0, listing.length);
          done();
        });
      });
    });

    it('should not create a listing if there is no title specified', function(done) {
      Listing.createListing(ObjectId("507f1f77bcf86cd799439011"), undefined, "desc", "reqs", new Date(), function(e, listing) {
        Listing.find({}, function(err, listing) {
          assert.equal(0, listing.length);
          done();
        });
      });
    });
  });

  describe('#deleteListing', function() {
    it('should delete a listing with a particular listing id', function(done) {
      Listing.createListing(ObjectId("507f1f77bcf86cd799439011"), "title", "desc", "reqs", new Date(), function(e, listing) {
        Listing.find({}, function(err, listing) {
          var listingId = listing[0]._id;
          assert.equal(1, listing.length);
          
          Listing.deleteListing(listingId, function(err) {
            assert.equal(err, null);

            Listing.find({}, function(err, listing) {
              assert.equal(0, listing.length);
              done();
            });
          });

        });
      });
    });

    it('should not delete if the listing with that object id does not exist in listings', function(done) {
      Listing.createListing(ObjectId("507f1f77bcf86cd799439011"), "title", "desc", "reqs", new Date(), function(e, listing) {
        assert.equal(e, null);

        Listing.deleteListing(ObjectId("507f1f77bcf86cd799439011"), function(err) {
          assert.equal(err, null);

          Listing.find({}, function(err, listing) {
            assert.equal(1, listing.length);
            done();
          });
        });
      });
    });
  });

  describe('#getAllListings', function() {
  	it('should retrieve all listings', function(done) {
      Employer.createEmployer(EMPLOYER["email"], EMPLOYER["password"], EMPLOYER["companyName"], function(err0, employer) {
        Listing.createListing(employer["_id"], LISTING1["title"], LISTING1["description"], LISTING1["requirements"], LISTING1["deadline"].getTime(), function(err1, listing1) {
          assert.equal(err1, null);

          Listing.createListing(employer["_id"], LISTING2["title"], LISTING2["description"], LISTING2["requirements"], LISTING2["deadline"].getTime(), function(err2, listing2) {
            assert.equal(err2, null);
            
            Listing.getAllListings(function(err, listings) {
              assert.equal(err, null);
              assert.equal(listings.length, 2);
              
              assert.equal(listings[0]["employer"]["company"], employer["company"]);
              assert.equal(listings[0]["employer"]["_id"].toHexString(), employer["_id"].toHexString());
              assert.equal(listings[0]["employer"]["user"].toHexString(), employer["user"].toHexString());
              assert.equal(listings[0]["title"], LISTING1["title"]);
              assert.equal(listings[0]["description"], LISTING1["description"]);
              assert.equal(listings[0]["requirements"], LISTING1["requirements"]);
              assert.equal(listings[0]["deadline"].getTime(), LISTING1["deadline"].getTime());

              assert.equal(listings[1]["employer"]["company"], employer["company"]);
              assert.equal(listings[1]["employer"]["_id"].toHexString(), employer["_id"].toHexString());
              assert.equal(listings[1]["employer"]["user"].toHexString(), employer["user"].toHexString());
              assert.equal(listings[1]["title"], LISTING2["title"]);
              assert.equal(listings[1]["description"], LISTING2["description"]);
              assert.equal(listings[1]["requirements"], LISTING2["requirements"]);
              assert.equal(listings[1]["deadline"].getTime(), LISTING2["deadline"].getTime());

              done();
            });
          });
        });
      });
  	});

  	it('should return an empty list if no listings exist', function(done) {
  		Listing.getAllListings(function(err, listings) {
  			_.isEqual(listings, []);
  			done();
  		});
  	});
  });

  describe('#filterListings', function() {
  	it('should return listings filtered by the given query', function(done) {
      Employer.createEmployer(EMPLOYER["email"], EMPLOYER["password"], EMPLOYER["companyName"], function(err0, employer) {
        Listing.createListing(employer["_id"], LISTING1["title"], LISTING1["description"], LISTING1["requirements"], LISTING1["deadline"].getTime(), function(err1, listing1) {
          assert.equal(err1, null);
          
          Listing.createListing(employer["_id"], LISTING2["title"], LISTING2["description"], LISTING2["requirements"], LISTING2["deadline"].getTime(), function(err2, listing2) {
            assert.equal(err2, null);
            
            Listing.filterListings({ title: "hello" }, function(err, listings) {
              assert.equal(err, null);
              assert.equal(listings.length, 1);
              
              assert.equal(listings[0]["employer"]["company"], employer["company"]);
              assert.equal(listings[0]["employer"]["_id"].toHexString(), employer["_id"].toHexString());
              assert.equal(listings[0]["employer"]["user"].toHexString(), employer["user"].toHexString());
              assert.equal(listings[0]["title"], LISTING1["title"]);
              assert.equal(listings[0]["description"], LISTING1["description"]);
              assert.equal(listings[0]["requirements"], LISTING1["requirements"]);
              assert.equal(listings[0]["deadline"].getTime(), LISTING1["deadline"].getTime());

              done();
            });
          });
        });
      });
  	});

  	it('should return all listings if no filter is provided', function(done) {
      Employer.createEmployer(EMPLOYER["email"], EMPLOYER["password"], EMPLOYER["companyName"], function(err0, employer) {
        Listing.createListing(employer["_id"], LISTING1["title"], LISTING1["description"], LISTING1["requirements"], LISTING1["deadline"].getTime(), function(err1, listing1) {
          assert.equal(err1, null);
          
          Listing.createListing(employer["_id"], LISTING2["title"], LISTING2["description"], LISTING2["requirements"], LISTING2["deadline"].getTime(), function(err2, listing2) {
            assert.equal(err2, null);
            
            Listing.filterListings({}, function(err, listings) {
              assert.equal(err, null);
              assert.equal(listings.length, 2);
              
              assert.equal(listings[0]["employer"]["company"], employer["company"]);
              assert.equal(listings[0]["employer"]["_id"].toHexString(), employer["_id"].toHexString());
              assert.equal(listings[0]["employer"]["user"].toHexString(), employer["user"].toHexString());
              assert.equal(listings[0]["title"], LISTING1["title"]);
              assert.equal(listings[0]["description"], LISTING1["description"]);
              assert.equal(listings[0]["requirements"], LISTING1["requirements"]);
              assert.equal(listings[0]["deadline"].getTime(), LISTING1["deadline"].getTime());

              assert.equal(listings[1]["employer"]["company"], employer["company"]);
              assert.equal(listings[1]["employer"]["_id"].toHexString(), employer["_id"].toHexString());
              assert.equal(listings[1]["employer"]["user"].toHexString(), employer["user"].toHexString());
              assert.equal(listings[1]["title"], LISTING2["title"]);
              assert.equal(listings[1]["description"], LISTING2["description"]);
              assert.equal(listings[1]["requirements"], LISTING2["requirements"]);
              assert.equal(listings[1]["deadline"].getTime(), LISTING2["deadline"].getTime());

              done();
            });
          });
        });
      });
  	});

  	it('should return an empty list if the filter matches no listings', function(done) {
      Employer.createEmployer(EMPLOYER["email"], EMPLOYER["password"], EMPLOYER["companyName"], function(err0, employer) {
        Listing.createListing(employer["_id"], LISTING1["title"], LISTING1["description"], LISTING1["requirements"], LISTING1["deadline"].getTime(), function(err1, listing1) {
          assert.equal(err1, null);
          
          Listing.createListing(employer["_id"], LISTING2["title"], LISTING2["description"], LISTING2["requirements"], LISTING2["deadline"].getTime(), function(err2, listing2) {
            assert.equal(err2, null);
            
            Listing.filterListings({ title: "hi" }, function(err, listings) {
              assert.equal(err, null);
              assert(_.isEqual(listings, []));
              done();
            });
          });
        });
      });
  	});
  });

  describe('#getAllEmployerListings', function() {
  	it('should return the listings for an employer', function(done) {
      Employer.createEmployer(EMPLOYER["email"], EMPLOYER["password"], EMPLOYER["companyName"], function(err0, employer) {
        Listing.createListing(employer["_id"], LISTING1["title"], LISTING1["description"], LISTING1["requirements"], LISTING1["deadline"].getTime(), function(err1, listing1) {
          assert.equal(err1, null);
          
          Listing.createListing(employer["_id"], LISTING2["title"], LISTING2["description"], LISTING2["requirements"], LISTING2["deadline"].getTime(), function(err2, listing2) {
            assert.equal(err2, null);
            
            Listing.getAllEmployerListings(employer["_id"], function(err, listings) {
              assert.equal(err, null);
              assert.equal(listings.length, 2);

              assert.equal(listings[0]["employer"]["company"], employer["company"]);
              assert.equal(listings[0]["employer"]["_id"].toHexString(), employer["_id"].toHexString());
              assert.equal(listings[0]["employer"]["user"].toHexString(), employer["user"].toHexString());
              assert.equal(listings[0]["title"], LISTING1["title"]);
              assert.equal(listings[0]["description"], LISTING1["description"]);
              assert.equal(listings[0]["requirements"], LISTING1["requirements"]);
              assert.equal(listings[0]["deadline"].getTime(), LISTING1["deadline"].getTime());

              assert.equal(listings[1]["employer"]["company"], employer["company"]);
              assert.equal(listings[1]["employer"]["_id"].toHexString(), employer["_id"].toHexString());
              assert.equal(listings[1]["employer"]["user"].toHexString(), employer["user"].toHexString());
              assert.equal(listings[1]["title"], LISTING2["title"]);
              assert.equal(listings[1]["description"], LISTING2["description"]);
              assert.equal(listings[1]["requirements"], LISTING2["requirements"]);
              assert.equal(listings[1]["deadline"].getTime(), LISTING2["deadline"].getTime());

              done();
            });
          });
        });
      });
  	});

  	it('should return an empty list if the employer does not exist', function(done) {
  		Listing.getAllEmployerListings(ObjectId("507f1f77bcf86cd799439011"), function(err, listings) {
  			assert.equal(err, null);
  			assert(_.isEqual([], listings));
  			done();
  		});
  	});

    it('should return an error if the ID passed is not an ObjectId', function(done) {
      Listing.getAllEmployerListings(123, function(err, listings) {
        assert.notEqual(err, null);
        done();
      });
    });
  });

  describe('#getByListingId', function() {
  	it('should return all listing information', function(done) {
      Employer.createEmployer(EMPLOYER["email"], EMPLOYER["password"], EMPLOYER["companyName"], function(err0, employer) {
        Listing.createListing(employer["_id"], LISTING1["title"], LISTING1["description"], LISTING1["requirements"], LISTING1["deadline"].getTime(), function(err1, listing1) {
          assert.equal(err1, null);

          Listing.getAllListings(function(err, listings) {
            assert.equal(err, null);
            assert.equal(listings.length, 1);

            var listing_id = listings[0]["_id"];

            Listing.getByListingId(listing_id, function(err, listing) {
              assert.equal(err, null);

              assert.equal(listings[0]["employer"]["company"], employer["company"]);
              assert.equal(listings[0]["employer"]["_id"].toHexString(), employer["_id"].toHexString());
              assert.equal(listings[0]["employer"]["user"].toHexString(), employer["user"].toHexString());
              assert.equal(listings[0]["title"], LISTING1["title"]);
              assert.equal(listings[0]["description"], LISTING1["description"]);
              assert.equal(listings[0]["requirements"], LISTING1["requirements"]);
              assert.equal(listings[0]["deadline"].getTime(), LISTING1["deadline"].getTime());

              done();
            });
          });
        });
      });
    });

  	it('should return an error if the listing does not exist', function(done) {
  		Listing.getByListingId(ObjectId("507f1f77bcf86cd799439011"), function(err, listing) {
  			assert.notEqual(err, null);
  			assert.equal(err, 'Invalid listing.');
  			done();
  		});
  	});

    it('should return an error if the ID passed is not an ObjectId', function(done) {
      Listing.getByListingId(123, function(err, listings) {
        assert.notEqual(err, null);
        done();
      });
    });
  });

  describe('#doesEmployerOwnListing', function() {
    it('should be true if employer does own listing', function(done) {
      Employer.createEmployer(EMPLOYER["email"], EMPLOYER["password"], EMPLOYER["companyName"], function(err0, employer) {
        Listing.createListing(employer["_id"], LISTING1["title"], LISTING1["description"], LISTING1["requirements"], LISTING1["deadline"].getTime(), function(err1, listing1) {
          Listing.doesEmployerOwnListing(employer._id, listing1._id, function(errMsg, isOwn) {
            assert.equal(true, isOwn);
            done();
          });
        });
      });
    });

    it('should be false if employer does not own listing', function(done) {
      Employer.createEmployer(EMPLOYER["email"], EMPLOYER["password"], EMPLOYER["companyName"], function(err0, employer1) {
        Listing.createListing(employer1["_id"], LISTING1["title"], LISTING1["description"], LISTING1["requirements"], LISTING1["deadline"].getTime(), function(err1, listing1) {
          Employer.createEmployer("a", "a", "a", function(err0, employer2) {
            Listing.doesEmployerOwnListing(employer2._id, listing1._id, function(errMsg, isOwn) {
              assert.equal(false, isOwn);
              done();
            });
          });
        });
      });
    });

    it('should be false if employer is not valid ObjectId', function(done) {
      Employer.createEmployer(EMPLOYER["email"], EMPLOYER["password"], EMPLOYER["companyName"], function(err0, employer) {
        Listing.createListing(employer["_id"], LISTING1["title"], LISTING1["description"], LISTING1["requirements"], LISTING1["deadline"].getTime(), function(err1, listing1) {
          Listing.doesEmployerOwnListing("2a", listing1._id, function(errMsg, isOwn) {
            assert.equal(false, isOwn);
            done();
          });
        });
      });
    });

    it('should be false if listing is not a valid ObjectId', function(done) {
      Employer.createEmployer(EMPLOYER["email"], EMPLOYER["password"], EMPLOYER["companyName"], function(err0, employer) {
        Listing.createListing(employer["_id"], LISTING1["title"], LISTING1["description"], LISTING1["requirements"], LISTING1["deadline"].getTime(), function(err1, listing1) {
          Listing.doesEmployerOwnListing(employer._id, "@", function(errMsg, isOwn) {
            assert.equal(false, isOwn);
            done();
          });
        });
      });
    });
  });
});