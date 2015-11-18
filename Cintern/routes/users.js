var express = require('express');
var router = express.Router();

/**
 * @author: Maddie Dawson
 */

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* POST login */
router.post('/users/login', user.login);

/* POST logout */
router.post('/users/logout', user.logout);

/* POST new student */
router.post('/users/students', student.createStudent);

/* POST new employer */
router.post('/users/employers', employer.createEmployer);

/* GET current user */
router.get('/users/current', user.getCurrent);

/* GET common app */
// maybe student.getCommon? idk
router.get('/users/applications/common/:userid', application.getCommon);

/* GET custom app */
// maybe student.getCustom? idk
router.get('/users/applications/custom/:userid/:lstgid', application.getCustom);

module.exports = router;
