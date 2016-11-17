$(function(){

	// header部分
	$(".phone_left").hover(function(){
		$(".phone_con1").show();
	},function(){
		$(".phone_con1").hide();
	});
	$(".myy1").hover(function(){
		$(".myy1").css("background","#fff");
		$(".myug_con1").show();
	},function(){
		$(".myug_con1").hide();
		$(".myy1").css("background","none");
	});
	$(".gonggao1").hover(function(){
		$(".gonggao1").css("background","#fff");
		$(".pos1").show();
	},function(){
		$(".pos1").hide();
		$(".gonggao1").css("background","none");
	});
	$(".gonggao2").hover(function(){
		$(".gonggao2").css("background","#fff");
		$(".pos2").show();
	},function(){
		$(".pos2").hide();
		$(".gonggao2").css("background","none");
	});


	// var p,checku;
	// //注册部分
	// $("#username").on("blur",function(){
	// 	checkUsername();
	// });
	// $("#password").on("blur",function(){
	// 	checkPassword();
	// });
	// 
	// 验证码部分
	var arr=['a','b','c','d','e','f','g','h','i','j','k','l',
	'm','n','o','p','q','r','s','t','u','v','w','x','y','z',
	'0','1','2','3','4','5','6','7','8','9'];
	var str="",key=true;
	while(str.length<4){
		var num=parseInt(Math.random()*36);
		str+=arr[num];
	}
	$("#yanzheng_name").val(str.toUpperCase());

	//验证
	$("#ver_con").on("blur",function(){
		if($(this).val().toUpperCase()==$("#yanzheng_name").val()){
			// alert("对了耶！");
			key=true;
			
		}
		else{
			// alert("竟然错了，不开森！");
			key=false;
			
		}
	});
	//检测用户名
	function checkUsername(){
		var name=$("#username").val(),
			pwd=$("#password").val();
		$.ajax({
			type:"post",
			url:"../php/demo1.php",
			async:true,
			data:{"type":"login","username":name,"password":pwd},
			success:function(data){
				var flog=JSON.parse(data);
				if(flog==true){
				//把用户名存入cookie方便注册成功后显示在页面上
					var uName=name;
					$.cookie("uName",uName,{expires:7});
					$(".uckf1").hide();
					location="index.html";
				}
				else{
					$(".uckf1").show();
					// alert("密码或用户名错误");
					// key=false;
				}
			}
		});
	}

	//登录部分
	$(".log_sub").on("click",function(){
		if(key==false){
			alert("验证码错误！");
			$(".uckf1").hide();
			$("#ver_con").empty();
			// $("#username").empty();
			// $("#password").empty();
		}
		else{
			checkUsername();
			$("#ver_con").empty();
			// $("#username").empty();
			// $("#password").empty();
		}
		
	});
	
});