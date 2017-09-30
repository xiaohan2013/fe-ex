function getQuery(){
    var match;
    var urlParams = {};
    var pl = /\+/g; // 把加号替换成空格
    var search = /([^&=]+)=?([^&]*)/g;

    var decode = function(s){
        return decodeURIComponent(s.replace(pl, ' '))
    }

    var query = decodeURI(window.location.search.substring(1));

    while( match = search.exec(query)) {
        urlParams[decode(match[1])] = decode(match[2])
    }

    return urlParams;
}


function encode_base64(input){
    var utf8Encode = require('utf8-encode');
    var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    var output = "";
    var chr1, chr2, chr3;
    var enc1, enc2, enc3, enc4;

    var i = 0;

    while( i < input.length) {
        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | ( chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;

        if(isNaN(chr2)) {
            enc3 = enc4 = 64;
        }else if(isNaN(chr3)) {
            enc4 = 64;
        }

        output = output + 
            keyStr.charAt(enc1) + keyStr.charAt(enc2) +
            keyStr.charAt(enc3) + keyStr.charAt(enc4);
    }

    return output;
}


function now(){
    return +new Date();
}


/*
    科里化：只传递给函数一部分参数来调用它，让它返回一个函数去处理剩下的参数。
    1. 参数复用；2. 提前返回；3. 延迟计算/运行。
*/
function curry(){
    if(arguments.length == 0) return;
    var args = arguments.slice(1);
    return function(){
        
    }

}


var _toString = Object.prototype.toString,
  _hasOwnProperty = Object.prototype.hasOwnProperty,
  NULL_TYPE = 'Null',
  UNDEFINED_TYPE = 'Undefined',
  BOOLEAN_TYPE = 'Boolean',
  NUMBER_TYPE = 'Number',
  STRING_TYPE = 'String',
  OBJECT_TYPE = 'Object',
  FUNCTION_CLASS = '[object Function]',
  BOOLEAN_CLASS = '[object Boolean]',
  NUMBER_CLASS = '[object Number]',
  STRING_CLASS = '[object String]',
  ARRAY_CLASS = '[object Array]',
  DATE_CLASS = '[object Date]';

function Type(o) {
    switch(o) {
      case null: return NULL_TYPE;
      case (void 0): return UNDEFINED_TYPE;
    }
    var type = typeof o;
    switch(type) {
      case 'boolean': return BOOLEAN_TYPE;
      case 'number':  return NUMBER_TYPE;
      case 'string':  return STRING_TYPE;
    }
    return OBJECT_TYPE;
}