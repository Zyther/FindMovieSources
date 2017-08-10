/**
 * Created by alecg on 2/28/2017.
 */
var ua = require("universal-analytics");

module.exports = {
    errorReport: function(ip, status, url, message) {
        var visitor = ua("redacted");
        visitor.event("error", "servererr",
            url + " " + message + " " + ip + " " + status).send();
    }
};