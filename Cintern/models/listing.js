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

listingSchema.statics.deleteListing = function(listingId) {

};

listingSchema.statics.getApplicantsForListing = function(listingId) {

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