// 名称空间

// 【内部模块】现在叫【名称空间】，任何使用module关键字来声明一个内部模块的地方都应该使用namespace关键字来替换。可以防止名称冲突.

// 所有的验证器都放在一个文件中

// interface StringValidator {
//     isAcceptable(s: string): boolean;
// }

// 随着验证器数量的增加，需要重新组织代码。以便记录他们的类型的同时还不用担心与其他对象产生命名冲突。
namespace Validation_14 {
    // 让外部也能访问
    export interface StringValidator {
        isAcceptable(s: string):boolean;
    }
    const lettersRegexp = /^[A-Za-z]+$/;
    const numberRegexp = /^[0-9]+$/;

    export class LettersOnlyValidator implements StringValidator {
        isAcceptable(s: string) {
            return lettersRegexp.test(s);
        }
    }

    export class ZipCodeValidator implements StringValidator {
        isAcceptable(s: string){
            return numberRegexp.test(s);
        }
    }

}

// 分离到多个文件（当应用变大时，需要将代码分离到不同的文件中便于维护）
// 参考namespace_demo

// 别名
// 简化命名空间操作的方法是使用import q = x.y.z给常用的对象起一个短的名字。
namespace Shapessssssss{
    export namespace Polygons {
        export class Triangle {}
        export class Square {}
    }
}

// import polygon = Shapessssssss.Polygons;
// let sq = new polygons.Square()

// 使用其他JavaScript库
// 为了描述不是用TypeScript编写的类库的类型，我们需要声明类库导出的API。 
// 由于大部分程序库只提供少数的顶级对象，命名空间是用来表示它们的一个好办法。
// 我们称其为声明是因为它不是外部程序的具体实现。 我们通常在 .d.ts里写这些声明。 
// 如果你熟悉C/C++，你可以把它们当做 .h文件。


// 外部命名空间
// 声明不会被编译
declare namespace D3 {
    export interface Selectors {
        select: {
            (selector: string): Selection;
            (element: EventTarget): Selection;
        };
    }

    export interface Event {
        x: number;
        y: number;
    }

    export interface Base extends Selectors {
        event: Event;
    }
}

declare var d3: D3.Base;