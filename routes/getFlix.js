/**
 * Created by alecg on 3/29/2016.
 */
var qF = require('../query/queryFlix');

var express = require('express');
var router = express.Router();

router.post('/', function(req,res,next){
    var theQuery = req.param('query');
    if (theQuery){
        qF.queryFlix(theQuery, function(e,d){
            if (!e){
                res.render('queryFlix', {rez: d});
            } else {
                console.dir(e);
                res.send('Error searching netflix.');
            }
        });
    }
});

module.exports = router;