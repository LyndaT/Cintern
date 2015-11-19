/**
 * @author Jennifer Wu
 *
 * Application controller
 */
var Common = require('../models/common.js');
var Custom = require('../models/custom.js');
var utils = require('../utils/utils');

/**
 * GET /users/applications/common/:userid
 *
 * Gets the common application associated with the userId
 * 
 * Request body:
 * 	- userId: userId of the user's whose Common we need
 *
 * Response:
 *  - success: true if succeeded got the common
 *  - err: on failure (i.e. server failure, invalid user);
 */
exports.getCommon = function(req, res, next) {
	var currentUser = req.session.user;
	if (currentUser) {
		var userId = req.body.userId;

		if (currentUser.isStudent) userId = currentUser.userId;
		// FOR LATER: else check that listingId belongs to the currentUser

		Common.getCommonByOwnerId(userId, function(errMsg, common) {
			if (errMsg) utils.sendErrResponse(res, 403, errMsg);
			else if (!custom) utils.sendErrResponse(res, 403, "No custom");
			else {
				common.populateCommon(function(errMsg, common) {
					if (errMsg) utils.sendErrResponse(res, 403, errMsg);
					else if (!common) utils.sendErrResponse(res, 403, "No custom");
					else {
						var content = {
							"application" : common.application,
						};
						utils.sendSuccessResponse(res, content);
					}
				});
			}
		});
	} 
	else utils.sendErrResponse(res, 403, "No current user");
};

/**
 * GET /users/applications/custom/:userid/:lstgid
 *
 * Gets the custom application associated with the userId and lstgid
 * 
 * Request body:
 * 	- userid: userId of the user's whose Custom we need
 *	- lstgid: listingId of the listing's whose Custom we need
 *
 * Response:
 *  - success: true if succeeded got the custom
 *  - err: on failure (i.e. server failure, invalid user);
 */
exports.getCustom = function(req, res, next) {
	var currentUser = req.session.user;
	if (currentUser) {
		var isStudent = currentUser.isStudent;
		var listingId = req.body.lstgid;
		var userId = req.body.userid;

		if (currentUser.isStudent) userId = currentUser.userId;
		// FOR LATER: else check that listingId belongs to the currentUser

		Custom.getByOwnerAndListing(userId, listingId, isStudent, function(errMsg, custom) {
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
							"submitTime" : custom.submitTime
						};
						utils.sendSuccessResponse(res, content);
					}
				});
			}
		});
	} 
	else utils.sendErrResponse(res, 403, "No current user");
};