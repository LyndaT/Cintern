var assert = require("assert");
var Listing = require('../models/listing');
var Employer = require('../models/Employer');
var User = require('../models/User');
var mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;
var _ = require("../helpers/lodash");

/**
 * Functions to test:
 * getAllListings
 * filterListings
 *   (1) no filter provided
 *   (2) filter yields no results
 * getAllEmployerListings
 *   (1) employer exists
 *   (2) employer does not exist
 *   (3) employer ID is not an ObjectId
 * getListingInformation
 *   (1) listing exists
 *   (2) listing does not exist
 *   (3) listing ID is not an ObjectId
 */

EMPLOYER = {
  email: "abc@google.com",
  password: "pword",
  companyName: "Google"
};

LISTING1 = {
 	title: "hello",
 	description: "world"
};

LISTING2 = {
 	title: "meow"
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

  describe('#getAllListings', function() {
  	it('should retrieve all listings', function(done) {
      Employer.createEmployer(EMPLOYER["email"], EMPLOYER["password"], EMPLOYER["companyName"], function(err0, employer) {
        Listing.createListing(employer["_id"], LISTING1["title"], LISTING1["description"], LISTING1["requirements"], LISTING1["deadline"], function(err1, listing1) {
          assert.equal(err1, null);

          Listing.createListing(employer["_id"], LISTING2["title"], LISTING2["description"], LISTING2["requirements"], LISTING2["deadline"], function(err2, listing2) {
            assert.equal(err2, null);
            
            Listing.getAllListings(function(err, listings) {
              assert.equal(err, null);
              assert.equal(listings.length, 2);
              
              assert.equal(listings[0]["employerId"]["company"], employer["company"]);
              assert.equal(listings[0]["employerId"]["_id"].toHexString(), employer["_id"].toHexString());
              assert.equal(listings[0]["employerId"]["user"].toHexString(), employer["user"].toHexString());
              assert.equal(listings[0]["title"], LISTING1["title"]);
              assert.equal(listings[0]["description"], LISTING1["description"]);
              assert.equal(listings[0]["requirements"], LISTING1["requirements"]);
              assert.equal(listings[0]["deadline"], LISTING1["deadline"]);

              assert.equal(listings[1]["employerId"]["company"], employer["company"]);
              assert.equal(listings[1]["employerId"]["_id"].toHexString(), employer["_id"].toHexString());
              assert.equal(listings[1]["employerId"]["user"].toHexString(), employer["user"].toHexString());
              assert.equal(listings[1]["title"], LISTING2["title"]);
              assert.equal(listings[1]["description"], LISTING2["description"]);
              assert.equal(listings[1]["requirements"], LISTING2["requirements"]);
              assert.equal(listings[1]["deadline"], LISTING2["deadline"]);

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
        Listing.createListing(employer["_id"], LISTING1["title"], LISTING1["description"], LISTING1["requirements"], LISTING1["deadline"], function(err1, listing1) {
          assert.equal(err1, null);
          
          Listing.createListing(employer["_id"], LISTING2["title"], LISTING2["description"], LISTING2["requirements"], LISTING2["deadline"], function(err2, listing2) {
            assert.equal(err2, null);
            
            Listing.filterListings({ title: "hello" }, function(err, listings) {
              assert.equal(err, null);
              assert.equal(listings.length, 1);
              
              assert.equal(listings[0]["employerId"]["company"], employer["company"]);
              assert.equal(listings[0]["employerId"]["_id"].toHexString(), employer["_id"].toHexString());
              assert.equal(listings[0]["employerId"]["user"].toHexString(), employer["user"].toHexString());
              assert.equal(listings[0]["title"], LISTING1["title"]);
              assert.equal(listings[0]["description"], LISTING1["description"]);
              assert.equal(listings[0]["requirements"], LISTING1["requirements"]);
              assert.equal(listings[0]["deadline"], LISTING1["deadline"]);

              done();
            });
          });
        });
      });
  	});

  	it('should return all listings if no filter is provided', function(done) {
      Employer.createEmployer(EMPLOYER["email"], EMPLOYER["password"], EMPLOYER["companyName"], function(err0, employer) {
        Listing.createListing(employer["_id"], LISTING1["title"], LISTING1["description"], LISTING1["requirements"], LISTING1["deadline"], function(err1, listing1) {
          assert.equal(err1, null);
          
          Listing.createListing(employer["_id"], LISTING2["title"], LISTING2["description"], LISTING2["requirements"], LISTING2["deadline"], function(err2, listing2) {
            assert.equal(err2, null);
            
            Listing.filterListings({}, function(err, listings) {
              assert.equal(err, null);
              assert.equal(listings.length, 2);
              
              assert.equal(listings[0]["employerId"]["company"], employer["company"]);
              assert.equal(listings[0]["employerId"]["_id"].toHexString(), employer["_id"].toHexString());
              assert.equal(listings[0]["employerId"]["user"].toHexString(), employer["user"].toHexString());
              assert.equal(listings[0]["title"], LISTING1["title"]);
              assert.equal(listings[0]["description"], LISTING1["description"]);
              assert.equal(listings[0]["requirements"], LISTING1["requirements"]);
              assert.equal(listings[0]["deadline"], LISTING1["deadline"]);

              assert.equal(listings[1]["employerId"]["company"], employer["company"]);
              assert.equal(listings[1]["employerId"]["_id"].toHexString(), employer["_id"].toHexString());
              assert.equal(listings[1]["employerId"]["user"].toHexString(), employer["user"].toHexString());
              assert.equal(listings[1]["title"], LISTING2["title"]);
              assert.equal(listings[1]["description"], LISTING2["description"]);
              assert.equal(listings[1]["requirements"], LISTING2["requirements"]);
              assert.equal(listings[1]["deadline"], LISTING2["deadline"]);

              done();
            });
          });
        });
      });
  	});

  	it('should return an empty list if the filter matches no listings', function(done) {
      Employer.createEmployer(EMPLOYER["email"], EMPLOYER["password"], EMPLOYER["companyName"], function(err0, employer) {
        Listing.createListing(employer["_id"], LISTING1["title"], LISTING1["description"], LISTING1["requirements"], LISTING1["deadline"], function(err1, listing1) {
          assert.equal(err1, null);
          
          Listing.createListing(employer["_id"], LISTING2["title"], LISTING2["description"], LISTING2["requirements"], LISTING2["deadline"], function(err2, listing2) {
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
        Listing.createListing(employer["_id"], LISTING1["title"], LISTING1["description"], LISTING1["requirements"], LISTING1["deadline"], function(err1, listing1) {
          assert.equal(err1, null);
          
          Listing.createListing(employer["_id"], LISTING2["title"], LISTING2["description"], LISTING2["requirements"], LISTING2["deadline"], function(err2, listing2) {
            assert.equal(err2, null);
            
            Listing.getAllEmployerListings(employer["_id"], function(err, listings) {
              assert.equal(err, null);
              assert.equal(listings.length, 2);

              assert.equal(listings[0]["employerId"]["company"], employer["company"]);
              assert.equal(listings[0]["employerId"]["_id"].toHexString(), employer["_id"].toHexString());
              assert.equal(listings[0]["employerId"]["user"].toHexString(), employer["user"].toHexString());
              assert.equal(listings[0]["title"], LISTING1["title"]);
              assert.equal(listings[0]["description"], LISTING1["description"]);
              assert.equal(listings[0]["requirements"], LISTING1["requirements"]);
              assert.equal(listings[0]["deadline"], LISTING1["deadline"]);

              assert.equal(listings[1]["employerId"]["company"], employer["company"]);
              assert.equal(listings[1]["employerId"]["_id"].toHexString(), employer["_id"].toHexString());
              assert.equal(listings[1]["employerId"]["user"].toHexString(), employer["user"].toHexString());
              assert.equal(listings[1]["title"], LISTING2["title"]);
              assert.equal(listings[1]["description"], LISTING2["description"]);
              assert.equal(listings[1]["requirements"], LISTING2["requirements"]);
              assert.equal(listings[1]["deadline"], LISTING2["deadline"]);

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

  describe('#getListingInformation', function() {
  	it('should return all listing information', function(done) {
      Employer.createEmployer(EMPLOYER["email"], EMPLOYER["password"], EMPLOYER["companyName"], function(err0, employer) {
        Listing.createListing(employer["_id"], LISTING1["title"], LISTING1["description"], LISTING1["requirements"], LISTING1["deadline"], function(err1, listing1) {
          assert.equal(err1, null);

          Listing.getAllListings(function(err, listings) {
            assert.equal(err, null);
            assert.equal(listings.length, 1);

            var listing_id = listings[0]["_id"];

            Listing.getListingInformation(listing_id, function(err, listing) {
              assert.equal(err, null);

              assert.equal(listings[0]["employerId"]["company"], employer["company"]);
              assert.equal(listings[0]["employerId"]["_id"].toHexString(), employer["_id"].toHexString());
              assert.equal(listings[0]["employerId"]["user"].toHexString(), employer["user"].toHexString());
              assert.equal(listings[0]["title"], LISTING1["title"]);
              assert.equal(listings[0]["description"], LISTING1["description"]);
              assert.equal(listings[0]["requirements"], LISTING1["requirements"]);
              assert.equal(listings[0]["deadline"], LISTING1["deadline"]);

              done();
            });
          });
        });
      });
    });

  	it('should return an error if the listing does not exist', function(done) {
  		Listing.getListingInformation(ObjectId("507f1f77bcf86cd799439011"), function(err, listing) {
  			assert.notEqual(err, null);
  			assert.equal(err, 'Invalid listing.');
  			done();
  		});
  	});

    it('should return an error if the ID passed is not an ObjectId', function(done) {
      Listing.getListingInformation(123, function(err, listings) {
        assert.notEqual(err, null);
        done();
      });
    });
  });
});