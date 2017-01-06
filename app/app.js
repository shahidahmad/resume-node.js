var express = require('express');
var app = express();
var reload = require('reload');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var http = require('http');


var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('contact');


var urlencodedParser = bodyParser.urlencoded({extended: false});
var nodemailer = require('nodemailer');

// var helper = require('sendgrid')('shahidahmads1@gmail.com', )


app.post('/contact', urlencodedParser, function(req, res){
	
	console.log(req.body.first_name);
	console.log(req.body.last_name);
	console.log(req.body.phone);
	console.log(req.body.email);
	console.log(req.body.textarea1);

	var contact_details = {
		name: req.body.first_name + ' ' + req.body.last_name,
		email: req.body.email,
		phone: req.body.phone,
		message: req.body.textarea1
	};

	db.serialize(function(){
		db.run("CREATE TABLE IF NOT EXISTS contact (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, phone TEXT, email TEXT, message TEXT)");

		var statement = db.prepare('INSERT INTO contact (name, email, phone, message) VALUES(?,?,?,?)');
		statement.run(req.body.first_name + ' ' + req.body.last_name, req.body.email, req.body.phone, req.body.textarea1);
		statement.finalize();
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

	// var query = connection.query('insert into contact set ?', contact_details, function(){
	// 	console.log(query.sql);
	// });

	// connection.end();

	var transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user: 'shahidahmads1@gmail.com',
			pass: process.env.PASS
		}
	});
	var text = req.body.textarea1;

	var mailOptions = {
		from: 'shahidahmads1@gmail.com',
		to: 'shahidahmads1@gmail.com',
		subject: 'Text email',
		text: text
	};

	transporter.sendMail(mailOptions, function(error, info){
		if(error){
			console.log(error);
		} else {
			console.log('Message sent: ' + info.response);
		} 
	});

	// $.(document).ready( function(){
	// 	window.location.href = "/thankyou";
	// });
	// res.redirect(307, "/thankyou");
	console.log("redirecting..");
	// res.json({"redirect":"http:www.google.com"});

	console.log("redirecting...");

	return res.redirect('/thankyou');

});

app.set('port', process.env.PORT | 3000);
app.set('view engine', 'ejs');
app.set('views', 'app/views');

app.locals.siteTitle = 'Shahid Khan';

app.use(express.static('app/public'));
app.use(require('./routes/index'));
app.use(require('./routes/contact'));
app.use(require('./routes/thankyou'));
// app.use(require('./routes/resume'));

var server = app.listen(app.get('port'), function(){
    console.log('Listening on port ' + app.get('port'));
});

// reload(server, app);




