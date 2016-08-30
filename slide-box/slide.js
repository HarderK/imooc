window.onload = function() {
	var container = document.getElementById('container'),
		list = document.getElementById('list'),
		button = document.getElementById('buttons'),
		buttons = button.getElementsByTagName('span'),
		prev = document.getElementById('prev'),
		next = document.getElementById('next'),
		index = 1, // 保存当前的所处span元素的索引
		animated = false, // 是否正在执行动画
		timer = null; // 自动轮播的定时器

	// 切换图片函数
	var animate = function(offset) {
		animated = true; // 正在执行动画
		var time = 500, // 位移总的事件
			interval = 10, // 位移间隔时间
			instance = offset / (time / interval); // 每此位移量

		var leftNum = parseInt(list.style.left) + offset;

		var go = function() {
			if ((instance < 0 && parseInt(list.style.left) > leftNum) || (instance > 0 && parseInt(list.style.left) < leftNum)) {
				list.style.left = parseInt(list.style.left) + instance + "px";
				setTimeout(go, 10);
			} else {
				list.style.left = leftNum + "px";
				if (leftNum < -3000) {
					list.style.left = "-600px";
				}
				if (leftNum > -600) {
					list.style.left = "-3000px";
				}
				animated = false; // 动画结束
			}
		};

		go();


	};

	// 切换按钮函数
	var showButton = function(n) {
		for (var i = 0, len = buttons.length; i < len; i++) {
			var name = buttons[i].className;
			if (name.indexOf("on") != -1) {
				buttons[i].className = name.replace("on", "");
				break;
			}
		}
		buttons[n - 1].className = (buttons[n - 1].className.length == 0 ? "on" : buttons[n - 1].className + " on");
	};

	var play = function() {
		timer = setInterval(function() {
			next.click();
		}, 3000);
	};

	// 自动轮播
	play();

	// 鼠标移到容器则停止自动轮播
	container.onmouseover = function() {
		clearInterval(timer);
	};

	// 鼠标移出容器，开始自动轮播
	container.onmouseout = function() {
		play();
	};


	next.onclick = function() {
		if (!animated) { // 无动画正在运行时执行
			if (index == 5) {
				index = 1;
			} else {
				index++;
			}
			showButton(index);
			animate(-600);
		}
	};

	prev.onclick = function() {
		if (!animated) {
			if (index == 1) {
				index = 5
			} else {
				index--;
			}
			showButton(index);
			animate(600);
		}
	};

	/* 利用事件代理来实现按钮点击切换 */
	button.onclick = function(event) {
		if (!animated) {
			event = event || window.event;
			target = event.target || event.srcElement;

			if (target.tagName.toUpperCase() != "SPAN") return; // 如果单击的不是span元素也直接跳出
			if (target.className.indexOf("on") != -1) return; // 点击的是当前显示的元素则直接跳出

			var myIndex = parseInt(target.getAttribute('index'));
			var offset = -600 * (myIndex - index);

			animate(offset);
			index = myIndex;
			showButton(index);
		}
	}
};