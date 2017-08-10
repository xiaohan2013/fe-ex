var root = "../src/"
var list = [];
var flag = false;
function require(src, force){
    if(flag && (!force)){
        list.push(src);
    }else{
        flag = true;
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = false;
        script.src = root + src + '?t=' + (+new Date());
        script.onload = function(e){
            if(list.length > 0){
                require(list.shift(), true);
            }else{
                flag = false;
            }
        }
        document.getElementsByTagName('head')[0].appendChild(script);
    }
}


require("core/polyfill.js")
require("core/Hilo.js")
require("core/Class.js")
require("core/Event.js")
require("core/Matrix.js")
require("core/Ticker.js")
require("core/Drawable.js")
require("loader/ScriptLoader.js")
require("loader/ImageLoader.js")
require("loader/LoadQueue.js")
require("audio/HTMLAudio.js")
require("audio/WebAudio.js")
require("audio/WebSound.js")
require("renderer/Renderer.js")
require("renderer/DOMRenderer.js")
require("renderer/WebGLRenderer.js")
require("renderer/CanvasRenderer.js")
require("view/View.js")
require("view/Container.js")
require("view/Stage.js")
require("view/Bitmap.js")
require("view/Sprite.js")
require("view/Button.js")
require("view/Text.js")
require("view/Label.js")
require("view/Element.js")
require("view/Scroll.js")
