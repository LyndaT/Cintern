/**
 * @author Lynda Tang
 */
var ObjectID = require('mongodb').ObjectID;
var Employer = require('../models/Employer.js');
var User = require('../models/User.js');
var utils = require('../utils/utils');
var mandrill = require('mandrill-api/mandrill');

/**
 * POST /users/employers
 * Adds an Employer to the Database
 * 
 * Request parameters:
 * 		-email: the inputed email of the Employer
 * 		-password: the inputed password of the Employer
 * 		-company: the inputed company of the Employer
 * 
 * Response:
 * 		-success: true if the server succeeded in adding the Employer
 * 		-err: on failure (i.e failed in adding Employer), an error message
 */
module.exports.createEmployer = function(req, res, next){
	var email = req.body.email;
	var password = req.body.password;
	var company = req.body.company;
	// mandrill_client = new mandrill.Mandrill('ebssNtNrdCzIamvsaEANag');
// 	
	// var message = {
    // "html": "<p>Employer Verification for: </p><br>Email: " + email + "<br>Company: " + company,
    // "subject": "Employer Request",
    // "from_email": "message.employer-verification@cintern.com",
    // "from_name": "Cintern",
    // "to": [{
            // "email": "cinteradmin@mit.edu",
            // "name": "Cintern Admin",
            // "type": "to"
        // }],
    // "important": false,
    // "track_opens": null,
    // "track_clicks": null,
    // "auto_text": null,
    // "auto_html": null,
    // "inline_css": null,
    // "url_strip_qs": null,
    // "preserve_recipients": null,
    // "view_content_link": null,
    // "tracking_domain": null,
    // "signing_domain": null,
    // "return_path_domain": null,
    // "merge": false,
	// };
// 	
	// var async = false;
	// var ip_pool = "Main Pool";
	// mandrill_client.messages.send({"message": message, "async": async, "ip_pool": ip_pool}, function(result) {
	    // console.log(result);
	    // console.log("Creating employer");
		// Employer.createEmployer(email, password, company, function(errMsg, employer){
			// if (errMsg){
				// utils.sendErrResponse(res, 403, errMsg);
			// } else {
				// var currUser = {
					// userId: employer.user,
					// employerInfo : {
						// company : employer.company,
						// _id : employer._id
					// },
				// };
				// req.session.user = currUser;
				// utils.sendSuccessResponse(res);
			// }
		// });
	// }, function(e) {
	    // console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
	// });
	Employer.createEmployer(email, password, company, function(errMsg, employer){
			if (errMsg){
				utils.sendErrResponse(res, 403, errMsg);
			} else {
				var currUser = {
					userId: employer.user,
					employerInfo : {
						company : employer.company,
						_id : employer._id
					},
				};
				req.session.user = currUser;
				utils.sendSuccessResponse(res);
			}
		});
};