/**
 * Hilo 1.0.0 for standalone
 * Copyright 2015 alibaba.com
 * Licensed under the MIT License
 */
(function(window){
var Hilo = window.Hilo;
var Class = Hilo.Class;
var Drawable = Hilo.Drawable;
var DOMRenderer = Hilo.DOMRenderer;
var View = Hilo.View;
/**
 * Hilo
 * Copyright 2015 alibaba.com
 * Licensed under the MIT License
 */

/**
 * @name Element
 * @class Element是dom元素的包装。
 * @augments View
 * @param {Object} properties 创建对象的属性参数。可包含此类所有可写属性。特殊属性有：
 * <ul>
 * <li><b>element</b> - 要包装的dom元素。必需。</li>
 * </ul>
 * @module hilo/view/Element
 * @requires hilo/core/Hilo
 * @requires hilo/core/Class
 * @requires hilo/core/Drawable
 * @requires hilo/renderer/DOMRenderer
 * @requires hilo/view/View
 */
var Element = Class.create(/** @lends Element.prototype */{
    Extends: View,
    constructor: function(properties){
        properties = properties || {};
        this.id = this.id || properties.id || Hilo.getUid("Element");
        Element.superclass.constructor.call(this, properties);

        this.drawable = new Drawable();
        this.element = this.drawable.domElement = (properties.element || Hilo.createElement('div', {style: {position: 'absolute'}}));
        this.element.id = this.id;
    },
    
    element:null,

    /**
     * 覆盖渲染方法。
     * @private
     */
    _render: function(renderer, delta){
        if(this._update(delta)){
            if(this.visible){
                this.render(renderer, delta);
            }
        }
    },

    /**
     * 覆盖渲染方法。
     * @private
     */
    render: function(renderer, delta){
        if(this._element != this.element){
            this.drawable.domElement = this.element;
        }
        
        if(renderer.renderType != 'dom'){
            DOMRenderer.setElementStyleByView(this);
        }else{
            renderer.draw(this);
        }
    }
});
Hilo.Element = Element;
})(window);