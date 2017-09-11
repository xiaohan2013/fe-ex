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