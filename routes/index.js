var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('HomepageGet: ' + req.ip);
  res.render('index', { title: 'FindThatMovie' });
});

module.exports = router;
