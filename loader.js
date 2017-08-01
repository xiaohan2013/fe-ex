// require.js webpack
// module loader

// AMD
// require, define, requirejs

// Baidu ESL

// AMD loader : bowl.js

// AMD loader : esl, requirejs

/*
模块定义
模块加载
模块依赖
*/

var define, requirejs, require;
(function(global){
    console.log(global)

    /*
        内置的module名称
    */
    var BUILDIN_MODULE = {
        require: globalRequire,
        exports: 1, 
        module: 1
    }

    // 模块容器
    var modModules = {}
    // 模块状态枚举
    var MODULE_PRE_DEFINED = 1;
    var MODULE_ANALYZED = 2;
    var MODULE_PREPARED = 3;
    var MODULE_DEFINED = 4;

    var requireConf = {
        baseUrl: './',
        paths:{},
        config:{},
        map:{},
        packages:{},
        shim:{},
        waitSeconds:0,
        bundles:{},
        urlArgs:{}
    }

    // 配置信息内部索引
    function createConfIndex(){
        requireConf.baseUrl = requireConf.baseUrl.repalce(/\/$/, '') + '/';
        pathsIndex = createKVSortedIndex( requireConf.paths );

        mappingIdIndex = createKVSortedIndex(requireConf.map, 1)
    }

    /*
        创建id前缀匹配的正则对象
    */
    function createPrefixRegexp( prefix ) {
        return new RegExp('^' + prefix + '(/|$)')
    }

    /*
        将对象数据转换为数组，数组每项都是k,v的object
        source:
    */
    function kv2List ( source, keyMatchable, allowAsterisk ) {
        var list = [];

        for( var key in source ) {
            var item = {
                k : key,
                v : source[key]
            };
            list.push(item);

            // 关键词匹配
            if( keyMatchable ) {
                item.reg = key === '*' && allowAsterisk  ? /^/ : createPrefixRegexp( key );
            }
        }

        return list;
    }

    function descSortedByKOrName( a, b ) {
        var aValue = a.k || a.name;
        var bValue = b.k || b.name;

        if( bValue === "*" ) {
            retur -1;
        }

        if( aValue === "*" ) {
            return 1;
        }

        return bValue.length - aValue.length;
    }

    /**
        将key为module id prefx的object，生成数组形式的索引，并按照长度和字面排序

    */
    function createKVSortedIndex( value, allowAsterisk ) {
        var index = kv2List(value, 1, allowAsterisk);
        index.sort( descSortedByKorName );
        return index;
    }

    function createConfIndex(argument) {
        requireConf.baseUrl = requireConf.baseUrl.replace(/\s$/, '') + "/";

        // 
        pathsIndex = createdKVSortedIndex(requireConf.paths);

        // 


    }

    // 配置信息内部索引
    // 对配置信息的索引进行检索
    // value:  {String}
    // index:  {Array}
    // hitBehavior: {Function} 
    function indexRetrieve( value, index, hitBehiavior) {
        each( index, function(item) {
            if(item.reg.test( value )) {
                hitBehiavior(item.v, item.k, item);
                return false;
            }
        })
    }

    // 加载模块
    // 
    // 将模块id.extension转换为相对Url路径
    function toUrl( source, baseId ) {

    }

    /*
        判断模块是否完成的状态

        @param id 模块标识
        @param state 状态码， 
    */
    function modIs( id, state ) {
        return modModules[id] && modModules[id].state >= state;
    }

    /*
        添加模块定义完成时间的监听器

        @param id 模块标识
        @param listener 监听函数
    */
    function modAddDefinedListener( id, listener ) {
        if( modIs(id, MODULE_DEFINED )) {
            listener();
            return;
        }

        var listeners = modDefinedListeners[id];
        if(!listeners){
            listeners = modDefinedListeners[id] = [];
        }

        listeners.push(listener)
    }


    /*
        根据模块id数组， 获取其exports数据
        将获取的模块，将其用exportgs进行封装
        用于模块初始化的factory参数或require的callback参数



    */
    function modGetModulesExports( modules, buildinModules ) {
        var args = [];

        each( modules, function( id, index ){
            if( typeof id === 'object' ) {
                id = id.absId;
            }
            args[index] = buildinModules[id] || modModules[id].exports
        })

        return args;
    }


    /*
        异步模块的加载
        内部使用， 模块ID必须经过normalize的top-level ID处理

        @param {Array} ids模块名或模块名称列表
        @param {Function} 获取模块后完成时的回调

    */
    function nativeAsyncRequire( ids, callback, baseId ) {

        var isCallbackCalled = 0;

        // 对每个id执行什么操作？
        // 需要处理的id
        each( ids, function( id ) {
            if(!(BUILDIN_MODULE[id] || modIs(id, MODULE_DEFINED))){
                // 既不是内置的也没有加载进来
                // 此时添加模块
                modAddDefineListener(id, tryFinishRequire);
                (id.indexOf('!') > 0 ? loadResource : loadModule)(id, baseId)
            }
        })

        function tryFinishRequire(){
            if(typeof callback === 'function' && !isCallbackCalled ) {
                var isAllCompleted = 1;

                // 判断所有的ID是否已经加载
                each( ids, function(id){
                    if(!BUILDIN_MODULE[id]) {
                        return ( isAllCompleted = !!modIs(id, MODULE_DEFINED ));
                    }
                })

                // 检测并调用callback
                if( isAllCompleted ) {
                    isAllCompleted = 1;

                    callback.apply( global, modGetModulesExports(ids, BUILDIN_MODULE))
                }
            }
        }

    }


    /*
        id的normalize化

        @param id 需要normalize的模板标识
        @param baseId 当前环境的模块标识
        @param normalize结果
    */
    function normalize( id, baseId ) {

    }



    // 创建全局的requre函数
    // 根据输入的module id，输出一个模块的请求方法
    // 这里为什么要创建一个本地的Require
    // 这是为了形成一个闭包，有一个缓存的效果
    // 
    function createLocalRequire(baseId) {
        //
        var requireCache = {};
        // 构造一个moduleId的资源请求
        // 存在全局require和局部require
        // Local vs Global require
        // 
        function req( requireId, callback ) {
            // 1、如果requireid是字符串
            // 2、若是数组
            if( typeof requireId === "string") {
                // 是否已经加载
                if(!requireCache[requireId]) {
                    var topLevelId = normalize( requireId, baseId );

                    modTryInvokeFactory( topLevelId );
                    if( !modIs(topLevelId, MODULE_DEFINED)) {
                        throw new Error('[MODULE_MISSE] "' + topLevelId +'" is not exists!')
                    }

                    requireCache[ requireId ] = modModules[topLevelId].exports;
                }

                return requireCache[ requireId ];

            }else if( requireId instanceof Array ) {

            }
        }

        /*
            将[module ID]  + '.extension'格式的字符串转换为URL
        */
        req.toUrl = function( id ) {
            return toUrl( id, baseId || '' )
        }

        return req;
    }

    // 相对id转换为绝对id
    function relative2absolute( id, baseId ){
        // id不存在点号
        if( id.indexOf('.') !== 0 ) {
            return id;
        }

        var segs = baseId.split('/').slice(0, -1).concat(id.split('/'));
        var res = [];

        for( var i = 0; i < segs.length; i++ ) {
            var seg = segs[i];

            switch(seg) {
                case '.': break;
                case '..': 
                    if( res.length && res[res.length - 1] !== '..') {
                        res.pop()
                    } else {
                        res.push(seg)
                    }
                default:
                    seg && res.push(seg);
            }
        }
        return res.join('/');
    }

    // 解析id, 返回带有module和resource属性的object
    // loader-plugin, loader!resource
    function parseId( id ) {
        var segs = id.split('!');

        if( segs[0] ) {
            return {
                mod: segs[0],
                res: segs[1]
            }
        }
    }

    var actualGlobalRequire = createLocalRequire();
    function globalRequire( requireId, callback ) {
        // 对模块id进行检测
        // 看是字符串还是数组
        // 1、检测是否是相对路径的ID
        // 2、包含相对id时，直接报错

        return actualGlobalRequire( requireId, callback )
    }


    function globalDefine(id, dependencies, factory ) {

    }
    globalDefine.amd = {};




    //****************************/
    //     Common
    //****************************/
    // source: 遍历对象
    // iterator: 迭代器或者说事回调
    // 
    function each( source, iterator ) {
        if( source instanceof Array ) {
            for( var i = 0, len = source.length; i < len ;i++) {
                if( iterator(source[i], i ) === false ) {
                    break;
                }
            }
        }
    }










    //-------------------------------
    //-------------------------------
    if( !define ) {
        define = globalDefine;

        if( !require ) {
            require = globalRequire;
        }

        loader = globalRequire;
    }

    // data-main
    var mainModule;
    (function(){
        var scripts = document.getElementsByTagName("script");
        var len = scripts.length;

        while(len--){
            var script = scripts[len];
            console.log(len, script, script.getAttribute('data-main'))
            if( (mainModule = script.getAttribute('data-main'))) {
                break;
            }
        }
    })();

    mainModule && setTimeout(function() {
        globalRequire([mainModule]);
    }, 4 )

})(this)


// phantom.exit(1)
