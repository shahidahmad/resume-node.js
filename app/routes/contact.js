var express = require('express');
var router = express.Router();
var mysql = require('mysql');

router.get('/contact', function(req, res){
    res.render('contact', {
        pageTitle: 'Contact me',
        pageId: 'contact'
    });
});

module.exports = router;