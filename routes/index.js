
var express = require('express'),
	router	= express.Router(),
	User = require("../modules/user"),
	passport = require("passport");




// Home route

router.get("/", function(req,res){
	// as now the home file exists furhter in a folder in viws..
   res.render("campgrounds/home");
});	


// Authentication Routes

// Register-get route

router.get("/register",function(req,res){

	res.render("register");
});

//Register-post route

router.post("/register",function(req,res){
	var newUser = new User({username:req.body.username});
	User.register(newUser,req.body.password,function(err,user){
		if(err){
			console.log(err);
			req.flash("error", err.message);
			/* err is a object that has a key message which further 
				contains its body..*/
			return res.redirect("register");
		}
		else{
			passport.authenticate("local")(req,res,function(){
				req.flash("success", "Welcome to Yo Camp " + user.username);
				res.redirect("/campgrounds");
			
			});
		}
	});
});

// Login get route

router.get("/login",function(req,res){
	res.render("login");
});

// Login route post 

router.post("/login",passport.authenticate("local",{
	successRedirect:"/campgrounds",
	failureRedirect:"/login"
}), function(req,res){

});


// Logout route

router.get("/logout",function(req,res){
	req.logout();
	req.flash("success", "You are logged out !!");
		// flash statement must be written before redirection
		/* It's so, coz it provvides us facility to configure it ,
		before it is executed on the redirected page, in the associated
		ejs template*/
	res.redirect("/campgrounds");
});





module.exports = router;