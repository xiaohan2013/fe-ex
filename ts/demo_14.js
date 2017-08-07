// 名称空间
// 【内部模块】现在叫【名称空间】，任何使用module关键字来声明一个内部模块的地方都应该使用namespace关键字来替换。可以防止名称冲突.
// 所有的验证器都放在一个文件中
// interface StringValidator {
//     isAcceptable(s: string): boolean;
// }
// 随着验证器数量的增加，需要重新组织代码。以便记录他们的类型的同时还不用担心与其他对象产生命名冲突。
var Validation_14;
(function (Validation_14) {
    var lettersRegexp = /^[A-Za-z]+$/;
    var numberRegexp = /^[0-9]+$/;
    var LettersOnlyValidator = (function () {
        function LettersOnlyValidator() {
        }
        LettersOnlyValidator.prototype.isAcceptable = function (s) {
            return lettersRegexp.test(s);
        };
        return LettersOnlyValidator;
    }());
    Validation_14.LettersOnlyValidator = LettersOnlyValidator;
    var ZipCodeValidator = (function () {
        function ZipCodeValidator() {
        }
        ZipCodeValidator.prototype.isAcceptable = function (s) {
            return numberRegexp.test(s);
        };
        return ZipCodeValidator;
    }());
    Validation_14.ZipCodeValidator = ZipCodeValidator;
})(Validation_14 || (Validation_14 = {}));
// 分离到多个文件（当应用变大时，需要将代码分离到不同的文件中便于维护）
// 参考namespace_demo
// 别名
// 简化命名空间操作的方法是使用import q = x.y.z给常用的对象起一个短的名字。
var Shapessssssss;
(function (Shapessssssss) {
    var Polygons;
    (function (Polygons) {
        var Triangle = (function () {
            function Triangle() {
            }
            return Triangle;
        }());
        Polygons.Triangle = Triangle;
        var Square = (function () {
            function Square() {
            }
            return Square;
        }());
        Polygons.Square = Square;
    })(Polygons = Shapessssssss.Polygons || (Shapessssssss.Polygons = {}));
})(Shapessssssss || (Shapessssssss = {}));
