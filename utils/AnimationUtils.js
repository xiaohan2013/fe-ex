var now = function() {
    var _ref;
    return (_ref = typeof performance !== "undefined" && performance !== null ?
        typeof performance.now === "function" ? performance.now() : void 0 :
        void 0) != null ? _ref : +(new Date);
}

var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function(fn) { return setTimeout(fn, 1e3 / 60) };
var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;

if (requestAnimationFrame == null) {
    requestAnimationFrame = function(fn) {
        return setTimeout(fn, 50)
    }
    cancelAnimationFrame = function(id) {
        return clearTimeout(id)
    }
}

// 这个方法的设计思路
// 最外层是一个闭包，引用这fn, last
// 对外提供了一个tick执行后端闭包保存
// 这里用闭包来封装时间间隔信息
var runAnimation = function(fn) {
    var last, tick;
    last = now();
    tick = function() {
        var diff;
        diff = now() - last;
        if (diff >= 33) {
            // Don't run faster than 30 fps
            // 限制在30fps内进行的动画
            last = now();
            return fn(diff, function() {
                return requestAnimationFrame(tick);
            });
        } else {
            // 此处是在延时
            return setTimeout(tick, 33 - diff);
        }
    };
    return tick();
};






phantom.exit(1)