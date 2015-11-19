var Custom = require('../models/custom.js');
var utils = require('../utils/utils');

/**
 * @author: Maddie Dawson
 */

/**
 * GET /employers/listings/:lstgid
 *
 * Retrieves applicants for a given listing
 *
 * Request body:
 *	- listingId: listing ID for relevant listing
 *
 * Response:
 *	- success: true if succeeded in retrieving applicants
 *	- err: on failure (i.e. server fail, invalid listing)
 */ 
exports.getApplicants = function(req, res, next) {
	var currentUser = req.session.user;
	if (currentUser) {
		if (!currentUser.isStudent) {
			userId = currentUser.userId;
			listingId = req.body.listingId;

			Custom.getCustomsForListingDash(listingId, function(err, apps) {
				if (err) utils.sendErrResponse(res, 403, err);
				else if (!apps) utils.sendErrResponse(res, 403, "Could not get applications");
				else {
					utils.sendSuccessResponse(res, apps);
				}
			});
		}
		else utils.sendErrResponse(res, 403, "Must be an employer to view applicants");
	}
	else utils.sendErrResponse(res, 403, "No user");
};

/**
 * POST /employers/applications/starred/:appid
 *
 * Marks an application as starred
 *
 * Request body:
 *  - applicationId: application ID for to-be-starred application
 *
 * Response:
 *	- success: true if succeeded in changing application state
 *	- err: on failure (i.e. server fail, invalid application)
 */
//exports.starApplication = function(req, res, next) {};

/**
 * POST /employers/applications/unstarred/:appid
 *
 * Marks an application as unstarred
 *
 * Request body:
 *  - applicationId: application ID for to-be-unstarred application
 *
 * Response:
 *	- success: true if succeeded in changing application state
 *	- err: on failure (i.e. server fail, invalid application)
 */
//exports.unstarApplication = function(req, res, next) {};

/**
 * POST /employers/applications/rejected/:appid
 *
 * Marks an application as rejected
 *
 * Request body:
 *  - applicationId: application ID for to-be-rejected application
 *
 * Response:
 *	- success: true if succeeded in changing application state
 *	- err: on failure (i.e. server fail, invalid application)
 */
//exports.rejectApplication = function(req, res, next) {};

//exports.withdrawApplication = function(req, res, next) {};

//exports.deleteApplication = function(req, res, next) {};

/**
 * GET /students/applications
 *
 * Retrieves all student applications
 *
 * Response:
 *  - success: true if succeeded in changing application state
 *	- err: on failure (i.e. server fail)
 */
exports.getStudentApplications = function(req, res, next) {
	var currentUser = req.session.user;
	if (currentUser) {
		if (currentUser.isStudent) {
			userId = currentUser.userId;

			Custom.getCustomsForStudentDash(userId, function(err, apps) {
				if (err) utils.sendErrResponse(res, 403, err);
				else if (!apps) utils.sendErrResponse(res, 403, "Could not get applications");
				else {
					utils.sendSuccessResponse(res, apps);
				}
			});
		}
		else utils.sendErrResponse(res, 403, "Must be a student to view student applications");
	}
	else utils.sendErrResponse(res, 403, "No user");
};

/**
 * GET /students/applications/template/:lstgid
 *
 * Retrieves the application template for listing
 *
 * Request body:
 *  - listingId: the listing ID of the relevant listing
 *
 * Response:
 *  - success: true if succeeded in changing application state
 *	- err: on failure (i.e. server fail, invalid listing)
 */
exports.getListingTemplate = function(req, res, next) {
	var currentUser = req.session.user;
	if (currentUser) {
		if (currentUser.isStudent) userId = currentUser.userId;
		// FOR LATER: else check that listingId belongs to the currentUser
		listingId = req.body.listingId;

		Custom.getListingTemplate(listingId, function(err, app_template) {
			if (err) utils.sendErrResponse(res, 403, err);
			else if (!app_template) utils.sendErrResponse(res, 403, "Could not get template");
			else {
				var template = {
					"listing": app_template.listing,
					"application": app_template.application,
					"owner": app_template.owner
				};
				utils.sendSuccessResponse(res, template);
			}
		});
	}
	else utils.sendErrResponse(res, 403, "No user");
};

/**
 * POST /students/applications/custom/saved/:lstgid
 *
 * Save an empty custom application
 *
 * Request body:
 *  - listingId: the listing ID of the relevant listing
 *
 * Response:
 *	- success: true if succeeded in submitting
 *	- err: on failure (i.e. server fail, invalid submission, invalid application)
 */ 
exports.saveCustomApplication = function(req, res, next) {
	var currentUser = req.session.user;
	if (currentUser) {
		if (currentUser.isStudent) {
			userId = currentUser.userId;
			listingId = req.body.listingId;

			Custom.copyTemplateToSave(listingId, userId, function(err, custom) {
				if (err) utils.sendErrResponse(res, 403, err);
				else if (!custom) utils.sendErrResponse(res, 403, "Could not save application");
				else {
					utils.sendSuccessResponse(res);
				}
			});
		}
		else utils.sendErrResponse(res, 403, "Must be a student to save applications");
	}
	else utils.sendErrResponse(res, 403, "No user");
};

/**
 * POST /students/applications/custom/:appid
 *
 * Submits answers for a custom application
 *
 * Request body:
 *	- answers: Object with keys that are "_id" (mapping to questionId)
 *			and "answer" (mapping to a string)
 *  - applicationId: the application ID of the relevant application
 *
 * Response:
 *	- success: true if succeeded in submitting
 *	- err: on failure (i.e. server fail, invalid submission, invalid application)
 */ 
exports.submitCustomApplication = function(req, res, next) {
	var currentUser = req.session.user;
	if (currentUser) {
		if (currentUser.isStudent) {
			answers = req.body.answers;
			userId = currentUser.userId;
			appId = req.body.applicationId;

			Custom.update(appId, answers, true, function(err, custom) {
				if (err) utils.sendErrResponse(res, 403, err);
				else if (!custom) utils.sendErrResponse(res, 403, "Could not submit application");
				else {
					utils.sendSuccessResponse(res);
				}
			});
		}
		else utils.sendErrResponse(res, 403, "Must be a student to submit applications");
	}
	else utils.sendErrResponse(res, 403, "No user");
};

// exports.updateApplication = function(req, res, next) {};