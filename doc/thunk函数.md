## Thunk函数

[Thunk 函数的含义和用法](http://www.ruanyifeng.com/blog/2015/05/thunk.html)


### Thunk是什么

所谓的函数参数传递问题，包括给函数的参数传递值还是传递参数名称的问题。
而thunk传递的就是按名称传递。


### js中的thunk

这样能够将需要传递很多个参数的函数，在使用时可以减少其参数

```javascript
var thunk = function(){
    return function(){
        var args = Array.prototype.slice.call(arguments);
        return function(callback){
            args.push(callback);
            return fn.apply(this, args)
        }
    }
}


function thunkify(fn){
    return function(){
        var args = new Array(arguments.length);
        var ctx = this;

        for(var i = 0; i < args.length; i++){
            args[i] = argumetns[i]
        }

        return function(done){
            // 确保了回调函数只执行一次
            var called;

            args.push(function(){
                if(called) return;
                called = true;
                done.apply(null, arguments)
                })

            try{
                fn.apply(ctx, args)
            } catch(err){
                done(err)
            }
        }
    }
}

function f(a, b, callback){
  var sum = a + b;
  callback(sum);
  callback(sum);
}

var ft = thunkify(f);
ft(1, 2)(console.log); 
// 3

```




## 执行流程的控制

```js

function run(fn){
    
}



1、执行流程的控制


```



Thunk 函数并不是 Generator 函数自动执行的唯一方案。
因为自动执行的关键是，必须有一种机制，自动控制 Generator 函数的流程，接收和交还程序的执行权。
回调函数可以做到这一点，Promise 对象也可以做到这一点。