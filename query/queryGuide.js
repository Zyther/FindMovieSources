/**
 * Created by alecg on 2/10/16.
 */
var http = require('http');

//Remove sleep, will not compile on Windoze
// var sleep = require('sleep');



var theHost = 'api-public.guidebox.com',
    thePathShow = '/v1.43/US/redacted/search/id/themoviedb/',
    thePathMovie = '/v1.43/US/redacted/search/movie/id/themoviedb/';

function getGuideID(tvmovie, input, cb){

    if (tvmovie === 'tv') {
        var thePath = thePathShow + input;
    } else if (tvmovie === 'mv'){
        var thePath = thePathMovie + input;
    } else {
        return cb('Invalid type', null);
    }
    var theGet = http.get({
        host: theHost,
        path: thePath
    }, function(res){
        res.setEncoding('utf8');
        var body = '';
        res.on('data', function(tD){
            body += tD;
        });
        res.on('end', function(){
            try {
                var parsedJSON = JSON.parse(body);
                return cb(null, parsedJSON);
            } catch (er) {
                console.error('cant parse json', er);
                return cb('ERROR!', null);
            }
        });
    });
    theGet.on('error', function(e){
        console.error('ERROR: ', e);
        return cb('ERROR!!!', null);
    });
}

function getGuide(tvmov, id, cb){
    getGuideID(tvmov, id, function(e,d){
        if (e) { console.error('error', e); return cb('Error!', null); } else {
            // console.dir(d);
            if (JSON.stringify(d).length > 0) {
                //replacement for sleep
                setTimeout(function() {
                    if (tvmov === 'tv') {
                        var tURL = '/v1.43/US/redacted/show/' + d.id;
                    }
                    if (tvmov == 'mv') {
                        var tURL = '/v1.43/US/redacted/movie/' + d.id;
                    }
                    // console.log(tURL);
                    var qGet = http.get({
                        host: theHost,
                        path: tURL
                    }, function (res) {
                        res.setEncoding('utf8');
                        var body = '';
                        res.on('data', function (tD) {
                            body += tD;
                        });
                        res.on('end', function () {
                            try {
                                var parsedJSON = JSON.parse(body);
                                return cb(null, parsedJSON);
                            } catch (er) {
                                console.error('cant parse json', er);
                                return cb('ERROR!', null);
                            }
                        });
                    });
                    qGet.on('error', function (e) {
                        console.error('error on httpget 2', e);
                        return cb('Functional error.', null);
                    });
                    console.dir(tvmov + '-' + d.id);
                }, 1000);
            } else {
                return cb('Not Found. Sorry!');
            }


        }
    });
}


exports.getGuide = getGuide;