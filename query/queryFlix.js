/**
 * Created by alecg on 3/29/2016.
 */
/**
 * * old
 * Created by alecg on 3/1/16.
 */

var similarity = require('similarity');
var hG = require('../misc/httpGet');
var jsdom = require('jsdom');
var jQ = "http://code.jquery.com/jquery.js";


function replaceDouble(inp){
	return inp.split('"').join("'");
}

function queryFlix(title, cb){
	var tTitle = replaceDouble(title);
	console.log(tTitle);
    jsdom.env({
        url: "https://flixsearch.io/search/"+ tTitle,
        scripts: jQ,
        done: function(e,w){
            if (e) {
                console.dir(e);
                return cb(e,null);
            } else {
                var $ = w.$;
                var itemCount = 0;
				var tThing = $('a[title="'+tTitle+'"]');
				//var tThing = $("a[title='"+title+"']");
				//var tThing2 = tThing.parent().find('.card-footer').find('.flag').find('img');
				var tThing3 = tThing.parent().find('.card-footer').find('i').attr('data-original-title');
                var tURL = tThing.attr('href');
				//var tCountries = [];
				
				
                if (typeof tURL !== 'undefined') {
					jsdom.env({
						url: tURL,
						scripts: jQ,
						done: function(ee,ww){
							if (ee){
								console.dir(ee);
								return cb(ee, null);
							} else {
								var $$ = ww.$;
								var tCountries = '';

								$$(".details").find("tr").each(function(){
									$$(this).find(".col-xs-7").each(function(){
										if ($$(this).text() !== "Country") {
											tCountries += $$(this).text() + " ";
										}
									})});
								/* old way to get country 5/22/16
								$$('.c-select').find('option').each(function(){
									tCountries += $$(this).text() + " ";
								});
								
								*/
								
								var res = {
									result: true,
									tURL: tURL,
									countries: tCountries
								};
								
								//console.dir(tCountries);
								return cb(null, res);
							}
						}
					})
                    
                } else {
                    var res = {
                        result: false
                    };
                    return cb(null, res);
                }
            }
        }
    })
}

exports.queryFlix = queryFlix;