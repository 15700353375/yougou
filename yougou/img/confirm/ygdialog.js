/****************
**ygDialog
**2012-08-01 xiao.y@yougou.com
update 2012-10-29 by xiao.y **框架高度自适应
update 2012-12-04 by xiao.y **新增页面加载成功后回调
*****************/
(function () {
var _skin="1";
var _expando = 'ygDialog' + + new Date;
var _count = 0;
var _isIE6 = window.VBArray && !window.XMLHttpRequest;

var ygDialog = function (config, ok, cancel) {
	var defaults=ygDialog.defaults;
	config =config || defaults || {};
	for (var i in defaults) {
		if (config[i] === undefined) config[i] = defaults[i];		
	};
	config.id = config.id || _expando + _count;
	_count ++;
	return ygDialog.list[config.id] =new ygDialog.fn.init(config);	
}
	
	
ygDialog.fn = ygDialog.prototype = {
	init: function (config) {
		if($(document).find("#"+config.id).length>0){
			return;
		}
		var that = this,$wrap;
		var lock,width,height,url,iframed,title,fixed,closable;
		that.wrap=$wrap=$("<div>");
		$wrap.addClass("ygDialog").html(that._templates);
		$("body").prepend($wrap);
		$title=$wrap.find(".uiTitle");
		$content=$wrap.find(".dg_content");
		$close=$wrap.find(".uiClose");
		$skinWrap=$wrap.children(":first-child");
		that.config = config;
		that.tt=$title;
		that.skinWrap=$skinWrap;
		that.con=$content;
		_skin=config.skin;
		
		that.skin()
		.lock()
		.title(config.title)
		.content(config.content);
		if(config.url){
			that.loading();
		}
		that.size(parseInt(config.width),parseInt(config.height));
		that.position(config.left,config.top);
		if(config.drag){
			that.drag();	
		}

		$(window).resize(function(){
			 that.position(config.left,config.top);
		});
		$(window).scroll(function(){
			that.ie6SelectFix();
		});
		
		if(config.closable){
			$wrap.find(".uiClose").bind('click',function(){
				that.close();
			});
		}
		
		ygDialog.close=function(){that.close();}
		config.init && config.init.call(that, window);
		
		return that;
	},
	skin:function(){
		var that=this,config=that.config;
		if(config.id){
			that.skinWrap.parent().attr("id",config.id);
		}
		that.skinWrap.attr("class","dialogSkin"+_skin);
		return this;
		
	},
	loading:function(){
		var that=this,wrap=that.wrap,config=that.config;
		var loadDiv=$("<div>").addClass("dg_loading");
		loadDiv.html('<img src="http://s2.ygimg.cn/template/common/images/loading.gif"> 处理中，请稍候...');
		//loadDiv.html('<img src="/template/common/images/loading16.gif" />');
		that.loadDiv=loadDiv;
		$("body").append(loadDiv);
		if(_isIE6){
			loadDiv.css({'top':loadDiv.offset().top+$(window).scrollTop()});
		}
		return that;
	},
	lock:function(){
		var that=this,config=that.config;
		if(!config.lock || $("#dialogMask").length>0) return that;
		var mask=$("<div>").addClass("dialogMask");
		if(_isIE6){
			mask.html('<iframe src="about:blank" style="width:100%;height:100%;position:absolute;top:0;left:0;z-index:-1;filter:alpha(opacity=0)"></iframe>');
		}
		$("body").append(mask);
		that.mask=mask;
		mask.height($(document).height());
		$(window).scroll(function(){
			mask.height($(document).height());
		});
		$(window).resize(function(){
			mask.height($(document).height());
		})
		return that;
	},
	// 强制覆盖IE6下拉控件
	ie6SelectFix:function () {
		var that=this,config=that.config;
		if(_isIE6 && !config.iframed)
		{
			var wrap = that.wrap,
				expando = _expando + 'iframeMask',
				w = wrap.width(),
				h = wrap.height();
	
			if ($("body").find("iframe").attr("id")==expando) {
				iframe.width(w);
				iframe.height(h);
			} else {
				iframe = $("<iframe>");
				iframe.attr({"id":expando,"src":"about:blank"});
				iframe.addClass('hackiframe').css({'position':'absolute','z-index':'-1','left':'0','top':'0','background':'#fff'});
				iframe.width(w);
				iframe.height(h);
				wrap.append(iframe);
			};
		}
	},
	title:function(text){
		var that=this,wrap=that.wrap,config=that.config;
		var tt=that.tt;
		if(_skin=="2"&& !config.title){
			tt.remove();
		}
		if(!config.closable){
			wrap.find(".uiClose").remove();
		}
		if(_skin=="1"){
			wrap.find(".uiClose").html("关闭");
		}
		if(_skin=="3"){
			wrap.find(".uiClose").html("关闭");
		}
		if(config.title){
			tt.html(text || config.title);
		}
		return that;
	},
	iframeLoaded:function(){
			var that=this,
			iframe=that.iframe,
			config=that.config,
			w,h,
			wrap=that.wrap;
			iframe.prev('p').remove();
			try{
				w=iframe.contents().width();
				h=iframe.contents().height();
			}catch(e){
				w=582;
				h=380;
			}
			if(config.width){
				w=config.width;
			}
			if(config.height){
				h=config.height;
			}
			iframe.width(parseInt(w)).height(parseInt(h));
			that.size(parseInt(w),parseInt(h));
			that.position(config.left,config.top);
			wrap.css({"visibility":"visible"});
			that.loadDiv.remove();
			if(typeof(config.loaded)=="function"){
				config.loaded();
			}
			return that;
	},
	content:function(text){
		var that=this,
		wrap=that.wrap,
		config=that.config,
		con=that.con;
		
		if(text){
			con.html(text);
			wrap.css({"visibility":"visible"});
			if(typeof(config.loaded)=="function"){
				config.loaded();
			}
		}
		
		//ajax load
		if(config.url &&!config.iframed){
			con.hide();
			con.load(config.url,function(responseTxt,statusTxt,xhr){
				if(statusTxt=="success"){
					setTimeout(function(){
					var w=con.width();
					var h=con.height();
					if(config.width){
						w=config.width;
					}
					if(config.height){
						h=config.height;
					}
					that.size(parseInt(w),parseInt(h)).position();
					con.show();
					wrap.css({"visibility":"visible"});
					that.loadDiv.remove();
					},500);
					if(typeof(config.loaded)=="function"){
						config.loaded();
					}
				  }
				});
		}
		
		//iframe load
		if(config.url &&config.iframed){
			var iframe = $("<iframe>");
			iframe.attr("src",config.url);
			iframe.attr("id","dialogIframe"+_count).attr("frameborder","0").attr("name","dialogIframe"+_count);
			iframe.attr("scrolling","auto").css({"width":"100%","height":"100%"});
			if (iframe[0].attachEvent){
				iframe[0].attachEvent("onload", function(){
						that.iframeLoaded();
				});
			} else {
				iframe[0].onload = function(){
						that.iframeLoaded();
						
				};
			}
		}
		con.append(iframe);
		that.iframe=iframe;
		that.ie6SelectFix();
		return that;
		
	},
	close:function(){
		var that=this;
		var wrap=that.wrap,config=that.config;
		var fn=config.close;
		if(typeof fn === 'function')
			config.close();
		wrap.remove();
		if(config.lock) that.unlock();
		if($.browser.version=="6.0"&&$.browser.msie){
			$("#hackDialogIframe").remove();
		}
		if(that.iframe){
			that.iframe.attr('src','about:blank');
			that.iframe.remove();
		}
		return that;
	},
	unlock:function(){
		var that=this;
		that.mask.remove();
		return that;
	},
	size:function(w,h){
		var that=this,
		con=that.con,
		config=that.config,
		wrap=that.wrap,
		wrapW=wrap.width(),
		minW=config.minWidth,
		minH=config.minHeight;
		var _w = con.width();
		var _h = con.height();
		var _titH=wrap.find('.dg_title').height();
		if(w){
			_w=w;
		}
		if(h){
			_h=h;
		}
		if(_w<minW){
			_w=minW;
		}
		if(_h<minH-_titH){
			_h=minH-_titH;
		}

		if(!config.url || w){
			con.width(_w);
		}
		if(!config.url || h){
			con.height(_h);
		}
		//chrome iframe hack
		if(config.url && h){
			con.css({'overflow':'hidden'});
		}
		
		if(_skin=="2"){
		    wrap.width(parseInt(_w)+6);
		}else if(_skin=="3"){
			wrap.width(parseInt(_w)+10)
		}else{
		    wrap.width(parseInt(_w)+2);
		}
		wrap.find('.dg_title').width(_w);
		wrap.height(parseInt(_h+_titH));
		return that;
	},
	position:function(left,top){
		var that=this,
		wrap =that.wrap,
		config=that.config,
		con=that.con,
		_sw=$(window).width(),
		_sh=$(window).height(),
		_w = con.width(),
		_h = con.height(),
		_titH=wrap.find('.dg_title').height();
		if(config.width){
			_w=config.width;
		}
		if(config.height){
			_h=config.height;
		}
		var posL=left||(_sw-_w)/2;
		var posT=top||(_sh-con.height()-_titH)/2;
		if(_isIE6 || !config.fixed){
			posT+=$(window).scrollTop();	
		}
		wrap.css({left:posL,top:posT,'margin-left':'0','margin-top':'0'});
		return that;
	},
	drag:function(){
		var that=this,
		wrap=that.wrap,
		drg=wrap.find('.dg_title'),
		bool=false,
		offsetX=0,
        offsetY=0;
		drg.bind('mousedown',function(event){
			bool=true;
			var _this=$(this);
			var ev=window.event || event;
			offsetX = ev.clientX-wrap.offset().left;
            offsetY =ev.clientY-wrap.offset().top;
            _this.addClass('dg_drag_handle');
		});
		drg.bind('mouseup',function(){
			bool=false;
			$(this).removeClass('dg_drag_handle');
		});
		$(document).mousemove(function(event){
            if(!bool)return;
			var ev=window.event || event;
			var x = ev.clientX-offsetX;
            var y = ev.clientY-offsetY;
			if(!_isIE6){
				x=x-$(window).scrollLeft();
				y=y-$(window).scrollTop();
			}
			var maxY=$(window).height()-wrap.height()-30;
			var maxX=$(window).width()-wrap.width();
			if(x<=0 || x>=maxX){return;}
			if(y<=0 || y>=maxY){return;}
            wrap.css({"left": x});
            wrap.css({"top": y});
         })
	}
};

ygDialog.fn.init.prototype = ygDialog.fn;
ygDialog.list = {};


/**
** 样式类型
?skin=1
**/
var _thisScript="";
(function (script, i, me) {
	for (i in script) {
		if (script[i].src && script[i].src.indexOf('ygdialog') !== -1) me = script[i];
	};
	_thisScript = me || script[script.length - 1];
}(document.getElementsByTagName('script')));
//_skin = _thisScript.src.split('skin=')[1];
if(typeof(_skin)=="undefined") _skin="1";

/**
** 载入css
**/
if ($("link[href*=ygdialog.css]").length == 0){
 var baseUrl="";
 if(typeof cdnUrl!="undefined"){
	 baseUrl=cdnUrl;
 }
 var strHref = $('link').eq(0).attr('href');
 var ver=strHref.split('?').pop();
 var css_href =baseUrl+'/template/common/css/ygdialog.css?'+ver;
 var styleTag = document.createElement("link");
 styleTag.setAttribute('type', 'text/css');
 styleTag.setAttribute('rel', 'stylesheet');
 styleTag.setAttribute('href', css_href);
 $("head")[0].appendChild(styleTag);
}


/**
** 对话框模板
**/
ygDialog.fn._templates =
'<div class="dialogSkin1">'
+'<div class="uiDiv">'
+'<table class="uiTable"><tbody><tr><td><div class="clearfix dg_title"><h3 class="uiTitle">&nbsp;</h3><a class="uiClose" href="javascript:;">&nbsp;</a></div></td></tr><tr><td><div class="dg_content"><p class="dg_loading"><image src="http://s2.ygimg.cn/template/common/images/loading16.gif" /></p></div></td></tr></tbody></table></div></div>';



/**
** 默认配置
**/
ygDialog.defaults = {
	close: null,// 对话框关闭前执行的函数
	loaded:null,//url加载完成回调
	lock: true,	// 是否锁屏
	closable:true, //是否允许关闭
	fixed:true,
	minHeight:100,
	minWidth:200,
	skin:1,
	drag:false
};

ygDialog.close=function(){};

window.ygDialog=ygDialog;
})();
var isYgDailogExist=true;