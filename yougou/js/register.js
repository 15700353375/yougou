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




	var p,checku;
	//注册部分
	$("#username").on("blur",function(){
		checkUsername();
		
	});
	$("#password").on("blur",function(){
		checkPassword();
		
	});
	$("#password2").on("blur",function(){
		checksame();
		
	});

	//检测用户名格式
	function checkUsername(){
		checku= /^[0-9_-]{11}$/.test($("#username").val());
		if(!checku){
			$(".uckf12").show();
			$(".correct1").hide();
			$(".uckf11").hide();
		}
		else{
			checkUserExist($("#username").val());
		}
	}
	var key=false;
	//检测用户名是否存在
	function checkUserExist(name){
		$.ajax({
			type:"post",
			url:"../php/demo1.php",
			async:true,//异步
			data:{"type":"checkusername","username":name},
			success:function(data){
				var flag=JSON.parse(data); //把data转换为json格式
				if(flag==true){//用户名已存在
					$(".uckf11").show();
					$(".uckf12").hide();
					key=true;
					$("#username").val("");
				}
				else{
					key=false;
					$(".correct1").show();
					$(".uckf11").hide();
					$(".uckf12").hide();
				}
			}
		});
	}
	//检测密码
	function checkPassword(){
		 p= /^[a-z0-9_-]{6,18}$/.test($("#password").val());
		var len=$("#password").val().length;
		console.log(len);
		if(p){//如果格式符合正则条件页面上出现提示信息
			$(".pwdLength").show();
			$(".uckf2").hide();
			$(".correct2").show();
			if(len<10){//根据密码的长度来判断密码的强弱等级
				$(".pwdLength>a").eq(0).addClass("curr");
			}
			else if(len<15){
				$(".pwdLength>a").eq(1).addClass("curr");
			}
			else if(len<=18){
				$(".pwdLength>a").eq(3).addClass("curr");
			}
		}
		else{//格式不符合正则页面出现的提示信息
			$(".uckf2").show();
			$(".pwdLength").hide();
			$(".correct2").hide();
			$("#username").val("");
		}
	}
	//检测两次输入的密码是否一致
	function checksame(){
		if($("#password").val()===$("#password2").val()){
			$(".uckf3").hide();
			$(".correct3").show();
		}
		else{
			$(".uckf3").show();
			$(".correct3").hide();
			$("#password2").val("");
			$("#username").val("");
		}
	}
	//点击注册部分
	$(".log_sub").on("click",function(){//如果符合以上所有条件才能注册
		if(checku&&p&&($("#password").val()==$("#password2").val())&&(key==false)&&(key1==false)){
			alert("主人，注册啦！！");
			
			var name=$("#username").val(),
				pwd=$("#password").val();
				console.log(name,pwd);
			$.ajax({
				type:"post",
				url:"../php/demo1.php",
				async:true,
				data:{"type":"insert","username":name,"password":pwd},
				success:function(data){
					location="login.html";
				}
			});
		}
		else{
			alert("主人，注册不了！");
			$("#ver_con").val("");
			$("#password2").val("");
			$("#password").val("");
			$("#username").val("");
		}
	});

	//验证码部分
	var arr=['a','b','c','d','e','f','g','h','i','j','k','l',
	'm','n','o','p','q','r','s','t','u','v','w','x','y','z',
	'0','1','2','3','4','5','6','7','8','9'];
	var str="",key1=false;
	while(str.length<4){
		var num=parseInt(Math.random()*36);
		str+=arr[num];
	}
	$("#yanzheng_name").val(str.toUpperCase());

	//验证
	$("#ver_con").on("blur",function(){
		if($(this).val().toUpperCase()==$("#yanzheng_name").val()){
			$(".correct4").show();
			// alert("对了耶！");
			key1=false;
		}
		else{
			// alert("竟然错了，不开森！");
			key1=true;
			$("#ver_con").val("");
		}
	});






});