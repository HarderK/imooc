/* 利用jQuery实现 */
$(function(){
	// console.log($("#search-form").offset());
	$(".search-input-text").keyup(function(){	// 用户输入内容的时候展示提示框
		// $("#search-suggest").css("display", "block");
		var searchText = this.value;

		// 这里测试有同源问题
		/*$.get("http://api.bing.com/qsonhs.aspx?q=" + searchText,function(data){
			var data = data.AS.Results[0].Suggests;
			var html = "";
			for(var i = 0; i < data.length; i++ ) {
				html += "<li>" +data[i].Txt + "</li>";
			}

			$("#search-result").html(html);

			// 显示提示框
			$("#search-suggest").show().css(    // 使用show()方法更方便
				{
					top: $("#search-form").offset().top + $("#search-form").height() + 10,
					left: $("#search-form").offset().left - 1
				}
			);	
		}, "json");*/

		// 尝试跨域， 测试API的响应有问题，能够获取到数据，但是success回到函数不执行，自己写了PHP文件响应没有问题
		// 此bing API 返回头的Content-Type为application/json，而且开启了严格的类型检查(X-Content-Type-Options:nosniff)，
		// 我们期望得到的是application/javascript 
		// 所以需要修改服务器端的响应头，我们只能在服务器端修改
		$.ajax({
			type: "GET",
			url: "http://api.bing.com/qsonhs.aspx",
			data: {
				q: searchText
			},
			dataType: "jsonp",
			jsonp: "callback",
			success: function(data) {
				var data = data.AS.Results[0].Suggests;
				var html = "";
				for(var i = 0; i < data.length; i++ ) {
					html += "<li>" +data[i].Txt + "</li>";
				}

				$("#search-result").html(html);

				// 显示提示框
				$("#search-suggest").show().css(    // 使用show()方法更方便
					{
						top: $("#search-form").offset().top + $("#search-form").height() + 10,
						left: $("#search-form").offset().left - 1
					}
				);	
			}
		});
		
	}).blur(function(){
		// $("#search-suggest").css("display", "none");
		$("#search-suggest").hide();	// hide()相当于设置display:none;
	}).focus(function(event){
		this.select();
		if($.trim(this.value).length > 0){
			$("#search-suggest").css("display", "block");
		}
	});

	$(document).delegate("li", "click", function(){
		var keyword = $(this).text();
		location.href = "http://cn.bing.com/search?q=" + keyword;
	})
});