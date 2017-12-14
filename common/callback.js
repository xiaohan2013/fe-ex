/**
    管理桂雕队列
    返回一个对象，

*/


var optionsCache = {};



var rnothtmlwhite = ' ';

function createOptions( options ){
    // var o = {};

    // var _opts = options.match(rnothtmlwhite) || [];
    var object = optionsCache[ options ] = {};

    each( options.splite( core_rspace ), function( _, flag ){
        object[ flag ] = true;
    } )

    return object;
}


function extend(){
    var dest , source, deep = false;

    // destination

    // source 

    // deep : 是否深度拷贝


    // 处理深度复制
    if( typeof target === 'boolean' ) {
        deep = target;

    }
}


function each() {

}

function inArray(){}

function Callbacks( options ){
    options = typeof options === 'string' ? createOptions( options ) : extend( {}, options );
    var firing,
        memory,
        fired,
        // 回调函数列表
        list = [],
        // fire调用参数栈
        stack = !options.once || [],
        locked,
        queue = [],
        firingIndex = -1;

    var fire = function( data ){
        memory = options.memory && data;
        fired = true;

        firingIndex = firingStart || 0;
        firingStart = 0;
        firingLength = list.length;

        // 正在ifire
        firing = true;
        for(; list && firingIndex < firingLength; firingIndex++) {
            if( list[ firingIndex ].apply( data[0], data[1] ) === false && options.stopOnFalse ) {
                // 在memory模式下，如果返回false，后续新增的回调也不在执行
                memory = false;
                break;
            }
        }

        // fire结束
        firing = false;
        if( list ) {
            if( stack ) {
                if( stack.length ) {
                    fire( stack.shift() );
                }
            }else if( memory ) {
                list = [];
            }else {
                // 如果是once模式，但不是memory模式，直接禁用整个callback
                self.disable()
            }
        }
    };

    // 真正的callback对象
    var self = {
        add: function(){

            var start = list.length;

            (function add( args ){ 
                each( args, function(_, arg ){
                    var type = type( arg );
                    if( type === "function" ) {
                        if( !options.unique || !self.has( arg ) ) {
                            list.push( arg)
                        }
                    }else if( arg && arg.length && type != "string") {
                        add( arg )
                    }
                })
            })( arguments );

            if( firing ) {
                firingLength = list.length;
            }

            return this;
        },
        remove: function(){
            if( list ) {
                each( arguments, function( _, arg ){
                    var index = 0;
                    while( ( index === inArray( arg, list, index ) ) > -1 ) {
                        /// 移除函数
                        list.splice( index , 1);

                        if( firing ) {
                            if( index <= firingLength ) {
                                firingLength--;
                            }
                            if( index <= firingIndex ) {
                                firingIndex--;
                            }
                        }
                    }
                })
            }

            return this;
        },
        has: function( fn ){
            return inArray(fn, list) > -1;
        },
        empty: function(){
            list = [];
            return this;
        },
        disable: function(){
            // 禁用list, once模式下fire方法有用到
            list = stack = memory = undefined;
            return this;
        },
        disabled: function(){
            return !list;
        },
        lock: function(){
            stack = undefined;
            if( !memory ) {
                self.disable();
            }
            return this;
        },
        locked: function(){
            return !stack;
        },
        fireWith: function( context, args ){
            // 用所给的context和arguments执行全部的对调函数
            args = args || [];
            args = [ context, args.slice ? args.slice() : args ];

            // 还没有被fire过或者是memory模式
            if( list && (!fired || stack )) {
                if( firing ) {
                    stack.push( args )
                } else {
                    fire( args );
                }
            }
        },
        fire: function(){
            self.fireWith( this, arguments );
            return this;
        },
        fired: function(){
            return !!fired;
        }
    }
    return self;
}

