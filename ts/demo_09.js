// 高级类型
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// 交叉类型
function extend(first, second) {
    var result = {};
    for (var id in first) {
        result[id] = first[id];
    }
    for (var id in second) {
        if (!result.hasOwnProperty(id)) {
            result[id] = second[id];
        }
    }
    return result;
}
var Person = (function () {
    function Person(name) {
        this.name = name;
    }
    return Person;
}());
var ConsoleLogger = (function () {
    function ConsoleLogger() {
    }
    ConsoleLogger.prototype.log = function () {
    };
    return ConsoleLogger;
}());
var Jim = extend(new Person('Jim'), new ConsoleLogger());
// 联合类型
// 代替any，使用联合类型做作为padding的参数
// function padLeft(value:string, padding: any) {
function padLeft(value, padding) {
    if (typeof padding === 'number') {
        return Array(padding + 1).join(' ') + value;
    }
    if (typeof padding === 'string') {
        return padding + value;
    }
    throw new Error('Expected string or number, got');
}
function getSmallPet() {
    return {};
}
var pet = getSmallPet();
pet.layEggs(); // okay
// pet.swim(); // compile errors
// 类型保护和区分类型（type Guard and Differentiating Type)
// 类型断言
// if(<Fish>pet.swim){}
// 类型保护就是一些表达式，他会在运行时检查以确保在某个作用域里的类型
// 要定义一个类型保护，简单定义一个函数，返回一个类型谓词
function isFish(pet) {
    return pet.swim !== undefined;
}
// typeof类型保护
function isNumber(x) {
    return x === 'number';
}
function isString(x) {
    return x === 'string';
}
function padLeft_1(value, padding) {
    if (isNumber(padding)) {
        return Array(padding + 1).join(" ") + value;
    }
    if (isString(padding)) {
        return padding + value;
    }
    throw new Error("Expected string or number, got '" + padding + "'.");
}
var SpaceRepeatingPadder = (function () {
    function SpaceRepeatingPadder(numSpace) {
        this.numSpace = numSpace;
    }
    SpaceRepeatingPadder.prototype.getPaddingString = function () {
        return Array(this.numSpace + 1).join(' ');
    };
    return SpaceRepeatingPadder;
}());
var StringPadder = (function () {
    function StringPadder(value) {
        this.value = value;
    }
    StringPadder.prototype.getPaddingString = function () {
        return this.value;
    };
    return StringPadder;
}());
function getRandomPadder() {
    return Math.random() < 0.5 ?
        new SpaceRepeatingPadder(4) :
        new StringPadder(' ');
}
// let padder: Padder = getRandomPadder()
// if(padder instanceof SpaceRepeatingPadder){}
// if(padder instanceof StringPadder){}
// 可以为Null的类型
var s = "foo";
var sn = 'bar';
sn = null;
sn = undefined;
// 可选参数和可选属性
// 可选参数会被自动地加上| undefined:
function f(x, y) {
    return x + (y || 0);
}
// 可选属性也会有同样的处理：
var C = (function () {
    function C() {
    }
    return C;
}());
// 类型保护和类型断言
function f_1(sn) {
    // if(sn == null){
    //     return 'default';
    // }else{
    //     return sn;
    // }
    // 短路运算符
    return sn || 'default';
}
// 如果编译器不能够去除null或undefined，你可以使用类型断言手动去除。 语法是添加 !后缀：identifier!从identifier的类型里去除了null和undefined
function broken(name) {
    function postfix(epithet) {
        return name.charAt(0) + '. the ' + epithet;
    }
    name = name || "bob";
    return postfix("great");
}
// 嵌套函数，因为编译器无法去除嵌套函数的null（除非是立即调用的函数表达式）。 因为它无法跟踪所有对嵌套函数的调用，尤其是你将内层函数做为外层函数的返回值。 如果无法知道函数在哪里被调用，就无法知道调用时 name的类型。
function fixed(name) {
    function postfix(epithet) {
        return name.charAt(0) + ' .the ' + epithet;
    }
    name = name || "Bob";
    return postfix("great");
}
function getName(n) {
    if (typeof n === 'string') {
        return n;
    }
    else {
        return n();
    }
}
var people;
var s_1 = people.name;
var s_2 = people.next.name;
var s_3 = people.next.next.name;
var UIElement = (function () {
    function UIElement() {
    }
    UIElement.prototype.animate = function (dx, dy, easing) {
        if (easing === 'ease-in') {
            console.log(easing);
        }
        else if (easing === 'ease-out') {
            console.log(easing);
        }
        else if (easing === 'ease-in-out') {
        }
        else {
        }
    };
    return UIElement;
}());
var button = new UIElement();
button.animate(0, 0, 'ease-in');
function area(s) {
    switch (s.kind) {
        case "square": return s.size * s.size;
        case "rectangle": return s.height * s.width;
        case "circle": return Math.PI * Math.pow(s.radius, 2);
    }
}
// 完整性检查
// 当没有涵盖所有可辨识联合的变化时，我们想让编译器可以通知我们。
// 首先是启用 --strictNullChecks并且指定一个返回值类型
// 使用never类型，编译器用它来进行完整性检查
function assertNever(x) {
    throw new Error("Unexpected object: " + x);
}
function area_1(s) {
    switch (s.kind) {
        case "square": return s.size * s.size;
        case "rectangle": return s.height * s.width;
        case "circle": return Math.PI * Math.pow(s.radius, 2);
        default: return assertNever(s);
    }
}
// 多态this类型
// 某个包含类或接口的子类型，F-bounded多态性
var BasicCalculator = (function () {
    function BasicCalculator(value) {
        if (value === void 0) { value = 0; }
        this.value = value;
    }
    BasicCalculator.prototype.currentValue = function () {
        return this.value;
    };
    BasicCalculator.prototype.add = function (operand) {
        this.value += operand;
        return this;
    };
    BasicCalculator.prototype.multiply = function (operand) {
        this.value *= operand;
        return this;
    };
    return BasicCalculator;
}());
var v = new BasicCalculator(2).multiply(5).add(1).currentValue();
var ScientificCalaculator = (function (_super) {
    __extends(ScientificCalaculator, _super);
    function ScientificCalaculator(value) {
        if (value === void 0) { value = 0; }
        return _super.call(this, value) || this;
    }
    ScientificCalaculator.prototype.sin = function () {
        this.value = Math.sin(this.value);
        return this;
    };
    return ScientificCalaculator;
}(BasicCalculator));
// 索引类型: 能够检查使用了动态属性名的代码
// 选取属性的子集
function pluck(o, names) {
    return names.map(function (n) { return o[n]; });
}
// 索引类型查询和索引访问操作符
function pluck_01(o, names) {
    return names.map(function (n) { return o[n]; });
}
var person = {
    name: 'Jarid',
    age: 34
};
// 类型操作符
// 首先是 keyof T，索引类型查询操作符。对于任何类型 T，keyof T的结果为T上已知的公共属性名的联合。
var personProps;
var keys; // 
var value; // 
function proxify(o) {
}
var proxyProps = proxify(props);
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
function unproxify(t) {
    var result = {};
    for (var k in t) {
        result[k] = t[k].get();
    }
    return result;
}
