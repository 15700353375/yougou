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

//登录成功才能加购物车
//
	var totals=0;
	var uName=$.cookie("uName");
	if(uName){
		//购物车部分
		$.cookie.json=true;
		var products=$.cookie("products");//从cookie中读取所保存的cookie信息
		// 遍历cookie中的每个对象并放入相应的位置
		$.each(products,function(index,element){
			console.log(element.pic);
			$(".temp").clone(true).removeClass("temp").addClass("cart_body")
			.appendTo(".cart").show()
			.find(".name1").html("<img src="+element.pic+">").parent()
			.find(".name2").text(element.name).parents(".cart_body")
			.children(".colorsize").html(element.color+"<br/>"+element.size).parent()
			.children(".price").text(element.price).parent()
			.find(".num").val(element.amount).end()
			.children(".sub").text((element.price*element.amount).toFixed(2)).end()
			.find("a").data("product",element).parent().parent()//在元素上存放数据并返回jquery对象
			.find(".ck").data("product",element);
			totals+=element.price*element.amount;
			$.cookie("totals",totals,{expires:7});
			console.log(totals);
		});

		//点击删除行
		$(".cart a").on("click",function(){
			var prod=$(this).data("product"),
				index=$.inArray(prod,products);
			if(index!=-1){
				products.splice(index,1);
				$.cookie("products",products,{expires:7});
				$(this).parents(".cart_body").remove();
			}
			calTotal();
			// console.log(prod);
		});

		// 全选框的选中状态
		$("#ck_all").on("click",function(){
			// alert("435");
			var status=$(this).prop("checked");
			// console.log(status);
			$(".ck").prop("checked",status);
			calTotal();
		});
		//更新总计的函数
		function calTotal(){
			var $element=$(":checked").parents(".cart_body").find(".sub");
			var total=0;
			$element.each(function(){
				total+=parseFloat($(this).text());
				console.log(total);
			});
			$(".total_all").text(total.toFixed(2));
		}
		
		var product_con=[];
		//选中部分更新总计
		$(".ck").on("click",function(){
			var isAllchecked=true;
			$(".ck:not(:last)").each(function(index,element){
				if(!$(element).prop("checked")){
					isAllchecked=false;
					return false;
				}
			});
			calTotal();
			$("#ck_all").prop("checked",isAllchecked);
			
			//选中部分存入cookie方便确认订单部分使用
			var prod=$(this).data("product");
			
			product_con.push(prod);
			// console.log(product_con);
			$.cookie("product_con",product_con,{expires:7});
		});

		//加数量
		$(".add").on("click",function(){
			var amount=$(this).prev(".num").val();
				amount++;
				update($(this).parents(".cart_body"),amount);
		})
		//减数量
		$(".minus").on("click",function(){
			var amount=$(this).next(".num").val();
				amount--;
				if(amount<=1)
					return;
				update($(this).parents(".cart_body"),amount);
		})

		//更新数量和小计
		function update($element,amount){
			var prod=$element.find("a").data("product");//获取当前的cookie信息
			prod.amount=amount;// 更新数量
			//c重新存入cookie
			$.cookie("products",products,{expires:7});
			//更新页面上的数量
			$element.find(".num").val(amount);
			//更新小计
			var subTotal=(prod.amount*prod.price).toFixed(2);
			$element.find(".sub").text(subTotal);

		}
		//清空购物车
		$(".clear_all").on("click",function(){
			var product=[];
			$.removeCookie("products");
			$(".cart_body").remove();
			$(".cart").remove();
			$(".noshop").show();
			$(".haveshop").hide();
			$(".total").hide();
			alert("确认清空购物车！");
		});

		//点击结算
		$(".payment").on("click",function(){
			var flag=false;
			$(".ck:not(:last)").each(function(index,element){
				if($(element).prop("checked")){//如果有选中的开关变量为true
					flag=true;
				}
			});
			if(flag==true){//有选中商品实现跳转
				location="confirm.html";
			}
			else{//没有则不跳转
				alert("请选择您要购买的商品");
				return false;
			}
		});

	}
























	//底部轮播图

	lunbotu($(".clothes"),$(".bmc_left"),$(".bmc_right"),$(".dc_pages"));
	lunbotu($(".clot2"),$(".bmb_left"),$(".bmb_right"),$(".dc_pages2"));

	function lunbotu($element,$ele2,$ele3,$page){
		var lis=$element.find(".li"),//获取所有图片盒子
			len=lis.length,//li的个数
			liWidth=lis.eq(1).width()+2,//每个li盒子的宽度
			first=lis.eq(0).clone().appendTo($element),//把第一张图片克隆放到最后
			last=lis.eq(len-1).clone().prependTo($element),//把最后一张图片克隆放到最前面
			nextIndex=2,//即将显示的图片索引
			isMoving=false,//是否正在运动过程中
			time=null;
			console.log(liWidth);
		
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
				//显示页数
				if (nextIndex>2) {
					$("span",$page).text("1");
				}
				else if(nextIndex<1){
					$("span",$page).text("2");
					
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
});