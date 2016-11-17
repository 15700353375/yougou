<?php
	$type = $_POST["type"];
	
	if(isset($type)){//存在未true
			
		if($type == "checkusername"){
			$flag = "";
			$username = $_POST["username"];
			$json = file_get_contents("../json/user1.json"); //获取user1.json里的数据 json格式
			$arr_json = json_decode($json,true);//将json格式的数据转化为数组类型的数据
				
			for($i=0;$i<count($arr_json);$i++){ //获取数组长度
				if($arr_json[$i]["name"] == $username){
					$flag = true;
				}
			}
			echo json_encode($flag); //echo 返回前台的值  json_encode 将数组类型转换为json类型的数据
		}
		
		if($type == "insert"){
			$flag = true;
			$username = $_POST["username"];
			$password = $_POST["password"];
			
			$array = array("name" => $username,"pwd" => $password);//封装成一个数组
			
			$json = file_get_contents("../json/user1.json");//获取user1.json里面的对象
			$arr_json = json_decode($json,true);
			
			array_push($arr_json,$array);//数组添加元素 把$array 放到$arr_json里面
			
			$json = json_encode($arr_json);
			file_put_contents("../json/user1.json",$json);//把更新后的数据放回去 之前的会被更新掉
			
			echo json_encode($json);//返回到前台去
			
		}
		
		if($type == "login"){
			$flog = "";
			$name = $_POST["username"];
			$pwd = $_POST["password"];
			
			$json = file_get_contents("../json/user1.json");
			$arr_json = json_decode($json,true);
			
			for($i=0;$i<count($arr_json);$i++){
				if($arr_json[$i]["name"] == $name && $arr_json[$i]["pwd"] == $pwd){
					$flog=true;
				}
			}
			
			// $json_encode = json_encode($arr_json);
			// file_put_contents("user1.json",json_encode);
			
			echo json_encode($flog);
		}
		
	}
	
?>