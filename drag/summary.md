# 总结
1. 鼠标在标题栏上按下时，编辑可以拖动
2. 鼠标移动时，检查是否可以拖动，可以拖动则让登录层随鼠标一起移动
3. 鼠标松开的时候标记不可浮动
4. 设置遮罩层的宽度width：100%, height: 100%,如果不绝对定位height将为0；所以要使用绝对定位
5. 注意：鼠标松开事件和鼠标移动事件(mousemove和mouseup)不要在标题栏上设置，因为鼠标移动过快会导致鼠标
移动到标题栏之外，应该设置到document对象上, 利用事件捕获
6. 注册一个resize事件，当窗口大小发生变化时使登录框居中