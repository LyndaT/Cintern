var mongoose = require("mongoose");

var stateTable = {
	"temp" : "template",
	"save" : "saved",
	"subm" : "submitted",
	"star" : "starred",
	"rej" : "rejected",
	"with" : "withdrawn",
	"comm" : "common",
}

// Application schema definition
var customSchema = mongoose.Schema({
	listing : { type : mongoose.Schema.Types.ObjectId, ref: "Listing" },
	state : { type: String, enum : Object.keys(stateTable), required : true },
	application : { type : mongoose.Schema.Types.ObjectId, ref: "Application" )}
});

/**
 * Gets all the custom applications where the userId is the owner in the format
 * so that they can be used to generate the student dash; then calls the callback
 *
 * @param{ObjectId} userId
 * @param{Function} callback(err, [Application])
 */
applicationSchema.statics.getAllCustomsForStudDash = function(userId, callback) {}

/**
 * Gets all the submitted or starred custom applications where the listingId is the 
 * listing in the format so that they can be used to generate the listing dash; 
 * then calls the callback on the applications
 *
 * @param{ObjectId} listingId
 * @param{Function} callback(err, [Application])
 */
applicationSchema.statics.getAllCustomsForListingDash = function(listinId, callback) {}
