/* written by ZytherXYZ
www.zyther.xyz | www.findmoviesources.com
 */

angular.module('fms.services', [])

    .factory('Browse', function(){
        return {
            Browse: function (ht, args, cb) {
                //console.dir(args);
                ht({
                    method: "POST",
                    url: "/browse",
                    data: args
                }).then(function (r) {
                    var theItems = [];
                    var tCount = 0;
                    var tDone = 0;
                    if (r.data.tv !== null) {
                        if (r.data.tv.total_results !== 0) {
                            var theSearch = r.data.tv.results;
                            theSearch.forEach(function (i, dx) {
                                var tD = new Date();
                                var tU = tD.getTime();
                                var tLang = i.original_language;
                                var iGenres = [];
                                if (typeof(i.genre_ids !== "undefined")) {
                                    var tGenres = i.genre_ids;
                                    for (var ii in tGenres) {
                                        genres.forEach(function (genre) {
                                            if (genre.tvids.length > 0) {
                                                genre.tvids.forEach(function (tid) {
                                                    if (tGenres[ii] === tid) {
                                                        iGenres.push(genre.name);
                                                    }
                                                });
                                            }
                                        });
                                    }
                                    iGenres = iGenres.filter(function (iT, iD, iA) {
                                        return iA.indexOf(iT) == iD;
                                    });
                                }
                                var ttYear = 0;
                                var tYear = "N/A";
                                if (i.first_air_date !== null) {
                                    ttYear = i.first_air_date;
                                    tYear = "First Episode: " + ttYear;
                                }
                                var tType = "TV Show";
                                var tRating = "(0 reviews)";
                                var ttRating = 0;
                                if (i.vote_count > 0) {
                                    tRating = i.vote_average + "/10 (" + i.vote_count + " reviews)";
                                    ttRating = i.vote_average;
                                }
                                var tImg = "assets/img/film.png";
                                if (i.poster_path !== null) {
                                    tImg = "https://image.tmdb.org/t/p/w185" + i.poster_path;
                                }
                                var item = {
                                    title: i.name,
                                    year: ttYear,
                                    yeartext: tYear,
                                    type: tType,
                                    imdb: i.id,
                                    img: tImg,
                                    time: tU,
                                    link: true,
                                    lang: tLang,
                                    overview: i.overview,
                                    rating: ttRating,
                                    ratingtext: tRating,
                                    genres: iGenres,
                                    popularity: i.popularity
                                };
                                theItems.push(item);
                                tCount++;
                            });
                        }
                    }
                    if (r.data.mv !== null){
                    if (r.data.mv.total_results !== 0){
                        var mtheSearch = r.data.mv.results;
                        mtheSearch.forEach(function(i,dx){
                            var mD = new Date();
                            var mU = mD.getTime();
                            var mLang = i.original_language;
                            var iiGenres = [];
                            if (typeof(i.genre_ids !== "undefined")) {
                                var mGenres = i.genre_ids;
                                for (var ii in mGenres){
                                    genres.forEach(function(genre){
                                        if (genre.mvids.length > 0) {
                                            genre.mvids.forEach(function(mid){
                                                if (mGenres[ii] === mid) {
                                                        iiGenres.push(genre.name);
                                                    }
                                            });
                                        }
                                    });
                                }
                                iiGenres = iiGenres.filter(function(iT, iD, iA){
                                    return iA.indexOf(iT) == iD;
                                });
                            }
                            var mmYear = 0;
                            var mYear = "N/A";
                            if (i.release_date !== null) {
                                mmYear = i.release_date;
                                mYear = "Release Date: " + mmYear;
                            }
                            var mType = "Movie";
                            var mRating = "(0 reviews)";
                            var mmRating = 0;
                            if (i.vote_count > 0) {
                                mRating = i.vote_average + "/10 ("+i.vote_count+ " reviews)";
                                mmRating = i.vote_average;
                            }
                            var mImg = "assets/img/film.png";
                            if (i.poster_path !== null) {
                                mImg = "https://image.tmdb.org/t/p/w185" + i.poster_path;
                            }
                            var mitem = {
                                title: i.title,
                                otitle: i.original_title,
                                year: mmYear,
                                yeartext: mYear,
                                type: mType,
                                imdb: i.id,
                                img: mImg,
                                time: mU,
                                link: true,
                                lang: mLang,
                                overview: i.overview,
                                rating: mmRating,
                                ratingtext: mRating,
                                genres: iiGenres,
                                popularity: i.popularity
                            };
                            theItems.push(mitem);
                            tCount++;
                            if (dx+1 === mtheSearch.length){
                                tDone++;
                            }
                        });
                    }} else { tDone++; }

                    setTimeout(function() {
                        if (theItems.length > 0 ) {
                            return cb(theItems);
                        } else {
                            return cb(noResults);
                        }
                    }, 250);
                }, function(err){
                    console.error(err);
                    return cb(errorSearch);
                });
            }
        }
    })


    .factory('Search', function() {
        return {
            someItem: function() {
                return someItem;
            },
            Search: function(ht, query, cb) {
                var theSearchStr = query.replace(/[^a-zA-Z0-9\,.' ]/g, "");
                ht({
                    method: "POST",
                    url: "/gMI?query="+theSearchStr
                }).then(function(r) {
                    var theItems = [];
                    //console.dir(r);
                    if (r.data.total_results !== 0) {
                        var theSearch = r.data.results;
                        var tCount = 0;
                        theSearch.forEach(function(i) {
                            //console.dir(i);
                            var tD = new Date();
                            var tU = tD.getTime();
                            var tLang = i.original_language;
                            var iGenres = [];

                            if (typeof(i.genre_ids !== "undefined")) {
                                var tGenres = i.genre_ids;
                                for (var ii in tGenres) {
                                    genres.forEach(function(genre) {
                                        var tI = 0;
                                        if (genre.tvids.length > 0) {
                                            genre.tvids.forEach(function(tid){
                                                if (tGenres[ii] === tid && tI === 0){
                                                    if (!(genre.name in iGenres)) {
                                                        iGenres.push(genre.name);
                                                        tI++;
                                                    }
                                                }
                                            });
                                        }
                                        if (genre.mvids.length > 0 & tI === 0){
                                            genre.mvids.forEach(function(mid){
                                                if (tGenres[ii] === mid){
                                                    if (!(genre.name in iGenres)) {
                                                        iGenres.push(genre.name);
                                                        tI++;
                                                    }
                                                }
                                            });
                                        }
                                    });
                                }
                            }

                            if (i.media_type === "tv" || i.media_type === "movie") {
                                if (i.media_type === "tv"){
                                    if (i.first_air_date !== null) {
                                        var ttYear = i.first_air_date;
                                        var tYear = "First Episode: " + ttYear;
                                    } else {
                                        var tYear = "N/A";
                                    }
                                    var tType = "TV Show";
                                    var tTitle = i.name;
                                    var ttTitle = null;
                                } else {
                                    if (i.release_date !== null) {
                                        var ttYear = i.release_date;
                                        var tYear = "Release Date: " + ttYear;
                                    } else {
                                        var tYear = "N/A";
                                    }
                                    var tType = "Movie";
                                    var tTitle = i.title;
                                    var ttTitle = i.original_title;
                                }
                                if (i.vote_count > 0){
                                    var tRating = i.vote_average + "/10 ("+i.vote_count+ " reviews)";
                                } else {
                                    var tRating = "0/10 (0 Reviews)";
                                }
                                if (i.poster_path === null) {
                                    var item = {
                                        title: tTitle,
                                        otitle: ttTitle,
                                        yeartext: tYear,
                                        type: tType,
                                        imdb: i.id,
                                        img: 'assets/img/film.png',
                                        time: tU,
                                        link: true,
                                        lang: tLang,
                                        overview: i.overview,
                                        ratingtext: tRating,
                                        genres: iGenres
                                    };
                                } else {
                                    var tImg = "https://image.tmdb.org/t/p/w185" + i.poster_path;
                                    var item = {
                                        title: tTitle,
                                        otitle: ttTitle,
                                        yeartext: tYear,
                                        type: tType,
                                        imdb: i.id,
                                        img: tImg,
                                        time: tU,
                                        link: true,
                                        lang: tLang,
                                        overview: i.overview,
                                        ratingtext: tRating,
                                        genres: iGenres
                                    };
                                }
                                theItems.push(item);
                                tCount++;
                            }
                        });
                        if (tCount > 0) {
                            searchItems = theItems;
                            return cb(theItems);
                        } else {
                            return cb(noResults);
                        }

                    } else {
                        return cb(noResults);
                    }
                }, function (err){
                    console.dir(err);
                    //alert(JSON.stringify(err));
                    return cb(errorSearch);
                });
            }
        }
    })

    .factory('getSources', function() {
        return {
            guide: function (ht, tvmov, id, cb) {
                ht({
                    method: "POST",
                    url: "/gMT?tvmov=" + tvmov + "&id=" + id
                }).then(function s(r) {
                    //console.dir(r);
                    if (r.data.toString().replace(/(\s|\r|\n|\0|\t)/gmi, "") == "") {
                        var tt = {
                            data: "<b>No Sources Found </b>",
                            result: "false"
                        };
                        return cb(tt);
                    } else {
                        return cb(r);
                    }

                }, function e(r) {
                    console.dir(r);
                    return cb('error getting results');
                });
                //return cb(null);
            }
        }
    });

