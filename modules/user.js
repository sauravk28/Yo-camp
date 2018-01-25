var mongoose = require("mongoose");

var passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({

	username: String,
	password: String
});

userSchema.plugin(passportLocalMongoose);

/* This would allow some functions in passport-local-mongoose to work with the 
user object model*/

module.exports = mongoose.model("User",userSchema);