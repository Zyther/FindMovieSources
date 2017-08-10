/*
-- httpGet.js
-- Alec Ghazarian

-- Simply put, a generic httpGetter

 */
var http = require('http');

function httpGet(theHost, theFullPath, cb){
    var theGet = http.get({
        host: theHost,
        path: theFullPath,
    }, function(res){
        res.setEncoding('utf8');

        var body = '';
        res.on('data', function(tD){
            body += tD;
        });
        res.on('end', function(){
            try {
                var parsedJSON = JSON.parse(body);
            } catch (er) {
                console.error('Cannot parse result json', er, body);
                return cb('ERROR! ' + er, null);
            }
            return cb(null, parsedJSON);
        });
    });
    theGet.on('error', function(err){
        console.error('HTTPERROR', err);
        return cb('ERROR! ' + err, null);
    });
}
exports.httpGet = httpGet;