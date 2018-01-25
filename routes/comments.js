var express = require('express'),
	router	= express.Router({mergeParams:true}),
	/*This Router method of express is used to provide portability, i.e
	modularity to code, so that at end this can be exported and used 
	in..*/
	Comments   = require("../modules/comments"),
	Campground = require("../modules/campgrounds"),
	middleware = require("../middleware");

// Route for adding the comments

router.get("/campgrounds/:id/comments/new",middleware.isLoggedIn, function(req,res){
	// finding the camp by it's id
	Campground.findById(req.params.id,function(err,campground){
		if(err){
			console.log(err);
		}
		else{
			res.render("comments/new", {campground:campground});
		}
	});
});


// Post route for creating the comments

router.post("/campgrounds/:id/comments",middleware.isLoggedIn, function(req,res){
	// Finding by id & saving the data to database and redirecting
	Campground.findById(req.params.id,function(err, campground){
		if(err){
			console.log(err);
		}
		else{
			/* NOTE: here req.body.comments would contain the object in 
			resides both the title as well as the author*/
			Comments.create(req.body.comments,function(err,comment){
				if(err){
					console.log(err);
				}
				else{
					/* adding username to the comments while user is
						logged in*/
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					// saving the comment
					comment.save();
					// pushing the comment in campground
					campground.comments.push(comment);
					campground.save();
					res.redirect("/campgrounds/" + campground._id);
				}
			});
		}
	});
});


// Editing and updating the comment

router.get("/campgrounds/:id/comments/:comment_id/edit",middleware.checkCommentOwnership, function(req,res){
	// finding the camp by it's id
	Comments.findById(req.params.comment_id,function(err,comment){
		if(err){
			console.log(err);
			res.redirect("/");
		}
		else{
			res.render("comments/edit", {comment:comment, campground_id:req.params.id});
		}
	});
});


// A put req. to edit the form for comment


router.put("/campgrounds/:id/comments/:comment_id",middleware.checkCommentOwnership,function(req, res){
    // find and update the correct campground
    Comments.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
       if(err){
           res.redirect("/campgrounds");
       } else {
           //redirect somewhere(show page)
           res.redirect("/campgrounds/" + req.params.id);
           
       }
    });
});

// Delete comment

router.delete("/campgrounds/:id/comments/:comment_id",middleware.checkCommentOwnership,function(req,res){
	Comments.findByIdAndRemove(req.params.comment_id,function(err,foundComment){
		if(err){
			res.redirect("/campgrounds");
		}
		else{
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});


 module.exports = router;