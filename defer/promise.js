//
// Promise
//
// https://git.oschina.net/linyupark/hardcore2/blob/master/modules/promise.js

;(function(window, undefined){

    var Promise = function(){}
    Promise.all = function(iterable) {}
    Promise.resolve = function(v) {}
    Promise.reject = function(v) {}
    Promise.reject = function(v) {}
    Promise.prototype.then = function(cb, _catch) {}
    Promise.prototype.catch = function(cb) {}

    if (typeof exports === 'object')
        module.exports = Promise;
    else if( typeof define === 'function' && define.amd)
        define(function() { return Promise })
    else 
        window.Promise = Promise;

})(typeof window != 'undefined' ? window : undefined)