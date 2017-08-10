/**
 * Hilo 1.0.0 for standalone
 * Copyright 2015 alibaba.com
 * Licensed under the MIT License
 */
(function(window){
var Hilo = window.Hilo;
var Class = Hilo.Class;
var Renderer = Hilo.Renderer;
var Drawable = Hilo.Drawable;
/**
 * Hilo
 * Copyright 2015 alibaba.com
 * Licensed under the MIT License
 */

/**
 * @class DOM+CSS3渲染器。将可视对象以DOM元素方式渲染出来。舞台Stage会根据参数canvas选择不同的渲染器，开发者无需直接使用此类。
 * @augments Renderer
 * @param {Object} properties 创建对象的属性参数。可包含此类所有可写属性。
 * @module hilo/renderer/DOMRenderer
 * @requires hilo/core/Class
 * @requires hilo/core/Hilo
 * @requires hilo/core/Drawable
 * @requires hilo/renderer/Renderer
 */
var DOMRenderer = (function(){

return Class.create({
    Extends: Renderer,
    constructor: function(properties){
        DOMRenderer.superclass.constructor.call(this, properties);
    },
    renderType:'dom',
    /**
     * 为开始绘制可视对象做准备。需要子类来实现。
     * @param {View} target 要绘制的可视对象。
     */
    startDraw: function(target){ 
        var drawable = (target.drawable = target.drawable || new Drawable());
        drawable.domElement = (drawable.domElement || Hilo.createElement('div', {id:target.id, style: {position: 'absolute'}}));
        var stateCache = target._stateCache || (target._stateCache = {});

        if(target.visible || target.visible != stateCache.visible){
           return true;
        }else{
           return false;
        }
    },

    /**
     * 绘制可视对象。需要子类来实现。
     * @param {View} target 要绘制的可视对象。
     */
    draw: function(target){
        DOMRenderer.setElementStyleByView(target);
    },


    /**
     * @private
     * @see Renderer#resize
     */
    resize: function(width, height){
        var style = this.canvas.style;
        style.width = width + 'px';
        style.height = height + 'px';
        if(style.position != "absolute") {
          style.position = "relative";
        }
    },
    
    Statics: /** @lends Drawable */{
        /**
         * 设置可视对象DOM元素的CSS样式。
         * @param {View} obj 指定要设置CSS样式的可视对象。
         * @private
         */
        setElementStyleByView: function(obj, ignoreView){
            var prefix = Hilo.browser.jsVendor, px = 'px', flag = false;
            var parent = obj.parent,
                drawable = obj.drawable,
                elem = drawable.domElement,
                style = elem.style,
                stateCache = obj._stateCache || (obj._stateCache = {});
            
            if(parent){
                var parentElem = parent.drawable && parent.drawable.domElement;
                if(parentElem && parentElem != elem.parentNode){
                    parentElem.appendChild(elem);
                }
            }

            if(elem != stateCache._domElement){
                stateCache = obj._stateCache = {};
                stateCache._domElement = elem;
            }
            if(this.cacheStateIfChanged(obj, ['visible'], stateCache)){
                style.display = (!obj.visible) ? "none" : "";
            }
            if(this.cacheStateIfChanged(obj, ['alpha'], stateCache)){
                style.opacity = obj.alpha;
            }
            if(!obj.visible || obj.alpha <= 0) return;

            if(this.cacheStateIfChanged(obj, ['width'], stateCache)){
                flag = true;
                style.width = obj.width + px;
            }
            if(this.cacheStateIfChanged(obj, ['height'], stateCache)){
                flag = true;
                style.height = obj.height + px;
            }
            if(this.cacheStateIfChanged(obj, ['depth'], stateCache)){
                style.zIndex = obj.depth + 1;
            }
            if(this.cacheStateIfChanged(obj, ['clipChildren'], stateCache)){
                style.overflow = obj.clipChildren?'hidden':null;
            }
            if(flag || this.cacheStateIfChanged(obj, ['pivotX', 'pivotY'], stateCache)){
                flag = true;
                style[prefix + 'TransformOrigin'] = (obj.pivotX * obj.width) + px + ' ' + (obj.pivotY * obj.height) + px;
            }
            if(flag || this.cacheStateIfChanged(obj, ['x', 'y', 'rotation', 'scaleX', 'scaleY'], stateCache)){
                flag = true;
                style[prefix + 'Transform'] = 'translate(' + (obj.x - obj.pivotX*obj.width) + 'px, ' + (obj.y - obj.pivotY*obj.height) + 'px)' +
                                              'rotate(' + obj.rotation + 'deg)' +
                                              'scale(' + obj.scaleX + ', ' + obj.scaleY + ')';
            }

            if(ignoreView){
                style.pointerEvents = 'none';
                return;
            } 

            if(!style.pointerEvents){
                style.pointerEvents = 'none';
            }

            if(this.cacheStateIfChanged(obj, ['background'], stateCache)){
                style.backgroundColor = obj.background;
            }

            //render image as background
            var image = drawable.image;
            if(image){
                var split = drawable.split;
                if(split){
                    this.setElementStyleBySplit(stateCache, obj, flag);
                }else{
                    this.setElementStyleByImage(stateCache, obj, flag);
                }
            }else{
                stateCache.image = null;
                style.backgroundImage = null;
            }
        },
        setElementStyleByImage:function(stateCache, obj, flag){
            var drawable = obj.drawable;
            var style = drawable.domElement.style;
            var image = drawable.image;
            var rect = drawable.rect;
            var src = image.src;
            if(src !== stateCache.image){
                flag = true;
                stateCache.image = src;
                style.backgroundImage = 'url(' + src + ')';
            }

            if(rect){
                var prefix = Hilo.browser.jsVendor, px = 'px';
                var sx = rect[0], sy = rect[1], sw = rect[2], sh = rect[3];
                if(sx !== stateCache.sx){
                    stateCache.sx = sx;
                    style.backgroundPositionX = -sx + px;
                }
                if(sy !== stateCache.sy){
                    stateCache.sy = sy;
                    style.backgroundPositionY = -sy + px;
                }
                
                if(flag && (sw != obj.width || sh != obj.height)){
                    var kx = sw/obj.width, ky = sh/obj.height;
                    style.width = sw + px;
                    style.height = sh + px;
                    style[prefix + 'TransformOrigin'] = obj.pivotX*sw + px + ' ' + obj.pivotY*sh + px;
                    style[prefix + 'Transform'] = 'translate(' + (obj.x - obj.pivotX*sw) + 'px, ' + (obj.y - obj.pivotY*sh) + 'px)' +
                                              'rotate(' + obj.rotation + 'deg)' +
                                              'scale(' + obj.scaleX/kx + ', ' + obj.scaleY/ky + ')';
                }
            }
        },
        setElementStyleBySplit:function(stateCache, obj, flag){
            var drawable = obj.drawable, w = obj.width, h = obj.height;
            var prefix = Hilo.browser.jsVendor, px = 'px';
            var image = drawable.image, src = image.src;
            var rect = drawable.rect, 
                sx = (rect && rect[0]) || 0, 
                sy = (rect && rect[1]) || 0,
                sw = (rect && rect[2]) || image.width,
                sh = (rect && rect[3]) || image.height;

            if(src !== stateCache.image || sx !== stateCache.sx || sy !== stateCache.sy){
                stateCache.image = src;
                stateCache.sx = sx;
                stateCache.sy = sy;

                var split = drawable.split;
                var list = drawable.domScale9Image;
                if(list == null){
                    list = [];
                    for(var i = 0; i < 9; i++){
                        var dd = Hilo.createElement('div', {style: {position: 'absolute'}})
                        drawable.domElement.appendChild(dd);
                        list[i] = dd;
                    }
                    drawable.domScale9Image = list;
                }


                var w1 = split[0],w2=split[2],w3=sw-w1-w2,
                    h1 =split[1],h2=split[3],h3=sh-h1-h2;
                var pos = [
                    [sx + 0,     sy + 0,      w1, h1, 0,      0,      w1,     h1],
                    [sx + w1,    sy + 0,      w2, h1, w1,     0,      w-w1-w3,h1],
                    [sx + w1+w2, sy + 0,      w3, h1, w-w3,   0,      w3,     h1],
                    [sx + 0,     sy + h1,     w1, h2, 0,      h1,     w1,     h-h1-h3],
                    [sx + w1,    sy + h1,     w2, h2, w1,     h1,     w-w1-w3,h-h1-h3],
                    [sx + w1+w2, sy + h1,     w3, h2, w-w3,   h1,     w3,     h-h1-h3],
                    [sx + 0,     sy + h1+h2,  w1, h3, 0,      h-h3,   w1,     h3],
                    [sx + w1,    sy + h1+h2,  w2, h3, w1,     h-h3,   w-w1-w3,h3],
                    [sx + w1+w2, sy + h1+h2,  w3, h3, w-w3,   h-h3,   w3,     h3],
                ];

                for(var i = 0; i < 9; i++){         
                    var pp = pos[i];
                    var dd = list[i];
                    var style = dd.style;
                    style.border = 'none';
                    style.width = pp[2] + px;
                    style.height = pp[3] + px;
                    style.backgroundImage = 'url(' + src + ')';
                    style.backgroundPositionX = -pp[0] + px;
                    style.backgroundPositionY = -pp[1] + px;
                    style[prefix + 'TransformOrigin'] = '0' + px + ' 0' + px;
                    style[prefix + 'Transform'] = 'translate('+pp[4]+'px, '+pp[5]+'px) scale('+(pp[6]/pp[2]*1.001)+', '+(pp[7]/pp[3]*1.001)+')';
                }
            }
        },

        /**
         * @private
         */
        cacheStateIfChanged: function(obj, propNames, stateCache){
            var i, len, name, value, changed = false;
            for(i = 0, len = propNames.length; i < len; i++){
                name = propNames[i];
                value = obj[name];
                if(value != stateCache[name]){
                    stateCache[name] = value;
                    changed = true;
                    break;
                }
            }
            return changed;
        },
    },
});



})();

Hilo.DOMRenderer = DOMRenderer;
})(window);