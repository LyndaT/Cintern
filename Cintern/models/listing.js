var mongoose = require("mongoose");
/**
 * This is the schema for the database that stores all the job listings on our site.  
 * Each listing includes the employer id, the associated id number for the custom 
 * application template present in the listing, the title of the listing, description 
 * of the position, requirements to apply to the job, and deadline.
 */

//Schema for listings
var listingSchema = mongoose.Schema({
	employerId: {type: String, immutable: true, required: true}, 
	title: {type: String, required: true},
	description: String,
	requirements: String,
	deadline: Date
});


/** Heeyoon */

/**
 * Creates a new Listing, then calls 
 * @param {String} currEmployerId the id of the employer who creates the listing
 * @param {String} title the title of the internship position
 * @param {String} desc of the internship position
 * @param {String} reqs the requirements that the employer wants you to have, e.g. Graduates on June 2017, B.S. Computer Science, etc.
 * @param {Date} deadline the date at which the application for this listing will close
 * @param {Function} callback(err, listing) 
 */
listingSchema.statics.createListing = function(currEmployerId, title, desc, reqs, deadline, callback) {

};

/**
 * Deletes the listing with id listingId
 * @param {String} listingId the id of the listing to delete
 * @param {Function} callback(err, listing) 
 */
listingSchema.statics.deleteListing = function(listingId, callback) {

};


/** Maddie */
listingSchema.statics.getAllListings = function(listingId) {

};

listingSchema.statics.filterListings = function(query) {

};

listingSchema.statics.getAllEmployerListings = function(employerId) {

};




var Listing = mongoose.model('Listing', listingSchema);
module.exports = Listing;