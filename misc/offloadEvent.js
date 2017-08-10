var eEmiter = require("events").EventEmitter;
var e = new eEmiter();


module.exports = {
    offload: function(d){
        e.emit("offload", d);
    },
    onOffload: function(h){
        e.on("offload", h);
    }
}
