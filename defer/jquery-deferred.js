


// var promiseMethods = "done fail isResolved isRejected promise then always pipe".split(" "),
//     sliceDeferred = [].slice;


// //==============v1.5.2===================================

// _Deferred = function(){
//     var
//         callbacks = [], // callback lists
//         fired, // stored [context, args]
//         firing,
//         cancelled,
//         //
//         deferred = {
//             // done(f1, f2,...)
//             done: function(){},
//             resolveWith: function(context, args){},
//             resolve: function(){},
//             isResolved: function(){},
//             cancel: function(){}
//         }
//         return deferred;
// }

// // Full fledged deferred( two callbacks list)
// Deferred = function(func){
//     var deferred = _Deferred(),
//         failDeferred = _Deferred(),
//         promise;

//     extend(deferred, {
//         then: function(doneCallbacks, failCallbacks){
//             deferred.done(doneCallbacks).fail(failCallbacks)
//             return this;
//         },
//         fail: failCallbacks.done,
//         rejectWith: failCallbacks.resolveWith,
//         reject: failCallbacks.resolve,
//         isRejected: failCallbacks.isResolved,
//         promise: function(obj){
//             if(obj == null){
//                 if(promise) {
//                     return promise;
//                 }
//                 promise = obj = {}
//             }
//             var i = promiseMethods.length;
//             while(i--){
//                 obj[ promiseMethods ] = deferred[ promiseMethods ]
//             }
//             return obj
//         }
//     })

//     deferred.done(failCallbacks.cancel).fail( deferred.cancel )
//     // Unexpose cancel
//     delete deferred.cancel

//     if( func ) {
//         func.call(deferred, deferred)
//     }
// }

// when = function( firstParam ) {
//     var args = arguments,
//         i = 0,
//         length = args.length,
//         count = length,
//         deferred = length <= 1 && firstParam && isFunction( firstParam.promise ) ?
//             firstParam :
//             Deferred();

//     function resolveFunc(i) {
//         return function( value ) {
//             args[i] = arguments.length > 1 ? sliceDeferred.call( arguments, 0 ) : value;
//             if( !(--count) ) {
//                 deferred.resolveWith( deferred , sliceDeferred.call( args, 0))
//             }
//         }
//     }

//     if( length > 1 ) {
//         for(;i < length; i++){
//             if( args[ i ] && isFunction( args[i].promise )) {
//                 args[i].promise().then( resolveFunc(i), deferred.reject );
//             }else{
//                 --count;
//             }
//         }

//         if( !count ) {
//             deferred.resolveWith( deferred, args )
//         }
//     } else if( deferred !== firstParam ) {
//         deferred.resolveWith( deferred, length ? [firstParam] : [] )
//     }

//     return deferred.promise();
// }

// //==================


(function(W){

    var Promise = {
        _Deferred: function(){
            var cancelled;
            // 标识整个deferred对象的状态
            var fired;
            // 表明是在resolve中，处于执行中
            var firing;
            var callbacks = [];

            var deferred = {
                // 将所有的回调都打入到callbacks中，并执行
                done: function(){
                    if(!cancelled){
                        var args = arguments,
                            _fired;

                        if( fired ) {
                            _fired = fired;
                            fired = 0;
                        }

                        for(var i = 0; i < args.length; i++){
                            var elem = args[i];
                            type = typeof(elem);
                            if( type === 'array'){
                                deferred.done.apply( deferred, elem )
                            } else if ( type === 'function' ) {
                                callbacks.push( elem )
                            }
                        }

                        if( _fired ) {
                            deferred.resolveWith( _fired[0], _fired[1] )
                        }
                    }
                    return this;
                },
                resolveWith: function(context, args){
                    if( !cancelled && !fired && !firing ) {
                        var args = args || [];
                        firing = 1;

                        try {
                            while( callbacks[0] ) {
                                callbacks.shift().apply( context, args )
                            }
                        }finally {
                            fired = [context, args]
                            firing = 0;
                        }
                    }
                    return this;
                },
                resolve: function(){
                    deferred.resolveWith(this, arguments)
                    return this;
                },
                isResolved: function(){
                    return !!( firing || fired )
                },
                cancel: function(){
                    cancelled = 1;
                    callbacks = [];
                    return this;
                }
            };
            return deferred;
        ,
        Deferred: function(func){
            var deferred = this._Deferred(),
                failDeferred = this._Deferred();

            Object.assign( deferred, {
                then: function( doneCallbacks, failCallbacks ) {
                    deferred.done(doneCallbacks).done(failCallbacks)
                    return this;
                },
                always: function(){
                    return deferred.done.apply( deferred, arguments ).fail.apply( this, arguments )
                },
                fail: failDeferred.done,
                rejectWith: failDeferred.resolveWith,
                reject: failDeferred.resolve,
                isRejected: failDeferred.isResolved,
                pipe: function( fnDone, fnFail ) {
                    return Deferred(function(newDefer){
                        each({
                            done: [fnDone, "resolve"],
                            fail: [fnFail, "reject"]
                        }, function( handler, data){
                            var fn = data[ 0 ],
                                action = data[ 1 ],
                                returned;

                            if( isFunction(fn) ){
                                deferred[ handler ](function(){
                                    returned =  fn.apply(this, arguments );

                                    if( isFunction(returned.promise) ) {
                                        returned.promise.then(newDefer.resolve, newDefer.reject)
                                    } else{
                                        newDefer[ action ](returned)
                                    }
                                })
                            } else {

                            }
                        })
                    }).promise();
                },
                promise: function( obj ) {
                    if( obj === null ){
                        if(promise) {
                            return promise
                        }
                        promise = obj = {}
                    }
                    var i  = promiseMethods.length;
                    while( i-- ) {
                        obj[ promiseMethods[i] ] = deferred[ promiseMethods[i] ]
                    }

                    return obj;
                }
            })

            deferred.done( failDeferred.cancel ).fail( deferred.cancel )

            delete deferred.cancel;

            if( func ) {
                func.call( deferred, deferred )
            }

            return deferred
        },
        when: function(){
            var args = arguments,
                i = 0,
                length = arguments.length,
                count = length,
                deferred = length <= 1 && firstParam && isFunction( firstParam.promise) ?
                    firstParam:
                    Deferred()

            function resolveFunc(i) {
                return function( value ) {
                    args[ i ] = arguments.length > 1 ? sliceDeferred.call( arguments, 0 ) : value;

                    if(!( --count )) {
                        deferred.resolveWith( deferred, sliceDeferred.call( args, 0 ) );
                }
            }

            if( length > 1 ) {
                for(; i < length; i++ ) {
                    if( args[i] && isFunction( args[i].promise )) {
                        args[i].promise().then( resolveFunc(i), deferred.reject )
                    } else {
                        --count;
                    }
                }
                if(!count) {
                    deferred.resolveWith( deferred, args )
                }
            } else if( deferred !== firstParam ) {
                deferred.resolveWith( deferred, length ? [firstParam] : [])
            } else {

            }

            returned deferred.promise()
        }
    }

    W.Promise = Promise;
})(this)