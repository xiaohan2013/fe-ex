var page = require('webpage').create(),
    system = require('system'),
    t, address;

// if(system.args.length == 1){
//     console.log("URL====>");
//     phantom.exit();
// }


// t = Date.now();
// address = system.args[1];

// page.onResourceRequestd = function(request){
//     console.log('Request ' + JSON.stringify(request, undefined, 4));
// }

// page.onResourceReceived = function(response) {
//   console.log('Receive ' + JSON.stringify(response, undefined, 4));
// };

// page.open(address, function(status){
//     if(status != 'success'){
//         console.log("FAIL")
//     }else{
//         t = Date.now() - t;
//         console.log('Loading ' + system.args[1]);
//         console.log('Loading time ' + t + ' msec');
//     }
//     phantom.exit();
// })


var fibs = [0, 1];
var ticker = window.setInterval(function () {
    console.log(fibs[fibs.length - 1]);
    fibs.push(fibs[fibs.length - 1] + fibs[fibs.length - 2]);
    if (fibs.length > 10) {
        window.clearInterval(ticker);
        phantom.exit();
    }
}, 300);
