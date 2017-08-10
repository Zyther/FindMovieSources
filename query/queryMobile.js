    /**
 * Created by alecg on 2/10/16.
 */
var hG = require('../misc/httpGet.js');

//Remove sleep, will not compile on Windoze
// var sleep = require('sleep');

// https://api.themoviedb.org/3/search/tv?api_key=redacted&query=we+be+bears


var theHost = 'api-public.guidebox.com',
    thePathShow = '/v1.43/US/redacted/search/id/imdb/',
    sourcePathShow = '/v1.43/US/redacted/show/',
    sourcePathMovie = '/v1.43/US/redacted/movie/',
    thePathMovie = '/v1.43/US/redacted/search/movie/id/imdb/';

function queryMobileID(type, id, cb){
    if (type == 1) {
        hG.httpGet(theHost,thePathShow + id, function (e,d){
            if (!e){
                return cb(null, d);
            } else {
                return cb(e, null);
            }
        });
    } else if (type == 2) {
        hG.httpGet(theHost, thePathMovie + id, function(e,d){
            if (!e){
                return cb(null, d);
            } else {
                return cb(e,null);
            }
        });
    }
}
function queryMobile(type, id, cb){
    if (type == "series"){
        queryMobileID(1, id, function(e,d){
            if (!e){
                hG.httpGet(theHost, sourcePathShow + d.id + "/available_content", function(ee,dd){
                    if (!ee){
                        return cb(null, dd);
                    } else {
                        return cb(ee, null);
                    }
                })

            } else {
                return cb(e, null);
            }
        })
    } else if (type == "movie"){
        queryMobileID(2, id, function(e,d){
            if (!e){
                hG.httpGet(theHost, sourcePathMovie + d.id, function(ee,dd){
                    if (!ee){
                        return cb(null, dd);
                    } else {
                        console.dir(ee);
                        return cb(ee, null);
                    }
                })
            } else {
                console.dir(e);
                return cb(e, null);
            }
        })
    }
}
exports.queryMobile = queryMobile;