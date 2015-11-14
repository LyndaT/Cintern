var mongoose = require("mongoose");
/*
This is the schema for the database that stores all the job listings on our site.  
Each listing includes the employer id, the associated id number for the custom 
application template present in the listing, the title of the listing, description 
of the position, requirements to apply to the job, deadline, and a list of students 
who have applied to the listing. 
*/

//Schema for listings
var listingSchema = mongoose.Schema({
	employerId: String, //user id of employer
	customAppId: Number, //application id
	title: String,
	description: String,
	requirements: [String],
	deadline: Date
});


/* Called when employer creates a new listing.  students would be empty initially, since one must create
the listing before students can apply
*/
listingSchema.statics.createListing = function(currEmployerId, applicationId, title, desc, reqs, deadline, callback) {
	return Listing.create({
		employerId: currEmployerId,
		customAppId: applicationId,
		title: title,
		description: desc,
		requirements: reqs,
		deadline: deadline
	}, callback);
};






var Listing = mongoose.model('Listing', listingSchema);
module.exports = Listing;