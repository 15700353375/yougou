$(function(){

	//回到顶部
	$(window).on("scroll",function(){
		if($(this).scrollTop()>10)
			$(".goback").show();
		else
			$(".goback").hide();
		$(".goback").on("click",function(){
			$("html,body").scrollTop(0);
		});
	});

	//倒计时
	var gotime=new Date(2016,10,11);
	setInterval(run,1000);
	console.log(gotime);
	function run(){
		var oData=new Date();
		var leftTime=gotime.getTime()-oData.getTime(),//获取剩下的毫秒数
			leftMon=Math.floor(leftTime/(1000*60*60*24*31)),
			leftDay=Math.floor((leftTime%(1000*60*60*24*31))/(1000*60*60*24));
			leftHour=Math.floor((leftTime%(1000*60*60*24))/(1000*60*60));
			leftMins=Math.floor((leftTime%(1000*60*60))/(1000*60));
			leftSec=Math.floor((leftTime%(1000*60))/1000);
		$(".count_down").find("span").eq(0).text(leftDay)
		.next().next().text(leftHour)
		.next().next().text(leftMins)
		.next().next().text(leftSec);

	}



	
	var uName=$.cookie("uName");
	if(uName){
		// 登录成功之后跳转到该页面，页面信息的改变
		$(".login_con").hide();
		$(".login_success").show().children("span").text(uName).parent()
		.children(".quit").on("click",function(){
			alert("小主，确认要退出吗？");
			$.removeCookie("uName");
			$(".login_con").show();
			$(".login_success").hide();
			$("#pordcount").text(0);
		});
		//每个页面里面显示的购物车的数量
		var num=$.cookie("num");
		//购物车的显示
		$("#pordcount").text(num);
	}
	else{
		$(".login_con").show();
		$(".login_success").hide()
	}
	

	$(".classnav_con").each(function(){
		$(this).find(".class_child").find("h4").hover(function(){
			// alert("3453")
			$(this).animate({
				left:10
			},50);
		},function(){
			$(this).animate({
				left:0
			},50);
		});
	});
});