/*相关分类-->鼠标划过 显示/隐藏层效果*/
    $(document).ready(function(){
        var documentWidth_ = $(document).width(); //页面应有的宽度
		$(".ygFilterCon").css("width","auto");
		returnTop();
        $(".nanXie").mouseenter(function(){
            $(this).find(".nantype").show();
            $(this).find(".nanT").addClass("nanTnew");
            $(this).find(".list_bgico").addClass("list_bgnew");
			$(this).closest("#id_hei").css("border-bottom-style","dotted");	
			
			
			/*筛选项下拉菜单高度由滚动条控制*/
			$(this).find("ul").css("paddingBottom","0px");
			var more_checknum = $(this).find(".nantype ul li").length;	
			if(more_checknum > 32){
				$(this).find(".nantype ul").css({"height":"240px","overflowY":"auto"});
				
			}
			
			
				
			/*--------------更多筛项每项的z-index值 start----------*/
			var nxnum = $(this).parent(".xtype").find(".nanXie").length; //nanXie的个数;
			for(var i=0;i<nxnum;i++){
				$(this).css("zIndex",99999);
				$(this).css("_zIndex",99999);
			}
			/*--------------更多筛项每项的z-index值 end----------*/			
			
			/*--------------更多筛项左移宽度值 start----------*/
			var windowWidth = $(window).width();//浏览器当前窗口可视区域宽度
			var documentWidth = $(document).width();//浏览器当前窗口文档对象宽度
			
			/*左边浏览器距页面内容左边的宽度*/ 
			if(documentWidth > documentWidth_){
				if(windowWidth>1190){ //浏览器当前可视区域窗口大于1190时
					var ll_width = (windowWidth-1190)/2;
					var leftwidth = documentWidth-1190-ll_width;
					$(this).find(".nantype").css("left",-leftwidth+"px");
				}else if(windowWidth==1190){//浏览器当前可视区域窗口等于1190时
					var leftwidth = documentWidth - 1190;
					$(this).find(".nantype").css("left",-leftwidth+"px");
				}else if(windowWidth<1190 && windowWidth<990){//浏览器当前可视区域窗口小于1190并大于990时
					var leftwidth = documentWidth - windowWidth;
					$(this).find(".nantype").css("left",-leftwidth+"px");
				}else if(windowWidth<990){//浏览器当前可视区域窗口小于990时
					var leftwidth = documentWidth-990;
					$(this).find(".nantype").css("left",-leftwidth+"px");
				}
				
			}else{
				$(this).find(".nantype").css("left",-leftwidth+"px");
			}
    		/*--------------更多筛项左移宽度值 end----------*/
			
			
		});
			
			
			
        
        $(".nanXie").mouseleave(function(){
            $(this).find(".nantype").hide();
            $(this).find(".nanT").removeClass("nanTnew");
            $(this).find(".list_bgico").removeClass("list_bgnew");

			/*--------------更多筛项每项的z-index值 start----------*/
			var nxnum = $(this).parent(".xtype").find(".nanXie").length; //nanXie的个数;
			for(var i=0;i<nxnum;i++){
				$(this).css("zIndex",9);
				$(this).css("_zIndex",9);
			}
			/*--------------更多筛项每项的z-index值 end----------*/
        });
    });

    //返回页面顶部
    function returnTop(){
        if($('#fixedRight').length==0){
            $('<div id=\"return_top\"><div class=\"bg\"></div><div class=\"pic\"></div></div>').appendTo('body');
            var option={
                element:$('#return_top'),
                startPos:$(window).height()-50,
                endPos:$('.footser').offset().top-10,
                l:595
            }
            var retTop = new FixedElement(option);
            retTop.setX=function(){
                var winWidth=$(window).width();
                if((winWidth-1190)/2<50) {
                    var left=winWidth-50;
                    $(this.elem).css('left',left+'px');
                } else {
                    var pos=winWidth / 2;
                    var left=pos+this.l;
                    $(this.elem).css('left',left+'px');
                }
            }
            retTop.init();
            $('#return_top').bind('click',function(){
                $('html,body').stop(true,true).animate({scrollTop:0},500);
            });
        }
    }

    /*---------页面的多数多选效果start------------*/
    /*点击多选*/
    $(".ygFilterCon .moreSelete").unbind('click').click(function(){
		$(this).parent().find(".more_Link").hide();
        var $dl=$(this).closest("dl");
        $dl.addClass("defaultCat").removeClass("chooseList");
        //li元素显示
        $(this).prev("ul").find("li").show();
        setHeight();
        $dl.addClass("chooseList").removeClass("defaultCat").find("dd").height("100%");
        $(this).siblings(".moreLink").hide();
		
        /*var arrBrandlist=$('.crumbss .propt .brandlist').attr('list').split('-');
        $(arrBrandlist).each(function(i,n){
            $('.chooseList .catList li[name='+n+']').addClass('choosed');
        });*/
    });



    /*取消多选*/
    $(".ygFilter_cz .cancel").click(function(){
		$(this).parent().next(".more_Link").show();
        var dl=$(this).closest("dl");
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
        $(this).find("#checkeds").removeClass("pinp_checked");
    });


    /*自动计算高度，为了加快渲染速度，请不要提到底部或者其他位置*/
    //setHeight();
    function setHeight(){
        $(".ygFilterCon #gdhei").each(function(){
            var $self=$(this);
            var $dd=$self.find("dd");
            var height=$dd.height();
            var moreLink=$self.find(".moreLink");
            var default_height = 50;
            if($dd.find("ul").attr("name")=="seo_en_brand_name"){
                default_height = 50;
            }else{
                default_height = 25;
            }
            if(height>default_height){
                moreLink.show();
                if(moreLink.hasClass("up")) {
                    $dd.height("100%");
                } else {
                    $dd.height(default_height);
                }
            }
        });
    }
    /*---------页面的多数多选效果end------------*/




    /*---------页面中的二级选项中的多选效果start------------*/
    /*第二级多选JS*/
    /*点击多选*/
    var th_pas;
    $(".nantype .moreChecked").unbind('click').click(function(){
        th_pas = $(this).parent().prev(".catList");
        th_pas.find(".catlist_li a i").css("visibility","visible");
        th_pas.parent().addClass("yesCheck").removeClass("noCheck");
    })


    /*取消多选*/
    $(".choosebtn .check_btnQuit").click(function(){
        //var yche=$(".choosebtn").closest(".yesCheck");
        var yche=$(this).parent(".choosebtn").closest(".yesCheck");
        var li=yche.find(".catList .catlist_li");
        var smt=yche.find(".choosebtn .check_btnSure");
        //点击取消后复选框返回非选中状态、提交按钮返回不可用状态
        yche.removeClass("yesCheck").addClass("noCheck");
        li.removeClass("check_li");
        smt.addClass("noSmt");
        th_pas.find(".catlist_li a i").css("visibility","hidden");
        smt.removeAttr("disabled","");
        th_pas.find(".catlist_li a").css("color","#666");
        //th_pas.find(".catlist_li .moreChecked").removeAttr("color");
		th_pas.find(".nantype .moreChecked").removeAttr("color");
		
    });


    /*点击复选框 、使多选中的提交按钮可用*/
    $(".yesCheck .catList .catlist_li a").live("click",function(){
        var has=$(this).parent().is(".check_li");
        if(has){
            $(this).parent().removeClass("check_li");
            $(".nantype .catList li a").css("color","#666");
        }else{
            $(this).parent().addClass("check_li");
        }
        showsub($(this));
        return false;
    });
    function showsub(e){
        var checkLength=e.closest(".yesCheck").find(".catList .check_li").length;
        var ygFilterSmt=e.closest(".yesCheck").find(".choosebtn .check_btnSure");
        var class_name = ".nantype .choosebtn .check_btnSure";
        if(checkLength <= 0){
            $(".nantype .catList li a").css("color","#666");
            ygFilterSmt.removeClass("i_checked").addClass("noSmt");
            $(class_name).attr("disabled","disabled");
        } else {
            ygFilterSmt.removeClass("noSmt");
            $(class_name).removeAttr("disabled","");
            $(".nantype .catList .check_li a").css("color","#ff5000");
        }
    }
    /*---------页面中的二级选项中的多选效果end------------*/




    /*---------页面品牌图片与文字互换的多选效果start------------*/
    /*品牌--点击多选*/
    $(".pinpai_dd .more-Selete").unbind("click").click(function(){
        var $dl=$(this).closest("dl");
        //$(".ygFilterCon dl").addClass("defaultCat").removeClass("chooseList");
        $(this).parent(".list_pp_dl").addClass("defaultCat").removeClass("chooseList");
        //li元素显示
        $(this).prev("ul").find("li").show();
        pp_setHeight();
        $dl.addClass("chooseList").removeClass("defaultCat").find("dd").height("100%");
        $(this).siblings(".more_Link").hide();
        $(".ygFilterCon .pinpai_dd .list_pp_word").css("display","block");
        $(".ygFilterCon .pinpai_dd .list_pp_pic").css("display","none");
		
    })

    /*品牌--取消多选*/
    $(".ygFilter_cz .cancel_quit").click(function(){
        var dl=$(this).closest("dl");
        var li=dl.find(".catList li");
        var smt=dl.find(".ygFilter_cz .ygFilterSmt");
        //点击取消后复选框返回非选中状态、提交按钮返回不可用状态
        dl.removeClass("chooseList").addClass("defaultCat");
        li.removeClass("choosed");
        smt.removeClass("smt").addClass("noSmt");
        smt.attr("disabled","disabled");
        //设置取消多选后dd的默认高度
        pp_setHeight();
        brand_en_name = [];
        $(".ygFilterCon .pinpai_dd .list_pp_pic").css("display","block");
        $(".ygFilterCon .pinpai_dd .list_pp_word").css("display","none");
        $(".ygFilterCon .more_Link").removeClass("up").addClass("down");
        //$(".ygFilterCon .more_Link").html("更多<i class=\"list_bg\"></i>").show();
        $(this).parent().next(".more_Link").html("更多<i class=\"list_bg\"></i>").show();
        $(".ygFilterCon .pinpai_dd .list_pp_word").css("display","none");
    });

	
	
    /*品牌--自动计算高度，为了加快渲染速度，请不要提到底部或者其他位置*/
    //pp_setHeight();
    function pp_setHeight(){
        $(".ygFilterCon .list_pp_dl").each(function(){
            var $self=$(this);
            var $dd=$self.find(".pinpai_dd");
            var height=$dd.height();
            //alert(height);
            var moreLink=$self.find(".more_Link");
            var default_height = 120;
            if($dd.find("ul").attr("name")=="seo_en_brand_name"){
                default_height = 120;
            }else{
                default_height = 60;
            }
            if(height>default_height){
                moreLink.show();
                if(moreLink.hasClass("up")) {
                    $dd.height("100%");
                } else {
                    $dd.height(default_height);
                }
            }

        });
    }
	

    //更多、收起链接布局
    $(".ygFilterCon .more_Link").toggle(function(){
        var $self=$(this);
        var dl=$self.closest("dl");
        dl.find("dd").css({"height":"100%"});
        dl.find("dd").find("ul").find("li").show();
        $self.removeClass("down").addClass("up");
        $self.html("收起<i class=\"list_bg\"></i>");
        if(dl.find("ul.list_pp_pic").length!=0){
            $(".ygFilterCon .pinpai_dd .list_pp_pic").css("display","none");
            $(".ygFilterCon .pinpai_dd .list_pp_word").css("display","block");
        }
        return;
    },function(){
        var $self = $(this);
        var dl=$self.closest("dl");
        if(dl.find("dd").find("ul").attr("name")=="seo_en_brand_name"){
            dl.find("dd").find("ul").find("li:lt(12)").show();
            dl.find("dd").height(60);
        }else{
            dl.find("dd").find("ul").find("li:lt(6)").show();
            dl.find("dd").height(25);
        }
        $self.removeClass("up").addClass("down");
        $self.html("更多<i class=\"list_bg\"></i>");
		if(dl.find("ul.list_pp_pic").length!=0){
        	$(".ygFilterCon .pinpai_dd .list_pp_pic").css("display","block");
        	$(".ygFilterCon .pinpai_dd .list_pp_word").css("display","none");
		}
    });
    /*---------页面品牌图片与文字互换的多选效果end------------*/


    /*--------------女鞋下拉菜单 start----------*/
    $(document).ready(function(){
        $(".a_posi").mouseenter(function(){
            if($(this).find(".nx_radio").html() == null) {
                return ;
            }
            $(this).find(".bjname").addClass("aa_hover");
            $(this).find(".nx_radio").show();
			
			var a_width = $(this).width();//面包屑的某个搜索项的宽度值
			var down_width = $(this).find(".nx_radio").width();//面包屑的某个搜索项下拉列表的宽度值
			var down_sj_width = a_width-2;
			if(a_width>down_width){
				$(this).find(".nx_radio").css("width",down_sj_width+"px");
			} else {
				$(this).find(".nx_radio").css("width","auto");
			}
        });

        $(".a_posi").mouseleave(function(){
            $(this).find(".bjname").removeClass("aa_hover");
            $(this).find(".nx_radio").hide();
        });

        /*高度自适应，内容过多时出现滚动条*/
        var li_num = $(".auto_height").find("li").length;
        if(li_num>7){
            $(".auto_height").addClass("gdheight");
        }else{
            $(".auto_height").addClass("frheight");
        }
		
		
    });
	
	
	
	
	
	
	
    /*--------------女鞋下拉菜单 end----------*/
	
	
	/*--------------筛选项下拉菜单高度由滚动条控制 start----------*/
	
	
	/*--------------筛选项下拉菜单高度由滚动条控制 end----------*/
	
	
	/*--------------20150906 搜索页面暂时修改 start----------*/
//	$(document).ready(function(){
//		$(".ygFilterCon").find(".list_pp_pic").hide();
//		$(".ygFilterCon").find(".list_pp_word").show();
//		$(".pinpai_dd").find(".more_Link").hide();
//		$(".ygFilterCon .pinpai_dd .list_pp_word").css("height","auto");
//		
//		
//		var ppname_num = $(".list_pp_dl .pinpai_dd ul li").length;
//		if(ppname_num>18){
//			$(".list_pp_dl .pinpai_dd .list_pp_word").css("height",75+"px");
//			$(".list_pp_dl .pinpai_dd .list_pp_word").css("overflowY","auto");
//		} else{
//			
//		}
//		var dl_hei = $(".list_pp_dl .pinpai_dd").height()-5;
//		$(".ygFilterCon .list_pp_dl dt").css({"height":"auto","lineHeight":dl_hei+"px"});
//	});
	
	/*品牌--取消多选*/
//    $(".ygFilter_cz .cancel_quit").click(function(){
//		//alert("123");
//        var dl=$(this).closest("dl");
//        var li=dl.find(".catList li");
//        var smt=dl.find(".ygFilter_cz .ygFilterSmt");
//        //点击取消后复选框返回非选中状态、提交按钮返回不可用状态
//        dl.removeClass("chooseList").addClass("defaultCat");
//        li.removeClass("choosed");
//        smt.removeClass("smt").addClass("noSmt");
//        smt.attr("disabled","disabled");
//        //设置取消多选后dd的默认高度
//        pp_setHeight();
//        brand_en_name = [];
//        $(".ygFilterCon .pinpai_dd .list_pp_word").css("display","block");
//        $(".ygFilterCon .pinpai_dd .list_pp_pic").css("display","none");
//        $(".ygFilterCon .more_Link").removeClass("up").addClass("down");
//        $(".ygFilterCon .more_Link").html("更多<i class=\"list_bg\"></i>").hide();
//        //$(".ygFilterCon .pinpai_dd .list_pp_word").css("display","none");
//    });
	/*--------------20150906 搜索页面暂时修改 end----------*/