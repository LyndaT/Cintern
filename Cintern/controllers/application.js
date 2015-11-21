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

		if (currentUser.studentInfo) userId = currentUser.userId;
		// FOR LATER: else check that listingId belongs to the currentUser

		Common.getCommonByOwnerId(userId, function(errMsg, common) {
			if (errMsg) utils.sendErrResponse(res, 403, errMsg);
			else if (!common) utils.sendErrResponse(res, 403, "No common");
			else {
				common.populateCommon(function(errMsg, common) {
					if (errMsg) utils.sendErrResponse(res, 403, errMsg);
					else if (!common) utils.sendErrResponse(res, 403, "No common");
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
		var isStudent = currentUser.studentInfo !== undefined;
		var listingId = req.body.listingId;
		var userId = req.body.userId;

		if (currentUser.studentInfo) userId = currentUser.userId;
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
							"submitTime" : custom.submitTime,
							"_id" : custom._id
						};
						utils.sendSuccessResponse(res, content);
					}
				});
			}
		});
	} 
	else utils.sendErrResponse(res, 403, "No current user");
};


/** NEED TO FIX, THIS IS COPY AND PASTED..*/

/**
 * GET /users/applications/fullApp/:userid/:lstgid
 *
 * Gets the application (both the common and custom) submitted to listing lstgid by user with userid 
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
exports.getFullApplication = function(req, res) {
	//var currentUser = req.session.user;
	var isStudent = req.session.user.studentInfo !== undefined

	var listingId = req.body.listingId;
	var userId = req.body.userId;

	Common.getCommonByOwnerId(userId, function(errMsg, common) {
		if (errMsg) utils.sendErrResponse(res, 403, errMsg);
		else if (!common) utils.sendErrResponse(res, 403, "No common");
		else {
			common.populateCommon(function(errMsg, common) {
				if (errMsg) utils.sendErrResponse(res, 403, errMsg);
				else if (!common) utils.sendErrResponse(res, 403, "No common");
				else {

					Custom.getByOwnerAndListing(userId, listingId, isStudent, function(errMsg, custom) {
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

};


