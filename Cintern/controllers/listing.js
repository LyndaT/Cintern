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

/**
 * POST users/employers/listings
 * 
 * This function creates a new listing with a new template
 * 
 * Request body: 
 *	- employerId: id of the employer
 *	- title
 *	- description
 *	- requirements
 *	- deadline: (none for now)
 *	- questions: array of strings (for now)
 *
 * Response: 
 * 	- success: true if succeeded in creating listing
 *	- err: on failure (i.e. server fail)
 */
exports.createListing = function(req, res, next) {
	var currentUser = req.session.user;

	var employerId = req.body.employerId;
	var title = req.body.title;
	var desc = req.body.description;
	var reqs = req.body.requirements;
	var deadline = undefined;
	var questions = req.body.questions;

	Listing.createListing(employerId, title, desc, reqs, deadline, function(errMsg, listing) {
		if (errMsg) utils.sendErrResponse(res, 403, errMsg);
		else if (!listing) utils.sendErrResponse(res, 403, "No listing");
		else {
			Custom.createTemplate(listing._id, questions, currentUser.userId, function(errMsg, template) {
				if (errMsg) utils.sendErrResponse(res, 403, errMsg);
				else if (!template) utils.sendErrResponse(res, 403, "No template");
				else utils.sendSuccessResponse(res);
			});
		}
	});
};



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








