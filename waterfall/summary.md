# 总结
1. 各图片是等宽不等高
2. 使用padding拉开各个box之间的距离，方便通过offsetWidth、offsetHeight计算元素的宽和高
3. 计算显示的列数，(页面的宽度/box的宽度)取整
4. 通过border-shadow和border-radius美化box内部div.pic的边款， box的作用就是通过内边距拉开距离
5. 通过js计算得到包裹层#container的款，width=box的宽*列数
6. 实现瀑布流的思想是，哪个box的最矮，就在那个box下面放下一个box，设置一个数组存储每列的高度
存放下一个box后，更新那一列的高度
7. 通过滚动加载图片。加载的时机确定(可自定义)：比如当最后一个box的一半进入到视口时就通过Ajax加载
新的box
8. 通过Ajax加载新的图片后，一定要注意(此处用了超过两个小时调试排错)：添加新的box后调用通过瀑布流重新排列
box的函数waterfall时，一定要将盒子函数放在回调函数中，事件是异步机制，如果放在回调函数外，会先执行waterfall函数，再执行回调函数