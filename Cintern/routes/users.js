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
