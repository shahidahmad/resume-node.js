var express = require('express');
var app = express();
var reload = require('reload');
var bodyParser = require('body-parser');
var mysql = require('mysql');

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
			pass: 'BIG-NO-NOO'
		}
	});
	var text = "hello Shahid";

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

});

app.set('port', process.env.PORT);
app.set('view engine', 'ejs');
app.set('views', 'app/views');

app.locals.siteTitle = 'Shahid Khan';

app.use(express.static('app/public'));
app.use(require('./routes/index'));
app.use(require('./routes/contact'));
app.use(require('./routes/about'));
app.use(require('./routes/resume'));

var server = app.listen(app.get('port'), function(){
    console.log('Listening on port ' + app.get('port'));
});

reload(server, app);