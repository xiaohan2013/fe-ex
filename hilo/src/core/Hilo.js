/**
 * Hilo 1.0.0 for standalone
 * Copyright 2015 alibaba.com
 * Licensed under the MIT License
 */
(function(window){
/**
 * Hilo
 * Copyright 2015 alibaba.com
 * Licensed under the MIT License
 */

/**
 * @namespace Hilo的基础核心方法集合。
 * @static
 * @module hilo/core/Hilo
 */
var Hilo = (function(){

var win = window, 
    doc = document, 
    docElem = doc.documentElement,
    uid = 0;

return {
    /**
     * 获取一个全局唯一的id。如Stage1，Bitmap2等。
     * @param {String} prefix 生成id的前缀。
     * @returns {String} 全局唯一id。
     */
    getUid: function(prefix){
        var id = ++uid;
        if(prefix) return prefix + "_" + id;
        return id;
    },

    /**
     * 简单的浅复制对象。
     * @param {Object} target 要复制的目标对象。
     * @param {Object} source 要复制的源对象。
     * @param {Boolean} strict 指示是否复制未定义的属性，默认为false，即不复制未定义的属性。
     * @returns {Object} 复制后的对象。
     */
    copy: function(target, source, strict){
        for(var key in source){
            if(!strict || target.hasOwnProperty(key) || target[key] !== undefined){
                target[key] = source[key];
            }
        }
        return target;
    },

    /**
     * 浏览器特性集合。包括：
     * <ul>
     * <li><b>jsVendor</b> - 浏览器厂商CSS前缀的js值。比如：webkit。</li>
     * <li><b>cssVendor</b> - 浏览器厂商CSS前缀的css值。比如：-webkit-。</li>
     * <li><b>supportStorage</b> - 是否支持本地存储localStorage。</li>
     * <li><b>supportTouch</b> - 是否支持触碰事件。</li>
     * <li><b>supportCanvas</b> - 是否支持canvas元素。</li>
     * </ul>
     */
    browser: (function(){
        var ua = navigator.userAgent;
        var data = {
            iphone: /iphone/i.test(ua),
            ipad: /ipad/i.test(ua),
            ipod: /ipod/i.test(ua),
            ios: /iphone|ipad|ipod/i.test(ua),
            android: /android/i.test(ua),
            webkit: /webkit/i.test(ua),
            chrome: /chrome/i.test(ua),
            safari: /safari/i.test(ua),
            firefox: /firefox/i.test(ua),
            ie: /msie/i.test(ua),
            opera: /opera/i.test(ua),
            supportTouch: 'ontouchstart' in win,
            supportCanvas: doc.createElement('canvas').getContext != null,
            supportStorage: false,
            supportOrientation: 'orientation' in win,
            supportDeviceMotion: 'ondevicemotion' in win
        };

        //`localStorage` is null or `localStorage.setItem` throws error in some cases (e.g. localStorage is disabled)
        try{
            var value = 'hilo';
            localStorage.setItem(value, value);
            localStorage.removeItem(value);
            data.supportStorage = true;
        }catch(e){ };

        //vendro prefix
        data.jsVendor = data.webkit ? 'webkit' : data.firefox ? 'Moz' : data.opera ? 'O' : data.ie ? 'ms' : '';
        data.cssVendor = '-' + data.jsVendor + '-';

        return data;
    })(),

    /**
     * 事件类型枚举对象。包括：
     * <ul>
     * <li><b>POINTER_START</b> - 鼠标或触碰开始事件。对应touchstart或mousedown。</li>
     * <li><b>POINTER_MOVE</b> - 鼠标或触碰移动事件。对应touchmove或mousemove。</li>
     * <li><b>POINTER_END</b> - 鼠标或触碰结束事件。对应touchend或mouseup。</li>
     * </ul>
     */
    event: (function(){
        var supportTouch = 'ontouchstart' in win;
        return {
            POINTER_START: supportTouch ? 'touchstart' : 'mousedown',
            POINTER_MOVE: supportTouch ? 'touchmove' : 'mousemove',
            POINTER_END: supportTouch ? 'touchend' : 'mouseup'
        };
    })(),

    /**
     * 可视对象对齐方式枚举对象。包括：
     * <ul>
     * <li><b>TOP_LEFT</b> - 左上角对齐。</li>
     * <li><b>TOP</b> - 顶部居中对齐。</li>
     * <li><b>TOP_RIGHT</b> - 右上角对齐。</li>
     * <li><b>LEFT</b> - 左边居中对齐。</li>
     * <li><b>CENTER</b> - 居中对齐。</li>
     * <li><b>RIGHT</b> - 右边居中对齐。</li>
     * <li><b>BOTTOM_LEFT</b> - 左下角对齐。</li>
     * <li><b>BOTTOM</b> - 底部居中对齐。</li>
     * <li><b>BOTTOM_RIGHT</b> - 右下角对齐。</li>
     * </ul>
     */
    align: {
        TOP_LEFT: 'TL', //top & left
        TOP: 'T', //top & center
        TOP_RIGHT: 'TR', //top & right
        LEFT: 'L', //left & center
        CENTER: 'C', //center
        RIGHT: 'R', //right & center
        BOTTOM_LEFT: 'BL', //bottom & left
        BOTTOM: 'B', //bottom & center
        BOTTOM_RIGHT: 'BR' //bottom & right
    },
 
    /**
     * 根据参数id获取一个DOM元素。此方法等价于document.getElementById(id)。
     * @param {String} id 要获取的DOM元素的id。
     * @returns {HTMLElement} 一个DOM元素。
     */
    getElement: function(id){
        return doc.getElementById(id);
    },
    /**
     * 获取DOM元素在页面中的内容显示区域。
     * @param {HTMLElement} elem DOM元素。
     * @returns {Object} DOM元素的可视区域。格式为：{left:0, top:0, width:100, height:100}。
     */
    getElementRect: function(elem){
        try{
            //this fails if it's a disconnected DOM node
            var bounds = elem.getBoundingClientRect();
        }catch(e){
            bounds = {top:elem.offsetTop, left:elem.offsetLeft, width:elem.offsetWidth, height:elem.offsetHeight};
        }

        var offsetX = ((win.pageXOffset || docElem.scrollLeft) - (docElem.clientLeft || 0)) || 0;
        var offsetY = ((win.pageYOffset || docElem.scrollTop) - (docElem.clientTop || 0)) || 0;
        var styles = win.getComputedStyle ? win.getComputedStyle(elem) : elem.currentStyle;

        var parseIntFn = parseInt;
        var padLeft = (parseIntFn(styles.paddingLeft) + parseIntFn(styles.borderLeftWidth)) || 0;
        var padTop = (parseIntFn(styles.paddingTop) + parseIntFn(styles.borderTopWidth)) || 0;
        var padRight = (parseIntFn(styles.paddingRight) + parseIntFn(styles.borderRightWidth)) || 0;
        var padBottom = (parseIntFn(styles.paddingBottom) + parseIntFn(styles.borderBottomWidth)) || 0;
        var top = bounds.top || 0;
        var left = bounds.left || 0;

        return {
            left: left + offsetX + padLeft,
            top: top + offsetY + padTop,
            width: bounds.right - padRight - left - padLeft,
            height: bounds.bottom - padBottom - top - padTop
        };
    },

    /**
     * 创建一个DOM元素。可指定属性和样式。
     * @param {String} type 要创建的DOM元素的类型。比如：'div'。
     * @param {Object} properties 指定DOM元素的属性和样式。
     * @returns {HTMLElement} 一个DOM元素。
     */
    createElement: function(type, properties){
        var elem = doc.createElement(type), p, val, s;
        for(p in properties){
            val = properties[p];
            if(p === 'style'){
                for(s in val) elem.style[s] = val[s];
            }else{
                elem[p] = val;
            }
        }
        return elem;
    },

  
};

})();
window.Hilo = Hilo;
})(window);