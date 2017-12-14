var fs = require('fs');
var path = require('path');
var webpack = require('webpack');

// console.log(webpack({}))

function LibCommon(options){
    var _opt = options || {};
    this.name = options.name;

}

LibCommon.prototype.version = "1.0.0";

LibCommon.prototype.get_name = function(){
    return this.name;
}


module.exports = LibCommon;
