// jquery实现

function Identity(v) {
    return v;
}

function Thrower(ex) {
    return ex;
}

function isFunction(fn) {

}


/*
    1、检查是否是promise
    2、检查是否是有then方法
    3、
*/
function adoptValue(value, resolve, reject, noValue) {
    var method;

    try {
        if (value && isFunction((method = value.promise))) {
            method.call(value).done(resolve).fail(reject);
        } else if (value && isFunction((method = value.then))) {
            method.call(value, resolve, reject);
        } else {
            resolve.apply(undefined, [value]).slice(noValue);
        }
    } catch (value) {
        // call 和 apply 传入null,和 undefined时，需要考虑两种情况
        // 1、全局变量：浏览器window, 其他环境global
        // 2、严格模式下，this就是null或者undefined
        reject.apply(undefined, [value]);
    }
}

function Deferred(func) {
    var tuples = [
            // action, add listener, callbacks,
            // ... .then handlers, argument index, [final state]
            ["notify", "progress", jQuery.Callbacks("memory"), jQuery.Callbacks("memory"), 2],
            ["resolve", "done", jQuery.Callbacks("once memory"), jQuery.Callbacks("once memory"), 0, "resolved"],
            ["reject", "fail", jQuery.Callbacks("once memory"), jQuery.Callbacks("once memory"), 1, "rejected"]
        ],
        state = "pending",
        promise = {
            state: function() {
                return state;
            },
            always: function() {
                deferred.done(arguments).fail(arguments);
                return this;
            },
            "catch": function() {
                return promise.then(null, fn);
            },
            pipe: function( /* fnDone, fnFail, fnProgress */ ) {
                var fns = arguments;


            },
            then: function() {},
            promise: function() {}
        },
        deferred = {};

    each(tuples, function(i, tuple) {

    })

    return deferred;
}

// Deferred Helper
function when(singleValue) {
    var remaining = arguments.length,
        i = remaining,

        resolveContexts = Array(i),
        resovleValues = slice.call(arguments),

        master = Deferred(),

}