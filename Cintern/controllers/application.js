/**
 * @author Jennifer Wu
 *
 * Application controller
 */
var Common = require('../models/common.js');
var Custom = require('../models/custom.js');
var Listing = require('../models/listing.js');
var utils = require('../utils/utils');

/** NEED TO FIX, THIS IS COPY AND PASTED..*/

/**
 * GET /employers/applications/fullapp/:userid/:lstgid
 *
 * Gets the application (both the common and custom) submitted to listing 
 * lstgid by user with userid if the lstgid belongs to the currentUser
 *
 * Request body:
 *  - userid: the user id of the student who applied to the listing
 *  - lstgid: the id of the listing that the student applied to
 * 
 * Response:
 *  - success: true if succeeded in getting the common and custom
 *  - err: if had errors getting one or more of these
 *
 */
exports.getFullApplication = function(req, res, next) {
	var currentUser = req.session.user;
	var employerId = currentUser.employerInfo._id;
	var listingId = req.body.listingId;
	var userId = req.body.userId;

	// check that the listing belongs to the user
	Listing.doesEmployerOwnListing(employerId, listingId, function(errMsg, employerOwns) {
		if (errMsg) utils.sendErrResponse(res, 403, errMsg);
		else if (!employerOwns) utils.sendErrResponse(res, 403, "employer does not own");
		else {
			Common.getCommonByOwnerId(userId, function(errMsg, common) {
				if (errMsg) utils.sendErrResponse(res, 403, errMsg);
				else if (!common) utils.sendErrResponse(res, 403, "No common");
				else {
					common.populateCommon(function(errMsg, common) {
						if (errMsg) utils.sendErrResponse(res, 403, errMsg);
						else if (!common) utils.sendErrResponse(res, 403, "No common");
						else {
							Custom.getByOwnerAndListing(userId, listingId, false, function(errMsg, custom) {
								if (errMsg) utils.sendErrResponse(res, 403, errMsg);
								else if (!custom) utils.sendErrResponse(res, 403, "No custom");
								else {
									custom.populateCustom(function(errMsg, custom) {
										if (errMsg) utils.sendErrResponse(res, 403, errMsg);
										else if (!custom) utils.sendErrResponse(res, 403, "No custom");
										else {
											var content = {
												"commonApp": common.application,
												"listing" : custom.listing,
												"state" : custom.state,
												"customApp" : custom.application,
												"owner" : custom.owner,
												"isTemplate" : custom.isTemplate,
												"submitTime" : custom.submitTime
											};
											utils.sendSuccessResponse(res, content);
										}
									});
								}
							});
						}
					});
				}
			});
		}
	});
};


