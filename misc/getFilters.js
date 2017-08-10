/**
 * Created by alecg on 2/9/2017.
 */

var hG = require("./httpGet");
function getFilters(cb){
    hG.httpGet("api.themoviedb.org","/3/genre/tv/list?api_key=redacted&language=en-US", function(e,d){
        if (e) return cb (e, null);
        return cb (null,d);
    });
}

getFilters(function(e,d){
    if (e) console.error(e);
    console.dir(d);
});