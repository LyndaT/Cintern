var Application = require('../models/application.js');
var utils = require('../utils/utils');

exports.getCommon = function(req, res, next) {
	var currentUser = req.session.user;
	if (currentUser) {
		var isStudent = currentUser.isStudent;
		var currentUserId = currentUser.userId;
		var listingId = req.body.lstgid
		var userId = req.params.userid

		var doAfterGetCommon = function(errMsg, custom) {
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
		}

		if (isStudent) Custom.getIfOwner(currentUserId, customId, doAfterGetCustom(errMsg, custom));
		else Custom.getStarOrSubmCustomForListing(userId, listingId, doAfterGetCustom(errMsg, custom));
	} 
	else utils.sendErrResponse(res, 403, "No current user");
};

exports.getCustom = function(req, res, next) {
	var currentUser = req.session.user;
	if (currentUser) {
		var isStudent = currentUser.isStudent;
		var currentUserId = currentUser.userId;
		var listingId = req.body.lstgid
		var userId = req.params.userid

		var doAfterGetCustom = function(errMsg, custom) {
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
		}

		if (isStudent) Custom.getIfOwner(currentUserId, customId, doAfterGetCustom(errMsg, custom));
		else Custom.getStarOrSubmCustomForListing(userId, listingId, doAfterGetCustom(errMsg, custom));
	} 
	else utils.sendErrResponse(res, 403, "No current user");
};