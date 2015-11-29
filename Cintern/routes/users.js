/**
 * @author: Maddie Dawson
 */

var express = require('express');
var user = require('../controllers/user');
var router = express.Router();
var student = require('../controllers/student');
var employer = require('../controllers/employer');
var utils = require('../utils/utils');

var ExpressBrute = require('express-brute'),
    MongoStore = require('express-brute-mongo'),
    MongoClient = require('mongodb').MongoClient,
    moment = require('moment'),
    store;
    
// var store = new MongoStore(function (ready) {
  // MongoClient.connect('mongodb://localhost/cintern', function(err, db) {
    // if (err) throw err;
    // ready(db.collection('bruteforce-store'));
  // });
// });
var store = new ExpressBrute.MemoryStore();

var failCallback = function (req, res, next, nextValidRequestDate) {
	res.status(429).json({
		success: false,
		err: "You have been locked out due to too many failed login attempts. Please try again later."
	}).end();
};
    
// /**
 // * Slows requests after 3 failed attempts
 // */
// var userBruteforce = new ExpressBrute(store);

// Start slowing requests after 5 failed attempts to do something for the same user 
var userBruteforce = new ExpressBrute(store, {
    freeRetries: 4,
    proxyDepth: 1,
    minWait: 5*60*1000, // 5 minutes, 
    maxWait: 60*60*1000, // 1 hour, 
    failCallback: failCallback
});


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
router.post('/login', userBruteforce.prevent, user.login);

/* POST logout */
router.post('/logout', user.logout);

/* POST new student */
router.post('/students', student.createStudent);

/* POST new employer */
router.post('/employers', employer.createEmployer);

module.exports = router;
