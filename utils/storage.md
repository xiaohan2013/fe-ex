## 前端存储库library

####模块机制和插件机制的实现
use
install

#### 原型查询
var hasOwnProperty = Object.prototype.hasOwnPropertye;
function hasOwn(obj , key){
    return hasOwnProperty.call(obj, key);
}
Object.getPrototypeOf(obj)
Object.setPrototypeOf(obj, prototype);
// Only works in Chrome and FireFox, does not work in IE:
Object.setPrototypeOf = Object.setPrototypeOf || function(obj, proto) {
  obj.__proto__ = proto;
  return obj; 
}
