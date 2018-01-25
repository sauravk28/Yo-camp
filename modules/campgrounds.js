var mongoose = require("mongoose");




// Creating a schema 
var campSchema = new mongoose.Schema({
	name:String,
	pic:String,	
	description:String,
	author:
		{
			id:{
				type:mongoose.Schema.Types.ObjectId,
				ref: "User"
			},
			
			username:String
		},
	comments:[
		{
		
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comments"
		}
	]
});

// Exporting the models from this page to where this page would be required
module.exports = mongoose.model("campground", campSchema);