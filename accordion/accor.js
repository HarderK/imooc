window.onload = function() {
	var items = document.getElementsByTagName('li');
	for(var i = 0, len = items.length; i < len; i++) {
		items[i].onmouseover = function() {
			if(this.className.indexOf("big") != -1) return;

			for(var j = 0; j < len; j++) {
				var name = items[j].className;
				if(name.indexOf("big") != -1) {
					items[j].className = name.replace("big", "");
					break;
				}
			}
			this.className = this.className.length > 0 ? this.className + " big" : "big";
		}
	}
/*	ul.onmouseover = function(event) {
		event = event || window.event;
		var target = event.target || event.srcElement;

		if(target.tagName.toLowerCase() != "li") return;
		// 去掉所有li标签的class中big的值
		for(var i = 0, len = items.length; i < len; i++) {
			var name = items[i].className;
			if(name.indexOf("big") != -1) {
				items[i].className = name.replace("big", "");
				break;
			}
		}

		target.className = target.className.length>0 ? target.className + " big" : "big";

	};*/
};