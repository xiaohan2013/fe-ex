// 枚举
var Diretion;
(function (Diretion) {
    Diretion[Diretion["UP"] = 1] = "UP";
    Diretion[Diretion["DOWN"] = 2] = "DOWN";
    Diretion[Diretion["TOP"] = 3] = "TOP";
    Diretion[Diretion["LEFT"] = 4] = "LEFT";
    Diretion[Diretion["RIGHT"] = 5] = "RIGHT";
})(Diretion || (Diretion = {}));
console.log(0 /* male */);
var genders = [0 /* male */, 1 /* female */];
// 外部枚举: 描述已经存在的枚举类型的形状
// 在正常的枚举里，没有初始化方法的成员被当成常数成员
// 对于非常数的外部枚举而言，没有初始化方法时被当做需要经过计算的。
var FileAccess;
(function (FileAccess) {
    FileAccess[FileAccess["None"] = 0] = "None";
    FileAccess[FileAccess["Read"] = 2] = "Read";
    FileAccess[FileAccess["Write"] = 4] = "Write";
    FileAccess[FileAccess["ReadWrite"] = 6] = "ReadWrite";
    FileAccess[FileAccess["G"] = "123".length] = "G";
})(FileAccess || (FileAccess = {}));
