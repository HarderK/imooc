var EventUtil = {
	addHandler: function(element, type, handler) {
		if (element.addEventListener) {
			element.addEventListener(type, handler, false);
		} else if (element.attachEvent) {
			element.attachEvent("on" + type, handler);
		} else {
			element["on" + type] = handler;
		}
	},
	getEvent: function(event) {
		return event ? event : window.event;
	},
	getTarget: function(event) {
		return event.target || event.srcElement;
	},
	preventDefault: function(event) {
		if (event.preventDefault) {
			event.preventDefault();
		} else {
			event.returnValue = false;
		}
	},
	removeHandler: function(element, type, handler) {
		if (element.removeEventListener) {
			element.removeEventListener(type, handler, false);
		} else if (element.detachEvent) {
			element.detachEvent("on" + type, handler);
		} else {
			element["on" + type] = null;
		}
	},
	stopPropagation: function(event) {
		if (event.stopPropagation) {
			event.stopPropagation();
		} else {
			event.cancelBubble = true;
		}
	}
};

window.onload = function() {
	var titles = document.getElementById('notice-title').getElementsByTagName('li'),
		divs = document.getElementsByClassName("mod"),
		timer = null;
	console.log(titles, divs);
	var changeOption = function(eles1, eles2, that){	// that指向this指向的对象
		for(var j = 0, len = eles1.length; j < len; j++) {
			var name = eles1[j].className;
			if(name.indexOf("selected") != -1) {
				eles1[j].className = name.replace("selected","");
				eles2[j].style.display = "none";
				break;
			}
		}
		// console.log(j);
		that.className = that.className + " selected";
		// 闭包中无法访问到嵌套的父函数的this
		eles2[that.id].style.display= "block";	// 注意不要直接访问i，访问i，i的值永远为5，闭包的应用
	}

	for (var i = 0, len = titles.length; i < len; i++) {
		var item = titles[i];
		item.id = i;		// 利用id属性使item与divs的顺序产生关联
		// console.log(item.id);
		EventUtil.addHandler(item, "mouseover", function(event){
			// 如果存在准备执行的定时器，立即清除
			if(timer) {
				clearTimeout(timer);
				timer = null;
			}
			var that = this;
			timer = setTimeout(function(){
				changeOption(titles, divs, that);
			}, 500);
		});
	}
}