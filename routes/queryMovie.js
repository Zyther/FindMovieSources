var express = require('express');
var router = express.Router();
var qmDB = require('../query/queryMovieDB.js');
var tmDB = require('../query/queryIMDB.js');

/* GET home page. */
router.post('/', function(req, res, next) {
    var theQuery = req.param('query');
    if (theQuery){

        tmDB.getTVMovie(theQuery, function(e,d){
            if(e) {
                console.dir(e);
                res.send(e);
            } else {
                //console.dir(d);
                res.render('resultWeb', {res: d});
            }
        });
        /*
        qmDB.queryMovieDB(theQuery, function(e, d){
           if(e) {
               res.send(e);
           } else {
               res.render('resultWeb', {res: d});
           }
        });
        */

    } else {
        res.send('no query.');
    }
});

module.exports = router;
