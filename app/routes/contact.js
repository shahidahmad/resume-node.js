var express = require('express');
var router = express.Router();
var mysql = require('mysql');



// var mysql = require('mysql');


// var connection = mysql.createConnection({
// 	host: 'localhost',
// 	user: 'root', 
// 	password: 'hello', 
// 	database: 'sample'
// });

// connection.connect(function(error){
// 	if(error){
// 		console.log("Error connecting to database");
// 	} else {
// 		console.log("Successfully connected to database!!");
// 	}
// });

// router.post('/contact', function(req, res){
	// console.log(req.body.first_name);
	// console.log(req.body.last_name);
	// console.log(req.body.phone);
	// console.log(req.body.email);
	// console.log(req.body.textarea1);

// });

router.get('/contact', function(req, res){
    res.render('contact', {
        'pageTitle': 'Contact me',
        'pageId': 'contact'
    });

    // res.query();
});



// var connection = mysql.createConnection({
// 	host: 'localhost',
// 	user: 'root', 
// 	password: 'hello', 
// 	database: 'sample'
// });

// connection.connect(function(error){
// 	if(error){
// 		console.log("Error connecting to database");
// 	} else {
// 		console.log("Successfully connected to database!!");
// 	}
// });


module.exports = router;