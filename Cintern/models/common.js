var mongoose = require("mongoose");

var commonSchema = mongoose.Schema({
	application : { type : mongoose.Schema.Types.ObjectId, ref: "Application" },
	owner : { type : mongoose.Schema.Types.ObjectId, ref : "User", required : true, immutable : true },
});

/** 
 * Creates a Common where the application has questions set to questions and the
 * owner set to the userId, then the callback is called on the Common
 *
 * @param{Object} questions 
 * @param{ObjectId} userId
 * @param{Function} callback(err, Common)
 */
commonSchema.statics.createCommon = function(questions, userId, callback) {}

/**
 * Gets the Common where the owner is userId, then runs the callback on the Common
 *
 * @param{ObjectId} userId
 * @param{Function} callback(err, Common) 
 */
commonSchema.statics.getCommon = function(userId, callback) {}

/**
 * Gets all the Commons where the owners are from userIds, then runs callback
 * on the array of Commons
 * 
 * @param{Array} userIds is an array of ObjectIds
 * @param{Function} callback(err, [Common])
 */
commonSchema.statics.getCommons = function(userIds, callback) {}


var Common = mongoose.model("Common", commonSchema);
module.exports = Common;