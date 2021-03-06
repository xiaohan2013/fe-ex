// 函数

// 函数式JS的基础，帮助实现了抽象层、模拟类、信息隐藏和模块。
// 在支持类，命名空间和模块，但是函数仍是定义行为的地方。
// 

// 在js中的函数定义方式
function add(x, y) {
    return x + y;
}
let myFunc = function(x, y) { return x + y }

// 1、 函数类型
function add_x_y(x: number, y: number): number {
    return x + y;
}
let add_x_y_1 = function(x: number, y: number): number{ return x + y }

// 2、书写完整的函数类型
let add_x_y_2: (x: number, y: number)=> number = 
function(x: number, y: number): number{ return x + y }

// 2.1、函数类型包括：参数类型和返回值类型
let add_x_y_3: (baseValue: number, increment: number)=> number =
function(x: number, y: number):number { return x + y }
// 只要参数类型匹配，那么就认为是有效的函数类型，不在乎参数名称是否正确

// 2.2 返回值类型。返回值类型是必要部分，如果函数没有返回值，也必须指定返回值类型为void


// 2.3 推断类型
let add_x_y_4:(baseValue: number, increment: number)=> number =
function(x, y) { return x + y }


// 3、可选参数和默认参数
// 3.1 ts中的每个参数都是必须的，不是指不传就是null和undefined作为参数，而是编译器检查用户是否为每个参数传入了值
// 传递给一个函数的参数个数必须与函数期望的参数个数一致
function buildName(firstName: string, lastName: string): string {
    return firstName + " " + lastName;
}
// 3.2 我们也可以为参数提供一个默认值当用户没有传递这个参数或传递的值是undefined时
function buildName_1(firstName: string, lastName?: string): string {
    return firstName + " " + lastName;
}

// 3.3 剩余参数
// 默认参数和可选参数：表示一个参数
// 同时操作多个参数，或者不知道又多少个参数传入，在js中可以用arguments
function buildName_2(firstName: string, ...restName: string[]): string{
    return firstName + " " + restName.join(' ');
}


// 3.4 this
// 在js里，this的值在函数被调用时才会指定
// 函数调用上下文
// 返回一个函数或将函数作为参数传递

let deck = {
    suits:["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    createCardPicker: function(){
        return function(){
            let pickedCard = Math.floor(Math.random() * 52);
            let pickedSuit = Math.floor( pickedCard / 13 );

            return { suit: this.suits[pickedSuit], card: pickedCard % 13 }
        }
    }
}



// 箭头函数和this
// 箭头函数能保存函数创建时的 this值，而不是调用时的值：
let deck_1 = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    createCardPicker: function(){
        return () => {
           let pickedCard = Math.floor(Math.random() * 52);
           let pickedSuit = Math.floor( pickedCard / 13 );

           return { suit: this.suits[pickedSuit], card: pickedCard % 13 }
        }
    }
}



// this参数
// 
// 
interface Card {
    suit: string;
    card: number;
}
interface Deck {
    suits: string[];
    cards: number[];
    createCardPicker( this: Deck ): () => Card;
}
let deck_2: Deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    createCardPicker: function(this: Deck) {
        return () => {
            let pickedCard = Math.floor(Math.random() * 52);
            let pickedSuit = Math.floor(pickedCard / 13);

            return {suit: this.suits[pickedSuit], card: pickedCard % 13};
        }
    }
}

// this参数在回调函数里
interface Event {
    message?: string;
}
interface UIElement {
    addClickListener(onclick: (this: void, e: Event) => void ): void;
}
class Handler {
    info: string;
    onClickBad(this: Handler, e: Event ): void{
        this.info = e.message;
    }
}
class Handler_1 {
    info: string;
    onClickGood(this: void, e: Event):void {
        console.log('clicked!');
    }
    onClockGood_1 = (e: Event) => { this.info = e.message }
}

// 重载(编译器能够选择正确的检查类型)
// 方法是为同一个函数提供多个函数类型定义来进行函数重载。 编译器会根据这个列表去处理函数的调用。 
// function pickCard_1(x: {suit: string; card: number;}[]): number;
// function pickCard_2(x: number): {suit: string; card: number;}
// function pickCard_3(x): any {
//     if (typeof x == "object") {
//         let pickedCard = Math.floor(Math.random() * x.length);
//         return pickedCard;
//     }else if (typeof x == "number") {
//         let pickedSuit = Math.floor(x / 13);
//         return { suit: suits[pickedSuit], card: x % 13 };
//     }
// }






























