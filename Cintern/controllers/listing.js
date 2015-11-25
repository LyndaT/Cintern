/** 
 * Listing controller that handles HTTP requests for students/listing and employers/listing
 * @author Heeyoon Kim
 */
var utils = require('../utils/utils');
var Listing = require('../models/listing.js');
var Employer = require('../models/Employer.js');
var Custom = require('../models/custom.js');

/*
 * Require authentication on ALL access to /listings/*
 * Clients which are not logged in will receive a 403 error code.
 * MAY ALSO NEED TO CHECK WHETHER STUDENT OR EMPLOYER!!!
 * CURRENTLY UNUSED
 */
/*var requireAuthentication = function(req, res, next) {
  if (!req.session.user) {
    utils.sendErrResponse(res, 403, 'Must be logged in to use this feature.');
  } else {
    next();
  }
};*/

/**
 * POST employers/listings
 * 
 * Creates a new listing with a new template
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
	var employerId = currentUser.employerInfo._id;
	var title = req.body.title;
	var desc = req.body.description;
	var reqs = req.body.requirements;
	var deadline = undefined;
	var questions = req.body.questions;
		
	var questionList = [];
	questions.forEach(function(question) {
		questionList.push({
			"question" : question.question,
			"type" : question.type,
			"required" : question.required
		})
	});

	Listing.createListing(employerId, title, desc, reqs, deadline, function(errMsg, listing) {
		
		if (errMsg) utils.sendErrResponse(res, 403, errMsg);
		else if (!listing) utils.sendErrResponse(res, 403, "No listing");
		else {
			Custom.createTemplate(listing._id, questionList, currentUser.userId, function(errMsg, template) {
				if (errMsg) utils.sendErrResponse(res, 403, errMsg);
				else if (!template) utils.sendErrResponse(res, 403, "No template");
				else utils.sendSuccessResponse(res);
			});
		}
	});	
};

/**
 * GET /students/listings
 *
 * Retrieves all the listings available on the site, available for students to view and apply to
 *
 * Request body:
 *  None
 *
 * Response:
 *  - success: true if successfully retrieved all listings
 *  - err: if failed to retrieve
 */
exports.getAllListings = function(req, res, next) {
	if (!req.session.user.studentInfo.commonFilled){
		utils.sendErrResponse(res, 403, "Common application not filled");
	} else {
		Listing.getAllListings(function(errMsg, listings) {
			if (errMsg) utils.sendErrResponse(res, 403, errMsg);
			else if (!listings) utils.sendErrResponse(res, 403, "No listings");
			else {
				var content = {
					"listings" : listings,
				};
				utils.sendSuccessResponse(res, content);
			}
		});
	}
};

/**
 * GET /employers/listings and GET users/students/listings
 *
 * Retrieves all of the listings that the employer has created
 *
 * Request body:
 *  - employerId: id of the employer (given only if currentUser is a student; otherwise, use the id of 
 *				  the currently logged in user)
 *
 * Response:
 *  - success: true if successfully retrieved the employer's listings
 *  - err: if failed to retrieve
 */
exports.getEmployerListings = function(req, res, next) {
	var currentUser = req.session.user;
	var employerId = currentUser.employerInfo._id;
	console.log(employerId);
		
	Listing.getAllEmployerListings(employerId, function(errMsg, listings) {
		if (errMsg) utils.sendErrResponse(res, 403, errMsg);
		else if (!listings) utils.sendErrResponse(res, 403, "No listings");
		else {
			var content = {
				"listings" : listings,
			};
			utils.sendSuccessResponse(res, content);
		};
	});
};


/**
 * GET /students/listings/:lstgid
 *
 * Retrieves the details of the listing with id listgid
 *
 * Request body:
 *  - listingId: the id of the listing to retrieve
 *
 * Response:
 *  - success: true if successfully retrieved some information about that listing
 *  - err: if failed to retrieve any information, or there was an error with the query
 */
exports.getListing = function(req, res, next) {
	if (!req.session.user.studentInfo.commonFilled){
		utils.sendErrResponse(res, 403, "Common application not filled");
	} else {
		var listingId = req.body.listingId;
	
		Listing.getByListingId(listingId, function(errMsg, listing) {
			if (errMsg) utils.sendErrResponse(res, 403, errMsg);
			else if (!listing) utils.sendErrResponse(res, 403, "No listing with that listing id");
			else {
				var content = {
					"listing" : listing
				};
				utils.sendSuccessResponse(res, content);
			}
		});
	}
};


/**
 * DELETE /employers/listings/:lstgid
 * 
 * Deletes the listing with lstgid and the associated templates
 * and the associated applications
 * 
 * Request body:
 *	- listingId: the id of the listing to delete
 * 
 * Response:
 * 	- success: true if successfully deleted listing
 *  - err: if failed to delete
 */
exports.deleteListing = function(req, res, next) {
	console.log("here");
	var listingId = req.body.listingId;
	var currentUser = req.session.user;
	// check that the listing belongs to the employer
	Listing.doesEmployerOwnListing(currentUser.employerInfo._id, listingId, function(errMsg, employerOwns) {
		console.log("made it", employerOwns);
		if (errMsg) utils.sendErrResponse(res, 403, errMsg);
		else if (!employerOwns) utils.sendErrResponse(res, 403, "This listing does not belong to you");
		else {
			Custom.deleteByListing(listingId, function(errMsg) {
				if (errMsg) utils.sendErrResponse(res, 403, errMsg);
				else {
					Listing.deleteListing(listingId, function(errMsg) {
						if(errMsg) {
							utils.sendErrResponse(res, errMsg);
						} else {
							utils.sendSuccessResponse(res);
						}
					});
				}
			});
		}		
	})
};










