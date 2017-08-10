/**
 * Hilo 1.0.0 for standalone
 * Copyright 2015 alibaba.com
 * Licensed under the MIT License
 */
(function(window){
var Hilo = window.Hilo;
var Class = Hilo.Class;
var Renderer = Hilo.Renderer;
var Matrix = Hilo.Matrix;
/**
 * Hilo
 * Copyright 2015 alibaba.com
 * Licensed under the MIT License
 */

/**
 * Heavily inspired by PIXI's SpriteRenderer:
 * https://github.com/pixijs/pixi.js/blob/v3.0.9/src/core/sprites/webgl/SpriteRenderer.js
 */

var DEG2RAD = Math.PI / 180;
/**
 * @class webgl画布渲染器。所有可视对象将渲染在canvas画布上。
 * @augments Renderer
 * @param {Object} properties 创建对象的属性参数。可包含此类所有可写属性。
 * @module hilo/renderer/WebGLRenderer
 * @requires hilo/core/Class
 * @requires hilo/core/Matrix
 * @requires hilo/renderer/Renderer
 * @property {WebGLRenderingContext} gl webgl上下文。只读属性。
 */
var WebGLRenderer = Class.create(/** @lends WebGLRenderer.prototype */{
    Extends: Renderer,
    Statics:/** @lends WebGLRenderer */{
        /**
         * 最大批渲染数量。
         * @type {Number}
         */
        MAX_BATCH_NUM:2000,
        /**
         * 顶点属性数。只读属性。
         * @type {Number}
         */
        ATTRIBUTE_NUM:5,
        /**
         * 是否支持WebGL。只读属性。
         * @type {Boolean}
         */
        isSupport:null
    },
    renderType:'webgl',
    gl:null,
    constructor: function(properties){
        WebGLRenderer.superclass.constructor.call(this, properties);
        var gl = this.gl = this.canvas.getContext("webgl", {stencil:true})||this.canvas.getContext('experimental-webgl', {stencil:true});


        //gl setup------------------------------------------------------
        gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
        gl.enable(gl.BLEND);
        gl.disable(gl.CULL_FACE);
        gl.disable(gl.DEPTH_TEST);
        gl.disable(gl.STENCIL_TEST);
        

        this._initShaders();
        
        //for bg draw-------------------------------------------------
        this.vertex2 = new Float32Array(4 * 2);
        this.indexs2 = new Uint16Array([0,1,2,1,2,3]);
        this.notextureShader.active();  
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.indexs2, gl.STATIC_DRAW);
        gl.bufferData(gl.ARRAY_BUFFER, this.vertex2, gl.STREAM_DRAW);     
        
        //for image draw---------------------------------------------
        this.maxBatchNum = WebGLRenderer.MAX_BATCH_NUM;
        this.positionStride = WebGLRenderer.ATTRIBUTE_NUM * 4;
        var vertexNum = this.maxBatchNum * WebGLRenderer.ATTRIBUTE_NUM * 4;
        var indexNum = this.maxBatchNum * 6;
        this.vertex = new Float32Array(vertexNum);
        this.indexs = new Uint16Array(indexNum);
        for (var i=0, j=0; i < indexNum; i += 6, j += 4)
        {
            this.indexs[i + 0] = j + 0;
            this.indexs[i + 1] = j + 1;
            this.indexs[i + 2] = j + 2;
            this.indexs[i + 3] = j + 1;
            this.indexs[i + 4] = j + 2;
            this.indexs[i + 5] = j + 3;
        }
        this.batchIndex = 0;
        this.sprites = [];
        
        this.defaultShader.active();  
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.indexs, gl.STATIC_DRAW);
        gl.bufferData(gl.ARRAY_BUFFER, this.vertex, gl.STREAM_DRAW);
        
    },

    context: null,

    /**
     * @private
     * @see Renderer#startDraw
     */
    startDraw: function(target){
        if(target.visible && target.alpha > 0){
            target.__webglWorldMatrix = target.__webglWorldMatrix||new Matrix(1, 0, 0, 1, 0, 0);
            target.__webglRenderAlpha = target.__webglRenderAlpha||1;
            return true;
        }
        return false;
    },

    /**
     * @private
     * @see Renderer#draw
     */
    draw: function(target){
        var drawable = target.drawable, 
            image = drawable && drawable.image,
            bg = target.background;
        
        if(this.batchIndex >= this.maxBatchNum || bg){
            this._renderBatches();
        }

        if(target.clipChildren){
            this.stencilLevel = this.stencilLevel||0;
            var gl = this.gl;
            if(this.stencilLevel === 0){
                gl.enable(gl.STENCIL_TEST);
                gl.clear(gl.STENCIL_BUFFER_BIT);
                gl.stencilFunc(gl.ALWAYS,1,0xFF);
                gl.stencilOp(gl.KEEP,gl.REPLACE,gl.REPLACE);
            }else{
                gl.stencilOp(gl.KEEP,gl.INCR,gl.INCR);
            }
            gl.colorMask(false, false, false, false);
            
            this.notextureShader.active();
            this._renderBackground(target, {r:1,g:1,b:1});
            this.stencilLevel = this.stencilLevel + 1;
            
            gl.colorMask(true, true, true, true);
            gl.stencilFunc(gl.LEQUAL,this.stencilLevel,0xFF);
            gl.stencilOp(gl.KEEP,gl.KEEP,gl.KEEP);
            
            
        }
      
        
        if(bg){
            this.notextureShader.active();
            this._renderBackground(target, bg.toColorRgb());
            
        }
        if(image && image.complete){
            this.defaultShader.active();
            
            var rect = drawable.rect;
            var split = drawable.split;
            var w = target.width, h = target.height;
            if(split){
                var sx = (rect && rect[0]) || 0, 
                    sy = (rect && rect[1]) || 0,
                    sw = (rect && rect[2]) || image.width,
                    sh = (rect && rect[3]) || image.height,
                    w1 = split[0],w2=split[2],w3=sw-w1-w2,
                    h1 =split[1],h2=split[3],h3=sh-h1-h2;
                
                this._renderImage(target, image, sx+0,     sy+0,      w1, h1, 0,      0,      w1,     h1);
                this._renderImage(target, image, sx+w1,    sy+0,      w2, h1, w1,     0,      w-w1-w3,h1);
                this._renderImage(target, image, sx+w1+w2, sy+0,      w3, h1, w-w3,   0,      w3,     h1);
                this._renderImage(target, image, sx+0,     sy+h1,     w1, h2, 0,      h1,     w1,     h-h1-h3);
                this._renderImage(target, image, sx+w1,    sy+h1,     w2, h2, w1,     h1,     w-w1-w3,h-h1-h3);
                this._renderImage(target, image, sx+w1+w2, sy+h1,     w3, h2, w-w3,   h1,     w3,     h-h1-h3);
                this._renderImage(target, image, sx+0,     sy+h1+h2,  w1, h3, 0,      h-h3,   w1,     h3);
                this._renderImage(target, image, sx+w1,    sy+h1+h2,  w2, h3, w1,     h-h3,   w-w1-w3,h3);
                this._renderImage(target, image, sx+w1+w2, sy+h1+h2,  w3, h3, w-w3,   h-h3,   w3,     h3);
            }else{
                this._renderImage(target, image, rect[0], rect[1], rect[2], rect[3], 0, 0, w, h);
            }
        }
        
    },

    /**
     * @private
     * @see Renderer#endDraw
     */
    endDraw: function(target){
        if(target === this.stage){
            this._renderBatches();
        }
        if(target.clipChildren){
            this._renderBatches();
            
            var gl = this.gl;
            this.stencilLevel = this.stencilLevel - 1;
            gl.stencilFunc(gl.LEQUAL,this.stencilLevel,0xFF);
            if(this.stencilLevel == 0){
                gl.disable(this.gl.STENCIL_TEST);
            }
        }
    },
    /**
     * @private
     * @see Renderer#transform
     */
    transform: function(target){
        this._setConcatenatedMatrix(target, target.parent);
        
        if(target.alpha > 0) {
            if(target.parent && target.parent.__webglRenderAlpha){
                target.__webglRenderAlpha = target.alpha * target.parent.__webglRenderAlpha;
            }
            else{
                target.__webglRenderAlpha = target.alpha;
            }
        }
    },


    /**
     * @private
     * @see Renderer#clear
     */
    clear: function(x, y, width, height){
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    },

    /**
     * @private
     * @see Renderer#resize
     */
    resize: function(width, height){
        if(this.width !== width || this.height !== height){
            this.width = this.canvas.width = width;
            this.height = this.canvas.height = height;
            this.gl.viewport(0, 0, width, height);
            
            this.activeShader.active(true);//re active current shader
        }
    },
    
    _renderBackground:function(target, c){
        var gl = this.gl;
        var a = target.__webglRenderAlpha;
        gl.uniform4f(this.activeShader.u_color,c.r/255.0*a,c.g/255.0*a,c.b/255.0*a, a);
        
       
        var w = target.width, h = target.height, x = -target.pivotX*w, y = target.pivotY*h - h;
        var positions = this.vertex2;
          
        positions[0] = x;  
        positions[1] = y; 

        positions[2] = x+w;
        positions[3] = y; 

        positions[4] = x; 
        positions[5] = y+h;

        positions[6] = x+w;
        positions[7] = y+h;

        var matrix = target.__webglWorldMatrix;
        for(var i = 0;i < 4;i ++){
            var x = positions[i*2];
            var y = positions[i*2 + 1];

            positions[i*2] = matrix.a*x+matrix.c*y + matrix.tx;
            positions[i*2 + 1] = matrix.b*x+matrix.d*y + matrix.ty;
        }
        
        gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STREAM_DRAW);
        gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
    },
    _renderImage:function(target, image, mx, my, mw, mh, x, y, w, h){
        if(!image.texture){
            this.activeShader.uploadTexture(image);
        }
        
        var gl = this.gl, px = -target.pivotX*w, py = -target.pivotY*h;
        var vertexs = this._createVertexs(image, mx, my, mw, mh, px + x, py + y, w, h);
        var index = this.batchIndex * this.positionStride;
        var positions = this.vertex;
        var alpha = target.__webglRenderAlpha;
        
        positions[index + 0] = vertexs[0];//x
        positions[index + 1] = vertexs[1];//y
        positions[index + 2] = vertexs[2];//uvx
        positions[index + 3] = vertexs[3];//uvy
        positions[index + 4] = alpha;//alpha

        positions[index + 5] = vertexs[4];
        positions[index + 6] = vertexs[5];
        positions[index + 7] = vertexs[6];
        positions[index + 8] = vertexs[7];
        positions[index + 9] = alpha;

        positions[index + 10] = vertexs[8]
        positions[index + 11] = vertexs[9]
        positions[index + 12] = vertexs[10]
        positions[index + 13] = vertexs[11]
        positions[index + 14] = alpha;

        positions[index + 15] = vertexs[12]
        positions[index + 16] = vertexs[13]
        positions[index + 17] = vertexs[14]
        positions[index + 18] = vertexs[15]
        positions[index + 19] = alpha;

        var matrix = target.__webglWorldMatrix;
        for(var i = 0;i < 4;i ++){
            var x = positions[index + i*5];
            var y = positions[index + i*5 + 1];

            positions[index + i*5] = matrix.a*x+matrix.c*y + matrix.tx;
            positions[index + i*5 + 1] = matrix.b*x+matrix.d*y + matrix.ty;
        }

        target.texture = image.texture;
        this.sprites[this.batchIndex++] = target;
    },
    _renderBatches:function(){
        var gl = this.gl;
        gl.bufferSubData(gl.ARRAY_BUFFER, 0, this.vertex.subarray(0, this.batchIndex * this.positionStride));
        var startIndex = 0;
        var batchNum = 0;
        var preTexture = null;
        for(var i = 0;i < this.batchIndex;i ++){
            var sprite = this.sprites[i];
            if(preTexture && preTexture !== sprite.texture){
                this._renderBatch(startIndex, i);
                startIndex = i;
                batchNum = 1;
            }
            preTexture = sprite.texture;
        }
        this._renderBatch(startIndex, this.batchIndex);
        this.batchIndex = 0;
    },
    _renderBatch:function(start, end){
        var gl = this.gl;
        var num = end - start;
        if(num > 0){
            gl.bindTexture(gl.TEXTURE_2D, this.sprites[start].texture);
            gl.drawElements(gl.TRIANGLES, num * 6, gl.UNSIGNED_SHORT, start * 6 * 2);
        }
    },
    _initShaders:function(){
        var VSHADER_SOURCE = "" +
            "attribute vec2 a_position;\n" +
            "attribute vec2 a_TexCoord;\n" +
            "attribute float a_alpha;\n" +
            "uniform mat3 u_projectionTransform;\n" +
            "varying vec2 v_TexCoord;\n" +
            "varying float v_alpha;\n" +
            "void main(){\n" +
            "    gl_Position =  vec4((u_projectionTransform * vec3(a_position, 1.0)).xy, 1.0, 1.0);\n" +
            "    v_TexCoord = a_TexCoord;\n" +
            "    v_alpha = a_alpha;\n" +
            "}\n";

        var FSHADER_SOURCE = "\n" +
            "precision mediump float;\n" +
            "uniform sampler2D u_Sampler;\n" +
            "varying vec2 v_TexCoord;\n" +
            "varying float v_alpha;\n" +
            "void main(){\n" +
            "    gl_FragColor = texture2D(u_Sampler, v_TexCoord) * v_alpha;\n" +
            "}\n";

        this.defaultShader = new Shader(this, {
            v:VSHADER_SOURCE,
            f:FSHADER_SOURCE
        },{
            attributes:[{name:"a_position",count:2,offset:0,stride:20},{name:"a_TexCoord",count:2,offset:8,stride:20},{name:"a_alpha",count:1,offset:16,stride:20}],
            uniforms:["u_projectionTransform", "u_Sampler"]
        });
        
        var VSHADER_SOURCE_NO_TEXTURE = "" +
            "attribute vec2 a_position;\n" +
            "uniform mat3 u_projectionTransform;\n" +
            "void main(){\n" +
            "    gl_Position =  vec4((u_projectionTransform * vec3(a_position, 1.0)).xy, 1.0, 1.0);\n" +
            "}\n";

        var FSHADER_SOURCE_NO_TEXTURE = "\n" +
            "precision mediump float;\n" +
            "uniform vec4 u_color;\n" +
            "void main(){\n" +
            "    gl_FragColor = u_color;\n" +
            "}\n";

        this.notextureShader = new Shader(this, {
            v:VSHADER_SOURCE_NO_TEXTURE,
            f:FSHADER_SOURCE_NO_TEXTURE
        },{
            attributes:[{name:"a_position",count:2,offset:0,stride:8}],
            uniforms:["u_projectionTransform", "u_color"]
        });
    },
    _createVertexs:function(img, tx, ty, tw, th, x, y, w, h){
        var tempVertexs = this.__tempVertexs||[];
        var width = img.width;
        var height = img.height;

        tw = tw/width;
        th = th/height;
        tx = tx/width;
        ty = ty/height;

        w = w;
        h = h;
        x = x;
        y = y;

        if(tw + tx > 1){
            tw = 1 - tx;
        }

        if(th + ty > 1){
            th = 1 - ty;
        }

        ty = 1 - ty - th;

        y = -h - y;

        var index = 0;
        tempVertexs[index++] = x; tempVertexs[index++] = y; tempVertexs[index++] = tx; tempVertexs[index++] = ty;
        tempVertexs[index++] = x+w;tempVertexs[index++] = y; tempVertexs[index++] = tx+tw; tempVertexs[index++] = ty;
        tempVertexs[index++] = x; tempVertexs[index++] = y+h; tempVertexs[index++] = tx;tempVertexs[index++] = ty+th;
        tempVertexs[index++] = x+w;tempVertexs[index++] = y+h;tempVertexs[index++] = tx+tw;tempVertexs[index++] = ty+th;

        return tempVertexs;
    },
    _setConcatenatedMatrix:function(view, ancestor){
        var mtx = view.__webglWorldMatrix;
        var cos = 1, sin = 0,
            rotation = 360-view.rotation % 360,
            scaleX = view.scaleX, scaleY = view.scaleY;

        if(rotation){
            var r = rotation * DEG2RAD;
            cos = Math.cos(r);
            sin = Math.sin(r);
        }

        mtx.a = cos*scaleX;
        mtx.b = sin*scaleX;
        mtx.c = -sin*scaleY;
        mtx.d = cos*scaleY;
        mtx.tx = view.x;
        mtx.ty = -view.y;

        if(ancestor){
            var ppx = ancestor.pivotX, ppy = ancestor.pivotY;
            if(ppx != 0 || ppy != 0){
                mtx.tx -= ppx * ancestor.width;
                mtx.ty += ppx * ancestor.height;
            }

            var aMtx = ancestor.__webglWorldMatrix;
            mtx.concat(aMtx.a, aMtx.b, aMtx.c, aMtx.d, aMtx.tx, aMtx.ty);
        }
    }
});

/**
 * shader
 * @param {WebGLRenderer} renderer [description]
 * @param {Object} source
 * @param {String} source.v 顶点shader
 * @param {String} source.f 片段shader
 * @param {Object} attr
 * @param {Array} attr.attributes attribute数组
 * @param {Array} attr.uniforms uniform数组
 */
var _cacheTexture = {};
var Shader = function(renderer, source, attr){
    this.renderer = renderer;
    this.gl = renderer.gl;
    this.program = this._createProgram(this.gl, source.v, source.f);

    attr = attr||{};
    this.attributes = attr.attributes||[];
    this.uniforms = attr.uniforms||[];
    
    
    this.vertexBuffer = this.gl.createBuffer();
    this.indexBuffer = this.gl.createBuffer();

}

Shader.prototype = {
    active:function(force){
        var that = this;
        var renderer = that.renderer;
        var oldShader = renderer.activeShader
               
        if((oldShader === that) && (!force)){
            return
        }
        
        var gl = that.gl;
        var program = that.program;

        if(program && gl){
            if(oldShader){
                oldShader.attributes.forEach(function(v){
                    gl.disableVertexAttribArray(oldShader[v.name]);
                });
            }
        
            renderer.activeShader = that;
            gl.useProgram(program);
            
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, that.indexBuffer);
            gl.bindBuffer(gl.ARRAY_BUFFER, that.vertexBuffer);
            
            
            that.attributes.forEach(function(v){
                attribute = v.name;
                that[attribute] = (that[attribute] || gl.getAttribLocation(program, attribute));
                gl.enableVertexAttribArray(that[attribute]);
                gl.vertexAttribPointer(that[attribute], v.count, gl.FLOAT, false, v.stride, v.offset);
            });

            that.uniforms.forEach(function(uniform){
                that[uniform] = (that[uniform] || gl.getUniformLocation(program, uniform));
            });
            
            if(that.width !== renderer.width || that.height !== renderer.height){
                that.width = renderer.width;
                that.height = renderer.height;
                that.uploadProjectionTransform(true);
            }
        }
    },
    uploadTexture:function(image){
        var gl = this.gl;
        var renderer = this.renderer;
        if(_cacheTexture[image.src]){
            image.texture = _cacheTexture[image.src];
        }
        else{
            var texture = gl.createTexture();

            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, texture);

            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
            gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, 1);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.uniform1i(this.u_Sampler, 0);
            gl.bindTexture(gl.TEXTURE_2D, null);

            image.texture = texture;
            _cacheTexture[image.src] = texture;
        }
    },
    uploadProjectionTransform:function(force){
        var gl = this.gl;
        if(!this._projectionTransformElements||force){
            this._projectionTransformElements = new Float32Array([
                2/this.width, 0, 0,
                0, 2/this.height, 0,
                -1, 1, 1,
            ]);
        }
        gl.uniformMatrix3fv(this.u_projectionTransform, false, this._projectionTransformElements);
    },
    _createProgram:function(gl, vshader, fshader){
        var vertexShader = this._createShader(gl, gl.VERTEX_SHADER, vshader);
        var fragmentShader = this._createShader(gl, gl.FRAGMENT_SHADER, fshader);
        if (!vertexShader || !fragmentShader) {
            return null;
        }

        var program = gl.createProgram();
        if (program) {
            gl.attachShader(program, vertexShader);
            gl.attachShader(program, fragmentShader);

            gl.linkProgram(program);

            gl.deleteShader(fragmentShader);
            gl.deleteShader(vertexShader);
            var linked = gl.getProgramParameter(program, gl.LINK_STATUS);
            if (!linked) {
                var error = gl.getProgramInfoLog(program);
                console.log('Failed to link program: ' + error);
                gl.deleteProgram(program);
                return null;
            }
        }
        return program;
    },
    _createShader:function(gl, type, source){
        var shader = gl.createShader(type);
        if(shader){
            gl.shaderSource(shader, source);
            gl.compileShader(shader);

            var compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
            if (!compiled) {
                var error = gl.getShaderInfoLog(shader);
                console.log('Failed to compile shader: ' + error);
                gl.deleteShader(shader);
                return null;
            }
        }
        return shader;
    }
};

WebGLRenderer.isSupport = function(){
    if(this._isSupport !== undefined){
        return this._isSupport;
    }
    else{
        var canvas = document.createElement('canvas');
        if(canvas.getContext && (canvas.getContext('webgl')||canvas.getContext('experimental-webgl'))){
            this._isSupport = true;
        }
        else{
            this._isSupport = false;
        }
        return this._isSupport;
    }
};
Hilo.WebGLRenderer = WebGLRenderer;
})(window);