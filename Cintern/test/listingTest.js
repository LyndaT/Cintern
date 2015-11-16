var assert = require("assert");
var Listing = require('../models/listing');
var mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;

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

  describe('tests for createListing function', function() {
    it('should create a listing given all fields', function(done) {
      Listing.createListing(ObjectId("507f1f77bcf86cd799439011"), "someTitle", "someDescription", "someRequirements", new Date(), function(e, listing) {
        Listing.find({}, function(err, listing) {

          assert.equal(1, listing.length);
          done();
        });
      });
    });

    it('should create a listing given at least employerId and title', function(done) {
      Listing.createListing(ObjectId("507f1f77bcf86cd799439011"), "a title", undefined, undefined, undefined, function(e, listing) {
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

  describe('test for deleteListing function', function() {
    it('should delete a listing with a particular listing id', function(done) {
      Listing.createListing(ObjectId("507f1f77bcf86cd799439011"), "title", "desc", "reqs", new Date(), function(e, listing) {
        Listing.find({}, function(err, listing) {
          var listingId = listing[0]._id;
          assert.equal(1, listing.length);
          

          Listing.deleteListing(listingId, function(err, wasSuccessful) {
          });  

          Listing.find({}, function(err, listing) {
            assert.equal(0, listing.length);
            done();
          });

        });
      });
    });

    it('should not delete if the listing with that object id does not exist in listings', function(done) {
      Listing.createListing(ObjectId("507f1f77bcf86cd799439011"), "title", "desc", "reqs", new Date(), function(e, listing) {
      });

      Listing.deleteListing(ObjectId("507f1f77bcf86cd799439011"), function(err, wasSuccessful) {
      });

      Listing.find({}, function(err, listing) {
        assert.equal(1, listing.length);
        done();
      });
    });
  });
});

