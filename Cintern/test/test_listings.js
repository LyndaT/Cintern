var assert = require("assert");
var Listing = require('../models/listing');
var mongoose = require('mongoose');

describe('Listing', function() {
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
});