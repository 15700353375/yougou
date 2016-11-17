var cdnUrl,isYgDailogExist;
/*导航控制*/
$(function(){
		/*左侧分类菜单相关js 20130315*/
		function handlNavHover(){
			$('.yg_category_list li').hover(function(){
				var index=$('.yg_category_list li').index(this);
				$('.yg_category_list li').removeClass('curr').eq(index).addClass('curr');
				$('.yg_category .bd').addClass('bd_hover');
				$('.yg_category_item').hide().eq(index).show();
			});
		}
	//优购导航
	if($('#yg_category')[0]){
		var isloadNav=$('#yg_category .yg_category_list')[0];

		if(isloadNav){
			handlNavHover();

		}
		/*显示左侧分类菜单js 20130315*/	
		$('.yg_category').unbind('hover').hover(function(){
			var me = $(this);
			me.addClass('yg_category_hover');
			if(!isloadNav){
                isloadNav=true;
                if($("#yg_category").attr("navsrc")!=null&&!me.children('.bd').children().length){
                    $.get(me.attr('navsrc'),function(d){
                        if($('#yg_category .yg_category_list')[0]){return}
                        me.children('.bd').prepend(d);
						$("#yg_category").removeAttr("navsrc");
                        handlNavHover();

                    });
                }
			}
		},function(){
			$(this).removeClass('yg_category_hover');
		});
		$('.yg_category .bd').mouseleave(function(){
			$('.yg_category_list li').removeClass('curr');
			$('.yg_category .bd').removeClass('bd_hover');
		});
	};
	
	/*头部二维码相关  登陆及用户中心头*/
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
	//导航高亮
	var curNav =$('.yg_nav_list a[href^='+location.href+']');
	if(curNav){curNav.addClass('cur');}
	
	if($('#ygGuid')[0]){
		//优购导购品牌
		$("#ygGuid .item_bom").ygSwitch('#brand-list>a',{
			nextBtn:'#brand-right',
			prevBtn:'#brand-left',
			steps:48,
			lazyload:true
		});
	}
	
});
/*BI ga by chu*/
$(function() {
    var _o_window = window, _o_document = document;
    var _undefined = undefined, _null = null, _empty = "";
    var _substring = "substring", _split = "split", _length = "length", _join = "join", _str_indexOf = "indexOf";
    if (typeof YGUnion == "undefined") {
        YGUnion = {version: "1.0", Biz: {}}
    }
    YGUnion.Biz = {Common: {_unionKey: ["wid", "cid","bid","qihoo_id","ext","qid","baidu_key"], writeCookie: function () {
        var baidu_key_reg = new RegExp("(^|&)baidu_key=([^&]*)(&|$)", "i");
        var utm_source_reg = new RegExp("(^|&)utm_source=([^&]*)(&|$)", "i");
        var baidu_key = window.location.search.substr(1).match(baidu_key_reg);
        var utm_source = window.location.search.substr(1).match(utm_source_reg);
        if (utm_source != null&&baidu_key==null){
            var exp = new Date();
            exp.setTime(exp.getTime() - 1);
            var arr = document.cookie.match(new RegExp("(^| )__ygcpsp=([^;]*)(;|$)"));
            if(arr!=null) document.cookie= name + "="+arr+";expires="+exp.toGMTString();
        }

        var b = _o_document.location.search;
        if (undefined != b && b != "") {
            var e = [];
            b = b[_substring](1);
            var a = b[_split]("&");
            for (var d = 0; d < a[_length]; d++) {
//                var c = a[d][_split]("=");
                try{
                    var key=a[d][_substring](0,a[d][_str_indexOf]("="));
                    var value=a[d][_substring](a[d][_str_indexOf]("=")+1);
//                if (this.inArray(this._unionKey, c[0])) {
                    if (this.inArray(this._unionKey, key)) {
                        if (e != _empty) {
                            e += "|"
                        }
//                    e += c[0] + "=" + escape(c[1])
                        e += key + "=" + escape(value)
                    }
                }catch(ex){

                }
            }
            if (e != _empty) {
                var f = new Date();
                f.setTime(f.getTime() + 1000 * 60 * 60 * 24);
                _o_document.cookie = "__ygcpsp=" + escape(e) + ";expires=" + f.toUTCString() + ";domain=" + _o_document.domain[_substring](_o_document.domain[_str_indexOf](".")) + ";path=/";
                _o_document.cookie = "cps=null;expires=-1;domain=" + _o_document.domain[_substring](_o_document.domain[_str_indexOf](".")) + ";path=/"
            }
        }
    }, inArray: function (a, c) {
        var b = String.fromCharCode(2);
        var d = new RegExp(b + c + b);
        return(d.test(b + a.join(b) + b))
    }}};
    YGUnion.Biz.Common.writeCookie();
});
/*BI ga by chu end*/
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
(function() {
	// 定义YouGou类
	if (typeof YouGou == 'undefined') {
		// 声明框架命名空间
		YouGou = {
			version : '1.1 beta1',
			Biz:{},
			Base : {},
			Util : {},
			UI : {},
			Ajax : {}
		};
	}

	// 基础函数库
	YouGou.Base = {
		// 继承
		apply : function(C, D, B) {
			if (B) {
				YouGou.Base.apply(C, B);
			}
			if (C && D && typeof D == "object") {
				for (var A in D) {
					C[A] = D[A];
				}
			}
			return C;
		},
		// 继承
		applyIf : function(o, c) {
			if (o && c) {
				for (var p in c) {
					if (typeof o[p] == "undefined") {
						o[p] = c[p];
					}
				}
			}
			return o;
		},
		// 获取类型
		typeOf : function(v) {
            if (v === null) {
                return 'null';
            }
            var type = typeof v;
            if (type === 'undefined' || type === 'string' || type === 'number' || type === 'boolean') {
                return type;
            }
            var typeToString = toString.call(v);
            switch(typeToString) {
                case '[object Array]':
                    return 'array';
                case '[object Date]':
                    return 'date';
                case '[object Boolean]':
                    return 'boolean';
                case '[object Number]':
                    return 'number';
                case '[object RegExp]':
                    return 'regexp';
            }
            if (type === 'function') {
                return 'function';
            }
            if (type === 'object') {
                if (v.nodeType !== undefined) {
                    if (v.nodeType === 3) {
                        return (/\S/).test(v.nodeValue) ? 'textnode' : 'whitespace';
                    }
                    else {
                        return 'element';
                    }
                }
                return 'object';
            }
        }
	};

	// 全局变量、函数
	var isOpera = $.browser.opera, isIE = $.browser.msie, isMoz = $.browser.mozilla;
	if (isIE) {
		try {
			document.execCommand("BackgroundImageCache", false, true);
		} catch (e) {}
	}

	// String扩展去除空格
	String.prototype.trim = function(){
		var str = this;
		str = str.replace(/^\s\s*/, "");
		var ws = /\s/;
		var i = str.length;
		while (ws.test(str.charAt(--i)));
		return str.slice(0, i + 1);
	};
	// Array扩展是否在集合中
    Array.prototype.inArray = function(value){
        for (var i=0,l = this.length ; i < l ; i++) {
            if (this[i] === value) {
                return true;
            }
        }
        return false;
    };
	// Array删除
    Array.prototype.remove = function(value){
	    var newArr = this;
	    for(var i=0,count=newArr.length;i<count;){
	        if(newArr[i] == value){newArr.splice(i,1); count--;continue;}
	        i++;
	    }
	    return newArr;
	};
	Function.prototype.binding = function(){
	    if (arguments.length < 2 && typeof arguments[0] == "undefined") return this;
	    var __method = this, args = jQuery.makeArray(arguments), object = args.shift();
	    return function() {
	        return __method.apply(object, args.concat(jQuery.makeArray(arguments)));
	    }
	};


	
	// 工具辅助函数库
	YouGou.Util = {
		// 空字符串判断
		isEmpty : function(v, allowBlank) {
			return v === null || v === undefined || (!allowBlank ? v === "" : false);
		},
		// 空对象判断
		isNull : function(obj) {
			if (typeof obj == "undefined" || obj == null)
				return true;
			else
				return false;
		},
		// 取值空判断
		value : function(v, defaultValue, allowBlank) {
			return this.isEmpty(v, allowBlank) ? defaultValue : v;
		},
		// 数组类型判断
		isArray : function(v) {
			return v && typeof v.length == "number" && typeof v.splice == "function";
		},
		// 是否是整型
		isInteger : function(v){
			if(/^-?[0-9]\d*$/.test(v))
				return true;
			else
				return false;
		},
		// 数字类型
		isNumber: function(value) {
            return typeof value === 'number' && isFinite(value);
        },
		// 是否是中文
		isChinese : function(v){
			if (/^[\u4e00-\u9fa5]+$/.test(v))
				return true;
			else
				return false;
		},
		// 计算字符串长度
		strEllip : function(v){
			if(this.isEmpty(v)){
				return 0;
			}
			return v.replace(/[^\x00-\xff]/g,"**").length;
		},
		// 日期类型
		isDate : function(v){
			return toString.call(v) === '[object Date]';
		},
		// 对象类型
		isObject : function(v) {
            return toString.call(v) === '[object Object]';
        },
		// print Object
		inspect : function(obj){
			var s = obj + "\n";
			for (var a in obj) {
				if (typeof obj[a] != "function") {
					s += a + "=" + obj[a] + ",\n";
				}
			}
			alert("obj=" + s);
		},
		// 类似Java的Map
		Map : function(){
			// keys
			this.keys = new Array();
			// values
			this.data = new Object();

			YouGou.Base.apply(this,{
				// 放入一个键值对
				put : function(key, value) {
					if (this.data[key] == null) {
						this.keys.push(key);
					}
					this.data[key] = value;
				},
				// 获取某键对应的值
				get : function(key) {
					return this.data[key];
				},
				// 删除一个键值对
				remove : function(key) {
					this.keys.remove(key);
					this.data[key] = null;
				},
				// 遍历Map,执行处理函数 回调函数 function(key,value,index){..}
				each : function(fn) {
					if (typeof fn != 'function') {
						return;
					}
					var len = this.keys.length;
					for (var i = 0; i < len; i++) {
						var k = this.keys[i];
						fn(k, this.data[k], i);
					}
				},
				// 获取键值数组(类似Java的entrySet()) 键值对象{key,value}的数组
				entrys : function() {
					var len = this.keys.length;
					var entrys = new Array(len);
					for (var i = 0; i < len; i++) {
						entrys[i] = {
							key : this.keys[i],
							value : this.data[i]
						};
					}
					return entrys;
				},
					// key数组字符串
				keyArrString : function(separator){
					var keyArr = new Array();
					var size = this.size();
					this.each(function(key,value,index){
						if(!YouGou.Util.isNull(key)){
							if(size != index+1){
								keyArr.push(key);
								keyArr.push(separator);
							}else{
								keyArr.push(key);
							}
						}
					});
					return keyArr.join('');
				},
				
				// 仅value为string时调用
				valueArrString : function(separator){
					var valArr = new Array();
					var size = this.size();
					this.each(function(key,value,index){
						if(!YouGou.Util.isNull(value)){
							if(size != index+1){
								valArr.push(value);
								valArr.push(separator);
							}else{
								valArr.push(value);
							}
						}
					});
					return valArr.join('');
				},
				// 判断Map是否为空
				isEmpty : function() {
					return this.keys.length == 0;
				},
				//获取键值对数量
				size : function() {
					return this.keys.length;
				},
				valArray : function(){
					var valArr = new Array();
					this.each(function(key,value,index){
						if(!YouGou.Util.isNull(value)){
							valArr.push(value);
						}
					});
					return valArr;
				},
				//重写toString
				toString : function() {
					var s = "{";
					for (var i = 0; i < this.keys.length; i++, s += ',') {
						var k = this.keys[i];
						s += k + "=" + this.data[k];
					}
					s += "}";
					return s;
				}
			});
		},
		// 对象转换成json字符串
		toJsonString : function(arg) {
		    return YouGou.Util.toJsonStringArray(arg).join('');
		},
		// 对象转换成json字符串数组
		toJsonStringArray : function(arg, out) {
		    out = out || new Array();
		    var u;
		    switch (typeof arg) {
		    case 'object':
		        if (arg) {
		            if (arg.constructor == Array) {
		                out.push('[');
		                for (var i = 0; i < arg.length; ++i) {
		                    if (i > 0)
		                        out.push(',\n');
		                    YouGou.Util.toJsonStringArray(arg[i], out);
		                }
		                out.push(']');
		                return out;
		            } else if (typeof arg.toString != 'undefined') {
		                out.push('{');
		                var first = true;
		                for (var i in arg) {
		                    var curr = out.length;
		                    if (!first)
		                        out.push(',\n');
		                    YouGou.Util.toJsonStringArray(i, out);
		                    out.push(':');
		                    YouGou.Util.toJsonStringArray(arg[i], out);
		                    if (out[out.length - 1] == u)
		                        out.splice(curr, out.length - curr);
		                    else
		                        first = false;
		                }
		                out.push('}');
		                return out;
		            }
		            return out;
		        }
		        out.push('null');
		        return out;
		    case 'unknown':
		    case 'undefined':
		    case 'function':
		        out.push(u);
		        return out;
		    case 'string':
		        out.push('"')
		        out.push(arg.replace(/(["\\])/g, '\\$1').replace(/\r/g, '').replace(/\n/g, '\\n'));
		        out.push('"');
		        return out;
		    default:
		        out.push(String(arg));
		        return out;
		    }
		},
		// 克隆
		clone : function(obj){
		  if(typeof(obj) != 'object') return obj;
			  if(obj == null) return obj;
				  var myNewObj = new Object();
				  for(var i in obj)
				     myNewObj[i] = YouGou.Util.clone(obj[i]);
				  return myNewObj;
		},
		// 参数：str:原始字符串 n:需要返回的长度，汉字=2 返回值：处理后的字符串
		strEllip : function(str, n) {
			var ilen = str.length;
			if (ilen * 2 <= n)
				return str;
			n -= 3;
			var i = 0;
			while (i < ilen && n > 0) {
				if (encodeURI(str.charAt(i)).length > 4) {
					n--;
				}
				n--;
				i++;
			}
			if (n > 0)
				return str;
			return str.substring(0, i) + "...";
		},
		// 微型模板引擎
		tpl : function(str, data){
			var fn = !/\W/.test(str) ?
			  cache[str] = cache[str] ||
				YouGou.Util.tpl(document.getElementById(str).innerHTML) :
			  new Function("obj",
				"var p=[],print=function(){p.push.apply(p,arguments);};" +
				"with(obj){p.push('" +
				str.replace(/[\r\t\n]/g, " ")
				  .split("<%").join("\t")
				  .replace(/((^|%>)[^\t]*)'/g, "$1\r")
				  .replace(/\t=(.*?)%>/g, "',$1,'")
				  .split("\t").join("');")
				  .split("%>").join("p.push('")
				  .split("\r").join("\\'")
			  + "');}return p.join('');");
			return data ? fn( data ) : fn;
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
		// js动态加载
		jsLoader : function(sUrl, fCallback) {
			$.getScript(sUrl,fCallback);
		},
		// 图片加载失败处理 el如".proList img"
		imgError : function(el,errImgUrl){
			$(el).each(function (i,e){
              var imgsrc = $(e).attr("src");
              $(e).load(function(){
                }).error(function() {
                   $(e).attr("src",errImgUrl);
                }) ;
          });
		},
		// 获取Url参数
		getQueryParameter : function(qs){
			var s = location.href;
		    s = s.replace("?","?&").split("&");
		    var re = "";
		    for(i=1;i<s.length;i++)
		        if(s[i].indexOf(qs+"=")==0)
		            re = s[i].replace(qs+"=","");
		    return re;
		},
		// 取得鼠标当前位置
		mousePosition : function(e) {
			e = e || window.event;
			var X = e.pageX || e.clientX + document.body.scrollLeft, Y = e.pageY || e.clientY + document.body.scrollTop;
			return {positionX : X,positionY : Y}
		},
		baseUrl:cdnUrl?cdnUrl:''
	};
	YouGou.UI.uimg={
			img1:YouGou.UI.baseUrl+"/template/common/images/reload.gif", //YouGou.UI.uimg.img1
			img160:YouGou.UI.baseUrl+"/template/common/images/nloading.gif",
			imgerr:YouGou.UI.baseUrl+"/template/common/images/error160-160.jpg",//YouGou.UI.uimg.imgerr
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
						window.sidebar.addPanel(title,url,"")
					}else{
						alert("加入收藏失败，\n请您使用菜单栏或Ctrl+D收藏本站。");
					}
				}
				catch(e){
					alert("加入收藏失败，\n请您使用菜单栏或Ctrl+D收藏本站。");
				}
				
			},
			// 收藏首页
			setHomePage : function(){
				if (document.all){
						document.body.style.behavior='url(#default#homepage)';
						document.body.setHomePage('http://www.yougou.com');
					}else if(window.sidebar){
						if(window.netscape){
							try{netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");}catch (e){
							alert( "亲爱的用户你好：\n你使用的不是IE浏览器，此操作被浏览器阻挡了，你可以选择手动设置为首页！\n给你带来的不便，本站深表歉意。" );
						}
					}
				}
			},
			// 打开企业QQ客服
			openQQCUS : function(){
				window.open('http://b.qq.com/webc.htm?new=0&sid=800023329&eid=2188z8p8p8p8K8P8P8K80&o=www.yougou.com&q=7', '_blank', 'height=544, width=644,toolbar=no,scrollbars=no,menubar=no,status=no');
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
				//显示
				/*var timerShow;
				$('.mycart_nav').hover(function(e){
					$(this).addClass('mycart_hover');
					clearTimeout(timerShow);
					timerShow=setTimeout(function(){
						YouGou.Biz.ShoppingCart.showCart();
					},100);
				},function(){
					var me = $(this);
					clearTimeout(timerShow);
					timerShow=setTimeout(function(){
						$('#shoppingcartContainer').html('');	
						me.removeClass('mycart_hover');	
					},100);
				});*/
				
				
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
				var param = "productNum="+ newNum +"&id=" + id+"&targetUrl="+this.targetUrl+'&r='+Math.random();
				$.get(this.cartActionBasePath+"u_updateCart.sc",param,function(d){
					YouGou.Biz.ShoppingCart.initCartCnt(d);
				});
			},
			// 删除商品
			removeProduct : function(id,isTip,srcElement){
				if(isTip){
					if(!confirm("您确定要将此商品删除吗？")){return;}
				}
				var param = "id=" + id + "&targetUrl="+this.targetUrl;
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
						if(!YouGou.Util.isEmpty(data)){
							var count = data.substring(data.lastIndexOf("count=")+6,data.lastIndexOf("msg="));
							//var msg = data.substring(data.lastIndexOf("msg=")+4,data.length);
							var _msgHtml = [];
							_msgHtml.push('<a href="http://www.yougou.com/my/msg.jhtml">站内消息(<i class="corg" >');
							_msgHtml.push(count);
							_msgHtml.push('</i>)</a>');
							/*if(msg.indexOf('<')){
								msg = msg.substring(0,msg.indexOf('<'));
							}
							if(msg.length > 45){
								msg = msg.substring(0,45) + "...";
							}
							_msgHtml.push(msg);
							_msgHtml.push('</span></sup>');
							*/
							
							$("#top_msg").html(_msgHtml.join('')).show();
							if(count !=0){
								/*$("#top_msg").hover(function(){
									$(this).children(".msgcon").css("visibility","visible");
								},function(){
									$(this).children(".msgcon").css("visibility","hidden");
								});*/
								try{
									// usercenter菜单
									$("#uc_msg_count").html("站内消息<i class='orgse'>（<em>"+ count +"</em>）</i>");
									// usercenter index page
									$("#css_no_num").removeClass("no_num");
									$("#uc_index_count").text(count);
								}catch(e){}
							}else{
								$("#css_no_num").addClass("no_num");
								$("#uc_index_count").text(count);
							}
						}else{
							$("#css_no_num").addClass("no_num");
							$("#top_msg").html('<a href="http://www.yougou.com/my/comment.jhtml">站内消息<i class="corg">0</i>)</a>').show();
						}
					 }
				});
				//点评个数
				$.get('/my/getCommentCount.jhtml',function(d){
					var msg='<a href="http://www.yougou.com/my/comment.jhtml" >等待点评(<i class="corg">'+d+'</i>)</a>';
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
					if(keywords){
						s.keywords=keywords?keywords:'';
					}
					s.userid=uuid?uuid:'';
					idgTracker._setECM(s);      
					idgTracker._trackPoint();
				} catch(err) {}				
			});
		},		
	    // TaskRunner任务器
	    TaskRunner : function(interval){
			interval = interval || 10;
		    var tasks = [],
		    removeQueue = [],
		    id = 0,
		    running = false,
		    // private
		    stopThread = function() {
		        running = false;
		        clearInterval(id);
		        id = 0;
		    },
		    // private
		    startThread = function() {
		        if (!running) {
		            running = true;
		            id = setInterval(runTasks, interval);
		        }
		    },
		    // private
		    removeTask = function(t) {
		        removeQueue.push(t);
		        if (t.onStop) {
		            t.onStop.apply(t.scope || t);
		        }
		    },
		    // private
		    runTasks = function() {
		        var rqLen = removeQueue.length,now = new Date().getTime(),i;
		        if (rqLen > 0) {
		            for (i = 0; i < rqLen; i++) {
		                tasks.remove(removeQueue[i]);
		            }
		            removeQueue = [];
		            if (tasks.length < 1) {
		                stopThread();
		                return;
		            }
		        }
		        i = 0;
		        var t,itime,rt,len = tasks.length;
		        for (; i < len; ++i) {
		            t = tasks[i];
		            itime = now - t.taskRunTime;
		            if (t.interval <= itime) {
		                rt = t.run.apply(t.scope || t, t.args || [++t.taskRunCount]);
		                t.taskRunTime = now;
		                if (rt === false || t.taskRunCount === t.repeat) {
		                    removeTask(t);
		                    return;
		                }
		            }
		            if (t.duration && t.duration <= (now - t.taskStartTime)) {
		                removeTask(t);
		            }
		        }
		    };
		    this.start = function(task) {
		        tasks.push(task);
		        task.taskStartTime = new Date().getTime();
		        task.taskRunTime = 0;
		        task.taskRunCount = 0;
		        startThread();
		        return task;
		    };
		    this.stop = function(task) {
		        removeTask(task);
		        return task;
		    };
		    this.stopAll = function() {
		        stopThread();
		        for (var i = 0, len = tasks.length; i < len; i++) {
		            if (tasks[i].onStop) {
		                tasks[i].onStop();
		            }
		        }
		        tasks = [];
		        removeQueue = [];
		    };
	    }
	};

	// Ajax函数库
	YouGou.Ajax = {
		// Ajax请求替换DOM，并执行目标页面js,css
		do_request : function(el, url, params, callback){
			$.ajax({
				type : "POST",
				url : url,
				data : params,
				success : function(data){
					YouGou.Ajax.updateInnerHTML(el, data);
					if(callback){
						try {
							callback(data);
						}catch(e){
							//console.error("执行异步回调删除失败",e);
						}
					}
				}
			});
		},
		// 更新指定元素的innerHTML,并执行其中的script
		updateInnerHTML : function(id, html) {
			YouGou.Ajax._updateHTML(id, html, 'inner');
		},
		// 更新指定元素的innerHTML,并执行其中的script
		updateOuterHTML : function(id, html) {
			YouGou.Ajax._updateHTML(id, html, 'outer');
		},
		// script迭代器
		ScriptIterator : function() {
			this.elementArray = [];
			this.append = function(el) {
				this.elementArray.push(el);
			}
			this.hasNext = function() {
				return this.elementArray.length > 0;
			}
			this.next = function() {
				return this.elementArray.shift();
			}
		},
		// 更新指定元素的innerHTML,并执行其中的script
		_updateHTML : function(id, html, type) {
			if (typeof html == "undefined") {
				html = "";
			}
			var el = document.getElementById(id);
			if (!el) {
				//console.error("未找到ID为" + id + "的页面元素");;
			}
			// 容易造成IE崩溃
			html = YouGou.Ajax.loadLinkTags(html);
			html = YouGou.Ajax.loadStyleTags(html);
			var sIterator = new YouGou.Ajax.ScriptIterator();
			html = YouGou.Ajax.loadScriptTags(html, sIterator);
			if (type == 'inner') {
				el.innerHTML = html;
			} else if (type == 'outer') {
				el.outerHTML = html;
			}
			YouGou.Ajax.loadScripts(sIterator);
		},
		// 加载Link标签
		loadLinkTags : function(html) {
			var reLink = /(?:<link.*?\/(link)?>)/ig;
			var head = document.getElementsByTagName("head")[0];
			var match;
			while (match = reLink.exec(html)) {
				if (match && match[0]) {
					var link = document.createElement(match[0]);
					link.setAttribute('rel', 'stylesheet');
					link.setAttribute('type', 'text/css');
					head.appendChild(link);
				}
			}
			html = html.replace(/(?:<link.*?\/(link)?>)/ig, "");
			return html;
		},
		// 加载style标签
		loadStyleTags : function(html) {
			var reStyle = /(?:<style([^>]*)?>)((\n|\r|.)*?)(?:<\/style>)/ig;
			var match;
			var head = document.getElementsByTagName("head")[0];
			while (match = reStyle.exec(html)) {
				if (match[2] && match[2].length > 0) {
					var styleTag = document.createElement('style');
					styleTag.setAttribute('type', 'text/css');
					if (styleTag.styleSheet) {
						styleTag.styleSheet.cssText = match[2];
					} else {
						styleTag.appendChild(document.createTextNode(match[2]));
					}
					head.appendChild(styleTag);
				}
			}
			html = html.replace(/(?:<style.*?>)((\n|\r|.)*?)(?:<\/style>)/ig, "");
			return html;
		},
		//加载script标签
		loadScriptTags : function(html, sIterator) {
			var re = /(?:<script([^>]*)?>)((\n|\r|.)*?)(?:<\/script>)/ig;
			var srcRe = /\ssrc=([\'\"])(.*?)\1/i;
			var idRe = /\sid=([\'\"])(.*?)\1/i;
			var typeRe = /\stype=([\'\"])(.*?)\1/i;
			var match;
			while (match = re.exec(html)) {
				var attrs = match[1];
				var idMatch = attrs ? attrs.match(idRe) : false;
				if (idMatch && idMatch[2]) {
					var el = document.getElementById(idMatch[2]);
					if (el) {
						continue;
					}
				}
				var srcMatch = attrs ? attrs.match(srcRe) : false;
				if (srcMatch && srcMatch[2]) {
					var script = document.createElement("script");
					script.src = srcMatch[2];
					var typeMatch = attrs.match(typeRe);
					if (typeMatch && typeMatch[2]) {
						script.type = typeMatch[2];
					}
					sIterator.append({
						type : 1,
						script : script
					});
				} else if (match[2] && match[2].length > 0) {
					sIterator.append({
						type : 2,
						script : match[2]
					});
				}
			}
			html = html.replace(/(?:<script.*?>)((\n|\r|.)*?)(?:<\/script>)/ig, "");
			return html;
		},
		// 加载多个script标签
		loadScripts : function(sIterator) {
			if (sIterator.hasNext()) {
				var el = sIterator.next();
				if (el) {
					if (el.type == 1) {
						var hd = document.getElementsByTagName("head")[0];
						var script = el.script;
						script.onload = script.onreadystatechange = function() {
							if (!script.readyState || script.readyState == 'loaded' || script.readyState == 'complete') {
								YouGou.Ajax.loadScripts(sIterator);
							}
						}
						hd.appendChild(script);
					} else if (el.type == 2) {
						if (window.execScript) {
							try {
								window.execScript(el.script);
							} catch (e) {
								//console.error(e.description);
							}
						} else {
							window.eval(el.script);
						}
						YouGou.Ajax.loadScripts(sIterator);
					}
				}
			}
		}
	}
})();

// init functions
$(function (){
	//删除网盟ga cookie
	YouGou.Biz.cookie('__ygsource',null,{expires:-1});
	YouGou.Biz.cookie('__ygrd',null,{expires:-1});
	YouGou.Biz.cookie('__ygmedium',null,{expires:-1});
	YouGou.Biz.cookie('admanageType',null,{expires:-1});
	YouGou.Biz.cookie('cps',null,{expires:-1});
	try{
		YouGou.Biz.ShoppingCart.initCart();
	}catch(e){}
});

//login
function login(){location.href="http://www.yougou.com/signin.jhtml?redirectURL="+encodeURIComponent(location.href);return false;}
//regster [issue #1041] added by tanfeng 2012.02.27
function register(){location.href="http://www.yougou.com/register.jhtml?redirectURL="+encodeURIComponent(location.href);return false;}

//checksearch
function checkSearch(){
		           $("#kword").val($("#kword").val().trim());
	}
	
//gotolink	
function gotolink(url){location.href=url;}

//lazyload
/*
(function($) {
	$.fn.lazyload = function(options) {
		var settings = {
			threshold: 0,
			failurelimit:1000,
			event: "scroll",
			effect: "show",
			container: window,
			errorimg:YouGou.UI.uimg.img1,
			callback:function(){}
		};
		if (options) {
			$.extend(settings, options)
		}
		var elements = this;
		if ("scroll" == settings.event) {
			$(settings.container).bind("scroll",
			function(event) {
				var counter = 0;
				elements.each(function() {
					if ($.abovethetop(this, settings) || $.leftofbegin(this, settings)) {} else if (!$.belowthefold(this, settings) && !$.rightoffold(this, settings)) {
						$(this).trigger("appear")
					} else {
						if (counter++>settings.failurelimit) {
							return false
						}
					}
				});
				var temp = $.grep(elements,
				function(element) {
					return ! element.loaded
				});
				elements = $(temp)
			})
		}
		this.each(function() {
			var self = this;
			if (undefined == $(self).attr("original")) {}
			if ("scroll" != settings.event || undefined == $(self).attr("src") || settings.placeholder == $(self).attr("src") || ($.abovethetop(self, settings) || $.leftofbegin(self, settings) || $.belowthefold(self, settings) || $.rightoffold(self, settings))) {
				if (settings.placeholder) {
					$(self).attr("src", settings.placeholder)
				} else {
					$(self).removeAttr("src")
				}
				self.loaded = false
			} else {
				$(self).attr("src", $(self).attr("original"));
				self.loaded = true
			}
			$(self).one("appear",
			function() {
				if (!this.loaded) {
					$("<img />").bind("load",
					function() {
						$(self).hide().attr("src", $(self).attr("original"))[settings.effect](settings.effectspeed);
						self.loaded = true; 
						settings.callback(self);
					}).error(function(){
				        if(settings.errorimg){
							self.src=settings.errorimg
						}
					}).attr("src", $(self).attr("original"));
				}
			});
			if ("scroll" != settings.event) {
				$(self).bind(settings.event,
				function(event) {
					if (!self.loaded) {
						$(self).trigger("appear")
					}
				})
			}
		});
		$(settings.container).trigger(settings.event);
		return this
	};
	$.belowthefold = function(element, settings) {
		if (settings.container === undefined || settings.container === window) {
			var fold = $(window).height() + $(window).scrollTop()
		} else {
			var fold = $(settings.container).offset().top + $(settings.container).height()
		}
		return fold <= $(element).offset().top - settings.threshold
	};
	$.rightoffold = function(element, settings) {
		if (settings.container === undefined || settings.container === window) {
			var fold = $(window).width() + $(window).scrollLeft()
		} else {
			var fold = $(settings.container).offset().left + $(settings.container).width()
		}
		return fold <= $(element).offset().left - settings.threshold
	};
	$.abovethetop = function(element, settings) {
		if (settings.container === undefined || settings.container === window) {
			var fold = $(window).scrollTop()
		} else {
			var fold = $(settings.container).offset().top
		}
		return fold >= $(element).offset().top + settings.threshold + $(element).height()
	};
	$.leftofbegin = function(element, settings) {
		if (settings.container === undefined || settings.container === window) {
			var fold = $(window).scrollLeft()
		} else {
			var fold = $(settings.container).offset().left
		}
		return fold >= $(element).offset().left + settings.threshold + $(element).width()
	};
	$.extend($.expr[':'], {
		"below-the-fold": "$.belowthefold(a, {threshold : 0, container: window})",
		"above-the-fold": "!$.belowthefold(a, {threshold : 0, container: window})",
		"right-of-fold": "$.rightoffold(a, {threshold : 0, container: window})",
		"left-of-fold": "!$.rightoffold(a, {threshold : 0, container: window})"
	})
})(jQuery);
*/
//lazyload
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
				self.removeAttr("original").removeClass('lazy_loading lazyloadimg');
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


//ajax登录
function initLogin(){
	var requestHost = 'https:' == document.location.protocol ? 'https://passport.yougou.com' : 'http://www.yougou.com';
	$.ajax({
		type: "get",
		url: requestHost + "/api/getIsLoginAndShoppingcartJsonp.jhtml?callback=?",
		dataType:"jsonp",
		success: function(data){
			gIsSpecialUser = data.isSpecial=='true'?true:false;
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
				/*if(len>10){
					userName = userName.substring(0,3)+'...'+userName.substring(len-5);
				}*/
				if(len>=16){
					userName=userName.substring(0,len-3)+'...';
				}
				//$("#user_id").parent().html('您好！<span id="user_id">'+ userName +'</span>');
				//$("#login_id").html('<a href="/logout.jhtml">退出</a><i class="stn_separator">|</i>');
				if($("#top_nav .about_user").length>0)
				{
					$("#top_nav .about_user").html('您好！<span id="user_id">'+ userName +'</span><a class="quit" href="/logout.jhtml">退出</a>');
				}else
				{
					$("#user_id").parent().html('您好！<span id="user_id">'+ userName +'</span>');
					$("#login_id").html('<a href="/logout.jhtml">退出</a><i class="stn_separator">|</i>');
				}
				
				//砸蛋广告start
					//没有‘砸蛋锤子id’才弹广告(专题页不弹)
				if(!$('#hammer,#eggLotteryDiv,.ypsg_header')[0]){
					var adEgg = YouGou.Biz.cookie('adEgg');
					if(adEgg){
						var arrAdEgg = adEgg.replace(/\"/g,'').split(',');
						var showEggPop = function(){
						var	dg=ygDialog({
								title : '温馨提示',
								lock: false,
								width: 500,
								height: 260,
								content:'<a id="goeggTopic" href="'+arrAdEgg[0]+'" target="_blank"><img src="'+arrAdEgg[1]+'" width="500" height="260"/></a>'
							});
							$('#goeggTopic').click(dg.close);
						}
						if(!isYgDailogExist){
							var strHref = document.getElementsByTagName('link')[0].getAttribute('href');
							var cssVersion = strHref.slice(strHref.indexOf('?'),-1);
							var strYgDialogUrl = YouGou.UI.baseUrl+'/template/common/js/ygdialog.js'+cssVersion;
							loadjs(strYgDialogUrl,showEggPop);
						}else{
							showEggPop();		
						}
					}
				}
				YouGou.Biz.cookie('adEgg', null, {expires: -1, path: '/',domain:'.yougou.com',secure: false});
				//砸蛋广告end				
				//tkf统计start
				if(isCms&&NTKF_PARAM){
					NTKF_PARAM.uid=data.userName;
					NTKF_PARAM.uname=data.userName;
				}
				//ntkf统计end				
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
				if(typeof(shoppingProcess)!='boolean'){
					var reg = new RegExp("(^|&)keyword=([^&]*)(&|$)", "i");
					var r = window.location.search.substr(1).match(reg);
					var keywords= r != null ?  decodeURI(r[2]):'';
					YouGou.Biz.handleAllyes(YouGou.Biz.getUserUUID(),keywords);
				}
			}else{
				//处理未登陆时好耶
				if(typeof(shoppingProcess)!='boolean'){
					var reg = new RegExp("(^|&)keyword=([^&]*)(&|$)", "i");
					var r = window.location.search.substr(1).match(reg);
					var keywords= r != null ?  decodeURI(r[2]):'';
					YouGou.Biz.handleAllyes('',keywords);
				}				
			}
			
			if(isCms){
				var src = dNtfj.attr('src1');
				dNtfj.attr('src',src);
			}			
		}
	});	
}
$(function(){

//lazyload 优购导购品牌foot img
$(".footser img,.n_footinfo img,#brand-list img").lazyload({
	//placeholder:YouGou.UI.uimg.img1,
	//threshold:280
});
initLogin();
var newdomain="http://www.yougou.com";

})


function loadjs(url,succ,v){var elem=delay_js(url);if((navigator.userAgent.indexOf('MSIE')==-1)?false:true){elem.onreadystatechange=function(){if(this.readyState&&this.readyState=="loading")return;else succ(v);};}
else elem.onload=function(){succ(v);};elem.onerror=function(){document.body.removeChild(elem);};}
function delay_js(url){var type=url.split("."),file=type[type.length-1];if(file=="css"){var
obj=document.createElement("link"),lnk="href",tp="text/css";obj.setAttribute("rel","stylesheet");}else var obj=document.createElement("script"),lnk="src",tp="text/javascript";obj.setAttribute(lnk,url);obj.setAttribute("type",tp);file=="css"?document.getElementsByTagName("head")[0].appendChild(obj):document.body.appendChild(obj);return obj;};function addload(func){var old=window.onload;if(typeof window.onload!="function")
{window.onload=func;}else{window.onload=function(){old();func();}}};

//滚动加载（img,function)
(function($){$.fn.scrollLoading=function(options){var defaults={attr:"data-url"};var params=$.extend({},defaults,options||{});params.cache=[];$(this).each(function(){var node=this.nodeName.toLowerCase(),url=$(this).attr(params["attr"]);if(!url){return;}
var data={obj:$(this),tag:node,url:url};params.cache.push(data);});var loading=function(){var st=$(window).scrollTop(),sth=st+$(window).height();$.each(params.cache,function(i,data){var o=data.obj,tag=data.tag,url=data.url;if(o){post=o.position().top;posb=post+o.height();if((post>st&&post<sth)||(posb>st&&posb<sth)){if(tag==="img"){o.attr("src",url);}else{ //o.load(url);
}
if(tag!="img"){eval(url);}
data.obj=null;}}});return false;};loading();$(window).bind("scroll",loading);};})(jQuery);


/*新版分享，百度分享*/
var bdShareParam={bdText:"",bdComment:"",bdUrl:"",bdDesc:"",bdPic:""};
(function($){
$.fn.jqShare=function(options){
		options = $.extend({
			shareStyle:0, //分享样式：单品页0，订单列表1，支付成功2,整点开秒3
			zIndex:80,
			shareIcons:null,
			shareData:null,
			shareGoods:true
		}, options || {});
	//分享样式	
	var type=options.shareType;
	var btnW=100;
	var btnH=21;
	var o=$(this);
	var btnImg="";
    //获取最高级别的z-index
	var z_index=options.zIndex;
		z_index=z_index-$(".shareList").length;
	var qzoneDesc,sinaText,qqText,renrenDesc,kaixinText,doubanText,sohuText,goodsName,pics;
		pics=options.shareData.pics;
		
	try{
		// 兼容renren http:// bug
		if(options.shareData.pics.indexOf("http://") == -1){
			options.shareData.pics = "http://" + options.shareData.pics;
		}
		if(options.shareData.commodityUrl.indexOf("/") == 0){
			options.shareData.commodityUrl = "http:/" + options.shareData.commodityUrl;
		}else if(options.shareData.commodityUrl.indexOf("http://") == -1){
			options.shareData.commodityUrl = "http://" + options.shareData.commodityUrl;
		}
	}catch(e){}	
		
		
	if(options.shareGoods)
	{
		qzoneDesc=YouGou.Util.tpl('我在优购时尚商城 <%if(source=="look"){%>看上了一件非常不错的商品<%}else{%>购买了<%}%>：<%=commodityName%>，<%if(source=="buy" && isComment=="true"){%> <%=comment%> <%}%>跟大家分享一下。#优生活，购时尚#',options.shareData);
		
		sinaText=YouGou.Util.tpl('我在@优购时尚商城  <%if(source=="look"){%>看上了一件非常不错的商品<%}else{%>购买了<%}%>：<%=commodityName%>，优购价：<%=salePrice%>元。<%if(source=="buy" && isComment=="true"){%> <%=comment%> <%}%>你们感觉怎么样！#优生活，购时尚#  分享一下',options.shareData);
		
		qqText=YouGou.Util.tpl('我在@yougouwang  <%if(source=="look"){%>看上了一件非常不错的商品<%}else{%>购买了<%}%>：<%=commodityName%>，优购价：<%=salePrice%>元。<%if(source=="buy" && isComment=="true"){%> <%=comment%> <%}%>你们感觉怎么样！#优生活，购时尚#  (分享自@yougouwang)，分享一下',options.shareData);
		
		renrenDesc=YouGou.Util.tpl('我在@优购时尚商城  <%if(source=="look"){%>看上了一件非常不错的商品<%}else{%>购买了<%}%>：<%=commodityName%>，优购价：<%=salePrice%>元。<%if(source=="buy" && isComment=="true"){%> <%=comment%>，<%}%>跟大家分享一下。(分享自@优购时尚商城    优生活，购时尚)',options.shareData);
		
		kaixinText=YouGou.Util.tpl('我在@优购 <%if(source=="look"){%>看上了一件非常不错的商品<%}else{%>购买了<%}%>：<%=commodityName%>，优购价：<%=salePrice%>元。<%if(source=="buy" && isComment=="true"){%> <%=comment%> <%}%>你们感觉怎么样！分享一下 <%=commodityUrl%> (分享自@优购)。#优生活，购时尚#',options.shareData);
		
		doubanText=YouGou.Util.tpl('我在@优购时尚商城 <%if(source=="look"){%>看上了一件非常不错的商品<%}else{%>购买了<%}%>：<%=commodityName%>，优购价：<%=salePrice%>元。<%if(source=="buy" && isComment=="true"){%> <%=comment%> <%}%>你们感觉怎么样！分享一下 <%=commodityUrl%> (分享自@优购时尚商城  优生活，购时尚)',options.shareData);
		
		sohuText=YouGou.Util.tpl('我在@优购时尚商城 <%if(source=="look"){%>看上了一件非常不错的商品<%}else{%>购买了<%}%>：<%=commodityName%>，优购价：<%=salePrice%>元。<%if(source=="buy" && isComment=="true"){%> <%=comment%> <%}%>你们感觉怎么样！分享一下 <%=commodityUrl%> (分享自@优购时尚商城)。#优生活，购时尚#',options.shareData);
		
		comment=YouGou.Util.tpl('优购价：<%=salePrice%>元 商品编号：<%=commodityNo%>',options.shareData);
		goodsName=options.shareData.commodityName;
	}
	else
	{	
		qzoneDesc=sinaText=qqText=renrenDesc=kaixinText=doubanText=sohuText=options.shareData.summary;
		goodsName=options.shareData.title;
		comment=" ";
	}
	
	var bdurl=options.shareData.commodityUrl;
	var shareList=[{id:"bds_qzone",title:"QQ空间",text:goodsName,desc:qzoneDesc,comment:comment,pics:pics},{id:"bds_tsina",title:"新浪微博",text:sinaText,comment:comment,pics:pics},{id:"bds_tqq",title:"腾讯微博",text:qqText,desc:"",comment:comment,pics:pics},{id:"bds_renren",title:"人人网",text:goodsName,desc:renrenDesc,comment:comment,pics:pics},{id:"bds_kaixin001",title:"开心网",text:kaixinText,comment:comment,pics:pics},{id:"bds_douban",title:"豆瓣网",text:doubanText,comment:comment,pics:pics},{id:"bds_tsohu",title:"搜狐微博",text:sohuText,comment:comment,pics:pics}];
	
	var icons=options.shareIcons;	
	switch(type){
		case 0:
		btnImg=YouGou.UI.baseUrl+"/template/common/images/share_btn.gif";
		break;
		case 1:
		btnImg=YouGou.UI.baseUrl+"/template/common/images/share_btn_2.gif";
		btnW=78;
		break;
		case 2:
		btnImg=YouGou.UI.baseUrl+"/template/common/images/share_btn_4.gif";
		btnW=138;
		btnH=35;
		break;
	}
	
	
	//下拉菜单排版格式
	if (type!=3)
	{
		if(btnW<100) btnW=100;
		var btn= $("<div>").html('<img src="'+btnImg+'" />');
		var sharelist=$("<div>").addClass("shareList").hide();
		var title=$('<h4>').addClass("shareList_title").html("分享到").width(btnW-7);
		var shareBtn=$(o).append(btn);
		btn.css({'display':'inline-block','position':'relative','z-index':z_index,'text-align':'left'});
		btn.append(sharelist);
		btn.height(btnH+1);
		btn.width(btnW);
		setTimeout(function(){sharelist.width(btnW-2).css({'top':btn.height()-2,'left':'0','z-index':'80'});},200);
		
		var listDiv=$("<div>").attr("id","bdshare").width(btnW-2).addClass("bds_tools slid bdshare_t  get-codes-bdshare");//.attr("data","{text:bdShareParam.bdText,desc:bdShareParam.bdDesc,comment:bdShareParam.bdComment,pic:bdShareParam.bdPic,url:bdShareParam.bdUrl}");
		//列表
		$.each(shareList,function(n,value) {
			if((options.shareIcons==null)||(icons.indexOf(value.id)>=0 &&icons!=null))
			{
				var a=null,iconTitle="",iconClass="";
				iconTitle=value.title;
				iconClass=value.id;
				a=$("<a>").addClass(iconClass).html(iconTitle).css({"float":"none","display":"block","padding-left":"26px"});
				listDiv.append(a);
				a.bind("mouseover",function(){
					if(typeof(bdurl)!="undefined"){bdShareParam.bdUrl=bdurl;}
					if(typeof(value.text)!="undefined"){bdShareParam.bdText=value.text;}
					if(typeof(value.desc)!="undefined"){bdShareParam.bdDesc=value.desc;}
					if(typeof(value.comment)!="undefined"){bdShareParam.bdComment=value.comment;}
					if(typeof(value.pics)!="undefined"){bdShareParam.bdPic=value.pics;}
					listDiv.attr("data","{text:"+bdShareParam.bdText+",desc:"+bdShareParam.bdDesc+",comment:"+bdShareParam.bdComment+",pic:"+bdShareParam.bdPic+",url:"+bdShareParam.bdUrl+"}");
				});
			}
		});

		btn.children(".shareList").append(title).append(listDiv);
		
		$(btn).hover(function(){
			$(this).children(".shareList").show(); 
		},function(){
			$(this).children(".shareList").hide();	
		});
		
	}
	
	//横排格式：
	if(type==3)
	{
		var horShare=$("<span>").addClass("horShare bds_tools slid bdshare_t  get-codes-bdshare").attr("id","bdshare");//.attr("data","{text:bdShareParam.bdText,desc:bdShareParam.bdDesc,comment:bdShareParam.bdComment,pic:bdShareParam.bdPic}");
		var spanL=$("<span>").addClass("fl").html("分享到：").css({"height":"26px","line-height":"26px","font-size":"12px","padding-top":"2px"});
		var horShareList=$("<span>").addClass("horShareList fl");
		o.append(horShare)
		horShare.append(spanL);
		horShare.append(horShareList);
		//加载列表
		var icons=options.shareIcons;
		$.each(shareList,function(n,value) {
			if((options.shareIcons==null)||(icons.indexOf(value.id)>=0 &&icons!=null))
			{
				var a=null,iconTitle="",iconClass="";
				iconTitle=value.title;
				iconClass=value.id;
				a=$("<a>").addClass(iconClass).attr('href','javascript:;').attr('title','分享到'+iconTitle);
				if(options.showTitle) a.html(tt).css({'width':'auto','padding-left':'28px'});
				$(".horShareList",o).append(a);
				a.bind("mouseover",function(){
					if(typeof(bdurl)!="undefined"){bdShareParam.bdUrl=bdurl;}
					if(typeof(value.text)!="undefined"){bdShareParam.bdText=value.text;}
					if(typeof(value.desc)!="undefined"){bdShareParam.bdDesc=value.desc;}
					if(typeof(value.comment)!="undefined"){bdShareParam.bdComment=value.comment;}
					if(typeof(value.pics)!="undefined"){bdShareParam.bdPic=value.pics;}
					horShare.attr("data","{text:"+bdShareParam.bdText+",desc:"+bdShareParam.bdDesc+",comment:"+bdShareParam.bdComment+",pic:"+bdShareParam.bdPic+",url:"+bdShareParam.bdUrl+"}");
			});
			}
		});
	}		
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

/********
*飘窗控制
$.jqScrollTop({
	startPos:10, //滚动条滚动多高开始显示
	fixedBottom:false,//是否永远在底部
	show:false //初始化是否显示
	})
********/
(function($){
	$.fn.jqScrollTop=function(options){
		options = $.extend({
			startPos:0,
			bottom:150,
			fixedBottom:false,
			fixedRight:true,
			show:false
		}, options || {});
	
		var ie6=!-[1,]&&!window.XMLHttpRequest;
		var _this=$(this);
		var _bottom=options.bottom;
		var _start=_this.parent().offset().top;
		_this.css({"bottom":_bottom,"top":"auto"});
		!options.fixedRight?_this.css({left:'50%','margin-left':$('body .cen').width()/2+10}):'';
		ie6? _this.css({"top":$(window).height()-_this.height()}):'';
		options.show?_this.show():_this.hide();
		$(window).scroll(function(){
			$(document).scrollTop()>options.startPos?_this.fadeIn(200):_this.fadeOut(200);
			//!options.show&&$(document).scrollTop()<options.startPos?_this.hide():'';
			if(!options.fixedBottom)
			{	
				var f=$(document).scrollTop()+$(window).height();
				if($(".footser")[0]){
					f=f-$(".footser").offset().top;
				}else if($(".footer")[0]){
					f=f-$(".footer").offset().top;
				}
				if(f>0)
				{
					_this.css({
						bottom:function(){
							_bottom=f+options.bottom;
							_this.css({bottom:_bottom});
						}
					})
				}
				else
				{
					_this.css({"bottom":options.bottom,"top":"auto"});
					if(ie6){
						_this.css({"top":$(document).scrollTop()-_this.height()-options.bottom+$(window).height()});
					}
				}
		}
		
		});
		
		$(window).resize(function(){
			_this.css({"bottom":_bottom});
		});
		
		_this.find('.gotop_lnk').click(function(){
			$('html,body').animate({scrollTop:0},0);
				_this.css({"bottom":options.bottom});
				return false;
		});
		return $(this);
	};

})(jQuery);
/*修改公共搜索条，将原来嵌在结构中的 js 代码分离出来 */
$(function(){
		
	$("#yg_logo_tab form.search_box .search_btn").bind("click",function(e){
		e.stopPropagation();
		var keyword=$("#keyword").val();
		if(!keyword=='')
		{
			$(this).parents("form").submit();
		}
	});
	/*问卷调查*/
	if($('#fixedRight')[0]){
		$('#fixedRight').jqScrollTop({startPos:0,show:true,bottom:10});	
	}	
});


//redmine9171筛选列表页右侧添加回到顶部按钮
function FixedElement(option)
{
	this.elem=option.element;
	//this.elemWidth=option.elemWidth;
	this.startPos=option.startPos;
	this.endPos=option.endPos;
	this.l=option.l;
}
//相对于窗口中点定位
FixedElement.prototype.setX=function(){
	var winWidth=$(window).width();
	var pos=winWidth/2;
	var left=pos+this.l;
	$(this.elem).css('left',left+'px');
};
FixedElement.prototype.doScroll=function(){
	var _this=this;
	var elemHeight=$(this.elem).outerHeight(true);
	$(window).scroll(function(){
		if($(window).scrollTop()>0)
		{
			$(_this.elem).fadeIn(200);
			
		}else{
			$(_this.elem).fadeOut(200);
		}
	
		if($.browser.msie && ($.browser.version == "6.0") && !$.support.style) {
			$(_this.elem).css('position','absolute'); 
			if($(window).scrollTop()>=_this.endPos-$(window).height())
			{
				$(_this.elem).css('top',_this.endPos-elemHeight+'px')
			}else
			{
				var top=$(window).scrollTop()+$(window).height()-elemHeight;
				$(_this.elem).css('top',top+'px');
				
			}
		}else{
			
			if($(window).scrollTop()>=_this.endPos-$(window).height())
			{
				$(_this.elem).css('position','absolute').css('top',_this.endPos-elemHeight+'px').css('bottom','auto');
			}else{
				$(_this.elem).css('position','fixed').css('top','auto').css('bottom','0');
			}
		}	
	});
}
FixedElement.prototype.init=function(){
	var _this=this;
	_this.setX();
	$(window).resize(function(){
		_this.setX.apply(_this);
	});
	_this.doScroll();
}

//redmine9854
$(function(){
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
	//手机二维码
	$('.phone li',domTopNav).bind('mouseenter',function(e){
		e.stopPropagation();
		$(this).parent().find('.on').removeClass('on');
		$(this).addClass('on');
	});	
	$('.phone .phone_con',domTopNav).bind('mouseleave',function(e){
		$(this).find('.on').removeClass('on');
		$(this).parent().parent().removeClass('hover');
	});
	
});
//菜单效果 临时增加

$(function(){
    $(".indexnav2list>li").live("mouseover",function(){
        $(".indexnav2list>li").removeClass("currr");
        $(this).addClass("currr");
        $(".indexnav2list>li").find(".popmenu2").hide();
        $(this).find(".popmenu2").show();
    });
    $(".indexnav2list>li").live("mouseout",function(){
        $(".indexnav2list>li").find(".popmenu2").hide();
        $(".indexnav2list>li").removeClass("currr");
    });

    $(".jingcpop>ul>li").live("mouseover",function(){
        $(this).find("a").stop().animate({
            'margin-left':"10px"

        },30);
    });
    $(".jingcpop>ul>li").live("mouseout",function(){
        $(".jingcpop>ul>li").find("a").stop().animate({
            'margin-left':"0px"
        },20);
    });
    $(".popmenu2 .categorytit").live("mouseover",function(){
        $(this).stop().animate({
            'margin-left':"10px"
        },30);
    });
    $(".popmenu2 .categorytit").live("mouseout",function(){
        $(".popmenu2 .categorytit").stop().animate({
            'margin-left':"0px"
        },20);
    });
})



//菜单效果 临时增加

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
//seoul站导航js
$(function(){
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
});

/*seoul首页导航js 20150617*/
$(function(){
	var seo_li = $(".seoul_nav_list>li");
	var seoul_child_w;
	seo_li.hover(function(){
		$(this).children("a").css("display","block");
		$(this).children("span").hide();
		$(this).children(".seoul_child").show();
		var ol_len= $(this).find("ol").length;
		var ol_win= $(this).find("ol").width();
		var li_wid=$(this).width();
		if(ol_len<2){
			$(this).find(".seoul_child").css({
				"width":ol_len*li_wid-2+"px"
			});
			seoul_child_w=ol_len*li_wid;
		}else{
			$(this).find(".seoul_child").css({
				"width":ol_len*ol_win+2+"px"
			});
			seoul_child_w=ol_len*ol_win+2;
		}
		var ygwrap=$(".ygwrap").width();
		var before_w=($(this).index()-1)*li_wid;
		var he_w=before_w+seoul_child_w;
		var cha_w=before_w+seoul_child_w-ygwrap;
		if(he_w>ygwrap){
			$(this).find(".seoul_child").css({
				"left":-cha_w+"px"
			})
		}
	});
	seo_li.mouseleave(function(){
		$(this).children("a").hide();
		$(this).children("span").show();
		seo_li.find(".seoul_child").hide();
		$(".block").show();
	});
	/*seoul首页导航js 20150617 end*/
})




















