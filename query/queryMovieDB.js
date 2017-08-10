var mdb = require('moviedb')('redacted');

function queryMovieDB(inp, cb){

    mdb.searchMovie({query: inp}, function(e, r){
        if (!e) {
            return cb(null, r);
        } else {
            return cb(e, null);
        }
    })

}

exports.queryMovieDB = queryMovieDB;