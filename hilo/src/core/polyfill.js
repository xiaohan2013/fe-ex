/**
 * Hilo 1.0.0 for standalone
 * Copyright 2015 alibaba.com
 * Licensed under the MIT License
 */
(function(window){
/**
 * Hilo
 * Copyright 2015 alibaba.com
 * Licensed under the MIT License
 */
//polyfiil for window.console.log
window.console = window.console||{log:function(){}};
    
var arrayProto = Array.prototype,
    slice = arrayProto.slice;

//polyfiil for Array.prototype.indexOf
arrayProto.indexOf = arrayProto.indexOf || function(elem, fromIndex){
    fromIndex = fromIndex || 0;
    var len = this.length, i;
    if(len == 0 || fromIndex >= len) return -1;
    if(fromIndex < 0) fromIndex = len + fromIndex;
    for(i = fromIndex; i < len; i++){
        if(this[i] === elem) return i;
    }
    return -1;
};

var fnProto = Function.prototype;

//polyfill for Function.prototype.bind
fnProto.bind = fnProto.bind || function(thisArg){
    var target = this,
        boundArgs = slice.call(arguments, 1),
        F = function(){};

    function bound(){
        var args = boundArgs.concat(slice.call(arguments));
        return target.apply(this instanceof bound ? this : thisArg, args);
    }

    F.prototype = target.prototype;
    bound.prototype = new F();

    return bound;
};
})(window);


//polyfill for requestAnimationFrame  cancelAnimationFrame
(function(window){
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }
    if (!window.requestAnimationFrame){
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    };
    if (!window.cancelAnimationFrame){
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    };
})(window);


//color transform to {r:Number, g:Number, b:Number}
(function(window){
var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
String.prototype.toColorRgb = function(){
    var sColor = this.toLowerCase();
    if(sColor && reg.test(sColor)){
        if(sColor.length === 4){
            return {
                r:parseInt("0x"+sColor.charAt(1)+sColor.charAt(1)),
                g:parseInt("0x"+sColor.charAt(2)+sColor.charAt(2)),
                b:parseInt("0x"+sColor.charAt(3)+sColor.charAt(3))
            };
        }else{
            return {
                r:parseInt("0x"+sColor.slice(1,3)),
                g:parseInt("0x"+sColor.slice(3,5)),
                b:parseInt("0x"+sColor.slice(5,7))
            };
        }
    }else{
        return {r:0,g:0,b:0};   
    }
};
})(window);