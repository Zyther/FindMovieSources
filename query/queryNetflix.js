/**
 * Created by alecg on 3/1/16.
 */

var similarity = require('similarity');
var hG = require('../misc/httpGet');
var jsdom = require('jsdom');
var jQ = "http://code.jquery.com/jquery.js";

//var theQuery = "criminal minds";
function queryNetflix(title, cb) {
    var tQuery = title.split(' ').join("+");
    jsdom.env({
        url: "http://dvd.netflix.com/Search?search_submit=&oq=&ac_posn=&v1=" + tQuery,
        scripts: jQ,
        done: function (e, w) {
            if (e) {
                console.dir(e);
                return cb(e,null);
            } else {
                var $ = w.$;
                var itemCount = 0;
                $(".metaContainer").each(function () {

                    if (itemCount === 0) {
                        var theTitle = $(this).find(".title").text();
                        var theURL = $(this).find("a").attr('href');
                        var tSimilarity = similarity(title, theTitle);
                        jsdom.env({
                            url: theURL,
                            scripts: jQ,
                            done: function (ee, ww) {
                                if (ee) {
                                    console.dir(ee);
                                    return cb(ee, null);
                                } else {
                                    var $$ = ww.$;
                                    var tCount = 0;
                                    $$(".availFormats").each(function () {
                                        if (tCount === 0) {
                                            tCount++;
                                            var result = {
                                                "title" : theTitle,
                                                "url"   : theURL,
                                                "sim"   : tSimilarity,
                                                "format": $$(this).text()
                                            };
                                            return cb(null, result);
                                        }

                                    });
                                    if (tCount === 0) {
                                        var tFormat = $$("#mdp-details > div:nth-child(2) > div:nth-child(5) > dl > dd").text().split(" ").join("").split("and").join(" "),
                                            tFormat2 = $$("#mdp-details > div:nth-child(2) > div:nth-child(4) > dl > dd").text().split(" ").join("").split("and").join(" "),
                                            tFormat3 = $$("#mdp-details > div:nth-child(2) > div:nth-child(6) > dl > dd").text().split(" ").join("").split("and").join(" ");

                                        if (tFormat.search("DVD") < 0 && tFormat.search("treaming") < 0) {
                                            //pass
                                            //console.log('lol');
                                            if (tFormat2.search("DVD") < 0 && tFormat2.search("treaming") < 0) {
                                                // console.log("not here either");
                                                if (tFormat3.search("DVD") < 0 && tFormat3.search("treaming") < 0) {
                                                    console.log("still not here.");
                                                } else {
                                                    tFormat = tFormat3;
                                                }
                                            } else {
                                                tFormat = tFormat2;
                                            }
                                        }

                                        var someText = tFormat.replace(/(\r\n|\n|\r)/gm, "");

                                        var result = {
                                            "title" : theTitle,
                                            "url"   : theURL,
                                            "sim"   : tSimilarity,
                                            "format": someText
                                        };


                                        return cb(null, result);
                                    }
                                }
                            }
                        });
                        itemCount++;
                    }

                    //theCounter++;

                });
            }
        }
    });
}
exports.queryNetflix = queryNetflix;