export function ticker(callback: Function): void {
    var requestAnimationFrame = 
        window["requestAnimationFrame"] ||
        window["webkitRequestAnimationFrame"] ||
        window["mozRequestAnimationFrame"] ||
        window["oRequestAnimationFrame"] ||
        window["msRequestAnimationFrame"];

    if(!requestAnimationFrame) {
        requestAnimationFrame = function(callback) {
            return window.setTimeout(callback, 1000/60)
        }
    }

    var self = this;
    requestAnimationFrame.call(window, onTick);
    function onTick(): void{
        callback.call(self);
        requestAnimationFrame.call(window, onTick)
    }
}