// 泛型
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
// 组件不仅能支持当前数据类型，同时也支持未来的数据类型
function identity(args) {
    return 0;
}
// 定义未来
// 丢失了信息：传入类型和返回类型应该相同
function identity_1(args) {
}
// 泛型（这个函数版本叫做：泛型）
function identity_2(args) {
    return args;
}
function loggingIdentity(args) {
    return args;
}
// 在泛型里使用类类型
// 在TypeScript使用泛型创建工厂函数时，需要引用构造函数的类类型
function create(c) {
    return new c();
}
var BeeKeeper = (function () {
    function BeeKeeper() {
    }
    return BeeKeeper;
}());
var ZooKeeper = (function () {
    function ZooKeeper() {
    }
    return ZooKeeper;
}());
var Animal = (function () {
    function Animal() {
    }
    return Animal;
}());
var Bee = (function (_super) {
    __extends(Bee, _super);
    function Bee() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Bee;
}(Animal));
var Lion = (function (_super) {
    __extends(Lion, _super);
    function Lion() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Lion;
}(Animal));
function createInstance(c) {
    return new c();
}
