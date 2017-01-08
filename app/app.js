var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var http = require('http');


var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('contact');


var urlencodedParser = bodyParser.urlencoded({extended: false});
var nodemailer = require('nodemailer');


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


	var transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user: 'shahidahmads1@gmail.com',
			pass: process.env.PASS
		}
	});
	var text = "Hi " + req.body.first_name + ",\n\nYour message: \n\n\""  + req.body.textarea1 + "\"\n\n has been recieved.\nI will get back to you as soon as I can. \n\nregards,\nShahid Khan";

	var mailOptions = {
		from: 'shahidahmads1@gmail.com',
		to: req.body.email + '; shahidahmads1@gmail.com',
		subject: 'Thank you for contacting me!',
		text: text
	};

	transporter.sendMail(mailOptions, function(error, info){
		if(error){
			console.log(error);
		} else {
			console.log('Sending mail to ' + req.body.email + '; shahidahmads1@gmail.com');
			console.log('Message sent: ' + info.response);
		} 
	});

	
	console.log("redirecting..");
	

	console.log("redirecting...");

	return res.redirect('/thankyou');

});

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', 'app/views');

app.locals.siteTitle = 'Shahid Khan';

app.use(express.static('app/public'));
app.use(require('./routes/index'));
app.use(require('./routes/contact'));
app.use(require('./routes/thankyou'));


var server = app.listen(
	app.get('port'), function(){
    console.log('Listening on port ' + app.get('port'));
});






