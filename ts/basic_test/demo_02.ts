// var声明
// 作用域(function)和规则

function f(shouldInitialize: boolean){
    if(shouldInitialize) {
        var x = 10;
    }
    return x;
}

f(true)


 // 其中之一就是，多次声明同一个变量并不会报错：
for (var i = 0; i < 10; i++) {
    // capture the current state of 'i'
    // by invoking a function with its current value
    (function(i) {
        setTimeout(function() { console.log(i); }, 100 * i);
    })(i);
}


// let声明
// 块作用域
// 使用的是词法作用域或块作用域
function f1(input: boolean) {
    let a = 100;
    if (input) {
        // Still okay to reference 'a'
        let b = a + 1;
        return b;
    }
    // Error: 'b' doesn't exist here
    // return b;
}


// 重定义屏蔽

// const

// 解构
// 1、数组解构
let input = [1, 2];
let [f11, f2] = input
console.log(f11)
console.log(f2)
let [first, second] = [f2, f11]

console.log(first, second)

let raw_input_data = [11,22]
function func([first, second]: [number, number]) {
    console.log(first);
    console.log(second);
}
// func(raw_input_data);

// 剩余变量
let [ft, ...rest] = [1, 2, 3, 4];
console.log(ft); // outputs 1
console.log(rest); // outputs [ 2, 3, 4 ]


// 2、对象解构
let o = {
    a: "foo",
    b: 12,
    c: "bar"
};
let { a, b } = o;


// ({aa, bb} = {aa: "biz", bb: 121})


// 3、函数声明
type C = {a: string, b?: string}
function f_01({a, b} : C): void{
}
// 指定默认值
function f_02({a, b} = {a:"", b:0}):void{
    console.log(">>>>>>>>>>>>>>", a, b)
}
f_02()

// phantom.exit(1)



