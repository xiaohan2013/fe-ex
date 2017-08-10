/**
 * Hilo 1.0.0 for standalone
 * Copyright 2015 alibaba.com
 * Licensed under the MIT License
 */
(function(window){
var Hilo = window.Hilo;
var Class = Hilo.Class;
var Container = Hilo.Container;
var Bitmap = Hilo.Bitmap;
/**
 * Hilo
 * Copyright 2015 alibaba.com
 * Licensed under the MIT License
 */

/**
 * @class Label。当前仅支持单行文本。
 * @augments Container
 * @param {Object} properties 创建对象的属性参数。可包含此类所有可写属性。
 * @module hilo/view/Label
 * @requires hilo/core/Class
 * @requires hilo/core/Hilo
 * @requires hilo/view/Container
 * @requires hilo/view/Bitmap
 * @property {Object} glyphs 位图字体的字形集合。格式为：{letter:{image:img, rect:[0,0,100,100]}}。
 * @property {Number} spacing 字距，即字符间的间隔。默认值为0。
 * @property {String} text 位图文本的文本内容。只读属性。设置文本请使用setFont方法。
 * @property {String} textAlign 文本对齐方式，值为left、center、right, 默认left。只读属性。设置文本请使用setTextAlign方法。
 */
var Label = Class.create(/** @lends Label.prototype */{
    Extends: Container,
    constructor: function(properties){
        properties = properties || {};
        this.id = this.id || properties.id || Hilo.getUid('Label');
        Label.superclass.constructor.call(this, properties);

        if(properties.font){
            this.genGlyphs(properties.font);
        }
        
        this.pointerChildren = false; //disable user events for single letters
    },

    glyphs: null,
    spacing: 0,
    text: '',
    
     /**
      * 设置图片字体
      * font: {text, width, height, image, rect}
      */
    genGlyphs:function(font){
        var str = font.text.toString(),
            image = font.image,
            rect = font.rect || [0,0,image.width,image.height],
            w = font.width || rect[2],
            h = font.height || rect[3],
            col = font.col || Math.floor(rect[2]/w);

        var glyphs = {};
        for(var i = 0, l = str.length; i < l; i++){
            charStr = str.charAt(i);
            glyphs[charStr] = {
                image:image,
                rect:[w * (i % col), h * Math.floor(i / col), w, h]
            }
        }
        this.glyphs = glyphs;
    },

    /**
     * 覆盖渲染方法。
     * @private
     */
    render: function(renderer, delta){
        
        var me = this, str = me.text.toString(), spc = me.spacing, gls = me.glyphs;
        if(me._text != str || me._spacing != spc || me._glyphs != gls){
            me._text = str;
            me._spacing = spc;
            me._glyphs = gls;
                                
            var len = str.length;
            var i, charStr, charGlyph, charObj, width = 0, height = 0, left = 0;
            for(i = 0; i < len; i++){
                charStr = str.charAt(i);
                charGlyph = gls[charStr];
                
                if(charGlyph){
                    left = width + (width > 0 ? me.spacing : 0);
                    if(me.children[i]){
                        charObj = me.children[i];
                        charObj.setImage(charGlyph.image, charGlyph.rect);
                    }
                    else{
                        charObj = Label._createBitmap(charGlyph);
                        me.addChild(charObj);
                    }
                    charObj.x = left;
                    width = left + charGlyph.rect[2];
                    height = Math.max(height, charGlyph.rect[3]);
                }
            }

            for(i = me.children.length - 1;i >= len;i --){
                Label._releaseBitmap(me.children[i]);
                me.removeChild(me.children[i]);
            }

            me.width = width;
            me.height = height;
        }
        
        Label.superclass.render.call(this, renderer, delta);
    },
    

   
    Statics:/** @lends Label */{
        _pool:[],
        _createBitmap:function(cfg){
            var bmp;
            if(Label._pool.length > 0){
                
                bmp = Label._pool.pop();
                bmp.setImage(cfg.image, cfg.rect);
            }
            else{
                bmp = new Bitmap({
                    image:cfg.image,
                    rect:cfg.rect
                });
            }
            return bmp;
        },
        _releaseBitmap:function(bmp){
            Label._pool.push(bmp);
        }
    }

});
Hilo.Label = Label;
})(window);