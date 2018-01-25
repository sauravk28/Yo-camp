// Attaching express and important needed dependencies
var express 				= require('express'),
	app 					= express(),
	bodyParser  			= require("body-parser"),
	mongoose 				= require("mongoose"),
	flash	 				= require("connect-flash"),
	passport 				= require("passport"),
	localStrategy 			= require("passport-local"),
	session		  		  	= require("express-session"),
	passportLocalMongoose 	= require("passport-local-mongoose"),
	User 				  	= require("./modules/user"),
	Comments  				= require("./modules/comments"),
	Campground 				= require("./modules/campgrounds"),
	methodOverride 			= require("method-override"),
	middleware 				= require("./middleware"),
	modernizr				= require("modernizr"),
	seedDB   				= require("./seeds.js");




//Requiring routes

var campgroundRoutes 	= require("./routes/campground.js"),
	commentsRoutes 		= require("./routes/comments.js"),
	indexRoutes 		= require("./routes/index.js");



// Using some required dependencies


app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
mongoose.connect('mongodb://localhost/camp_database_auth' , {useMongoClient:true});
mongoose.Promise	= global.Promise;
app.use(methodOverride("_method"));
app.use(express.static("public"));
app.use(flash());
// flash is used for the flash messages,flash should be required before passport
// executing the database functions and methods	
// seedDB();


// Passport Confing.

/* express-sessions are used in order to maintain a seesion,
so credentials are not sent everytime with requests*/


app.use(session({
	secret: "I won't tell",
	resave: false,
	saveUninitialized:false

}));

app.use(passport.initialize());
app.use(passport.session());
/* These two have to be used in order to initialize passport and
express-sessions*/

passport.use(new localStrategy(User.authenticate()));

/* Theese play a part in coding and decoding the session information*/
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


/* This will supply variable acess to all the templates*/
app.use(function(req,res,next){
	res.locals.currentUser = req.user;
	res.locals.error 	   = req.flash("error");
	res.locals.success 	   = req.flash("success");
	next();

});


/* Making a call for the routes(REMEMBER: This should be kept at end)
   so that various req. are met before these are called*/
app.use(campgroundRoutes);
app.use(commentsRoutes);
app.use(indexRoutes);



//Creating listner

app.listen(3000, function(){
   console.log("Server is running");
});
