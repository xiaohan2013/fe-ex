// 类
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
var Greeter = (function () {
    function Greeter(message) {
        this.greeting = message;
    }
    Greeter.prototype.greet = function () {
        return 'Hello, ' + this.greeting;
    };
    return Greeter;
}());
var greeter = new Greeter('world.');
// 继承
var Animal = (function () {
    function Animal(theName) {
        this.name = theName;
    }
    Animal.prototype.move = function (distence) {
        if (distence === void 0) { distence = 0; }
        console.log(this.name + " moved " + distence);
    };
    return Animal;
}());
var Snake = (function (_super) {
    __extends(Snake, _super);
    function Snake(name) {
        return _super.call(this, name) || this;
    }
    ;
    Snake.prototype.move = function (distance) {
        if (distance === void 0) { distance = 0; }
        console.log("abcde");
        _super.prototype.move.call(this, distance);
    };
    return Snake;
}(Animal));
var Horse = (function (_super) {
    __extends(Horse, _super);
    function Horse(name) {
        return _super.call(this, name) || this;
    }
    Horse.prototype.move = function (distance) {
        if (distance === void 0) { distance = 0; }
        console.log('Horse move');
        _super.prototype.move.call(this, distance);
    };
    return Horse;
}(Animal));
var sam = new Snake('Sammy the Python');
var tom = new Horse('Tommy the palomino');
sam.move(0);
tom.move(34);
// 共有、私有和受保护修饰符
// readonly
// 参数属性
var Animal_0 = (function () {
    function Animal_0(name) {
        this.name = name;
        console.log(name + " is " + name);
    }
    return Animal_0;
}());
// 存取器(编译为defineProperty)
var Employee = (function () {
    function Employee() {
    }
    Object.defineProperty(Employee.prototype, "fullname", {
        get: function () {
            return this._fullname;
        },
        set: function (newName) {
            this._fullname = newName;
        },
        enumerable: true,
        configurable: true
    });
    return Employee;
}());
// 静态属性
var Grid = (function () {
    function Grid(scale) {
        this.scale = scale;
    }
    Grid.prototype.calc = function (point) {
        var xDist = point.x - Grid.origin.x;
        var yDist = point.y - Grid.origin.y;
        return Math.sqrt(xDist * xDist + yDist * yDist);
    };
    Grid.origin = { x: 0, y: 0 };
    return Grid;
}());
var grid1 = new Grid(1);
// 抽象类：抽象类做为其它派生类的基类使用。 它们一般不会直接被实例化
var Animal_2 = (function () {
    function Animal_2() {
    }
    Animal_2.prototype.move = function () {
        console.log('roaming......');
    };
    return Animal_2;
}());
// 构造函数
// 将类作为接口 
