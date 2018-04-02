DOM
===

1、dom manuplation
2、dom selector
3、dom traversal

4、[计算距离](https://www.cnblogs.com/freefish12/p/5568043.html)
offsetTop:是本元素距上层元素且元素设置了postion=relative的距离，如果所有父级元素都没有设置postion。就是距body的距离。
计算：offsetTop = margin+top

offsetHeight:是本元素底部到本元素顶部的距离。
计算：offsetHeight = content+padding+border

scrollTop:是浏览器可视窗口顶端距页面顶部的距离。
计算： 无

scrollHeight: 是容器内所有元素及子元素的高度之和，如果没有子元素，即为自身高度+padding。
计算： 有子元素：包括所有子元素的(content+padding+border+margin)之和
       无子元素：content+padding

clientHeight: 是自身容器的高度。除去滚动条的宽度。
计算： content.height+padding-滚动条的宽度



