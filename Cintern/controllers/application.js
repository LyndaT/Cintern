/**
 * @author Jennifer Wu
 *
 * Application controller
 */
var Common = require('../models/common.js');
var Custom = require('../models/custom.js');
var Listing = require('../models/listing.js');
var utils = require('../utils/utils');
var async = require('async');

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
	console.log("get full app");

	// check that the listing belongs to the user
	Listing.doesEmployerOwnListing(employerId, listingId, function(errMsg, employerOwns) {
		if (errMsg) utils.sendErrResponse(res, 403, errMsg);
		else if (!employerOwns) utils.sendErrResponse(res, 403, "employer does not own");
		else {
			var commonResult;
			var customResult;
			var failedTask = false;
			
			// get the common application
			var getCommonTask = function(callback) {
				Common.getCommonByOwnerId(userId, function(errMsg, common) {
					if (errMsg || !common) {
						failedTask = true;
						callback();
					}
					common.populateCommon(function(errMsg, common) {
						if (errMsg) failedTask = true;
						else if (!common) failedTask = true;
						else commonResult = common;
						callback();
					});
				});	
			};

			// get the custom application
			var getCustomTask = function(callback) {
				Custom.getByOwnerAndListing(userId, listingId, false, function(errMsg, custom) {
					if (errMsg || !custom || (custom.state !== "subm" && custom.state !== "star")) {
						failedTask = true;
						callback();
					}
					custom.populateCustom(function(errMsg, custom) {
						if (errMsg) failedTask = true;
						else if (!custom) failedTask = true
						else customResult = custom;
						callback();
					});					
				});
			};

			// get common and custom in parallel
			async.parallel([getCommonTask, getCustomTask], function() {
				if (failedTask) utils.sendErrResponse(res, 403, "Could not get common and custom");
				else {
					var content = {
						"commonApp": commonResult.application,
						"listing" : customResult.listing,
						"state" : customResult.state,
						"customApp" : customResult.application,
						"owner" : customResult.owner,
						"isTemplate" : customResult.isTemplate,
						"submitTime" : customResult.submitTime,
						"customId" : customResult._id
					};
					utils.sendSuccessResponse(res, content);
				}
			});
		}
	});
};


