/**
 * Created by alecg on 2/10/2017.
 */

var request = require("request");
var async = require("async");

var getGenre = require("../misc/getGenre");

function queryBrowse(args, cb){
    //console.dir(args);
    var optionsTV = { method: 'GET',
        url: 'https://api.themoviedb.org/3/discover/tv',
        qs:
        { page: '1',
            include_video: 'false',
            include_adult: 'false',
            sort_by: 'popularity.desc',
            language: 'en-US',
            api_key: 'redacted' },
        body: '{}' };

    var optionsMovie = { method: 'GET',
        url: 'https://api.themoviedb.org/3/discover/movie',
        qs:
        { page: '1',
            include_video: 'false',
            include_adult: 'false',
            sort_by: 'popularity.desc',
            language: 'en-US',
            api_key: 'redacted' },
        body: '{}' };

    var searchTV = false;
    var searchMV = false;
    var tvGenres = [];
    var mvGenres = [];

    //console.dir(args);

    async.waterfall([
        function(callback) {
            if (args){
                switch (typeof(args.types)) {
                    case "object":
                        if (args.types !== null) {
                            var tTypes = 0;
                            args.types.forEach(function(types, idx){
                                if (types === "tv"){
                                    searchTV = true;
                                    tTypes++;
                                } else if (types === "mv"){
                                    searchMV = true;
                                    tTypes++;
                                }
                                if (idx + 1 === args.types.length){
                                    if (tTypes === 2 && searchTV === true && searchMV === true){
                                        callback(null);
                                    } else {
                                        callback(new Error("cannot parse types"));
                                    }
                                }
                            });

                        }
                        break;
                    case "string":
                        if (args.types === "tv"){
                            searchTV = true;
                            callback(null);
                            break;
                        } else if (args.types === "mv"){
                            searchMV = true;
                            callback(null);
                            break;
                        } else {
                            callback(new Error("cannot parse types"));
                            break;
                        }
                    case "undefined":
                        callback(new Error("no types"));
                        break;
                }

            } else { callback(new Error("no args.")) }
        },
        function(callback){
            if (args.genres !== null && typeof(args.genres) !== "undefined"){
                console.log(args.genres);
                callback(null,true);
            } else {
                callback(null, false);
            }
        }, function(genreFlag, callback){
            if (genreFlag === true){
                var tGenres = args.genres;
                if (tGenres !== null){
                    tGenres.forEach(function(genre, idx){
                        var ttGenre = parseInt(genre);
                        getGenre.getGenre("mv", ttGenre, function(d){
                            if (typeof(d) === "object" && d.length > 1){
                                d.forEach(function(dd){
                                    tvGenres.push(dd);
                                });
                            } else { tvGenres.push(d[0]); }
                        });
                    });
                    setTimeout(function(){callback(null, true)}, 100);
                }
            } else { callback(null, false); }

        }, function(genreFlag, callback){
            if (genreFlag === true){
                var tGenres = args.genres;
                if (tGenres !== null){
                    tGenres.forEach(function(genre, idx){
                        var ttGenre = parseInt(genre);
                        getGenre.getGenre("mv", ttGenre, function(d){
                            if (typeof(d) === "object" && d.length > 1){
                                d.forEach(function(dd){
                                    mvGenres.push(dd);
                                });
                            } else { mvGenres.push(d[0]); }
                        });
                    });
                    setTimeout(function(){callback(null, true)}, 100);
                }
            } else { callback(null, false); }

        },
        function(genreFlag, callback){
            if (genreFlag === true){
                if (searchTV === true){
                    optionsTV.qs.with_genres = tvGenres.join(',');
                }
                if (searchMV === true){
                    optionsMovie.qs.with_genres = mvGenres.join(',');
                }
                callback(null);

            } else {
                callback(null);
            }

        },
        function(callback){
            if (args){

                switch (parseInt(args.order)) {
                    case 1:
                        optionsTV.qs.sort_by = "popularity.desc";
                        optionsMovie.qs.sort_by = "popularity.desc";
                        callback(null);
                        break;
                    case 2:
                        optionsTV.qs.sort_by = "popularity.asc";
                        optionsMovie.qs.sort_by = "popularity.asc";
                        callback(null);
                        break;
                    case 3:
                        optionsTV.qs.sort_by = "vote_average.desc";
                        optionsMovie.qs.sort_by = "vote_average.desc";
                        callback(null);
                        break;
                    case 4:
                        optionsTV.qs.sort_by = "vote_average.asc";
                        optionsMovie.qs.sort_by = "vote_average.asc";
                        callback(null);
                        break;
                    default:
                        callback(new Error("no order."));
                        break;
                }
            }

        },
        function(callback){
            if (searchTV === true){
                console.dir(optionsTV);
                request(optionsTV, function (error, response, body) {
                    if (error) { callback(error); }
                    else {
                        callback(null, body);
                    }
                });
            } else {
                callback(null, null);
            }

        }, function(tvData, callback){
            if (searchMV === true) {
                console.dir(optionsMovie);
                request(optionsMovie, function (error, response, body) {
                    if (error) {
                        callback(error);
                    }
                    else {
                        callback(null, tvData, body);
                    }

                });
            } else { callback(null, tvData, null) }
        }, function(tvData, mvData, callback){
            try {
                var tvD = JSON.parse(tvData);
                var mvD = JSON.parse(mvData);
            } catch (ex) {
                var tvmvEE = true;
                callback(ex);
            }
            if (!tvmvEE){
                callback(null, {
                    tv: tvD,
                    mv: mvD
                });
            }
        }
    ], function(e,r){
        if (e) {
            console.error(e);
            return cb(e);
        }
        else {
            //console.dir(r);
            return cb(null, r);
        }
    });
}
exports.queryBrowse = queryBrowse;
