[ECMAScript parser](https://www.npmjs.com/package/esprima)
[ECMAScript Tooling](https://github.com/estools)





## JS对象扩展、密封以及冻结

可枚举
可配置

JavaScript中，对象包括3个特性，分别为，可扩展性，class标识符，属性。 

如果对象的可扩展性为false,则不可为对象动态的添加属性。
 
对象包含分为存取器属性和值属性。存取属性为 {get r(){/*函数实现*/}，set r(){/*函数实现*/}} 存取器属性自身不能保存值，set相当于对对象中其他的属性进行更改。get中也可以返回其他属性的值。属性的特性值为 可写性，可配置性，value,可枚举性。存取器属性使用get,set属性来替换可写性和value.
在没有实现ES5的浏览器中，使用__lookupGetter____lookupSetter__，方法第一个参数为属性名，第二个参数为function
来查看get set属性 通过 __lookupGetter__('x')__ 参数为属性名
通过Object.getownpropertydescriptor(对象，属性名) ，Object.defineProperty用此方法来添加属性，可以配置特性值。如果属性已存在，则修改特性值。Object.defineProperties 定义多个属性（对象，{
属性名：{特性值}
}） 一旦可配置性修改为false,则不可再次修改可配置性。其余特性修改有规则
可配置性为false,可写行可有true修改为false.其余基本都是不可变的。
 
对象.isPrototypeOf（a）指定对象原形链上是否有a,和 instanceof工作原理一样
对象.propertyIsEnumerable(属性) 属性是否为可枚举
对象.hasOwnProperty(属性) 属性是否为自有属性
 
in 关键词可以检测对象及其原形链上是否有某个属性
 
var 声明的变量不可以用delete删除
可配置为false的属性也不可以