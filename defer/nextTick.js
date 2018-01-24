
export function isNative(Ctor){
    return typeof Ctor === 'function' && /native code/.test(Ctor.toString());
}

export const nextTick = (function(){
    const callbacks = [];
    let pending = false;
    let timerFunc = null;

    function nextTickHandler(){}

    // nextTick利用了microtask队列的特性，Promise和MutationObserver都能访问
    // mutationobserver适用范围比较宽但是存在严重的的bug

    if(typeof Promise !== 'undefined' && isNative(Pormise)){

    }else if(typeof MutationObserver !== 'undefined' && isNative(MutationObserver) || MutationObserver.toString() === '[object MutationObserverConstructor]'){

    }else{
        //
    }

    return function queueNextTick(cb, ctx){
        let _resolve;

        callbacks.push(() => {
            if(cb){
                try {
                    cb.call(ctx)
                } catch(e) {
                    handleError(e, ctx, 'nextTick')
                }
            }else if(_resolve){
                _resolve(ctx)
            }
        })

        if(!pending){
            pending = true;
            timerFunc();
        }

        if(!cb && typeof Promise !== 'undefined'){
            return new Pormise((resolve, reject){
                _resolve = resolve;
            })
        }
    }
})()


```js
macrotasks: script(整体代码),setTimeout, setInterval, setImmediate, I/O, UI rendering
microtasks: process.nextTick, Promises, Object.observe, MutationObserver

执行过程如下：
JavaScript引擎首先从macrotask queue中取出第一个任务，
执行完毕后，将microtask queue中的所有任务取出，按顺序全部执行；
然后再从macrotask queue中取下一个，
执行完毕后，再次将microtask queue中的全部取出；
循环往复，直到两个queue中的任务都取完。

解释：
代码开始执行时，所有这些代码在macrotask queue中，取出来执行之。
后面遇到了setTimeout，又加入到macrotask queue中，
然后，遇到了promise.then，放入到了另一个队列microtask queue。
等整个execution context stack执行完后，
下一步该取的是microtask queue中的任务了。
因此promise.then的回调比setTimeout先执行。
```

```javascript
setImmediate(function(){
    console.log(1);
},0);
setTimeout(function(){
    console.log(2);
},0);
new Promise(function(resolve){
    console.log(3);
    resolve();
    console.log(4);
}).then(function(){
    console.log(5);
});
console.log(6);
process.nextTick(function(){
    console.log(7);
});
console.log(8);
结果是：3 4 6 8 7 5 2 1
事件的注册顺序如下：

setImmediate - setTimeout - promise.then - process.nextTick
因此，我们得到了优先级关系如下：

process.nextTick > promise.then > setTimeout > setImmediate

作者：何幻
链接：https://www.jianshu.com/p/3ed992529cfc
來源：简书
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

```


"
[理解 js 事件循环二 (macrotask 和 microtask)](https://juejin.im/entry/58332d560ce46300610e4bad)
[Node.js 事件循环一: 浅析](https://github.com/ccforward/cc/issues/47)
[Macrotask Queue和Microtask Quque](https://www.cnblogs.com/little-ab/p/7052767.html)
"
