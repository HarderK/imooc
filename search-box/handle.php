<?php
	// header("Content-type:application/json");
	//$jsonp = $_GET['callback'];		// 用于JSONP
	$arr = array("name"=>"yanxiong");
	$encode = json_encode($arr);
	// echo $jsonp."(".$encode.")"; // 用于JSONP
	echo $encode;