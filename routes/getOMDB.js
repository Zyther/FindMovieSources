/**
 * Created by alecg on 2/26/16.
 */
var express = require('express');
var router = express.Router();
var qO = require('../query/queryOMDB');

/* GET home page. */
router.post('/', function(req, res, next) {
    var theQuery = req.param('query');
    if (theQuery) {

        qO.queryOMDB(theQuery, function (e, d) {
            if (e) {
                console.dir(e);
                res.send(e);
            } else {
                res.render('resultOMDB', {res: d});
            }
        });
    } else {
        res.send('You idiot.');
    }

});

module.exports = router;