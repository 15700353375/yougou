$(function(){


	// header部分
	$(".ind_linkshouer").hover(function(){
		$("span",$(".ind_linkshouer")).show();
	},function(){
		$("span",$(".ind_linkshouer")).hide();
	});
	$(".phone_left").hover(function(){
		$(this).css("background","#fff");
		$(".phone_con1").show();
	},function(){
		$(".phone_con1").hide();
		$(this).css("background","none");
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
	$(".mycar").hover(function(){
		$(".car_con").show();
	},function(){
		$(".car_con").hide();
	});



	$(".ind_hea_list li").hover(function(){
		$(this).children("a").css("color","#e60012");
	},function(){
		$(this).not(".curr").children("a").css("color","#666");
	});

	$(".nav_con_left").hover(function(){
		$(".mian_nav").show();
	},function(){
		$(".mian_nav").hide();
	});
	$(".mian_nav").hover(function(){
		$(this).show();
	},function(){
		$(this).hide();
	});
	$(".classnav li").hover(function(){
		$(this).css("background","#666");
		$(this).find("a").css("color","#fff");
		$(".classnav_con").show();
	},function(){
		$(".classnav_con").hide();
		$(this).css("background","0");
		$(this).find("a").css("color","#333");
	});

	$(".classnav_con").hover(function(){
		$(this).show();
	},function(){
		$(this).hide();
	});

	$(".m_h").hover(function(){
		$(".m_healist").show();
	},function(){
		$(".m_healist").hide();
	});

	$(".xtype1>li").hover(function(){
		$(this).children("a").children("span").addClass("curr");
		$(this).children("a").addClass("curr");
		$(".hover_con1").eq($(this).index()).show();
	},function(){
		$(this).children("a").children("span").removeClass("curr");
		$(this).children("a").removeClass("curr");
		$(".hover_con1").eq($(this).index()).hide();
	});
	$(".xtype2>li").hover(function(){
		$(this).children("a").addClass("curr");
		$(this).children("a").children("span").addClass("curr");
		$(".hover_con2").eq($(this).index()).show();
	},function(){
		$(this).children("a").removeClass("curr");
		$(this).children("a").children("span").removeClass("curr");
		$(".hover_con2").eq($(this).index()).hide();
	});


	//从json里面读取图片数据
	$(window).on("load",function(){
		// alert(2354);
		$.get(
			"../json/user.json",
			function(data){
				console.log(data);
				var all_pic=data.data.all_pic;
				// 	dlHeight=$("#index_container dl").eq(0).height(),
				// 	winHeight=$(window).height();
				// console.log(dlHeight,winHeight);
				// $(window).on("scroll",function(){
				// 	var scTop=$(this).scrollTop();
				// 	console.log(scTop);
					// if(scTop>(winHeight-dlHeight)){
						$.each(all_pic,function(index,element){
							$("#index_container dl:first").clone(true).appendTo("#index_container").show()
							.find(".pics").children("img").attr("src",element.url).parents("ul")
							.find(".cheap").text(element.cheap).parents("dd")
							.find(".tit").text(element.title).parents("dd")
							.find(".price").text(element.price).parents("dd")
							.find("del").text(element.del);
						});
					// }
				// });
			}
		);
	});

});