/**
*
*   Defer
*
*   Author: xiaohan2013
*   Date: 2017-08-20
*/

/*
    改变函数的执行上下文
    @fn: 
    @scope: fn执行的上下文
    @args: fn执行的参数
    @return: 返回个函数
*/
function curry(fn, scope, args) {
    return function(){
        var argv = [].cancat.apply(args, arguments);
        return fn.apply(scope, argv)
    }
}


Deferred = function( cannceler ) {
    this.chain = [];
    this.id = setTimeout("1");
    this.fired = -1;
    this.paused = 0;
    this.results = [null, null];
    this.cannceler = cannceler;
    this.silentlyCancelled = false;
    this.chanined = false;
    return this;
}

Deferred.prototype = {
    constructor: Deferred,
    // 3种状态： 未触发， 触发成功， 触发失败
    state: function() {
        if( this.fired == -1) {
            return 'undefined'
        } else if(this.fired == 0) {
            return 'success'
        } else {
            return 'error'
        }
    },
    // 取消触发，类似于ajax的abort
    cancel: function(e){
        if( this.fired == -1) {
            // 只有未触发才能canncel
            if( this.cannceler ) {
                this.cannceler(this)
            } else {
                this.silentlyCancelled = true;
            }

            if( this.fired == -1 ){
                if(!(e instanceof Error)){
                    e = new Error(e + "")
                }
                this.errback(e);
            }
        } else if((this.fired === 0) && (this.results[0] instanceof Deferred)) {
            this.results[0].cancel[0]
        }
    },
    // 决定用哪个队列
    _resback: function(res){
        this.fired = ((res instanceof Error) ? 1 : 0)
        this.results[this.fired] = res;
        if( this.paused === 0) {
            this._fire();
        }
    },
    // 判定是否触发
    _check: function(){
        if(this.fired !== -1) {
            if(!this.silentlyCancelled) {
                throw new "此方法已经被调用过"
            }
            this.silentlyCancelled = false;
            return;
        }
    },
    // 触发成功队列
    callback: function(res){
        this._check()
        if( res instanceof Deferred ) {
            throw new Error("Deferred instances can only be chanined if they are the result of a callback")
        }
        this._resback(res)
    },
    // 触发错误队列
    errback: function(res){
        this._check();
        if( res instanceof Deferred ) {
            throw new Error("Deferred instances can only be chanined if they are the results of a callback")
        }
        if(!(res instanceof Deferred)) {
            res = new Error(res + "")
        }
        this._resback(res)
    },
    // 同时添加成功和失败回调
    addBoth: function(a, b){
        b = b || a
        return this.addCallbacks(a, b)
    },
    // 添加成功回调
    addCallback: function(fn){
        if( arguments.length > 1) {
            // 只取第一个参数，舍弃其他的
            var args = [].slice.call(arguments, 1)
            fn = curry(fn, window, args)
        }
        return this.addCallbacks(fn, null)
    },
    // 添加错误回调
    addErrback: function(fn){
        if( arguments.length > 1) {
            // 只取第一个参数，舍弃其他的
            var args = [].slice.call(arguments, 1)
            fn = curry(fn, window, args)
        }
        return this.addCallbacks(null, fn)
    },
    // 同时添加成功回调与错误回调，后来Promise的then方法也是参考其设计
    addCallbacks: function(cb, eb){
        if(this.chanined){
            throw new Error("chanined Deferred can not be re-use")
        }

        if(this.finalized){
            throw new Error("Finalized Deferred can not be re-used")
        }

        this.chain.push([cb, eb]);
        if( this.fired > 0) {
            this._fire();
        }
        return this;
    },
    // 将队列的回调依次触发
    _fire: function(){
        var chain = this.chain;
        var fired = this.fired;
        var res = this.results[fired];
        var self = this;
        var cb = null;

        while( chain.length >0 && this.paused === 0) {
            var pair = chain.shift();
            var f = pair[fired]
            if( f === null ) {
                continue;
            }
            try{
                res = f(res)
                fired = ((res instanceof Error) ? 1 :0 );
                if( res instanceof Deferred ) {
                    cb = function(res) {
                        self.paused--;
                        self._resback(res)
                    }
                    this.paused++;
                }
            } catch(err) {
                fired = 1;
                if(!(err instanceof Error)) {
                    try {
                        err = new Error(err + "")
                    } catch (e) {
                        alert(e)
                    }
                }

                res = err;
            }
        }

        this.fired = fired;
        this.results[fired] = res;
        if(cb && this.paused) {
            res.addBoth(cb);
            res.chanined = true;
        }
    }
}