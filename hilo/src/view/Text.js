/**
 * Hilo 1.0.0 for standalone
 * Copyright 2015 alibaba.com
 * Licensed under the MIT License
 */
(function(window){
var Hilo = window.Hilo;
var Class = Hilo.Class;
var Drawable = Hilo.Drawable;
var View = Hilo.View;
    
    
var _cacheCanvas = Hilo.createElement('canvas');
var _cacheContext = _cacheCanvas && _cacheCanvas.getContext('2d');
    
    
/**
 * Hilo
 * Copyright 2015 alibaba.com
 * Licensed under the MIT License
 */

/**
 * @class Text类提供简单的文字显示功能。复杂的文本功能可以使用Element。
 * @augments View
 * @param {Object} properties 创建对象的属性参数。可包含此类所有可写属性。
 * @module hilo/view/Text
 * @requires hilo/core/Class
 * @requires hilo/core/Hilo
 * @requires hilo/core/Drawable
 * @requires hilo/view/View
 * @property {String} text 指定要显示的文本内容。
 * @property {String} color 指定使用的字体颜色。
 * @property {String} textAlign 指定文本的对齐方式。可以是以下任意一个值：'left', 'center', 'right' 。
 * @property {Boolean} outline 指定文本是绘制边框还是填充。
 * @property {Number} spacing 指定文本的行距。单位为像素。默认值为0。
 * @property {String} font 文本的字体CSS样式。
 */
var Text = Class.create(/** @lends Text.prototype */{
    Extends: View,
    constructor: function(properties){
        properties = properties || {};
        this.id = this.id || properties.id || Hilo.getUid('Text');
        Text.superclass.constructor.call(this, properties);

        this.font = properties.font || '16px arial';
        
        if(properties.width){
            this.width = properties.width;
            this._autoWidth = false;
        }else{
            this.width = 256;
            this._autoWidth = true;
        }
        if(properties.height){
            this.height = properties.height;
            this._autoHeight = false;
        }else{
            this.height = 256;
            this._autoHeight = true;
        }
    },
    
    font: null, 
    text: null,
    color: '#000',
    textAlign: null,
    outline: false,
    spacing: 0,
    dirty:true, //强制更新
    
    
    /**
     * 覆盖渲染方法。
     * @private
     */
    render: function(renderer, delta){
        var me = this, canvas = renderer.canvas;
        
        if(renderer.renderType === 'canvas'){
            me._check();
            me._draw(renderer.context);
        }
        else if(renderer.renderType === 'dom'){
            var drawable = me.drawable;
            var domElement = drawable.domElement;
            var style = domElement.style;
            if(me._check()){
                style.font = me.font;
                style.color = me.color;
                style.textAlign = me.textAlign;
                style.lineHeight = (me._fontHeight + me.spacing) + 'px';
                if(me._autoWidth){
                    style['white-space'] = 'nowrap';  
                }else{
                    style['word-break'] = 'break-all';
                    style['word-wrap'] = 'break-word';
                }
                domElement.innerHTML = me.text.toString().replace("\n","</br>");
            }
            renderer.draw(this);
            if(me._autoWidth){
                me.width = domElement.offsetWidth;
                style.width = null;
            }else{
                style.width = me.width + 'px';
            }
            if(me._autoHeight){
                me.height = domElement.offsetHeight;
                style.height = null;
            }else{
                style.height = me.height + 'px';
            }
        }
        else{
            if(me._check()){
                me._cache();
            }
            renderer.draw(me);
        }
    },

    /**
     * 在指定的渲染上下文上绘制文本。
     * @private
     */
    _draw: function(context){
        var me = this, text = me.text.toString();
        if(!text) return;

        //set drawing style
        context.font = me.font;
        context.textAlign = me.textAlign;
        context.textBaseline = 'top';

        //find and draw all explicit lines
        var lines = text.split(/\r\n|\r|\n|<br(?:[ \/])*>/);
        var width = 0, height = 0;
        var lineHeight = me._fontHeight + me.spacing;
        var i, line, w;
        var drawLines = [];

        for(i = 0, len = lines.length; i < len; i++){
            line = lines[i];
            w = context.measureText(line).width;

            //check if the line need to split
            if(w <= me.width || me._autoWidth){
                drawLines.push({text:line, y:height});
                // me._drawTextLine(context, line, height);
                if(width < w) width = w;
                height += lineHeight;
                continue;
            }

            var str = '', oldWidth = 0, newWidth, j, word;

            for(j = 0, wlen = line.length; j < wlen; j++){
                word = line[j];
                newWidth = context.measureText(str + word).width;

                if(newWidth > me.width){
                    drawLines.push({text:str, y:height});
                    // me._drawTextLine(context, str, height);
                    if(width < oldWidth) width = oldWidth;
                    height += lineHeight;
                    str = word;
                }else{
                    oldWidth = newWidth;
                    str += word;
                }

                if(j == wlen - 1){
                    drawLines.push({text:str, y:height});
                    // me._drawTextLine(context, str, height);
                    if(str !== word && width < newWidth) width = newWidth;
                    height += lineHeight;
                }
            }
        }

        if(me._autoWidth) 
            me.width = width;
        if(me._autoHeight) 
            me.height = height;


        //draw background
        var bg = me.background;
        if(bg && (context !== _cacheContext)){
            context.fillStyle = bg;
            context.fillRect(0, 0, me.width, me.height);
        }

        if(me.outline) context.strokeStyle = me.color;
        else context.fillStyle = me.color;

        //draw text lines
        for(var i = 0; i < drawLines.length; i++){
            var line = drawLines[i];
            me._drawTextLine(context, line.text, line.y);
        }
    },

    /**
     * 在指定的渲染上下文上绘制一行文本。
     * @private
     */
    _drawTextLine: function(context, text, y){
        var me = this, x = 0, width = me.width;

        switch(me.textAlign){
            case 'center':
                x = width >> 1;
                break;
            case 'right':
                x = width;
                break;
        };

        if(me.outline) context.strokeText(text, x, y);
        else context.fillText(text, x, y);
    },
    
    _check: function(){
        if(this._font !== this.font){
            this._font = this.font;
            this._fontHeight = Text.measureFontHeight(this.font);
            return true;
        }
        if(this._text !== this.text){
            this._text = this.text;
            return true;
        }
        if(this._color !== this.color){
            this._color = this.color;
            return true;
        }
        if(this._textAlign !== this.textAlign){
            this._textAlign = this.textAlign;
            return true;
        }
        return this.dirty;
    },
    
    /**
     * 缓存到图片里。可用来提高渲染效率。
     * @param {Boolean} forceUpdate 是否强制更新缓存
     */
    _cache: function(){
        _cacheCanvas.width = this.width;
        _cacheCanvas.height = this.height;
        _cacheContext.clearRect(0, 0, _cacheCanvas.width, _cacheCanvas.height);
        this._draw(_cacheContext);

        var cacheImage = new Image();
        cacheImage.src = _cacheCanvas.toDataURL();

        this.drawable = this.drawable||new Drawable();
        this.drawable.init(cacheImage);
    },


    
    Statics: /** @lends Text */{
        /**
         * 测算指定字体样式的行高。
         * @param {String} font 指定要测算的字体样式。
         * @return {Number} 返回指定字体的行高。
         */
        measureFontHeight: function(font){
            var elem = Hilo.createElement('div', {style:{font:font, position:'absolute'}, innerHTML:'PM国家'});
            var docElement = document.documentElement;
            docElement.appendChild(elem);
            var fontHeight = elem.offsetHeight;
            docElement.removeChild(elem);
            return fontHeight;
        }
    }

});
Hilo.Text = Text;
})(window);