var express = require('express');
var router = express.Router();

/**
 * @author: Maddie Dawson
 */

/* GET listings */
router.get('/listings', listing.getEmployerListings);

/* POST listing */
router.get('/listings', listing.createListing);

/* DELETE listing */
router.delete('/listings/:lstgid', listing.deleteListing);

/* GET listing applicants */
router.get('/applications/:lstgid', application.getApplicants);

/* POST application template */
router.post('/applications', application.createTemplate);

/* POST starred application */
router.post('/applications/starred/:appid', application.starApplication);

/* POST unstarred application */
router.post('/applications/unstarred/:appid', application.unstarApplication);

/* POST rejected application */
router.post('/applications/rejected/:appid', application.rejectApplication);

module.exports = router;
