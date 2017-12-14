Typesciprt内容点
-----

### 版本
> v2.4.2


### 基本用法
- [基础类型](./demo_01.ts)
- [变量声明](./demo_02.ts)
- [接口](./demo_03.ts)
- [类](./demo_04.ts)
- [函数](./demo_05.ts)
- [泛型](./demo_06.ts)
- [枚举](./demo_07.ts)
- [类型推论](./demo_08.ts)
- [类型兼容性](./demo_08.ts)
- [高级类型](./demo_09.ts)
- [Symbols](./demo_10.ts)
- [迭代器和生成器](./demo_11.ts)
- [模块](./demo_12.ts)
- [命名空间](./demo_13.ts)
- [命名空间和模块](./demo_14.ts)
- [模块的解析](./demo_15.ts)
- [声明合并](./demo_16.ts)
- [JSX](./demo_17.ts)
- [装饰器](./demo_18.ts)
- [Mixins](./demo_19.ts)
- [三斜线指令](./demo_20.ts)



### 声明文件
[结构]()


### ts的核心部件
- 模块
- 命名空间
- 命名空间和模块
- 模块解析

> 
> 
> 
> 
>


## any, void(空值), never的区别
> any类型是十分有用的，它允许你在编译时可选择地包含或移除类型检查;
> void类型的变量只能是，null和undefined;
> never类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型



## 声明文件的定义


Global Library 
* Top-level var statements or function declarations
* One or more assignments to window.someName
* Assumptions that DOM primitives like document or window exist

Module Library
* Unconditional calls to require or define
* Declarations like import * as a from 'b'; or export c;
* Assignments to exports or module.exports

There are three templates available for modules, *module.d.ts*, **module-class.d.ts** and *module-function.d.ts*.

Module Plugin or UMD Plugin
Use the module-plugin.d.ts template.
Global Plugin
Use the *global-plugin.d.ts* template.
Use the *global-modifying-module.d.ts* template.

## Consuming Dependencies
/// <reference types="..." />
1. Dependencies on Global Libraries(依赖全局库)
/// <reference types="someLib" />
function getThing(): someLib.thing;

2. Dependencies on Modules(依赖模块)
> import * as moment from "moment";
function getThing(): moment;

3. Dependencies on UMD libraries(依赖UMD库)
From a Global Library
/// <reference types="moment" />
function getThing(): moment;

From a Module or UMD Library
import * as someLib from 'someLib';



## including declarations in your npm package
要是package的main字段有\*.js文件，还需要指定main declaration文件
'''
{
    "name": "awesome",
    "author": "Vandelay Industries",
    "version": "1.0.0",
    "main": "./lib/main.js",
    "types": "./lib/main.d.ts" // 在这里的types也可以换成typings
}
'''


