/**
 * Created by alecg on 2/10/16.
 */
var http = require('http');

var theHost = 'api.themoviedb.org',
    thePath = '/3/search/tv',
    thePathM = '/3/search/movie',
    theAPI = 'redacted';



function getMovie(input, cb){
    var     theQuery = input.split(' ').join('+'),
            theFullPath = thePathM + '?api_key=' + theAPI + '&query=' + theQuery;
    var theGet = http.get({
        host: theHost,
        path: theFullPath
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
                console.error('Cannot parse result json', er);
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


function getTV(input, cb){
    if (input.length < 3) {
        return cb('Enter more than two characters', null);
    }

    var     theQuery = input.split(' ').join('+'),
            theFullPath = thePath + '?api_key=' + theAPI + '&query=' + theQuery;


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
                console.error('Cannot parse result json', er);
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

function getTVMovie(input, cb){
    getMovie(input, function(e,r){
        if(!e){
            var movieRes = r;
            getTV(input, function(ee,rr){
                if(!ee){
                    var tvRes = rr;
                    return cb(null, {tv: tvRes.results, mv: movieRes.results});

                } else {
                    console.error('Error @ getTV', ee);
                    return cb('ERRoR!', null);
                }
            })
        } else {return cb('ERROR!',null);}
    });
}

exports.getTVMovie = getTVMovie;