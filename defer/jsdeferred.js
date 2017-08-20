/**
* 异步回调
* 
* @url: https://github.com/cho45/jsdeferred
*/

function Deferred() {
    return (this instanceof Deferred) ? this.init() : new Deferred()
}

Deferred.ok = function(x){
    return x;
}

Deferred.ng = function(x){
    return x;
}

Deferred.prototype = {
    constructor: Deferred,
    init: function(){
        this._next = null;
        this.callback = {
            ok: Deferred.ok,
            ng: Deferred.ng
        }
        return this;
    },
    next: function(func){
        return this._post("ok", func)
    },
    _post: function(okng, func) {
        this._next = new Deferred();
        this._next.callback[okng] = func;
        return this._next;
    },
    call: function(val){
        return this._fire("ok", val)
    },
    _fire: function(okng, val) {
        var next = "ok";
        try {
            value = this.callback[okng].call(this, val)
        } catch(e) {
            next = "ng";
            value = e;
        }
        if( value instanceof Deferred ) {
            value._next = this._next;
        } else {
            if(this._next){
                this._next._fire(next, value)
            }
        }
        return this;
    },
    error: function(func){
        return this._post('ng', func)
    },
    fail: function(err){
        return this._fire('ng', err)
    },
    cancel: function(){
        (this.canceller || function(){

        })();
        return this.init();
    }
}