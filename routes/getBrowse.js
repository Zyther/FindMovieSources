/**
 * Created by alecg on 2/10/2017.
 */
var express = require("express");
var router = express.Router();
var qB = require("../query/queryBrowse"),
    offload = require("../misc/offloadEvent");

router.post("/", function(req,res,next){

    qB.queryBrowse(req.body, function(e,d){
        if (e) return next(e);

        // TODO offload browse query somewhere
        //offload.offloadBrowse(d);
        offload.offload({
            q: req.body,
            d: d
        });
        
        res.setHeader('Content-Type', 'application/json');
        res.json(d);
    });
});

module.exports = router;