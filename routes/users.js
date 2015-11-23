/**
 * @author: Maddie Dawson
 */

var express = require('express');
var user = require('../controllers/user');
var router = express.Router();
var student = require('../controllers/student');
var employer = require('../controllers/employer');


// Add a given listing ID to the request body
router.param('lstgid', function(req, res, next, listingId) {
  req.body.listingId = listingId;
  next();
});

// Add a given user ID to the request body
router.param('userid', function(req, res, next, userId) {
  req.body.userId = userId;
  next();
});

/* POST login */
router.post('/login', user.login);

/* POST logout */
router.post('/logout', user.logout);

/* POST new student */
router.post('/students', student.createStudent);

/* POST new employer */
router.post('/employers', employer.createEmployer);

module.exports = router;
