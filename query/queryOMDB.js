/**
 * Created by alecg on 2/26/16.
 */

var hG = require('../misc/httpGet');

function queryOMDB(input, cb){

    var theInput = input.split(' ').join('+'),
        baseURL = "www.omdbapi.com",
        baseInput = "/?s=" + theInput + "&plot=full&r=json";
        hG.httpGet(baseURL, baseInput, function(e,d){
            if (!e){
                return cb(null, d);
            } else {return cb(e, null);}
        })

}


exports.queryOMDB = queryOMDB;