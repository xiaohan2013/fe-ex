// 类


class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet(){
        return 'Hello, ' + this.greeting;
    }
}
let greeter = new Greeter('world.');


// 继承
class Animal {
    private name:string;
    public constructor(theName:string) {
        this.name = theName;
    }
    public move(distence: number = 0) {
        console.log(`${this.name} moved ${distence}`)
    }
}

class Snake extends Animal{
    constructor(name: string){ super(name) };
    move(distance: number = 0 ){
        console.log("abcde")
        super.move(distance)
    }
}

class Horse extends Animal{
    constructor(name: string) { super(name) }
    move(distance: number = 0) {
        console.log('Horse move')
        super.move(distance)
    }
}

let sam = new Snake('Sammy the Python');
let tom: Animal = new Horse('Tommy the palomino');
sam.move(0)
tom.move(34)


// 共有、私有和受保护修饰符
// readonly
// 参数属性
class Animal_0 {
    constructor(private name: string){
        console.log(`${name} is ${name}`)
    }
}
// 存取器(编译为defineProperty)
class Employee {
    private _fullname: string;
    get fullname():string{
        return this._fullname
    }
    set fullname(newName: string){
        this._fullname = newName
    }
}


// 静态属性
class Grid {
    static origin = {x: 0, y: 0};
    calc(point: {x:number, y: number}){
        let xDist = point.x - Grid.origin.x;
        let yDist = point.y - Grid.origin.y;
        return Math.sqrt(xDist*xDist + yDist * yDist)
    }
    constructor(public scale:number){}
}
let grid1 = new Grid(1)


// 抽象类：抽象类做为其它派生类的基类使用。 它们一般不会直接被实例化
abstract class Animal_2{
    abstract makeSound():void;
    move():void{
        console.log('roaming......')
    }
}

// 构造函数
// 将类作为接口