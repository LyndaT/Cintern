var express = require('express');
var listing = require('../controllers/listing');
var common = require('../controllers/common');
var custom = require('../controllers/custom');
var utils = require('../utils/utils');
var router = express.Router();

/**
 * @author: Maddie Dawson
 */

/**
 * Require that a user is logged in and that the current user 
 * is a student, not an employer
 */
var requireStudent = function(req, res, next) {
  if (!req.session.user || !req.session.user.studentInfo) {
    utils.sendErrResponse(res, 403, 'Must be logged in and a student to use this feature.');
  } else {
    next();
  }
};

router.all('*', requireStudent);

// Add a given employer ID to the request body
router.param('employerid', function(req, res, next, employerId) {
  req.body.employerId = employerId;
  next();
});

// Add a given listing ID to the request body
router.param('lstgid', function(req, res, next, listingId) {
  req.body.listingId = listingId;
  next();
});

// Add a given application ID to the request body
router.param('customid', function(req, res, next, customId) {
  req.body.customId = customId;
  next();
});

/* GET all listings */
router.get('/listings',listing.getAllListings);

/* GET employer listings */
router.get('/listings/employer/:employerid', listing.getEmployerListings);

/* GET listing */
router.get('/listings/:lstgid', listing.getListing);

/* GET common application */
router.get('/applications/common', common.getCommon);

/* PUT submit common application */
router.put('/applications/common', common.submitCustom);

/* GET template */
//router.get('/applications/template/:lstgid', custom.getListingTemplate);

/* GET all applications */
router.get('/applications', custom.getAllStudentCustoms);

/* GET custom application */
router.get('/applications/custom/:lstgid', custom.getCustom);

/* POST add custom application */
router.post('/applications/custom/added/:lstgid', custom.addCustom);

/* PUT submit custom application */
router.put('/applications/custom/:customid', custom.submitCustom);

/* PUT save updates to a custom application */
router.put('/applications/saved/:customid', custom.saveCustom);

/* PUT withdraw a custom application */
router.put('/applications/withdrawal/:customid', custom.withdrawCustom);

/* DELETE delete a custom application */
router.delete('/applications/:customid', custom.deleteCustom);

module.exports = router;
