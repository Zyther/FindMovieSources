var hG = require('../misc/httpGet');

function queryMobileInstant(input, cb){


    // http://api.themoviedb.org/3/search/multi?api_key=redacted&query=oceans%2011


    var theInput = input.split(' ').join('+'),
        baseURL = "api.themoviedb.org",
        baseInput = "/3/search/multi?api_key=redacted&query="+theInput;
    hG.httpGet(baseURL, baseInput, function(e,d){
        if (!e){
            return cb(null, d);
        } else {return cb(e, null);}
    })

}


exports.queryMobileInstant = queryMobileInstant;