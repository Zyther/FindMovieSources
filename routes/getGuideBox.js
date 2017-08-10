/**
 * Created by alecg on 2/11/16.
 */

var express = require('express');
var router = express.Router();

var qG = require('../query/queryGuide.js');


router.post('/', function(req, res, next) {
    var theID = req.param('id'),
        tvmov = req.param('tvmov');
    console.log(tvmov + theID);
    if (theID){
        if (tvmov) {
            qG.getGuide(tvmov, theID, function (er,data){
                if (!er) {
                    // console.dir(data);
                    res.render('resultGuide', {rez: data});
                } else {
                    console.error('error!', er);
                    res.send('error. sorry, lol: ' + er);
                }
            })
        } else {
            res.send('no tvmov');
        }

    } else {
        res.send('no ID');
    }
});

module.exports = router;
