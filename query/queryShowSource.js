/**
 * Created by alecg on 2/13/16.
 */
var hG = require('../misc/httpGet');

function queryShowSource(tvID, cb){
    var theBaseURL = 'api-public.guidebox.com';
    var theParams = '/v1.43/US/redacted/show/' + tvID + '/available_content';
    // console.log(theParams);
    hG.httpGet(theBaseURL,theParams, function(e,d){
        if (e) { return cb(e, null); } else {
            return cb(null, d);
        }
    });
}

exports.queryShowSource = queryShowSource;