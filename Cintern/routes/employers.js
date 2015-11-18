var express = require('express');
var router = express.Router();

/**
 * @author: Maddie Dawson
 */

/* GET listings */
router.get('/employers/listings', listing.getEmployerListings);

/* POST listing */
router.get('/employers/listings', listing.createListing);

/* DELETE listing */
router.delete('/employers/listings/:lstgid', listing.deleteListing);

/* GET listing applicants */
router.get('/employers/applications/:lstgid', application.getApplicants);

/* POST application template */
router.post('/employers/applications', application.createTemplate);

/* POST starred application */
router.post('/employers/applications/starred/:appid', application.starApplication);

/* POST unstarred application */
router.post('/employers/applications/unstarred/:appid', application.unstarApplication);

/* POST rejected application */
router.post('/employers/applications/rejected/:appid', application.rejectApplication);

module.exports = router;
