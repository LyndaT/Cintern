/**
 * @author: Maddie Dawson
 */

var express = require('express');
var user = require('../controllers/user');
var router = express.Router();
var student = require('../controllers/student');
var employer = require('../controllers/employer');

var ExpressBrute = require('express-brute'),
    MongoStore = require('express-brute-mongo'),
    MongoClient = require('mongodb').MongoClient,
    moment = require('moment'),
    store;
    
var store = new MongoStore(function (ready) {
  MongoClient.connect('mongodb://localhost/cintern', function(err, db) {
    if (err) throw err;
    ready(db.collection('bruteforce-store'));
  });
});
    
/**
 * Slows requests after 5 failed attempts
 */
var userBruteforce = new ExpressBrute(store, {
    freeRetries: 5,
    proxyDepth: 1,
    minWait: 1*60*1000, // 5 minutes 
    maxWait: 60*60*1000, // 1 hour, 
    failCallback: failCallback,
    handleStoreError: handleStoreError
});

// No more than 1000 login attempts per day per IP 
var globalBruteforce = new ExpressBrute(store, {
    freeRetries: 1000,
    proxyDepth: 1,
    attachResetToRequest: false,
    refreshTimeoutOnRequest: false,
    minWait: 25*60*60*1000, // 1 day 1 hour (should never reach this wait time) 
    maxWait: 25*60*60*1000, // 1 day 1 hour (should never reach this wait time) 
    lifetime: 24*60*60, // 1 day (seconds not milliseconds) 
    failCallback: failCallback,
    handleStoreError: handleStoreError
});

var failCallback = function (req, res, next, nextValidRequestDate) {
    req.flash('error', "You've made too many failed attempts in a short period of time, please try again "+moment(nextValidRequestDate).fromNow());
    res.redirect('/'); // brute force protection triggered, send them back to the login page 
};

var handleStoreError = function (error) {
    log.error(error); // log this error so we can figure out what went wrong 
    // cause node to exit, hopefully restarting the process fixes the problem 
    throw {
        message: error.message,
        parent: error.parent
    };
};

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
router.post('/login', globalBruteforce.prevent, userBruteforce.getMiddleware({
        key: function(req, res, next) {
            // prevent too many attempts for the same username 
            next(req.body.email);
        }
    }), user.login);

/* POST logout */
router.post('/logout', user.logout);

/* POST new student */
router.post('/students', student.createStudent);

/* POST new employer */
router.post('/employers', employer.createEmployer);

module.exports = router;
