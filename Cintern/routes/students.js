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
router.get('/applications', application.getStudentApplications);

/* GET application */
router.get('/applications/:appid', application.getApplication);

/* POST common application */
router.post('/applications/common', student.submitCommonApplication);

/* POST custom application */
router.post('/applications/custom', application.submitCustomApplication);

/* POST application update */
router.post('/applications/updates/:appid', application.updateApplication);

/* POST application withdrawal */
router.post('/applications/withdrawal/:appid', application.withdrawApplication);

/* DELETE application */
router.delete('/applications/:appid', application.deleteApplication);

module.exports = router;
