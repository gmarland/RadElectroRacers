// Load npm modules
	
	var express = require("express"),
		path = require("path");

// Load config 

	global.config = require(path.join(__dirname, "package.json")).config;
	
// Instantiate Express

	var app = express();
	
// Configure Express		

	// app
  	app.use("/js", express.static(__dirname + "/app/js"));
  	app.use("/partials", express.static(__dirname + "/app/partials"));
  	
	// static resources that don't need compiling
	app.use("/libs", express.static(__dirname + "/assets/libs"));
	app.use("/img", express.static(__dirname + "/assets/img"));	
	app.use("/styles", express.static(__dirname + "/assets/styles"));
	app.use("/sounds", express.static(__dirname + "/assets/sounds"));
	app.use("/fonts", express.static(__dirname + "/assets/fonts"));

// Create the http server
	
	var http = require("http").createServer(app).listen(8080);

// Removing www from URL routes

	app.get("/*", function(req, res, next) {
		if (req.headers.host.match(/^www\./) != null) res.redirect("http://" + req.headers.host.slice(4) + req.url, 301);
		else next();
	});

	app.get('/', function(req,res) { res.sendFile(path.join(__dirname, "/views/index.html")); });