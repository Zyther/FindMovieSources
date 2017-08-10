/**
 *
 */

var E = require("./offloadEvent");
var O = require("./offloadService");
E.onOffload(function(d){
  console.log("i got data.");
  console.dir(d);
  //O.offloadService(d);
});