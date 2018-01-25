
var Comments   = require("../modules/comments");
var Campground = require("../modules/campgrounds");
var flash	 = require("connect-flash");
var middlewareObj = {}

/* Making a middleware that checks the user is logged in or not*/

middlewareObj.isLoggedIn =  function(req,res,next){
 	if(req.isAuthenticated()){
 		next();
 	}
 	else{
 		req.flash("error", "You are not logged in !!");
		// flash statement must be written before redirection
		/* It's so, coz it provvides us facility to configure it ,
		before it is executed on the redirected page, in the associated
		ejs template*/
 		res.redirect("/login"); 
 	}
 	}

// Middleware for authorization of camps

middlewareObj.checkCampgroundOwnership = 

 function (req,res,next){
 	// CHeck user is logged in or not
 	if(req.isAuthenticated()){
 		/* checking whether the user logged in is same to that who has
		created the campground*/
		Campground.findById(req.params.id,function(err,foundCamp){
			if(err){
				
				res.redirect("back");
			}
			else{
				// Compare that both current user and owner is same
				// foundCamp.author.id === req.user._id
				/* The above cant be done as the first is a mongoose
				object and the other one is a string, so === wont 
				work.. For that we have a mongoose method..*/
				if(foundCamp.author.id.equals(req.user._id)){
					next();
				}
				else{
					req.flash("error", "You dont have permission!!");
					res.redirect("back");
				}
			}
		});
 	}
 	else{
 		req.flash("error", "You are not logged in!!");
 		res.redirect("back");
 	}
 }

// Middleware for authorization of comment

 middlewareObj.checkCommentOwnership = 

 function (req,res,next){
 	// CHeck user is logged in or not
 	if(req.isAuthenticated()){
 		/* checking whether the user logged in is same to that who has
		created the campground*/
		Comments.findById(req.params.comment_id,function(err,foundComment){
			if(err){

				res.redirect("back");
			}
			else{
				// Compare that both current user and owner is same
				// foundCamp.author.id === req.user._id
				/* The above cant be done as the first is a mongoose
				object and the other one is a string, so === wont 
				work.. For that we have a mongoose method..*/
				if(foundComment.author.id.equals(req.user._id)){

					next();
				}
				else{
					req.flash("error", "You dont have permission!!");
					res.redirect("back");
				}
			}
		});
 	}
 	else{
 		req.flash("error", "You are not logged in!!");
 		res.redirect("back");
 	}
 }



module.exports = middlewareObj;


