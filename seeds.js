 var mongoose = require("mongoose");

var Campground = require("./modules/campgrounds");
var Comments   = require("./modules/comments");

/* THis func contains everything about the database and hence this can be
later exported*/

var data = [
		{ name:"Aravali", pic:"https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque tempus, est vitae efficitur blandit, ipsum tellus maximus sapien, eget placerat est orci vel diam. Praesent in semper felis, semper blandit mi. Proin imperdiet, diam nec placerat malesuada, turpis lacus venenatis ante, vitae feugiat arcu sem vitae dui. Praesent in magna rhoncus, rhoncus mi vitae, luctus lacus. Ut nisi lacus, accumsan nec scelerisque sed, viverra at augue. Nulla facilisi. Nam porta cursus nisl, eget condimentum elit mollis a. "},
		{ name:"Himalya", pic:"https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg", 
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque tempus, est vitae efficitur blandit, ipsum tellus maximus sapien, eget placerat est orci vel diam. Praesent in semper felis, semper blandit mi. Proin imperdiet, diam nec placerat malesuada, turpis lacus venenatis ante, vitae feugiat arcu sem vitae dui. Praesent in magna rhoncus, rhoncus mi vitae, luctus lacus. Ut nisi lacus, accumsan nec scelerisque sed, viverra at augue. Nulla facilisi. Nam porta cursus nisl, eget condimentum elit mollis a. "},
		{ name:"Arunachal", pic:"https://farm3.staticflickr.com/2259/2182093741_164dc44a24.jpg",
		 description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque tempus, est vitae efficitur blandit, ipsum tellus maximus sapien, eget placerat est orci vel diam. Praesent in semper felis, semper blandit mi. Proin imperdiet, diam nec placerat malesuada, turpis lacus venenatis ante, vitae feugiat arcu sem vitae dui. Praesent in magna rhoncus, rhoncus mi vitae, luctus lacus. Ut nisi lacus, accumsan nec scelerisque sed, viverra at augue. Nulla facilisi. Nam porta cursus nisl, eget condimentum elit mollis a. "},
		{ name:"Hillpil", pic:"https://farm5.staticflickr.com/4083/4961648022_7fec214b35.jpg" ,
		 description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque tempus, est vitae efficitur blandit, ipsum tellus maximus sapien, eget placerat est orci vel diam. Praesent in semper felis, semper blandit mi. Proin imperdiet, diam nec placerat malesuada, turpis lacus venenatis ante, vitae feugiat arcu sem vitae dui. Praesent in magna rhoncus, rhoncus mi vitae, luctus lacus. Ut nisi lacus, accumsan nec scelerisque sed, viverra at augue. Nulla facilisi. Nam porta cursus nisl, eget condimentum elit mollis a. "},
		{ name:"Chillpil", pic:"https://farm5.staticflickr.com/4101/4961777592_322fea6826.jpg", 
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque tempus, est vitae efficitur blandit, ipsum tellus maximus sapien, eget placerat est orci vel diam. Praesent in semper felis, semper blandit mi. Proin imperdiet, diam nec placerat malesuada, turpis lacus venenatis ante, vitae feugiat arcu sem vitae dui. Praesent in magna rhoncus, rhoncus mi vitae, luctus lacus. Ut nisi lacus, accumsan nec scelerisque sed, viverra at augue. Nulla facilisi. Nam porta cursus nisl, eget condimentum elit mollis a. "},
		{ name:"Billpill", pic:"https://farm2.staticflickr.com/1363/1342367857_2fd12531e7.jpg" ,
		 description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque tempus, est vitae efficitur blandit, ipsum tellus maximus sapien, eget placerat est orci vel diam. Praesent in semper felis, semper blandit mi. Proin imperdiet, diam nec placerat malesuada, turpis lacus venenatis ante, vitae feugiat arcu sem vitae dui. Praesent in magna rhoncus, rhoncus mi vitae, luctus lacus. Ut nisi lacus, accumsan nec scelerisque sed, viverra at augue. Nulla facilisi. Nam porta cursus nisl, eget condimentum elit mollis a. "}
]

function seedDB(){
	Campground.remove({},function(err){
		// if (err) {
		// 	console.log(err);
		// }
		// else{
		// 	console.log("removed everything");


		// 	// Adding the campgrounds
		// 	/* REMEMBER: The data should be added in this else block only
		// 	else, we dont know what js will exec. first the remove command
		// 		or the creation of the entities*/
		// 		data.forEach(function(camp){
		// 			Campground.create(camp,function(err,campground){
		// 				if(err){
		// 					console.log("there is a error");
		// 				}
		// 				else{
		// 					console.log(campground);

		// 					Comments.create({
		// 						body:"I am the first comment",
		// 						author:"Saurabh"
		// 						},function(err,data){
		// 							if(err){
		// 								console.log(err);
		// 							}
		// 							else{
		// 								campground.comments.push(data);
		// 								campground.save();
		// 								console.log("Comment added");
										
		// 							}
		// 					});
						
		// 				}
		// 			});
		// 		});
		// 	}

		


		
	});
}



module.exports = seedDB;