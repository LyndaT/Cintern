var express = require('express');
var listing = require('../controllers/listing');
var custom = require('../controllers/custom');
var application = require('../controllers/application');
var utils = require('../utils/utils');
var router = express.Router();

/**
 * @author: Maddie Dawson
 */

/**
 * Require that a user is logged in and that the current user 
 * is an employer, not a student
 */
var requireEmployer = function(req, res, next) {
  if (!req.session.user || req.session.user.studentInfo) {
    utils.sendErrResponse(res, 403, 'Must be logged in and an employer to use this feature.');
  } else {
    next();
  }
};

router.all('*', requireEmployer);


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

// Add a given user ID to the request body
router.param('userid', function(req, res, next, userId) {
  req.body.userId = userId;
  next();
});

/* GET listings */
router.get('/listings', listing.getEmployerListings);

/* GET full app */  
router.get('/applications/fullapp/:userid/:lstgid', application.getFullApplication);

/* POST listing */
router.post('/listings', listing.createListing);

/* DELETE listing */
router.delete('/listings/:lstgid', listing.deleteListing);

/* GET listing applicants */
router.get('/applications/listings/:lstgid', custom.getApplicants);

/* PUT star a custom application */
router.put('/applications/starred/:customid', custom.starCustom);

/* PUT unstar a custom application */
router.put('/applications/unstarred/:customid', custom.unstarCustom);

/* PUT reject a custom application */
router.put('/applications/rejected/:customid', custom.rejectCustom);

module.exports = router;
