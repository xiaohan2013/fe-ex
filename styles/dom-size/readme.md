1. 

在设计页面时可能经常会用到固定层的位置，这就需要获取一些html对象的坐标以更灵活的设置目标层的坐标，这里可能就会用到document.body.scrollTop等属性，但是此属性在xhtml标准网页或者更简单的说是带<!DOCTYPE ..>标签的页面里得到的结果是0，如果不要此标签则一切正常，那么在xhtml页面怎么获得body的坐标呢，当然有办法-使用document.documentElement来取代document.body,可以这样写
例：
var top = document.documentElement.scrollTop || document.body.scrollTop;
在JavaScript里||是个好东西，除了能用在if等条件判断里，还能用在变量赋值上。那么上例等同于下例。
例：
var top = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop;
这么写可以得到很好的兼容性。
相反，如果不做声明的话，document.documentElement.scrollTop反而会显示为0。

2.
bodyHeight 高度的语句是 var bodyHeight = document.documentElement.clientHeight;
document.body.clientWidth ==> BODY对象宽度
document.body.clientHeight ==> BODY对象高度
document.documentElement.clientWidth ==> 可见区域宽度
document.documentElement.clientHeight ==> 可见区域高度
