var express = require('express');
var router = express.Router();

/**
 * @author: Maddie Dawson
 */

/* GET all listings */
router.get('/listings', listing.getAllListings);

/* GET employer listings */
router.get('/listings/employer/:employerid', listing.getEmployerListings);

/* GET listing */
router.get('/listings/:lstgid', listings.getListing);

/* GET all applications */
router.get('/applications', custom.getStudentApplications);

/* GET application */
router.get('/applications/:appid', application.getApplication);

/* GET template */
router.get('/applications/template/:lstgid', custom.getListingTemplate);

/* POST common application */
router.post('/applications/common', common.submitCommonApplication);

/* POST custom application */
router.post('/applications/custom', custom.submitCustomApplication);

/* POST application update */
router.post('/applications/updates/:appid', custom.updateApplication);

/* POST application withdrawal */
router.post('/applications/withdrawal/:appid', application.withdrawApplication);

/* DELETE application */
router.delete('/applications/:appid', application.deleteApplication);

module.exports = router;
