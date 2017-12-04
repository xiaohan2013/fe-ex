// 接口类型
// 对值所具有的结构进行类型检查（鸭式变形法和结构性子类型化）
// 接口的作用：类型的命名和代码或第三方代码定义契约

// 宽松的约束
function printLabel(labeledObj: {label: string}) {
    console.log(labeledObj)
}
let o1 = {size: 12, label:'Size 10 object'}
printLabel(o1)


// 严格约束(会去关注值的外形)
// 类型检查器不会去检查属性的顺序，只要相应的属性存在并且类型也是对的就可以
// 
interface LabelledValue {
    label: string
}
function printLabel_01(labeledObj: LabelledValue){
    console.log(labeledObj)
}
let o2 = {size: 10, label: "Size 1100 Object"};
printLabel_01(o2)


// 可选属性
interface SquareConfig {
    color?: string;
    width?: number;
}
function createSquare(config: SquareConfig) {
    let newSqaure = {color:'red', area: 10}

    if( config.width ) {
        newSqaure.area = config.width * config.width;
    }

    if( config.color ) {
        newSqaure.color = config.color;
    }

    return newSqaure;
}
let mysquare = createSquare({color:'black'})
console.log(mysquare.color, mysquare.area)


// 只读属性
// readonly标记只针对ts的编译器，但是编译后的js代码并没有对此作出具体的实现？？？
// 编译阶段过不去，自然就无法进入下一步的实现
interface Point {
    readonly x: number,
    readonly y: number
}
let p1: Point = { x: 10, y: 20 };
console.log(p1)

let a: number[] = [1, 2, 3, 4, 5]
let ro: ReadonlyArray<number> = a
// a = ro
// 不能吧一个ReadonlyArray赋值给一个非ReadonlyArray,但是可以
// a = ro as number[]; 先进行转换

// 变量用const, 属性用readonly


// 额外的属性检查
interface SquareConfig {
    color?: string;
    width?: number;
    [propName: string]: any;
}


// 函数类型（描述函数的签名）
interface SearchFunc {
  (source: string, subString: string): boolean;
}
// 1. 函数类型的类型检查来说，函数的参数名不需要与接口里定义的名字相匹配
// 2. 

// 可索引的类型
// 1. 可索引类型具有一个 索引签名，它描述了对象索引的类型，还有相应的索引返回值类型。 
interface StringArray {
  [index: number]: string;
}

let myArray: StringArray;
myArray = ["Bob", "Fred"];

let myStr: string = myArray[0];

// 2. 数组和字典

// 类类型
// 1. 实现接口(接口描述了类的公共部分，而不是公共和私有两部分。 它不会帮你检查类是否具有某些私有成员)
// 1.1. 一个类实现了一个接口时，只对其实例部分进行类型检查。constructor存在于类的静态部分，所以不在检查的范围内
interface ClockInterface {
    currentTime:Date;
    setTime(d: Date);
}

class Clock implements ClockInterface{
    currentTime: Date;
    setTime(d: Date) {
        this.currentTime = d;
    }
    constructor(h: number, m: number){
    }
}
// 2. 类静态部分与实例部分的区别
// 1.2. 直接操作类的静态部分
interface ClockCtor {
    new (h: number, m: number): ClockInterface_1
}
interface ClockInterface_1 {
    tick();
}
function createClock(ctor: ClockCtor, hour: number, minute: number): ClockInterface_1 {
    return new ctor(hour, minute);
}
class DigitalClock implements ClockInterface_1 {
    constructor(h: number, m: number) {}
    tick(){
        console.log("beep beep.....")
    }
}
class AnalogClock implements ClockInterface_1 {
    constructor(h: number, m: number){}
    tick(){
        console.log("tick tick....")
    }
}
let digital = createClock(DigitalClock, 12, 17)
let analog = createClock(AnalogClock, 12, 17)




// 3. 继承接口
// 3.1 接口也可以相互继承
interface Shape {
    color: string;
}
interface Square extends Shape {
    sideLength: number;
}
// 3.2 一个接口可以继承多个接口，创建出多个接口的合成接口。
interface PenStroke {
    penWidth: number;
}
interface Square_01 extends PenStroke, Shape {
    side_length: number;
}


// 4. 混合类型
interface Counter {
    // 函数签名
    (start: number): string;
    interval: number;
    // 
    reset():void;
}
function getCounter(): Counter{
    let counter = <Counter>function(start: number) {}
    counter.interval = 123;
    counter.reset = function(){}
    return counter;
}



// 5. 接口继承类
// 5.1 当接口继承了一个类类型时，它会继承类的成员但不包括其实现。
// 5.2 接口同样会继承到类的private和protected成员。 这意味着当你创建了一个接口继承了一个拥有私有或受保护的成员的类时，这个接口类型只能被这个类或其子类所实现（implement）。
class Control {
    private state: any;
}
interface SelectableControl extends Control {
    select(): void;
}
class Button extends Control {
    select(){}
}
class Image_1 {
    select(){}
}
class Location_1 {
    select(){}
}


// phantom.exit(1)