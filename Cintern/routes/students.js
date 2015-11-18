var express = require('express');
var router = express.Router();

/**
 * @author: Maddie Dawson
 */

/* GET all listings */
router.get('/students/listings', listing.getAllListings);

/* GET employer listings */
router.get('/students/listings/employer/:employerid', listing.getEmployerListings);

/* GET listing */
router.get('/students/listings/:lstgid', listings.getListing);

/* GET all applications */
router.get('/students/applications', application.getStudentApplications);

/* GET application */
router.get('/students/applications/:appid', application.getApplication);

/* POST application */
router.post('/students/applications', application.submitApplication);

/* POST application update */
router.post('/students/applications/updates/:appid', application.updateApplication);

/* POST application withdrawal */
router.post('/students/applications/withdrawal/:appid', application.withdrawApplication);

/* DELETE application */
router.delete('/students/applications/:appid', application.deleteApplication);

module.exports = router;
