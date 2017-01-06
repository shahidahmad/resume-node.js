var express = require('express');
var router = express.Router();

router.get('/thankyou', function(req, res){
   res.render('thankyou', {
       'pageTitle': 'Thank you',
       'pageId': 'thank'
   });
});

module.exports = router;