var mongoose = require("mongoose");
/**
 * This is the schema for the database that stores all the job listings on our site.  
 * Each listing includes the employer id, the associated id number for the custom 
 * application template present in the listing, the title of the listing, description 
 * of the position, requirements to apply to the job, and deadline.
 */

//Schema for listings
var listingSchema = mongoose.Schema({
	employerId: String, //user id of employer
	title: String,
	description: String,
	requirements: [String],
	deadline: Date
});


/** Heeyoon */

/* Called when employer creates a new listing.  students would be empty initially, since one must create
the listing before students can apply
*/
listingSchema.statics.createListing = function(currEmployerId, applicationId, title, desc, reqs, deadline, callback) {
	Listing.create({
		employerId: currEmployerId,
		customAppId: applicationId,
		title: title,
		description: desc,
		requirements: reqs,
		deadline: deadline
	}, function(err, user) {
	      if (err) {
	        console.log(err);
	        callback();
	      } else {
	        callback();
	      }
    });
};

listingSchema.statics.deleteListing = function(listingId, callback) {

};

listingSchema.statics.getApplicantsForListing = function(listingId, callback) {

};

/** Maddie */

/**
 * Retrieve all listings and pass them to the provided callback.
 * Gather only the employerId, title, and deadline for each listing,
 * and fetch the company name for each employerId.
 *
 * @param callback: a function to pass the listing info to. The
 *					callback takes in an error and the list of listings
 */
listingSchema.statics.getAllListings = function(callback) {
	getListings({}, callback);
};

/**
 * Retrieve listings that match the given query and pass them to
 * the provided callback. Gather only the employerId, title,
 * and deadline for each listing, and fetch the company name for each
 * employerId.
 *
 * @param query: a JSON object that represents a MongoDB query
 * @param callback: a function to pass the listing info to. The
 * 					callback takes in an error and the list of listings
 */
var getListings = function(query, callback) {
	Listing.find(query, 
		{ employerId: 1, title: 1, description: 0, requirements: 0, deadline: 1 },
		function(err, listing_data) {
		if (err) {
			callback(err);
		} else {
			callback(null, listing_data);
		}
	});
};

/**
 * Retrieve listings that match the given filter query and pass them
 * to the provided callback. Gather only the employerId, title,
 * and deadline for each listing, and fetch the company name for each
 * employerId.
 *
 * @param query: a JSON object that represents a MongoDB query
 * @param callback: a function to pass the listing info to. The
 * 					callback takes in an error and the list of listings
 */
listingSchema.statics.filterListings = function(query, callback) {
	getListings(query, callback);
};

/**
 * Retrieve all listings posted by the employer with given ID and
 * pass them to the provided callback. Gather only the employerId, title,
 * and deadline for each listing, and fetch the company name for each
 * employerId.
 *
 * @param employerId: the ID of the employer whose listings to retrieve
 * @param callback: a function to pass the listing info to. The
 * 					callback takes in an error and the list of listings
 */
listingSchema.statics.getAllEmployerListings = function(employerId, callback) {
	getListings({employerId: employerId}, callback);
};

/**
 * Retrieve all information for the listing with ID listingId and pass it
 * to the provided callback.
 *
 * @param listingId:
 * @param callback: a funciton to pass the listing to. The callback takes
 * 					in an error and the listing
 */
listingSchema.statics.getListingInformation = function(listingId, callback) {
	Listing.findOne({ _id: listingId }, function(err, listing) {
		if (!listing) {
			callback({ msg: 'Invalid listing.' });
		} else if (err) {
			callback(err);
		} else {
			callback(none, listing);
		}
	});
};

var Listing = mongoose.model('Listing', listingSchema);
module.exports = Listing;