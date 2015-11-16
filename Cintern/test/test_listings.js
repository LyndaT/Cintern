var assert = require("assert");
var Listing = require('../models/listing');
var mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;
var _ = require("../helpers/lodash");

/**
 * Functions to test:
 * getAllListings
 * filterListings
 *   (1) no filter provided
 *   (2) query tries to inject code (SAVE THIS FOR LATER)
 *   (3) filter yields no results
 * getAllEmployerListings
 *   (1) employer exists
 *   (2) employer does not exist
 * getListingInformation
 *   (1) listing exists
 *   (2) listing does not exist
 */

LISTING1 = {
 	employerId: ObjectId("507f1f77bcf86cd799439011"),
 	title: "hello",
 	description: "world",
 	requirements: undefined,
 	deadline: undefined
};

LISTING1_CONDENSED = {
 	title: "hello",
 	deadline: undefined
};

LISTING2 = {
 	employerId: ObjectId("507f1f77bcf86cd799439011"),
 	title: "meow"
};

LISTING2_CONDENSED = {
 	title: "meow",
 	deadline: undefined
}

describe('Listing', function() {
  beforeEach(function(done) {
    mongoose.connect('mongodb://localhost/testcintern');
    Listing.remove({}, function() {
      done();
    });
  });

  afterEach(function(done) {
    Listing.remove({}, function() {
      mongoose.connection.close();
      done();
    });
  });

  describe('#getAllListings', function() {
  	it('should retrieve all listings', function(done) {
  		Listing.createListing(LISTING1["employerId"], LISTING1["title"], LISTING1["description"], LISTING1["requirements"], LISTING1["deadline"], function(err1, listing1) {
  			assert.equal(err1, null);
  			
  			Listing.createListing(LISTING2["employerId"], LISTING2["title"], LISTING2["description"], LISTING2["requirements"], LISTING2["deadline"], function(err2, listing2) {
  				assert.equal(err2, null);
  				
  				Listing.getAllListings(function(err, listings) {
  					assert.equal(err, null);
  					assert.equal(listings.length, 2);
            
            assert(_.isEqual(LISTING1_CONDENSED, {
              title: listings[0].title,
              deadline: listings[0].deadline
            }));
            assert.equal(listings[0].employerId.toHexString(), LISTING1.employerId.toHexString());
            
            assert(_.isEqual(LISTING2_CONDENSED, {
              title: listings[1].title,
              deadline: listings[1].deadline
            }));
            assert.equal(listings[1].employerId.toHexString(), LISTING2.employerId.toHexString());
  					done();
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
  		Listing.createListing(LISTING1["employerId"], LISTING1["title"], LISTING1["description"], LISTING1["requirements"], LISTING1["deadline"], function(err1, listing1) {
  			assert.equal(err1, null);
  			
  			Listing.createListing(LISTING2["employerId"], LISTING2["title"], LISTING2["description"], LISTING2["requirements"], LISTING2["deadline"], function(err2, listing2) {
  				assert.equal(err2, null);
  				
  				Listing.filterListings({ title: "hello" }, function(err, listings) {
  					assert.equal(err, null);
  					assert.equal(listings.length, 1);
  					
            assert(_.isEqual(LISTING1_CONDENSED, {
              title: listings[0].title,
              deadline: listings[0].deadline
            }));
            assert.equal(listings[0].employerId.toHexString(), LISTING1.employerId.toHexString());
  					done();
  				});
  			});
  		});
  	});

  	it('should return all listings if no filter is provided', function(done) {
  		Listing.createListing(LISTING1["employerId"], LISTING1["title"], LISTING1["description"], LISTING1["requirements"], LISTING1["deadline"], function(err1, listing1) {
  			assert.equal(err1, null);
  			
  			Listing.createListing(LISTING2["employerId"], LISTING2["title"], LISTING2["description"], LISTING2["requirements"], LISTING2["deadline"], function(err2, listing2) {
  				assert.equal(err2, null);
  				
  				Listing.filterListings({}, function(err, listings) {
  					assert.equal(err, null);
  					assert.equal(listings.length, 2);
  					
            assert(_.isEqual(LISTING1_CONDENSED, {
              title: listings[0].title,
              deadline: listings[0].deadline
            }));
            assert.equal(listings[0].employerId.toHexString(), LISTING1.employerId.toHexString());
            
            assert(_.isEqual(LISTING2_CONDENSED, {
              title: listings[1].title,
              deadline: listings[1].deadline
            }));
            assert.equal(listings[1].employerId.toHexString(), LISTING2.employerId.toHexString());
  					done();
  				});
  			});
  		});
  	});

  	it('should sanitize queries that attempt to inject code', function(done) {
  		assert(false);
  		done();
  	});

  	it('should return an empty list if the filter matches no listings', function(done) {
  		Listing.createListing(LISTING1["employerId"], LISTING1["title"], LISTING1["description"], LISTING1["requirements"], LISTING1["deadline"], function(err1, listing1) {
  			assert.equal(err1, null);
  			
  			Listing.createListing(LISTING2["employerId"], LISTING2["title"], LISTING2["description"], LISTING2["requirements"], LISTING2["deadline"], function(err2, listing2) {
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

  describe('#getAllEmployerListings', function() {
  	it('should return the listings for an employer', function(done) {
  		Listing.createListing(LISTING1["employerId"], LISTING1["title"], LISTING1["description"], LISTING1["requirements"], LISTING1["deadline"], function(err1, listing1) {
  			assert.equal(err1, null);
  			
  			Listing.createListing(LISTING2["employerId"], LISTING2["title"], LISTING2["description"], LISTING2["requirements"], LISTING2["deadline"], function(err2, listing2) {
  				assert.equal(err2, null);
  				
  				Listing.getAllEmployerListings(LISTING1["employerId"], function(err, listings) {
  					assert.equal(err, null);
  					assert.equal(listings.length, 2);

            assert(_.isEqual(LISTING1_CONDENSED, {
              title: listings[0].title,
              deadline: listings[0].deadline
            }));
            assert.equal(listings[0].employerId.toHexString(), LISTING1.employerId.toHexString());

            assert(_.isEqual(LISTING2_CONDENSED, {
              title: listings[1].title,
              deadline: listings[1].deadline
            }));
            assert.equal(listings[1].employerId.toHexString(), LISTING2.employerId.toHexString());
  					done();
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
  });

  describe('#getListingInformation', function() {
  	it('should return all listing information', function(done) {
  		Listing.createListing(LISTING1["employerId"], LISTING1["title"], LISTING1["description"], LISTING1["requirements"], LISTING1["deadline"], function(err1, listing1) {
  			assert.equal(err1, null);

        Listing.getAllListings(function(err, listings) {
          assert.equal(err, null);
          assert.equal(listings.length, 1);

          var listing_id = listings[0]._id;

          Listing.getListingInformation(listing_id, function(err, listing) {
            assert.equal(err, null);

            assert(_.isEqual(LISTING1_CONDENSED, {
              title: listing.title,
              deadline: listing.deadline
            }));
            assert.equal(listing.employerId.toHexString(), LISTING1.employerId.toHexString());
            done();
          });
        });
  		});
  	});

  	it('should return an error if the listing does not exist', function(done) {
  		Listing.getListingInformation(ObjectId("507f1f77bcf86cd799439011"), function(err, listing) {
  			assert.notEqual(err, null);
  			assert.equal(err["msg"], 'Invalid listing.');
  			done();
  		});
  	});
  });
});