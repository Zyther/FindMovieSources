/**
 * Created by alecg on 2/11/16.
 */

var express = require('express');
var router = express.Router();

var qSS = require('../query/queryShowSource.js');


router.post('/', function(req, res, next) {
    var theID = req.param('id');
    console.log(theID);
    if (theID){
        qSS.queryShowSource(theID, function(e,d){
            if (!e){
                res.render('resultGuideTV', {rez: d});
            } else {
                console.error('error:', e);
                res.send('err.');
            }
        });
    } else {
        res.send('no ID');
    }
});

module.exports = router;
