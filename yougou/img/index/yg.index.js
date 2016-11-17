
var cdnUrl,isYgDailogExist
	/*bigBannerShowComplete=false*/;//用来判断首页顶部广告是否存在及动画是否完成;
/*导航控制*/
$(function(){
	/*if($("#bigBannerShow").length>0){
		bigBannerShowComplete=true;
	}*/
	
	/*左侧分类菜单相关js 20130315*/		
	handlNavHover();
	function handlNavHover(){
		$('.yg_category_list li').hover(function(){
			var index=$('.yg_category_list li').index(this);
			$('.yg_category_list li').removeClass('curr').eq(index).addClass('curr');
			$('.yg_category .bd').addClass('bd_hover');
			$('.yg_category_item').hide().eq(index).show();
		});
	}
	$('.yg_category .bd').mouseleave(function(){
		$('.yg_category_list li').removeClass('curr');
		$('.yg_category .bd').removeClass('bd_hover');
	});
	
	/*头部二维码相关*/
	$('.js_stn_menu_item').hover(function(){
		$(this).addClass('hover').siblings().removeClass('hover');
	},function(){
		$(this).removeClass('hover');
	});
	$('.js_stn_mobile_list li').hover(function(){
		$(this).addClass('on').siblings().removeClass('on');
	},function(){
		$(this).removeClass('on');
	});
});

//placeholder
;(function($){
	if($.fn.placeholder){return;}
	$.fn.placeholder = function () {
		var fnFocus = function () {
			$(this).addClass('ph-wrap-focus').find('input').focus();
		}
		var fnPaste=function(e) {
			$(this).parent().addClass('ph-wrap-has');
		}
		var fnKey = function () {
			this.value != '' ? $(this).parent().addClass('ph-wrap-has') : '';
		}
		var fnBlur = function () {
			if ($.trim(this.value) == '') {
				$(this).val('').parent().removeClass('ph-wrap-has ph-wrap-focus');
			}
		}
		return this.each(function () {
			var $this = $(this);
			if($this.parent().hasClass('ph-wrap')){return}
			var dSpan = $('<span/>', { 'class': 'placeholder', text: $this.attr('placeholder') });
			dWrap = $('<div/>', { 'class': 'ph-wrap', click: fnFocus });
			$this.wrap(dWrap).before(dSpan).bind({ keyup: fnKey, blur: fnBlur,paste:fnPaste });
			if ($.trim(this.value) != '') {
				$this.parent().addClass('ph-wrap-has');
			}
		})
	}
	// 检测 placeholder 支持
	$(function(){
		supportPlaceholder = 'placeholder' in document.createElement('input');
		if (!supportPlaceholder) {
			$('input[placeholder]').placeholder();
		}		
	});
	window.onload=function(){
		$('.ph-wrap input').each(function () {
			if ($.trim(this.value) != '') {
				$(this).parent().addClass('ph-wrap-has');
			}
		});		
	}
})(jQuery);
/*时间倒计时*/
(function($){
	$.fn.countDown=function(){
		return this.each(function(){
			var _this=$(this);
			var _leftSec=_this.attr('endtime');;
			var _t=null;
			var d,h,m,s,ms;
			function countdown(){
				_leftSec-=100;
				//d=Math.floor(_leftSec/(1000*60*60*24));
				//h=Math.floor((_leftSec/(1000*60*60))%24);
				m=Math.floor((_leftSec/(1000*60))%60);
				s=Math.floor((_leftSec/1000)%60);
				ms=Math.floor((_leftSec/100)%10);
				if(m<10){m="0"+m;}
				if(s<10){s="0"+s;}
				_this.html('<em>0</em>小时<em>'+m+'</em>分<em>'+s+'.'+ms+'</em>秒');
				if(_leftSec<=0) {
					_leftSec=3600000;
				}
				_t=setTimeout(countdown,100);
				
			}
			countdown();
		});
	}
})(jQuery);	
(function() {
	// 定义YouGou类
	if (typeof YouGou == 'undefined') {
		// 声明框架命名空间
		YouGou = {
			version : '1.1 beta1',
			Biz:{},
			//Ajax : {},
			//Base : {},
			Util : {},
			UI : {}
		};
	}
	// 全局变量、函数
	var isOpera = $.browser.opera, isIE = $.browser.msie, isMoz = $.browser.mozilla;
	if (isIE) {
		try {
			document.execCommand("BackgroundImageCache", false, true);
		} catch (e) {}
	}
	// 工具辅助函数库
	YouGou.Util = {
		// 获得时间戳
		timestamp : function() {
			return 't='+new Date().getTime()+''+Math.floor(Math.random()*9999+1000);
		},
		setUrlStamp : function(url)
		{
			url = url.replace(/(^\s*)|(\s*$)/g,'');//去除空白
			if(url.indexOf("t=") == -1)
			{
				if(url.indexOf("?") != -1)
				{
					url = url+"&"+YouGou.Util.timestamp();
				}else
				{
					url = url+"?"+YouGou.Util.timestamp();
				}
			}
			return url;
		},
		//链接加上时间戳
		setHrefStamp : function(area)
		{
			var target = $(area+" [href]");
			if(target.length==0) return;
			target.each(function(index){
				$(this).attr('href',YouGou.Util.setUrlStamp($(this).attr('href')));
			});
		}
	};
	// 提供页面端函数
	YouGou.UI = {
		showTip:function(str,srcElementDom){
			var offset = $(srcElementDom).offset();
			if(!$('#yg-ui-showTip')[0]){
				$('<div id="yg-ui-showTip" class="yg_ui_showTip">').appendTo('body');
			}else{
				$('#yg-ui-showTip').stop(true,true);
			}
			$('#yg-ui-showTip').html(str).css({'top':offset.top,'left':offset.left-30,'z-index':'10001','opacity':100}).show().animate({left:offset.left-50});
			setTimeout(function(){
				$('#yg-ui-showTip').animate({left:offset.left,opacity:0},function(){$(this).hide()});
			},800);
		},	
		baseUrl:cdnUrl?cdnUrl:''
	};
	YouGou.UI.uimg={
			img1:YouGou.UI.baseUrl+"/template/common/images/reload.gif", //YouGou.UI.uimg.img1
			img160:YouGou.UI.baseUrl+"/template/common/images/nloading.gif",
			imgerr:YouGou.UI.baseUrl+"/images/common/160x160.jpg",//YouGou.UI.uimg.imgerr
			img32:YouGou.UI.baseUrl+"/template/common/images/loading.gif"	
	};
	// 业务相关函数库
	YouGou.Biz = {
		// 浏览器工具
		WebToolkit : {
			// 添加收藏
			addFavorite : function(){
				var url="http://www.yougou.com/";
				var title="优购时尚商城-时尚鞋类网购首选-买好鞋,上优购";
				ua = navigator.userAgent.toLowerCase();
				try{
					if(document.all){
							window.external.AddFavorite(url,title);
						}else if(window.sidebar){
						window.sidebar.addPanel(title,url,"");
					}else{
						alert("加入收藏失败，\n请您使用菜单栏或Ctrl+D收藏本站。");
					}
				}
				catch(e){
					alert("加入收藏失败，\n请您使用菜单栏或Ctrl+D收藏本站。");
				}
			}
		},
// 购物车Class
		ShoppingCart : {
			cartContainer : "shoppingcartContainer",
			cartActionBasePath : "/shoppingcart/",
			targetUrl : "/yitianmall/shoppingmgt_new/simpleShoppingCart",
			// 初始化购物车
			initCart : function(){
				var prodCount = document.getElementById("pordcount");
				if(!prodCount){
					return;
				}
			 	$("#paymoney").click(function(e){
			 		var prodCount = $("#pordcount").text();
					YouGou.Biz.ShoppingCart.checkShoppingCart();
					e.stopPropagation();
			    });
				$(".mycart_nav").bind("mouseenter",function(){
					if(!$(this).hasClass("mycart_hover"))
					{
						$(this).addClass("mycart_hover");
						YouGou.Biz.ShoppingCart.showCart();
						//$('#shoppingcartContainer').stop(true).show(0)
						
					}
					
				});
				$(".mycart_nav").bind("mouseleave",function(){
					if($(this).hasClass("mycart_hover"))
					{
						//$('#shoppingcartContainer').css('display','none');
						$('#shoppingcartContainer').html('');
						$(this).removeClass("mycart_hover");
						
					}
					
				});
				//以下是用户中心购物车使用
				$('.cartlnk').click(function(e){
					var dMyCart = $('.mycart_header');
					if(!dMyCart.hasClass('mycart_hover')){
						dMyCart.addClass('mycart_hover');
						YouGou.Biz.ShoppingCart.showCart();
						$('.mycart_header #shoppingcartContainer').show();	
					}
					 e.stopPropagation();
				});
				$(document).click(function(){
					$('.mycart_header').removeClass('mycart_hover');
					$('.mycart_header #shoppingcartContainer').hide();					
				});	
				$('#shoppingcartContainer').click(function(e){
					 e.stopPropagation();
				});
			},
			initCartCnt:function(data,isshow){
				//alert(data);
				$("#shoppingcartContainer").html(data);
				//if(isshow){return;}
				$('#shoppingcartContainer li:first').find('.num_warntips').remove();
				var warnMsg=$(".num_warntips");
				if(warnMsg.length>0){
					$('html,body').animate({scrollTop: $(".num_warntips").first().offset().top},1000);
					warnMsg.fadeIn("fast").delay(1000).fadeOut();
				}				
				//收藏
				$('.JsFavorite').click(function(){
					var pid = $(this).attr('cid');
					var psize = $(this).attr('psize');
					YouGou.Biz.ShoppingCart.addCommodityFavorite(pid,psize,this);
				});
				//删除
				$('.JsRemoveGood').click(function(){
					var pid = $(this).attr('pid');
					YouGou.Biz.ShoppingCart.removeProduct(pid,true,this);
				});
				//高度
				var h=0,len,i;
				len=$('.mycart_pro_list li').not('.li_merge').length;
				if(len>5){
					for(i=0;i<5;i++){
						h+=$('.mycart_pro_list li').not('.li_merge').eq(i).height()+21;
					}
					$('.mycart_pop .bd').height(h-1);
				}				
			},
			// 显示
			showCart : function(isshow){
				var shopcartContainer = $("#shoppingcartContainer");
				//if(shopcartContainer.html()!=''&&!$('.mycart_no_pro')[0]){shopcartContainer.show();return;}
				shopcartContainer.html('<div class="mycart_pop abs"><h3 class="hd rel">我的购物车</h3><div class="bd" style="padding:10px;text-align:center;width:324px;height:20px;"><img src="/images/loading.gif" /></div></div>');
				$.ajax({
					type: "POST",
					url:this.cartActionBasePath+"getShoppingCartForHomePage.sc",
					success:function(data){
						if(data){
							YouGou.Biz.ShoppingCart.initCartCnt(data,isshow);
						}
					}
				});
			},
			// 修改购物车数量
			changeProductNum : function(type,index,simpleShoppingCart){
				var productNo = $("#productNo_"+index).val();
				var name = "oldNum_"+productNo;
				var sumProductNum=0;
				//此货品总数量
				$('input[name='+name+']').each(function(){
					sumProductNum=parseInt(sumProductNum)+parseInt(this.value);
				});
				
				var id = $("#productId_"+index).val();
				if(sumProductNum == 1 && type == "-"){
					this.removeProduct(id,true,$("#productNo_"+index)[0]);
					return;
				}
				//此行商品数量
				var oldNum = parseInt($("#oldNum_"+index).val());
				var newNum = type == "+"?oldNum + 1:oldNum - 1;
				$("#oldNum_"+index).val(newNum);
				var param = "productNum="+ newNum +"&id=" + id+"&targetUrl="+this.targetUrl+'&r='+Math.random()+"&productNo="+productNo;
				$.get(this.cartActionBasePath+"u_updateCart.sc",param,function(d){
					YouGou.Biz.ShoppingCart.initCartCnt(d);
				});
			},
			// 删除商品
			removeProduct : function(id,isTip,srcElement){
				if(isTip){
					if(!confirm("您确定要将此商品删除吗？")){return;}
				}
				var pNo=$(srcElement).attr("pNo");
				var param = "id=" + id + "&targetUrl="+this.targetUrl+"&productNo="+pNo;
				// 异步移除商品
				$.post(this.cartActionBasePath+"removeProduct.sc",param,function(d){
					if(srcElement){
						$(srcElement).parents('li:first').fadeOut('fast',function(){
							YouGou.Biz.ShoppingCart.initCartCnt(d);
						});
					}else{
						YouGou.Biz.ShoppingCart.initCartCnt(d);
					}
					
				});				
			},
			// 收藏
			addCommodityFavorite : function(commodityId,psize,srcElementDom){
				var url = [];
				url.push("/api/addCommodityFavorite.jhtml?id=");
				url.push(commodityId);
				url.push("&productSize="+psize);
				$.ajax({
					 type: 'POST',
					 url: url.join(""),
					 dataType : "json",
					 success: function(data){
						var flag = parseInt(data.flag);
						var strMsg = flag==1?'您已经收藏过该商品':'成功添加到收藏夹';
						YouGou.UI.showTip(strMsg,srcElementDom);						
					 }
				});
			},
			checkShoppingCart : function(){
				//购买支付流程虚拟链接添加
				_gaq.push(['_trackPageview','/PageAction/Buy/checkout']);
				window.open("/order.jhtml");
			}
		},
	// 站内信Class
		WebsiteMessage : {
			init : function(){
				$.ajax({
					 type: 'POST',
					 url: "/api/msg/getMsg.jhtml",
					 error: function(XmlHttpRequest, textStatus, errorThrown) {
						 $("#top_msg").show();
					 },
					 success: function(data){
						if(!!data){
							var count = data.substring(data.lastIndexOf("count=")+6,data.lastIndexOf("msg="));
							var _msgHtml = [];
							_msgHtml.push('<a href="http://www.yougou.com/my/msg.jhtml?'+YouGou.Util.timestamp()+'">站内消息(<i class="corg" >');
							_msgHtml.push(count);
							_msgHtml.push('</i>)</a>');

							$("#top_msg").html(_msgHtml.join('')).show();
							if(count !=0){
								try{
									// usercenter菜单
									$("#uc_msg_count").html("站内消息<i class='orgse'>（<em>"+ count +"</em>）</i>").attr('count',count);
									// usercenter index page
									$("#css_no_num").removeClass("no_num");
									$("#css_no_num").attr("href","http://www.yougou.com/my/msg.jhtml?"+YouGou.Util.timestamp());
									$("#uc_index_count").text(count);
								}catch(e){}
							}else{
								$("#css_no_num").addClass("no_num");
								$("#css_no_num").removeAttr("href");
								$("#css_no_num").css("color","#999");
								$("#uc_index_count").text(count);
							}
						}else{
							$("#css_no_num").addClass("no_num");
							$("#css_no_num").removeAttr("href");
							$("#css_no_num").css("color","#999");
							$("#top_msg").html("站内消息(0)").show();
						}
					 }
				});
				//点评个数
				$.get('/my/getCommentCount.jhtml',function(d){
					var msg='<a href="http://www.yougou.com/my/comment.jhtml?'+YouGou.Util.timestamp()+'">等待点评(<i class="corg">'+d+'</i>)</a>';
					$('#commentcount').html(msg).show();
					
				});				
			}
		},
		// Cookie操作
		cookie : function(name, value, options){
			if (typeof value != 'undefined') {
		        options = options || {};
		        if (value === null) {
		            value = '';
		            options.expires = -1;
		        }
		        var expires = '';
		        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
		            var date;
		            if (typeof options.expires == 'number') {
		                date = new Date();
		                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
		            } else {
		                date = options.expires;
		            }
		            expires = '; expires=' + date.toUTCString();
		        }
		        var path = options.path ? '; path=' + (options.path) : '';
		        var domain = options.domain ? '; domain=' + (options.domain) : '';
		        var secure = options.secure ? '; secure' : '';
		        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
		    } else {
		        var cookieValue = null;
		        if (document.cookie && document.cookie != '') {
		            var cookies = document.cookie.split(';');
		            for (var i = 0; i < cookies.length; i++) {
		                var cookie = jQuery.trim(cookies[i]);
		                if (cookie.substring(0, name.length + 1) == (name + '=')) {
		                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
		                    break;
		                }
		            }
		        }
		        return cookieValue;
		    }
		},
		getUserUUID:function(){
			var str = YouGou.Biz.cookie('__utmv');
			return str?str.substring(str.indexOf('.')+1):'';
		},
		//好耶代码
		handleAllyes:function(uuid,keywords){
			var idgJsHost = (("https:" == document.location.protocol) ? "https" : "http");
			var idgDomain = idgJsHost == "http" ? "1" : "2";
			//document.write(unescape("%3Cscript src='" + idgJsHost + "://" + idgDomain + ".allyes.com.cn/idigger_yg.js' type='text/javascript'%3E%3C/script%3E"));			
			var urlAllyes=idgJsHost + "://" + idgDomain + '.allyes.com.cn/idigger_yg.js';
			loadjs(urlAllyes,function(){
				try {
					var idgTracker = _alysP.init("mso","T-000436-01", "");
					idgTracker._setTrackPath(idgJsHost + '://idigger.allyes.com/main/adftrack');
					var s={}; 
					s.userid=uuid?uuid:'';
					idgTracker._setECM(s);      
					idgTracker._trackPoint();
				} catch(err) {}				
			});

		}		
	}
})();

//login
function login(){location.href="http://www.yougou.com/signin.jhtml?redirectURL="+encodeURI(location.href);return false;}
//regster [issue #1041] added by tanfeng 2012.02.27
function register(){location.href="http://www.yougou.com/register.jhtml?redirectURL="+encodeURI(location.href);return false;}
//懒加载
(function($) {
	$.fn.lazyload = function(options) {
	var settings = { 
		threshold : 0,
		errorimg:YouGou.UI.uimg.img1
	}; 
	settings = $.extend(settings, options || {}); 
	var defHeight = settings.threshold;
	var defObj = $(this); 
	var pageTop = function() { 
		return document.documentElement.clientHeight + Math.max(document.documentElement.scrollTop, document.body.scrollTop) - settings.threshold; 
	}; 
	var imgLoad = function() { 
		defObj.each(function() { 
			var self=$(this);
			//self.addClass('lazy_loading');
			if(self.offset().top <= pageTop()) { 
				var orgSrc = self.attr("original"); 
				if(orgSrc) { 
					self.attr("src", orgSrc);
				} 
				self.error(function(){
					if(settings.errorimg){
						self.attr("src", settings.errorimg);
					}
				});
				self.removeAttr("original").removeClass('lazy_loading');
			} 
		}); 
	}; 
	imgLoad(); 
	var timer = null; 
	$(window).bind("scroll", function() { 
		if(timer){ 
			clearTimeout(timer) 
		} 
		timer = setTimeout(function(){ 
			imgLoad() 
		}, 30) 
	}); 
}
})(jQuery);

/****************
**ygSwitch
**2012-12-25 xiao.y@yougou.com
功能：旋转木马、tab切换、上下左右滑动
调用：
$("#div").ygSwitch("#div>ul>li",{config});
*****************/
eval(function(E,I,A,D,J,K,L,H){function C(A){return A<62?String.fromCharCode(A+=A<26?65:A<52?71:-4):A<63?'_':A<64?'$':C(A>>6)+C(A&63)}while(A>0)K[C(D--)]=I[--A];function N(A){return K[A]==L[A]?A:K[A]}if(''.replace(/^/,String)){var M=E.match(J),B=M[0],F=E.split(J),G=0;if(E.indexOf(F[0]))F=[''].concat(F);do{H[A++]=F[G++];H[A++]=N(B)}while(B=M[G]);H[A++]=F[G]||'';return H.join('')}return E.replace(J,N)}('p.o(p.BN,{Ba:v(C,M,A,B,N){m-B*((M=M/N-L)*M*M*M-L)+A}});(v(N){N.w=N.w||{};N.w={S:{t:U,BR:"current",BA:K,BX:"Bo",Bb:K.L,Bu:"Bl",j:L,u:L,Bq:K.B0,BN:"Ba",z:i,1:i,Bv:i,_:U,3:U,R:i,x:i,BF:U,Bk:U,6:"next_btn_dis",7:"prev_btn_dis",8:U},Bh:v(N,M){A[N]=M}};P A={"Bl":v(M,N){T.5().hide();T.$(M).show();N.BC()},"fade":v(M,N){T.5().fadeOut();T.$(M).fadeIn();N.BC()},"ajax":v(M,N){T.5().Bx().load(T.BP().BL(M).b("a"),N)}};v M(I,C,H){P G=T,F=N(T),E=K,D=N(H.BF),M=N(H.Bk),B=e.BK(C.n/H.j)-L;N.V(H,v(M,A){O(N.Bi(A))F.X(M,A)});N.o(T,{h:v(J,C){O(!H.z&&J>=G.BB()-L)D.4(H.6);O(!H.z&&J<=K)M.4(H.7);O(H.t!=U){P B=I.BL(J);O(r J=="string"&&J.Bf("#","")){B=I.filter("[a*="+J.Bf("#","")+"]");J=e.max(B.index(),K)}I.BW(H.BR);B.4(H.BR)}C=C||N.Event();C.BO="_";F.t(C,[J]);O(C.Be())m;A[H.Bu].BC(G,J,v(){C.BO="3";F.t(C,[J])});C.BO="onStart";F.t(C,[J]);O(C.Be())m;E=J;O(H.8)N(H.8).BU("BS:Bx").Bw(J+L);m G},BH:v(){m H},BP:v(){m N(I)},5:v(){m C},BB:v(){m e.BK(C.n/H.j)},$:v(N){m G.5().k(N*H.j,(N+L)*H.j)},Bp:v(){m E},x:v(A){O(H.x){P M=T.$(A);M.V(v(A,M){N(T).d("img").V(v(A,M){P B=N(T).b("original"),C=N(T).b("Bd");O(B!=""&&C!=B)N(T).b("Bd",B)})})}},f:v(N){G.x(N);O(C.s().BV(":BM")||C.n<=H.u)m G;O(r N=="BI"){O(N<K)m H.z?G.h(B):G;Y O(N>B)m H.z?G.h(K):G;Y m G.h(N)}Y m G.h()},c:v(){O(D.Bs(H.6))m;O(H.7)M.BW(H.7);m G.f(E+L)},BZ:v(){O(M.Bs(H.7))m;O(H.6)D.BW(H.6);m G.f(E-L)},X:v(N,M){F.X(N,M);m G},Bj:v(N){F.Bj(N);m G},_:v(N){m T.X("_",N)},3:v(N){m T.X("3",N)},BT:v(N){}});N(H.BF).X("h",v(){G.c()});M.X("h",v(){G.BZ()});O(H.BA===K||H.BA>K)G.h(H.BA);C.d("By[a^=#]").h(v(M){G.h(N(T).b("a"),M)});O(H.Bv)C.Q("cursor","pointer").h(v(){G.c();m i});O(I){P J;I.V(v(M){O(H.BX==="Bo")N(T).X({"mouseenter":v(N){O(M!==E){G.x(M);J=9(v(){G.h(M,N)},H.Bb*Z)}},"mouseleave":v(){BQ(J)}});Y N(T).X("h",v(N){O(M!==E)G.h(M,N);m i})})}}N.BG.w=v(C,E){P B=T.BL(r E=="BI"?E:K).Bc("w");O(B)m B;O(N.Bi(E))E={_:E};P A=N.o({},N.w.S),D=T.n;E=N.o(A,E);T.V(v(J){P G=N(T),F=C.jquery?C:G.BU(C);O(!F.n)F=D==L?N(C):G.s().d(C);P I=U;O(E.t!=U)I=G.d(E.t);P H=e.BK(F.n/E.j);O(E.t!=U&&N(T).d(E.t).n<=K){for(P J=L;J<=H;J++)N("<"+E.t+">",{a:"javascript:void(K);",target:"_self",text:J}).appendTo(N(T));I=G.BU(E.t)}O(E.8!=U){P A=N(E.8);A.Bw("\\u7b2c<BS>L</BS>\\Bm\\uff0c\\u5171 "+H+" \\Bm")}B=new M(I,F,E);G.Bc("w",B)});m E.R?B:T}})(p);N.w.Bh("scroll",v(I,A){P D=T,G=D.BH(),F=D.$(I),N=D.5().s(),C=D.Bp(),E=D.BB()-L,M=(C===K&&I===E)||(C===E&&I===K),H=(C===K&&I===E)?W:i,B=G.1?{BD:-F.0().BD}:{g:-F.0().g};O(N.BV(":BM"))N.Bn(W);N.animate(B,G.Bq*Z,G.BN,v(){A.BC();O(M)D.BT(H)})});(v(N){N.BG.carousel=v(){T.V(v(){P F=N(T).w(),G=F.BH(),D=F.5(),A=D.s(),B=F.BB()-L,H=D.k(K,G.j),J=D.k(B*G.j),M=G.1?J.0().BD:J.0().g,E=G.1?"BD":"g",C=D.n>G.u,I=K;D.Q("0","relative").V(v(){I+=G.1?N(T).outerHeight(W):N(T).outerWidth(W)});O(C&&J.n<G.u)A.append(D.k(K,G.u).BY().4("BY"));N.o(F,{f:v(N){F.x(N);O(A.BV(":BM")||!C)m T;O(N<K){T.BJ(W);m T.h(B)}Y O(N>B){T.BJ(i);m T.h(K)}Y m T.h(N)},BJ:v(A){P M=A?J:H;N.V(M,v(){N(T).Q(E,A?-I:I+"Bt")})},BT:v(C){P B=C?J:H;N.V(B,v(){N(T).Q(E,"0px")});A.Q(E,C?-M:K+"Bt")}})});m T}})(p);(v(M){P N=M.w;N.q=N.q||{};N.q.2={S:{2:W,y:Bz,Bg:W,R:i}};M.BG.2=v(C){O(r C=="BI")C={y:C};P B=M.o({},N.q.2.S),A;M.o(B,C);T.V(v(){P D=M(T).w();O(D)A=D;P C,E,N=W;D.BE=v(){O(C)m;N=i;C=setInterval(v(){D.c()},B.y*Z);D.c()};D.l=v(){C=clearInterval(C)};D.Bn=v(){D.l();N=W};O(B.Bg){D.5().Br(v(){D.l();BQ(E)},v(){O(!N)E=9(D.BE,B.y*Z)});D.BP().Br(v(){D.l();BQ(E)},v(){O(!N)E=9(D.BE,B.y*Z)})}O(B.2)9(D.BE,B.y*Z)});m B.R?A:T}})(p)','0|1|_|$|if|var|css|api|cfg|this|null|each|true|bind|else|1000|href|attr|next|find|Math|move|left|click|false|steps|slice|pause|return|length|extend|jQuery|plugin|typeof|parent|trigger|visible|function|ygSwitch|lazyload|interval|circular|position|vertical|autoplay|onSwitch|addClass|getPanels|nextBtnDis|prevBtnDis|pagenation|setTimeout|beforeSwitch|getVisiblePanel|initIndex|getLength|call|top|play|nextBtn|fn|getCfg|number|adjustPosition|ceil|eq|animated|easing|type|getTriggers|clearTimeout|currCls|span|resetPosition|children|is|removeClass|triggerType|clone|prev|easeOutQuart|delay|data|src|isDefaultPrevented|replace|autopause|addEffect|isFunction|unbind|prevBtn|default|u9875|stop|mouse|getIndex|speed|hover|hasClass|px|effect|panelSwitch|html|first|a|3|6'.split('|'),107,116,/[\w\$]+/g,{},{},[]));
/********************
*autocomplete
*********************/
eval(function(E,I,A,D,J,K,L,H){function C(A){return A<62?String.fromCharCode(A+=A<26?65:A<52?71:-4):A<63?'_':A<64?'$':C(A>>6)+C(A&63)}while(A>0)K[C(D--)]=I[--A];function N(A){return K[A]==L[A]?A:K[A]}if(''.replace(/^/,String)){var M=E.match(J),B=M[0],F=E.split(J),G=0;if(E.indexOf(F[0]))F=[''].concat(F);do{H[A++]=F[G++];H[A++]=N(B)}while(B=M[G]);H[A++]=F[G]||'';return H.join('')}return E.replace(J,N)}('(3(Y){Y.BY.BU({8:3(X,B){a A=z X=="BJ";B=Y.BU({},Y._.BW,{d:A?X:n,i:A?n:X,BQ:A?Y._.BW.BQ:Bf,c:B&&!B.BS?Bf:150},B);B.BN=B.BN||3(Y){v Y};B.BO=B.BO||B.BZ;v h.k(3(){Bg Y._(h,B)})},y:3(Y){v h.m("y",Y)},0:3(Y){v h.2("0",[Y])},Ba:3(){v h.2("Ba")},Bo:3(Y){v h.2("Bo",[Y])},Bl:3(){v h.2("Bl")}});Y._=3(H,T){a E={Bx:38,Ca:40,Cb:46,Cn:Cx,Bz:13,Cc:27,Cf:188,CU:33,B0:34,CT:W},R=Y(H).attr("8","off").4(T.Cd),S,Q="",B=Y._.Ce(T),F=U,BH,M={BR:q},C=Y._.Cg(T,H,X,M),L;Y.Bm.CX&&Y(H.CS).m("submit.8",3(){Z(L){L=q;v q}});R.m((Y.Bm.CX?"keypress":"keydown")+".8",3(A){F=V;BH=A.CJ;switch(A.CJ){l E.Bx:A.BD();Z(C.1())C.By();g K(U,j);t;l E.Ca:A.BD();Z(C.1())C.B3();g K(U,j);t;l E.CU:A.BD();Z(C.1())C.CR();g K(U,j);t;l E.B0:A.BD();Z(C.1())C.CV();g K(U,j);t;l T.5&&Y.BB(T.$)==","&&E.Cf:l E.Cn:l E.Bz:Z(X()){A.BD();L=j;v q}t;l E.Cc:C.o();t;default:Bi(S);S=Bh(K,T.BQ);t}}).CQ(3(){F++}).blur(3(){F=U;Z(!M.BR)O()}).CW(3(){Z(F++>V&&!C.1())K(U,j)}).m("0",3(){a X=(BI.w>V)?BI[V]:n;3 A(A,B){a Y;Z(B&&B.w)f(a C=U;C<B.w;C++)Z(B[C].y.7()==A.7()){Y=B[C];t}Z(z X=="3")X(Y);g R.2("y",Y&&[Y.i,Y.s])}Y.k(G(R.b()),3(X,Y){J(Y,A,A)})}).m("Ba",3(){B.CN()}).m("Bo",3(){Y.BU(T,BI[V]);Z("i"Cp BI[V])B.CB()}).m("Bl",3(){C.BT();R.BT();Y(H.CS).BT(".8")}).m("input",3(){K(U,j)});3 X(){a B=C.Co();Z(!B)v q;a A=B.y;Q=A;Z(T.5){a E=G(R.b());Z(E.w>V){a D=T.$.w,F=Y(H).6().BP,I,X=U;Y.k(E,3(A,Y){X+=Y.w;Z(F<=X){I=A;v q}X+=D});E[I]=A;A=E.B7(T.$)}A+=T.$}R.b(A);N();R.2("y",[B.i,B.s]);v j}3 K(Y,X){Z(BH==E.Cb){C.o();v}a A=R.b();Z(!X&&A==Q)v;Q=A;A=D(A);Z(A.w>=T.Bn){R.4(T.BX);Z(!T.BK)A=A.7();J(A,B4,N)}g{I();C.o()}}3 G(X){Z(!X)v[""];Z(!T.5)v[Y.BB(X)];v Y.map(X.Bb(T.$),3(A){v Y.BB(X).w?Y.BB(A):n})}3 D(B){Z(!T.5)v B;a X=G(B);Z(X.w==V)v X[U];a A=Y(H).6().BP;Z(A==B.w)X=G(B);g X=G(B.Be(B.Bv(A),""));v X[X.w-V]}3 A(X,A){Z(T.CD&&(D(R.b()).7()==X.7())&&BH!=E.CT){R.b(R.b()+A.Bv(D(Q).w));Y(H).6(Q.w,Q.w+A.w)}}3 O(){Bi(S);S=Bh(N,Bw)}3 N(){a Y=C.1();C.o();Bi(S);I();Z(T.CA)R.0(3(Y){Z(!Y)Z(T.5){a X=G(R.b()).u(U,-V);R.b(X.B7(T.$)+(X.w?T.$:""))}g{R.b("");R.2("y",n)}})}3 B4(Y,X){Z(X&&X.w&&F){I();C.CF(X,Y);A(Y,X[U].s);C.Bp()}g N()}3 J(A,F,X){Z(!T.BK)A=A.7();a E=B.B2(A);Z(E&&E.w)F(A,E);g Z((z T.d=="BJ")&&(T.d.w>U)){a G={timestamp:+Bg Date()};Y.k(T.B6,3(X,Y){G[X]=z Y=="3"?Y():Y});Y.ajax({mode:"abort",port:"8"+H.name,Cr:T.Cr,d:T.d,i:Y.BU({Cv:D(A),limit:T.c},G),success:3(X){a Y=T.B5&&T.B5(X)||P(X);B.Cm(A,Y);F(A,Y)}})}g{C.Cq();X(A)}}3 P(A){a X=[],D=A.Bb("\\Cu");f(a C=U;C<D.w;C++){a B=Y.BB(D[C]);Z(B){B=B.Bb("|");X[X.w]={i:B,s:B[U],y:T.BV&&T.BV(B,B[U])||B[U]}}}v X}3 I(){R.BC(T.BX)}};Y._.BW={Cd:"ac_input",Ch:"ac_results",BX:"ac_loading",Bn:V,BQ:Bw,BK:q,Cl:j,BF:q,BA:Bf,c:100,CA:q,B6:{},Bj:j,BZ:3(Y){v Y[U]},BO:n,CD:q,r:U,5:q,$:", ",BN:3(X,Y){v X.Be(Bg RegExp("(?![^&;]+;)(?!<[^<>]*)("+Y.Be(/([\\^\\Y\\(\\)\\[\\]\\{\\}\\*\\.\\+\\?\\|\\\\])/B1,"\\\\CI")+")(?![^<>]*>)(?![^&;]+;)","B1"),"<Ci>CI</Ci>")},BS:j,BL:180};Y._.Ce=3(F){a C={},B=U;3 D(X,Y){Z(!F.BK)X=X.7();a A=X.CO(Y);Z(F.BF=="word")A=X.7().0("\\\\Ct"+Y.7());Z(A==-V)v q;v A==U||F.BF}3 E(Y,A){Z(B>F.BA)X();Z(!C[Y])B++;C[Y]=A}3 A(){Z(!F.i)v q;a D={},H=U;Z(!F.d)F.BA=V;D[""]=[];f(a I=U,C=F.i.w;I<C;I++){a B=F.i[I];B=(z B=="BJ")?[B]:B;a A=F.BO(B,I+V,F.i.w);Z(A===q)Bu;a X=A.charAt(U).7();Z(!D[X])D[X]=[];a G={s:A,i:B,y:F.BV&&F.BV(B)||A};D[X].Bs(G);Z(H++<F.c)D[""].Bs(G)}Y.k(D,3(X,Y){F.BA++;E(X,Y)})}Bh(A,25);3 X(){C={};B=U}v{CN:X,Cm:E,CB:A,B2:3(A){Z(!F.BA||!B)v n;Z(!F.d&&F.BF){a G=[];f(a E Cp C)Z(E.w>U){a X=C[E];Y.k(X,3(X,Y){Z(D(Y.s,A))G.Bs(Y)})}v G}g Z(C[A])v C[A];g Z(F.Cl)f(a H=A.w-V;H>=F.Bn;H--){X=C[A.substr(U,H)];Z(X){G=[];Y.k(X,3(X,Y){Z(D(Y.s,A))G[G.w]=Y});v G}}v n}}};Y._.Cg=3(Q,J,B,O){a M={x:"ac_over"},A,P=-V,D,L="",H=j,X,G;3 E(){Z(!H)v;X=Y("<div/>").o().4(Q.Ch).e("position","absolute").Bt(Bc.B9);G=Y("<ul/>").Bt(X).mouseover(3(X){Z(N(X).B_&&N(X).B_.toUpperCase()=="Cs"){P=Y("Br",G).BC(M.x).index(N(X));Y(N(X)).4(M.x)}}).CW(3(X){Y(N(X)).4(M.x);B();Z(Y(".CZ").w>U)Y(".CZ").parent().4("ph-wrap-has");J.CQ();v q}).mousedown(3(){O.BR=j}).mouseup(3(){O.BR=q});Z(Q.r>U)X.e("r",Q.r);H=q}3 N(X){a Y=X.target;while(Y&&Y.tagName!="Cs")Y=Y.parentNode;Z(!Y)v[];v Y}3 I(B){A.u(P,P+V).BC(M.x);F(B);a Y=A.u(P,P+V).4(M.x);Z(Q.BS){a X=U;A.u(U,P).k(3(){X+=h.9});Z((X+Y[U].9-G.BE())>G[U].clientHeight)G.BE(X+Y[U].9-G.innerHeight());g Z(X<G.BE())G.BE(X)}}3 F(Y){P+=Y;Z(P<U)P=A.p()-V;g Z(P>=A.p())P=U}3 K(Y){v Q.c&&Q.c<Y?Q.c:Y}3 C(){G.CP();a C=K(D.w);f(a E=U;E<C;E++){Z(!D[E])Bu;a B=Q.BZ(D[E].i,E+V,C,D[E].s,L);Z(B===q)Bu;a X=Y("<Br/>").html(Q.BN(B,L)).4(E%Cw==U?"ac_even":"ac_odd").Bt(G)[U];Y.i(X,"CG",D[E])}A=G.find("Br");Z(Q.Bj){A.u(U,V).4(M.x);P=U}Z(Y.BY.CM)G.CM()}v{CF:3(Y,X){E();D=Y;L=X;C()},B3:3(){I(V)},By:3(){I(-V)},CR:3(){Z(P!=U&&P-W<U)I(-P);g I(-W)},CV:3(){Z(P!=A.p()-V&&P+W>A.p())I(A.p()-V-P);g I(W)},o:3(){X&&X.o();A&&A.BC(M.x);P=-V},1:3(){v X&&X.is(":1")},current:3(){v h.1()&&(A.Ck("."+M.x)[U]||Q.Bj&&A[U])},Bp:3(){a D=Y(J).offset();X.e({r:z Q.r=="BJ"||Q.r>U?Q.r:Y(J).r(),CK:D.CK+J.9,Bd:D.Bd}).Bp();Z(Q.BS){G.BE(U);G.e({Cj:Q.BL,overflow:"auto"});Z(Y.Bm.msie&&z Bc.B9.style.Cj==="BM"){a B=U;A.k(3(){B+=h.9});a C=B>Q.BL;G.e("height",C?Q.BL:B);Z(!C)A.r(G.r()-CH(A.e("B$-Bd"))-CH(A.e("B$-right")))}}},Co:3(){a X=A&&A.Ck("."+M.x).BC(M.x);v X&&X.w&&Y.i(X[U],"CG")},Cq:3(){G&&G.CP()},BT:3(){X&&X.remove()}}};Y.BY.6=3(C,F){Z(C!==BM)v h.k(3(){Z(h.Bq){a Y=h.Bq();Z(F===BM||C==F){Y.move("Bk",C);Y.CE()}g{Y.collapse(j);Y.moveStart("Bk",C);Y.moveEnd("Bk",F);Y.CE()}}g Z(h.B8)h.B8(C,F);g Z(h.BG){h.BG=C;h.CL=F}});a X=h[U];Z(X.Bq){a B=Bc.6.createRange(),E=X.s,D="<->",A=B.CC.w;B.CC=D;a Y=X.s.CO(D);X.s=E;h.6(Y,Y+A);v{BP:Y,CY:Y+A}}g Z(X.BG!==BM)v{BP:X.BG,CY:X.CL}}})(jQuery)','V|0|1|8|_|$|if|var|val|max|url|css|for|else|this|data|true|each|case|bind|null|hide|size|false|width|value|break|slice|return|length|ACTIVE|result|typeof|search|visible|trigger|function|addClass|multiple|selection|toLowerCase|autocomplete|offsetHeight|Autocompleter|multipleSeparator|cacheLength|trim|removeClass|preventDefault|scrollTop|matchContains|selectionStart|T|arguments|string|matchCase|scrollHeight|undefined|highlight|formatMatch|start|delay|mouseDownOnSelect|scroll|unbind|extend|formatResult|defaults|loadingClass|fn|formatItem|flushCache|split|document|left|replace|10|new|setTimeout|clearTimeout|selectFirst|character|unautocomplete|browser|minChars|setOptions|show|createTextRange|li|push|appendTo|continue|substring|200|UP|prev|RETURN|PAGEDOWN|gi|load|next|U|parse|extraParams|join|setSelectionRange|body|nodeName|padding|mustMatch|populate|text|autoFill|select|display|ac_data|parseInt|$1|keyCode|top|selectionEnd|bgiframe|flush|indexOf|empty|focus|pageUp|form|BACKSPACE|PAGEUP|pageDown|click|opera|end|placeholder|DOWN|DEL|ESC|inputClass|Cache|COMMA|Select|resultsClass|strong|maxHeight|filter|matchSubset|add|TAB|selected|in|emptyList|dataType|LI|b|n|q|2|9'.split('|'),159,177,/[\w\$]+/g,{},{},[]));
/*加载js*/
function loadjs(url,succ,v){var elem=delay_js(url);if((navigator.userAgent.indexOf('MSIE')==-1)?false:true){elem.onreadystatechange=function(){if(this.readyState&&this.readyState=="loading")return;else succ(v);};}
else elem.onload=function(){succ(v);};elem.onerror=function(){document.body.removeChild(elem);};}
function delay_js(url){var type=url.split("."),file=type[type.length-1];if(file=="css"){var
obj=document.createElement("link"),lnk="href",tp="text/css";obj.setAttribute("rel","stylesheet");}else var obj=document.createElement("script"),lnk="src",tp="text/javascript";obj.setAttribute(lnk,url);obj.setAttribute("type",tp);file=="css"?document.getElementsByTagName("head")[0].appendChild(obj):document.body.appendChild(obj);return obj;};function addload(func){var old=window.onload;if(typeof window.onload!="function")
{window.onload=func;}else{window.onload=function(){old();func();}}};

//删除网盟ga cookie
YouGou.Biz.cookie('__ygsource',null,{expires:-1});
YouGou.Biz.cookie('__ygrd',null,{expires:-1});
YouGou.Biz.cookie('__ygmedium',null,{expires:-1});
YouGou.Biz.cookie('admanageType',null,{expires:-1});
YouGou.Biz.cookie('cps',null,{expires:-1});
//首页导航

function leftScroll()
{/*
	try{
		var isIE6 = $.browser.msie && $.browser.version == "6.0";
		var $headerH=$('#yg_header').height();
		var $ygcate=$('#yg_category');
		var tBottom=$('#ygGuid').offset().top-30;
		$(window).scroll(function(){
			var scrollHeight=$(window).scrollTop();
			//height会变化
			if(scrollHeight>$headerH){
				tBottom=$('#ygGuid').offset().top-30;
				$ygcate.addClass('js_yg_category');
					if(scrollHeight>tBottom-$ygcate.height()){
						$ygcate.addClass('js_yg_category_btm').css("top",tBottom-$ygcate.height()-$headerH);
					}else{
						$ygcate.removeClass('js_yg_category_btm').css("top",0);
						if(isIE6){
							$ygcate.css("top",scrollHeight-$headerH);
						}						
					}
			}else{
				$ygcate.css("top",0);
				$ygcate.removeClass('js_yg_category');			
			}
		});
	}catch(e){}*/
}


// init functions
$(function (){
	//resize
	$(window).resize(resetLayout);
	//resetlayout
	function resetLayout(){
		if($(window).width()<1200){
			$('.j_resizemd').hide();
			$('.ygwrap').addClass('ygwrap990');
			$('body').addClass('ygsmallwrap').removeClass('selfadaptat');
		}else{
			$('.j_resizemd').show();
			$('.ygwrap990').removeClass('ygwrap990');
			$('body').removeClass('ygsmallwrap').addClass('selfadaptat');
		}		
	}
	resetLayout();
	try{
		YouGou.Biz.ShoppingCart.initCart();
	}catch(e){}
	//redmine9789,10443(增加cookie)			
	//首页顶部下拉大广告
	(function(){
		function showImg()
		{
			$('#smallBannerShow').css('display','none');
			var h=400;
			$("#bigBannerShow").animate({'height':h},600,function(){
				window.setTimeout(function(){
					$("#bigBannerShow").animate(
						{'height':0},600,
						function(){
							$('#smallBannerShow').css('display','block');
							leftScroll();
						}
					)
				},2000);
			});
		}
		if($("#bigBannerShow").length>0){
			var bigShow_cookie=YouGou.Biz.cookie('bigShowState');
			var cur_id=$("#bigBannerShow a").attr('id');
			//console.log(bigShow_cookie);
			if(bigShow_cookie!=null)
			{
				
				if(cur_id==bigShow_cookie)
				{
					leftScroll();
					return;
				}else
				{//redmine #10631时尚商城首页下拉广告调整(调整为6小时)
					YouGou.Biz.cookie('bigShowState', cur_id, {expires: 0.25, path: '/',domain:'.yougou.com',secure: false});
					//展示图片
					showImg();
				}
			}else
			{//redmine #10631时尚商城首页下拉广告调整(调整为6小时)
				YouGou.Biz.cookie('bigShowState', cur_id, {expires: 0.25, path: '/',domain:'.yougou.com',secure: false});
				//展示图片
				showImg();
			}
			//临时测试
			//var cur_cookie=YouGou.Biz.cookie('bigShowState');
			//console.log(cur_cookie);
		}else{
			leftScroll();
		}
	})();
	
	
	
	/*网站公告相关js 20130315*/	
	$('.site_bar_notice').hover(function(){
		$('.site_bar').addClass('site_bar_hover');
	});
	$('.site_bar').mouseleave(function(){
		$('.site_bar').removeClass('site_bar_hover');
	});
		
	/*首页轮播特效js 20130315*/

    $('#indexFocusPic .trgBox').ygSwitch('#indexFocusPic .imgBox',{
        trigger:'span',
        currCls:'hover',
        circular:true,
        lazyload:true
    }).autoplay(5);
	/*seoul首页轮播特效js 20150617*/
		$("#uc_guessLike_box2").ygSwitch('#uc_guessLike_box2>ul>li',{
		    nextBtn:'#nextBtn2',
		    prevBtn:'#prevBtn2',
		    steps:1,
		    visible:1,
		    lazyload:true,
		    effect: "scroll",
		    circular:true
		}).carousel();
		$("#uc_guessLike_box").ygSwitch('#uc_guessLike_box>ul>li',{
		    nextBtn:'#nextBtn',
		    prevBtn:'#prevBtn',
		    steps:1,
		    visible:1,
		    lazyload:true,
		    effect: "scroll",
		    circular:true
		}).carousel();
		$("#uc_guessLike_box1").ygSwitch('#uc_guessLike_box1>ul>li',{
		    nextBtn:'#nextBtn1',
		    prevBtn:'#prevBtn1',
		    steps:1,
		    visible:1,
		    lazyload:true,
		    effect: "scroll",
		    circular:true
		}).carousel();
/*seoul首页导航js 20150617*/
        var seo_li = $(".seoul_nav_list>li");
        seo_li.hover(function(){
            $(this).children("a").css("display","block");
            $(this).children("span").hide();
            $(this).children(".seoul_child").show();
        });
        seo_li.mouseleave(function(){
            $(this).children("a").hide();
            $(this).children("span").show();
            seo_li.find(".seoul_child").hide();
            $(".block").show();
        });
        $(".mx-price a").hover(function(){
            $(this).next("div.fuceng").show();
        });

        $(".mx-price a").mouseout(function(){
            $(this).next("div.fuceng").hide();
        });
	//ajax登录
    var requestHost = 'https:' == document.location.protocol ? 'https://passport.yougou.com' : 'http://www.yougou.com';
	$.ajax({
		type: "get",
		url: requestHost + "/api/getIsLoginAndShoppingcartJsonp.jhtml?callback=?",
		dataType:"jsonp",
		success: function(data){
			if(!data)return;
			$("#pordcount").html(data.cartcount);
			//登陆状态ntkf统计代码
			var dNtfj = $('#ntkfjs'),isCms=dNtfj[0]?true:false;
			if(isCms){
				NTKF_PARAM = {
				  siteid:"kf_9923",
				  settingid: "kf_9923_1356320277571",
				  uid:'', 
				  uname:'',
				  itemid:'',
				  orderid: "",
				  orderprice: ""
				} 
			}		
			if(data.islogin != "false" && data.islogin != false){
				// 兼容处理
				var userName = data.userName,len=userName.length;
				if(len>=16){
					userName=userName.substring(0,len-3)+'...';
				}
				$("#top_nav .about_user").html('您好！<span id="user_id">'+userName +'</span><a class="quit" href="/logout.jhtml">退出</a>');
				//tkf统计start
				if(isCms&&NTKF_PARAM){
					NTKF_PARAM.uid=data.userName;
					NTKF_PARAM.uname=data.userName;
				}
				//ntkf统计end	

				//砸蛋广告start
				/*var adEgg = YouGou.Biz.cookie('adEgg');
				if(adEgg){
					var arrAdEgg = adEgg.replace(/\"/g,'').split(',');
					var showEggPop = function(){
						var dg=ygDialog({
							title : '温馨提示',
							lock: false,
							width: 500,
							height: 260,
							content:'<a id="goeggTopic" href="'+arrAdEgg[0]+'" target="_blank"><img src="'+arrAdEgg[1]+'" width="500" height="260"/></a>'
						});
						$('#goeggTopic').click(ygDialog.close);
					}
					if(!isYgDailogExist){
						var strHref = document.getElementsByTagName('link')[0].getAttribute('href');
						var cssVersion = strHref.slice(strHref.indexOf('?'));
						var strYgDialogUrl = YouGou.UI.baseUrl+'/template/common/js/ygdialog.js'+cssVersion;
						loadjs(strYgDialogUrl,showEggPop);
					}else{
						showEggPop();		
					}
				}
				YouGou.Biz.cookie('adEgg', null, {expires: -1, path: '/',domain:'.yougou.com',secure: false});
				*/
				//砸蛋广告end

				
				// 初始化站内信
				try{
					var isQQUser = data.userSource;
					if(isQQUser == 1) {
						var cbHeadMsgObj = $("#cb_headshow");
						var cbHeadInfoObj = $("#cb_head_info");
						var cbShowmsgObj = $("#cb_showmsg");
						var jifenUrlObj = $("#jifen_url");
						if(cbHeadMsgObj != undefined) {
							cbHeadMsgObj.html(data.headShow);
						}
						if(cbHeadInfoObj != undefined) {
							cbHeadInfoObj.show();
						}
						if(cbShowmsgObj != undefined) {
							cbShowmsgObj.html(data.userName);
						}
						if(jifenUrlObj != undefined) {
							jifenUrlObj.attr("href", data.jifenUrl);
						}
					}
					
					YouGou.Biz.WebsiteMessage.init();
				}catch(e){}
				
				//处理登陆时好耶
				YouGou.Biz.handleAllyes(YouGou.Biz.getUserUUID());
			}else{
				//处理未登陆时好耶
				YouGou.Biz.handleAllyes('');	
			}
			
			if(isCms){
				var src = dNtfj.attr('src1');
				dNtfj.attr('src',src);
			}
		}
	});

	/****图片延时加载***/
	$("#indexFocusPic .imgBox:first img,#brand-list img:lt(48),.footser img,.n_footinfo img,.imglst img,.lazy_loading").lazyload({
	 //placeholder:YouGou.UI.uimg.img1
	}); 
	//优购导购品牌
	$("#ygGuid .item_bom").ygSwitch('#brand-list>a',{
		nextBtn:'#brand-right',
		prevBtn:'#brand-left',
		steps:48,
		lazyload:true
	});
	//热销排行
	var tabtime = 3;
	var tabSwitchOption = {
		currCls: 'on',
		circular:true,
		trigger:'li'
	};	
	$(".ind_md4 .tab").ygSwitch(".ind_md4 .imglst",tabSwitchOption).autoplay(tabtime);

	/*修改公共搜索条，将原来嵌在结构中的 js 代码分离出来 */
	$("#yg_logo_tab form.search_box .search_btn").bind("click",function(e){
		e.stopPropagation();
		var keyword=$("#keyword").val();
		if(!keyword==''){
			$(this).parents("form").submit();
		}
	});
	//redmine9854
	var domTopNav=$('#top_nav');
	//我的优购 公告 更多 手机
	$('.my_yg,.notice,.more,.phone',domTopNav).bind('mouseenter',function(e){
		e.stopPropagation();
		$(this).parent().find('.hover').removeClass('hover');
		$(this).addClass('hover');
	}).bind('mouseleave',function(e){
		e.stopPropagation();
		$(this).removeClass('hover');
	});
	//redmine#11159	
	try {
		YouGou.Util.setHrefStamp('.my_yg');
		YouGou.Util.setHrefStamp('.my_order'); 
	}catch (e) {}

	//可视化浮动布局JS开始
	var ele=$(".floatlayout"),w_flt;
	//设置位置（浏览器大于页面+浮窗宽度，则显示紧贴视窗右侧，否则紧贴1190页面右侧）
	function setElepos(){
		var _windowW=$(window).width();
		if(_windowW>1190+w_flt){
			var left=(_windowW-1190)/2+1190;
			ele.css("left",left+'px');
		}else{
			ele.css({"left":'auto',"right":0});
		}
	}

	if(ele.length>0){
		w_flt=ele.width()*2;
		var w_screen=window.screen.width;
		if(w_screen<1190+w_flt){
			ele.css({"left":'auto',"right":0});
		}else{
			ele.css("right",'auto');
			window.onresize= setElepos;
			setElepos();
		}

		var isIE6 = $.browser.msie && $.browser.version == "6.0"
		if(isIE6){

			ele.css('position','absolute');
			var _windowH = $(window).height(),_docH = $(document).height();

			$(window).scroll(function(){
				var scrollTop = $(document).scrollTop();
				var top;
				if(scrollTop<_docH-_windowH-10){
					top = scrollTop+_windowH-300;
					ele.css('top',top);
				}

			});
		}
	}
	//浮动布局JS end
	//热门品牌
	//焦点图
	//theme:number/title/thumb
    ;(function($){
        //焦点图
        //theme:number/title/thumb
        $.fn.VSfocus = function (opts) {
            var ofuntion={
                clear:function(o){
                    o.removeClass('vsfocus vsfocusnumber vsfocustitle vsfocusthumb').find('.vsfocus_preNext').remove();
                    o.find('.vsfocus_btn').remove();
                    o.find('ul').css({'left':0,'width':'auto'});
                },
                reload:function(o){
                    var opt = o.data('opt');
                    o.VSfocus('clear').VSfocus(opt);
                }
            }
            if(typeof(opts)=='string'){
                return this.each(function(){
                    ofuntion[opts]($(this));
                });

            }else{
                var opt = $.extend({
                    speed: 5000,
                    direction: 'top',
                    eventType: 'click',
                    theme: 'number',
                    isPre: false,
                    isOpacity: false,
                    isTotal: false,		//显示总数，如1/10页
                    isAutoPlay: true,
                    showBtn: 'always',
                    isClone:false,
                    iPageItems:1,	//一页个数，默认为1，适用于焦点图
                    isLoop:true
                }, opts || {});
                return this.each(function () {
                    var o = $(this);
                    o.data('opt',opt);
                    var sWidth = $('div',o).length>0?$('div',o).width():o.width(),sHeight=o.height(); //获取焦点图的宽度（显示面积）
                    var len = $("ul li", o).length; //获取焦点图个数
                    var iPageItems=opt.iPageItems;
                    //alert(len)
                    if (len < iPageItems+1) { return; }
                    var maxpage=Math.ceil(len/iPageItems);
                    var lis = $("img", o);
                    var index = 0;
                    var picTimer;
                    if(opt.isClone){o.data('dom',o.html())}
                    o.addClass('vsfocus');
                    if(iPageItems==1){
                        o.find('li').css({'width':sWidth,'height':sHeight});
                    }else{
                        sWidth=$('li',o)[0].offsetWidth;
                    }
                    //添加数字按钮和按钮后的半透明条，还有上一页、下一页两个按钮
                    var btn = '';
                    if (opt.theme != 'none') {
                        o.addClass('vsfocus'+opt.theme)
                        btn = "<ol class='vsfocus_btn'>";
                        for (var i = 0; i < len; i++) {
                            switch (opt.theme) {
                                case 'title':
                                    btn += '<li>' + lis.eq(i).attr('alt') + '</li>';
                                    break;
                                case 'thumb':
                                    btn += '<li><img src="' + lis.eq(i).attr('src') + '"/></li>';
                                    break;
                                case 'number':
                                    btn += '<li>' + (i + 1) + '</li>';
                                    break;
                            }
                        }
                        btn += "</ol>";
                    }
                    if (opt.isPre) {
                        btn += '<div class="vsfocus_preNext vsfocus_pre" index="0">‹</div><div class="vsfocus_preNext vsfocus_next" index="0">›</div>';
                    }
                    if (opt.isTotal) {
                        btn += '<div class="total">/' + len + '</div>';
                    }
                    o.append(btn);
                    if(!opt.isLoop){
                        $(".vsfocus_pre", o).addClass('vsfocus_disabled');
                    }
                    if (opt.showBtn == 'hover') {
                        var btns = $('.slide-img').siblings().hide();
                        o.hover(function () {
                            btns.show('fast');
                        }, function () { btns.hide('fast'); })
                    }
                    //为小按钮添加鼠标滑入事件，以显示相应的内容
                    $(".vsfocus_btn li", o).mouseenter(function () {
                        index = $(".vsfocus_btn li", o).index(this);
                        showPics(index);
                    }).eq(0).trigger("mouseenter");

                    //上一页、下一页按钮透明度处理
                    if (opt.opacity) {
                        $(".vsfocus_preNext", o).css("opacity", opt.opacity).hover(function () {
                            $(this).stop(true, false).animate({ "opacity": "0.5" }, 300);
                        }, function () {
                            $(this).stop(true, false).animate({ "opacity": "0.2" }, 300);
                        });
                    }
                    //上一页按钮
                    $(".vsfocus_pre", o).click(function () {
                        if($(this).hasClass('vsfocus_disabled')){return}
                        $(".vsfocus_next", o).removeClass('vsfocus_disabled');
                        index -= 1;
                        if (index<0) {
                            if(opt.isLoop){
                                index = maxpage - 1;
                            }else{return;}
                        }
                        showPics(index);
                        if(index==0&&!opt.isLoop){
                            $(this).addClass('vsfocus_disabled');
                        }
                        $(".vsfocus_preNext", o).attr('index',index);
                    });

                    //下一页按钮
                    $(".vsfocus_next", o).click(function () {
                        if($(this).hasClass('vsfocus_disabled')){return}
                        $(".vsfocus_pre", o).removeClass('vsfocus_disabled');
                        index += 1;
                        if (index == maxpage) {
                            if(opt.isLoop){
                                index = 0;
                            }else{
                                $(this).addClass('vsfocus_disabled')
                                return;
                            }
                        }
                        showPics(index);
                        if(index==maxpage-1&&!opt.isLoop){
                            $(this).addClass('vsfocus_disabled');
                        }
                        $(".vsfocus_preNext", o).attr('index',index);
                    });

                    //本例为左右滚动，即所有li元素都是在同一排向左浮动，所以这里需要计算出外围ul元素的宽度
                    $("ul", o).css("width", sWidth *len);

                    //鼠标滑上焦点图时停止自动播放，滑出时开始自动播放
                    if (opt.isAutoPlay) {
                        o.hover(function () {
                            clearInterval(picTimer);
                        }, function () {
                            picTimer = setInterval(function () {
                                showPics(index);
                                index++;
                                if (index == len) { index = 0; }
                            }, opt.speed);
                        }).trigger("mouseleave");
                    }
                    //显示图片函数，根据接收的index值显示相应的内容
                    function showPics(index) { //普通切换
                        index=Math.floor(index);
                        var nowLeft = -index*opt.iPageItems * sWidth; //根据index值计算ul元素的left值
                        $("ul", o).stop(true, false).animate({ "left": nowLeft }, 300); //通过animate()调整ul元素滚动到计算出的position
                        $(".vsfocus_btn li", o).stop(true, false).removeClass('vsfocus_btn_on').eq(index).addClass('vsfocus_btn_on')
                    }

                })
            }
        }

    })(jQuery);
	//热门品牌品牌墙
	$('.brand_wall').VSfocus({isPre:true,theme:'none',isAutoPlay:false});

    //特卖专区
    var indsale=$('.indxsale');
    if(indsale.length>0){
        $('.tab',indsale).ygSwitch(".indxsale .tabbd",tabSwitchOption);
    }
});

//首页导航效果 临时增加 先这么用//临时增加 先这么用//临时增加 先这么用

$(function(){

    $(".indexnav2list>li").live("mouseover",function(){
        $(".indexnav2list>li").removeClass("currr").removeClass("checkedli");
        $(this).addClass("currr");
        $(".indexnav2list>li").find(".popmenu2").hide();
        $(this).find(".popmenu2").show();
        //stopmenuintval();
        getcurrpic.call(this);
    });
    $(".indexnav2list>li").live("mouseleave",function(){
        $(".indexnav2list>li").find(".popmenu2").hide();

        $(".indexnav2list>li").removeClass("currr").removeClass("checkedli");
        $(this).addClass("checkedli");

        //startmenuintval();
    });
    //startmenuintval();

    $(".jingcpop>ul>li").live("mouseover",function(){
        $(this).find("a").stop().animate({
            'margin-left':"10px"
        },30);
    }).live("mouseout",function(){
        $(".jingcpop>ul>li").find("a").stop().animate({
            'margin-left':"0px"
        },20);
    });
    $(".popmenu2 .categorytit").live("mouseover",function(){
        $(this).find("a").stop().animate({
            'margin-left':"10px"
        },30);
    }).live("mouseout",function(){
        $(".popmenu2 .categorytit").find("a").stop().animate({
            'margin-left':"0px"
        },20);
    });


});
var step = 0;
var menuintval;
var menusyn = 0;
function animatemenu(){
    $(".indexnav2list>li").removeClass("currr").eq(step).addClass("currr");
    if(step == $(".indexnav2list>li").length - 1){
        step = 0;
    }else{
        step = step + 1;
    }
    getcurrpic.call($(".indexnav2list>li").eq(step-1));
}
function startmenuintval(){
    if(menusyn == 1){
        return;
    }
    menusyn = 1;
    menuintval = window.setInterval("animatemenu()",900);

}
function stopmenuintval(){
    menusyn = 0;
    clearInterval(menuintval);
}
function getcurrpic(){
    //var thispicid = $(this).find("input[type=hidden]").val();
    //$("#indexFocusPic").parent().hide();
    //$(".ygbanner").hide();
    //$("#"+thispicid).show();
}
//首页导航效果end
