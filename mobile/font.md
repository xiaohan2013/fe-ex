

- [如何优雅的选择字体(font-family)](https://segmentfault.com/a/1190000006110417)


- [web移动端一些常用知识](http://www.cnblogs.com/alantao/p/5661213.html)
- [移动端web页面知识小结之CSS部分](http://blog.csdn.net/aiolos1111/article/details/51769216)


- [H5项目常见问题-移动端如何定义字体font-family](http://www.bcty365.com/content-142-5162-1.html)

@ --------------------------------------中文字体的英文名称 
@ 宋体      SimSun 
@ 黑体      SimHei 
@ 微信雅黑   Microsoft Yahei 
@ 微软正黑体 Microsoft JhengHei 
@ 新宋体    NSimSun 
@ 新细明体  MingLiU 
@ 细明体    MingLiU 
@ 标楷体    DFKai-SB 
@ 仿宋     FangSong 
@ 楷体     KaiTi 
@ 仿宋_GB2312  FangSong_GB2312 
@ 楷体_GB2312  KaiTi_GB2312   
@ 
@ 说明：中文字体多数使用宋体、雅黑，英文用Helvetica 
  
body { font-family: Microsoft Yahei,SimSun,Helvetica; }



移动端html5手机网站如何定义字体font-family
很多懒友在使用自定义字体时候，很容易像PC端那样定义，其实安卓和ISO系统，对中文字体是不支持，所以定义以后看到效果不是直接定义字体效果，如果需要定义
大家会想到 @font-face 定义为微软雅黑字体并存放到 web 服务器上，在需要使用时被自动下载
@font-face {
    font-family: 'MicrosoftYaHei';
    src: url('MicrosoftYaHei.eot'); /* IE9 Compat Modes */
    src: url('MicrosoftYaHei.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
             url('MicrosoftYaHei.woff') format('woff'), /* Modern Browsers */
             url('MicrosoftYaHei.ttf')  format('truetype'), /* Safari, Android, iOS */
             url('MicrosoftYaHei.svg#MicrosoftYaHei') format('svg'); /* Legacy iOS */
   }
 
问题虽然解决了，但是这样操作很消耗用户流量，也对页面打开造成了很大延迟。
我们在一起看看三大主流系统他们字体到底支持哪些呢？
 
ios 系统
 
默认中文字体是Heiti SC
默认英文字体是Helvetica
默认数字字体是HelveticaNeue
无微软雅黑字体
 
android 系统
 
默认中文字体是Droidsansfallback
默认英文和数字字体是Droid Sans
无微软雅黑字体
 
winphone 系统
 
默认中文字体是Dengxian(方正等线体)
默认英文和数字字体是Segoe
无微软雅黑字体
 
总结：
各个手机系统有自己的默认字体，一般不支持我们常用字体，例如微软雅黑等；
如无特殊需求，手机端无需定义中文字体，使用系统默认即可。
英文字体和数字字体可使用 Helvetica ，三种系统都支持。
/* 移动端定义字体的代码 */
body{font-family:Helvetica;}