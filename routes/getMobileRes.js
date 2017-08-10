/**
 * Created by alecg on 2/11/16.
 */

var express = require('express');
var router = express.Router();

var qM = require('../query/queryMobile.js');

router.post('/', function(req, res, next) {
    var theID = req.param('id'),
        tvmov = req.param('tvmov');
    console.log(tvmov + theID);
    if (theID){
        var theThing = {
            id: theID,
            tm: tvmov
        };
        if (tvmov) {
            //res.send(JSON.stringify(theThing));
            if (tvmov == "series"){
                qM.queryMobile(tvmov, theID, function(e,d){
                    res.render('resultMobile', {rez: d});
                })
                //res.send("its a series");

            } else if (tvmov == "movie"){
                qM.queryMobile(tvmov, theID, function(e,d){
                    if (!e){
                        res.render('resultMobile2', {rez:d});
                    } else {
                        res.send('Error. Sorry!');
                    }
                })

            } else {
                res.send('No TvMov.');
            }


            /*

            qG.getGuide(tvmov, theID, function (er,data){
                if (!er) {
                    // console.dir(data);
                    res.render('resultMobile', {rez: data});
                } else {
                    console.error('error!', er);
                    res.send('error. sorry, lol: ' + er);
                }
            })
            */

        } else {
            res.send('no tvmov');
        }

    } else {
        res.send('no ID');
    }
});

module.exports = router;
