/** 
 * Listing controller that handles HTTP requests for students/listing and employers/listing
 * @author Heeyoon Kim
 */

var utils = require('../utils/utils');
var Listing = require('../models/listing.js');

/*
  Require authentication on ALL access to /listings/*
  Clients which are not logged in will receive a 403 error code.
*/
var requireAuthentication = function(req, res, next) {
  if (!req.currentUser) {
    utils.sendErrResponse(res, 403, 'Must be logged in to use this feature.');
  } else {
    next();
  }
};

exports.createListing = function(req, res) {
	currentEmployerId = req.body.employerId;
	title = req.body.title;
	desc = req.body.description;
	reqs = req.body.requirements;
	deadline = req.body.deadline;

	Listing.createListing(currentEmployerId, title, desc, reqs, deadline, function(err, listing) {
		if(err) {
			res.send(err.msg);
		} else {
			res.send(listing);
		}
	});
}

exports.deleteListing = function(req, res) {
	listingId = req.body.listingId;
	Listing.deleteListing(listingId, function(err, listing) {
		if(err) {
			res.send(err.msg);
		} else {
			res.send(listing);
		}
	});
}

exports.getAllListings = function(req, res) {

}







