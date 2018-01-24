## 手写promise

[手把手教你实现一个完整的 Promise](https://www.cnblogs.com/huansky/p/6064402.html)

``` js

    function Promise(fn){
        var callback;

        // 注册异步的回调
        this.then = function(done) {
            callback = done;
        }

        // 异步回调的执行
        function resolve(){
            callback();
        }
    
        // 需要包裹的异步
        fn(resolve)
    }


```

