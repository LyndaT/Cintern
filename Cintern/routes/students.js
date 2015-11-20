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
  next();
  // if (!req.session.user || !req.session.user.studentInfo) {
  //   utils.sendErrResponse(res, 403, 'Must be logged in and a student to use this feature.');
  // } else {
  //   next();
  // }
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
router.param('customid', function(req, res, next, customId) {
  req.body.customId = customId;
  next();
});

router.get('/', function(req, res) {
  console.log("redirecting /students");
  if (req.session.user.studentInfo.commonFilled) {
    res.render('s-dash', { title: 'Cintern' });    
  } else {
    res.render('common', { user : req.session.user.userId });
  }
})

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

/* POST add custom application */
router.post('/applications/custom/saved/:lstgid', custom.saveCustomApplication);

/* POST submit common application */
router.post('/applications/common', common.submitCommonApplication);

/* GET submit common application */
//router.get('/applications/common', common.submitCommonApplication);

/* POST submit custom application */
router.post('/applications/custom/:customid', custom.submitCustomApplication);

/* POST application update */
// router.post('/applications/updates/:customid', custom.updateApplication);

/* POST application withdrawal */
// router.post('/applications/withdrawal/:customid', custom.withdrawApplication);

/* DELETE application */
// router.delete('/applications/:customid', custom.deleteApplication);

module.exports = router;
