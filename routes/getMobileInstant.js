//getMobileInstant.js


var express = require('express');
var router = express.Router();

var qMI = require('../query/queryMobileInstant');


/* GET home page. */
router.post('/', function(req, res, next) {
    var theQuery = req.param('query');
    if (theQuery) {

        qMI.queryMobileInstant(theQuery, function(e,d){
            if (e) {
                console.error(e);
                res.send(e);
            } else {
                res.setHeader('Content-Type', 'application/json');
                res.json(d);
//                res.render('mobileInstant', {rez:d});
            }
        });
    } else {
        res.send('You idiot.');
    }

});

module.exports = router;