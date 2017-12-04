// 类型推论
// 类型兼容

// 上下文类型

// 最佳通用型


// 类型系统
// 类型的兼容性是基于结构子类型
// 结构类型：只使用其成员来描述类型的方式
// 名义(nominal)类型：数据的兼容性或等价性是通过明确的声明或
// 类型的名称来决定。与结构类型系统不同，它是基于类型的组成结构，且不要求明确地声明

interface Named {
    name: string;
}
class Person {
    name: string;
}
// 基于结构类型
let p: Named;
p = new Person()


// TS：要兼容结构类型的：
// x兼容y, y必须至少与x有相同属性
let x: Named;
let y = { name: "Alice", location: 'Seatle' }
// 这里要检查y是否能赋值给x，编译器检查x中的每个属性，看是否能在y中也找到对应属性。
//  y必须包含名字是name的string类型成员。y满足条件，因此赋值正确。
x = y;

//  只有目标类型（这里是 Named）的成员会被一一检查是否兼容。
function greet(n: Named){
    alert(1)
}


// 比较两个函数
let fx = (a: number) => 0
let fy = (a: number, s: string) => 0

// fx = fy
// 要查看x是否能赋值给y，首先看它们的参数列表。 x的每个参数必须能在y里找到对应类型的参数
// fy = fx 


// 函数参数双向协变


// 可选参数和剩余参数
// 比较函数兼容性的时候，可选参数与必须参数是可互换的。 源类型上有额外的可选参数不是错误，目标类型的可选参数在源类型里没有对应的参数也不是错误。
//当一个函数有剩余参数时，它被当做无限个可选参数。
function invokeLater(args: any[], callback:(...args: any[]) => void) {

}
invokeLater([1,2], (x, y) => console.log(x, y))
invokeLater([1,2], (x?, y?) => console.log(x, y))


// 枚举类型与数字类型兼容，并且数字类型与枚举类型兼容。不同枚举类型之间是不兼容的


// 类与对象字面量和接口差不多，但有一点不同：类有静态部分和实例部分的类型。 比较两个类类型的对象时，只有实例的成员会被比较。 静态成员和构造函数不在比较的范围内。

// 泛型


