/**
 * Hilo 1.0.0 for standalone
 * Copyright 2015 alibaba.com
 * Licensed under the MIT License
 */
(function(window){
var Hilo = window.Hilo;
var Class = Hilo.Class;
var Container = Hilo.Container;
    
/**
 * Hilo
 * Copyright 2015 alibaba.com
 * Licensed under the MIT License
 */

/**
 * @class ScrollContainer
 * @augments Container
 * @param {Object} properties 创建对象的属性参数。可包含此类所有可写属性。
 * @module hilo/view/Label
 * @requires hilo/core/Class
 * @requires hilo/core/Hilo
 * @requires hilo/view/Container
 */
var Scroll = Class.create(/** @lends Label.prototype */{
    Extends: Container,
    constructor: function(properties){
        properties = properties || {};
        this.id = this.id || properties.id || Hilo.getUid('Scroll');
        Scroll.superclass.constructor.call(this, properties);

        this.clipChildren = true;
        this.pointerChildren = true;
        
        this.view = properties.view || new Container({width:properties.innerWidth || this.width, height:properties.innerHeight ||this.height});
        this.addChild(this.view);
    },
    view:null,
    
    /**
     * overwrite
     * @private
     */
    fire: function(type, detail){
        var evtType = typeof type === 'string' ? type : type.type;

        switch(evtType){
            case 'mousedown':
            case 'touchstart':
                this._scrollFlag = true;
                this._scrollX = type.stageX;
                this._scrollY = type.stageY;
                break;
            case 'mousemove':
            case 'touchmove':
                this._activeFlag = true;
                if(this._scrollFlag){
                    this.scroll(type.stageX - this._scrollX, type.stageY - this._scrollY)
                    this._scrollX = type.stageX;
                    this._scrollY = type.stageY;
                }
                break;
            case 'mouseup':
            case 'mouseout':
            case 'touchend':
            case 'touchout':
                this._activeFlag = false;
                this._scrollFlag = false;
                break;
        }

        return Scroll.superclass.fire.call(this, type, detail);
    },
    scroll:function(px, py){
        var view = this.view;
        if(view.width > this.width){
            view.x += px;
            if(view.x > 0) view.x = 0;
            if(view.x + view.width < this.width) view.x = this.width - view.width;
        }
        if(view.height > this.height){
            view.y += py;
            if(view.y > 0) view.y = 0;
            if(view.y + view.height < this.height) view.y = this.height - view.height;
        }
    },
    enableWheel:function(stage, flag){
        var me = this;
        this._wheelFlag = flag;
        if(!this._wheelFunc){
            this._wheelFunc = true;
            
            stage.enableDOMWheel();
            stage.on("mousewheel", function(e){
                if(me._wheelFlag && me._activeFlag){
                    var p = e.detail * 30;
                    me.scroll(p, p);
                }
            })
        }
    },

});
Hilo.Scroll = Scroll;
})(window);