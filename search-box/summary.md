# 总结
#CSS部分
1. logo和form表单向左浮动，使二者在一行显示
2. 给form设置背景颜色为白色，取消input的默认边框(border:0)，设置outline:none;取消chrome中输入框高
3. 设置submit按钮的value为空，同时添加背景图片按钮
4. 给input设置宽度，撑开form的宽
5. input的height和line-height值设为相同，使input中文本上下居中显示
6. 给form和logo添加公共父元素来实现定位

# 动态提示
1. 使用ul + li 来创建提示，添加一个父元素，绝对定位 position: absolute;
2. 动态位置，将定位属性放在内联的style属性中，几个关键的属性：position, display, left, top;
3. 给输入框绑定keyup事件，回调函数中使用Ajax或JSONP发送异步请求，同时设置display、left、top

***
# 尝试跨域
- 测试API的响应有问题，能够获取到数据，但是success回到函数不执行，自己写了PHP文件响应没有问题
- 此bing API 返回头的Content-Type为application/json，而且开启了严格的类型检查X-Content-Type-Options:nosniff)，
- 我们期望得到的是application/javascript 
- 所以需要修改服务器端的响应头，我们只能在服务器端修改

