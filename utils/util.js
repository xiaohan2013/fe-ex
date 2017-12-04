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

    其本质是为了实现传多参数。

    闭包。
    lambda
    lambda演算
    在 lambda 演算中，每个表达式都代表一个只有单独参数的函数，这个函数的参数本身也是一个只有单一参数的函数，同时，函数的值又是一个只有单一参数的函数。函数是通过 lambda 表达式匿名地定义的，这个表达式说明了此函数将对其参数进行什么操作。

    high-order function(高阶函数)
    在无类型 lambda演算，所有函数都是高阶的；在有类型 lambda演算（大多数函数式编程语言都从中演化而来）中，高阶函数一般是那些函数型别包含多于一个箭头的函数。在函数式编程中，返回另一个函数的高阶函数被称为柯里化的函数。

    程序结构与生存周期

*/
function curry(){
    if(arguments.length == 0) return;
    var args = arguments.slice(1);
    return function(){
    }

}

// 将一个函数转换为科里的形式
var currier = function( fn ) {
  var args = Array.prototype.slice.call(arguments, 1);
  return function() {
    return fn.apply(this, args.concat(Array.prototype.slice.call(arguments, 0)))
  }
}

// var sequence = function(start, end){
//   var _res = [];
//   for(var i = 0; i <= end; i++) {
//     _res.push(i);
//   }
//   return _res;
// }

// var _seq5 = currier( sequence, 1 );
// _seq5(5) //[1,2,3,4,5]


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


__hasProp = {}.hasOwnProperty;
// 继承
__extends = function(child, parent) {
  for (var key in parent) {
    if (__hasProp.call(parent, key))
      child[key] = parent[key];
  }
  function ctor() { 
    this.constructor = child; 
  } 
  ctor.prototype = parent.prototype; 
  child.prototype = new ctor(); 
  child.__super__ = parent.prototype; 
  return child; 
};

// 继承的标准写法
Horse = (function(_super) {
  __extends(Horse, _super);

  function Horse() {
    return Horse.__super__.constructor.apply(this, arguments);
  }

  Horse.prototype.move = function() {
    alert("Galloping...");
    return Horse.__super__.move.call(this, 45);
  };

  return Horse;

})(Animal);

// 获得一个对象
Person = (function() {
  function Person(options) {
    this.name = options.name, this.age = options.age, this.height = options.height;
  }

  return Person;

})();

// 将this封装再一个闭包里边
Account = function(customer, cart) {
  this.customer = customer;
  this.cart = cart;
  return $('.shopping_cart').bind('click', (function(_this) {
    return function(event) {
      return _this.customer.purchase(_this.cart);
    };
  })(this));
};

// 
(function(){

  return function(){


  }

})()


// 闭包套路
// 1. 用一个立即执行的function
// 

countdown = (function() {
  var _i, _results;
  _results = [];
  for (num = _i = 10; _i >= 1; num = --_i) {
    _results.push(num);
  }
  return _results;
})();





// 
function merge(target, source){
  
}


function _create_id() {
    var text = "cb";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for(var i=0; i < 20; i++) text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text
}

function jsonp() {
  var _script = document.createElement("script");
  var _callback_name = _create_id()
  window[_callback_name] = function(data) { callback(data) }

  url += (url.indexOf("?") == -1) ? "?" : "&"

  url += "callback=" + callback_name + "&jsoncallback=" + callback_name
  if(method != "GET")  { 
    url += "?_method=" + method
    throw "JSONP doesn't support " + method
  }

  script.type = "text/javascript" 
  script.src = url
  document.getElementsByTagName('head')[0].appendChild(script)
}

function xhr(method, url, data, callback) {
  var _req = new XMLHttpRequest()
  if( callback ) _req.onreadystatechange = function(){ callback() }

  _req.open(method, url, callback)
  req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  data ? _req.send(data) : _req.send(null)
}



function __extends(d, b) {
  function o(){
    this.constructor = d
  }
  
}


// 科里化






  




