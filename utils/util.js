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