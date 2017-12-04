// var声明
// 作用域(function)和规则
function f(shouldInitialize) {
    if (shouldInitialize) {
        var x = 10;
    }
    return x;
}
f(true);
// 其中之一就是，多次声明同一个变量并不会报错：
for (var i = 0; i < 10; i++) {
    // capture the current state of 'i'
    // by invoking a function with its current value
    (function (i) {
        setTimeout(function () { console.log(i); }, 100 * i);
    })(i);
}
// let声明
// 块作用域
// 使用的是词法作用域或块作用域
function f1(input) {
    var a = 100;
    if (input) {
        // Still okay to reference 'a'
        var b_1 = a + 1;
        return b_1;
    }
    // Error: 'b' doesn't exist here
    // return b;
}
// 重定义屏蔽
// const
// 解构
// 1、数组解构
var input = [1, 2];
var f11 = input[0], f2 = input[1];
console.log(f11);
console.log(f2);
var _a = [f2, f11], first = _a[0], second = _a[1];
console.log(first, second);
var raw_input_data = [11, 22];
function func(_a) {
    var first = _a[0], second = _a[1];
    console.log(first);
    console.log(second);
}
// func(raw_input_data);
// 剩余变量
var _b = [1, 2, 3, 4], ft = _b[0], rest = _b.slice(1);
console.log(ft); // outputs 1
console.log(rest); // outputs [ 2, 3, 4 ]
// 2、对象解构
var o = {
    a: "foo",
    b: 12,
    c: "bar"
};
var a = o.a, b = o.b;
function f_01(_a) {
    var a = _a.a, b = _a.b;
}
// 指定默认值
function f_02(_a) {
    var _b = _a === void 0 ? { a: "", b: 0 } : _a, a = _b.a, b = _b.b;
    console.log(">>>>>>>>>>>>>>", a, b);
}
f_02();
phantom.exit(1)
