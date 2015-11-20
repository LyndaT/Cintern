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
	// possibly useful later to check if the userId owns the listingId
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
 * POST /employers/applications/starred/:customid
 *
 * Marks an application as starred
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
 * POST /employers/applications/unstarred/:customid
 *
 * Marks an application as unstarred
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
 * POST /employers/applications/rejected/:customid
 *
 * Marks an application as rejected
 *
 * Request body:
 *  - customId: custom ID for to-be-rejected application
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
				applications : customs,
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
 * POST /students/applications/custom/:customid
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
	var answers = req.body;
	// format answers for model call
	var answerArray = [];
	Object.keys(answers).forEach(function(id) {
        answerArray.push({
          "_id" : id,
          "answer" : answers[id]
        });
    });

	var userId = req.session.user.userId;
	var customId = req.body.customId;

	Custom.update(customId, answerArray, true, function(errMsg, custom) {
		if (errMsg) utils.sendErrResponse(res, 403, errMsg);
		else if (!custom) utils.sendErrResponse(res, 403, "Could not submit custom application");
		else {
			utils.sendSuccessResponse(res);
		}
	});
};

// exports.updateApplication = function(req, res, next) {};