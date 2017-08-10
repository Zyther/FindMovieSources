/**
 * Created by alecg on 2/26/16.
 */
var express = require('express');
var router = express.Router();
var qN = require('../query/queryNetflix');

/* GET home page. */
router.post('/', function(req, res, next) {
    var theQuery = req.param('query');
    if (theQuery) {

        qN.queryNetflix(theQuery, function(e,d){
            if (e) {res.send(e)} else {
                if (d.title === null){
                    res.send('No results');
                } else {
                    res.render("resultNetflix", {rez: d});
                }
            }
        });
    } else {
        res.send('You idiot.');
    }

});

module.exports = router;