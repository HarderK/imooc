#轮播图总结

# HTML&CSS
1. 构建一个容器div#container，相对定位， overflow:hidden;
2. 构建一个子div#list，容器宽度设置为所有图片的宽度之和，绝对定位，利用left属性实现图片的滑动
3. #list中所有的img向左浮动，使所有img一行显示，如果不设置浮动，img之前会有间隔
为第一张图片和最后一张图片设置附属图片，方便在设置animate()动画时图片的移动
4. 定义箭头利用转义字符&lt和&gt，利用两个a标签，绝对定位absolute，z-index:2,在图片之上显示
5. 利用CSS3的border-radius属性，将其值设置为border的一般构造圆形框，使用div#buttons包含所有
圆形框，#buttons绝对定位	

## js
1. 构造一个滑动函数animate(), 一个切换按钮函数showButton()
2. 点击右箭头，left减一个图片的宽度，同时按钮向后切换一格
3. 利用事件代理实现点击按钮切换，注意需要跳出直接点击#buttons元素时的函数执行
4. 要使图片缓慢滑动，需要设置一个总动画时间，和每次执行动画时的间隔，将以此图片切换划分成多次
图片移动，利用setTimeout递归调用移动动作
5. 当连续多次点击切换时，应该阻止该行为，设置一个标识animated表示是否正在动画，如果是，则不执行
响应的事件函数中的语句
6. 利用setInterval设置自动轮播