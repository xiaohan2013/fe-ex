// 布尔值
var isDone = false;
// 数值
var decLiteral = 5;
var hexLiteral = 0xf00d;
var binaryLiteral = 10;
var octalLiteral = 484;
// 字符串
var _name = "Bob";
var name2 = "Smith";
// 模板字符串
var name1 = "Gene";
var age = 37;
// 数组
var list = [1, 2, 3];
// 泛型数组
var list1 = [1, 2, 34, 5];
// 元祖
var x;
x = ['helllo', 10];
// 枚举
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
;
var c = Color.Red;
// Any
var notSure = 4;
notSure = "Maybe a string instead";
notSure = false;
// 只知道一部分数据，any是有用的
var list2 = [1, true, "free"];
// Void(没有任何类型)
function warnUser(argument) {
}
// 声明void类型的变量没什么作用，因为只能给它赋予undefined和null
// 默认情况：null和undefined是所有类型的子类型。
// 可以把null和undefined赋值给number类型变量
var unusable = undefined;
// Null & Undefined
// Never : 永不存在的值的类型
// never类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型
// 变量也可能是 never类型，当它们被永不为真的类型保护所约束时
function error(message) {
    throw new Error(message);
}
// 推断的返回值为never
function fail() {
    return error('');
}
// 返回never的函数必须存在无法到达的终点
function infiniteLoop() {
    while (true) {
    }
}
// 断言(类型强制转换)
// 在ts中使用jsx必须使用as作为强制类型转换
var someValue = "this is a string";
var str1 = someValue.length;
var str2 = someValue.length;
