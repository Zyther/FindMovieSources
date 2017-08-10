/**
 * Created by alecg on 3/1/2017.
 * Guidebox has a new API. Let's use it with the new Angular site.
 */


var request = require("request"),
    apikey      = "redacted";

function getSourceList(){
    var options = { method: 'GET',
        url: 'http://api-public.guidebox.com/v2/sources',
        qs:
        { api_key: apikey },
        body: '{}' };


    request(options, function (error, response, body) {
        if (error) {
            console.error(error);
        }
        else {

            console.dir(JSON.parse(body));
        }

    });
}

getSourceList();