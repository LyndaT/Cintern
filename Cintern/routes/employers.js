var express = require('express');
var listing = require('../controllers/listing');
var custom = require('../controllers/custom');
var router = express.Router();

/**
 * @author: Maddie Dawson
 */

/**
 * Require that a user is logged in and that the current user 
 * is an employer, not a student
 */
var requireEmployer = function(req, res, next) {
  if (!req.session.user || req.session.user.isStudent) {
    utils.sendErrResponse(res, 403, 'Must be logged in and an employer to use this feature.');
  } else {
    next();
  }
};

router.all('*', requireEmployer);

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

/* GET listings */
router.get('/listings', listing.getEmployerListings);

/* POST listing */
router.get('/listings', listing.createListing);

/* DELETE listing */
// router.delete('/listings/:lstgid', listing.deleteListing);

/* GET listing applicants */
router.get('/applications/listings/:lstgid', custom.getApplicants);

/* POST starred application */
// router.post('/applications/starred/:appid', custom.starApplication);

/* POST unstarred application */
// router.post('/applications/unstarred/:appid', custom.unstarApplication);

/* POST rejected application */
// router.post('/applications/rejected/:appid', custom.rejectApplication);

module.exports = router;
