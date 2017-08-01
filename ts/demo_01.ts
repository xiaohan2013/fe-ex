

// 布尔值
let isDone: boolean = false;

// 数值
let decLiteral: number = 5;
let hexLiteral: number = 0xf00d;
let binaryLiteral: number = 0b1010;
let octalLiteral: number = 0o744;

// 字符串
let _name: string = "Bob";
let name2 = "Smith";

// 模板字符串
let name1: string= `Gene`;
let age: number = 37;


// 数组
let list: number[] = [1, 2, 3]
// 泛型数组
let list1: Array<number> = [1,2,34,5]

// 元祖
let x: [string, number];
x = ['helllo', 10]

// 枚举
enum Color {Red, Green, Blue};
let c:Color = Color.Red;


// Any
let notSure: any = 4;
notSure = "Maybe a string instead";
notSure = false


// 只知道一部分数据，any是有用的
let list2: any[] = [1, true, "free"]


// Void(没有任何类型)
function warnUser(argument): void {
}
// 声明void类型的变量没什么作用，因为只能给它赋予undefined和null
// 默认情况：null和undefined是所有类型的子类型。
// 可以把null和undefined赋值给number类型变量
let unusable: void = undefined



// Null & Undefined


// Never : 永不存在的值的类型
// never类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型
// 变量也可能是 never类型，当它们被永不为真的类型保护所约束时
function error(message: string): never {
    throw new Error(message)
}
// 推断的返回值为never
function fail(){
    return error('')
}

// 返回never的函数必须存在无法到达的终点
function infiniteLoop(): never {
    while(true){

    }
}




// 断言(类型强制转换)
// 在ts中使用jsx必须使用as作为强制类型转换
let someValue: any = "this is a string";
let str1: number = (<strng>someValue).length;
let str2: number = (someValue as string).length;
