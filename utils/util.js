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
















