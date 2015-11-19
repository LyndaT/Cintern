var Listing = require('../models/listing.js');
var utils = require('../utils/utils');

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