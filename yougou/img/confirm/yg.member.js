YouGou.member={
	Base:{},
	Util:{},
	Ui:{},
	GlobeTip:{},
	Module:{}
}
var YGM = YouGou.member;
var dg = null;
YGM.Base={
	//设置安全等级  --为用户中心左栏的提示提供请求
	setSafeLevel:function(dModule){
		$.ajax({
			type : "POST",
			url : "/my/getSecurityLevel.jhtml",
			success : function(data) {
				if( data == "lower"){
					$(dModule).html("安全设置<i class='huise'>（<em>低</em>）");
				}else if( data == "mider"){
					$(dModule).html("安全设置");
				}else if( data == "higer"){
					$(dModule).html("安全设置");
				}
			}
		});		
	},
	//安全验证
	securityBind:function(safeCheckCallback,passSafeCallback){
		$.ajax({
			type : "POST",
			async : false,
			url : "/checkUserMobileIsExist.jhtml",
			success : function(data) {
				if("true" == data){
					ygDialog({url:"/my/checkMobile.jhtml?r="+Math.random(),title:"安全验证",width:430,height:300,closable:true,loaded:function(){
						YGM.Base.SafeCheck(safeCheckCallback);
					}});
				}else if(passSafeCallback&&typeof(passSafeCallback)=='function'){
						passSafeCallback();
				}
			}
		});	
	},
	//安全检查弹窗处理
	SafeCheck:function(sucCallback){
		$("#m_icon").bind('click',function(){
			var liLen=$(".mobileList li").length;
			if(liLen<=1) return;
			$(".mobileList").show();
		});

		$("#Mobile").bind('keypress',function(){
			var liLen=$(".mobileList li").length;
			if(liLen<=1) return;
			$(".mobileList").show();
		});

		$(".mobileList").bind({
			"mouseover":function(){
				$(".mobileList").show();
			},"mouseout":function(){
				$(".mobileList").hide();
			}
		});

		$(".mobileList li").bind({
			"mouseover":function(){
				if($(this).index()==0) return;
				$(this).addClass("on");
			},
			"mouseout":function(){
				$(this).removeClass("on");
			},
			'click':function(){
			if($(this).index()==0) return;
			$("#Mobile").val($(this).html());
			$(".mobileList").hide();
		}});
		//检查手机号
		var checkMobile=function(){
			$("#mobileTips").attr("class","").html("");
			var rePhone = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0-9]|17[0-9])\d{8}$/;
			$("#mobileTips").show();
			if($("#Mobile").val()==""){
				$("#Mobile").focus();
				$("#mobileTips").addClass("errortips").html("手机号码不能为空");
				return false;
			}
			if(!rePhone.test($("#Mobile").val())){
				$("#Mobile").focus();
				$("#mobileTips").addClass("errortips").html("手机号码格式错误");
				return false;
			}
			var type = false;
			$.ajax({
				type : "POST",
				async : false,
				url : "/checkUserMobile.jhtml?phone="+$("#Mobile").val()+"&type="+$("#checkType").val(),
				success : function(data) {
					if("1"==data){
						$("#mobileTips").hide();
						type = true;
					}else{
						$("#mobileTips").attr("class","").html("");
						 $("#sendTips").attr("class","errortips").html(data);
					}
				}
			});
			return !!type;
		};
		//检查验证码
		var codeNum=0;
		var checkCode=function(){
			$("#codeTips").show();
			if($("#Code").val()==""){
				$("#Code").focus();
				$("#codeTips").addClass("errortips").html("验证码不能为空");
				codeNum+=1;
				if(codeNum>=3){
					$("#Tips").show();
				}
				return false;
			}
			var type = false;
			$.ajax({
				type : "POST",
				async : false,
				url : "/my/checkPhoneCodes.jhtml?phone="+$("#Mobile").val()+"&code="+$("#Code").val(),
				success : function(data) {
					if(parseInt(data) == 0){
						$("#Code").focus();
						$("#codeTips").addClass("errortips").html("验证码错误");
					}else if(parseInt(data) == 2){
						$("#Code").focus();
						$("#codeTips").addClass("errortips").html("验证码错误");
					}else{
						$("#codeTips").hide();
						type = true;
					}
				}
			});
			return !!type;
		};
		//发送验证码
		$("#sendCodeBtn").bind('click',function(){
			var val = $('#code2_').val();
			if(val==''){
				YGM.Util.show('codeTips2','验证码不能为空');
				return;
			}
			var validResult = false;
			$.ajax({
				   type: "POST",
				   async:false,
				   url: '/api/checkCode2.sc',
				   data: 'code='+val,
				   success: function(d){
					   if(parseInt(d)==0){
							msg = '验证码不正确';
							YGM.Util.changeValidateImage2();
							YGM.Util.show('codeTips2',msg);
							validResult = false;
						}else {
							validResult = true;
							YGM.Util.clear();
						}
				   }
				});
			if(!validResult) return;
			if(!checkMobile()) return;
			$(this).attr("disabled","disabled");
			$("#sendTips").addClass("righttips").html("验证码已发送，30分钟内有效");
			var time1=59;
			timer1=setInterval(function(){
				$("#sendCodeBtn").val(time1+"秒后可重新发送").width(110);
				time1-=1;
				if(time1<=0){
					$("#sendCodeBtn").val("重新发送").attr("disabled","").width(85);
					clearInterval(timer1);
				}
			},1000);
			//获取手机验证码
			$.ajax({
			   type: "POST",
			   data:{"phone" : $("#Mobile").val(),"validCode":$("#code2_").val()},
			   url : "/my/getActiveCodes.jhtml",
			   success: function(data){
					switch(data){
						case null:
							$("#sendTips").attr("class","errortips").html('获取验证码失败!');
							break;
						case '2':
							$("#sendTips").attr("class","righttips").html('验证码已发送，30分钟内有效');
							break;
						case '3':
							$("#sendTips").attr("class","errortips").html('获取验证码失败!');
							document.getElementById("Tips").style.display="block";
							break;
						case '4':
							$("#sendTips").attr("class","errortips").html('手机号码存在异常，请更换手机号码!');
							break;
						case '1':
							$("#sendTips").attr("class","errortips").html('手机号码格式不正确!');
							break;
						case '5':
							$("#sendTips").attr("class","errortips").html('提示：1分钟内不可重复获取验证码!');
							break;
						case '0':
							$("#sendTips").attr("class","errortips").html('提示：图片验证码校验失败!');
							break;
						default:
							$("#sendTips").attr("class","errortips").html(data);
							break;					
						
					}
			   }
			});
		});
		
		//关闭父弹框
		var closeMarkDialog = function(){
			var that=$('.ygDialog');
			that.remove();
			if($.browser.version=="6.0"&&$.browser.msie){
				$("#hackDialogIframe").remove();
			}
			if(that.iframe){
				that.iframe.attr('src','about:blank');
				that.iframe.remove();
			}
			$(".dialogMask").remove();
		};
		
		var viewTip = function(){
			ygDialog({
				title:'提示',
				width:250,
				height:100,
				content:'<div style="padding:20px 60px;line-height:25px;font-size:14px;">兑换成功<br/>立即<a class="cblue" href="http://www.yougou.com/my/coupon.jhtml?couponState=1" target="_blank">查看</a>我的优惠券</div>'
			 });
		};
		
		var reedCounpon = function(){
			var sucReed = false;
			if($('#activeId').val()){
				$.ajax({
				       type: "POST",
				       data:{"activeId" : $('#activeId').val()},
				       dataType : "json",
				       async : false,
				       url : "/my/redeemCoupon.jhtml",
				       success: function(data){
				   	   	  var state = parseInt(data.state);
				   	   	  if(state == 1){
				   	   		  sucReed = true;
				   	   	  }else if(state == 3){
				   	   	  	  ygDialog({url:"/my/checkMobile.jhtml?activeId="+$('#activeId').val()+"&type=1&r="+Math.random(),title:"手机绑定",width:460,height:300,closable:true,loaded:YGM.Base.SafeCheck});
				   	   	  }else if(state == 2){
				   	   	  	  alert(data.result);
				   	   	  }else if(state == 0){
				   	   	  	  ygDialog({url:"/my/checkMobile.jhtml?activeId="+$('#activeId').val()+"&type=2&r="+Math.random(),title:"手机安全验证",width:460,height:300,closable:true,loaded:YGM.Base.SafeCheck});
				   	   	  }else if(state == 9){
				   	   		  YouGou.Biz.loginPop({title : '您尚未登录',lock: true,closable:true,refreshTopWin:true});
				   	   	  }else if(state == 10){
				   	   		  ygDialog({url:"/my/showImgCode.jhtml?activeId="+activeId+"&type=2&r="+Math.random(),title:"兑换验证",width:460,height:300,closable:true,loaded:YGM.Base.SafeCheck});
				   	   	  }
				       }
					});
				if(sucReed){
					closeMarkDialog();
					viewTip();
				}
				return true;
			}
			return false;
		};

		//提交绑定
		$("#submitBtn").bind('click',function(){
			if ($("#isOnlyShowImgCode").val() == 'true') {
				var val = $('#code2_').val();
				if (val == '') {
					YGM.Util.show('codeTips2', '验证码不能为空');
					return;
				}
				var validResult = false;
				$.ajax({
					type : "POST",
					async : false,
					url : '/api/checkCode2.sc',
					data : 'code=' + val,
					success : function(d) {
						if (parseInt(d) == 0) {
							msg = '验证码不正确';
							YGM.Util.changeValidateImage2();
							YGM.Util.show('codeTips2', msg);
							validResult = false;
						} else {
							validResult = true;
							YGM.Util.clear();
						}
					}
				});
			   if(!validResult) return;
			} else {
				if (!checkMobile() || !checkCode()) return;
			}
			var type = $("#checkType").val();
			if(type == "2" && type != null && type != "" && type != undefined){
				var rs = reedCounpon();
				if(rs) return rs;
			}else{
				$.ajax({
					type : "POST",
					async : false,
					url : "/updateCheckMobile.jhtml?phone="+$("#Mobile").val(),
					success : function(data) {
						if("true" == data){
							var rs = reedCounpon();
							if(rs) return rs;
							alert("绑定手机号成功！");
						}else{
							alert('绑定手机号失败！');
						}
					}
				});
			}
			
			if(!sucCallback){
				parent.window.location.reload();
			}else if(typeof(sucCallback)=='function'){
				sucCallback();
			}
			closeDialog();
		});

	},
	bindPhoneCheckBtn:function(){
		//手机立即绑定
		$('#on_bind_phone').click(function(){
			ygDialog({url:"/my/checkMobile.jhtml?r="+Math.random(),title:"手机安全验证",width:460,height:300,closable:true,loaded:YGM.Base.SafeCheck});
		});
	}
};
YGM.Ui={
	loadMask:function(msg){
		if(document.getElementById('ygloadmask')){
			$('#ygloadmask').show();
			$('#ygloadmsk-msg').show().css({'top':$(document).scrollTop()+$(window).height()/2});
		}else{
			var $body = $('body');
			$body.append('<div id="ygloadmask" style="position:absolute;width:100%;background:#fff;top:0;z-index:1000;"></div><div id="ygloadmsk-msg" style="position:absolute;z-index:1001;background:#fff;text-align:center;width:200px;margin-left:-100px;left:50%;border:1px #eee solid;line-height:50px;"><img src="http://s2.ygimg.cn/template/common/images/loading.gif"/> 处理中，请稍候...</div>');
			$('#ygloadmask').css({'height':$body.height(),'opacity':'0.2'});
			$('#ygloadmsk-msg').css({'top':$(document).scrollTop()+$(window).height()/2});
		}
	},
	hideMask:function(){
		$('#ygloadmask').hide();
		$('#ygloadmsk-msg').hide();
	}
};
YGM.Util={
		//验证码
		IdentifyCode:function(strSelector){
			var val = $(strSelector).val(),msg;
			if(val==''){
				msg = '验证码不能为空';
			}
			if(msg){
				YGM.Util.show('codeTips2',msg);
				return "0";
			}
			$.post('/api/checkCode2.sc',{code:val},function(d){
				if(parseInt(d)==0){
					msg = '验证码不正确';
					YGM.Util.changeValidateImage2();
					YGM.Util.show('codeTips2',msg);
					return "0";
				}else {
					YGM.Util.clear();
					return "1";
				}
				return "1";
			});
			return "1";
		},
	//提示信息
	show:function(id,msg,isSuccess){
		if(msg&&!isSuccess){
			$('#'+id).html( msg ).attr('className','errortips');
		}else{
			msg = msg?msg:'';
			$('#'+id).html(msg).attr('className','righttips');
		}
	},
	clear:function(){
		$('.errortips').html('').removeClass('errortips');
		$('.righttips').removeClass('righttips');
	},
	//更换验证码
	changeValidateImage2:function (){
		var requestHost = 'https:' == document.location.protocol ? 'https://passport.yougou.com' : 'http://www.yougou.com';
		//$('#imageValidate2').attr("src",requestHost+'/servlet/imageValidate?rand='+Math.random());
		$('#imageValidate2').attr("src",requestHost+'/servlet/imageCaptcha?rand='+Math.random());
		return false;
	},
	//检查是否登录
	checkUserLogin:function(){
		var isLogin = true;
		$.ajax({
			type: "POST",
			async : false,
			url: "/api/checkUserLogin.jhtml",
			success: function(data){
				if(data == "false")
				{
					isLogin =  false;
				}
			}
		 });
		return isLogin;
	},
	//检查根据用户姓名和商品id查询该用户是否可以点评（下单成功并且状态为已收货）
	checkIsWriteCommodity:function(commodityId){
		var resultCode = true;
		$.ajax({
			type: "POST",
			async : false,
			url: "/api/checkIsWriteCommodity.jhtml?commodityId="+commodityId,
			success: function(data)
			{
				if(data == "false"){
					resultCode =  false;
				}
				if(data == "flag"){
					alert("登录超时！请重新登录！");
					resultCode =  "flag";
				}
			}
		 });

		return resultCode;
	},
 
	//根据用户id和订单编号查询该用户是否对该商品是否点评过
	checkUserWriteComodityComment:function(orderNo,commodityId,productNo){
		var resultCode = "";
		$.ajax({
			type: "POST",
			async : false,
			url: "/my/checkUserWriteComodityComment.jhtml?orderNo="+orderNo+"&commodityId="+commodityId+"&productNo="+productNo,
			success: function(data){
				if(data == "false"){
					resultCode =  false;
				}
				if(data == "true"){
					resultCode =  true;
				}
				if(data == "flag"){
					alert("登录超时！请重新登录！");
					resultCode = "flag";
				}
			}
		 });
		
		return resultCode;
	},
	//取消订单
	cancelOrder:function(orderNO){
		YGM.Ui.loadMask();
		$.ajax({
			type : "POST",
			url : "/order/cancelOrder.jhtml?orderMainNo="+orderNO,
			success : function(data) {
				YGM.Ui.hideMask();
				if("sigin" == data){
					setTimeout(function(){window.location.href = "/signin.jhtml";},200);
				}else if("cancelOrderSuccess" == data){
					ygDialog({title:"温馨提示",url:"/my/cancelOrderSuccess.jhtml",width:280});
				}else if("cancelOrder" == data){
					ygDialog({title:"取消订单的原因",url:"/my/cancelOrder.jhtml?orderMainNo="+orderNO,width:518});
				}
			}
		});
	},
	//付款
	subPay:function(idOrNo) {
		var type=false,oNo=document.getElementById('orderNo'+idOrNo)?$("#orderNo"+idOrNo).val():idOrNo;
		$.ajax({
			type : "POST",
			url : "/my/userAgainPay.jhtml?orderMainNo="+oNo,
			success : function(data) {
				if("sigin" == data){
					setTimeout(function(){window.location.href = "signin.jhtml";},200);
				}else if("basefalse" == data){
					ygDialog({title:"温馨提示",url:"/my/cancelOrderSuccess.jhtml",width:280});
				}else if("success" == data){
					ygDialog({title:"温馨提示",url:"/my/toAgainPay.jhtml?orderMainNo="+oNo,width:500});
				}else if("payfalse" == data){
					_gaq.push(['_trackPageview','/PageAction/Buy/repay']);
					type = true;
				}
				if(type){
					setTimeout(function(){window.location.href="http://www.yougou.com/pay/payOnline.sc?orderNo="+oNo+"&orderRouteWay=user";},200);
				}				
			}
		});
	},
	//重新加入购物车
	reAddToShoppingcart:function(id){
		var oNo = $("#orderNo"+id).val();
		setTimeout(function(){window.location.href ="/my/rolledShoppingcart.jhtml?orderMainNo="+oNo;},200);
	},
	//点评验证
	toWriteCommodityComment:function(commodityId,orderNo,productNo){
		var tmp = YGM.Util.checkIsWriteCommodity(commodityId);
		if(tmp == false)
		{
			alert("您可能没有购买过该商品");
			return;
		}
		if(tmp == "flag"){
			window.location.href="/signin.jhtml";
		}
		var temp = YGM.Util.checkUserWriteComodityComment(orderNo,commodityId,productNo);
		if(temp == true){
			alert("您已经对该商品已点评过，同一订单不能重复点评该商品！");
			return ;
		}
		if(temp=="flag"){
			window.location.href="/signin.jhtml";
		}
		window.location.href="/my/wirteComment.jhtml?commodityId="+commodityId+"&orderNo="+orderNo;
	},
	//我的收藏夹加入购物车
	addtoShoppingCart:function(shopCarDiv,goodsNo,cid){
		var util=function(jsondata,index,div)
		{
			colorIndex=0;
			strHtmlTmp='<a href="javascript:void(0);" class="uc_ico close_buy_box close_first_box">关闭</a><dl class="uc_buy_item"><dt class="fl">颜色</dt>\
			<dd class="fl item_c color">\
			<a href="javascript:void(0);" comno="<%=comNo%>" cid="<%=cid%>" data-name="<%=colorAlt%>"  class="choosed" ><img src="<%=pic%>" alt="<%=colorAlt%>" /><i></i></a>\
			<%for(var i in similar){ var comno=similar[i].comNo;%>\
			<a href="javascript:void(0);" comno="<%=comno%>" data-name="<%=similar[i].colorAlt%>"><img src="<%=similar[i].pic%>" alt="<%=similar[i].colorAlt%>" /><i></i></a>\
			<%}%>\
			</dd></dl>\
			<dl class="uc_buy_item mt10"><dt class="fl">尺码</dt><dd class="fl item_c size">\
			<%var sizeArry=size.split(",");var stockArry=stock.split(","); for (var i=0;i<sizeArry.length;i++){%>\
									<a href="javascript:void(0);" data-name="<%=sizeArry[i]%>"  <%if(stockArry[i]==0){%>class="no"<%}%> <%var idx;var count=0; for(var j=0;j<sizeArry.length;j++){if(stockArry[j]>0){count+=1;idx=j;}if(count>1) break;} if((idx==i && count==1) || (productSize == sizeArry[i] && count>1)){%>class="choosed" <%}%> <%if (sizeArry.length==1 &&stockArry[0]>0){%> class="choosed" <%}%>><%=sizeArry[i]%><i></i></a>\
									<%}%>\
									</dd></dl><dl class="uc_buy_item mt5"><dt class="fl">数量</dt><dd class="fl pro_num"><a href="javascript:void(0);" class="uc_ico subtract"></a><input name="" type="text" value="1" readonly class="buy_num" /><a href="javascript:void(0);" class="uc_ico plus"></a><span class="Gray">本商品由<strong id="ShopName"><%=shopname%></strong>直接发货</span></dd></dl>\
				<dl class="uc_buy_item mt10"><dt class="fl">已选择</dt><dd class="fl have_choosed"><strong class="Red selColor"><%=colorAlt%></strong><strong class="Red selSize">\
				<%if(sizeArry.length==1 && stockArry[0]>0){%><%=size%><%}%><%if(count==1&&sizeArry.length>1){%><%=sizeArry[idx]%><%}%></strong></dd></dl><div class="addSmt mt10"><a href="javascript:void(0);" class="uc_bg uc_smt1"><span class="uc_bg">确认添加</span></a><a href="javascript:void(0);" class="f_blue cancel_buy">取消</a><input value="<%=stock%>" type="hidden" name="stock" /><input value="<%=proids%>" type="hidden" name="proids" /></div>';
			div.html(YouGou.Util.tpl(strHtmlTmp,jsondata));
		};
		
		var stockArray,
			proidArray,
			strHtmlTmp,
			price,
			colorIndex,
			limitbuyMaxNum;
			shopCarDiv.html("加载中,请稍候...").slideDown(150);
			//ajax获取商品的颜色、尺码、库存等信息
			$.ajax({
				type : "POST",
				url : "/my/getFavShopCarCommdity.jhtml?commodityNo="+goodsNo+"&cid="+cid,
				async : true,
				success : function(data) {
					data = eval("("+data+")");
					if(data != null){
						stockArray=data.stock.split(',');
						proidArray=data.proids.split(',');
						limitbuyMaxNum = parseInt(data.limitbuyMaxNum);
						util(data,0,shopCarDiv);
					}
				}
			});
		
		//颜色点击
		$(".item_c.color a").live("click",function(){
			if($(this).hasClass("choosed")) return;
			$(this).closest(".uc_buy_goods").find(".have_choosed .selSize").text("");
			var _this=$(this);
			var comno=$(this).attr("comno");
			var cid=$(this).attr("cid");
			var sizeDiv=$(this).closest(".uc_buy_goods").find(".item_c.size");
			var stockInput=$(this).closest(".uc_buy_goods").find("input[name=stock]");
			var proidsInput=$(this).closest(".uc_buy_goods").find("input[name=proids]");
			var sizeTmp='<%var sizeArry=size.split(",");var stockArry=stock.split(","); for (var i=0;i<sizeArry.length;i++){%><a href="javascript:void(0);" data-name="<%=sizeArry[i]%>"  <%if(stockArry[i]==0){%>class="no"<%}%> <%var idx;var count=0; for(var j=0;j<sizeArry.length;j++){if(stockArry[j]>0){count+=1;idx=j;}if(count>1) break;} if((idx==i&&count==1) || (productSize == sizeArry[i] && count>1)){%>class="choosed" <%}%><%if (sizeArry.length==1){%> class="choosed" <%}%>><%=sizeArry[i]%><i></i></a><%}%>';
			$(this).addClass("choosed").siblings().removeClass("choosed");
			colorIndex=$(this).index();
			sizeDiv.html('<p style="height:27px;margin-top:3px;"><img src="../template/common/images/shopcart_loading.gif" /></p>');
			//ajax获取商品的尺码、库存等信息
			$.ajax({
				type : "POST",
				url : "/my/getProductSize.jhtml?commodityNo="+comno+"&cid="+cid,
				success : function(data) {
					data = eval("("+data+")");
					if(data != null){
						stockInput.val(data.stock);
						proidsInput.val(data.proids);
						sizeDiv.html(YouGou.Util.tpl(sizeTmp,data));
						if(data.size.indexOf(",")<0 && data.stock>0)
						{
							_this.closest(".uc_buy_goods").find(".have_choosed .selSize").text(data.size);
						}
						var count=0,idx;
						for(var i=0;i<data.size.length;i++)
						{
							if(data.stock.split(",")[i]>0)
							{
								idx=i;
								count+=1;
							}
							if(count>1) return false;
						}
						_this.closest(".uc_buy_goods").find(".have_choosed .selSize").text(data.size.split(",")[idx]);
					}
				}
			});
			$(this).closest(".uc_buy_goods").find(".have_choosed .selColor").text($(this).attr("data-name"));
			$(this).closest(".uc_buy_goods").find(".buy_num").val(1);
			return false;
		});
		
		//尺码点击
		$(".item_c.size a").live("click",function(){
			if($(this).hasClass("no")) return;
			$(this).addClass("choosed").siblings().removeClass("choosed");
			$(this).closest(".uc_buy_goods").find(".have_choosed .selSize").text($(this).attr("data-name"));
			$(this).closest(".uc_buy_goods").find(".buy_num").val(1);
			return false;
		});
		
		//加号点击
		$(".plus").live("click",function(){	
			var stockArray=$(this).closest(".uc_buy_goods").find("input[name=stock]").val().split(',');
			var sizeIndex=$(this).closest(".uc_buy_goods").find(".size a.choosed").index();
			var numberInput=$(this).prev("input[type=text]");
			var limitNum=limitbuyMaxNum;
			if(sizeIndex<0){
				alert('请选择尺码');
				return false;
			}
			var number=parseInt(numberInput.val())+1;
			if(number>stockArray[sizeIndex]){
				number-=1;
				alert('抱歉！您购买的数量超过库存量！');
				return false;
			}
			if(number > limitNum){
				number=limitNum;
				alert("一次最多购买"+String(number)+"件");
				return false;
			}
			numberInput.val(number);
			return false;
		});
		
		//减号点击
		$(".subtract").live("click",function(){
			var numberInput=$(this).next("input[type=text]");
			var number=parseInt(numberInput.val())-1;
			if(number<1) return;
			numberInput.val(number);
			return false;
		});
		
		//关闭点击
		$(".close_first_box,.cancel_buy").live("click",function(){
			$(this).closest(".uc_buy_goods").slideUp();
			$(this).closest(".li_fav").removeClass("li_curr");
			return false;
		});
		
		//确认点击
		$(".uc_smt1").live("click",function(){
			var sizeIndex=$(this).closest(".uc_buy_goods").find(".size a.choosed").index();
			if(sizeIndex<0){
				alert('请选择尺码');
				return false;
			}
			var _this = $(this);
			var number=$(this).closest(".uc_buy_goods").find(".buy_num").val();
			var proidArray=$(this).closest(".uc_buy_goods").find("input[name=proids]").val().split(',');
			var goodsNo=proidArray[sizeIndex];
			var param = [];
			param.push("&productNum="+number);
			param.push("&productNo="+goodsNo);
			param.push("&targetUrl=/yitianmall/shoppingmgt_new/simpleShoppingCart");
			$.ajax({
				type: "POST",
				url:YouGou.Biz.ShoppingCart.cartActionBasePath+"c_addProdut.sc",
				data:param.join(''),
				success:function(data){
					data = eval("("+data+")");
					if(data){
						if (data.errorMsg) {
                        	alert(data.errorMsg);
                        	return false;
                        }
					var _html='<div class="addTo_cart_success"><a href="javascript:;" class="uc_ico close_buy_box close_second_box" cid='+cid+'>关闭</a><h4>商品已成功添加到购物车！</h4><p class="mt10">购物车共有<strong>'+data.shoppingCartCommidityCount+'</strong>件商品，商品总金额：<strong class="Red">'+data.shoppingCartBuyAmount+'</strong>元</p><div class="go_js mt10"><a href="javascript:;" class="uc_bg goJs_btn" cid='+cid+'>去结算</a><a href="javascript:;" class="goOn_addPro" cid='+cid+'>继续添加商品</a></div></div>';
					_this.closest(".uc_buy_goods").html(_html);
						//重新初始化购物车
						YouGou.Biz.ShoppingCart.showCart("1");
					}
				}
			});
			return false;
		});
		
		//去结算
		$(".goJs_btn").live("click",function(){
			//取消收藏
			var dataid = $(this).attr("cid");
			$.ajax( {
				type : "POST",
				url : "/my/deleteCommodityFavorites.jhtml",
				data : {"id" : dataid},
				async : false,
				dataType : "json",
				success : function(data) 
				{
					YouGou.Biz.ShoppingCart.checkShoppingCart();
					window.location.reload();
				}
			});
			return false;
		});
		
		//继续添加
		$(".goOn_addPro,.close_second_box").live("click",function(){
			//取消收藏
			var dataid = $(this).attr("cid");
			$.ajax( {
				type : "POST",
				url : "/my/deleteCommodityFavorites.jhtml",
				data : {"id" : dataid},
				dataType : "json",
				success : function(data) 
				{
					window.location.reload();
				}
			});
			return false;
		});
	},
	//索要发票
	getInvoice:function(flag){
		var _this=$("#invoiceLink");
		if(_this.html().indexOf('关闭')<0 )
		{
			_this.html("[关闭]");
			_this.prev(".text").html("<strong>请输入发票信息</strong>");
			_this.parent().addClass("expand");
			setTimeout(function(){$("#textInvoiceTitle").focus();},100);
			$("#orderInvoiceDiv").show();
			return;
		}
		if((_this.html().indexOf('关闭')>=0 || flag==0) && flag!=1)
		{
			_this.html("索要发票");
			_this.prev(".text").html("如您需要发票，请点击");
			_this.parent().removeClass("expand");
			$("#orderInvoiceDiv").hide();
			return;
		}
		if(flag==1)
		{
			if($("#textInvoiceTitle").val()=="" || $("#textInvoiceTitle").val()=="请输入单位名称")
			{
				alert('请填写发票抬头');
				return;
			}
			$.ajax({
				type : "POST",
				data:{"invoiceTitle" : $("#textInvoiceTitle").val(),"invoiceTitleType" : $("#selectInvoiceType").val(),"orderMainNo" : $("#orderMainNo").val()},
				async : true,
				url : "/my/createInvoiceRegistrationInfo.jhtml",
				success : function(data) {
					if("false" != data){
						ygDialog({title:"温馨提示",content:'<div style="background:url(../template/common/images/ubg14.png) no-repeat 60px 40px; padding:50px 0 50px 120px;"><h2>提交发票申请成功！</h2></div>',width:350,height:150});
						
						$("#invoiceTrade").html('<span>发票跟踪信息：</span><a class="curr" href="javascript:;">发票跟踪1</a>');
						var textNull="很抱歉，未获取到配送公司的配送信息，可能是由于配送官网信息未及时录入，请<br />耐心等待，如有问题可登陆配送官网查询或致电快递官方客服。";
						var temp = '<div class="tabc_box"><div class="abs"><p class="Gray">处理详情：</p><div class="tabc_box_dtl">'+data+'</div>'
							temp += '<p class="Gray mt10">配送跟踪：</p><div class="tabc_box_psgz">'+textNull+'</div> </div> </div>'
						$("#invoiceDeal").html(temp);
						$("#orderInvoiceDIv").hide();
						//$("#invoiceTradeHead_create").show();
						//$("#invoiceTradeHead").hide();
						$("#invoiceTitle").html($("#textInvoiceTitle").val());
						$("#orderInvoiceInfoDiv").show();
						
					}else{
						ygDialog({title:"温馨提示",content:'<div style="background:url(../template/common/images/upng2.png) no-repeat 60px 40px; padding:50px 0 50px 120px;"><h2>提交发票申请失败！</h2></div>',width:350,height:150});
						
						$("#orderInvoiceDIv").hide();
						$("#invoiceTitle").html($("#textInvoiceTitle").val());
						//$("#orderInvoiceInfoDiv").show();
					}
				}
			});
			
		}
		
		
	},
	applyElectroniceInvoiceShow:function (obj){
		var p = $(obj).parent().parent().hide();
		$(".applyEeleInvoice").show();
	},
	//检查抬头
	applyElectroniceTitleValidate:function (){
		var eInvoiceTitle = $("#eInvoiceTitle").val();
		eInvoiceTitle = eInvoiceTitle.replace(/(^\s*)|(\s*$)/g, "");// 去除左右空格
		if(!YouGou.Util.isEmpty(eInvoiceTitle)){
			var rex =  /^[\u4e00-\u9fa5_\s_a-zA-Z]+$/;
			if(!rex.test(eInvoiceTitle)){
				$("#eInvoiceTitleTips").html("请输入正确的姓名，只能包含中文和英文（不输入则默认为个人）").show();
				return false;
			}
		}
		$("#eInvoiceTitleTips").hide();
		return true;
	},
	applyElectroniceInvoiceValidate:function (){
		var validTitle = YGM.Util.applyElectroniceTitleValidate();
		if(!validTitle)
			return false;
		var eInvoicePhone = $("#eInvoicePhone").val();
		if(YouGou.Util.isEmpty(eInvoicePhone)){
			$(".eleInvoiceApplyPhone").html("请输入发票人手机").show();
			return false;
		}else{
			$(".eleInvoiceApplyPhone").hide();
			var rex = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0-9]|17[0-9])\d{8}$/;
			if(!rex.test(eInvoicePhone)){
				$(".eleInvoiceApplyPhone").html("手机号格式错误！").show();
				return false;
			}
			return true;
		}
		return true;
	},
	applyElectroniceInvoice:function (){
		var eInvoiceTitle = $("#eInvoiceTitle").val();
		var eInvoicePhone = $("#eInvoicePhone").val();
		var orderNo = $("#orderNo").val();
		if(YGM.Util.applyElectroniceInvoiceValidate()){
			if(!YouGou.Util.isEmpty(orderNo)){
				$.ajax({
					type: "POST",
					url:"/my/eleInvoiceApply.jhtml",
					data:{"eInvoiceTitle" : eInvoiceTitle,"eInvoicePhone" : eInvoicePhone,"orderMainNo" :orderNo},
					success:function(data){
						if(data ==  "true"){
							setTimeout(function(){window.location.reload();},3000);
							ygDialog({title:"温馨提示",content:'<div style="background:url(../template/common/images/ubg14.png) no-repeat 60px 40px; padding:50px 0 50px 120px;"><h2>提交发票申请成功！</h2></div>',width:350,height:150});
						}else{
							ygDialog({title:"温馨提示",content:'<div style="background:url(../template/common/images/upng2.png) no-repeat 60px 40px; padding:50px 0 50px 120px;"><h2>提交发票申请失败！</h2></div>',width:350,height:150});
						}
					}
				});
			}
		}
	},
	//修改邮箱绑定
	changeEmailBind:function(){
		//安全设置绑定邮箱
		$("#safe_bind_modify").bind('click',function(){
			$.ajax({
				type : "GET",
				url : YouGou.Util.setUrlStamp("/my/checkWeekBindTimes.jhtml"),
				success : function(data) {
					if("true" == data){
						alert("一周内仅限一次修改绑定邮箱!");
					}else{
						YGM.Base.securityBind(function(){
							//安全验证成功回调，跳转到绑定第二步
							location.href=YouGou.Util.setUrlStamp("/my/securitySetActive.jhtml?modelId=register");
						},function(){
							//无需安全验证回调，跳转到绑定第一步
							location.href=YouGou.Util.setUrlStamp("/my/securitySet.jhtml");
						});
					}
				}
			});
		});
	}
};

YGM.Module={
	uIndex:function(dModule){
		var ordertabLi = $('#order_tab .tab_top_dp li');
		ordertabLi.bind('click',function(){
			var index=ordertabLi.index(this);
			ordertabLi.removeClass("on");
			$(this).addClass("on");
			$('.tab_tb_dp').hide().eq(index).show();
			
		});
		YGM.Util.changeEmailBind();
		YGM.Base.bindPhoneCheckBtn();
		//重新购买ga
		$('table.uc_myorder_table .resale').click(function(){
			_gaq.push(['_trackPageview','/PageAction/Buy/my/buy?page=' + document.location.pathname + document.location.search + "&from=" + document.referrer]);
		});
	},
	myOrder:function(){
		//条件搜索订单
		function toSearchOrder(){
			document.getElementById("searchForm").submit();
		}
		$('#all_order_div select').change(toSearchOrder);
		$('#btnSearch').click(toSearchOrder);
		//重新购买ga
		$('table.uc_myorder_table .resale').click(function(){
			_gaq.push(['_trackPageview','/PageAction/Buy/my/buy?page=' + document.location.pathname + document.location.search + "&from=" + document.referrer]);
		});
	},
	getOrderMainLogistics : function(orderMainNo){
		
	},
	orderDetail:function(){
		//快递跟踪
		function showOrderDiv(expressNo){
			document.getElementById(expressNo+'popDiv').style.display='block';
			document.getElementById(expressNo+'bg').style.display='block';
			var img = '<div style="text-align:center"><img src="/images/order-loading.gif" /></div>';
			$("#batch"+expressNo).html(img);
			var logisticsCode = $("#batch"+expressNo).attr("logisticsCode");
			$.ajax({
					type:'post',
					url:"/my/getLogisticsRecordByExpressNo.jhtml",
					data:{'expressNo':expressNo,'logisticsCode':logisticsCode,'sort':'desc'},
					dataType:"json",
					success:function(result){
						var html = [];
						var data = result.data;
						html.push('</p><p class="genz"><em class="Gray">物流跟踪：</em>');
						if(result.response == "ok" && data != null){
							var record = data.data;
							for(var i=0;i<record.length;i++) {
								html.push('<div class="detail"><p class="genz">');
								html.push(record[i].time);
								html.push('&nbsp;<span>'+record[i].context+'</span></p></div>');
							}
						}else{
							if(data != null){
								html.push('<span class="wuliu"><em class="ico fl"></em>该信息由物流公司提供，如有疑问请咨询');
								if(data.logisticsWebsite==""){
									html.push('<a class="f_blue">'+data.logisticsName+'</a>');
								}else{
									html.push('<a href="'+data.logisticsWebsite+'" target="_blank" class="f_blue">'+data.logisticsName+'</a> ');
								}
								html.push('或拨打官方查询电话<strong class="f_yellow">');
								html.push(data.logisticsTel);
								html.push('</strong></span></p><div class="gz_tips1">很抱歉，未获取到快递公司的配送信息，可能是由于快递官网信息未及时录入，请耐心等待，如有问题可登录快递官网查询或致电快递官方客服。</div>');
							}else{
								html.push('<span class="wuliu"><em class="ico fl"></em><div class="gz_tips1">很抱歉，未获取到快递公司的配送信息，可能是由于快递官网信息未及时录入，请耐心等待，如有问题可登录快递官网查询或致电快递官方客服。</div>');
							}
						}
						html.push('<p class="blank10"></p>');
						$("#batch"+expressNo).html(html.join(''));
					}
				});
		}
		function showOrderDelivery(){
			var expressCodes = $('#expressCodes').val();
			if(!expressCodes){return;}
			var expressNos = expressCodes.split(',');
			for(var i=0;i<expressNos.length;i++){
				var expressNo = expressNos[i];
				var batch=$("#batch"+expressNo).html();
				if($.trim(expressNo)!=""&&batch == ""){
					showOrderDiv(expressNo);
				}
			}
		}
		showOrderDelivery();	
		
		//发票类型切换
		invoiceChange();
		function invoiceChange(){
			$("#selectInvoiceType").change(function(){
				var _this=$(this);
				if(_this.val()=="0")
				{
					$("#textInvoiceTitle").val($("#textInvoiceTitleHid").val());
				}
				else if(_this.val()=="1")
				{
					$("#textInvoiceTitle").val("请输入单位名称");
				}
			});
			$("#textInvoiceTitle").focus(function(){
				if($(this).val()=="请输入单位名称")
				{
					$(this).val("");
				}
			});
			$("#textInvoiceTitle").blur(function(){
				if($(this).val()=="" && $("#selectInvoiceType").val()=="1")
				{
					$(this).val("请输入单位名称");
				}
			});
		}
		
		//发票物流详情
		var wheelEvents = !$.browser.mozilla ? "mousewheel" :"DOMMouseScroll" + ( $.browser.version < "1.9" ? " mousemove" : "" ); // firefox
		var scrollFunc=function(e)
		{
			var e = e || window.event;
			e.preventDefault();
		}
		$("#deliveryInfoLink").click(function(e){
			var infoDiv=$("#invoiceDeliveryInfo");
			var _this=$(this);
			infoDiv.show();
			var invoiceNo = $('.order_invoice_tab > a.curr').attr('id');
			$('.order_invoice_tabc').show();
			$('#orderDeliveryInfoDiv'+invoiceNo).show();
			$('#headInvoice'+invoiceNo).show();
			showDeliveryInfoLink(invoiceNo);
			
			infoDiv.show();
			return false;
		});
		//隐藏发票物流详情弹窗
		$(document).click(function(){
			$("#invoiceDeliveryInfo").hide();
			$.event.remove(document,wheelEvents, scrollFunc );
		});
		$("#invoiceDeliveryInfo").click(function(){
			return false;
		});
		/*发票跟踪信息tab切换*/
		$('.order_invoice_tab a').click(function(){
			var invoiceNo = $(this).attr('id');
			$('.order_invoice_tab a').removeClass('curr');
			$('.order_invoice_tab > a#'+invoiceNo).addClass('curr');
			$('.tabc_deal_info').hide();
			//$('.order_invoice_tabc').hide();
			$('.order_invoice_tabc').show();
			
			$('#orderDeliveryInfoDiv'+invoiceNo).show();
			
			
			showDeliveryInfoLink(invoiceNo);
		});
		//远程获取发票物流信息
		function showDeliveryInfoLink(invoiceNo){
			$.ajax({
				type:"post",
				url:"/my/getInvoiceDeliverInfo.jhtml?invoiceNo="+invoiceNo,
				dataType:"json",
				success:function(result){
					var data = result.data;
					var html = [];
					if(result.response == "ok" && data != null){
						var record = data.data;
						for(var i=0;i<record.length;i++) {
							html.push(record[i].time+','+record[i].context);
							html.push("<br/>");
						}
					
					//data=["2012-12-25 18:23:07 已取件，达到[广州运转中心_深圳中转站]<br />2012-12-25 19:13:07 离开[广州运转中心_深圳中转站]，发往[广东深圳分公司_南山营业所_蛇口营业厅]<br />2012-12-27 19:13:07 到达[广东深圳分公司_南山营业所_蛇口营业厅]<br />2012-12-28 19:13:07 离开[广东深圳分公司_南山营业所_蛇口营业厅]派送中，派送员[黄宇]，电话[137256875554]<br />2012-12-28 19:13:07 离开[广东深圳分公司_南山营业所_蛇口营业厅]派送中，派送员[黄宇]，电话[137256875554]<br />2012-12-28 19:13:07 离开[广东深圳分公司_南山营业所_蛇口营业厅]派送中，派送员[黄宇]，电话[137256875554]<br />","","2012-12-25 18:23:09 已取件，达到[广州运转中心_深圳中转站]<br />2012-12-25 19:13:09 离开[广州运转中心_深圳中转站]，发往[广东深圳分公司_南山营业所_蛇口营业厅]<br />2012-12-27 19:13:09 到达[广东深圳分公司_南山营业所_蛇口营业厅]<br />"];
					var textNull="很抱歉，未获取到配送公司的配送信息，可能是由于配送官网信息未及时录入，请<br />耐心等待，如有问题可登陆配送官网查询或致电快递官方客服。";
					//if(data[i]==""){data[i]=textNull;}
					
					//为了演示加载效果，这里用了1000延时，实际应用去掉setTimeout
					$("#invoiceDeliveryText"+invoiceNo).html(html.join(''));
					var logisticsInfo = '<span class="Gray">以上部分信息来自于：</span><a href="" target="_blank" class="f_blue">'+data.logisticsName+'</a> <span class="Gray ml10">运单号：</span>'+data.logisticsOrderNo;
					$("#logisticsInfoId").html(logisticsInfo);
					
					
					//发票物流信息滚动条
					if($("#orderDeliveryInfoDivAbs"+invoiceNo).height()>250)
					{
						$("#scrollBg").show();
						ScrollPanel('scrollBg','scrollBar','orderDeliveryInfoDiv'+invoiceNo,'orderDeliveryInfoDivAbs'+invoiceNo);
					}else{$("#scrollBg").hide();}
				  }else{
					  var textNull="很抱歉，未获取到配送公司的配送信息，可能是由于配送官网信息未及时录入，请<br />耐心等待，如有问题可登陆配送官网查询或致电快递官方客服。";
					  $("#invoiceDeliveryText"+invoiceNo).html(textNull);
				  }
				}
			});
		}
		
		/*发票跟踪信息弹窗滚动条*/
		function ScrollPanel(scrollBg,scrollBar,scrollBox,scrollContent)
		{ 
			$.event.add(document, wheelEvents, scrollFunc );//禁止document wheel
			var scrBg = document.getElementById(scrollBg);
			var scrBar = document.getElementById(scrollBar);
			var scrBox = document.getElementById(scrollBox);
			var scrCon = document.getElementById(scrollContent);
			var disY = 0;
			var bBtn = true;
			scrBar.onmousedown = function(ev){
				var ev = ev || window.event;
				disY = ev.clientY - scrBar.offsetTop;
				document.onmousemove = function(ev){
					var ev = ev || window.event;
					var T = ev.clientY - disY;
					if(T<0){
						T = 0;
					}
					else if(T>scrBg.offsetHeight - scrBar.offsetHeight){
						T = scrBg.offsetHeight - scrBar.offsetHeight;
					}
					scrBar.style.top = T + 'px';
					var soleY = T/(scrBg.offsetHeight - scrBar.offsetHeight);
					scrCon.style.top = - soleY * (scrCon.offsetHeight - scrBox.offsetHeight) + 'px';
				};
				document.onmouseup = function(){
					document.onmousemove = null;
					document.onmouseup = null;
				};
				return false;
			};
			if(scrCon.addEventListener){
				scrCon.addEventListener('DOMMouseScroll',toChange,false);
				scrBg.addEventListener('DOMMouseScroll',toChange,false);
			}
			scrCon.onmousewheel = toChange;
			scrBg.onmousewheel = toChange;
			function toChange(ev){
				var ev = ev || window.event;
				var T = 0;
				if(ev.detail){
					bBtn = ev.detail>0 ? true : false;
				}
				else{
					bBtn = ev.wheelDelta<0 ? true : false;
				}
				if(bBtn){ //下
					T = scrBar.offsetTop + 20;
				}
				else{ //上
					T = scrBar.offsetTop - 20;
				}
				if(T<0){
					T = 0;
				}
				else if(T>scrBg.offsetHeight - scrBar.offsetHeight){
					T = scrBg.offsetHeight - scrBar.offsetHeight;
				}
				scrBar.style.top = T + 'px';
				var soleY = T/(scrBg.offsetHeight - scrBar.offsetHeight);
				scrCon.style.top = - soleY * (scrCon.offsetHeight - scrBox.offsetHeight) + 'px';
			}
		}
		//发票跟踪结束
	},	
	favorites:function(){
		/*展开选择商品加入购物车*/
		$(".uc_addTo_cart").bind("click",function(){
			//加入购物车ga
			_gaq.push(['_trackPageview','/PageAction/Buy/my/add_to_cart?page=' + document.location.pathname + document.location.search + "&from=" + document.referrer]);
			if($(this).closest(".fav_pro_c").find(".uc_buy_goods").is(":visible"))
			{
				return;
			}
			$(this).closest(".li_fav").addClass("li_curr");
			YGM.Util.addtoShoppingCart($(this).closest(".fav_pro_c").find(".uc_buy_goods"),$(this).attr("goodsno"),$(this).attr("cid"));
		});
		//全选
		$("#selectall").click(function () {
			$("input[name$='p1']").attr('checked',!!this.checked);
		});
		$("input[name$='p1']").click(function () {
			var flag = false;
			$("input[name$='p1']").each(function () { 
				if(this.checked != true){
					flag = true;
				}
			});
			if(flag){
				$("#selectall").attr("checked",false);
			}else{
				$("#selectall").attr("checked",true);
			}
		});
		// delete one
		function deleteCommodityFavorites(id){
			//var id=$('.uc_delete_fav').attr('dataid');
			if(!confirm("您确定要取消收藏的商品吗？")){
				return;
			}
			executeDelFavorites(id);
		}
		// delete multi
		function cancelFavByCheckBox() {
			var favoritesId = "";
			$("input:checkbox[name=p1]:checked'").each( function() {
				favoritesId += $(this).val() + ",";
			});
			
			if (favoritesId != '') {
				if(!confirm("您确定要取消收藏的商品吗？")){
					return;
				}
				executeDelFavorites(favoritesId);
			} else {
				alert("请选择收藏的商品");
			}
		}

		// execute delete
		function executeDelFavorites(id){
			$.ajax( {
				type : "POST",
				url : "/my/deleteCommodityFavorites.jhtml",
				data : {"id" : id},
				dataType : "json",
				success : function(data) 
				{
					if(parseInt(data.flag)==1){
					}else{
						alert("取消商品收藏失败!");
					}
					// 刷新页面
					location.reload();
				}
			});
		}
		
		function stickFavorite(id){
			$.ajax( {
				type : "GET",
				url : "/my/stickCommodityFavorites.jhtml",
				data : {"id" : id},
				dataType : "json",
				success : function(data) {
					// 刷新页面
					location.href=YouGou.Util.setUrlStamp("/my/favorites.jhtml");
				}
			});
		}
		
		function usStickFavorite(id){
			$.ajax( {
				type : "GET",
				url : "/my/cancelStickCommodityFavorites.jhtml",
				data : {"id" : id},
				dataType : "json",
				success : function(data) {
					// 刷新页面
					location.href=YouGou.Util.setUrlStamp("/my/favorites.jhtml");
				}
			});
		}
		
		//取消收藏
		$("#cancel_sc").bind("click",function(){
			cancelFavByCheckBox();
		});
		$(".uc_delete_fav").bind("click",function(){
		    var id = $(this).attr("dataid");
			deleteCommodityFavorites(id);
		});
		//收藏置顶
		$(".cancel_up").bind("click",function(){
			var id = $(this).attr("dataid");
			usStickFavorite(id);
		});
		//收藏置顶
		$(".up").bind("click",function(){
			var id = $(this).attr("dataid");
			stickFavorite(id);
		});
	},
	siteMsg:function(){
		function MessageUserVo(config){
			YouGou.Base.apply(this,config);
			this.userMsgId = this.userMsgId || "";
			this.mgmtMsgId = this.mgmtMsgId || "";
			this.isGlobal = this.isGlobal || "";
		};
		//标记为已读
		function markIsRead(index){
			 var objMsgTr = $("#tr_"+index);
			 var userMsgId = objMsgTr.attr("userMsgId");
			 var mgmtId = objMsgTr.attr("mgmtId");
			 var isGlobal = objMsgTr.attr("isGlobal");
			 var isAction = objMsgTr.attr("isAction");
			 if(isAction == "true"){
				return;
			 }
			 $.ajax( {
				type : "POST",
				url : "/api/msg/markMsgIsRead.jhtml",
				data : {"userMsgId" : userMsgId,"mgmtId":mgmtId,"isGlobal":isGlobal},
				error: function(XmlHttpRequest, textStatus, errorThrown) {
					alert("标记已读失败!");
				},
				success : function(data) {
					if(data=="true"){
						$("#isReadLink_"+index).removeClass("meg_ico2").addClass("meg_ico1");
						markChangeHandler();
						$("#tr_"+index).attr("isAction","true");
					}
				}
			});
		}
		//更改头部站内消息个数
		function markChangeHandler(){
			// usercenter菜单
			var count = $("#uc_msg_count").attr('count');
			if(count > 0){
				count --;
				$("#uc_msg_count").html("站内消息<i class='orgse'>（<em>"+ count +"</em>）</i>").attr('count',count);
				// header
				$("#top_msg>.topmsg_ico>.f_yellow").text(count);			
			}
		}
		var userMsgsMap = new YouGou.Util.Map();
		//删除消息
		function removeMsg(){
			 var msgCheckBox = $("input[name$='msgCheckBox']:checked");
			 if(msgCheckBox.length == 0){
				alert("请选择信息!");
				return;
			 }
			 
			 if(!confirm("您确定删除选择的消息？")){
				return;
			 }
			 msgCheckBox.each(function(i){
				var index = $(this).val();
				var objMsgTr = $("#tr_"+index);
				var userMsgId = objMsgTr.attr("userMsgId");
				var mgmtId = objMsgTr.attr("mgmtId");
				var isGlobal = objMsgTr.attr("isGlobal");
				var isRead = objMsgTr.attr("isRead");
				userMsgsMap.put("key"+i,new MessageUserVo({
					userMsgId : userMsgId,
					mgmtMsgId : mgmtId,
					isRead : isRead,
					isGlobal : isGlobal
				}));
			 });
			 
			 $.ajax( {
				type : "POST",
				url : "/api/msg/removeMsg.jhtml",
				data : {"msgs" : YouGou.Util.toJsonString(userMsgsMap.valArray())},
				error: function(XmlHttpRequest, textStatus, errorThrown) {
					alert("删除失败!");
				},
				success : function(data) {
					if(data=="true"){
						window.location.reload();
					}
				}
			});
		};
		$('#removeMsg').click(removeMsg);
		//全选
		$("#selectall").click(function () {
			if (this.checked) {
				$("input[name$='msgCheckBox']").attr('checked',true);
			} else {
				$("input[name$='msgCheckBox']").attr('checked',false);
			}
		});

		$("input[name$='msgCheckBox']").click(function () {
			var flag = false;
			$("input[name$='msgCheckBox']").each(function () { 
				if(!this.checked){
					flag = true;
				}
			});
			$("#selectall").attr("checked",!flag);
		});	
		$('.JsmarkIsRead').click(function(){
			markIsRead($(this).attr('dataindex'));
			return false;
		});
	},
	safeSet:function(){
		//绑定手机按钮事件
		YGM.Base.bindPhoneCheckBtn();
		YGM.Util.changeEmailBind();
		//发送短信
		function sendMsg(){
			//TODO:email绑定的时候图片验证
			var val = $('#code2_').val();
			if(val==''){
				YGM.Util.show('codeTips2','验证码不能为空');
				return;
			}
			var validResult = false;
			$.ajax({
				   type: "POST",
				   async:false,
				   url: '/api/checkCode2.sc',
				   data: 'code='+val,
				   success: function(d){
					   if(parseInt(d)==0){
							msg = '验证码不正确';
							YGM.Util.changeValidateImage2();
							YGM.Util.show('codeTips2',msg);
							validResult = false;
						}else {
							validResult = true;
							YGM.Util.clear();
						}
				   }
				});
			if(!validResult) return;
			var phone = $("#Mobile").val();
			if(phone == ""){
				alert("手机号码不正确!");
			}
			//这里异步发送短信，如果成功做如下操作
			if(1==1 && phone != "")
			{
				//获取手机验证码
				$.ajax({
				   type: "POST",
				   data:{"phone" : $("#Mobile").val(),"validCode":$("#code2_").val()},
				   url : "/my/sendPhoneAndCode.jhtml",
				   success: function(data){
					   var info = eval("("+data+")");
					   $("#sendMsgTips").show();
					   if(data == null){
						   failed("sendMsgTips","获取验证码失败!");
					   }else if(info.code == "S_OK"){		   		
						var _this=$("#sendMsgBtn");
						_this.css("color","#aaa").unbind("click").css({"cursor":"default"});
						var _t=60;
						$("#getMsgSpan").html(_t+"秒后重新发送");
						var _timer=setInterval(function(){
							_t-=1;
							$("#getMsgSpan").html(_t+"秒后重新发送");
							if(_t<=1)
							{
								clearInterval(_timer);
								_this.one("click",sendMsg).css({"color":"#535353","cursor":"pointer"});
								$("#getMsgSpan").html("重新获取短信验证码");
								$("#sendMsgTips").hide();
							}
						},1000);
						   success("sendMsgTips","验证码已发送，30分钟内有效");
					   }else if(info.code == "S_FAIL"){
						   failed("sendMsgTips","获取验证码失败!");
					   }else if(info.code == "E_ERR"){
						   failed("sendMsgTips","手机号码存在异常，请更换手机号码!");
					   }else if(info.code == "P_ERR"){
						   failed("sendMsgTips","手机号码格式不正确!");
					   }else if(info.code == "V_ERR"){
						   failed("sendMsgTips","提示：1分钟内不可重复获取验证码!");
					   }else if(info.code == "0"){
						   failed("sendMsgTips","提示：图片验证码失败!");
					   }else{
						   failed("sendMsgTips",info.msg);
					   }
				   }
				});
			}
		};
		function success(id,msg){
			$("#"+id).html(msg);
			$("#"+id).removeClass("u_ico u_checkTips u_errorTips").addClass("u_ico u_checkTips u_rightTips");	
		}
		function getEmailLoginUrl(email){
			var	suffUrl=[
						{id:"sina.com.cn",url:"http://mail.sina.com.cn/"},
						{id:"sina.com",url:"http://mail.sina.com.cn/"},
						{id:"sina.cn",url:"http://mail.sina.com.cn/"},
						{id:"vip.sina.com",url:"http://mail.sina.com.cn/"},
						{id:"2008.sina.com",url:"http://mail.sina.com.cn/"},
						{id:"163.com",url:"http://mail.163.com/"},
						{id:"126.com",url:"http://mail.126.com/"},
						{id:"popo.163.com",url:"http://popo.163.com/"},
						{id:"yeah.net",url:"http://email.163.com/"},
						{id:"vip.163.com",url:"http://vip.163.com/"},
						{id:"vip.126.com",url:"http://vip.126.com/"},
						{id:"188.com",url:"http://188.com/"},
						{id:"vip.188.com",url:"http://vip.188.com/"},
						{id:"tom.com",url:"http://mail.tom.com/"},
						{id:"yahoo.com",url:"http://mail.cn.yahoo.com/"},
						{id:"yahoo.com.cn",url:"http://mail.cn.yahoo.com/"},
						{id:"yahoo.cn",url:"http://mail.cn.yahoo.com/"},
						{id:"sohu.com",url:"http://mail.sohu.com/"},		
						{id:"hotmail.com",url:"https://login.live.com/"},
						{id:"139.com",url:"http://mail.10086.cn/"},
						{id:"gmail.com",url:"https://accounts.google.com"},
						{id:"msn.com",url:"https://login.live.com"},
						{id:"51.com",url:"http://passport.51.com/"},
						{id:"yougou.com",url:"http://mail.yougou.com/"},
						{id:"qq.com",url:"https://mail.qq.com"},
						{id:"foxmail.com",url:"http://mail.qq.com"},
						{id:"vip.qq.com",url:"http://mail.qq.com"}
					 ];
					var index = email.indexOf("@");
					var subStr = email.substring(index+1).replace(/\./g,"-");
					var exist = false;
					var loginUrl = "";	
					$.each(suffUrl,function(n,value) {
					  var emailId = value.id.replace(/\./g,"-");
					  if(subStr == emailId){
						loginUrl = value.url;
						exist = true;
					  }
					});
					 if(!exist){
						 loginUrl = "http://www."+ email.substring(index+1);
					 }
					
					 return loginUrl;
		}

		function failed(id,msg){
			$("#"+id).removeClass("u_ico u_checkTips u_rightTips").addClass("u_ico u_checkTips u_errorTips");		
			$("#"+id).html( msg );
		}	
		function check_email(){	
			var email = $('#be_email_').val();
			email == "" ? $(".bemail_t").show() : $(".bemail_t").hide();
			if(email == ""){
				return 1;
			}
			var email_reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
			if(!email_reg.test(email)){
				return 2;
			}
			if(email.length > 100){
				return 3;
			}
			return 0;
		}		
		//1、验证身份
		function bindEmailStep1(){
			$("#sendMsgBtn").bind("click",sendMsg);
			$("#be_code_").blur(function(){
				var be_code=$("#be_code_").val();
				if(be_code == null || be_code == "" ){
					failed("be_code_tip","请输入验证码");
				}
			}).focus(function(){$("#be_code_tip").removeClass("u_ico u_checkTips u_errorTips").html("");});

			//验证手机code
			$("#beStep_btn1").bind('click',function(){	
				var be_code=$("#be_code_").val();
				if(be_code == null || be_code == "" ){
					failed("be_code_tip","请输入验证码");
					return false;
				}
				$.ajax({
					type : "POST",
					async : false,
					url : "/my/validPhoneAndCode.jhtml?phone="+$("#Mobile").val()+"&code="+be_code,
					success : function(data) {
						var info = eval("("+data+")");
						if(info.code == "V_OK"){
							window.location.href = YouGou.Util.setUrlStamp("/my/securitySetActive.jhtml");
						}else{				
							failed("be_code_tip",info.msg);
						}
					}
				});	
			});
		}
		//2、绑定邮箱		
		function bindEmailStep2_1(){
			var $inpEmail = $("#be_email_");
			if($inpEmail.val() != ""){
				$(".bemail_t").hide();
			}
			$(".bemail_t").click(function(){
				$(".bemail_t").hide();
				$("#be_email_").focus();
			});
			$inpEmail.focus(function(){
				$(".bemail_t").hide();
			}).blur(function(){ 
				var check_email_rs=check_email();	
				if(check_email_rs==1){
					failed("be_email_tip","请输入Email");
					return false;
				}else if(check_email_rs==2){
					 failed("be_email_tip","Email格式错误");
					 return false;
				}else if(check_email_rs==3){
					failed("be_email_tip","邮箱长度不能超过100位");
					return false;
				}else{
					//验证邮箱是否存在
					var email = $inpEmail.val();
					$.ajax({
						type : "POST",
						data : {"email" : email},
						url : "/my/checkEmail.jhtml",
						success : function(data) {
							if(data == "true"){
								success("be_email_tip","");
								return true;
							}else{				
								failed("be_email_tip",data);						
								return false;
							}
						}
					});
				}
					
			});
		}
		//2、准备发送
		function readySendEmail(){
			$("#email_send_btn").bind('click',function(){
				var check_email_rs=check_email();
				if(check_email_rs==1){
					failed("be_email_tip","请输入Email");
					return false;
				}else if(check_email_rs==2){
					 failed("be_email_tip","Email格式错误");
					 return false;
				}else if(check_email_rs==3){
					failed("be_email_tip","邮箱长度不能超过100位");
				   return false;
				}else{
					//验证邮箱是否存在
					var email = $("#be_email_").val();
					$.ajax({
						type : "POST",
						data : {"email" : email},
						url : "/my/checkEmail.jhtml",
						success : function(data) {
							if(data == "true"){
								success("be_email_tip","");
								$("#beStep_form2").submit();
								return true;
							}else{				
								failed("be_email_tip",data);						
								return false;
							}
						}
					});
				}
			});	
		}
		//3、绑定邮箱--已发送
		function bindEmailStep2_2(){
			var email = $("#reMail").val();
			$.ajax({
				type : "POST",
				data : {"email" : email},
				url : "/my/toSendEmail.jhtml",
				success : function(data) {
					if(data == "true"){
						//success("agn_email_tip","邮件已发送成功！");
					}else if(date == "multi"){
						$("#agn_email_tip").removeClass("u_ico u_checkTips u_errorTips").removeClass("u_ico u_checkTips u_rightTips");
					}else{				
						failed("agn_email_tip",data);
					}
				}
			});	
			$("#toBindEmailBtn").bind('click',function(){	
				var email = $("#wantSendEmail").html();
				var dispacheUrl = getEmailLoginUrl(email);
				window.open(dispacheUrl);
			});	
			$("#sendEmailAgainBtn").bind('click',function(){
				$("#agn_email_tip").hide();
				$("#divSend").html("&nbsp;&nbsp;&nbsp;&nbsp;<span class='Blue'>正在发送邮件......</span>");	
				var email = $("#reMail").val();
				$.ajax({
					type : "POST",
					data : {"email" : email},
					url : "/my/sendEmailAgn.jhtml",
					success : function(data) {
						if(data == "true"){
							success("agn_email_tip","邮件已重新发送成功！");
						}else{				
							failed("agn_email_tip",data);
						}
						$("#agn_email_tip").show();
						$("#divSend").html("<a href='javascript:void(0);' id='sendEmailAgainBtn' class='Blue'>没有收到？再次发送</a>");
					}
				});
			});	
		}
		$(".safeInput").focus(function(){
			$(this).removeClass("sinput").addClass("sinput_red");
		}).blur(function(){
			$(this).removeClass("sinput_red").addClass("sinput");
		});
		//区分步骤绑定
		if(document.getElementById('sendMsgBtn')){bindEmailStep1();}
		if(document.getElementById('email_send_btn')){readySendEmail();}
		if(document.getElementById('be_email_')){bindEmailStep2_1();}
		if(document.getElementById('wantSendEmail')){bindEmailStep2_2();}
	},
	//重新绑定手机号码
	rebind:function()
	{
		//检查手机号
		function checkMobile()
		{
			var phone = $("#Mobile").val();
			if(phone == ""){
				failed("sendMsgTips","请输入手机号码!");
				return false;
			}
			var rex = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0-9]|17[0-9])\d{8}$/;
			if(!rex.test(phone)){
				$("#Mobile").focus();
				failed("sendMsgTips","手机号码格式错误!");
				return false;
			}
			//防止重复点击
			//$("#sendMsgBtn").unbind("click");
			return true;
		}
		//检查验证码
		function checkCode()
		{
			var be_code=$("#be_code_").val();
			if(be_code == null || be_code == "" ){
				failed("be_code_tip","请输入验证码!");
				return false;
			}
			return true;
		}
		//发送短信
		function sendMsg(){
			var val = $('#code2_').val();
			if(val==''){
				YGM.Util.show('codeTips2','验证码不能为空');
				return;
			}
			var validResult = false;
			$.ajax({
				   type: "POST",
				   async:false,
				   url: '/api/checkCode2.sc',
				   data: 'code='+val,
				   success: function(d){
					   if(parseInt(d)==0){
							msg = '验证码不正确';
							YGM.Util.changeValidateImage2();
							YGM.Util.show('codeTips2',msg);
							validResult = false;
						}else {
							validResult = true;
							YGM.Util.clear();
						}
				   }
				});
			if(!validResult) return;
			
			
			if(!checkMobile()) return;
			//获取手机验证码
			$.ajax({
				   type: "POST",
				   data:{"phone" : $("#Mobile").val(),"validCode":$("#code2_").val()},
				   url : "/my/sendPhoneAndCode.jhtml?"+Math.random(),
				   //url : "/usercenter/rebind/sms.sc?"+Math.random(),
				   success: function(data){
					   var info = eval("("+data+")");
					   if(data == null){
						   failed("sendMsgTips","获取验证码失败!");
						   return;
					   }else if(info.code == "S_OK"){		   		
						   var _this=$("#sendMsgBtn");
						   _this.css("color","#aaa").unbind("click").css({"cursor":"default"});
						   var _t=60;
						   $("#getMsgSpan").html(_t+"秒后重新发送");
						   var _timer=setInterval(function(){
							   _t-=1;
							   $("#getMsgSpan").html(_t+"秒后重新发送");
							   if(_t<=1)
							   {
								   clearInterval(_timer);
									_this.bind("click",sendMsg).css({"color":"#535353","cursor":"pointer"});
									$("#getMsgSpan").html("重新获取短信验证码");
									$("#sendMsgTips").hide();
							   }
						   },1000);
						   success("sendMsgTips","验证码已发送，30分钟内有效");
					   }else if(info.code == "S_FAIL"){
						   failed("sendMsgTips","获取验证码失败!");
					   }else if(info.code == "E_ERR"){
						   failed("sendMsgTips","手机号码存在异常，请更换手机号码!");
					   }else if(info.code == "P_ERR"){
						   failed("sendMsgTips","手机号码格式不正确!");
					   }else if(info.code == "V_ERR"){
						   failed("sendMsgTips","提示：1分钟内不可重复获取验证码!");
					   }else if(info.code == "0"){
						   failed("sendMsgTips","提示：图片验证码不正确");
					   }else{
						   failed("sendMsgTips",info.msg);
					   }
				   }
				});
		}
		function common()
		{
			$("#sendMsgBtn").bind("click",sendMsg);
			$("#be_code_").blur(function(){
				checkCode();
				}).focus(function(){
				$("#be_code_tip").removeClass("u_ico u_checkTips u_errorTips").html("");
			});
		}
		function verify(){
			common();
			phoneList();
			//验证手机code
			$("#verifyBtn").bind('click',function(){
				if(document.getElementById('phoneList')){
					if(!checkMobile()) return;
				}
				if(!checkCode()) return;
				var be_code=$("#be_code_").val();
				$.ajax({
					type : "POST",
					async : false,
					url : "/my/rebind/verifyCode.jhtml?mobile="+$("#Mobile").val()+"&code="+be_code,
					success : function(data) {
						var info = eval("("+data+")");
						if(info.code == "V_OK"){
							window.location.href = YouGou.Util.setUrlStamp("/my/rebind/modify.jhtml");
						}else{				
							failed("be_code_tip",info.msg);
						}
					}
				});	
			});
		}
		function bindMobile()
		{
			common();
			$("#bindNewBtn").bind('click',function(){
				if(!checkMobile()) return;
				var be_code=$("#be_code_").val();
				if(be_code == null || be_code == "" ){
					failed("be_code_tip","请输入验证码!");
					return false;
				}
				$.ajax({
					type : "POST",
					async : false,
					url : "/my/rebind/bindMobile.jhtml?mobile="+$("#Mobile").val()+"&code="+be_code+"&t="+Math.random(),
					success : function(data) {
						if(data == 0){
							window.location.href = YouGou.Util.setUrlStamp("/my/rebind/success.jhtml");
						}else if(data == 1){				
							failed("sendMsgTips","手机号码格式错误!");
						}else if(data == 2){				
							failed("be_code_tip","请输入验证码!");
						}else if(data == 3){				
							failed("be_code_tip","验证码不正确!");
						}else if(data == 4){				
							failed("sendMsgTips","手机号码已经被绑定了,请换一个!");
						}else{
							failed("sendMsgTips","绑定失败!");
						}
					}
				});	
			});
		}
		//显示下拉菜单
		function phoneList()
		{
			if(document.getElementById('phoneList')){
				
				var list = $("#phoneList li");
				
				//取出第一个元素
				$("#Mobile").val($.trim(list.eq(0).text()));
				list.eq(0).addClass("curr");
				
				$("#listSelect").bind("click",function(){
					$("#phoneList").show();
				});
				$(document).bind("click",function(e){
					if($(e.target).parents(".phobook").length!=1){
						$("#phoneList").hide();
					}
				});
				list.bind("mouseover",function(){
					$("#phoneList li").removeClass("curr");
					$(this).addClass("curr");
				});
				list.bind("click",function(){
					var phon = $(this).html();
					$("#Mobile").val($.trim(phon));
					$("#phoneList").hide();
				});

			}
		}
		function failed(id,msg){
			$("#"+id).removeClass("u_ico u_checkTips u_rightTips").addClass("u_ico u_checkTips u_errorTips");		
			$("#"+id).html(msg);
			$("#"+id).show();
		}
		function success(id,msg){
			$("#"+id).html(msg);
			$("#"+id).removeClass("u_ico u_checkTips u_errorTips").addClass("u_ico u_checkTips u_rightTips");
			$("#"+id).show();
		}
		//区分步骤绑定
		if(document.getElementById('verifyBtn')){verify();}
		if(document.getElementById('bindNewBtn')){bindMobile();}
	},
	
	
	/******************************************************************************************************************************************/
	//重新绑定手机号码
	rebind1:function()
	{
		//检查手机号
		function checkMobile()
		{	
			
			var hideMobile = $("#hideMobile").text();
			if(hideMobile && hideMobile.indexOf("*") > 0) return true;
			var phone = $("#Mobile").val();
			if(phone == ""){
				failed("sendMsgTips","请输入手机号码!");
				return false;
			}
			var rex = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0-9]|17[0-9])\d{8}$/;
			if(!rex.test(phone)){
				$("#Mobile").focus();
				failed("sendMsgTips","手机号码格式错误!");
				return false;
			}
			//防止重复点击
			//$("#sendMsgBtn").unbind("click");
			return true;
		}
		//检查验证码
		function checkCode()
		{
			var be_code=$("#be_code_").val();
			if(be_code == null || be_code == "" ){
				failed("be_code_tip","请输入验证码!");
				return false;
			}
			return true;
		}
		//发送短信
		function sendMsg(){
			var val = $('#code2_').val();
			if(val==''){
				YGM.Util.show('codeTips2','验证码不能为空');
				return;
			}
			var validResult = false;
			$.ajax({
				   type: "POST",
				   async:false,
				   url: '/api/checkCode2.sc',
				   data: 'code='+val,
				   success: function(d){
					   if(parseInt(d)==0){
							msg = '验证码不正确';
							YGM.Util.changeValidateImage2();
							YGM.Util.show('codeTips2',msg);
							validResult = false;
						}else {
							validResult = true;
							YGM.Util.clear();
						}
				   }
				});
			if(!validResult) return;
			
			if(!checkMobile()) return;
			
			var url = "";	
			if($("#hideMobile").text()){	//判断是否为验证身份
				url = "/my/sendCode.jhtml?"+Math.random();
			}else{
				url = "/my/sendPhoneAndCode.jhtml?"+Math.random();
			}
			//获取手机验证码
			$.ajax({
				   type: "POST",
				   data:{"phone" : $("#Mobile").val(),"validCode":$("#code2_").val()},
				   url : url,
				   //url : "/usercenter/rebind/sms.sc?"+Math.random(),
				   success: function(data){
					   var info = eval("("+data+")");
					   if(data == null){
						   failed("sendMsgTips","获取验证码失败!");
						   return;
					   }else if(info.code == "S_OK"){		   		
						   var _this=$("#sendMsgBtn");
						   _this.css("color","#aaa").unbind("click").css({"cursor":"default"});
						   var _t=60;
						   $("#getMsgSpan").html(_t+"秒后重新发送");
						   var _timer=setInterval(function(){
							   _t-=1;
							   $("#getMsgSpan").html(_t+"秒后重新发送");
							   if(_t<=1)
							   {
								   clearInterval(_timer);
									_this.bind("click",sendMsg).css({"color":"#535353","cursor":"pointer"});
									$("#getMsgSpan").html("重新获取短信验证码");
									$("#sendMsgTips").hide();
							   }
						   },1000);
						   success("sendMsgTips","验证码已发送，30分钟内有效");
					   }else if(info.code == "S_FAIL"){
						   failed("sendMsgTips","获取验证码失败!");
					   }else if(info.code == "E_ERR"){
						   failed("sendMsgTips","手机号码存在异常，请更换手机号码!");
					   }else if(info.code == "P_ERR"){
						   failed("sendMsgTips","手机号码格式不正确!");
					   }else if(info.code == "V_ERR"){
						   failed("sendMsgTips","提示：1分钟内不可重复获取验证码!");
					   }else if(info.code == "0"){
						   failed("sendMsgTips","提示：图片验证码不正确");
					   }else{
						   failed("sendMsgTips",info.msg);
					   }
				   }
				});
		}
		function common()
		{
			$("#sendMsgBtn").bind("click",sendMsg);
			$("#be_code_").blur(function(){
				checkCode();
				}).focus(function(){
				$("#be_code_tip").removeClass("u_ico u_checkTips u_errorTips").html("");
			});
		}
		function verify(){
			common();
			phoneList();
			//验证手机code
			$("#verifyBtn").bind('click',function(){
				if(document.getElementById('phoneList')){
					if(!checkMobile()) return;
				}
				if(!checkCode()) return;
				var nextUrl = "";	
				if($("#hideMobile").text()){	//判断是否为验证身份
					nextUrl = "/my/rebind/verifyCodeNoMobile.jhtml?" + Math.random();
				}else{
					nextUrl = "/my/rebind/verifyCode.jhtml?" + Math.random();
				}
				var be_code=$("#be_code_").val();
				$.ajax({
					type : "POST",
					async : false,
					url : nextUrl,
					data:{"mobile" : $("#Mobile").val(),"code":be_code},
					success : function(data) {
						var info = eval("("+data+")");
						if(info.code == "V_OK"){
							window.location.href = YouGou.Util.setUrlStamp("/my/rebind/modify.jhtml");
						}else{				
							failed("be_code_tip",info.msg);
						}
					}
				});	
			});
		}
		function bindMobile()
		{
			common();
			$("#bindNewBtn").bind('click',function(){
				if(!checkMobile()) return;
				var be_code=$("#be_code_").val();
				if(be_code == null || be_code == "" ){
					failed("be_code_tip","请输入验证码!");
					return false;
				}
				$.ajax({
					type : "POST",
					async : false,
					url : "/my/rebind/bindMobile.jhtml?mobile="+$("#Mobile").val()+"&code="+be_code+"&t="+Math.random(),
					success : function(data) {
						if(data == 0){
							window.location.href = YouGou.Util.setUrlStamp("/my/rebind/success.jhtml");
						}else if(data == 1){				
							failed("sendMsgTips","手机号码格式错误!");
						}else if(data == 2){				
							failed("be_code_tip","请输入验证码!");
						}else if(data == 3){				
							failed("be_code_tip","验证码不正确!");
						}else if(data == 4){				
							failed("sendMsgTips","手机号码已经被绑定了,请换一个!");
						}else{
							failed("sendMsgTips","绑定失败!");
						}
					}
				});	
			});
		}
		//显示下拉菜单
		function phoneList()
		{
			if(document.getElementById('phoneList')){
				
				var list = $("#phoneList li");
				
				//取出第一个元素
				$("#Mobile").val($.trim(list.eq(0).text()));
				list.eq(0).addClass("curr");
				
				$("#listSelect").bind("click",function(){
					$("#phoneList").show();
				});
				$(document).bind("click",function(e){
					if($(e.target).parents(".phobook").length!=1){
						$("#phoneList").hide();
					}
				});
				list.bind("mouseover",function(){
					$("#phoneList li").removeClass("curr");
					$(this).addClass("curr");
				});
				list.bind("click",function(){
					var phon = $(this).html();
					$("#Mobile").val($.trim(phon));
					$("#phoneList").hide();
				});

			}
		}
		function failed(id,msg){
			$("#"+id).removeClass("u_ico u_checkTips u_rightTips").addClass("u_ico u_checkTips u_errorTips");		
			$("#"+id).html(msg);
			$("#"+id).show();
		}
		function success(id,msg){
			$("#"+id).html(msg);
			$("#"+id).removeClass("u_ico u_checkTips u_errorTips").addClass("u_ico u_checkTips u_rightTips");
			$("#"+id).show();
		}
		//区分步骤绑定
		if(document.getElementById('verifyBtn')){verify();}
		if(document.getElementById('bindNewBtn')){bindMobile();}
	}
};

//申请发票的时候显示发票跟踪信息
function displayInfo(){
	var infoDiv=$("#invoiceDeliveryInfo");
	var invoiceNo = $('.order_invoice_tab > a.curr').attr('id');
	$('.order_invoice_tabc').show();
	$('#orderDeliveryInfoDiv'+invoiceNo).show();
	showDeliveryInfoLink(invoiceNo);
	infoDiv.show();
	
};

//安全验证时需要调用的，因暂时无法确定哪些地方调用所以放到全局
function gaPvByCheckPhone(type){
	try{
		//手机号验证弹层弹出时
		if(type == "1"){
			_gaq.push(['_trackPageview','/PageAction/register/TC_registerpage/mail/bindmobile']);
		//击获取验证码行为数量
		}else if(type == "2"){
			_gaq.push(['_trackPageview','/PageAction/register/TC_registerpage/mail/bindcode']);
		//实际发送验证码数量
		}else if(type == "3"){
			_gaq.push(['_trackPageview','/PageAction/register/TC_registerpage/mail/bindsent']);
		//完成验证数量
		}else if(type == "4"){
			_gaq.push(['_trackPageview','/PageAction/register/TC_registerpage/mail/bindsucces']);
		}
	}catch(e){}
};

YGM.GlobeTip={
	/*雅虎邮箱绑定提示*/
	emailTipSet:function(dModule){
		$.ajax({
			type : "POST",
			url : "/my/adjustEmailSigned.jhtml",
			success : function(data) {
				if(data == "true"){
					$(dModule).show();
				}
			}
		});		
		
		//安全设置绑定邮箱
		$(".uc_email_tip #email_bind_modify").bind('click',function(){
			$.ajax({
				type : "POST",
				url : "/my/checkWeekBindTimes.jhtml",
				success : function(data) {
					if("true" == data){
						alert("一周内仅限一次修改绑定邮箱!");
					}else{
						YGM.Base.securityBind(function(){
							//安全验证成功回调，跳转到绑定第二步
							location.href=YouGou.Util.setUrlStamp("/my/securitySetActive.jhtml?modelId=register");
						},function(){
							//无需安全验证回调，跳转到绑定第一步
							location.href=YouGou.Util.setUrlStamp("/my/securitySet.jhtml");
						});
					}
				}
			});
		});
		
		$('.uc_email_tip .close').bind('click',function(){
			$(this).parent().hide();
		});	
	},	
	// 24 热门商品推荐
	hottop24r:function(dModule){
		$.ajax({
			type : "POST",
			url : "/my/hottop24r.jhtml",
			success : function(data) {
				if(YouGou.Util.isEmpty(data)) {
					return;
				}
				var obj = eval("("+data+")");
				if(obj.code == 'ok'){
					if($('.hotlist').html() == null){
						if($("#umenu_right").length>0){
//							$('<ul class="hotlist hotlist_right"><li class="hotlist_tit"><div><p>24小时热销推荐</p></div></li></ul>').appendTo('#umenu_right');
						}else{
							$('<ul class="hotlist"><li class="hotlist_tit"><div><p>24小时热销推荐</p></div></li></ul>').appendTo('#umenu');
						}
						
						$('<li class="hotlist_dl"></li>').appendTo('.hotlist');
					}
					$('.hotlist_dl').empty();
					
					// 获取当前页面名称 ref=my_[页面名称]&po=hot24_[顺序]
					var a = location.href;
					var b = a.split("/");
					var c = b.slice(b.length-1, b.length).toString(String).split(".");
					var pageName = c.slice(0, 1);
					if(window.hottopNum == null || window.hottopNum > 30){
						window.hottopNum = 1;
					}
					$.each(obj.data,function(n,value) {
						value.dpUrl = value.dpUrl + "#ref=my_"+ pageName +"&po=hot24_" + window.hottopNum;
						$('<dl>'+
		                    	'<dt><a href=\"'+value.dpUrl+'\" target="_blank"><img src=\"'+value.thumbnail+'\" title=\"'+value.skuSliderName+'\" alt=\"'+value.skuShowName+'\" onerror=\"this.src=\'/images/common/60x60.jpg\'\"/></a></dt>'+
		                        '<dd>'+
		                        	'<p class="hotgoodsname"><a href=\"'+value.dpUrl+'\" target="_blank" title=\"'+value.skuSliderName+'\">'+value.skuShowName+'</a></p>'+
		                            '<p class="hotgoodsprice"><span class="Red">￥'+value.salePrice+'</span><span class="Hui">￥'+value.marketPrice+'</span></p>'+
		                        '</dd>'+
		                    '</dl>').appendTo('.hotlist .hotlist_dl');
						window.hottopNum ++;
					});
					if($('.hotrenovate').html() == null){
						$('<li class="last"><a class="hotrenovate" href="javascript:void(0);" onclick="YGM.GlobeTip.hottop24r()">换一批</a></li>').appendTo('.hotlist');
					}
				}
			}
		});	
	},
	goodsSaleTips : function(url){
		dg = ygDialog({skin:3,content:'<div class="clearfix" style="margin:0px auto;padding:15px 40px;"><div class="fl jingg_ico jg_ico1">&nbsp;</div><div class="fr jingg_word">出于安全与卫生考虑，贴身用品如内衣裤，袜类等商品，如已影响二次销售将不支持退换货，质量问题除外。</div></div><div style="width: 230px;  height: 31px; line-height: 30px; text-align: center; cursor: pointer; margin: 13px auto;cursor:pointer"><input type="button" value="继续" class="subbbtn" onclick="javascript:window.location.href=\''+url+'\'" /><input type="button" value="取消" id="closedg" class="subbbtn quitsbtn" /></div>',width:400,height:180});
        $("#closedg").bind("click",function(){
        	dg.close();
        });
	}
};

$(function(){
	var doWhileExist = function(sModuleId,oFunction){
		if(document.getElementById(sModuleId)){oFunction(document.getElementById(sModuleId));}
	};
	//导航安全设置
	//doWhileExist('uc_safe_level',YGM.Base.setSafeLevel);
	//首页-为用户中心左栏的提示提供请求
	//doWhileExist('my_point_tick',YGM.Base.getMenuTicks);
	//首页
	doWhileExist('ucindex',YGM.Module.uIndex);
	//我的订单
	doWhileExist('myorder',YGM.Module.myOrder);
	//我的订单详情
	doWhileExist('myorderdetail',YGM.Module.orderDetail);
	//我的收藏夹
	doWhileExist('fav_prd',YGM.Module.favorites);
	//站内消息
	doWhileExist('sitemsg',YGM.Module.siteMsg);
	//安全设置
	doWhileExist('safeset',YGM.Module.safeSet);
	//修改绑定手机
	doWhileExist('rebind',YGM.Module.rebind1);
	//全局提示-邮箱
	doWhileExist('uc_email_tip',YGM.GlobeTip.emailTipSet);
	//热门商品推荐-左栏目
	doWhileExist('umenu',YGM.GlobeTip.hottop24r);
//	doWhileExist('umenu_right',YGM.GlobeTip.hottop24r);
	
	
	
	/*
		申请退换货，商品点评 ,我的积分null
		我的优惠券，我的礼品卡 MD5.JS/couponEffectRangeShow.js
		我的收货地址yg.mem.addr.js/validate/areselecor
		修改密码memberEditPwd.js/validate
		个人资料memberBasicinfo_editInfo.js/validate/areaselecor/data_birthday
	*/
	//兼容原来的thickbox效果
	$(".appserv a.thickbox").click(function(){
		var arrUrl=this.href.split('?');
		var urlString = /.jpg|.jpeg|.png|.gif|.shtml|.htm/g;
		var opt = arrUrl[1].replace('?','').split('&'),opts={},key,val;
			for(var i=0;i<opt.length;i++){
				key = opt[i].substring(0,opt[i].indexOf('='));
				val = opt[i].substring(opt[i].indexOf('=')+1);
				opts[key]=val;
			}
			opts.url = arrUrl[0]+'?r='+Math.random();
			opts.title=this.title;
			if(!opts.width){
				opts.width=500;
			}
			ygDialog(opts);
			this.blur();
			return false;
	});
	
});

