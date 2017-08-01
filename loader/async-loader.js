// http://blog.csdn.net/l522703297/article/details/50754695

function getXHR(){
    var obj;
    if (window.XMLHttpRequest)
        obj = new XMLHttpRequest();
    else
        obj = new ActiveXObject("Microsoft.XMLHTTP");
    return obj;
}

// XHR注入
(function(){

    var xhr = getXHR();
    xhr.open('GET','https://cdn.bootcss.com/jquery/3.2.1/jquery.js', true);
    xhr.send();
    xhr.onreadystatechange = function(evt){
        if(xhr.readyState == 4 && xhr.status == 200){
            console.log('success')
            var script = document.createElement("script");
            script.text = xhr.responseText;
            document.getElementsByTagName("head")[0].appendChild(script);
        }
    }
    xhr.onprogress = function(evt){ console.log("2", evt.loaded, evt.timeStamp) }

})()


// XHR Eval
;(function(){

    var xhr = getXHR();
    xhr.open('GET','https://cdn.bootcss.com/jquery/3.2.1/jquery.js', true);
    xhr.send();
    xhr.onreadystatechange = function(evt){
        if(xhr.readyState == 4 && xhr.status == 200){
            eval(xhr.responseText);
            // 此时已经存在jQuery对象
        }
    }
    xhr.onprogress = function(evt){ console.log("2", evt.loaded, evt.timeStamp) }

})()

// Script In iframe
;(function(){
    var innerExecJs = function(){ alert(1) }
    var iframe = document.createElement("iframe");
    document.documentElement.appendChild(iframe);
    var doc = iframe.contentWindow.document;//获取iframe中的window要用contentWindow属性。
    doc.open();
    doc.write('<script> var innerExecJs = '+innerExecJs.toString()+'<\/script><body onload="innerExecJs()"></body>');
    doc.close();
})()



// 延迟加载
;(function(){
    var start = Number(new Date);
    while(start+5000 > Number(new Date)){
        console.log(start)
    }
})()
