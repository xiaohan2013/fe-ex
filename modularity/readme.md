## 模块化

> commonjs形式
> module.exports = {}

> rollup形式(es6)
> export default {}
> 被转换为=> 
> 'use strict';
> var main = {}
> module.exports = main
> babel转换为
> 'use strict';
> Object.defineProerty(exports, "__esModule", {
    value: true
});
exports.default = {}

> 在 babel 5 时代， export default {}; 除了会被转译成 exports.default = {};，还会加一句 module.exports = exports.default，这样就是楼主想要的整个模块，但在 babel6 时代做了一个区分，后面这句不再添加。这是为什么呢？在我看来，主要是为了区分 commonJS 和 es6 的模块定义，也就是 commonJS的 require 和 module.exports 搭配使用，而 import 则是和 export 搭配使用，因为在 babel 中，虽然是输出到 exports.default上，但 import 也会对应的默认去拿 default 下的模块，相当于 require(xxx)['default']。如果楼主非想要回到 babel5 时候的表现的话，babel6 有一个 plugin 可以做到。https://www.npmjs.com/package/babel-plugin-add-module-exports



## 模块化的工具
* rollup
* babel
