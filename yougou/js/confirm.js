$(function(){
	$(".inp1").on("click",function(){
		$(".card_show1").show();
	});
	$(".inp2").on("click",function(){
		$(".card_show2").show();
	});
	$(".btn1").on("click",function(){
		$(".card_show1").hide();
	});
	$(".btn2").on("click",function(){
		$(".card_show2").hide();
	});


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
//收货人信息存入cookie
var key11=false,key12=false,key13=false;
	$("#receivingName").on("blur",function(){
		if($(this).val()){
			$(".mlt1").show().css("display","inline-block");
			proAndcity();
			$(".c9").hide();
			key11=true;
		}
		else{
			$(".c9").show();
			// alert("0000");
		};
	});
	//邮编
	$(".youbian_con").on("blur",function(){
		var checkyoubian=/^[0-9_-]{6}$/.test($(this).val());
		if(!checkyoubian){
			$(this).val("");
		}
	});
	//详细地址填写情况 
	$("#receivingAddress").on("blur",function(){
		if(!($(this).val()=="")){
			$(".mlt3").show().css("display","inline-block");
			$(".f_red").hide();
			key12=true;
		}
		else{
			$(".f_red").show();
			$(".mlt3").hide()
		}
	});
	//验证手机号码格式
	$("#receivingMobilePhone").on("blur",function(){
		if(!(/^[0-9_-]{11}$/.test($(this).val()))){
			$(".mltips4").show();
			$(this).val("");
		
		}
		else{
			$(".mltips4").hide();
				key13=true;
		}
	});

			//省市级联
	function proAndcity(){
		var address=[];
			$.getJSON(
				"../json/address.json",//url
				function(data){//callback
//					 console.log(data);
					var provinces=data.regions;//省份
//					 console.log(provinces);
					$.each(provinces,function(index,province){
//						 console.log(province);//各个省
						address[province.name]=[];
						var cities=province.regions;//市的数组
						$.each(cities,function(index,city){
							// console.log(city);//市
							address[province.name][city.name]=city.regions;
						});
					});
//					console.log(address);
					initProvince();
				}
			);
			function initProvince(){
				$("#province").append("<option value='-1'>请选择省份</option>");
				for(var provinceName in address){
					$("<option value='"+provinceName+"'>"+provinceName+"</option>").appendTo("#province");
				}
			}
			function initCity(){
				//获取当前已选择省份
				var provinceName=$("#province").val();
				$(".addre").show();
				$(".addre_province").show().text(provinceName);
				var cities=address[provinceName];//provinceName下面的市
				//显示城市
				$("#city").empty().append("<option value='-1'>请选择城市</option>");
				for(cityName in cities){
					$("<option>"+cityName+"</option>").appendTo("#city");
				}
//				console.log(cities);
			}
			//加载区县
			function initDistrict(){
				var provinceName=$("#province").val(),
					cityName=$("#city").val();
					$(".addre_city").show().text(cityName);
					// console.log(provinceName,cityName);
				var districts=address[provinceName][cityName];
				$("#district").empty().append("<option value='-1'>请选择区县</option>");
				for(var i in districts){
					$("<option value='"+districts[i].name+"'>"+districts[i].name+"</option>").appendTo("#district");
				}			
			}
			$("#province").on("change",initCity);
			$("#city").on("change",initDistrict);

			
			$("#district").on("change",function(){
				console.log($(this).val());
				$(".mlt2").show().css("display","inline-block");
				$(".addre_dis").show().text($(this).val());
			});
	}

	$(".save_addr").on("click",function(){
		if(key13==true&&key12==true&&key11==true){
			$(".gldz").show();
			var addname=$("#receivingName").val(),
				addpro=$(".addre_province").text(),
				addcity=$(".addre_city").text(),
				adddis=$(".addre_dis").text(),
				addstreet=$("#receivingAddress").val(),
				addphone=$("#receivingMobilePhone").val();
			var addres={
				"addname":addname,
				"addpro":addpro,
				"addcity":addcity,
				"adddis":adddis,
				"addstreet":addstreet,
				"addphone":addphone
			}
			$.cookie.json=true;
			var address=$.cookie("address");
			if(!address){
				address=[];
			}
				address.push(addres);
			$.cookie("address",address,{expires:7});
			$.each(address,function(index,element){
				console.log(element.addpro);
				$(".addr_box:first").clone(true).appendTo(".gldz").show()
				.find(".add_name").text(element.addname).parents(".addr_box")
				.find(".add_addr").children("span").eq(0).text(element.addpro)
				.next().text(element.addcity).next().text(element.adddis)
				.parents(".addr_box").find(".add_street").text(element.addstreet).parents(".addr_box")
				.find(".add_phone").text(element.addphone);
			});
		$("#receivingName").val("");
		$("#receivingAddress").val("");
		$("#receivingMobilePhone").val("");
		$("#province").val("");
		$("#city").val("");
		$("#district").val("");
		}
		// 信息清空
	});	
	// 读取收货人信息并显示
	// $.cookie.json=true;
	// var address=$.cookie("address");
	// console.log(address);
	// $.each(address,function(index,element){
	// 	console.log(element.addpro);
	// 	$(".addr_box:first").clone(true).appendTo(".gldz").show()
	// 	.find(".add_name").text(element.addname).parents(".addr_box")
	// 	.find(".add_addr").children("span").eq(0).text(element.addpro)
	// 	.next().text(element.addcity).next().text(element.adddis)
	// 	.parents(".addr_box").find(".add_street").text(element.addstreet).parents(".addr_box")
	// 	.find(".add_phone").text(element.addphone);
	// });




//从购物车的cookie里面读取商品价格
	$.cookie.json=true;
	var product_cons=$.cookie("product_con");//从cookie中读取商品信息
	//遍历里面的数据
	// $(".corg").text(total.toFixed(2));
	var total=0;
	$.each(product_cons,function(index,element){
		// console.log(element.pic);
		$(".temp").clone(true).removeClass("temp").addClass("cart_body")
		.appendTo(".cart").show()
		.find(".name1").html("<img src="+element.pic+">").parent()
		.find(".name2").text(element.name).parents(".cart_body")
		.children(".colorsize").html(element.color+"<br/>"+element.size).parent()
		.children(".price").text(element.price).parent()
		.children(".amount").text(element.amount).end()
		.children(".sub").text((element.price*element.amount).toFixed(2)).end();
	});
		var $element=$(".cart").find(".sub");
		$element.each(function(){
			total+=parseFloat($element.text());
		});
	$(".all_money>span").text(total.toFixed(2));
	$("#money_all").text(total.toFixed(2));

//确定提交订单
	$("#submi21t").on("click",function(){
		alert("小主，咱们是项目训练，要购买，请上www.yougou.com，拿走，不谢！");
	});
});