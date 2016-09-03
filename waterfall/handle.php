<?php
	$arr = array();
	for($i = 0; $i < 20; $i++) {
		$arr[$i] = $i + 20 . ".jpg";
	}
	echo json_encode($arr);