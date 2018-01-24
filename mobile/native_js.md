在前端领域，native和前端之间

native要显示web页面，其实就是ios或者android

js native


webview和javascript的交互

jsbridge
jssdk

-- js和本地交互的过程



-- 方式
http://blog.csdn.net/dfskhgalshgkajghljgh/article/details/53290382

①资源拦截，android应用中拦截js点击跳转
②native执行
③js和java的交互



-- 协议

步骤
1、webview加载jsbridge文件并注入；(带来注入的漏洞和安全问题)
http://blog.csdn.net/android_love/article/details/45665893

```java
webview.setWebViewClient(new WebViewClient() {  
    @Override  
    public void onPageFinished(WebView view, String url) {  
        super.onPageFinished(view, url);  
        injectImgClick();  
    }  
});

/** 要注入的js代码 
function(){ 
 var objs = document.getElementsByTagName('img'); 
 for(var i = 0; i <objs.length; i++) { 
  objs[i].onclick = function() {window.toolbox.openImage(i,this.src); 
 } 
}; 
**/  
 // 注入js函数监听  
public void injectImgClick() {  
    mWebView.loadUrl("javascript:(function(){var objs = document.getElementsByTagName('img');for(var i = 0; i <objs.length; i++) {objs[i].onclick = function() {window.toolbox.openImage(i,this.src);};}})()");  
}  

webview.getSettings().setJavaScriptEnabled(true);  
webview.addJavascriptInterface(new Object(){  
    @JavascriptInterface  
    public void openImage(int i, String src) {  
        ArrayList<String> list = new ArrayList<String>();  
        list.add(src);  
        mActivity.startActivity(new Intent(mActivity, PhotoViewActivity.class).putExtra(PhotoViewActivity.EXTRA_PHOTOS, list)  
                .putExtra(PhotoViewActivity.EXTRA_TYPE, PhotoViewActivity.TYPE_VIEW));  
    }  
}, "toolbox");
```

2、webview加载html文件；


