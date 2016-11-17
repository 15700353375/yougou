$(function(){
	//头部大图的运动 
	// $(window).on("load",function(){
		$(".headerbanner_con").animate({height:"570"},800).delay(800).animate({height:"45"},1500,function(){
			$("#headerbanner").fadeIn(1000);
		})
		
	// });
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

	$(".classnav li").hover(function(index){
		$(this).css("background","#666");
		$(this).find("a").css("color","#fff");
		$(".classnav_con").eq($(this).index()).show();
	},function(index){
		$(".classnav_con").eq($(this).index()).hide();
		$(this).css("background","0");
		$(this).find("a").css("color","#333");
	});
	$(".classnav_con").hover(function(){
		$(this).show();
	},function(){
		$(this).hide();
	});


	//楼层导航
	
	function danrudanchu($element){
		var imgs=$("li",$element),
			len=imgs.length,
			currIndex=0,
			nextIndex=1,
			time=null;
		time=setInterval(move,5000);
		//自动轮播部分
		function move(){
			//淡入淡出部分
			imgs.eq(currIndex).fadeOut(100);
			imgs.eq(nextIndex).fadeIn(100);
			//绑定小圆点
			$(".pages div").eq(currIndex).removeClass("curr");
			$(".pages div").eq(nextIndex).addClass("curr");
			currIndex=nextIndex;
			nextIndex++;
			if(nextIndex>=len){
				nextIndex=0;
			}
		}
		// //小圆点的添加
		for(var i=0;i<len;i++){
			$(".pages").append("<div>"+(i+1)+"</div>");
		}
		//处理第一个小圆点
		$(".pages div").eq(0).addClass("curr");
		//小圆点的点击事件
		$(".pages div").on("click",function(){
			nextIndex=$(this).index();
			//避免多次点击出现空白
			if($(this).index()==currIndex){
				return;
			}
			move();
		});
		// //上一页
		// $(".prev").on("click",function(index,element){
		// 	nextIndex=currIndex-1;
		// 	if(nextIndex<0){
		// 		nextIndex=len-1;
		// 	}
		// 	move();
		// });
		// //下一页
		// $(".next").click(move);
		// //鼠标移入移出
		// $("#container").hover(function(){
		// 	clearInterval(time);
		// },function(){
		// 	time=setInterval(move,2000);
		// });
	}


		//大图淡入淡出
		//
		//
		danrudanchu($(".box"));
		// danrudanchu($(".aw_box"));
		lunbotu($(".aw_box"),$(".aw_left"),$(".aw_right"));
		lcdh($(".container_main"),$("#louceng_nav"));
	});


//楼层导航
function lcdh($element,$nav){
		var headerHeight=1500,
			winHeight=$(window).height(),//一屏的高度
			floHeight=$element.height(),
			isScrolling=false;//false 表示为自动滚动 true表示点击了楼层导航，正在自动滚动
		//处理滚动事件
		$(window).on("scroll",function(){
			if(!isScrolling){
				var scTop=$(this).scrollTop();
				if(scTop>headerHeight-winHeight){
					$nav.show();
				}else{
					$nav.hide();
				}
				//切换显示导航楼层的样式
				$element.each(function(index,element){
					//当前遍历到的楼层与文档顶部的距离
					var _top=$(this).offset().top;
					//判断
					if(scTop>_top-winHeight/2){
						// $("#nav li span").hide();//初始化
						// 给当前楼层加类样式
						$nav.find("li").eq(index).addClass("curr")
						.siblings().removeClass("curr");
					}
				});
			}
		});
		//导航鼠标移入移出
		$nav.find("li").hover(function(){
				$(this).addClass("curr1");
			},function(){
				$(this).not("curr").removeClass("curr1");
		}).on("click",function(){//点击实现楼层的跳转操作
				isScrolling=true;
				var index=$(this).index();//所点击导航的索引
				var _top=$element.eq(index).offset().top;//获取对应楼层该滚动到的目标位置
				$(this).addClass("curr")
				.siblings().removeClass("curr");
				$("html,body").animate({"scrollTop":_top},500,function(){
				isScrolling=false;
				});//谷歌用body、、火狐用html
		});
	}

	//轮播图
	function lunbotu($element,$ele2,$ele3,$page){
		var lis=$("li",$element),//获取所有图片盒子
			len=lis.length,//li的个数
			liWidth=lis.eq(1).width();//每个li盒子的宽度
			first=lis.eq(0).clone().appendTo($element),//把第一张图片克隆放到最后
			last=lis.eq(len-1).clone().prependTo($element),//把最后一张图片克隆放到最前面
			nextIndex=2,//即将显示的图片索引
			isMoving=false,//是否正在运动过程中
			time=null;
			console.log(liWidth);
		//添加小圆点
		// for(var i=0;i<len;i++){
		// 	$("#pages").append("<div></div>");
		// }	
		//给第一张图片设置小圆点索引样式
		// $("#pages div").eq(0).addClass("curr");
		//修改图片长度
		
		len+=2;
		console.log(len);
		//设置容器宽度
		// 初始化显示索引为1的图片
		$element.css({
			"width":liWidth*len,
			"left":-liWidth
		});
		//自动轮播
		// time=setInterval(move,2000);
		//自动轮播函数
		function move(){
			if(!isMoving){
				//设置正在运动过程中
				isMoving=true;
				
				var _left=-liWidth*nextIndex;
				//图片的小圆点索引
				// var circleIndex = nextIndex === len - 1 ? 0 : (nextIndex === 0 ? len - 3 : nextIndex - 1);
				// $("#pages div").eq(circleIndex).addClass("curr").siblings().removeClass("curr");
				// if (nextIndex>4) {
				// 	$("span",$page).text("1");
				// }
				// else{
				// 	$("span",$page).text(nextIndex);
				// }
				nextIndex++;
				$element.animate({
					"left" : _left
				},500,function(){
					if(nextIndex>=len){//左移边界
						console.log("46");
						$element.css("left",-liWidth);
						nextIndex=1;
					}
					else if(nextIndex<=1){//右移边界
						$element.css("left",-liWidth*(len-2));
						nextIndex=len-1;
					}
					isMoving=false;
				});
			}
		}
		//给小圆点添加点击事件
		// $("#pages").on("click","div",function(index,element){
		// 	nextIndex=$(this).index()+1;
		// 	move();
		// });
		//上一页
		$ele2.on("click",function(){
			// clearInterval(time);
			if(isMoving)
				return;
			nextIndex-=2;
			move();
			// time=setInterval(move,2000);
		});
		//下一页
		$ele3.on("click",function(){
			move();
		});
		//鼠标移入移出
		// $("#container").hover(function(){
		// 	clearInterval(time);
		// 	$("#pages").css("display","black");
		// 	$("#next").css("display","block");
		// },function(){
		// 	time=setInterval(move,2000);
		// });
		// 
		// 
		//特卖专区的选项卡
		$(".mainc_list").find("li").hover(function(){
			$(this).css({
				"background":"#000",
				"color":"#fff"
			});
			console.log($(this).index());
			$(this).find("span").show();
			$(".mcr1").eq($(this).index()).show().siblings().hide();
		},function(){
			$(this).css({
				"background":"#fff",
				"color":"#666"
			});
			$(this).find("span").hide();
			// $(".mcr1").eq($(this).index()).hide();
		});
	}