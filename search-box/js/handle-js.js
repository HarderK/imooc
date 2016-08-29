/* js原生实现 */
window.onload = function(){
	// 定义一个通用的事件处理对象
	var EventUtil = {
		addHandler:function(element, type, handler) {
			if(element.addEventListener) {
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
			if(event.preventDefault) {
				event.preventDefault();
			} else {
				event.returnValue = false;
			}
		},
		removeHandler: function(element, type, handler) {
			if(element.removeEventListener) {
				element.removeEventListener(type, handler, false);
			} else if (element.detachEvent) {
				element.detachEvent("on" + type, handler);
			} else {
				element["on" + type] = null;
			}
		},
		stopPropagation: function(event) {
			if(event.stopPropagation) {
				event.stopPropagation();
			} else {
				event.cancelBubble = true;
			}
		}
	};

	function getElementPosition(e) {
		var x = 0, y = 0;
		while(e != null) {
			x += e.offsetLeft;
			y += e.offsetTop;
			e = e.offsetParent;
		}
		return {x: x, y: y};
	}

	function ajaxGet(url, callback) {
		var _xhr = null;
		if(window.XMLHttpRequest) {
			_xhr = new XMLHttpRequest();
		} else {
			_xhr = (function() {
				{
					// 在IE5和IE6中模拟XMLHttpRequest()构造函数
					try {
						return new ActiveXObject("MSxml2.XMLHTTP.6.0");
					} catch (e1) {
						try {
							return new ActiveXObject("MSxml2.XMLHTTP.3.0");
						}
						catch (e2) {
							throw new Error("XMLHttpRequest is not supported");
						}
					}
				}
			})();
		}
		_xhr.onreadystatechange = function(){
			if(_xhr.readyState == 4 && _xhr.status == 200) {
				console.log("done");
				callback(JSON.parse(_xhr.responseText));
			}
		};
		_xhr.open("get", url);
		_xhr.send(null);
	}

	/* 开始实现下拉框功能 */
	var form = document.getElementById('search-form'),
		input = document.getElementsByClassName("search-input-text")[0],
		tip = document.getElementById("search-suggest");
	// console.log(form, input, tip);

	EventUtil.addHandler(input, "keyup", function(event){
		var pos = getElementPosition(form),
			val = input.value;
		// console.log(pos, form.offsetHeight);
		tip.style.display = "block";
		tip.style.left = pos.x - 1 + "px";
		tip.style.top = pos.y + form.offsetHeight + 1 + "px";

		var handle = function(data) {
			// 拼接字符串
			console.log("此处应该拼接字符串");
		};
		//ajaxGet("handle.php", handle);
		
		// 尝试采用JSONP
		var script = document.createElement("script");
		script.src = "http://api.bing.com/qsonhs.aspx?q=" + val + "&callback=handle";
		document.body.appendChild(script);

	});

};