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
// router.delete('/listings/:lstgid', listing.deleteListing);

/* GET listing applicants */
router.get('/applications/listings/:lstgid', custom.getApplicants);

/* POST application template */
router.post('/applications', custom.createTemplate);

/* POST starred application */
// router.post('/applications/starred/:appid', custom.starApplication);

/* POST unstarred application */
// router.post('/applications/unstarred/:appid', custom.unstarApplication);

/* POST rejected application */
// router.post('/applications/rejected/:appid', custom.rejectApplication);

module.exports = router;
