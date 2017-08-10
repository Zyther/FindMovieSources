// never finished

var request = require("request");

theURL = "redacted";


function offloadService(d){
    //console.dir(d);
    request.post({
        url: theURL,
        body: JSON.stringify(d)
    }, function(e,r,b){
        if (e) console.error(e);
        console.log('statusCode:', r && r.statusCode); // Print the response status code if a response was received 
        console.dir(b);
        return null;
    });

}



module.exports = {
    offloadService: offloadService
}