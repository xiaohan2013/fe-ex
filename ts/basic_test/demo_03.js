// 接口类型
// 对值所具有的结构进行类型检查（鸭式变形法和结构性子类型化）
// 接口的作用：类型的命名和代码或第三方代码定义契约
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
// 宽松的约束
function printLabel(labeledObj) {
    console.log(labeledObj);
}
var o1 = { size: 12, label: 'Size 10 object' };
printLabel(o1);
function printLabel_01(labeledObj) {
    console.log(labeledObj);
}
var o2 = { size: 10, label: "Size 1100 Object" };
printLabel_01(o2);
function createSquare(config) {
    var newSqaure = { color: 'red', area: 10 };
    if (config.width) {
        newSqaure.area = config.width * config.width;
    }
    if (config.color) {
        newSqaure.color = config.color;
    }
    return newSqaure;
}
var mysquare = createSquare({ color: 'black' });
console.log(mysquare.color, mysquare.area);
var p1 = { x: 10, y: 20 };
console.log(p1);
var a = [1, 2, 3, 4, 5];
var ro = a;
var myArray;
myArray = ["Bob", "Fred"];
var myStr = myArray[0];
var Clock = (function () {
    function Clock(h, m) {
    }
    Clock.prototype.setTime = function (d) {
        this.currentTime = d;
    };
    return Clock;
}());
function createClock(ctor, hour, minute) {
    return new ctor(hour, minute);
}
var DigitalClock = (function () {
    function DigitalClock(h, m) {
    }
    DigitalClock.prototype.tick = function () {
        console.log("beep beep.....");
    };
    return DigitalClock;
}());
var AnalogClock = (function () {
    function AnalogClock(h, m) {
    }
    AnalogClock.prototype.tick = function () {
        console.log("tick tick....");
    };
    return AnalogClock;
}());
var digital = createClock(DigitalClock, 12, 17);
var analog = createClock(AnalogClock, 12, 17);
function getCounter() {
    var counter = function (start) { };
    counter.interval = 123;
    counter.reset = function () { };
    return counter;
}
// 5. 接口继承类
// 5.1 当接口继承了一个类类型时，它会继承类的成员但不包括其实现。
// 5.2 接口同样会继承到类的private和protected成员。 这意味着当你创建了一个接口继承了一个拥有私有或受保护的成员的类时，这个接口类型只能被这个类或其子类所实现（implement）。
var Control = (function () {
    function Control() {
    }
    return Control;
}());
var Button = (function (_super) {
    __extends(Button, _super);
    function Button() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Button.prototype.select = function () { };
    return Button;
}(Control));
var Image_1 = (function () {
    function Image_1() {
    }
    Image_1.prototype.select = function () { };
    return Image_1;
}());
var Location_1 = (function () {
    function Location_1() {
    }
    Location_1.prototype.select = function () { };
    return Location_1;
}());
// phantom.exit(1) 
