window.onload = function() {
	waterfall("container", "box");

	window.onscroll = function(event) {
		if(checkScroll()){
			console.log("执行");

/*			for(var i = 0; i < 20; i++){
				var image = new Image();
				image.src = "images/"+ i +".jpg";

				var box = document.createElement("div"),
					pic = document.createElement("div");
				box.className = "box";
				pic.className = "pic";
				box.appendChild(pic);
				pic.appendChild(image);
				container.appendChild(box);
			}*/


			ajaxGetData("handle.php", addNewImage);

/*			var xhr = new XMLHttpRequest();
			xhr.open("get","handle.php");
			xhr.onreadystatechange = function(){
				if(xhr.readyState == 4) {
					if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304 ) {
						addNewImage(xhr.responseText);
						waterfall("container", "box");
					}
				}
			};
			xhr.send(null);
			*/
		}

	}
};

/**
 * 实现瀑布流效果
 * @param  {String} parent [父元素id]
 * @param  {String} child  [子元素类名]
 */
var totalNum = 0;  // 已加载的图片总数
var arr = [];		// 存储每一列的高度
function waterfall(parent, child) {
	var container = document.getElementById(parent);
	var boxes = getByClass(container, "box");
	var bWidth = boxes[0].offsetWidth; 
	var cols = Math.floor(document.documentElement.clientWidth/bWidth);
	container.style.width = bWidth * cols + "px";

	for(var i = totalNum, len = boxes.length; i < len; i++) {
		if (i < cols) {
			arr[i] = boxes[i].offsetHeight;
			boxes[i].style.left = bWidth * i + "px";
		} else {
			var minH = Math.min.apply(Math, arr),
				minIndex = getMinHeightIndex(minH, arr);

			boxes[i].style.left = minIndex * bWidth + 'px';
			boxes[i].style.top = minH + 'px';
			arr[minIndex] += boxes[i].offsetHeight;
		}

		totalNum = boxes.length;
	}

}

/**
 * 通过类名获取元素
 * @param  {Element} oParent 父元素
 * @param  {String} child   要获取的类名
 * @return {类数组对象}   
 */
function getByClass(oParent, child) {
	var items = oParent.getElementsByTagName('*');
	var res = [];    // 待返回的数组

	for (var i = 0, len = items.length; i < len; i++) {
		if(items[i].className.indexOf(child) != -1) {
			res.push(items[i]);
		}
	}
	return res;
}

/**
 * 获取最小高度在数组中的索引值
 * @param  {Number} num 高度值
 * @param  {Array} arr 数组
 * @return {Number}     
 */
function getMinHeightIndex(num, arr) {
	for (var i in arr) {
		if(arr[i] === num) {
			return i;
		}
	}
}

// 判断是否应该继续加载新图片
function checkScroll() {
	var cHeight = document.documentElement.clientHeight || document.body.clientHeight;
	var scroll = document.documentElement.scrollTop || document.body.scrollTop;

	var container = document.getElementById("container");
	var boxes = getByClass(container, "box");
	var lastOffsetH = boxes[boxes.length - 1].offsetTop;  //最后一个盒子距离文档顶端的高度

	return (lastOffsetH + Math.floor(boxes[boxes.length-1].offsetHeight/2) <= cHeight + scroll) ? true : false;
	// return false;
}

// Ajax
function ajaxGetData(url, callback) {
	var xhr = new XMLHttpRequest();
	xhr.open("GET", url);
	xhr.onreadystatechange = function() {
		if(xhr.readyState == 4 && xhr.status == 200) {
			callback(xhr.responseText);

		}
	};
	xhr.send(null);
}

// 添加新数据
function addNewImage(data) {
	data = JSON.parse(data);
	// console.log(data);
	var container = document.getElementById('container');
	for(var i in data) {
		var image = new Image();
		image.src = "images/" + data[i];

		var box = document.createElement("div"),
			pic = document.createElement("div");
		box.className = "box";
		pic.className = "pic";
		box.appendChild(pic);
		pic.appendChild(image);
		container.appendChild(box);

		waterfall("container", "box");
	}


}