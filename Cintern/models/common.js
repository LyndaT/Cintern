var mongoose = require("mongoose");

var commonSchema = mongoose.Schema({
	application : { type : mongoose.Schema.Types.ObjectId, ref: "Application" },
});

/** 
 * Submits a common application for the user with questions that are
 * questions; then calls the callback
 *
 * @param{Object} questions 
 * @param{ObjectId} userId
 * @param{Function} callback(err, Application)
 */
commonSchema.statics.submitCommon = function(questions, userId, callback) {}

/**
 * Gets the common app associated with the userId, then runs the callback
 *
 * @param{ObjectId} userId
 * @param{Function} callback(err, Application) 
 */
commonSchema.statics.getCommonApp = function(userId, callback) {}

/**
 * Gets all the common apps where the owners are from userIds, then runs callback
 * on the array of common apps
 * 
 * @param{Array} userIds is an array of ObjectIds
 * @param{Function} callback(err, [Application])
 */
commonSchema.statics.getCommons = function(userIds, callback) {}


var Common = mongoose.model("Common", commonSchema);
module.exports = Common;