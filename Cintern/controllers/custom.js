/**
 * @author: Maddie Dawson and Jennifer Wu
 */
var Custom = require('../models/custom.js');
var Listing = require('../models/listing.js');
var utils = require('../utils/utils');

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
	var employerId = currentUser.employerInfo._id;
	var listingId = req.body.listingId;

	// check if listing belongs to employer
	Listing.doesEmployerOwnListing(employerId, listingId, function(errMsg, employerOwns) {
		if (errMsg) utils.sendErrResponse(res, 403, errMsg);
		else if (!employerOwns) utils.sendErrResponse(res, 403, "Cannot get applicants if you do not own the listing");
		else {
			// get the customs for the listing if the employer owns the listing
			Custom.getCustomsForListingDash(listingId, function(errMsg, customs) {
				if (errMsg) utils.sendErrResponse(res, 403, errMsg);
				else if (!customs) utils.sendErrResponse(res, 403, "Could not get applications");
				else {
					var content = {
						applicants : customs
					};
					utils.sendSuccessResponse(res, content);
				}
			});
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
 *  - listingId: listing ID corresponding to the listing of the custom
 *
 * Response:
 *	- success: true if succeeded in changing custom state
 *	- err: on failure (i.e. server fail, invalid custom)
 */
exports.starCustom = function(req, res, next) {
	var currentUser = req.session.user;
	var employerId = currentUser.employerInfo._id;
	var listingId = req.body.listingId;
	var customId = req.body.customId;

	checkIfCustomOfEmployer(employerId, customId, listingId, function() {
		Custom.star(customId, function(errMsg, custom) {
			if (errMsg) utils.sendErrResponse(res, 403, errMsg);
			else if (!custom) utils.sendErrResponse(res, 403, "Not valid custom");
			else utils.sendSuccessResponse(res);
		});
	});			
};

/**
 * PUT /employers/applications/unstarred/:customid
 *
 * Marks a custom application as unstarred
 *
 * Request body:
 *  - customId: custom ID for to-be-unstarred custom
 *  - listingId: listing ID corresponding to the listing of the custom
 *
 * Response:
 *	- success: true if succeeded in changing custom state
 *	- err: on failure (i.e. server fail, invalid custom)
 */
exports.unstarCustom = function(req, res, next) {
	var currentUser = req.session.user;
	var employerId = currentUser.employerInfo._id;
	var listingId = req.body.listingId;
	var customId = req.body.customId;

	checkIfCustomOfEmployer(employerId, customId, listingId, function() {
		Custom.unstar(customId, function(errMsg, custom) {
			if (errMsg) utils.sendErrResponse(res, 403, errMsg);
			else if (!custom) utils.sendErrResponse(res, 403, "Not valid custom");
			else utils.sendSuccessResponse(res);
		});
	});		
};

/**
 * PUT /employers/applications/rejected/:customid
 *
 * Marks an custom application as rejected
 *
 * Request body:
 *  - customId: custom ID for to-be-rejected custom
 *  - listingId: listing ID corresponding to the listing of the custom
 *
 * Response:
 *	- success: true if succeeded in changing custom state
 *	- err: on failure (i.e. server fail, invalid custom)
 */
exports.rejectCustom = function(req, res, next) {
	var currentUser = req.session.user;
	var employerId = currentUser.employerInfo._id;
	var listingId = req.body.listingId;
	var customId = req.body.customId;

	checkIfCustomOfEmployer(employerId, customId, listingId, function() {
		Custom.reject(customId, function(errMsg, custom) {
			if (errMsg) utils.sendErrResponse(res, 403, errMsg);
			else if (!custom) utils.sendErrResponse(res, 403, "Not valid custom");
			else utils.sendSuccessResponse(res);
		});
	});		
};

/**
 * GET /students/applications
 *
 * Retrieves all student applications
 *
 * Response:
 *  - success: true if succeeded in changing application state
 *	- err: on failure (i.e. server fail)
 */
exports.getAllStudentCustoms = function(req, res, next) {
	if (!req.session.user.studentInfo.commonFilled){
		utils.sendErrResponse(res, 403, "Common application not filled");
	} else {
		var userId = req.session.user.userId;
		
		Custom.getCustomsForStudentDash(userId, function(errMsg, customs) {

			if (errMsg) utils.sendErrResponse(res, 403, errMsg);
			else if (!customs) utils.sendErrResponse(res, 403, "Could not get applications");
			else {
				var listingIds = [];
				customs.forEach(function(custom) {
					listingIds.push(custom.listing);
				});
				Listing.passedDeadlineListings(listingIds, function(errMsg, passedListingIds) {
					if (errMsg) utils.sendErrResponse(res, 403, errMsg);

					else {
						// change any starred custom states to normal submitted
						customs.forEach(function(custom) {
							custom.state = (custom.state === "star") ? "subm" : custom.state;
						});

						var content = {
							applications : customs
						};
						utils.sendSuccessResponse(res, content);
					}					
				});
			}
		});
	}
};

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
exports.getCustom = function(req, res, next) {
	if (!req.session.user.studentInfo.commonFilled){
		utils.sendErrResponse(res, 403, "Common application not filled");
	} else {
	
		var currentUser = req.session.user;
		var userId = currentUser.userId;
		var listingId = req.body.listingId;
	
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
							"state" : (custom.state === "star") ? "subm" : custom.state, 	// so student doesn't know if application has been starred
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
};

/**
 * POST /students/applications/custom/added/:lstgid
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
exports.addCustom = function(req, res, next) {
	if (!req.session.user.studentInfo.commonFilled){
		utils.sendErrResponse(res, 403, "Common application not filled");
	} else {

		var userId = req.session.user.userId;
		var listingId = req.body.listingId;
	
		Custom.copyTemplateToSave(listingId, userId, function(errMsg, custom) {
			if (errMsg) utils.sendErrResponse(res, 403, errMsg);
			else if (!custom) utils.sendErrResponse(res, 403, "Could not save application");
			else {
				utils.sendSuccessResponse(res);
			}
		});
	}
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
exports.submitCustom = function(req, res, next) {
	if (!req.session.user.studentInfo.commonFilled){
		utils.sendErrResponse(res, 403, "Common application not filled");
	} else {
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
	
		// check that the current user is the owner of the application
		checkIfCustomOfUser(userId, customId, function() {
			Custom.update(customId, answerArray, true, function(errMsg, custom) {
				if (errMsg) utils.sendErrResponse(res, 403, errMsg);
				else if (!custom) utils.sendErrResponse(res, 403, "Could not submit custom application");
				else {
					utils.sendSuccessResponse(res);
				}
			});
		});
	}
};

/**
 * PUT /students/applications/saved/:customid
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
exports.saveCustom = function(req, res, next) {
	if (!req.session.user.studentInfo.commonFilled){
		utils.sendErrResponse(res, 403, "Common application not filled");
	} else {
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
	
		// check that the current user is the owner of the application
		checkIfCustomOfUser(userId, customId, function() {
			Custom.update(customId, answerArray, false, function(errMsg, custom) {
				if (errMsg) utils.sendErrResponse(res, 403, errMsg);
				else if (!custom) utils.sendErrResponse(res, 403, "Could not save custom application");
				else {
					utils.sendSuccessResponse(res);
				}
			});
		});
	}
};

/**
 * PUT /students/applications/withdrawn/:customid
 *
 * Withdraws a custom application
 *
 * Request body:
 *	- customId : custom ID for to-be-rejected custom
 *
 * Response:
 *	- success: true if succeeded in withdrawal
 *	- err: on failure (i.e. server fail, invalid withdrawal, invalid custom)
 */ 
exports.withdrawCustom = function(req, res, next) {
	if (!req.session.user.studentInfo.commonFilled){
		utils.sendErrResponse(res, 403, "Common application not filled");
	} else {
		var currentUser = req.session.user;
		var userId = currentUser.userId;
		var customId = req.body.customId;
	
		checkIfCustomOfUser(userId, customId, function() {
			Custom.withdraw(customId, function(errMsg, custom) {
				if (errMsg) utils.sendErrRsponse(res, 403, errMsg);
				else if (!custom) utils.sendErrRsponse(res, 403, "Not valid custom");
				else utils.sendSuccessResponse(res);
			});
		});
	}
};

/**
 * DELETE /students/applications/:customid
 *
 * Deletes a custom application
 *
 * Request body:
 *	- customId : custom ID for to-be-rejected custom
 *
 * Response:
 *	- success: true if succeeded in deleting
 *	- err: on failure (i.e. server fail, invalid deletion, invalid custom)
 */ 
exports.deleteCustom = function(req, res, next) {
	if (!req.session.user.studentInfo.commonFilled){
		utils.sendErrResponse(res, 403, "Common application not filled");
	} else {
		var currentUser = req.session.user;
		var userId = currentUser.userId;
		var customId = req.body.customId;
	
		checkIfCustomOfUser(userId, customId, function() {
			Custom.deleteCustom(customId, function(errMsg, custom) {
				if (errMsg) utils.sendErrRsponse(res, 403, errMsg);
				else utils.sendSuccessResponse(res);
			});
		});
	}
};


/**
 * Runs callIfTrue if the custom associated with the customId corresponds to
 * the listing associated with listingId AND if the listing associated with
 * listingId belongs to the employer associated with employerId
 * 
 * @param{ObjectId} employerId
 * @param{ObjectId} customId
 * @param{ObjectId} listingId
 * @param{Function} callIfTrue()
 */
var checkIfCustomOfEmployer = function(employerId, customId, listingId, callIfTrue) {
	Listing.doesEmployerOwnListing(employerId, listingId, function(errMsg, employerOwns) {
		if (errMsg) utils.sendErrResponse(res, 403, errMsg);
		else if (!employerOwns) utils.sendErrResponse(res, 403, "Cannot get applicants if you do not own the listing");
		else {
			Custom.getStarOrSubmCustomIfListing(customId, listingId, function(errMsg, custom) {
				if (errMsg) utils.sendErrResponse(res, 403, errMsg);
				else if (!custom) utils.sendErrResponse(res, 403, "Not valid custom");
				else {
					callIfTrue();
				}
			});
		}
	});
};

/**
 * Runs callIfTrue if the customassociated with the customId has an owner
 * that is the User corresponding to the userId
 * 
 * @param{ObjectId} userId
 * @param{ObjectId} customId
 * @param{Function} callIfTrue()
 */
var checkIfCustomOfUser = function(userId, customId, callIfTrue) {
	Custom.getIfOwner(userId, customId, function(errMsg, custom) {
		if (errMsg) utils.sendErrResponse(res, 403, errMsg);
		else if (!custom) utils.sendErrResponse(res, 403, "Not valid");
		else {
			callIfTrue();
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
/*exports.getListingTemplate = function(req, res, next) {
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
};*/