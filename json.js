/**
    JSON增强
*/

if( typeof JSON != "object") {
    JSON = {};
}


( function() {

    function numberFormatter( n ){
        return n < 10 ? "0" + n : n;
    }

    function this_value() {
        return this.valueOf();
    }

    if(typeof Date.prototype.toJSON != 'function') {
        Date.prototype.toJSON = function() {
            return isFinite(this.valueOf())
                ?
                : null;
        }
    }

    // ] , : { } 
    var rx_one = /^[\],:{}\s]$/;
    var rx_two = /\\(?:[])/g;
    var rx_three = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
    var rx_four = /(?:^|:|,)(?:\s*\[)+/g;
    var rx_escapable = /[\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
    var rx_dangerous = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;



    var gap;
    var indent;
    var meta;
    var rep;
    /**
        字符串不包含控制字符，引号和反斜杠。 转义成安全字符
        替换为转义字符
        将转义字符替换为字符串的表示
        还有一些unicode字符
    */
    function quote(string) {
        rx_escapable.lastIndex = 0;
        return rx_escapable.test(string)
                ? "\"" + string.replace(rx_escapable, function(a) {
                    var c = meta[a];
                    return typeof c === "string"
                            ? c
                            : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
                }) + "\""
                : + "\"" + string + "\"";
    }

    function str(key, holder) {

        var i;
        var k;
        var v;
        var length;
        var mind = gap;
        var partial;
        var value = holder[key];

        // 如果value存在toJSON就直接用
        if( value && typeof value === "object" && typeof value.toJSON === "function") {
            value = value.toJSON(key);
        }

        if( typeof rep === "function") {
            value = rep.call(holder, key, value);
        }

        switch(typeof value){
            case "string": 
                return quote(value)
            case "number":
                return isFinite(value) ? String(value) : "null";
            case "boolean":
            case "null":
                return String(value);
            case "object":
                if(!value) return "null";
                gap += indent;
                partial = [];

                if(Object.prototype.toSting.apply(value) === "[object Array]"){
                    length = value.length;

                }

        }

    }


    if(typeof JSON.stringify != 'function') {
        meta = {
            "\b" : "\\b",
            "\t" : "\\t",
            "\n" : "\\n",
            "\f" : "\\f",
            "\r" : "\\r",
            "\"" : "\\\"",
            "\\" : "\\\\"
        };

        JSON.stringify = function(value, replacer, space) {

        }
    }

    if(typeof JSON.parse != 'function'){
        
    }

})();