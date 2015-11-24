/**
 * Frit Controller that helps take care of HTTP request of requests
 * starting with /frit/
 */
var utils = require('../utils/utils');
var Frit = require('../models/frit');

/**
 * POST /frit/add
 *
 * Adds a frit with id fritId if it belongs to the current user
 *
 * Request body:
 *  - newFrit: content of the new frit
 *
 * Response:
 *  - success: true if succeeded in adding a frit
 *  - err: on failure (i.e. server fail, no signed in user), an error message
 */
exports.add = function(req, res, next) {
  var currentUser = req.session.user;

  // can only create new frit if there's a current user
  if (currentUser) {
    var fritText = req.body.newfrit;

    Frit.createFrit(fritText, currentUser.id, currentUser.id, function(errMsg){
      if (errMsg) utils.sendErrResponse(res, 403, errMsg);
      else utils.sendSuccessResponse(res);
    });
  } 

  else utils.sendErrResponse(res, 403, "You must be logged in to post a frit");
}

/**
 * DELETE /frit/remove/:fritId
 *
 * Deletes the frit with id fritId
 *
 * Request parameters:
 *  - fritId: the frit ID of the frit being deleted
 *
 * Response:
 *  - success: true if the server succeeded in deleting the frit
 *  - err: on failure (i.e. server fail, no signed in user), an error message
 */
exports.remove = function(req, res, next) {
  var currentUser = req.session.user;
  var removeFritId = req.params.fritId;
  if (currentUser) {
    Frit.removeFrit(removeFritId, currentUser.id, function(errMsg){
      if (errMsg) utils.sendErrResponse(res, 403, errMsg);
      else utils.sendSuccessResponse(res);
    })
  } 
  else utils.sendErrResponse(res, 403, "You must be logged in to remove a frit");
}

/**
 * POST /frit/remove/:fritId
 *
 * Refrits the frit with id fritId
 *
 * Request parameters:
 *  - fritId: the frit ID of the frit being deleted
 *
 * Response:
 *  - success: true if succeeded in retweeting
 *  - err: on failure (i.e. server fail, no frit, no signed in user), 
 *    an error message
 */
exports.refrit = function(req, res, next) {
  var currentUser = req.session.user;
  if (currentUser) {
    var currentUserId = currentUser.id;
    var refritId = req.params.fritId;
  
    Frit.refrit(refritId, currentUserId, function(errMsg){
      if (errMsg) utils.sendErrResponse(res, 403, errMsg);
      else utils.sendSuccessResponse(res);
    })
  } 
  else utils.sendErrResponse(res, 403, "You must be logged in to post a frit");
}

