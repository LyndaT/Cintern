var Application = require('../models/application.js');
var utils = require('../utils/utils');

exports.getCommon = function(req, res, next) {
	var currentUser = req.session.user;
	var isStudent = currentUser.isStudent;
	if (isStudent) {
		Common.
	}
};

exports.getCustom = function(req, res, next) {
	var currentUser = req.session.user;
	var isStudent = currentUser.isStudent;
	var currentUserId = currentUser.userId;
	var customId = req.params.lstgid
	var userId = req.params.userid
	if (isStudent) {
		Custom.getIfOwner(currentUserId, customId, function(errMsg, custom) {
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
	} else {
		Listing.getAllEmployerListings(currentUserId, function(errMsg, listings) {

		});
		Custom.getStarOrSubmCustomForListing()
	}
};