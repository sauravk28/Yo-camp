
var express = require('express'),
	router	= express.Router({mergeParams:true}),
	/* mergeParams true lets us use the params in router in different files
	if we want to use. Ex: now we can write the common starting route names
	in the main mycamps.js file, to reduce the length of name of routes
	in the consecutive different routes files..*/

	/*This Router method of express is used to provide portability, i.e
		modularity to code, so that at end this can be exported and used 
		in..*/
	Campground = require("../modules/campgrounds");
	middleware = require("../middleware");
 


// Showing different campgrounds

router.get("/campgrounds", function(req,res)

{
	Campground.find({},function(err,new_camps){
	if(err){
		console.log("there is a error");
	}
	else{
		res.render("campgrounds/campgrounds", {camps:new_camps});	
		
	}
	});
	

});




// Showing the form for adding Camps

/* The css file in this case isn't loading, i think the issue is due to
	the the route used in this case i.e the furhter long /add */

router.get("/campgrounds/add",middleware.isLoggedIn, function(req,res)

{	

	res.render("campgrounds/new");

});



/*Adding a post route in order to add new campground*/

/*The name has to be same as that of the main get request for showing
the camps, acc. to REST*/
router.post("/campgrounds",middleware.isLoggedIn, function(req,res){
	// This can only be done when body parser is included
	// Storing the value from input
	var newCamp = req.body.newcamp;
	var newImg	= req.body.newimg;
	var newDesc = req.body.newdesc;
	var author = {
		id: req.user._id,
		username:req.user.username
	}
	var newValues = {name:newCamp,pic:newImg,description:newDesc,author:
		author};
	Campground.create(newValues,function(err,camp){
	if(err){
		console.log("there is a error");
	}
	else{

		res.redirect("/campgrounds");	
		
	}
	});	

});

// Show route i.e the detailed info route
// Remember that this route should be after the campgrounds/new as, if it is before this link would work for that route also..

router.get("/campgrounds/:id", function(req,res)

{
	// req.params.id would stores the text that appears after the second slash..

	// findByID method from mongodb is used to access all the data via a id which would be stored on all_camps in this case

	// CAUTION: ERRROR ERROR is here in this step , the data is not getting stored in all_camps it returns null
	Campground.findById(req.params.id).populate("comments").exec(function(err, all_camps){
		if(err){
			console.log(err);
		}	
		else{
			console.log(all_camps);
			res.render("campgrounds/show", {camps:all_camps});
		}
	});
		
});


// Setting up the edit campgrounds..

router.get("/campgrounds/:id/edit",middleware.checkCampgroundOwnership, function(req,res)

{
	Campground.findById(req.params.id,function(err, all_camps){
		if(err){
			console.log(err);
		}	
		else{
			console.log(all_camps);

			res.render("campgrounds/edit", {camps:all_camps});
		}
	});
		
});

// A put req. to edit the form for campgrounds


router.put("/campgrounds/:id", middleware.checkCampgroundOwnership,function(req, res){
    // find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.camps, function(err, updatedCampground){
       if(err){
           res.redirect("/campgrounds");
       } else {
           //redirect somewhere(show page)
           res.redirect("/campgrounds/" + req.params.id);
           
       }
    });
});


// Deleting the campground

router.delete("/campgrounds/:id",middleware.checkCampgroundOwnership,function(req,res){
	Campground.findByIdAndRemove(req.params.id,function(err,foundCamp){
		if(err){
			res.redirect("/campgrounds");
		}
		else{
			res.redirect("/campgrounds");
		}
	});
});



module.exports = router;