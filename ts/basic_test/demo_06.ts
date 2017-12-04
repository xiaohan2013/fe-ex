// 泛型

// 组件不仅能支持当前数据类型，同时也支持未来的数据类型

function identity(args: number): number{
    return 0
}

// 定义未来
// 丢失了信息：传入类型和返回类型应该相同
function identity_1(args: any): any {
}

// 泛型（这个函数版本叫做：泛型）
function identity_2<T>(args: T): T {
    return args
}

// 使用泛型变量
// 泛型函数

// 泛型类型

// 泛型类

// 泛型约束
interface LengthWise {
    length: number;
}
function loggingIdentity<T extends LengthWise>(args: T):T {
    return args;
}

// 在泛型里使用类类型
// 在TypeScript使用泛型创建工厂函数时，需要引用构造函数的类类型
function create<T>(c: {new() : T}):T {
    return new c();
}

class BeeKeeper{
    hasMask: boolean;
}
class ZooKeeper {
    nametag: string;
}
class Animal {
    numlegs: number;
}
class Bee extends Animal {
    keeper: BeeKeeper;
}
class Lion extends Animal {
    keeper: ZooKeeper;
}
function createInstance<A extends Animal>(c: new() => A):A {
    return new c();
}






