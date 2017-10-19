/**
 * 管理函数队列的对象
 * 
 * 
 */

(function(W) {

    // 这是一个闭包环境
    // 这是一些状态类的变量

    var _callbacks_list = [];

    var self = {};

    // callback队列操作类
    self.add = function() {

        if (!_callbacks_list) {
            console.error("internal error!")
            return this;
        }

        // 往list写callback,可能是数组也可能是function
        (function add() {})(arguments);



        return this;
    };
    self.remove = function() {};
    self.has = function() {};
    self.empty = function() {};

    // callback状态类
    self.disable = function() {};
    self.disabled = function() {};
    self.lock = function() {};
    self.locked = function() {};

    // callback执行类
    self.fireWith = function() {};
    self.fire = function() {};
    self.fired = function() {};

    return self;

})({})


//这个函数常见的应用场景是事件触发机制，也就是设计模式中的观察者（发布、订阅机制），目前Callbacks对象用于queue、ajax、Deferred对象中