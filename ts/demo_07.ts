// 枚举


enum Diretion {
    UP = 1,
    DOWN = 2,
    TOP = 3,
    LEFT = 4,
    RIGHT = 5
}

// 常数枚举
const enum Gender {
    male,
    female
}

console.log(Gender.male)
let genders = [Gender.male, Gender.female]

// 外部枚举: 描述已经存在的枚举类型的形状（declare进行声明）
// 在正常的枚举里，没有初始化方法的成员被当成常数成员
// 对于非常数的外部枚举而言，没有初始化方法时被当做需要经过计算的。

enum FileAccess {
    None,
    Read = 1 << 1,
    Write = 1 << 2,
    ReadWrite = Read | Write,
    G = "123".length,
}