// 高级类型

// 交叉类型
function extend<T, U>(first: T, second: U): T & U {
    let result = <T & U>{};
    for(let id in first){
        (<any>result)[id] = (<any>first)[id];
    }
    for(let id in second){
        if(!result.hasOwnProperty(id)){
            (<any>result)[id] = (<any>second)[id];
        }
    }
    return result;
}

class Person {
    constructor(public name: string){}
}
interface Loggable {
    log():void;
}
class ConsoleLogger implements Loggable {
    log(){

    }
}

let Jim = extend(new Person('Jim'), new ConsoleLogger());


// 联合类型
// 代替any，使用联合类型做作为padding的参数
// function padLeft(value:string, padding: any) {
function padLeft(value:string, padding: string | number) {
    if(typeof padding === 'number') {
        return Array(padding + 1).join(' ') + value;
    }
    if(typeof padding === 'string'){
        return padding + value;
    }

    throw new Error('Expected string or number, got');
}

// 如果一个值是联合类型，我们只能访问此联合类型的所有类型里共有的成员。
interface Bird {
    fly();
    layEggs();
}
interface Fish {
    swim();
    layEggs();
}
function getSmallPet(): Fish | Bird {
    return <Fish | Bird>{}
}
let pet = getSmallPet();
pet.layEggs(); // okay
// pet.swim(); // compile errors

// 类型保护和区分类型（type Guard and Differentiating Type)
// 类型断言
// if(<Fish>pet.swim){}

// 类型保护就是一些表达式，他会在运行时检查以确保在某个作用域里的类型
// 要定义一个类型保护，简单定义一个函数，返回一个类型谓词
function isFish(pet: Fish | Bird): pet is Fish {
    return (<Fish>pet).swim !== undefined;
}

// typeof类型保护
function isNumber(x: any): x is number {
    return x === 'number';
}
function isString(x: any): x is string {
    return x === 'string';
}
function padLeft_1(value: string, padding: string | number) {
    if (isNumber(padding)) {
        return Array(padding + 1).join(" ") + value;
    }
    if (isString(padding)) {
        return padding + value;
    }
    throw new Error(`Expected string or number, got '${padding}'.`);
}
// instanceof类型保护
interface Padder {
    getPaddingString(): string
}
class SpaceRepeatingPadder implements Padder {
    constructor(private numSpace: number) {}
    getPaddingString(){
        return Array(this.numSpace + 1).join(' ')
    }
}
class StringPadder implements Padder {
    constructor(private value: string){}
    getPaddingString(){
        return this.value
    }
}
function getRandomPadder(){
    return Math.random() < 0.5 ?
        new SpaceRepeatingPadder(4) :
        new StringPadder(' ')
}
// let padder: Padder = getRandomPadder()
// if(padder instanceof SpaceRepeatingPadder){}
// if(padder instanceof StringPadder){}

// 可以为Null的类型
let s = "foo";
let sn: string | null | undefined = 'bar'
sn = null
sn = undefined

// 可选参数和可选属性
// 可选参数会被自动地加上| undefined:
function f(x: number, y?: number) {
    return x + ( y || 0)
}
// 可选属性也会有同样的处理：
class C {
    a: number;
    b?: number;
}

// 类型保护和类型断言
function f_1(sn: string | null ): string {
    // if(sn == null){
    //     return 'default';
    // }else{
    //     return sn;
    // }
    // 短路运算符
    return sn || 'default'
}

// 如果编译器不能够去除null或undefined，你可以使用类型断言手动去除。 语法是添加 !后缀：identifier!从identifier的类型里去除了null和undefined
function broken(name: string | null): string {
    function postfix(epithet: string) {
        return name.charAt(0) + '. the ' + epithet;
    }
    name = name || "bob";
    return postfix("great")
}

// 嵌套函数，因为编译器无法去除嵌套函数的null（除非是立即调用的函数表达式）。 因为它无法跟踪所有对嵌套函数的调用，尤其是你将内层函数做为外层函数的返回值。 如果无法知道函数在哪里被调用，就无法知道调用时 name的类型。
function fixed(name: string | null): string {
    function postfix(epithet: string) {
        return name!.charAt(0) + ' .the ' + epithet;
    }
    name = name || "Bob";
    return postfix("great")
}

// 类型别名
// 类型别名会给一个类型起一个新的名字，有时和接口很像
// 作用于原始值、联合类型、元组以及其他任何需要手写的类型
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;
function getName(n: NameOrResolver): Name {
    if(typeof n === 'string'){
        return n
    }else {
        return n()
    }
}

// 起别名不会新建一个类型 - 它创建了一个新名字来引用那个类型。
// 和接口一样，类型别名也可以是泛型，可以添加类型参数且在别名声明又侧传入
type Container<T> = { value: T }
// 可以使用类型别名来在属性里引用自己
type Tree<T> = {
    value: T;
    left: Tree<T>;
    right: Tree<T>;
}

// 交叉类型
type LinkedList<T> = T & {next: LinkedList<T>};
interface Person {
    name: string;
}
var people: LinkedList<Person>;
var s_1 = people.name;
var s_2 = people.next.name;
var s_3 = people.next.next.name;


// 接口和类型别名
// 1、接口创建新的名字，可以在其他任何地方用
// 2、类型别名并不创建新名字
// 3、类别名称不能被extends和implements(对象的扩展是开放的，修改是封闭的)
// 4、无法通过接口来描述一个类型并且需要使用联合类型或元组类型，此时通过类型别名
type Alias = { num: number }
interface Interface {
    num: number;
}
declare function aliased(arg: Alias): Alias;
declare function interfaced(arg: Interface): Interface;


// 字符串字面量类型
// 联合类型、类型保护和类型别名
type Easing = 'ease-in' | 'ease-out' | 'ease-in-out';
class UIElement {
    animate(dx: number, dy: number, easing: Easing) {
        if(easing === 'ease-in'){
            console.log(easing)
        }else if( easing === 'ease-out'){
            console.log(easing)
        }else if( easing === 'ease-in-out'){

        }else {

        }
    }
}
let button = new UIElement();
button.animate(0, 0, 'ease-in')
// button.animate(0, 0, 'uneasy') Error

// 字符串字面量类型还可以区分函数重载
// function createElement_1(tagName: 'img'): HTMLImageElement{}

// 可辨识联合
// 联合类型、类型保护和类型别名创建可辨识联合的高级模式，也叫标签联合或代数数据类型
interface Square {
    kind: 'square';
    size: number;
}
interface Rectangle {
    kind: 'rectangle';
    width: number;
    height: number;
}
interface Circle {
    kind: 'circle';
    radius: number;
}
// 每个接口都有 kind属性但有不同的字符串字面量类型。 kind属性称做可辨识的特征或标签。
type Shape = Square | Rectangle | Circle;
function area(s: Shape) {
    switch(s.kind){
        case "square": return s.size * s.size;
        case "rectangle": return s.height * s.width;
        case "circle": return Math.PI * s.radius ** 2
    }
}

// 完整性检查
// 当没有涵盖所有可辨识联合的变化时，我们想让编译器可以通知我们。
// 首先是启用 --strictNullChecks并且指定一个返回值类型

// 使用never类型，编译器用它来进行完整性检查
function assertNever(x: never): never {
    throw new Error("Unexpected object: " + x);
}
function area_1(s: Shape) {
    switch (s.kind) {
        case "square": return s.size * s.size;
        case "rectangle": return s.height * s.width;
        case "circle": return Math.PI * s.radius ** 2;
        default: return assertNever(s); 
    }
}


// 多态this类型
// 某个包含类或接口的子类型，F-bounded多态性
class BasicCalculator {
    public constructor(protected value: number = 0) {}
    public currentValue(): number {
        return this.value;
    }
    public add(operand: number): this {
        this.value += operand;
        return this;
    }
    public multiply(operand: number): this {
        this.value *= operand;
        return this;
    }
}
let v = new BasicCalculator(2).multiply(5).add(1).currentValue();
class ScientificCalaculator extends BasicCalculator {
    public constructor(value = 0 ){
        super(value)
    }
    public sin(){
        this.value = Math.sin(this.value);
        return this;
    }
}

// 索引类型: 能够检查使用了动态属性名的代码
// 选取属性的子集
function pluck(o, names) {
    return names.map( n => o[n] );
}
// 索引类型查询和索引访问操作符
function pluck_01<T, K extends keyof T>(o: T, names: K[]): T[K][] {
    return names.map( n => o[n] )
}
interface Person{
    name: string;
    age: number;
}
let person: Person = {
    name: 'Jarid',
    age: 34
}

// 类型操作符
// 首先是 keyof T，索引类型查询操作符。对于任何类型 T，keyof T的结果为T上已知的公共属性名的联合。
let personProps:keyof Person;

// 第二个操作符是T[K]，索引访问操作符。类型语法反映了表达式语法

// 索引类型和字符串索引签名
// keyof和T[K]与字符串索引签名进行交互
interface Map<T> {
    [key: string]: T;
}
let keys: keyof Map<number>; // 
let value: Map<number>['foo']; // 


// 映射类型
interface PersonPartial {
    name?: string;
    age?: number;
}
type ReadOnly<T> = {
    readonly [P in keyof T]: T[P];
}
type Partial_1<T> = {
    [P in keyof T]?: T[P];
}
type PersonPartial_1 = Partial_1<Person>;
type ReadonlyPerson = Readonly<Person>;
// 从旧类型中创建新类型的一种方式--映射类型



// 在映射类型里，新类型以相同的形式去转换旧类型里每个属性。 
type Keys = 'option1' | 'option2';
type Flags = { [K in Keys]: boolean };

// 
type Proxy<T> = {
    get():T;
    set(value: T): void;
}
type Proxify<T> = {
    [P in keyof T]: Proxy<T[P]>;
}
function proxify<T>(o: T): Proxify<T> {

}
let proxyProps = proxify(props);

// type Pick<T, K extends keyof T> = {
//     [P in K]: T[P];
// }
// type Record<K extends string, T> = {
//     [P in K]: T;
// }

// 因为 Record并不需要输入类型来拷贝属性

// type ThreeStringProps = Record<'prop1' | 'prop2' | 'prop3', string>

// 非同态类型本质上会创建新的属性，因此它们不会从它处拷贝属性修饰符。


// 映射类型推断
function unproxify(t: Proxify<T>):T {
    let result = {} as T;
    for (const k in t) {
        result[k] = t[k].get()
    }
    return result;
}




