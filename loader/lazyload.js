// 图片延迟加载，在viewport之外的图片直到用户scroll时才加载
// image preload
//
/*
    basic options
        \--- Threshhold
        \--- Trigger
    Effects

*/

function Lazyload( func, obj ) {
    this.func = func;
    this.obj = obj;
    this.it = setInterval( function(){
        this.checkScroll();
    }.bind(this), 2000 );
}

// 
Function.prototype.bind  = function(obj) {
    var _method = this;
    return function(){
        return _method.apply( obj, arguments )
    }
}

// offset是距离父元素的顶部的距离
Lazyload.prototype.checkScroll = function() {
    var scrollY = document.body.scrollTop ||
                    document.documentElement.scrollTop ||
                    window.pageYOffset || 0, // 页面滚动条高度
        seeY = window.innerHeight || document.documentElement.clientHeight, // 浏览器可视区高度
        func = this.func;

    if(Math.abs( this.getY() - scrollY ) < seeY ) {
        clearInterval(this.it); // 清除定时器
        return func();
    }
}

Lazyload.prototype.getY = function(){
    var obj = this.obj;
    tp = obj.offsetTop;
    if( obj.offsetParent ) while( obj = obj.offsetParent ) tp += obj.offsetTop;
    return tp;
}





