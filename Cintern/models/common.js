var mongoose = require("mongoose");

var commonSchema = mongoose.Schema({
	application : { type : mongoose.Schema.Types.ObjectId, ref: "Application" },
});