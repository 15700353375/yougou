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




	//-----------------放大镜部分-----------------------------------------

	var imgWidth=$(".middle_pic").eq(0).width(),//容器宽度
		imgHeight=$(".middle_pic").eq(0).height(),//容器高度
		popWidth=$(".pop").outerWidth(),//遮罩层宽度
		popHeight=$(".pop").outerHeight();//遮罩层高度
		movePosX=imgWidth-popWidth,//可移动宽度
		movePosY=imgHeight-popHeight;//可移动高度
	
	//点击选取颜色
	$(".color_chose>a").each(function(index,element){
		$(this).on("click",function(){
			// console.log($(this).index());
			$(".middle_pic").eq(index).show().siblings().hide();
			$(".small_pic").eq(index).show().siblings().hide();
			$(".big_pic").eq(index).show().siblings().hide();
			eventMove($(".middle_pic").eq(index),$(".big_pic").eq(index));
			// $(".small_pic").eq(index).children("img").eq(0).click();
			pics=$(".small_pic").eq(index).find("img").eq(0).attr("src");
			console.log(pics);
			smallClick($(".small_pic").eq(index),$(".middle_pic").eq(index),$(".big_pic").eq(index));

		});
	});
	var i;//作为全局的中间变量，方便索引值得传递
	//小图的点击事件
	function smallClick($smallpic,$middlepic,$bigpic){
		$smallpic.find("img").each(function(index,element){
			$(this).on("click",function(){
				i=index;
				console.log(i);
				$middlepic.find("img").eq(index).show().siblings().hide();
				$bigpic.find("img").eq(index).show().siblings().hide();
				$(this).addClass("curr").parent().siblings().children().removeClass("curr");
				$(this).prev().show().parent().siblings().children("a").hide();
			});
			//默认给第一张小图加点击事件
			$smallpic.find("img").eq(0).click();
		});
	}

	$(".small_pic").eq(0).find("img").each(function(index,element){
		$(this).on("click",function(){
			i=index;
			console.log(i);
			$(".middle_pic").eq(0).find("img").eq(index).show().siblings().hide();
			$(".big_pic").eq(0).find("img").eq(index).show().siblings().hide();
			$(this).addClass("curr").parent().siblings().children().removeClass("curr");
			$(this).prev().show().parent().siblings().children("a").hide();
			eventMove($(".middle_pic").eq(0),$(".big_pic").eq(0));
		});
	});

	$(".small_pic").eq(0).find("img").eq(0).click();
	//鼠标移入移出遮罩层以及大图部分
	function eventMove($middle,$big){
		$middle.hover(function(){
			$middle.find(".pop").show();
			$(".big_box").show();
			$big.show();
		},function(){
			$middle.find(".pop").hide();
			$(".big_box").hide();
			$big.hide();
			// $(".pop,.big_box").hide();
		}).on("mousemove",function(event){//拖拽效果
			//让鼠标位置绑定遮罩层中间位置
			var _left=event.pageX-popWidth/2,
				_top=event.pageY-popHeight/2;
			//遮罩层随鼠标移动部分
			$middle.find(".pop").offset({
				"left":_left,
				"top":_top
			});
			//遮罩层不出框
			_left=$middle.find(".pop").position().left;
			_top=$middle.find(".pop").position().top;
			// console.log(_left,_top);
			if(_left<0)
				_left=0;
			else if(_left>movePosX)
				_left=movePosX;
			if(_top<0)
				_top=0;
			else if(_top>movePosY)
				_top=movePosY;
			$middle.find(".pop").css({
				"left":_left,
				"top":_top
			});
			//大图移动部分
			console.log("dshfnu",i);
			$big.find("img").eq(i).css({
				"left":-_left*1.68,
				"top":-_top*1.67
			});
		});
	}

	var colors,sizes,pics;
	//数量加减
	$(".add").on("click",function(){
		var amount=$(".amount").val();
			amount++;
		$(".amount").val(amount);
	});
	$(".minus").on("click",function(){
		var amount=$(".amount").val();
		if(amount<=1)
			return;
			amount--;
		$(".amount").val(amount);
	});

	
	//颜色选中
	$(".color_chose>a").hover(function(){
		$(this).addClass("current");
		$(this).children(".hover_img").show();
	},function(){
		$(this).removeClass("current");
		$(this).children(".hover_img").hide();
	}).on("click",function(){
		colors=$(this).find("img").attr("alt");
		// pics=$(this).children("img").attr("src");
		$(this).children(".picon").show().parents("a").siblings().children(".picon").hide();
		$(this).css("border","1px solid #f00").siblings().css("border","1px solid #ddd");
		$(this).find("img:first").clone(true).appendTo($(this))
		.addClass("gocart").css({
			"border-radius":"60px",
			"z-index":99999
		}).parents("a").children(".gocart").siblings(".gocart").removeClass("gocart");
	});
	//默认给第一个颜色选择框添加点击事件
	$(".color_chose>a").eq(0).children(".picon").show();
	$(".color_chose>a").eq(0).css("border","1px solid #f00");
	// 尺码选择
	$(".size_chose").find("a").each(function(){
		$(this).on("click",function(){
			// console.log($(this).text());
			sizes=$(this).text();
			$(this).children("span").show().parents("a").siblings().children("span").hide();
			$(this).css("border","1px solid #f00").siblings().css("border","1px solid #ddd");
		});
	});
	//加入购物车部分
	// var num=0;
	var second=10;
	$("#addShoppingCart").on("click",function(){
		var uName=$.cookie("uName");
		if(uName){
			var pic=pics,
				name=$(".rel_center>h1").text();
				color=colors,
				size=sizes,
				amounts=$(".amount").val(),
				price=$(".rel_price").find("a").text();
			var num=$.cookie("num");
				// console.log(pics,name,color,size,amounts,price);
			if(!size){
				$(".no_size").show();
				$(".size_chose>a").each(function(){
					$(this).on("click",function(){
						$(".chose_size").show().on("click",function(){
							$(".no_size").hide();
						});
					});
				});
				$(".no_size>h2>a").on("click",function(){
					$(".no_size").hide();
				});
			}
			else{//可以加入购物车时，读取出cookie中的数量和总计
				var totals=$.cookie("totals");
				$(".total_cart").text(totals);
				$(".total_amount").text(num);
				$(".shade").show(function(){
					setInterval(function(){
						second--;
					if(second<=0){
						$(".shade").hide();
					}
					$(".second").text(second);
				},1000);second=10;
				}).find(".jies").click(function(){
					location="cart.html";
				}).parents(".clickbuy").find(".switch").click(function(){
					$(this).parents(".shade").hide();
					second=10;
				});
			
			//购物车中的商品的数量存进cookie里面
			
			if(!num){
				var num=0;
			}
			else{
				num++;
			}
			$.cookie("num",num,{expires:7});
			$("#pordcount").text(num);
			
			console.log(pic,name,color,size,amounts,price);
			var product={
				"pic":pic,
				"name":name,
				"color":color,
				"size":size,
				"amount":amounts,
				"price":price
			}
			$.cookie.json=true;
			var products=$.cookie("products");
			if(!products){
				products=[];
			}
			var index=findProdIndex(name,size,products);
			console.log(index);
			if(index!=-1){
				products[index].amount++;
			}
			else{
				products.push(product);
			}
			$.cookie("products",products,{expires:7});

			//登录成功并选择样式加入购物车的时候图片飞入购物车
			$(".gocart").show().animate({
				left:"250",
				top:"-200",
				width:100,
				height:100
			},1000).animate({
				left:"480",
				top:"-350",
				width:0,
				height:0
			},1000,function(){
				$(this).removeClass();
			});
		}
		}
		else{
			alert("登录之后才能加入购物车！");
		}
	
	});

	function findProdIndex(name,size,element){
		var prodIndex=-1;
		$.each(element,function(index,element){
			console.log(element.size,size);
			if(element.name==name&&element.size==size){
				prodIndex=index;
				return false;
			}
		});
		return prodIndex;
	}












	//轮播图部分
	lunbotu($(".clothes"),$(".cc_prev"),$(".cc_next"),$(".dc_pages"));
	lunbotu($(".clothes1"),$(".cc_prev2"),$(".cc_next2"),$(".dc_pages2"));
	//轮播图(左右轮播)
	function lunbotu($element,$ele2,$ele3,$page){
		var lis=$element.find(".li"),//获取所有图片盒子
			len=lis.length,//li的个数
			liWidth=lis.eq(1).width()+2,//每个li盒子的宽度
			first=lis.eq(0).clone().appendTo($element),//把第一张图片克隆放到最后
			last=lis.eq(len-1).clone().prependTo($element),//把最后一张图片克隆放到最前面
			nextIndex=2,//即将显示的图片索引
			isMoving=false,//是否正在运动过程中
			time=null;
			// console.log(liWidth);
		
		len+=2;
		// console.log(len);
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
				//显示页数
				if (nextIndex>4) {
					$("span",$page).text("1");
				}
				else{
					$("span",$page).text(nextIndex);
				}
				nextIndex++;

				$element.animate({
					"left" : _left
				},500,function(){
					if(nextIndex>=len){//左移边界
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
		// 上一页
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
	};

	lunbotu2($(".look_con"),$(".up"),$(".down"));
	// 上下轮播
	function lunbotu2($element,$ele2,$ele3){
		var lis=$element.find(".li"),//获取所有图片盒子
			len=lis.length,//li的个数
			liHeight=lis.eq(1).height()+15,//每个li盒子的宽度
			first=lis.eq(0).clone().appendTo($element),//把第一张图片克隆放到最后
			last=lis.eq(len-1).clone().prependTo($element),//把最后一张图片克隆放到最前面
			nextIndex=2,//即将显示的图片索引
			isMoving=false,//是否正在运动过程中
			time=null;
			// console.log(liHeight);
		
		len+=2;
		// console.log(len);
		//设置容器宽度
		// 初始化显示索引为1的图片
		$element.css({
			"height":liHeight*len,
			"top":-liHeight
		});
		//自动轮播
		// time=setInterval(move,2000);
		//自动轮播函数
		function move(){
			if(!isMoving){
				//设置正在运动过程中
				isMoving=true;
				var _top=-liHeight*nextIndex;

				nextIndex++;

				$element.animate({
					"top" : _top
				},500,function(){
					if(nextIndex>=len){//左移边界
						$element.css("top",-liHeight);
						nextIndex=1;
					}
					else if(nextIndex<=1){//右移边界
						$element.css("top",-liHeight*(len-2));
						nextIndex=len-1;
					}
					isMoving=false;
				});
			}
		}
		// 上一页
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
	};


	// 商品详情选项卡
	$(".ic_nav a").on("click",function(index,element){
		$(this).addClass("curr").siblings().removeClass("curr");
		$(".icl_con>div").eq($(this).index()).show().siblings().hide();
	});


	//选项卡固定在页面顶部
	var nav_top=$(".ic_nav").offset().top;
	// console.log(nav_top);
	$(window).on("scroll",function(){
		var _top=$(this).scrollTop();
		if(_top>nav_top){
			$(".ic_nav").css({
				"position":"fixed",
				"top":0
			});
		}
		else{
			$(".ic_nav").css({
				"position":"relative"
			});
		}
	});

	//点评
	$("span",$(".view")).on("click",function(){
		alert("对不起，购买过该商品的会员才能评论！");
	});


});