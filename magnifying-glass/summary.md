# 总结
1. 重点在于计算 #floatBox与大图片的移动方向相反
2. 应将#floatBox与#bigBox 设置成与大小图片的比例相同
3. #bigBox需要设置overflow:hidden
4. 通过mousemove事件对象event的clientX、clientY来获取鼠标的视口坐标
5. 同时需要注意的是注意获取元素在视口中的坐标的获取方法