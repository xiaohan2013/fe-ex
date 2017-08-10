/**
 * Hilo 1.0.0 for standalone
 * Copyright 2015 alibaba.com
 * Licensed under the MIT License
 */
(function(window){
var Hilo = window.Hilo;
var Class = Hilo.Class;
var View = Hilo.View;
var Drawable = Hilo.Drawable;
/**
 * Hilo
 * Copyright 2015 alibaba.com
 * Licensed under the MIT License
 */

/**
 * 使用示例:
 * <pre>
 * var bmp = new Hilo.Bitmap({image:imgElem, rect:[0, 0, 100, 100]});
 * stage.addChild(bmp);
 * </pre>
 * @class Bitmap类表示位图图像类。
 * @augments View
 * @param {Object} properties 创建对象的属性参数。可包含此类所有可写属性。此外还包括：
 * <ul>
 * <li><b>image</b> - 位图所在的图像image。必需。</li>
 * <li><b>rect</b> - 位图在图像image中矩形区域。</li>
 * </ul>
 * @module hilo/view/Bitmap
 * @requires hilo/core/Hilo
 * @requires hilo/core/Class
 * @requires hilo/core/Drawable
 * @requires hilo/view/View
 */
 var Bitmap = Class.create(/** @lends Bitmap.prototype */{
    Extends: View,
    constructor: function(properties){
        properties = properties || {};
        this.id = this.id || properties.id || Hilo.getUid("Bitmap");
        Bitmap.superclass.constructor.call(this, properties);

        this.drawable = new Drawable(properties);

        //init width and height
        if(!this.width || !this.height){
            var rect = this.drawable.rect;
            if(rect){
                this.width = rect[2];
                this.height = rect[3];
            }
        }
    },

    /**
     * 设置位图的图片。
     * @param {Image|String} image 图片对象或地址。
     * @param {Array} rect 指定位图在图片image的矩形区域。
     * @returns {Bitmap} 位图本身。
     */
    setImage: function(image, rect, split){
        this.drawable.init({image:image, rect:rect, split:split});
        if(rect){
            this.width = rect[2];
            this.height = rect[3];
        }
        return this;
    }
 });
Hilo.Bitmap = Bitmap;
})(window);