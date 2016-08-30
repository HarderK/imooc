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
	var titles = document.getElementById('notice-title').getElementsByTagName('li');
	var divs = document.getElementsByClassName("mod");
	console.log(titles, divs);
	for (var i = 0, len = titles.length; i < len; i++) {
		var item = titles[i];
		item.id = i;		// 利用id属性使item与divs的顺序产生关联
		// console.log(item.id);
		EventUtil.addHandler(item, "mouseover", function(event){
			for(var j = 0, len = titles.length; j < len; j++) {
				var name = titles[j].className;
				if(name.indexOf("selected") != -1) {
					titles[j].className = name.replace("selected","");
					divs[j].style.display = "none";
					break;
				}
			}
			// console.log(j);
			this.className = this.className + " selected";
			divs[this.id].style.display= "block";	// 注意不要直接访问i，访问i，i的值永远为5，闭包的应用
		});
	}
}