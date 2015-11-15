var express = require('express');
var router = express.Router();

var user = require('../controllers/user');
var student = require('../controllers/student');
var employer = require('../controllers/employer');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/student', student.addStudent);

router.post('/employer', employer.addEmployer);

module.exports = router;
