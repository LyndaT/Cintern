var express = require('express');
var listing = require('../controllers/listing');
var common = require('../controllers/common');
var custom = require('../controllers/custom');
var router = express.Router();

/**
 * @author: Maddie Dawson
 */

/**
 * Require that a user is logged in and that the current user 
 * is a student, not an employer
 */
var requireStudent = function(req, res, next) {
  if (!req.session.user || !req.session.user.isStudent) {
    utils.sendErrResponse(res, 403, 'Must be logged in and a student to use this feature.');
  } else {
    next();
  }
};

router.all('*', requireStudent);

/**
 * Add a given employer ID to the request body
 */
router.param('employerid', function(req, res, next, employerId) {
  req.body.employerId = employerId;
  next();
});

/**
 * Add a given listing ID to the request body
 */
router.param('lstgid', function(req, res, next, listingId) {
  req.body.listingId = listingId;
  next();
});

/**
 * Add a given application ID to the request body
 */
router.param('appid', function(req, res, next, applicationId) {
  req.body.applicationId = applicationId;
  next();
});

/* GET all listings */
router.get('/listings', listing.getAllListings);

/* GET employer listings */
router.get('/listings/employer/:employerid', listing.getEmployerListings);

/* GET listing */
router.get('/listings/:lstgid', listing.getListing);

/* GET all applications */
router.get('/applications', custom.getStudentApplications);

/* GET template */
router.get('/applications/template/:lstgid', custom.getListingTemplate);

/* POST common application */
router.post('/applications/common', common.submitCommonApplication);

/* POST custom application */
router.post('/applications/custom', custom.submitCustomApplication);

/* POST application update */
// router.post('/applications/updates/:appid', custom.updateApplication);

/* POST application withdrawal */
// router.post('/applications/withdrawal/:appid', custom.withdrawApplication);

/* DELETE application */
// router.delete('/applications/:appid', custom.deleteApplication);

module.exports = router;
