var mongoose = require("mongoose");
/**
 * This is the schema for the database that stores all the job listings on our site.  
 * Each listing includes the employer id, the associated id number for the custom 
 * application template present in the listing, the title of the listing, description 
 * of the position, requirements to apply to the job, and deadline.
 */

//Schema for listings
var listingSchema = mongoose.Schema({
	employerId: {type: mongoose.Schema.Types.ObjectId, ref: "User", immutable: true, required: true}, 
	title: {type: String, required: true},
	description: String,
	requirements: String,
	deadline: Date
});


/**
 * Creates a new Listing, then calls callback function
 *
 * @param {String} currEmployerId the id of the employer who creates the listing
 * @param {String} title the title of the internship position
 * @param {String} desc of the internship position
 * @param {String} reqs the requirements that the employer wants you to have, e.g. Graduates on June 2017, B.S. Computer Science, etc.
 * @param {Date} deadline the date at which the application for this listing will close
 * @param {Function} callback(err, listing) 
 */
listingSchema.statics.createListing = function(currEmployerId, title, desc, reqs, deadline, callback) {
	Listing.create({
		employerId: currEmployerId,
		title: title,
		description: desc,
		requirements: reqs,
		deadline: deadline
	}, function(err, user) {
	      if (err) {
	        callback(err.msg);
	      } else {
	        callback();
	      }
    });
};

/**
 * Deletes the listing with id listingId, then calls callback function
 *
 * @param {String} listingId the id of the listing to delete
 * @param {Function} callback(err, listing) 
 */
listingSchema.statics.deleteListing = function(listingId, callback) {
	Listing.remove({_id: listingId}, function(err, user) {
      if (err) {
        callback(err.msg);
      } else {
        callback();
      }
    });
};


/**
 * Retrieve all listings and pass them to the provided callback.
 * Gather only the employerId, title, and deadline for each listing,
 * and fetch the company name for each employerId.
 *
 * @param callback: a function to pass the listing info to. The
 *					callback takes in an error and the list of listings
 */
listingSchema.statics.getAllListings = function(callback) {
	
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

};

var Listing = mongoose.model('Listing', listingSchema);
module.exports = Listing;