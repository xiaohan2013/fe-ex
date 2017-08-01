// 结构一：

var pkg_name = pkg_name || (function(){
    return {
        add:function(){}
    };
})();


// 结构二
(function(global){

    function ctor(){}

    ctor.prototype.add = function(){};
    ctor.prototype.delete = function(){};
    ctor.prototype.cancel = function(){};

    window.pkg_name = global.pkg_name = new ctor();

})(global)

// 结构三
function noop(){}
function Ctor(){}
// 此时的constrocutor已经被覆盖了
Ctor.prototype = {
    add:noop,
    delete:noop
}
Ctor.prototype.constructor = Ctor;















