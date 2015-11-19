<<<<<<< HEAD
=======
var express = require('express');
var user = require('../controllers/user');
var student = require('../controllers/student');
var employer = require('../controllers/employer');
var application = require('../controllers/application');
var router = express.Router();

>>>>>>> 2ae2f4b506a336ba2a7ab7e66bfaf5304016c2f2
/**
 * @author: Maddie Dawson
 */

<<<<<<< HEAD
var express = require('express');
var router = express.Router();

var user = require('../controllers/user');
var student = require('../controllers/student');
var employer = require('../controllers/employer');
var application = require('../controllers/application');
=======
/**
 * Add a given listing ID to the request body
 */
router.param('lstgid', function(req, res, next, listingId) {
  req.body.listingId = listingId;
  next();
});

/**
 * Add a given user ID to the request body
 */
router.param('userid', function(req, res, next, userId) {
  req.body.userId = userId;
  next();
});
>>>>>>> 2ae2f4b506a336ba2a7ab7e66bfaf5304016c2f2

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* POST login */
router.post('/login', user.login);

/* POST logout */
router.post('/logout', user.logout);

/* POST new student */
router.post('/students', student.createStudent);

/* POST new employer */
router.post('/employers', employer.createEmployer);

/* GET current user */
router.get('/current', user.getCurrent);

/* GET common app */
// maybe student.getCommon? idk
router.get('/applications/common/:userid', application.getCommon);

/* GET custom app */
// maybe student.getCustom? idk
router.get('/applications/custom/:userid/:lstgid', application.getCustom);

module.exports = router;
