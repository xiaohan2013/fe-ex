/**
    语言增强功能
*/

var hasOwnProperty = Object.prototype.hasOwnProperty;

function inherit(child, parent){

}

function extend( o1, o2 ){

    for( var i in o2 ) {
        hasOwnProperty.call(o2, i) && ( o1[i] = o2[i])
    }

    return o1;
}

Array.prototype.inArray || Array.prototype.inArray = function(){

}
Array.prototype.isArray || Array.prototype.isArray = function(){
    return Object.prototype.toString.call(obj) === '[object Array]';
}






