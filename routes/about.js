/**
 * Created by alecg on 3/7/2016.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log('OldAboutGet: ' + req.ip);
    res.redirect("/#!/about");
    //res.render('about', { title: 'FindThatMovie' });
});

module.exports = router;
