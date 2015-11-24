/**
 * @author: Maddie Dawson
 */
var Custom = require('../models/custom.js');
var utils = require('../utils/utils');

/**
 * GET /students/applications/custom/:lstgid
 *
 * Gets the custom application associated with the lstgid for the 
 * current User
 * 
 * Request body:
 *	- lstgid: listingId of the listing's whose Custom we need
 *
 * Response:
 *  - success: true if succeeded got the custom
 *  - err: on failure (i.e. server failure, invalid user);
 */
exports.getCustomApplication = function(req, res, next) {
	var currentUser = req.session.user;
	var userId = currentUser.userId;
	var listingId = req.body.listingId;
	console.log(listingId);
	console.log(userId);

	Custom.getByOwnerAndListing(userId, listingId, true, function(errMsg, custom) {
		if (errMsg) utils.sendErrResponse(res, 403, errMsg);
		else if (!custom) utils.sendErrResponse(res, 403, "No custom");
		else {
			custom.populateCustom(function(errMsg, custom) {
				if (errMsg) utils.sendErrResponse(res, 403, errMsg);
				else if (!custom) utils.sendErrResponse(res, 403, "No custom");
				else {
					var content = {
						"listing" : custom.listing,
						"state" : custom.state,
						"application" : custom.application,
						"owner" : custom.owner,
						"isTemplate" : custom.isTemplate,
						"submitTime" : custom.submitTime,
						"_id" : custom._id
					};
					utils.sendSuccessResponse(res, content);
				}
			});
		}
	});
};

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
	// possibly useful later to check if the userId owns the listingId, commented by Heeyoon
	//var userId = req.session.user.userId;
	var listingId = req.body.listingId;
	Custom.getCustomsForListingDash(listingId, function(errMsg, customs) {
		if (errMsg) utils.sendErrResponse(res, 403, errMsg);
		else if (!customs) utils.sendErrResponse(res, 403, "Could not get applications");
		else {
			var content = {
				applicants : customs
			}
			utils.sendSuccessResponse(res, content);
		}
	});
};

/**
 * PUT /employers/applications/starred/:customid
 *
 * Marks a custom application as starred
 *
 * Request body:
 *  - customId: custom ID for to-be-starred custom
 *
 * Response:
 *	- success: true if succeeded in changing custom state
 *	- err: on failure (i.e. server fail, invalid custom)
 */
//exports.starApplication = function(req, res, next) {};

/**
 * PUT /employers/applications/unstarred/:customid
 *
 * Marks a custom application as unstarred
 *
 * Request body:
 *  - customId: custom ID for to-be-unstarred custom
 *
 * Response:
 *	- success: true if succeeded in changing custom state
 *	- err: on failure (i.e. server fail, invalid custom)
 */
//exports.unstarApplication = function(req, res, next) {};

/**
 * PUT /employers/applications/rejected/:customid
 *
 * Marks an custom application as rejected
 *
 * Request body:
 *  - customId: custom ID for to-be-rejected custom
 *
 * Response:
 *	- success: true if succeeded in changing custom state
 *	- err: on failure (i.e. server fail, invalid custom)
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
	var userId = req.session.user.userId;
	
	Custom.getCustomsForStudentDash(userId, function(errMsg, customs) {
		if (errMsg) utils.sendErrResponse(res, 403, errMsg);
		else if (!customs) utils.sendErrResponse(res, 403, "Could not get applications");
		else {
			var content = {
				applications : customs
			}
			utils.sendSuccessResponse(res, content);
		}
	});
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
 *  - success: true if succeeded in changing custom state
 *	- err: on failure (i.e. server fail, invalid listing)
 */
exports.getListingTemplate = function(req, res, next) {
	// FOR LATER: else check that listingId belongs to the currentUser
	var listingId = req.body.listingId;

	Custom.getListingTemplate(listingId, function(errMsg, customTemplate) {
		if (errMsg) utils.sendErrResponse(res, 403, errMsg);
		else if (!app_template) utils.sendErrResponse(res, 403, "Could not get template");
		else {
			customTemplate.populateCustom( function(errMsg, customTemplate) {
				var content = {
					"listing": customTemplate.listing,
					"application": customTemplate.application,
					"owner": customTemplate.owner
				};
				utils.sendSuccessResponse(res, content);
			});
		}
	});
};

/**
 * POST /students/applications/custom/saved/:lstgid
 *
 * Save an empty custom
 *
 * Request body:
 *  - listingId: the listing ID of the relevant listing
 *
 * Response:
 *	- success: true if succeeded in submitting
 *	- err: on failure (i.e. server fail, invalid submission, invalid custom)
 */ 
exports.saveCustomApplication = function(req, res, next) {
	var userId = req.session.user.userId;
	var listingId = req.body.listingId;

	Custom.copyTemplateToSave(listingId, userId, function(errMsg, custom) {
		if (errMsg) utils.sendErrResponse(res, 403, errMsg);
		else if (!custom) utils.sendErrResponse(res, 403, "Could not save application");
		else {
			utils.sendSuccessResponse(res);
		}
	});
};

/**
 * PUT /students/applications/custom/:customid
 *
 * Submits answers for a custom
 *
 * Request body:
 *	- answers: Object with keys that are "_id" (mapping to questionId)
 *			and "answer" (mapping to a string)
 *  - customId: the custom ID of the relevant custom
 *
 * Response:
 *	- success: true if succeeded in submitting
 *	- err: on failure (i.e. server fail, invalid submission, invalid custom)
 */ 
exports.submitCustomApplication = function(req, res, next) {
	var userId = req.session.user.userId;
	var customId = req.body.customId;
	var answers = req.body.answers;
	// format answers for model call
	var answerArray = [];
	Object.keys(answers).forEach(function(id) {
        answerArray.push({
          "_id" : id,
          "answer" : answers[id]
        });
    });

	Custom.update(customId, answerArray, true, function(errMsg, custom) {
		if (errMsg) utils.sendErrResponse(res, 403, errMsg);
		else if (!custom) utils.sendErrResponse(res, 403, "Could not submit custom application");
		else {
			utils.sendSuccessResponse(res);
		}
	});
};

/**
 * PUT /students/applications/updates/:customid
 *
 * Saves answers for a custom
 *
 * Request body:
 *	- answers: Object with keys that are "_id" (mapping to questionId)
 *			and "answer" (mapping to a string)
 *  - customId: the custom ID of the relevant custom
 *
 * Response:
 *	- success: true if succeeded in submitting
 *	- err: on failure (i.e. server fail, invalid update, invalid custom)
 */ 
exports.updateApplication = function(req, res, next) {
	var userId = req.session.user.userId;
	var customId = req.body.customId;
	var answers = req.body.answers;
	// format answers for model call
	var answerArray = [];
	Object.keys(answers).forEach(function(id) {
        answerArray.push({
          "_id" : id,
          "answer" : answers[id]
        });
    });

	Custom.update(customId, answerArray, false, function(errMsg, custom) {
		if (errMsg) utils.sendErrResponse(res, 403, errMsg);
		else if (!custom) utils.sendErrResponse(res, 403, "Could not submit custom application");
		else {
			utils.sendSuccessResponse(res);
		}
	});
};