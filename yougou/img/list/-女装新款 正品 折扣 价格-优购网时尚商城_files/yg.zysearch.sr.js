//评论滚动
if($('#scrollDiv')[0]){
	(function($){
		$.fn.extend({
        	Scroll:function(opt,callback){
                //参数初始化
                if(!opt) var opt={};
                var _this=this.eq(0).find("ul:first");
                var lineH=_this.find("li:first").height(), //获取行高
                line=opt.line?parseInt(opt.line,10):parseInt(this.height()/lineH,10),
                speed=opt.speed?parseInt(opt.speed,10):500, //卷动速度，数值越大，速度越慢（毫秒）
                timer=opt.timer?parseInt(opt.timer,10):3000; //滚动的时间间隔（毫秒）
                if(line==0) line=1;
                var upHeight=0-line*lineH;
                //滚动函数
                scrollUp=function(){
                        _this.animate({
                                marginTop:upHeight
                        },speed,function(){
                                for(i=1;i<=line;i++){
                                        _this.find("li:first").appendTo(_this);
                                }
                                _this.css({marginTop:0});
                        });
                }
                //鼠标事件绑定
                _this.hover(function(){
                        clearInterval(timerID);
                },function(){
                        timerID=setInterval("scrollUp()",timer);
                }).mouseout();
        	}        
		})
	})(jQuery);

	$(function(){
        $("#scrollDiv").Scroll({line:2,speed:300,timer:5000});
	});
}

//resetlayout
function resetLayout(){
	if($(window).width()<1190){
		$('body').removeClass('selfadaptat');
	}else{
		$('body').addClass('selfadaptat');
	}		
}
$(function(){
	//自适应
	resetLayout();
	$(window).resize(resetLayout);
	//排序下拉菜单
	$(".list_select").hover(function(){
		$(this).addClass("lcurr").children(".list_select_show").show();	
	},function(){
		$(this).removeClass("lcurr").children(".list_select_show").hide();			
	});
	//图片懒加载
	$(".proList img").lazyload();
	//价格区间
    $(".fprice input").focus(function(){
        $(".fprice").addClass("fprice-hover");
        $(this).parents(".fpb-item").css("border","1px solid #ff5000");
    });
    $(".fprice input").blur(function(){
        $(this).parents(".fpb-item").css("border","1px solid #ccc");
    });
    $(".fprice").hover(function(){
        $("body").unbind("click");
    },function(){
        $("body").click(function(){
            $(".fprice").removeClass("fprice-hover");
        });
    });
    
    //-------------筛选器相关
    /*筛选条件很多时出现左右移动按钮*/
	var menu_width=$("#filterSelCon").width();
	var menucont_width=$("#filterTtCon").width();
	var fw=menu_width-menucont_width;
	var move=50;//每次移动步长
	var left=0;
	if(fw>0){
		//$("#filterTtlBtn,#filterTtrBtn").show();
		$("#filterTtrBtn").show();
		$("#filterTtlBtn").click(function(){
			left = parseInt($("#filterSelCon").position().left);
			if(left < 0){
				left = left + move;
				$("#filterSelCon").animate({left:left},100);
				if(left == 0){
					$("#filterTtlBtn").hide();
				}
				$("#filterTtrBtn").show();
			}else if(left ==0){
				return;
			}
		})
		$("#filterTtrBtn").click(function(){
			left=parseInt($("#filterSelCon").position().left);
			if(Math.abs(left) < fw){
				//菜单左坐标在当前值基础上减去预设的步长值
				left = left - move;
				$("#filterSelCon").animate({left:left},100);
				if(Math.abs(left) >= fw){
					$("#filterTtrBtn").hide();
				}
				$("#filterTtlBtn").show();
			}else if(Math.abs(left) >= fw){
				return;
			}
		})
	}else{
		$("#filterTtlBtn,#filterTtrBtn").hide();
	}
	
	//出判为冗余代码！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！begin
	/*点击多选*/
	/*$(".ygFilterCon .moreSelete").click(function(){
		var $dl=$(this).closest("#dl_hei");
		$(".ygFilterCon #dl_hei").addClass("defaultCat").removeClass("chooseList");
		//li元素显示
		$(this).prev("ul").find("li").show();
		setHeight();
		$dl.addClass("chooseList").removeClass("defaultCat").find("dd").height("100%");
		$(this).siblings(".moreLink").hide();
	});*/
	//出判为冗余代码！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！end

	//出判为冗余代码！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！begin
	/*取消多选*/
	/*$(".ygFilter_cz .cancel").click(function(){
		var dl=$(this).closest("#dl_hei");
		var li=dl.find(".catList li");
		var smt=dl.find(".ygFilter_cz .ygFilterSmt");
		//点击取消后复选框返回非选中状态、提交按钮返回不可用状态
		dl.removeClass("chooseList").addClass("defaultCat");
		li.removeClass("choosed");
		smt.removeClass("smt").addClass("noSmt");
		smt.attr("disabled","disabled");
		//设置取消多选后dd的默认高度
		setHeight();
		brand_en_name = [];
	});*/
	//出判为冗余代码！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！end
				
	/*复选框 、使多选中的提交按钮可用*/
	$(".chooseList .catList li a").live("click",function(){
		var has=$(this).parent().is(".choosed");
		if(has){
			$(this).parent().removeClass("choosed");
		}else{
			$(this).parent().addClass("choosed");	
		}
		showSmt($(this));
		return false;
	});
	function showSmt(e){
		var checkLength=e.closest(".chooseList").find(".catList .choosed").length;
		var ygFilterSmt=e.closest(".chooseList").find(".ygFilter_cz .ygFilterSmt");
		if(checkLength<=0){
			ygFilterSmt.removeClass("smt").addClass("noSmt");
			ygFilterSmt.attr("disabled","disabled");
		}else{
			ygFilterSmt.removeClass("noSmt").addClass("smt");
			ygFilterSmt.attr("disabled","");
		}
	}
	
	
	//出判为冗余代码！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！begin
	/*自动计算高度，为了加快渲染速度，请不要提到底部或者其他位置*/
	//setHeight();
	/*function setHeight(){
		$(".ygFilterCon #dl_hei").each(function(){
			var $self=$(this);
			var $dd=$self.find("dd");
			var height=$dd.height();
			var moreLink=$self.find(".moreLink");
			var default_height = 120;
			if($dd.find("ul").attr("name")=="seo_en_brand_name"){
				default_height = 120;
			}else{
				default_height = 60;
			}
			if(height>default_height){
				moreLink.show();
				if(moreLink.hasClass("up"))
				{
					$dd.height("100%");
				}
				else
				{
					$dd.height(default_height);
				}
			}
		});
	}*/
	//出判为冗余代码！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！end
	
	
	//更多、收起链接布局
	$(".ygFilterCon .moreLink").toggle(function(){
		var $self=$(this);
		var dl=$self.closest("#dl_hei");
		dl.find("dd").css({"height":"100%"});
		dl.find("dd").find("ul").find("li").show();
		$self.removeClass("down").addClass("up");
		$self.html("收起<i class=\"list_bg\"></i>");
		return;
	},function(){
		var $self = $(this);
		var dl=$self.closest("#dl_hei");
		if(dl.find("dd").find("ul").attr("name")=="seo_en_brand_name"){
			dl.find("dd").find("ul").find("li:lt(12)").show();
			dl.find("dd").height(120);
		}else{
			dl.find("dd").find("ul").find("li:lt(6)").show();
			dl.find("dd").height(60);
		}
		$self.removeClass("up").addClass("down");
		$self.html("更多<i class=\"list_bg\"></i>");
	});
	
	//筛选器  更多筛选内容
	$("#moreFilter").toggle(function(){
		var $self = $(this);
		$("#filterCon").find("dl:gt(8)").each(function(){
			$(this).show();
		});
		$self.html("收起<i>&nbsp;</i>").addClass("collapse").removeClass("expand");
		$("#filterCon").find("dl:last").css({"margin-bottom":"0"});
		$("#filterCon").css({"border-bottom-width":"0"});
		return;
	},function(){
		var $self = $(this);
		$("#filterCon").find("dl:gt(8)").each(function(){
			$(this).hide();
		});
		$self.html("更多<i>&nbsp;</i>").addClass("expand").removeClass("collapse");
		$("#filterCon").find("dl:last").css({"margin-bottom":"-1px"});
		$("#filterCon").css({"border-bottom-width":"1px"});
		return;
	});
		
	$(".ygFilterCon dl").hover(function(){
		//$(this).css({"border-bottom-style":"solid"});
	},function(){
		//$(this).css({"border-bottom-style":"dotted"});
	})
	//---------------排序相关
	$(".ui-btn-s").click(function(){
        $(".fprice input").val("");
    });
    $(".ui-btn-s-primary").click(function(){
    	var url = getBaseLink() ;
    	var minPrice = $("#minPrice").val();
    	var maxPrice = $("#maxPrice").val();
    	var mctcd = $("#mctcd").val();
    	var storeId = $("#storeId").val();
    	if(!minPrice && !maxPrice && !mctcd){ 
    		location.href= url;
    		return;
    	}
    	var last = url[ url.length - 1 ] ;
    	if( last != '?' && last != '&' ) {
    		if( url.indexOf('?') == -1 ) url += "?";
    		else url += '&' ;
    	}
    	var params =[]
		if(minPrice) params.push("minPrice=" + minPrice)
		if(maxPrice) params.push("maxPrice=" + maxPrice)
		if(mctcd) params.push("mctcd=" + mctcd)
		if(storeId) params.push("storeId=" + storeId)
		var p = "";
    	for(var i = 0; i < params.length; i++){
    		p += params[i];
    		if(i != params.length - 1) p += "&";
    	}
		location.href = url + p;
    });

    //---------------------- begin 当年新款，专柜同款 搜索选项------------------
    $("#shoppeStyleBtn").click(function(){
    	var t = $(this),
    		shoppeVal = $("#shoppePro").val();

    	if(t.hasClass("checked")){
    		t.removeClass("checked");
    	}else{
    		t.addClass("checked");
    	}
    	createShoppeSeasonLink(shoppeVal);
    	return false;
    });

    $("#seasonStyleBtn").click(function(){
    	var t = $(this),
    		seasonVal = $("#seasonPro").val();

    	if(t.hasClass("checked")){
    		t.removeClass("checked");
    	}else{
    		t.addClass("checked");
    	}
    	createShoppeSeasonLink(seasonVal);
    	return false;
    });

    //当年新款、专柜同款 url生成
    function createShoppeSeasonLink(no){
    	var url = $("#baseLink").val(),
    		urlArry = url.split("-");

    	//判断是过滤器页面还是关键字页面
    	url = urlArry.length < 3 ? searchKeyShoppeSeasonLink(url, no) : filterShoppeSeasonLink(urlArry, no);
    	if(url.length > 0) window.location.href = url;
    }

    //过滤器搜索url生成
    function filterShoppeSeasonLink(urlArry, no){
    	var attr = urlArry[2].split("_");
		mergeAttr(attr, no);
    	urlArry[2] = attr.join("_") || "0";
    	var order = $('#orderBy').val();
    	var query = $("#queryParams").val();
		if(order) urlArry.push( order ) ;
		var url = "/f-" + urlArry.join("-") + ".html";
		if(query) url += "?" + query;
		return url;
    }

    //关键字搜索url生成
    function searchKeyShoppeSeasonLink(url, no){
		var query = $('#queryStr').val(),
			price = $('#price_area').val(),
			order = $('#orderBy').val(),
			mctcd = $("#mctcd").val(),
			storeId = $("#storeId").val(),
			queryArry = query.split("&"),
			attr = "",
			attrIndex = 0,
			catNo = "",
			catNoIndex = 0;

		//找出属相项和数组中的索引值
		for(var x = 0; x < queryArry.length; x++){
			if(queryArry[x].indexOf("attrStr") > -1){
				attrIndex = x;
				attr = queryArry[x];
			}

			if(queryArry[x].indexOf("catgNo") > -1){
				catNoIndex = x;
				catNo = queryArry[x];
			}
		}

		//将属性分割成数组
		var attrArry = attr.split("=").length > 1 ? attr.split("=")[1].split("_") : [];
		//将指定属性项在数组中做加/减操作
		mergeAttr(attrArry, no);
		//新属性数组替换query中的属性（空数组则删除此参数）
		if(attrArry.length > 0) queryArry[attrIndex] = "attrStr=" + attrArry.join("_"); else queryArry.splice(attrIndex,1);
		
		//将其他参数组合到url中
		if(order) order = '&orderBy=' + order ;
		if(mctcd) mctcd = '&mctcd=' + mctcd;
		if(storeId) storeId = '&storeId=' + storeId;
		query = queryArry.join( '&' );
		if(query.length > 0 && query.indexOf('&') != 0) query = '&' + query;

		url = url + query + ( order || '' ) + ( price || '' ) + ( mctcd || '' ) + ( storeId || '');
    	return url;
    }

    //加/减属性项
    function mergeAttr(attr, no){
    	//当编码大于3位（为6位）时删除属性数组中的此项
    	if(no.length > 3){
    		var delFlag = -1;
    		for(var x = 0; x < attr.length; x++){
    			if(attr[x].indexOf(no.substring(0,3)) > -1){
    				delFlag = x;
    			}
    		}
    		if(delFlag > -1){
    			attr.splice(delFlag, 1);
    		}
    	}else{
    		//当编码为3位时，将此属性编码加到数组中（后跟3个0代表属性值为000）
    		for(var x = 0; x < attr.length; x++){
    			if(attr[x].indexOf(no) > -1) return "";
    		}
    		if(attr.length == 1 && attr[0] == "0"){
    			attr[0] = no + "000";
    		}else{
    			attr.push(no + "000");
    		}
    	}
    	return attr;
    }
    //---------------------- end 当年新款，专柜同款--------------------
    
    //--------------搜索结果相关
    //跳转到某页
	function jumpPage(){
		var toPage = $("#jumpToPage").val();
		if(!toPage){
			$("#jumpToPage").focus();
			return;
		}
		if(!/^[1-9]\d*$/.test(toPage)){
			$("#jumpToPage").val("");
			$("#jumpToPage").focus();
			return;
		}
		if(toPage<1){
			toPage = 1;
		}
		toPage = Number( toPage ) ;
		var pageCount = Number( $("#pageCount").val() ) ;
		if(toPage > pageCount ){
			toPage = pageCount ;
		}
		url = getPageUrl( toPage ) ;
		window.location=url;
	}
	var v = $("#jumpToPage").val();
	$(document).click(function( e ){
		obj = $(e.srcElement || e.target);
		if (obj.attr('id') == 'jumpToPage'){
			$("#jumpToPage").val("");
		}else if(obj.attr('class') == 'gbtn'){
			jumpPage();
		}else{
			$("#jumpToPage").val(v);
		}
		
	});
});
var brand_en_name = [];

function addBrand(brand){
	if($.inArray(brand,brand_en_name)==-1){
		brand_en_name.push(brand);
	}else{
		brand_en_name.splice(jQuery.inArray(brand,brand_en_name),1); 
	}
}
function searchBrand(){
	var url = $("#baseLink").val();
	url = url.substring(url.indexOf("-"));
	url = "/f-" + brand_en_name.join("_") + url;
	url += ".html";
	if($("#queryStr").val()){
		url += "?"+$("queryStr").val();
	}
	window.location.href=url;
}

function searchKeyBrand(){
	var url = $("#baseLink").val();
	if( brand_en_name.length == 0 ) return ;
	var q = brand_en_name.join( '_' ) ;
	q = 'brandEnName=' + q ;
	if( url.indexOf( '?' ) == -1 ) url = url + '?' + q ;
	else url = url + '&' + q ;
	window.location.href=url;
}

function getPageUrl( toPage ){
	var url = "/f-" + $("#baseLink").val();
	url += "-"+$("#orderBy").val();
	url += "-" + toPage;
	url += ".html";
	if($("#queryParams").val()){
		url += "?"+$("#queryParams").val();
	}
	return url ;
}

function getBaseLink(){
	return '/f-' + $("#baseLink").val() + ".html";
}

function loadKeyData(param, keyword){
	tag++;
	$.ajax({
		type: "POST",
		url: "/sr/searchKeyAjax.sc",
		dataType:'json',
		data: param + "&tag=" + tag,
		success: function(json){
			if(json.length > 0){
				var list = json[0].resultList,
					count = list.length,
					i= 0, commodityNos = [];
				for( ; i < count; i++){
					commodityNos.push(list[i].commodityNo);
					combination(list[i], keyword);
				}
				commodity_mark(commodityNos.join(","));
				$list = $("#proList li");
				ajaxSign = true;
			}
		},
		error: function(){
			console.log('error');
		}
	});
}

function loadFilterData(param){
	tag++;
	$.ajax({
		type: "POST",
		url: "/sr/searchFilterAjax.sc",
		dataType:'json',
		data: param + "&tag=" + tag,
		success: function(json){
			if(json.length > 0){
				var list = json[0].resultList,
					count = list.length,
					i= 0, commodityNos = [];
				for( ; i < count; i++){
					commodityNos.push(list[i].commodityNo);
					combination(list[i]);
				}
				commodity_mark(commodityNos.join(","));
				$list = $("#proList li");
				ajaxSign = true;
			}
		},
		error: function(){
			console.log('error');
		}
	});
}


function getParameForFilter(){
	var baseLink=$('#baseLink').val();
	var queryStr=$('#queryStr').val();
	var orderBy=$('#orderBy').val();
	var mctcd=$('#mctcd').val();
	var storeId=$('#storeId').val();
	var query="";

	var sp=baseLink.split('-');
	if(sp&&sp.length>0){
		query +="brandEnName="+sp[0];
		query +="&catgNo="+sp[1];
		query +="&attrStr="+sp[2];

	}else{
		query +="&brandEnName=";
		query +="&catgNo=";
		query +="&attrStr=";
	}
	query +="&pageNo=" + + currentPage;

	query +="&"+queryStr;
	query +="&orderBy="+orderBy;
	query +="&mctcd="+mctcd;
	query +="&storeId="+storeId;
	return query;
}

function getParameForKey(keyword){
	var param = window.location.href.split("searchKey.sc?")[1];
	if(param.indexOf("pageNo") < 0) {
		param += "&pageNo=" + currentPage;
	}

	return param;
}

function combination(commodity, keyword){
	var temp ='<li>', ygPrice = '';
	temp +='<div class="srchlst-wrap">';
	temp +='<div class="hd">';
	if(keyword == '' || keyword == null || typeof keyword == "undefined") {
		temp +='<a target="_blank" href="/'+commodity.pageUrl+'.shtml#ref=list&po=list">';
	}else {
		temp +='<a target="_blank" href="/'+commodity.pageUrl+'.shtml#ref=search&po=' + keyword + '">';
	}
	temp +='<sup no="'+commodity.commodityNo+'" class="mark_small_'+commodity.commodityNo+' salepic"></sup>';
	temp +='<img width="240" height="240" alt="'+commodity.commodityName+'" class="lazy_loading" src="' +
		staticRoot + '/template/common/images/blank.gif" original="'+commodity.imgUrl+'" />';
	if(commodity.siteType == "2") {
		temp += '<div class=" poston"></div>';
	}
	temp +='</a>';
	temp +='</div>';
	temp +='<div class="bd">';
	temp +='<span class="nptt">';
	if(keyword == '' || keyword == null || typeof keyword == "undefined") {
		temp +='<a target="_blank" href="/'+commodity.pageUrl+'.shtml#ref=list&po=list" title="' +
			commodity.commodityName+'">'+commodity.commodityName+'</a></span>';
	}else {
		temp +='<a target="_blank" href="/'+commodity.pageUrl+'.shtml#ref=search&po=' + keyword +
			'" title="' + commodity.commodityName+'">'+commodity.commodityName+'</a></span>';
	}
	temp +='<p class="price_sc">';
	if(commodity.activeType == '16' &&
		commodity.ygPrice != '' && commodity.ygPrice != null && typeof commodity.ygPrice != "undefined"){
		ygPrice = commodity.ygPrice;
	}else{
		ygPrice = commodity.salePrice;
	}

	temp +='<em class="ygprc15 price_no' + commodity.commodityNo + '">&yen;<i>' + ygPrice + '</i></em>';
	temp +='<del>&yen;' + commodity.marketPrice + '</del>';
	temp +='</p>';
	temp +='</div>';
	temp +='</div>';
	temp +='</li>';
	$("#proList").append(temp);
	$(".proList img").lazyload();
	temp = null;
}



