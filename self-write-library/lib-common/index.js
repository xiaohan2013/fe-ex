var fs = require('fs');
var path = require('path');
var package = require('./package.json');


var _version = package.version;

exports.name = "lib-common";

function LibCommon(){
    console.log("abcd");
}
module.exports = require('./src');


console.log(_version)

console.log(module)
console.log(exports)
console.log(module.exports)

