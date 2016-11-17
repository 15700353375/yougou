YouGou.goods={};
var YGG = YouGou.goods,autoWords,ygDialog,adressArr,selectGoodNo,glimitbuyMaxNum,gIsSpecialUser,show_deliver_time,commodityStatus,stock,_gaq;
//评论用
var pageSize = 10,pageNo = 0,totalCount = 0,pageCount = 0;
//购物车推荐商品
var shopNum = 1, collectionNum = 1;
//点评或收藏弹出登录框  1:点评、2:收藏 0、闪购协议
var loginByComntOrFav = 0;
var goodsbar_top;
//购物车、添加收藏推荐商品声明变量
var yg_dialog_bind,timer;
var resNow;
//
var dspattrnum = 0;
if($('.goods_lc')[0]){
    goodsbar_top = $('.goods_lc').offset().top;
}
(function($){
//滚动翻屏效果
    $.fn.funMove=function(opt){
        var opts = $.extend({
            btnPre:null,
            btnNxt:null,
            moveStep:5,
            isChangeSrc:true,
            isAnimate:false,
            iWidth:0,
            moveWidth:0,
            maxLeft:0,
            maxWidth:0,
            iPage:0,
            time:500,
            bShowPage:false
        },opt||{})
        return this.each(function(i,n){
            var oThis = this,$this = $(this),$li = $this.children();
            //opts.isAnimate=false;
            if(opts.isAnimate){
                opts.iWidth=$li.width()+13;
                opts.moveWidth = opts.iWidth*opts.moveStep;
                opts.iPage = Math.ceil($li.length/opts.moveStep);
                opts.maxWidth = opts.iPage*opts.moveWidth;
                opts.maxLeft = opts.maxWidth-opts.moveWidth-1;
                $this.width(opts.maxWidth);
            }
            var dParent = $(this).parents('.goodsTjCon:first'),curPage=1;
            var btnPre = opts.btnPre==null? dParent.find('.prevBtn') : opts.btnPre;
            var btnNxt = opts.btnNxt==null? dParent.find('.nextBtn') : opts.btnNxt;
            if(opts.isAnimate&&opts.bShowPage){
                dParent.append('<p class="funmove-page" style="position:absolute;top:0;right:10px;top:0;color:#aaa">第 <span>1</span> 页，共 '+opts.iPage+' 页</p>');
            }
            btnNxt.bind('click',function(){
                if(opts.isChangeSrc){
                    $('img',oThis).each(function(){
                        var $this = $(this),src=$this.attr('src'),ori=$this.attr('original');
                        if(src!=ori){
                            $this.attr('src',ori);
                        }
                    });
                    opts.isChangeSrc = false;
                }
                if(opts.isAnimate){
                    $(oThis).stop(true,true);
                    var curLeft = $(oThis).position().left;
                    $(oThis).animate({left:'-='+opts.moveWidth+'px'},opts.time,'swing',function(){
                        //加1解决IE下先点左再点右时候的判断错误，会翻空白页
                        if(curLeft<=-opts.maxLeft+1){
                            $(oThis).css('left',0);
                            curPage=1;
                        }else{
                            curPage++;
                        }
                        dParent.find('.funmove-page>span').html(curPage);
                    });
                }else{
                    $(oThis).children().slice(0,opts.moveStep).appendTo(oThis);
                }
            }).select(function(){return false;});
            btnPre.bind('click',function(){
                if(opts.isChangeSrc){
                    $('img',oThis).each(function(){
                        var $this = $(this),src=$this.attr('src'),ori=$this.attr('original');
                        if(src!=ori){
                            $(this).attr("src",ori);
                        }
                    })
                    opts.isChangeSrc = false;
                }
                if(opts.isAnimate){
                    $(oThis).stop(true,true);
                    var curLeft = $(oThis).position().left;
                    //alert(opts.maxLeft+'-----当前'+curLeft)
                    $(oThis).animate({left:'+='+opts.moveWidth+'px'},opts.time,'swing',function(){
                        if(curLeft>=0){
                            $(oThis).css('left',-opts.maxLeft+'px')
                            curPage=opts.iPage;
                        }else{
                            curPage--;
                        }
                        dParent.find('.funmove-page>span').html(curPage);
                    });
                }else{
                    var index = $(oThis).children().length-opts.moveStep;
                    $(oThis).children().slice(index).prependTo($(oThis));
                }
            }).select(function(){return false;});
        });
    }
})(jQuery);

(function($){
//右边看了又看滚动效果
    $.fn.slideMove=function(opt){
        var opts = $.extend({
            btnPre:null,
            btnNxt:null,
            moveStep:3,
            isChangeSrc:true,
            isAnimate:false,
            iHeiht:0,
            moveHeight:0,
            maxTop:0,
            maxHeight:0,
            iPage:0,
            time:500,
            bShowPage:false
        },opt||{})
        return this.each(function(i,n){
            var oThis = this,$this = $(this),$li = $this.children(),len=$li.length;
            //opts.isAnimate=false;
            if(opts.isAnimate){
                opts.iHeiht=$li.height();
                opts.moveHeight = opts.iHeiht*opts.moveStep;
                // opts.iPage = Math.ceil($li.length/opts.moveStep);
                opts.iPage = Math.floor($li.length/opts.moveStep); //向下取整来保证每页的商品都是满的．
                opts.maxHeight = opts.iPage*opts.moveHeight;
                opts.maxTop = opts.maxHeight-opts.moveHeight-1;
                $this.height(opts.maxHeight);
            }
            var dParent = $(this).parents('.look_goods:first'),curPage=1;
            var btnPre = opts.btnPre==null? dParent.find('.look-switchable-prev-btn') : opts.btnPre;
            var btnNxt = opts.btnNxt==null? dParent.find('.look-switchable-next-btn') : opts.btnNxt;
            if(opts.isAnimate&&opts.bShowPage){
                dParent.append('<p class="funmove-page" style="position:absolute;top:0;right:10px;top:0;color:#aaa">第 <span>1</span> 页，共 '+opts.iPage+' 页</p>');
            }
            btnNxt.bind('click',function(){
                if(opts.isChangeSrc){
                    $('img',oThis).each(function(){
                        var $this = $(this),src=$this.attr('src'),ori=$this.attr('original');
                        if(src!=ori){
                            $this.attr('src',ori);
                        }
                    });
                    opts.isChangeSrc = false;
                }
                if(opts.isAnimate){
                    $(oThis).stop(true,true);
                    var curTop = $(oThis).position().top,tmpArr = [];
                    if(curPage==opts.iPage){
                        $li.each(function(i,v){
                            if(i<3){
                                var tmpLi = $(v).clone(true).addClass('isClone')
                                tmpArr.push(tmpLi);
                                $this.append(tmpLi);
                            }
                        });
                    }
                    $(oThis).animate({top:'-='+opts.moveHeight+'px'},opts.time,'swing',function(){
                        //加1解决IE下先点左再点右时候的判断错误，会翻空白页
                        // if(curTop<=-opts.maxTop+1){
                        if(curPage==opts.iPage){
                            $(oThis).css('top',0);
                            $(oThis).children('.isClone').remove()
                            curPage=1;
                        }else{
                            curPage++;
                        }
                        // dParent.find('.funmove-page>span').html(curPage);
                    });
                }else{
                    $(oThis).children().slice(0,opts.moveStep).appendTo(oThis);
                }
            }).select(function(){return false;});
            btnPre.bind('click',function(){
                if(opts.isChangeSrc){
                    $('img',oThis).each(function(){
                        var $this = $(this),src=$this.attr('src'),ori=$this.attr('original');
                        if(src!=ori){
                            $(this).attr("src",ori);
                        }
                    })
                    opts.isChangeSrc = false;
                }
                if(opts.isAnimate){
                    $(oThis).stop(true,true);
                    var curTop = $(oThis).position().top,tmpArr=[];

                    if(curPage==1){
                        $li.each(function(i,v){
                            if(i>len-opts.moveStep-1){
                                var tmpLi = $(v).clone(true).addClass('isClone')
                                tmpArr.push(tmpLi);
                                tmpLi.insertBefore($li.first());
                                $(oThis).css('top',-opts.moveHeight);
                            }
                        });
                    }

                    //alert(opts.maxTop+'-----当前'+curLeft)
                    $(oThis).animate({top:'+='+opts.moveHeight+'px'},opts.time,'swing',function(){
                        // if(curTop>=0){
                        if(curPage==1){
                            $(oThis).css('top',-opts.maxTop+'px')
                            $(oThis).children('.isClone').remove();
                            curPage=opts.iPage;
                        }else{
                            curPage--;
                        }
                        // dParent.find('.funmove-page>span').html(curPage);
                    });
                }else{
                    var index = $(oThis).children().length-opts.moveStep;
                    $(oThis).children().slice(index).prependTo($(oThis));
                }
            }).select(function(){return false;});
        });
    }
})(jQuery);
/* jquery zoom */
(function($){
    $.fn.jqueryzoom=function(options){
        var settings={
            xzoom:200,
            yzoom:200,
            offset:10,
            position:"right",
            lens:1,
            preload:1};
        if(options){
            $.extend(settings,options);}
        var noalt='';
        $(this).hover(function(){
            var imageLeft=$(this).offset().left;
            var imageTop=$(this).offset().top;
            var imageWidth=$(this).children('img').get(0).offsetWidth;
            var imageHeight=$(this).children('img').get(0).offsetHeight;
            noalt=$(this).children("img").attr("alt");
            var bigimage=$(this).children("img").attr("jqimg");
            $(this).children("img").attr("alt",'');
            if($("div.zoomdiv").get().length==0){

                /*添加隐藏层 覆盖select IE6 bug*/
//$(".num").css("display","none");
//$("#numselect").css("display","none");
                /*添加隐藏层 覆盖select IE6 bug*/

                $(this).after("<div class='zoomdiv'><img class='bigimg' src='"+bigimage+"'/></div>");
                $(this).append("<div class='jqZoomPup'>&nbsp;</div>");}
            if(settings.position=="right"){
                if(imageLeft+imageWidth+settings.offset+settings.xzoom>screen.width){
                    leftpos=imageLeft-settings.offset-settings.xzoom;}else{
                    leftpos=imageLeft+imageWidth+settings.offset;}}else{
                leftpos=imageLeft-settings.xzoom-settings.offset;
                if(leftpos<0){
                    leftpos=imageLeft+imageWidth+settings.offset;}}
//$("div.zoomdiv").css({top:imageTop,left:leftpos});
            $("div.zoomdiv").width(settings.xzoom);
            $("div.zoomdiv").height(settings.yzoom);
            $("div.zoomdiv").show();
            if(!settings.lens){
                $(this).css('cursor','crosshair');}
            $(document.body).mousemove(function(e){
                mouse=new MouseEvent(e);
                var bigwidth=$(".bigimg").get(0).offsetWidth;
                var bigheight=$(".bigimg").get(0).offsetHeight;
                var scaley='x';
                var scalex='y';
                if(isNaN(scalex)|isNaN(scaley)){
                    var scalex=(bigwidth/imageWidth);
                    var scaley=(bigheight/imageHeight);

                    if((settings.xzoom)/(scalex*1)>480){
                        $("div.jqZoomPup").width(80);
                    }
                    else{
                        $("div.jqZoomPup").width((settings.xzoom)/(scalex*1));}

                    if((settings.yzoom)/(scaley*1)>480){
                        $("div.jqZoomPup").height(80);
                    }
                    else{
                        $("div.jqZoomPup").height((settings.yzoom)/(scaley*1));
                    }

                    if(settings.lens){
                        $("div.jqZoomPup").css('visibility','visible');}}
                xpos=mouse.x-$("div.jqZoomPup").width()/2-imageLeft;
                ypos=mouse.y-$("div.jqZoomPup").height()/2-imageTop;
                if(settings.lens){
                    xpos=(mouse.x-$("div.jqZoomPup").width()/2 < imageLeft ) ? 0 : (mouse.x + $("div.jqZoomPup").width()/2>imageWidth+imageLeft)?(imageWidth-$("div.jqZoomPup").width()-2):xpos;
                    ypos=(mouse.y-$("div.jqZoomPup").height()/2 < imageTop ) ? 0 : (mouse.y + $("div.jqZoomPup").height()/2>imageHeight+imageTop)?(imageHeight-$("div.jqZoomPup").height()-2):ypos;}
                if(settings.lens){
                    $("div.jqZoomPup").css({top:ypos,left:xpos});
                    if($(".jqZoomPup").height()>480){
                        $(".jqZoomPup").hide();
                        $(".zoomdiv").hide();}}
                scrolly=ypos;
                $("div.zoomdiv").get(0).scrollTop=scrolly*scaley;
                scrollx=xpos;
                $("div.zoomdiv").get(0).scrollLeft=(scrollx)*scalex;});},function(){
            $(this).children("img").attr("alt",noalt);
            $(document.body).unbind("mousemove");
            if(settings.lens){

                /*添加隐藏层 覆盖select IE6 bug*/
//$(".num").css("display","");
                /*添加隐藏层 覆盖select IE6 bug*/

                $("div.jqZoomPup").remove();}
            $("div.zoomdiv").remove();});
        count=0;
        if(settings.preload){
            $('body').append("<div style='display:none;' class='jqPreload"+count+"'>UGO</div>");
            $(this).each(function(){
                var imagetopreload=$(this).children("img").attr("jqimg");
                var content=jQuery('div.jqPreload'+count+'').html();
                jQuery('div.jqPreload'+count+'').html(content+'<img src=\"'+imagetopreload+'\">');});}}})(jQuery);
function MouseEvent(e){
    this.x=e.pageX;
    this.y=e.pageY;}

var stock=0;
//添加到购物车回调--会员尊享需先判断登陆状态9605,全局变量是登陆成功回调需要
var addShoppingCartCallback,buyNowCallback;

//获取加入购物车弹出框推荐商品部分
function getShoppingContentCommodityInfo(num,type){
    //获取商品编号
    var commodityNo = prodInfo.cNo;
    var funShoppingContentCommodityInfo = "";

    //根据商品编号获取推荐商品信息
    $.ajax({
        type: "POST",
        async: false,
        url:YouGou.Biz.ShoppingCart.cartActionBasePath+"c_recommendCommodityByNo.sc",
        data:{commodityNo:commodityNo,num:num,type:type},
        cache:false,
        success:function(data){
            eval("data="+data);
            if(data){
                var houzui ="";
                if(type == "addShopping"){
                    houzui = "#ref=detail&po=cart";
                    var _mvq = window._mvq || [];window._mvq = _mvq;
                    _mvq.push(['$setAccount', 'm-344-0']);
                    _mvq.push([ '$setGeneral', 'recommend', '', '', '' ]);
                    for(var oo in data){
                        _mvq.push([ '$addItem', '',data[oo].id ]);
                    }
                    _mvq.push([ '$logData' ]);
                }else{
                    houzui = "#ref=detail&po=collect";
                    var _mvq = window._mvq || [];window._mvq = _mvq;
                    _mvq.push(['$setAccount', 'm-344-0']);
                    _mvq.push(['$setGeneral','concern','','','']);
                    for(var oo in data){
                        _mvq.push(['$addItem', '',data[oo].id]);
                    }
                    _mvq.push(['$logData']);
                }
                // var ygPriceOrMark = "";
                for(var vo in data){
                    /* if(data[vo].isActive == 1){
                     ygPriceOrMark = 'color:#ff5000;">活动价';
                     }else{
                     ygPriceOrMark = 'color:#AAA;">优购价';
                     }*/
                    var str = '<li style="width:88px; float:left; margin:10px 0px 0px 10px; display:inline; text-align:center;">'+
                        '<a href="'+data[vo].dpUrl+houzui+'" style="display:block;"><img style="border:1px solid #D1D1D1;" src="'+data[vo].thumbnail+'" style="border:1px solid #D1D1D1;" width="90" height="90" /></a>'+
                        '<p style="margin-top:8px;"><em class="ygprc15">&yen;<i>'+data[vo].salePrice+'</i></em></p>'+
                        '</li>';
                    funShoppingContentCommodityInfo = String.prototype.concat(funShoppingContentCommodityInfo,str);
                }
            }
        }
    });
    return funShoppingContentCommodityInfo;
};

// 检查是否登录
function checkUserLogin(){
    var isLogin = false;
    $.ajax({
        type: "POST",
        async : false,
        url: '/api/checkUserLogin.jhtml',
        success: function(data){
            if(data == "true"){
                isLogin =  true;
            }
        }
    });
    return isLogin;
}
//判断登陆并且弹窗
function showLoginPop(callback){
    var callback=callback?callback:'';
    var showLoginDialog=function(){
        var refreshTopWin =callback?false:true;
        YouGou.Biz.loginPop({title : '您尚未登录',lock: true,closable:true,refreshTopWin:refreshTopWin,callback:callback,closeWin:true});
    };
    if(!checkUserLogin()){
        if(!ygDialog){
            loadjs($('#jsYgDialog').val(),showLoginDialog);
        }else{
            showLoginDialog();
        }
        return true;
    }
    return false;
}

// 回复商品的回复
function replyComment(itemId){
    if(!checkUserLogin()){
        alert("请登录!");
        return;
    }
    window.location.href= basePath +'/my/queryComment.jhtml?id=' + itemId;
}

function checkIsWriteCommodity(){
    var isWriteCommodity = false;
    $.ajax({
        type: "POST",
        async : false,
        url: '/api/checkIsWriteCommodity.jhtml?commodityId='+prodInfo.cId,
        success: function(data){
            if(data == "true"){
                isWriteCommodity =  true;
            }
        }
    });
    return isWriteCommodity;
}
// 点评是否有用
function commentByUseful(itemId){
    var isUseCommodityId = prodInfo.cId;
    var ccid = itemId;
    if(!checkUserLogin()){
        alert("请登录后点击有用数量");
        window.location.href= 'http://www.yougou.com/signin.jhtml';
        return;
    }
    $.ajax({
        type: "POST",
        url :basePath+"/api/comment/queryCommentById.jhtml?id="+ccid,
        data : {"commodityId":isUseCommodityId},
        success: function(msg){
            if ("0" == msg) {
                alert("对不起，您已经选择该信息对您有用了！");
            }else{
                $("#isusefulCount"+ccid).text("赞("+msg+")");
            }
        }
    });
}
// 最新点评
function newComment(commodityId){
    if(_gaq){
        _gaq.push(['_trackPageview','/PageAction/detail/comment']);
    }
    loginByComntOrFav = 1;
    if(!showLoginPop()){
        handleComment();
    }
}
//登陆后点评处理
function handleComment(){
    if(!checkIsWriteCommodity()){
        alert("对不起,购买过该商品的会员才能评论!");
        return;
    }
    var orderNo = getOrderNoByCommodityId();
    if(orderNo == "" || orderNo == null){
        alert("您可能对该商品没下过订单或已对该商品点评过！");
        return;
    }
    setTimeout(function(){
        window.location.href= "/my/wirteComment.jhtml?commodityId="+prodInfo.cId+"&orderNo="+orderNo;
    },200);
}
//根据用户账号，商品id查询下过订单编号
function getOrderNoByCommodityId(){
    var resultCode="";
    $.ajax({
        type: "POST",
        async : false,
        url: "/api/order/getOrderNoByCommodityId.jhtml?commodityId="+prodInfo.cId,
        success: function(data){
            resultCode =  data;
        }
    });
    return resultCode;
}
//关闭弹窗回调
function closeDialog(){
    dg.close();
    initLogin();
    if(loginByComntOrFav == 1){
        handleComment();					//点评
    }else if(loginByComntOrFav == 2){
        favorite();
    }else{
        try{
            Ypsg.base.showTkxy();
        }catch(e){}
    }
}
//商品收藏
function favorite(){
    var collectionCommodity = "";
    collectionCommodity = getShoppingContentCommodityInfo(1,"addCollection");
    var minHeight = 290;
    var collectionContent = "";
    var collectionend = '</ul></div>';

    var prod_size = 0;
    if(prodInfo.prod_size != undefined){
        prod_size = prodInfo.prod_size;
    }
    $.ajax({
        type: "POST",
        url: '/api/addCommodityFavorite.jhtml',
        data: {"id":prodInfo.cId,"productSize":prod_size},
        dataType:"json",
        async: false,
        success: function(data){
            var flag = parseInt(data.flag);
            var collectionSuccess = getCollectionContentPart(flag);
            var funCollectionMoreGood = getCollectionMoreGood();
            if(flag == 2){
                var count = $("#favorite").attr('count')-0+1;
                $("#favorite").text('('+count+')').attr('count',count);
//					var _html='<div style="background:url(/template/common/images/ubg14.png) no-repeat 80px 40px;width:250px;padding:50px 0 50px 150px;"><h2>收藏成功</h2><p style="margin-top:15px;">查看我<a class="f_blue" target="_blank" href="/my/favorites.jhtml">收藏的商品>></a></p></div>';
//					ygDialog({content:_html,title:"收藏成功",lock:false,id:"goods_sc"});
            }
            if(!collectionCommodity){
                minHeight = "160";
                collectionContent = collectionSuccess+collectionend;
            }else{
                collectionContent = collectionSuccess+funCollectionMoreGood+collectionCommodity+collectionend;
            }
            yg_dialog_bind = new ygDialog({
                close: function(){// 对话框关闭前执行的函数
                    clearInterval(timer);
                },
                loaded:null,//url加载完成回调
                lock: true,	// 是否锁屏
                closable:true, //是否允许关闭
                fixed:true,
                minHeight:minHeight,
                minWidth:430,
                skin:3,
                drag:false
            });

            yg_dialog_bind.content(collectionContent);
        }
    });

    var i = 10;
    var fn = function () {
        if(i <= 0){
            yg_dialog_bind.close();
        }
        $("#bind_tip").text("倒计时" + i + "秒后自动关闭");
        i --;
    };
    timer = setInterval(fn, 1000);
    fn();

    return false;

}

//获取收藏弹出框前部分
function getCollectionContentPart(flag){
    var collection = "";
    if(flag = 1){
        collection = "已经收藏";
    }else{
        collection = "成功加入收藏夹！";
    }
    var funCollectionContentPart =   '<div>'+
        '<p style="margin-left:20px;">'+
        '<img style="width:33px;height:33px;" src="../template/common/images/ubg14.png">'+
        '<em style="margin-left:10px;font-size:14px;font-weight:bold;">'+collection+'</em>'+
        '</p>'+
        '<p style="margin-left:63px;margin-top:5px;"><em>您可以</em>&nbsp;&nbsp;<a target="_blank" href="/my/favorites.jhtml" class="cblue">查看收藏夹</a></p>'+
        '<p style="margin-left:63px;margin-top:5px;"><em id="bind_tip" style="color: #AAA;">倒计时10秒后自动关闭</em></p>'+
        '</div>'+
        '<div style="margin:10px 20px 5px 20px;border-bottom:1px dotted #D1D1D1;"></div>'+
        '<div>';
    return funCollectionContentPart;
};

//获取收藏弹出框换一批
function getCollectionMoreGood(){
    var funCollectionMoreGood = '<p style="margin-left:22px;"><em">收藏此商品的还喜欢</em><a style="margin-left:208px;" id="change_collection" href="javascript:void(0)" class="cblue">换几个更好的</a></p>' +
        '<ul id="ul_collection" style="list-style:none;margin-left:13px;">' ;
    return funCollectionMoreGood;
}

YGG.Module={
    //获取主要内容
    getProductInfo:function(){
        //显示价格说明
        var showPriceExplain=function(saleprice,marketprice,discout){
            var arr=[]
            arr.push('<div class="price_explain mt5"><p><span class="ff_yh mr20">&yen;')
            arr.push(saleprice);
            arr.push('</span>即销售价或因开展不同的优惠活动而设定的即时售价</p>');
            arr.push('<p><span class="ff_yh line_through  mr20">&yen;');
            arr.push(marketprice);
            arr.push('</span>品牌商建议零售价或牌价</p>');
            arr.push('</div>');
            //arr.push('<p><span class="ff_yh mr20">');
            //arr.push(discout);
            //arr.push('折</span>折扣=即时售价除以品牌建议零售价或牌价</p></div>');
            $('#goods_lc .goods_lc_item:first').append(arr.join(''));
        }
        //如果下架则隐藏尺码并且改变颜色尺码区背景色等

        $.ajax({
            type: "get",
            data:{"cNo":prodInfo.cNo,"rrdom":Math.random()},
            dataType : "json",
            url: "/commodity/getGoodsDetail.sc",
            success: function(data){
                if(data && !data.NonDown){
                    if(data.active&&data.active!=''){
                        if(data.active.activeType == 18 && (data.active.timeMillisType == 1 || data.active.timeMillisType == 2)){
                            if (data && data.prices != null) {
                                var dataPrice = data.prices.split('|');
                                $("#priceSpan").html("&yen;" + dataPrice[0]);
                                $("#jies i").html(dataPrice[2]);
                                $("#yitianPrice").html("&yen;<i>" + dataPrice[1] + '</i>');
                                //保存价格到全局变量里，以备其他位置使用
                                prodInfo.price=dataPrice[1];
                                $(".buy").html('<p class="c9 col">本商品由<strong id="ShopName">品牌商</strong>直接发货</p><p class="qbuy"></p>');
                                YGG.Module.initActive18(data);
                                showPriceExplain(dataPrice[1],dataPrice[0],dataPrice[2]);
                            }
                        }else{
                            $('.prosize').hide();
                            $('.qbuy').hide();
                            $('#ygprice_area').children().not('del').hide();
                            YGG.Module.writeSoldoutMsg();
                            return;
                        }
                    }else{
                        $('.prosize').hide();
                        $('.qbuy').hide();
                        $('#ygprice_area').children().not('del').hide();
                        YGG.Module.writeSoldoutMsg();
                        return;
                    }
                }
                if (data) {
                    if (data.NonDown) {
                        //先判断当前页是否是按下架页面生成的，如果是，则重新生成页面
                        if(document.getElementById('suspendsale')){
                            var href=location.href;
                            if(href.indexOf('createhtml')<0){
                                if(href.indexOf('?')>0){
                                    location.href='http://www.yougou.com/createHtmlBy404.jhtml?url='+href+'&createhtml=1';
                                }else{
                                    location.href='http://www.yougou.com/createHtmlBy404.jhtml?url='+href+'?createhtml=1';
                                }
                            }else{
                                $('#suspendsale').nextAll().remove();
                                $('#suspendsale').after('<p class="qbuy"> <a href="javascript:void(0)" class="lj2" id="buyNow">立即购买</a>' +
                                    '<a href="javascript:void(0)" class="ks2 addShoppingCart" id="addShoppingCart">加入购物车</a>' +
                                    '<a href="javascript:void(0)" class="qrButton Gray" id="qrButton"><strong class="yahei qrButtonText">扫二维码下载APP</strong></a>' +
                                    '</p>')

                            }

                        };

                        var nMaxNum = parseInt(data.limitbuyMaxNum);
                        glimitbuyMaxNum = nMaxNum >= 0 ? nMaxNum: 3;
                        //设置价格
                        if (data.prices != null) {
                            var dataPrice = data.prices.split('|');
                            $("#priceSpan").html("&yen;" + dataPrice[0]);
                            $("#jies i").html(dataPrice[2]);
                            $("#yitianPrice").html("&yen;<i>" + dataPrice[1] + '</i>');
                            //保存价格到全局变量里，以备其他位置使用
                            prodInfo.price=dataPrice[1];
                            showPriceExplain(dataPrice[1],dataPrice[0],dataPrice[2]);
                        }
                        if (!data.isSupportCoupon) {
                            $("#ygprice_area").append('<strong class="f12 ml10">不支持使用优惠券</strong>')
                        }
                        //设置库存
                        YGG.Module.initSize(data.inventory,data.active);
                        //设置活动
                        if(stock>0){
                            YGG.Module.initActive(data);
                        }
                        //设置是否港币
                        if (data.tradeCurrency == 'HKD') {
                            /* #10712 香港潮牌商品开发所有促销形式 - 单品页修改
                             将原来的仅支持支付宝支付提示替换为“加入购物车”按钮
                             香港潮牌商品的单品页，商品名称后自动增加“香港潮牌---仅支持支付宝支付”字样
                             */
                            //$('#addShoppingCart').after('<span class="alipay">仅支持支付宝支付</span>').remove();
                            $('.goodsCon h1').append("<span>香港潮牌---仅支持支付宝支付</span>");
                            $('.pay_style').remove();
                            $('#goods_lc_pay_send .pay_t').remove();
                            $('#goods_lc_pay_send .goods_lc_dl1 dd').not(':last').remove();
                            $('#goods_lc_pay_send .goods_lc_dl1 dt').not(':last').remove();
                            $('#goods_lc_pay_send .goods_lc_dl1').prepend('<dt>支付方式说明</dt><dd><p class="f16 fb corg">香港商家商品需单独购物流程，并仅支持支付宝支付。</p></dd>')
                        }
                        //设置NOVO店铺 现在3已改为海外直发
                        //if (typeof(orderDistributionSide) != 'undefined' && orderDistributionSide == '3') {
                        //    $.get('/cms/topics/getNovoStoreList.sc?commodityNo=' + prodInfo.cNo + '&styleColorNo=' + supplierCode,
                        //        function(d) {
                        //            var arrStr = [];
                        //            $.each(d,
                        //                function(key, val) {
                        //                    arrStr.push('<a class="cblue fb" href="' + val + '">' + key + '</a> ');
                        //                });
                        //            if (arrStr.length > 0) {
                        //                $('#novoshop').html('NOVO其他店该商品：' + arrStr.join(''));
                        //            }
                        //        },
                        //        'json');
                        //}
                        //设置仓库公告
                        YGG.Module.getWarehouseNotice();
                    }
                    //设置分数
                    if (data.commentTotal != null && data.commentTotal > 0) {
                        var star = data.commentStar;
                        var strHtml = [];
                        strHtml.push('商品评分：<i class="rate_point_s point');
                        strHtml.push(Math.floor(star / 2));
                        strHtml.push('s_');
                        strHtml.push(star % 2 > 0 ? 1 : 0);
                        strHtml.push('" ></i><em class="Red">');
                        strHtml.push(star);
                        strHtml.push('分&nbsp;&nbsp;</em><a href="#goods_lc" class="Blue">已有');
                        strHtml.push(data.commentTotal);
                        strHtml.push('人点评</a>');
                        $("#commentStatisticsData").html(strHtml.join(''));
                    }
                    //赠品相关
                    if(typeof(data.active) != "undefined" && typeof(data.active.giftList) != "undefined"){
                        var gA = data.active;
                        $(".actGlobal>.f_yellow").html(gA.activeName);
                        $(".giftTip>.gcName").html(gA.giftCommodityName);
                        $(".giftTip>.gcName").prepend("<i class='jtt'></i>");

                        $("#zengpin .giftTip span").html(gA.giftCommodityName);

                        var oHtml = [];
                        for(var i = 0 ; i < gA.giftList.length; i++){
                            oHtml.push('<li class="giftList"><a target="_blank" href="'+gA.giftList[i].giftUrl+'"><img alt="" src="'+gA.giftList[i].giftPic+'" /></a></li>');
                        }

                        $(".giftlistjs").html(oHtml.join(""));
                        $("#zengpin .giftDivWp .giftListWr").html(oHtml.join(""));
                        bindgifthover();

                    }
                    if(data && data.NonDown){
                        //预约购买商品的处理
                        if(typeof(data.active) != "undefined"){
                            if(data.active.activeType == 18){
                                YGG.Module.initActive18(data);
                            }
                        }

                    }
                    //添加库存信息到dsp_config
                    YGG.Module.filldsp_config(data);
                }
            }
        });
        function bindgifthover(){
            $(".giftTip").bind("mouseover",function(){
                $(this).parent().parent().find(".giftDivWp").show();
            });
            $(".giftTip").bind("mouseout",function(){
                $(this).parent().parent().find(".giftDivWp").hide();
            });
        }

    },
    filldsp_config:function(data){

        if(typeof dsp_config !="undefined"){
            if(data.inventory){
                dspattrnum ++;
                var num = 0;
                for(var n in data.inventory){
                    num += data.inventory[n];
                }
                if(commodityStatus == 1){
                    num = 0;
                }
                dsp_config.p_stock = num;
            }
            if(data.p_classn){
                dspattrnum ++;
                for(var i =0 ; i < data.p_classn.length ; i ++){
                    dsp_config["p_class"+(i+1)] = data.p_classn[i];
                }
            }
            if(dspattrnum == 2){
                $("body").append($("<iframe style='display:none;width: 1px; border: 0px none; position: absolute; left: -100px; top: -100px; height: 1px;' src='/inc/code_iframe.shtml?url=prod-csku'></iframe>"));
            }
        }
    },
    //售罄和下架状态页面
    writeSoldoutMsg:function(data){

        //改版背景
        $(".soldoutdiv").show();
        $("#goodsContainer .buy").addClass("soldoutsty");
        $(".online_sc").hide();
        $(".ser_promise").hide();
        $("#commentStatisticsData").parent().hide();
        $(".goods_rc").hide();
        $(".goods_lc").hide();
        $(".buy .c9").hide();
        $("#botBuyNav").css("width","0");
        $('#shipper_yg').hide(); //隐藏＂本商品由品牌商直接发货＂
        $.ajax({
            type: "GET",
            url:"/commodity/getDanpinRecommendBySku.sc?sku="+prodInfo.cNo,
            success: function(data){
                var d = eval('('+data+')')[0];
                if(d.similar){
                    var prolist = [];
                    prolist.push('<ul class="clearfix">');
                    for( var i = 0 ; i < 6 && i < d.similar.length; i ++ ){
                        prolist.push('<li style="width:100px; float:left; margin:10px 0px 0px 15px; display:inline; text-align:center;">');
                        prolist.push('<a style="display:block;" href="'+d.similar[i].dpUrl+'#ref=detail&po=similar" target="_blank"><img width="100" height="100" src="'+d.similar[i].thumbnail+'" /></a>');
                        prolist.push('<p><em class="ygprc15">&yen;<i>' +d.similar[i].salePrice+'</i></em></p></li>');
                    }

                    prolist.push('</ul>');
                    $("#guessUlike").html(prolist.join(""));
                    i = 0;

                }
                if(d.viewWant){
                    var porlist2 = [];
                    for(var i = 0 ; i < d.viewWant.length ; i ++){
                        porlist2.push('<li style="position: relative; left: 0px;"><p class="guesspic">');
                        porlist2.push('<a href="'+d.viewWant[i].dpUrl+'#ref=detail&po=finalbuy"><img src="'+d.viewWant[i].thumbnail+'" alt=""></a></p>')
                        porlist2.push('<p class="guessname"><a href="'+d.viewWant[i].dpUrl+'#ref=detail&po=finalbuy">'+d.viewWant[i].name+'</a></p>');
                        porlist2.push('<p class="price_sc"><em class="ygprc15">&yen;<i>'+d.viewWant[i].salePrice+'</i></em><del>&yen;' +d.viewWant[i].marketPrice+'</del><span class="ico_discount"><i>' +d.viewWant[i].rebate+'</i>折</span></p></li>');
                    }
                    if(d.viewWant.length!=0){
                        $("#solookbuy").show();
                    }
                    $("#solookbuy ul").html(porlist2.join(""));
                }
                $(".buyGuds").ygSwitch('.buyGuds>ul>li',{
                    nextBtn:'.buyGudsnext',
                    prevBtn:'.buyGudsprev',
                    steps:5,
                    visible:5,
                    lazyload:true,
                    effect: "scroll",
                    circular:true,
                    pagenation:'.buyGud-page'
                }).carousel();
                //yinlubin
            }
        });
        function bindgifthover(){
            $(".giftTip").bind("mouseover",function(){
                $(this).parent().parent().find(".giftDivWp").show();
            });
            $(".giftTip").bind("mouseout",function(){
                $(this).parent().parent().find(".giftDivWp").hide();
            });
        }

    },
    //初始化活动18 预约购买活动
    initActive18:function(data){

        var active = data.active;
        var expcountdown = active.timeMillis;
        $(".mltpl_actv").hide();
        var buystarttime = data.active.buyStartTime;
        var memberLv = data.active.memberLevel;
        if( memberLv == "全部会员"){
            memberLv = "";
        }

        $(".goodsCon>h1").append("<span>"+buystarttime+"开抢 仅限"+memberLv+"预约用户购买</span>")


        //预约中状态处理
        if(active.timeMillisType == 1 || active.timeMillisType == 2){
            $(".buy>.attrib").css("display","none");
            $(".buy>.prosize").css("display","none");
            $(".buy>.num").css("display","none");
        }
        if(active.timeMillisType == 1){

            $(".buy .qbuy").html('<a class="resStartNow" style="cursor:pointer"></a><a href="javascript:void(0)" class="qrButton Gray" id="qrButton"><strong class="yahei qrButtonText">扫二维码下载APP</strong></a>');
            $(".buy .qbuy").prepend('<div class="res_countdown">预约人数：<em class="res_personsum">'+active.datingCount+'</em>预约结束时间：还剩<em class="res_cdday"></em>天<em class="res_cdhour"></em>小时<em class="res_cdmin"></em>分<em class="res_sec"></em>秒</div><p class="blank8"></p>');
            expcountdownfn();
        }
        else if(active.timeMillisType == 2){
            $(".buy .qbuy").html('<a class="resendbtn"></a><a href="javascript:void(0)" class="qrButton Gray" id="qrButton"><strong class="yahei qrButtonText">扫二维码下载APP</strong></a>');
            $(".buy .qbuy").prepend('<div class="res_countdown">预约人数：<em class="res_personsum">'+active.datingCount+'</em>抢购开始时间：还剩<em class="res_cdday"></em>天<em class="res_cdhour"></em>小时<em class="res_cdmin"></em>分<em class="res_sec"></em>秒</div><p class="blank8"></p>');
            expcountdownfn();
        }
        else if(active.timeMillisType == 3){
            $(".buy .qbuy").prepend('<div class="res_countdown">预约人数：<em class="res_personsum">'+active.datingCount+'</em>抢购结束时间：还剩<em class="res_cdday"></em>天<em class="res_cdhour"></em>小时<em class="res_cdmin"></em>分<em class="res_sec"></em>秒</div><p class="blank8"></p>');
            expcountdownfn();
        }
        $("#imgBtn_0").show();

        $(".resStartNow").bind("click",function(){
            var resStartCheck = function(){
                location.href = "/active/dating.jhtml?cNo="+prodInfo.cNo;
            }
            resNow = resStartCheck;
            if(!showLoginPop("resNow")){
                resStartCheck();
            }else{
                return;
            }

        });
        function expcountdownfn(){
            setInterval(function(){
                if(expcountdown <= 1){
                    history.go(0);
                    return false;
                }
                expcountdown = expcountdown - 1000;
                d=Math.floor(expcountdown/(1000*60*60*24));
                h=Math.floor((expcountdown/(1000*60*60))%24);
                m=Math.floor((expcountdown/(1000*60))%60);
                s=Math.floor((expcountdown/1000)%60);
                $(".res_cdday").html(d);
                $(".res_cdhour").html(h);
                $(".res_cdmin").html(m);
                $(".res_sec").html(s);
            },1000);
        }
    },
    //初始化活动
    initActive:function(data){
        //全场活动globalActive
        var globalActive = data.globalActive;

        //非全场活动;限时抢/满额减
        var baseActive = data.active;
        if(baseActive&&baseActive!=''){
            if(baseActive.activeType!=14){
                $('.good_ygprcarea').after('<div class="mltpl_actv"></div>');
            }
            //赠品
            if(baseActive.giftCommodityName){
                if(baseActive.activeType!=15&&baseActive.activeType!=14)
                {
                    $('.mltpl_actv').append('<dl class="itm clearfix xsbuy_itm"><dt>赠品</dt><dd class="itm_bd"><span class="giftTip"><span class="gcName">购买活动商品送以下任意赠品</span><div style="display: none;" class="giftDivWp"><div class="giftDiv"><ul class="giftListWr giftlistjs"></ul><p class="giftListMsg"><i>请在购物车中选择赠品及尺码。赠品库存有限，库存数量请见赠品详情页</i></p><div class="sjwrap"><div class="sanjiao"></div></div></div></span></dd></dl>');
                }
            }
            //赠券
            //赠券不要外连接
            if(baseActive.giftCouponName){

                if(baseActive.activeType!=14)
                {
                    $('.mltpl_actv').append('<dl class="itm clearfix"><dt>赠劵</dt><dd class="itm_bd"> <span class="tip">'+baseActive.giftCouponName+'</span></dd></dl>');
                }
            }
            var str='';
            if(baseActive.memberLevel!="全部会员"){
                str=baseActive.memberLevel+' ';
            }
            switch(baseActive.activeType){
                case 1:
                    //满减
                    //连接到单独页面
                    var activeName=baseActive.activeName.indexOf('每')==0?baseActive.activeName+'，上不封顶':baseActive.activeName;
                    $('.mltpl_actv').prepend('<dl class="itm clearfix"><dt>满减</dt><dd class="itm_bd"><span class="tip">'+activeName+'<a href="'+baseActive.activeUrl+'" target="_blank" class="cblue ml10">查看详情&gt;&gt;</a></span></dd></dl>').show();
                    $('#Detail_Btn').hide();
                    $('.xsbuy_itm .cblue').click(function(){$('#Detail_Btn').click();return false;});
                    break;
                //限时抢
                case 2 :
                    var text = '<dl class="itm clearfix xsbuy_itm"><dt style="min-width: 46px">限时抢</dt><dd class="itm_bd">'+str+'<span class="tip" id="validTime"></span><a class="cblue Song ml10" target="_blank" href="'+baseActive.activeUrl+'">更多优惠商品&gt;&gt;</a></dd></dl>';
                    //保存价格到全局变量里，以备他用
                    prodInfo.price=baseActive.activePrice;
                    var validEndTime = baseActive.endTimeMillis;
                    var dataPrice = data.prices.split('|');
                    var zhekou = (baseActive.activePrice /dataPrice[0]) *100;//
                    if(validEndTime<0){return;}
                    $('.mltpl_actv').prepend(text).show();
                    $("#yitianPrice i").html(baseActive.activePrice);
                    getDeadLineActiveTime(validEndTime);
                    zhekou=Math.round(zhekou)/10+'';
                    if(zhekou.indexOf('.')<0){zhekou+='.0';}
                    $("#jies i").html(zhekou)//
                    var domPriceExplain=$('.ff_yh');
                    domPriceExplain.eq(0).html('&yen;'+prodInfo.price);
                    domPriceExplain.eq(2).html(zhekou+'折');
                    break;
                //秒杀
                case 21 :
                    var text = '<dl class="itm clearfix xsbuy_itm"><dt style="min-width: 46px">秒&nbsp;&nbsp;&nbsp;&nbsp;杀</dt><dd class="itm_bd">'+str+'<span class="tip" id="validTime"></span><a class="cblue Song ml10" target="_blank" href="'+baseActive.activeUrl+'">更多优惠商品&gt;&gt;</a></dd></dl>';
                    //保存价格到全局变量里，以备他用
                    prodInfo.price=baseActive.activePrice;
                    var validEndTime = baseActive.endTimeMillis;
                    var dataPrice = data.prices.split('|');
                    var zhekou = (baseActive.activePrice /dataPrice[0]) *100;//
                    if(validEndTime<0){return;}
                    $('.mltpl_actv').prepend(text).show();
                    $("#yitianPrice i").html(baseActive.activePrice);
                    getDeadLineActiveTime(validEndTime);
                    zhekou=Math.round(zhekou)/10+'';
                    if(zhekou.indexOf('.')<0){zhekou+='.0';}
                    $("#jies i").html(zhekou)//
                    var domPriceExplain=$('.ff_yh');
                    domPriceExplain.eq(0).html('&yen;'+prodInfo.price);
                    domPriceExplain.eq(2).html(zhekou+'折');
                    break;
                //闪团
                case 22 :
                    var text = '<dl class="itm clearfix xsbuy_itm"><dt style="min-width: 46px">闪&nbsp;&nbsp;&nbsp;&nbsp;团</dt><dd class="itm_bd">'+str+'<span class="tip" id="validTime"></span><a class="cblue Song ml10" target="_blank" href="'+baseActive.activeUrl+'">更多优惠商品&gt;&gt;</a></dd></dl>';
                    //保存价格到全局变量里，以备他用
                    prodInfo.price=baseActive.activePrice;
                    var validEndTime = baseActive.endTimeMillis;
                    var dataPrice = data.prices.split('|');
                    var zhekou = (baseActive.activePrice /dataPrice[0]) *100;//
                    if(validEndTime<0){return;}
                    $('.mltpl_actv').prepend(text).show();
                    $("#yitianPrice i").html(baseActive.activePrice);
                    getDeadLineActiveTime(validEndTime);
                    zhekou=Math.round(zhekou)/10+'';
                    if(zhekou.indexOf('.')<0){zhekou+='.0';}
                    $("#jies i").html(zhekou)//
                    var domPriceExplain=$('.ff_yh');
                    domPriceExplain.eq(0).html('&yen;'+prodInfo.price);
                    domPriceExplain.eq(2).html(zhekou+'折');
                    break;
                //限量购
                case 19 :
                    var text = '<dl class="itm clearfix xsbuy_itm xlbuy_item"><dt>限量购</dt><dd class="itm_bd">'+str+'<span' +
                        ' class="tip" id="validTime"></span><a class="cblue Song ml10" target="_blank" href="'+baseActive.activeUrl+'">更多优惠商品&gt;&gt;</a></dd></dl>';
                    //保存价格到全局变量里，以备他用
                    prodInfo.price=baseActive.activePrice;
                    var validEndTime = baseActive.endTimeMillis;
                    var dataPrice = data.prices.split('|');
                    var zhekou = (baseActive.activePrice /dataPrice[0]) *100;//
                    if(validEndTime<0){return;}
                    $('.mltpl_actv').prepend(text).show();
                    $("#yitianPrice i").html(baseActive.activePrice);
                    getDeadLineActiveTime(validEndTime);
                    zhekou=Math.round(zhekou)/10+'';
                    if(zhekou.indexOf('.')<0){zhekou+='.0';}
                    $("#jies i").html(zhekou)//
                    var domPriceExplain=$('.ff_yh');
                    domPriceExplain.eq(0).html('&yen;'+prodInfo.price);
                    domPriceExplain.eq(2).html(zhekou+'折');

                    break;
                //组合销售
                case 8:
                    //更改后变成加价购
                    $('.mltpl_actv').prepend('<dl class="itm clearfix"><dt>加价购</dt><dd class="itm_bd"><span class="tip">'+baseActive.activeName+'<a href="/goods/package_sale.jhtml?productNo=&commodityNo='+prodInfo.cNo+'&subCommodityNo=#ref=detail&po=suite" target="_blank" class="cblue ml10">去挑选搭配商品&gt;&gt;</a></span></dd></dl>').show;
                    YGG.Module.packageSale(data);
                    break;
                //单品立减
                case 9:
                    var ygPrice = data.prices;
                    ygPrice=data.prices.split('|');
                    ygPrice=ygPrice[1];
                    var text = '<dl class="itm clearfix xsbuy_itm"><dt>下单立减</dt><dd class="itm_bd">'+str+'下单立减<strong class="price">&yen;'+(ygPrice-baseActive.activePrice)+'</strong><span class="tip" id="validTime"></span><a class="cblue Song ml10" target="_blank" href="'+baseActive.activeUrl+'">更多优惠商品&gt;&gt;</a></dd></dl>';
                    var validEndTime = baseActive.endTimeMillis;
                    if(validEndTime<0){return;}
                    $('.mltpl_actv').prepend(text).show();
                    $("#yitianPrice").removeClass("priceSpan");
                    getDeadLineActiveTime(validEndTime);
                    break;
                case 10:
                    //多买多折
                    //连接到单独页面
                    $(".mltpl_actv").prepend('<dl class="itm clearfix"><dt>多买多折</dt><dd class="itm_bd"><span class="tip">'+baseActive.activeName+'<a href="'+baseActive.activeUrl+'" class="cblue ml10" target="_blank">查看详情&gt;&gt;</a></span></dd></dl>').show();
                    $('#Detail_Btn').hide();
                    break;
                case 11:
                    //组合优惠
                    $(".mltpl_actv").prepend('<dl class="itm clearfix"><dt>组合优惠</dt><dd class="itm_bd"><span class="tip">'+baseActive.activeName+'<a href="'+baseActive.activeUrl+'" class="cblue ml10" target="_blank">查看详情&gt;&gt;</a></span></dd></dl>').show();
                    $('#Detail_Btn').hide();
                    break;
                case 13:
                    //新增满折
                    $(".mltpl_actv").prepend('<dl class="itm clearfix"><dt>满折</dt><dd class="itm_bd"><span class="tip">'+baseActive.activeName+'<a href="'+baseActive.activeUrl+'" target="_blank" class="cblue ml10">查看详情&gt;&gt;</a></span></dd></dl>').show();
                    $('#Detail_Btn').hide();
                    break;
                case 14:
                    /*//新增买赠*/
                    if(baseActive.giftCommodityName){
                        $("#zengpin").html('<div class="ht25 cmnt"><span class="zporg">赠&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;品： </span><span style="position:relative" class="giftTip">购买活动商品送以下任意赠品<div style="display: none;" class="giftDivWp"><div class="giftDiv"><ul class="giftListWr"></ul><p class="giftListMsg"><i>请在购物车中选择赠品及尺码。赠品库存有限，库存数量请见赠品详情页</i></p><div class="sjwrap"><div class="sanjiao"></div></div></div></div><i class="jtt"></i></span></div>');

                        /*$('.mltpl_actv').append('<dl class="itm clearfix xsbuy_itm"><dt>赠品</dt><dd class="itm_bd"><span class="giftTip"><span class="gcName"></span><div style="display: none;" class="giftDivWp"><div class="giftDiv"><ul class="giftListWr giftlistjs"></ul><p class="giftListMsg"><i>请在购物车中选择赠品及尺码</i>（赠品库存有限，赠完即止）</p><div class="sjwrap"><div class="sanjiao"></div></div></div></span></dd></dl>');*/

                    }
                    if(baseActive.giftCouponName){
                        $("#zengquan").html('<p class="ht25"><span class="corg">'+str+'赠&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;券：</span>'+baseActive.giftCouponName+'</p>');
                    }else{
                        $("#zengquan").hide();
                    }
                    break;
                case 15:
                    //新增满赠
                    /*$(".mltpl_actv").prepend('<dl class="itm clearfix"><dt>赠品</dt><dd class="itm_bd"><span class="tip">'+baseActive.activeName+'<a href="'+baseActive.activeUrl+'" target="_blank" class="cblue ml10">查看详情&gt;&gt;</a></span></dd></dl>').show();
                     $('#Detail_Btn').hide();*/
                    if(baseActive.giftCommodityName){
                        $('.mltpl_actv').append('<dl class="itm clearfix xsbuy_itm"><dt>赠品</dt><dd class="itm_bd"><span class="giftTip"><span class="gcName"></span><div style="display: none;" class="giftDivWp"><div class="giftDiv"><ul class="giftListWr giftlistjs"></ul><p class="giftListMsg"><i>请在购物车中选择赠品及尺码。赠品库存有限，库存数量请见赠品详情页</i></p><div class="sjwrap"><div class="sanjiao"></div></div></div></span></dd></dl>');
                    }

                    break;
                case 16:
                    var text = '<dl class="itm clearfix credit_itm"><dt><label class="ygChkbox"><i class="skin skinBlue fl "></i>'
                        +'</label><span>积分兑换</span></dt><dd><span class="credit" consumePoint='+baseActive.consumePoint+'><span class="yahei">&yen;&nbsp;</span>'+baseActive.memberPrice
                        +'&nbsp;+&nbsp;'+baseActive.consumePoint+'&nbsp;积分</span><a class="cblue ml10" target="_blank" href="http://www.yougou.com/active/member_commodity_index.sc">更多优惠商品&gt;&gt;</a></dd></dl>';
                    $('.mltpl_actv').prepend(text).attr("vipprice",true).show();
                    $(".ygChkbox").click(function(){
                        var cbox = $(this).find("i");
                        if(cbox.hasClass("checked")){
                            cbox.removeClass("checked");
                            $(".mltpl_actv .credit").removeClass("activ");
                        }else{
                            $(".mltpl_actv .credit").addClass("activ");
                            cbox.addClass("checked");
                        }
                    });
                    break;
                case 17:
                    $(".mltpl_actv").prepend('<dl class="itm clearfix"><dt>搭配购</dt><dd class="itm_bd"><span class="tip">'+baseActive.activeName+'<a href="'+baseActive.activeUrl+'" class="cblue ml10" target="_blank">查看详情&gt;&gt;</a></span></dd></dl>').show();
                    $('#Detail_Btn').hide();
                    break;
                default:
                    break;
            }
        }
        //手机专享价
        if( data.mobilePrice ){
            var sMobileHtml = '<dl class="itm clearfix"><dt>手机专享价</dt><dd class="itm_bd"><span class="tip"><b>&yen;'+data.mobilePrice+'</b></span></dd></dl>';
            if($('.mltpl_actv')[0]){
                $('.mltpl_actv').prepend(sMobileHtml);
            }else{
                $('<div class="mltpl_actv">'+sMobileHtml+'</div>').insertAfter('.good_ygprcarea');
            }
        }
        // 限时抢活动获取时间
        function getDeadLineActiveTime(t){
            setTimeout(function(){
                setRemainTime(t-1000);
            },1000);
        }
        // 限时抢活动倒计时
        function setRemainTime(validTime) {
            var day=Math.floor(validTime/(1000*60*60 * 24));
            var hour=Math.floor(validTime/(1000*60*60)) % 24;
            var minute=Math.floor(validTime/(1000*60)) % 60;
            var second=Math.floor(validTime/1000) % 60;
            var html = [];
            if (day > 0 || hour > 0 || minute >0 || second > 0) {
                html.push("还剩");
                if(day > 0){
                    html.push("<b>"+ day + "</b>天");
                }
                if(hour != 0 || day != 0){
                    html.push("<b>" + hour + "</b>小时");
                }
                html.push("<b>" + minute + "</b>分钟");
                html.push("<b>"+ second +"</b>秒");
                $("#validTime").html(html.join(""));
                getDeadLineActiveTime(validTime);
            }else {
                html.push("<strong>抱歉，活动已过期！</strong>");
                $("#validTime").html(html.join(""));
                window.location.reload();
            }
        }

    },
    //单品页组合销售
    packageSale:function(data){
        //var ygPrice = data.salePrice[1],datPackage=data.baseActive.packageSaleCommodityList,len=datPackage.length,d,shtml=[];
        var ygPrice = data.prices;
        ygPrice=data.prices.split('|');
        ygPrice=ygPrice[1];
        var	datPackage=data.active.slaveCommodity,
            len=datPackage.length,
            d,
            shtml=[];
        if(len==0){return false;}
        len= len>2?2:len;
        //当前产品
        shtml.push('<div class="jjg mt10 clearfix"><form action="/goods/package_sale.jhtml#ref=detail&po=suite" id="bindsaleform" method="get" name="bindsaleform"><input type="hidden" value="" name="productNo"/><input type="hidden" value="');
        shtml.push(prodInfo.cNo);
        shtml.push('" name="commodityNo"/><ul class="jjg_list fl clearfix"><li class="jjg_main"><div class="jjg_pic"><img width="60" height="60" alt="" src="');
        shtml.push(prodInfo.picMiddle);
        shtml.push('"><sup class="jjg_main_bz"></sup></div><p class="title">');
        shtml.push(prodInfo.cName);
        shtml.push('</a></p><p class="yg_price"><em class="ygprc15">&yen;<i>');
        shtml.push(ygPrice);
        shtml.push('</i></em></p></li>');
        //套餐商品
        for(var i =0;i<len;i++){
            d = datPackage[i];
            shtml.push('<li><i class="add"></i><div class="jjg_pic"><a target="_blank" href="');
            shtml.push(d.url);
            shtml.push('#ref=detail&po=suite"><img width="60" height="60" src="');
            shtml.push(d.pictureUrlPrefix);
            shtml.push('_01_s.jpg"/></a></div>');
            if(i==0){
                shtml.push('<input type="radio"  checked="checked" class="jjg_check_minro" name="subCommodityNo" value="');
            }else{
                shtml.push('<input type="radio" class="jjg_check_minro" name="subCommodityNo" value="');
            }
            shtml.push(d.commodityNo);
            shtml.push('" price1="');
            shtml.push(d.packageActivePrice);
            shtml.push('"><p class="title"><a target="_blank" title="');
            shtml.push(d.commodityName);
            shtml.push('href="');
            shtml.push(d.url);
            shtml.push('#ref=detail&po=suite">');
            shtml.push(d.commodityName);
            shtml.push('</a></p><p class="jjg_price">加<strong>');
            shtml.push(d.activePrice);
            shtml.push('</strong>元即可赠送</p></li>');
        }

        /*$('.mltpl_actv').prepend('<dl class="itm clearfix"><dt>加价购</dt><dd class="itm_bd"><span class="tip">'+baseActive.activeName+'<a href="/goods/package_sale.jhtml?productNo=&commodityNo='+prodInfo.cNo+'&subCommodityNo=#ref=detail&po=suite" target="_blank" class="cblue ml10">去挑选搭配商品&gt;&gt;</a></span></dd></dl>').show;*/

        shtml.push('</ul><div class="go_buy rel fr"><i></i><a target="_blank" href="/goods/package_sale.jhtml?productNo=&commodityNo='+prodInfo.cNo+'&subCommodityNo=#ref=detail&po=suite" class="cblue bindSale_btn">去选购搭配商品</a></div></form></div>');
        $('.goodsCon').append(shtml.join('')).find('.ser_promise').hide();
        //绑定
        $('.bindSale_btn').bind('click',function(){
            //获取尺码
            selectGoodNo?$('#bindsaleform>input[productNo]').val(selectGoodNo):'';
            $('#bindsaleform').submit();
            return false;
        });
        //统计代码
        if(_gaq){
            _gaq.push(['_trackPageview','/PageAction/st/detail/suite']);
        }
    },
    //初始化尺码等
    initSize:function(data,active){
        var curStock=1,behavior; // 0 - 立即购买 1 - 加入购物车
        var botBuybtn=1;
        //选择数量区
        var $newNum = $('.newNum');
        //尺码区
        var sizeSpecItem = $('.buy>p.prosize>.prodSpec>a');
        //浮层尺码区
        var floatSizeItem = $('#botBuyNav .prodSpec>a')
        //弹层尺码区
        var popSizeSpecItem = $("#select_size span.prodSpec>a")
        //当前选择尺码dom
        var $selectSize = null,proStock=[],arrGoodSizeNo = goodSizeNos.split(',');
        //处理空值
        for(var i=0;i<arrGoodSizeNo.length;i++){
            if(arrGoodSizeNo[i] == "" || typeof(arrGoodSizeNo[i]) == "undefined"){
                arrGoodSizeNo.splice(i,1);
                i= i-1;
            }
        }
        //设置
        var iStock,iPno,$size;
        for(var i=0;i<arrGoodSizeNo.length;i++){
            //保存各尺码对应库存
            iPno=arrGoodSizeNo[i];
            iStock = data[iPno]?data[iPno]:0;

            $size = sizeSpecItem.eq(i);
            $size.data('goodInfo',{goodNo:iPno,stock:iStock});
            if(iStock<1){
                // #10635后$size,floatSizeItem,popSizeSpecItem不隐藏，改为禁用
                //$size.addClass('no').hide();
                $size.addClass('no');
                //floatSizeItem.eq(i).addClass('no').hide();
                floatSizeItem.eq(i).addClass('no');
                //popSizeSpecItem.eq(i).addClass('no').hide();
                popSizeSpecItem.eq(i).addClass('no');
            }else{
                if(!$size.hasClass('no')){
                    stock += parseInt(iStock);
                    proStock.push($size);
                }
            }
        }
        //根据各尺码库存量设置显示状态
        var len = proStock.length;
        if(len==0){
            soldOut();
            $(".newNum").val("0");
            $(".oldNum").val("0");
            return false;
        }
        //绑定尺码点击事件
        initModule();
        if(len==1){
            sizeClickHandle.call(proStock[0],0);
        }
        function sizeClickHandle(noga){
            var $this = $(this);
            if(!$this.hasClass("no")&&!$this.hasClass("select")){
                $this.addClass('select');
                var dataname = $this.attr('data-name'),strFilter = '[data-name="'+dataname+'"]';
                var $size = sizeSpecItem.removeClass("select").filter(strFilter).addClass('select');
                floatSizeItem.removeClass('select').filter(strFilter).addClass('select');
                popSizeSpecItem.removeClass('select').filter(strFilter).addClass('select');
                $('.selectsize').html(dataname);
                //goods.selectSize = dataname;
                // 收藏时选择的尺码
                prodInfo.prod_size = dataname;
                //赋值当前尺码库存
                curStock = parseInt($size.data('goodInfo').stock);
                var maxNum = curStock>3?3:curStock;
                if(maxNum<parseInt($newNum.val())){
                    $newNum.val(maxNum);
                }
                //获取到货时间
                $selectSize = $this;
                getDeliverTime(null);
                if(noga!=0){
                    _gaq.push(['_trackPageview','/PageAction/detail/size_'+prodInfo.cNo+'_'+dataname]);
                }
            }
        }
        function initModule(){
            //绑定尺码
            sizeSpecItem.bind('click',sizeClickHandle);
            floatSizeItem.bind('click',sizeClickHandle);
            //绑定弹层尺码
            popSizeSpecItem.bind('click',function(){
                sizeClickHandle.call(this);
                // 显示【确定】按钮
                if(!$(this).hasClass("no")){
                    $("#size_select_btn").css({'visibility':'visible'});
                }

            });

            //绑定立即购买
            $('#botBuybtn,#buyNow').click(buyNow);
            //绑定加入购物车
            $('#botCartbtn,#addShoppingCart').click(addShoppingCart);
            //绑定数量增减
            $('.subtract').click(function(){
                changeProdCount('-',this);
            });
            $('.plus').click(function(){
                changeProdCount('+',this);
            });
            $newNum.bind({
                keyup:function(){
                    if(!!parseInt(this.value)){
                        $newNum.val(this.value);
                        changeProdCount(0,this);
                    }else{
                        $newNum.val(1);
                    }
                }
            });
            //绑定关闭尺码选择
            $("#size_select_btn>a").click(function() {
                popSize.hide();
                if (behavior == 0) {
                    $("#buyNow").click();
                }
                else if(behavior == 1) {
                    if(botBuybtn==1) {
                        $("#addShoppingCart").click();
                    } else {
                        $("#botCartbtn").click();
                    }
                }
            });
            $("#select_size_close").click(popSize.hide);
            $("#botCartbtn").click(function(){
                botBuybtn=0;
            });
        }
        /*** 到货时间提示*/
        function loadCityList(areaName,deliverDay){
            var _h; //省份默认高度
            var provinceBox=$("#provinceBox");
            var cityBox=$("<ul>");
            cityBox.attr("id","cityBox").addClass("areaBox");
            cityBox.css({left:8,width:410});

            $("em.blankLine").width($("#areaSel").width()+23);
            $("#areaArrive").hover(function(){
                $("#areaArrive").addClass("curr");
                $("#provinceBox").show();
            },function(){
                $("#areaArrive").removeClass("curr");
                $("#provinceBox li a").removeClass("curr");
                provinceBox.height(_h);
                provinceBox.hide();
                cityBox.remove();
            });

            $("#cityBox").live('mouseleave',function(){
                $("#provinceBox li a").removeClass("curr");
                cityBox.remove();
                provinceBox.height(_h);
            });

            //加载省份
            loadProvinceData("",function(data){
                $.each(data,function(n,value){
                    var proLi=$("<li>");
                    proLi.html('<a href="javascript:;">'+value.name+'</a>');
                    //省份点击
                    proLi.find("a").bind('click',function(){
                        var that=$(this);
                        cityBox.remove();
                        cityBox.html('<p id="cityLoading" style="padding:10px;height:20px;"><img src="'+YouGou.UI.baseUrl+'/template/common/images/loading.gif" /></p>');
                        provinceBox.height(_h);
                        that.parent().append(cityBox);
                        $("#provinceBox li a").removeClass("curr");
                        that.addClass("curr");
                        var _top=that.offset().top-$("#areaArrive").offset().top-3;
                        cityBox.css({top:_top});
                        cityBox.show();
                        var proNo=value.no;
                        pushProvinceCahe(value.no,value.name);
                        var readCache = false;
                        $.each(CityListCache,function(n,value) {
                            if(value.no == proNo && value.city.length > 0){
                                readCache = true ;
                                loadArriveCity(value.city,value.no);
                            }
                        });
                        if(!readCache){
                            loadCityOrAreaData(proNo,function(data){
                                loadArriveCity(data,proNo);
                            });
                        }
                    });
                    provinceBox.append(proLi);
                    _h=$("#provinceBox").height();
                });
            });

            //加载城市
            var loadArriveCity=function(data,areaNo) {

                //如果直辖市
                if(data.length<=1){
                    areaClick(areaNo);
                }else{
                    $.each(data,function(n,value){
                        $("#cityLoading").hide();
                        var cityLi=$("<li>");
                        cityLi.html('<a href="javascript:;" title="'+value.name+'">' +value.name +'</a>');
                        cityLi.bind('click',function(){
                            areaClick(value.no);
                        });
                        cityBox.append(cityLi);
                    });
                }
                cityBox.append('<div class="blank10"></div>');
                var h1=provinceBox.height()+provinceBox.offset().top;
                var h2=cityBox.height()+cityBox.offset().top;
                if(h1<h2){
                    provinceBox.height(h2-h1+_h);
                }
            }
            //开始查询
            var areaClick=function (areaNo){
                cityBox.remove();
                provinceBox.hide();
                $("#areaArrive").removeClass("curr");
                $("#provinceBox li a").removeClass("curr");
                provinceBox.height(_h);
                //ajax查询
                getDeliverTime(areaNo);
            }
        }
        var deliverTimeFirst=true;
        //获取到货时间
        function getDeliverTime(areaNo){
            if(!show_deliver_time){
                return;
            }
            if(!adressArr){
                loadjs($('#jsAreaMini').val(),fnCallBack);
            }else{
                fnCallBack();
            }
            function fnCallBack(){
                if(!$selectSize){return false;}
                var itemObj = $selectSize.data('goodInfo');
                if(areaNo==null){
                    areaNo="";
                }
                if(itemObj!=null){
                    pNo=itemObj.goodNo;
                    $.get("/api/deliver_time.jhtml?pNo="+pNo+"&areaNo="+areaNo+"&m="+Math.random(),function(deliverTimes){
                        var show=deliverTimes.show;
                        if(show!='no'){
                            var areaName=deliverTimes.areaName;
                            var deliverDay=deliverTimes.day;
                            if(deliverTimeFirst){
                                deliverTimeFirst=false;
                                loadCityList(areaName,deliverDay);
                            }
                            if(areaName!=null){
                                $("#areaSel").html(areaName+"（现货）"); //初始化地区
                            }else{
                                $("#areaSel").html("请选择地区"); //初始化地区
                            }
                            if(deliverDay!=null){
                                $("#arriveDay").html(deliverDay);//初始化天数
                                $("#deliverTimeDay").show();//显示
                            }else{
                                $("#deliverTimeDay").hide();//隐藏
                            }
                            $("#deliverTime").show();//显示到货时间div;
                            $("em.blankLine").width($("#areaSel").width()+23);
                        }
                    },"json");
                }
            }
        }
        // +-商品数量
        function changeProdCount(type,eventSrc){
            if(!checkSelected(true,eventSrc)){
                return false;
            }
            var newNum;
            var num = parseInt($newNum.val());
            switch(type){
                case '+':
                    num++;
                    break;
                case '-':
                    num--;
                    break;
                default:
                    break;
            }
            if(num<1){
                num=1;
            }
            if(!gIsSpecialUser){
                var limitNum = glimitbuyMaxNum;
                if(num > curStock){
                    //$newNum.val('1'); #13901
                    $newNum.val(curStock);
                    alert("抱歉！您购买的数量超过库存量！");
                    return;
                }
                if(num > limitNum){
                    $newNum.val(limitNum);
                    alert("一次最多购买"+String(limitNum)+"件");
                    return;
                }
            }
            $(".newNum").val(num);
            $(".oldNum").val(num);
        }
        //售罄时的动作
        function soldOut(){
            if(active){
                if(active.activeType == 18 && (active.timeMillisType == 1 || active.timeMillisType == 2)){
                    return false;
                }
            }
            var msg = projectNo=='yg'?'<p class="fb Size14" style="padding-top:10px">此颜色商品已售罄</p><p>您可以选择其他颜色，或者到<strong><a href="/" onclick="_gaq.push([\'_trackPageview\',\'/PageAction/detail/to_index\']);"  class="Blue">优购首页</a></strong>挑选喜欢的商品</p><p class="blank8"></p>':'<p class="fb Size14" style="padding-top:10px">此颜色商品已售罄</p><p>您可以选择其他颜色，或者到<strong><a href="/"  onclick="_gaq.push([\'_trackPageview\',\'/PageAction/detail/to_outlets\']);" class="Blue">特卖商品首页</a></strong>挑选喜欢的商品</p><p class="blank8"></p>'
            $("#imgBtn_0").after(msg);
            $(".prosize,.num,.selected,.qbuy").hide();
            $('#ygprice_area').children().not('del').hide();


            YGG.Module.writeSoldoutMsg();
        }
        // 立刻购买
        function buyNow(){
            if(_gaq){
                $gaq_this = $(this);
                var gid = $gaq_this.attr('id');
                if (gid == 'buyNow') {
                    if ($gaq_this.hasClass('hdpic_buybtn')) {
                        _gaq.push(['_trackPageview','/PageAction/Buy/buyview']);
                    } else {
                        _gaq.push(['_trackPageview','/PageAction/Buy/buy']);
                    }
                } else if (gid == 'botBuybtn') {
                    _gaq.push(['_trackPageview','/PageAction/Buy/buydown']);
                }
            }

            behavior =0;
            if(!checkBuy(this)){
                return;
            }

            var fnBuyNow=function(){
                var productNum = $(".newNum").val();
                if($('.mltpl_actv .credit').hasClass('activ')){
                    var isContinue = false;
                    var consumePoint = $('.mltpl_actv .credit').attr("consumePoint");
                    $.ajax({
                        type: "POST",
                        async : false,
                        url: "/commodity/getMemberUsableIntegral.sc",
                        dataType : "json",
                        cache:false,
                        success: function(data){
                            if(data && consumePoint && parseInt(data)>=parseInt(consumePoint)*parseInt(productNum)){
                                isContinue = true;
                            }
                        }
                    });
                    if (!isContinue) {
                        alert("您的可用积分不足，无法换购该商品");
                        return;
                    }
                }

                var $selectSize = sizeSpecItem.filter('.select');
                var buyFormObj = $("#buyForm"),goodsNo = $selectSize.data('goodInfo').goodNo;
                //$("#productId").val(prodInfo.cId);
                $("#productNum").val(productNum);
                $("#productNo").val(goodsNo);
                var href=(function(str){
                    var n=str.indexOf('?');
                    var s=''
                    n==-1?s=str.substring(0):str.substring(0,n);
                    //var s=str.substring(0);
                    return s;
                })(window.location.href);
                var referrer=(function(str){
                    var n=str.indexOf('?');
                    var s=''
                    n==-1?s=str.substring(0):s=str.substring(0,n);
                    //var s=str.substring(0);
                    return s;
                })(document.referrer);
                $("#productUrl").val(href);
                $("#refProductUrl").val(referrer);
                buyFormObj.attr("action", '/addProdutToCart.jhtml');
                buyFormObj.hide();
                if($('.mltpl_actv').attr("vipprice")){
                    var statusOpt = document.createElement("textarea");
                    statusOpt.name = "acceptStatus";
                    if($('.mltpl_actv .credit').hasClass('activ')){
                        statusOpt.value = "1";
                    } else {
                        statusOpt.value = "2";
                    }
                    buyFormObj.append(statusOpt);
                }
                //2015-08-28 立即购买的商品不添加到到购物车
                var linkBuyText = document.createElement("input");
                linkBuyText.type = "text";
                linkBuyText.name = "linkBuy";
                linkBuyText.value = "0";
                buyFormObj.append(linkBuyText);

                //购买支付流程虚拟链接添加
                if(_gaq){
                    _gaq.push(['_trackPageview','/PageAction/Buy/buy?page=' + document.location.pathname + document.location.search + '&from=' + document.referrer]);
                }

                setTimeout(function() {buyFormObj.submit();}, 0);// ie6 bug
            }
            buyNowCallback=fnBuyNow;
            if(!showLoginPop('buyNowCallback')){
                fnBuyNow();		//先判断登陆再执行立即购买跳转
            }
        }
        // 加入购物车
        function addShoppingCart(){
            if(_gaq){
                var gid = $(this).attr('id');
                if (gid == 'addShoppingCart') {
                    _gaq.push(['_trackPageview','/PageAction/Buy/add_to_cart']);
                } else if (gid == 'botCartbtn') {
                    _gaq.push(['_trackPageview','/PageAction/Buy/add_to_cartdown']);
                }
            }

            //0:立即购买  1:加入购物车
            behavior = 1;
            //判断是否选择尺码
            var _this=$(this);
            if(!checkBuy(this)){
                return;
            }

            //倒计时10秒
            var i = 10;
            //定义购物车弹出框
            var shoppingContent = '<div>'+
                '<p style="margin-left:20px;"><img style="width:33px;height:33px;" src="../template/common/images/ubg14.png"><em style="margin-left:10px;font-size:14px;font-weight:bold;">商品已加入购物车中！</em></p>';

            //获取加入购物车推荐商品部分，1代表获取第一组的数据
            var shoppingContentCommodityInfo = getShoppingContentCommodityInfo(1,"addShopping");
            //如果为预约商品 弹出登陆窗口
            if($(".res_countdown").length > 0){
                addShoppingCartCallback=addShoppingCart;
                if(!showLoginPop('addShoppingCartCallback')){
                    addShoppingCart();		//先判断登陆再执行收藏
                }else{
                    return
                }
            }

            //加入购物车,获取商品数量、总价格、货币
            function addShoppingCart(){
                var goodsNo = sizeSpecItem.filter('.select').data('goodInfo').goodNo;
                var param = [];
                param.push("productId=" + prodInfo.cId);
                param.push("&productNum="+$(".newNum").val());
                param.push("&productNo="+goodsNo);
                param.push("&targetUrl=/yitianmall/shoppingmgt_new/simpleShoppingCart");
                var href=(function(str){
                    var n=str.indexOf('?');
                    var s='';
                    n==-1?s=str.substring(0):str.substring(0,n);
                    //var s=str.substring(0);
                    return s;
                })(window.location.href);
                var referrer=(function(str){
                    var n=str.indexOf('?');
                    var s='';
                    n==-1?s=str.substring(0):s=str.substring(0,n);
                    //var s=str.substring(0);
                    return s;
                })(document.referrer);
                //console.log(referrer);
                param.push("&productUrl="+href);
                param.push("&refProductUrl="+referrer);
                //alert("productUrl:"+window.location+"\nrefProductUrl"+document.referrer);
                if($('.mltpl_actv').attr("vipprice")){
                    if($('.mltpl_actv .credit').hasClass('activ')){
                        param.push("&acceptStatus=1");
                    } else {
                        param.push("&acceptStatus=2");
                    }
                }
                if(!ygDialog){
                    loadjs($('#jsYgDialog').val(),function(){});
                }
                $.ajax({
                    type: "POST",
                    url:YouGou.Biz.ShoppingCart.cartActionBasePath+"c_addProdut.sc",
                    data:param.join(''),
                    cache:false,
                    success:function(data){
                        if(data){
                            //modify by wangzhixing 2014-6-11
                            eval("data="+data);
                            if (data.errorMsg) {
                                alert(data.errorMsg);
                                return false;
                            }
                            if(data.redirect){
                                location.href=data.redirect;
                                return false;
                            }
                            $("#pordcount").html(data.shoppingCartCommidityCount);
                            var minHeight = 330;

                            //获取加入购物车部分内容
                            var shoppingContentPart = getShoppingContentPart(data.shoppingCartCommidityCount,data.shoppingCartBuyAmount);
                            var shoppingContentPartMoreGood = gitShoppingMoreGood();
                            var shoppingContentEnd = "</ul></div>";
                            if(shoppingContentCommodityInfo){
                                //拼接购物车弹出框
                                shoppingContent = String.prototype.concat(shoppingContent,shoppingContentPart,shoppingContentPartMoreGood,shoppingContentCommodityInfo,shoppingContentEnd);
                            }else{
                                minHeight = 160;
                                //拼接购物车弹出框
                                shoppingContent = String.prototype.concat(shoppingContent,shoppingContentPart,shoppingContentEnd);
                            }

                            //创建窗体

                            yg_dialog_bind = new ygDialog({
                                close: function(){// 对话框关闭前执行的函数
                                    clearInterval(timer);
                                },
                                loaded:null,//url加载完成回调
                                lock: true,	// 是否锁屏
                                closable:true, //是否允许关闭
                                fixed:true,
                                minHeight:minHeight,
                                minWidth:430,
                                skin:3,
                                drag:false
                            });

                            //展示加入购物车内容
                            yg_dialog_bind.content(shoppingContent);

                            //购买支付流程虚拟链接添加
                            if(_gaq){
                                _gaq.push(['_trackPageview','/PageAction/Buy/add_to_cart?page=' + document.location.pathname + document.location.search + '&from=' + document.referrer]);
                            }
                            timer = setInterval(fn, 1000);
                            fn();
                        }
                    }
                });
            };

            var fn = function () {
                if(i <= 0){
                    yg_dialog_bind.close();
                }
                $("#bind_tip2").text("倒计时" + i + "秒后自动关闭");
                i --;
            };
            //timer = setInterval(fn, 1000);
            //fn();

            //会员尊享需先判断登陆状态
            //if($('#activeContent').attr('vipprice')){
            //  addShoppingCartCallback=addShoppingCart;
            //   if(!showLoginPop('addShoppingCartCallback')){
            //       addShoppingCart();		//先判断登陆再执行收藏
            //   }
            //}else{
            addShoppingCart();
            //}

            return false;

        }

        //购物车、推荐商品---换一批
        $("#change_recommend").live("click",function(){
            shopNum++;
            var shoppingContent = getShoppingContentCommodityInfo(shopNum,"addShopping");
            //清楚子元素
            $("#ul_commodity").empty();
            $("#ul_commodity"). append(shoppingContent);

        });

        //购物车、收藏商品---换一批
        $("#change_collection").live("click",function(){
            collectionNum++;
            var collectionContent = getShoppingContentCommodityInfo(collectionNum,"addCollection");
            //清楚子元素
            $("#ul_collection").empty();
            $("#ul_collection"). append(collectionContent);

        });

        //获取加入购物车弹出框前部分
        function getShoppingContentPart(commidityCount,buyAmount){
            var funShoppingContentPart =  '<p style="margin-left:63px;margin-top:5px;">您的购物车中共有<em style="color:#e60012;font-size: 13px; font-family: 微软雅黑;">'+commidityCount+'</em>件商品，金额共计<em style="color:#e60012;font-size: 13px; font-family: 微软雅黑;">'+buyAmount+'</em>元。</p>'+
                '<p style="margin-left:63px;margin-top:15px;"><a style="background: none repeat scroll 0% 0% #e60012;border: 1px solid #F14E04;color: #FFF;padding:3px 12px 3px 23px;display: inline-block;width:50px;border-radius: 3px;vertical-align: middle;" onclick="YouGou.Biz.ShoppingCart.checkShoppingCart();" href="?" id="close_bind">去结算</a>&nbsp;&nbsp;&nbsp;<a href="?" class="cblue">继续购物>></a></p>'+
                '<p style="margin-left:63px;margin-top:10px;"><em id="bind_tip2" style="color: #AAA;">倒计时10秒后自动关闭</em></p></div>';

            return funShoppingContentPart;
        };
        //加入购物车弹出框 换几个更好的
        function gitShoppingMoreGood(){
            var funhoppingMoreGood = '<div style="margin:10px 20px 5px 20px;border-bottom:1px dotted #D1D1D1;"></div><div><p style="margin-left:22px;"><em">购买该商品的用户还购买了</em>'+
                '<a style="margin-left:170px;" href="javascript:" class="cblue" id="change_recommend">换几个更好的</a></p><ul id="ul_commodity" style="list-style:none;margin-left:13px;">';
            return funhoppingMoreGood;
        };

        // 校验购买参数
        function checkBuy(eventSrc){
            // 是否选择规格
            if(!checkSelected(true,eventSrc)){
                return false;
            }else if($(".newNum").val()==0){
                //选择数量
                alert("请选择购买数量");
                return false;
            }
            return true;
        }
        //校验是否选择尺码
        function checkSelected(isPrint,eventSrc){
            var	isSelected = true;
            if(sizeSpecItem.filter('.select').length==0){
                isSelected = false;
                // 是否弹出警告
                if(isPrint){
                    popSize.show(eventSrc);
                    return false;
                }
            }
            return isSelected;
        }
    },

    //获取仓库公告
    getWarehouseNotice:function(){
        var commodityNo = prodInfo.cNo;
        if(commodityNo!=null){
            $.get("/api/warehouse_notice.jhtml?cNo="+commodityNo+"&m="+Math.random(),function(warehouseNotice){
                var show=warehouseNotice.show;
                if(show!='no'){
                    var date=warehouseNotice.date;
                    var html='<p class="ht25" style="padding-bottom:5px;"><span>温馨提示：</span><span class="Red">由于品牌商节日休假，将延迟到'+date+'发货</span></p>';
                    $("#commentStatisticsData").before(html);
                }
            },"json");
        }
    },
//获取最近浏览的商品
    getCmntAndHistory:function(){
        var arrHistorys;
        setHistoryProduct();
        $.ajax({
            type: "POST",
            url: "/commodity/getHistoryOrCommCommodity.sc",
            data:{"commodityNo":prodInfo.cNo},
            dataType : "json",
            cache:false,
            success: function(data){

                if(data.reviewcomStr.length > 0){

                    //最近浏览
                    showHistory(data.reviewcomStr);
                    showHistory2(data.reviewcomStr);
                    $("#histyGuessGuds").show();
                }
            }
        });
        function showHistory2(data){
            if(!data){return;}
            var len = data.length,d,$History=$('#historyGoods2');
            if(len==0){
                $History.html('<p class="noinfo">暂时还未浏览过其他商品</p>');
                return;
            }
            var sHtml = [];
            for(var y =1;y<arrHistorys.length;y++){
                for(var i=0;i<len;i++){
                    d = data[i];
                    if(d.cNo != arrHistorys[y])continue;
                    var link = d.url+"#ref=detail&po=recent";
                    sHtml.push('<li><a href="'+link+'"><div class="histpic"><img src="');
                    sHtml.push(d.img.replace('s.jpg','t.jpg'));
                    sHtml.push('" alt=""></div><div class="histmsg"><p class="hisproname">');
                    sHtml.push(d.cName.substr(0,12));
                    sHtml.push('</p><p class="price_sc"><em class="ygprc15">&yen;<i>');
                    if(d.activePrice!=d.salePrice){
                        sHtml.push(d.activePrice);
                    }else{
                        sHtml.push(d.salePrice);
                    }
                    sHtml.push('</i></em><del>&yen;');
                    sHtml.push(d.publicPrice);
                    sHtml.push('</del></p></div></a></li>');
                }
            }
            $History.html(sHtml.join(''));
            historyfanye();
        }
        function historyfanye(){
            $(".hisprev").bind("click",function(){
                var thispage = $(".qiehuan li").eq(1).html();
                if(thispage!=1){
                    thispage --;
                }
                $(".qiehuan li").eq(1).html(thispage);
                getHistyUlPosition(thispage);
            });
            $(".hisnext").bind("click",function(){
                var thispage = $(".qiehuan li").eq(1).html();
                if(thispage!=$(".qiehuan li").eq(3).html()){
                    thispage ++;
                }
                $(".qiehuan li").eq(1).html(thispage);
                getHistyUlPosition(thispage);
            });
            getHistyGuessGudsCont();
            getHistyUlPosition(1);
            function getHistyUlPosition(pagenum){
                var ulpostop = - ( pagenum - 1 ) * 240;
                $(".histyGudsul ul").css("top",ulpostop+"px");
            }
            function getHistyGuessGudsCont(){
                var yeshu = Math.ceil($(".histyGudsul li").length / 3);
                $(".qiehuan li").eq(3).html(yeshu);
            }
        }
        //显示最近浏览
        function showHistory(data){
            if(!data){return;}
            var len = data.length,d,$History=$('#historyGoods');
            if(len==0){
                $History.html('<p class="noinfo">暂时还未浏览过其他商品</p>');
                return;
            }
            len = len>3?3:len;
            var sHtml = [];
            for(var y =1;y<arrHistorys.length;y++){
                for(var i=0;i<len;i++){
                    d = data[i];
                    if(d.cNo != arrHistorys[y])continue;
                    var link = d.url+"#ref=detail&po=recent";
                    sHtml.push('<li><p class="pro_name"><a target="_blank" href="');
                    sHtml.push(link);
                    sHtml.push('" >');
                    sHtml.push(d.cName);
                    sHtml.push('</a></p><div class="pro_info clearfix"><a class="pro_img fl" target="_blank" href="');
                    sHtml.push(link);
                    sHtml.push('"><img class="lazy_loading" width="60" height="60" original="');
                    sHtml.push(d.img.replace('s.jpg','t.jpg'));
                    sHtml.push('" src="');
                    sHtml.push(YouGou.UI.baseUrl);
                    sHtml.push('/template/common/images/blank.gif"/></a><p class="price fl"><span class="price_sc">市场价：<s>￥');
                    sHtml.push(d.publicPrice);
                    if(d.activePrice!=d.salePrice){
                        sHtml.push('</s></span><span class="price_sc">活动价：<em class="ygprc14">&yen;<i>');
                        sHtml.push(d.activePrice);
                    }else{
                        sHtml.push('</s></span><span class="price_sc">优购价：<em class="ygprc14">&yen;<i>');
                        sHtml.push(d.salePrice);
                    }
                    sHtml.push('</i></em></span></p></div></li>');
                }
            }
            $History.html(sHtml.join(''));
            if($('img',$History).length>0){
                //$('img',$History).lazyload({placeholder:YouGou.UI.uimg.img160,effect:"fadeIn",failurelimit: 200});
                $('img',$History).lazyload();
            }
        }
        // 浏览商品后写入Cookie
        function setHistoryProduct(){
            // 取出历史商品信息
            var strHistory = YouGou.Biz.cookie('yg_history_goods');
            var curCno = prodInfo.cNo;
            arrHistorys = [curCno];
            if(strHistory&&strHistory.indexOf('[')<0){
                strHistory = strHistory.split(',');
                var len = strHistory.length>7?7:strHistory.length;
                for(var i=0;i<len;i++){
                    if(strHistory[i]!=curCno&&strHistory[i]!=''){
                        arrHistorys.push(strHistory[i]);
                    }
                }
            }
            //清空旧的cookie，等下次发版的时候删除这两句
            YouGou.Biz.cookie('yg_history_goods', arrHistorys.join(','), {expires: 30, path: '/',domain:'.yougou.com',secure: false});
        }
    },

    getRecentViewRecommend2:function(){
        $.ajax({
            type:"post",
            cache:false,
            url:"/commodity/getRecentViewRecommend.sc",
            success:function(d){
                if(!d || d == "[null]"){
                    return ;
                }
                var d = eval('('+d+')');
                var strCon = "";
                if(d.length > 0){
                    strCon='<p id="funmove-2" class="funmove-2"></p><p class="guesstit">根据浏览猜您喜欢</p><a href="javascript:;" class="guessprev caiGudsprev"></a><a href="javascript:;" class="guessnext caiGudsnext"></a><div class="guessGudsBox2 caiGuds"><ul id="guessGuds2" class="guessGudsList" style="left: 0px;"></ul></div>';
                    $('.guessGuds').append(strCon);
                    //$("#histyGuessGuds").show();
                }else{
                    $("#histyGuessGuds").css("display","none");
                }
                showDate('#guessGuds2',d,'#ref=detail&po=guess',5,false);
            }
        });

        function showDate(strDom,data,urlParam,iMoveStep,islazy){
            if(!data){
                return;
            }
            var lazy=islazy?islazy:false;
            var urlParam = urlParam?urlParam:'';
            var len = data.length,d,$dom = $(strDom);;
            if(len==0){
                $dom.html('<p class="noinfo">暂时没有相关推荐</p>');
                return;
            }
            var sHtml = [],d;
            for(var i=0;i<len;i++){
                d = data[i];
                var link = d.dpUrl+urlParam;
                sHtml.push('<li><a class="img" target="_blank" href="');
                sHtml.push(link);
                if(lazy||i>iMoveStep-1){
                    sHtml.push('"><img class="lazy_loading" original="');
                    sHtml.push(d.thumbnail);
                    sHtml.push('" src="')
                    sHtml.push(YouGou.UI.baseUrl);
                    sHtml.push('/template/common/images/blank.gif" width="160" height="160"/></a><a class="tit"  target="_blank" href="');
                }else{
                    sHtml.push('"><img src="');
                    sHtml.push(d.thumbnail);
                    sHtml.push('" width="160" height="160" /></a><a class="tit" target="_blank" href="');
                }

                sHtml.push(link);
                sHtml.push('" >');
                sHtml.push(d.name);
                sHtml.push('</a><p class="price_sc"><em class="ygprc15">&yen;<i>');
                sHtml.push(d.salePrice);
                sHtml.push('</i></em><del>&yen;');
                sHtml.push(d.marketPrice);
                sHtml.push('</del><span class="ico_discount"><i>');
                sHtml.push(d.rebate);
                sHtml.push('</i>折</span></p></li>');

            }
            $dom.html(sHtml.join('')).show();
            if(lazy){
                //$dom.find('img').lazyload({placeholder:YouGou.UI.uimg.img160,failurelimit: 200});
                $dom.find('img').lazyload();
            }
            if(len>iMoveStep){
                $(".caiGuds").ygSwitch('.caiGuds>ul>li',{
                    nextBtn:'.caiGudsnext',
                    prevBtn:'.caiGudsprev',
                    steps:iMoveStep,
                    visible:iMoveStep,
                    lazyload:true,
                    effect: "scroll",
                    circular:true,
                    pagenation:'#funmove-2'
                }).carousel()
            }else{
                $dom.parents('.guessGuds:first').children('a').hide();
            }
        }
    },
//买了又买/看了又看/猜您喜欢/看了还买了
    getRecommend:function(){
        /*mv统计变量*/
        var arrMVQDanpinRecommend=[];
        /*mv统计变量end */
        $.ajax({
            type: "GET",
            url: '/commodity/getDanpinRecommendBySku.sc?sku='+prodInfo.cNo,
            cache:false,
            success: function(d){
                var d = eval('('+d+')')[0];
                if(!d.wantWant)
                {
                    //由于买了有买的结构是写在页面里的，所以没数据的时候要隐藏
                    //暂时这样处理
                    //console.log($('#buyBuy').parent().parent().parent());
                    $('#buyBuy').parent().parent().parent().css('display','none');
                    //return;
                    $("#buybuy2").parent().css('display','none');
                }
                if(!d.similar){
                    $("#otherlikegoods2").parent().css('display','none');
                }
                if(!d.viewWant){
                    /*mv统计*/
                    var src=$('#jsmvqscript').attr('src1');
                    if(src){
                        $('#jsmvqscript').attr('src',src);
                    }
                    $("#viewbuy2").parent().css("display","none");
                    /*mv统计结束*/
                    return;
                }


                var $GoodBar=$('.bindSaleTj>.goodsBar'),str='',strCon='';
                /*if(d.wantWant){

                 str='<a href="?">看过本商品的用户还想购买</a><a href="?">看过本商品的用户还看过</a>';
                 strCon='<div class="goodsTjCon"><a class="prevBtn">向左</a><a class="nextBtn">向右</a><div class="newListy goodsTjProList"><ul class="proList new_prdlist" id="viewbuy"></ul></div></div><div class="goodsTjCon"><a class="prevBtn">向左</a><a class="nextBtn">向右</a><div class="newListy goodsTjProList"><ul class="proList new_prdlist" id="goodsViewList"></ul></div></div>';
                 $('.bindSaleTj>div').append(strCon);
                 showDate('#buyBuy',d.wantWant,'#ref=detail&po=buy',4);	//买了又买
                 }else{
                 str='<a href="?">看过该商品的用户还想购买</a>';
                 strCon='<div class="goodsTjCon"><a class="prevBtn">向左</a><a class="nextBtn">向右</a><div class="newListy goodsTjProList"><ul class="proList new_prdlist" id="viewbuy"></ul></div></div>';
                 $('.bindSaleTj>div').append(strCon);
                 }
                 $GoodBar.append(str);*/
                if(d.viewView){
                    strCon='<div class="goodsTjCon"><a class="prevBtn">向左</a><a class="nextBtn">向右</a><div class="newListy goodsTjProList"><ul class="proList new_prdlist" id="viewbuy2"></ul></div><p class="viewtit">看过本商品的用户最终购买</p></div>>';
                    $('.bindSaleTj>div').append(strCon);
                    $('.bindSaleTj').show();
                }

                //showDate('#viewbuy2',d.viewWant,'#ref=detail&po=look',6);//浏览过本商品的用户还浏览了
                showDate('#viewbuy2',d.viewWant,'#ref=detail&po=finalbuy',6);//看过本商品的用户最终购买

                showDate2('#otherlikegoods2',d.similar,'#ref=detail&po=similar',5,true);//其他相似商品
                showDate2('#buybuy2',d.wantWant,'#ref=detail&po=buybuy',5,true);//购买了该商品的用户还购买了
                // showDate('#goodsViewList',d.viewView,'#ref=detail&po=look',5,true);     //看了又看
                showViewTwice('.look_goods .look_goods_ul',d.viewView,'#ref=detail&po=look',3,true); //新看了又看（2016.2.19 redmine_18589）
                //showDate('#viewbuy',d.viewWant,'#ref=detail&po=finalbuy',5);			//看了还买了
                //ShowSimilarRecom('#goodsTjProList',d.similar,'#ref=detail&po=buy');	//猜你喜欢

                // $GoodBar.children('a:first').click();
                if(goodsbar_top){
                    goodsbar_top=$('.goods_lc').offset().top;  //重新设置商品详情默认高度
                }
                /*mv统计*/
                var _mvq = window._mvq || [];
                window._mvq = _mvq;
                _mvq.push([ '$setGeneral', 'recommend', ' ', '', '' ]);
                _mvq.push([ '$addItem', '',arrMVQDanpinRecommend.join(','), '', '', '' ]);
                _mvq.push([ '$logData' ]);
                var src=$('#jsmvqscript').attr('src1');
                if(src){
                    $('#jsmvqscript').attr('src',src);
                }
                /*mv统计结束*/
            }});
        //统一处理显示
        function showDate2(strDom,data,urlParam,maxCon,islazy){
            if(!data){
                return;
            }
            var lazy=islazy?islazy:false;
            var urlParam = urlParam?urlParam:'';
            var len = data.length,d,$dom = $(strDom);;
            if(len==0){
                $dom.html('<p class="noinfo">暂时没有相关推荐</p>');
                return;
            }
            var oHtml = [],d;
            for(var i = 0 ; i < maxCon && i < len ; i ++){
                var d = data[i];
                var link = d.dpUrl+urlParam;
                oHtml.push('<li class="pro_bgpicLis"><div class="propic">');
                oHtml.push('<a target="_blank"  href="'+link+'">')
                oHtml.push('<img class="lazy_loading" original="');
                oHtml.push(d.thumbnail);
                oHtml.push('" src="')
                oHtml.push(YouGou.UI.baseUrl);
                oHtml.push('/template/common/images/blank.gif" width="160" height="160"/></div><p class="proName">');
                oHtml.push(d.name);
                oHtml.push('</p><p class="price_sc"><em class="ygprc15">&yen;<i>');
                oHtml.push(d.salePrice);
                oHtml.push('</i></em><del>&yen;');
                oHtml.push(d.marketPrice);
                oHtml.push('</del><span class="ico_discount"><i>');
                oHtml.push(d.rebate);
                oHtml.push('</i>折</span></p></li>');
            }
            $dom.html(oHtml.join('')).show();
            if(lazy){
                $dom.find('img').lazyload();
            }

        }

        //新看了又看页面（2016.2.19 redmine_18589）
        function showViewTwice(strDom,data,urlParam,iMoveStep,islazy){
            if(!data){
                return;
            }
            if(data.length>18)data.length = 18;
            var lazy=islazy?islazy:false;
            var urlParam = urlParam?urlParam:'';
            var len = data.length,d,$dom = $(strDom);;
            if(len==0){
                $dom.html('<p class="noinfo">暂时没有相关推荐</p>');
                return;
            }
            var sHtml = [],d;
            for(var i=0;i<len;i++){
                d = data[i];
                // console.log( d );
                var link = d.dpUrl+urlParam+(d.abVersion ? "&abVersion="+ d.abVersion : "");
                sHtml.push('<li><a target="_blank" href="');
                sHtml.push(link);
                if(lazy||i>iMoveStep-1){
                    sHtml.push('"><img class="lazy_loading" original="');
                    sHtml.push(d.thumbnail);
                    sHtml.push('" src="')
                    sHtml.push(YouGou.UI.baseUrl);
                    sHtml.push('/template/common/images/blank.gif" width="140" height="140"/></a>');
                }else{
                    sHtml.push('"><img src="');
                    sHtml.push(d.thumbnail);
                    sHtml.push('" width="140" height="140" /></a>');
                }
                sHtml.push('<div class="look_goods_tit"><a target="_blank" href="');
                sHtml.push(link);
                sHtml.push('"><span class="fl">');
                sHtml.push(d.brand_name);
                sHtml.push('</span><span class="fr">&yen;');
                sHtml.push(d.salePrice);
                sHtml.push('</span></a></div></li>');
                /*mv*/
                try {
                    arrMVQDanpinRecommend.push(d.id);
                } catch(e) {}


            }
            $dom.html(sHtml.join('')).show();
            $dom.css({position:'absolute'});
            if(lazy){
                //$dom.find('img').lazyload({placeholder:YouGou.UI.uimg.img160,failurelimit: 200});
                $dom.find('img').lazyload();
            }
            if(len>iMoveStep){
                var $parents = $dom.parents('.look_goods:first');
                $dom.slideMove({btnPre:$parents.find('.look-switchable-prev-btn:first'),btnNxt:$parents.find('.look-switchable-next-btn:first'),moveStep:iMoveStep,isAnimate:true,bShowPage:false});
            }else{
                $dom.parents('.look_goods:first').find('.look_switchable-trigger').hide();
            }
        }

        function showDate(strDom,data,urlParam,iMoveStep,islazy){
            if(!data){
                return;
            }
            if(data.length>24)data.length = 24;
            var lazy=islazy?islazy:false;
            var urlParam = urlParam?urlParam:'';
            var len = data.length,d,$dom = $(strDom);;
            if(len==0){
                $dom.html('<p class="noinfo">暂时没有相关推荐</p>');
                return;
            }
            var sHtml = [],d;
            for(var i=0;i<len;i++){
                d = data[i];
                var link = d.dpUrl+urlParam+(d.abVersion ? "&abVersion="+ d.abVersion : "");
                sHtml.push('<li><a class="img" target="_blank" href="');
                sHtml.push(link);
                if(lazy||i>iMoveStep-1){
                    sHtml.push('"><img class="lazy_loading" original="');
                    sHtml.push(d.thumbnail);
                    sHtml.push('" src="')
                    sHtml.push(YouGou.UI.baseUrl);
                    sHtml.push('/template/common/images/blank.gif" width="160" height="160"/></a><a class="tit"  target="_blank" href="');
                }else{
                    sHtml.push('"><img src="');
                    sHtml.push(d.thumbnail);
                    sHtml.push('" width="160" height="160" /></a><a class="tit" target="_blank" href="');
                }
                sHtml.push(link);
                sHtml.push('" >');
                sHtml.push(d.name);
                sHtml.push('</a><p class="price_sc"><em class="ygprc15">&yen;<i>');

                /* if(d.isActive==1){
                 sHtml.push('</s></span><span class="price_sc">活动价： <em class="ygprc14">&yen;<i>');
                 }else{
                 sHtml.push('</s></span><span class="price_sc">优购价： <em class="ygprc14">&yen;<i>');
                 }*/
                sHtml.push(d.salePrice);
                sHtml.push('</i></em><del>&yen;');
                sHtml.push(d.marketPrice);
                sHtml.push('</del><span class="ico_discount"><i>');
                sHtml.push(d.rebate);
                sHtml.push('</i>折</span></p></li>');
                /*mv*/
                try {
                    arrMVQDanpinRecommend.push(d.id);
                } catch(e) {}


            }
            $dom.html(sHtml.join('')).show();
            if(lazy){
                //$dom.find('img').lazyload({placeholder:YouGou.UI.uimg.img160,failurelimit: 200});
                $dom.find('img').lazyload();
            }
            if(len>iMoveStep){
                var $parents = $dom.parents('.goodsTjCon:first');
                $dom.funMove({btnPre:$parents.find('.prevBtn:first'),btnNxt:$parents.find('.nextBtn:first'),moveStep:iMoveStep,isAnimate:true,bShowPage:true});
            }else{
                $dom.parents('.goodsTjCon:first').children('a').hide();
            }
        }
        //猜您喜欢
        function ShowSimilarRecom(strDom,data,urlParam){
            if(!data){return;}
            var urlParam = urlParam?urlParam:'';
            var len = data.length,d,$dom = $(strDom);
            //判断是否为查看大图页
            var isPgViewPic =$('.hdpic_logo').length>0?true:false;
            if(len==0){
                $dom.html('<p class="noinfo">暂时没有相关推荐</p>');
                return;
            }
            var sHtml = [],d;
            for(var i=0;i<len;i++){
                d = data[i];
                var link = d.dpUrl+urlParam;
                sHtml.push('<li><p class="pro_name"><a target="_blank" href="');
                sHtml.push(link);
                sHtml.push('" title="');
                sHtml.push(d.name);
                sHtml.push('" >');
                sHtml.push(d.name);
                sHtml.push('</a></p><div class="pro_info clearfix"><a class="pro_img fl" target="_blank" href="');
                sHtml.push(link);
                sHtml.push('"><img class="lazy_loading" width="60" height="60" original="');
                if(isPgViewPic){
                    sHtml.push(d.thumbnail);
                }else{
                    sHtml.push(d.thumbnail.replace('s.jpg','t.jpg'));
                }
                sHtml.push('" src="')
                sHtml.push(YouGou.UI.baseUrl);

                sHtml.push('/template/common/images/blank.gif"/></a><p class="price_sc"><em class="ygprc15">&yen;<i>');
                sHtml.push(d.salePrice);
                sHtml.push('</i></em><del>&yen;');
                sHtml.push(d.marketPrice);
                sHtml.push('</del><span class="ico_discount"><i>');
                sHtml.push(d.rebate);
                sHtml.push('</i>折</span></p></div></li>');
                /*mv*/
                try {
                    arrMVQDanpinRecommend.push(d.id);
                } catch(e) {}
            }
            $dom.html(sHtml.join('')).show();
            if($dom.find('img').length>0){
                $dom.find('img').lazyload();
            }
        }
    },
    //获取商品评论
    getComment:function(data){

        var option = $("input[name=cmmntLst]:checked").val();
        if(option == undefined){option = 0;}
        $('input.btnqd').bind('click',jumpPage);

        $('#page').unbind('click');
        $('#page').bind('click',function(e){
            if(e.target.tagName.toLowerCase()=='a'){
                var $this = $(e.target);
                if($this.attr('pageIndex')){
                    pageClickCallback($this.attr('pageIndex'));
                }
            }
        });
        initPager(0);
        // 初始化第一页
        function initPager (pageNo) {
            pageClickCallback(pageNo);
        }
        // 回调函数
        function pageClickCallback(pageNo) {
            var queryCommentUrl = '/commodity/queryCommentNew.sc';
            if(pageNo > pageCount) pageNo = pageCount;
            if(pageNo < 1) pageNo = 1;

            if(totalCount>0){
                var param = "cId="+prodInfo.cId+"&pageNo="+pageNo+"&option="+option;
                $('#userCommentContainer').load(queryCommentUrl,param,function(){
                    pageSize = parseInt($("#pageSize").val());
                    pageNo = parseInt($("#pageNo").val());
                    totalCount = parseInt($("#totalCount").val());

                    pageCount = parseInt((totalCount + pageSize - 1) / pageSize);
                    renderPager(pageNo,pageCount,"pageClickCallback");
                    //YouGou.Ajax.do_request("userCommentContainer",queryCommentUrl,param,null);
                    $('html,body').animate({scrollTop: $("#goods_comment").offset().top},10);
                    if($('.jsPicShowbox')[0]){
                        cmmntSdShow();
                        $('.showbox_xsmpic li img').lazyload();
                    }

                    $('.usercomm_content_box span.color').each(function(){
                        var text=$(this).text();
                        var len=text.length;
                        if(len>6)
                        {
                            text=text.substring(0,6)+'...';
                            $(this).text(text);
                        }
                    });
                    if($("#totalCount").val() != 0){
                        $("#comment_count>i").html($("#totalCount").val());
                    }
                });
            }else{
                $("#paginator").hide();
                var param = "cId="+prodInfo.cId+"&pageNo=1"+"&option="+option;
                $('#userCommentContainer').load(queryCommentUrl,param,function(){
                    pageSize = parseInt($("#pageSize").val());
                    pageNo = parseInt($("#pageNo").val());
                    totalCount = parseInt($("#totalCount").val());
                    pageCount = parseInt((totalCount + pageSize - 1) / pageSize);
                    if(pageCount > 0){
                        renderPager(pageNo,pageCount,"pageClickCallback");
                        $("#paginator").show();
                    }
                    if($('.jsPicShowbox')[0]){
                        cmmntSdShow();
                        $('.showbox_xsmpic li img').lazyload();
                    }

                    $('.usercomm_content_box span.color').each(function(){
                        var text=$(this).text();
                        var len=text.length;
                        if(len>6)
                        {
                            text=text.substring(0,6)+'...';
                            $(this).text(text);
                        }
                    });
                    if($("#totalCount").val() != 0){
                        $("#comment_count>i").html($("#totalCount").val());
                    }

                });

            }

        }

        //跳转到某页
        function jumpPage(){
            var toPage = $("#jumpToPage").val();
            $("#jumpToPage").val("");
            if(toPage=="")return;
            if(!/^[1-9]\d*$/.test(toPage)){
                alert("输入的页数有误，请重新输入！");
                return ;
            }
            if(toPage<1){
                toPage = 1;
            }
            if(toPage>pageCount){
                toPage = pageCount;
            }
            initPager(toPage);
        }
        //渲染分页页码
        function renderPager(curPage, pageCount, buttonClickCallback){
            var pagestr = ""; //组装的填充HTML字符串
            var leftNumber = 4 ;
            var rightNumber = 4;
            var breakspace = 2;
            var curPage = parseInt(curPage);
            pagestr += (curPage==1)?'<span class="prev prev1"></span>':'<a class="prev" style="cursor:pointer" pageIndex="'+(curPage-1)+'">上一页</a>';
            var start = 1;
            if ((curPage-leftNumber-breakspace)>=breakspace){
                start = curPage-leftNumber;
            }
            var end = pageCount;
            if((curPage+rightNumber+breakspace)<pageCount){
                end = (curPage+rightNumber);
            }

            if (curPage > (leftNumber+breakspace+1)){
                for(var i=1;i<=breakspace;i++){
                    pagestr += '<a style="cursor:pointer">'+i+'</a>';
                }
                pagestr += '<span class="break">...</span>';
            }

            for(var i=start;i<=end;i++){
                if(curPage == i){
                    pagestr += (curPage==i)?'<span class="current">'+i+'</span>':'<a style="cursor:pointer" pageIndex="'+i+'">'+i+'</a>';
                }else{
                    pagestr += '<a style="cursor:pointer" pageIndex="'+i+'">'+i+'</a>';
                }
            }

            if (end < pageCount){
                pagestr += '<span class="break">...</span>';
                var rightTemp = (pageCount-breakspace+1);
                for(var i=rightTemp;i<=pageCount;i++){
                    pagestr += '<a style="cursor:pointer" pageIndex="'+i+'">'+i+'</a>';
                }
            }

            if (curPage < pageCount){
                pagestr += '<a class="next" style="cursor:pointer" pageIndex="' +(curPage-0+1)+'">下一页</a>';
            }else{
                pagestr += '<span class="next">下一页</span>';
            }
            document.getElementById("page").innerHTML = pagestr;
        }
        //评价晒单展示
        function cmmntSdShow(){
            $('.jsPicShowbox').each(function(){
                var $this=$(this);
                var $index=$('.jsPicShowbox').index(this);
                var lgpicArr=[];
                var lgpic=$this.attr('data');
                var showboxBd=$('.showbox_bd',$this);
                var showboxHd=$('.showbox_hd',$this);
                var smpic=$('img',showboxHd);
                lgpicArr=lgpic.split(',');
                var $len=lgpicArr.length;

                smpic.hover(function(){
                    $this.addClass('bigcursor').removeClass('leftcursor rightcursor smallcursor');
                },function(){
                    $this.removeClass('bigcursor leftcursor rightcursor smallcursor');
                });

                smpic.live('click',function(){
                    var _index=smpic.index(this);
                    smpicClick(_index);
                });

                $('.jsReducePic',showboxBd).click(function(){
                    reducePic();
                });

                $('.jsLeftRote',showboxBd).click(function(){
                    showboxBd.find('#lgImg'+$index).rotateRight(-90);
                });

                $('.jsRightRote',showboxBd).click(function(){
                    showboxBd.find('#lgImg'+$index).rotateRight(90);
                });

                function smpicClick(n){
                    showboxBd.show();
                    showboxHd.hide();
                    var _showboxLgpic=$('.showbox_lgpic',$this);
                    var _xsmpicLi=$('.showbox_xsmpic li',$this);
                    slideLgPic(_showboxLgpic,_xsmpicLi,n);
                    _xsmpicLi.live('click',function(){
                        var _index=_xsmpicLi.index(this);
                        slideLgPic(_showboxLgpic,_xsmpicLi,_index);
                    });
                    changeCursor(_showboxLgpic);
                    _showboxLgpic.unbind('click').bind('click',function(){
                        var _index=_xsmpicLi.parent().find('.on').index();
                        cursorClick(_showboxLgpic,_xsmpicLi,_index);
                    });
                }

                function slideLgPic(arg1,arg2,n){
                    arg1.addClass('loading').html('<img class="none" id="lgImg'+$index+'" src="'+lgpicArr[n]+'" />');
                    arg2.eq(n).addClass('on').siblings().removeClass('on');
                    $('#lgImg'+$index).bind('load',function(){
                        arg1.removeClass('loading');
                        $(this).removeClass('none');
                    });
                }

                //变换鼠标样式
                function changeCursor(arg){
                    var lgpicLeft=arg.offset().left;
                    var lgpicTop=arg.offset().top;
                    var lgpicWidth=arg.width();
                    arg.mousemove(function(e){
                        var _mousex=e.pageX;
                        var _mousey=e.pageY;
                        if($len>1){
                            if(_mousex<(lgpicLeft+(lgpicWidth/2)-50)){
                                $this.addClass('leftcursor').removeClass('bigcursor rightcursor smallcursor');
                            }
                            else if((_mousex>=(lgpicLeft+(lgpicWidth/2)+50))){
                                $this.addClass('rightcursor').removeClass('bigcursor leftcursor smallcursor');
                            }
                            else{
                                $this.addClass('smallcursor').removeClass('bigcursor leftcursor rightcursor');
                            }
                        }else{
                            $this.addClass('smallcursor').removeClass('bigcursor leftcursor rightcursor');
                        }
                    });

                }

                //点击鼠标图片切换、缩小
                function cursorClick(arg1,arg2,n){
                    if($this.hasClass('smallcursor')){
                        reducePic();
                    }
                    if($this.hasClass('leftcursor')){
                        n--;
                        if(n<=0){
                            n=0;
                        }
                        slideLgPic(arg1,arg2,n);
                    }
                    if($this.hasClass('rightcursor')){
                        n++;
                        if(n>=$len-1){
                            n=$len-1;
                        }
                        slideLgPic(arg1,arg2,n);
                    }
                }

                //缩小图片
                function reducePic(){
                    showboxBd.hide();
                    showboxHd.show();
                }

            });
        }
        //评论排序
        $("#evaluation").click(function(){
            var $this = $(this).find("span").html();
            var p_html;
            //alert($this);
            $("#evaluation_list").show();
            $("#evaluation_list p").click(function(){
                p_html = $(this).html();
                $("#evaluation span").html(p_html);
                $("#evaluation_list").hide();
            })

        });
        $("#recommend_sorting").click(function(){
            var $this = $(this).find("span").html();
            var p_html;
            //alert($this);
            $("#recommend_list").show();
            $("#recommend_list p").click(function(){
                p_html = $(this).html();
                $("#recommend_sorting span").html(p_html);
                $(this).html($this);
                $("#recommend_list").hide();
            })

        })
        //评论排序 end
    },
    //获取销售分类 redmine15575
    getBrandCatg:function(dom){
        //拼接html
        function joinHtml(d){
            var len=d.length,arrTmp=[],arrOtherTmp=[];
            $(d).each(function(i,n){
                if(i<5){
                    if(i==4||i==len-1){
                        arrTmp.push('<li style="border:none"><a target="_blank" href="'+n.url+'">'+n.name+'</a></li>');
                    }else{
                        arrTmp.push('<li><a target="_blank" href="'+n.url+'">'+n.name+'</a></li>');
                    }
                }else{
                    if(i==len-1){
                        arrOtherTmp.push('<li style="border:none"><a target="_blank" href="'+n.url+'">'+n.name+'</a></li>');
                    }else{
                        arrOtherTmp.push('<li><a target="_blank" href="'+n.url+'">'+n.name+'</a></li>');
                    }
                }
            });
            var otherlist=arrTmp.join(''),allist=otherlist+arrOtherTmp.join('');
            return [otherlist,allist];
        }
        //插入dom
        function handleDom(arrData,dom){
            if(arrData.length==1){
                dom.find('ul,p').remove().append(arrData[0]);
            }else{
                var domOtherList=dom.find('.other_list');
                if(domOtherList.length==0){
                    dom.append('<ul class="other_list"></ul>').find('.noinfo').remove();
                    domOtherList=dom.find('.other_list')
                }
                domOtherList.html(arrData[0]);
                dom.find('.all_list ul').html(arrData[1]);
            }
        }
        var sku=prodInfo.cNo;
        $.get('/ssc/getCatgAndBrand.sc',{sku:sku},function(d){
            var domCat=$('.good_rList_cat'),d=d[0];

            if(!d.BrandCatg||d.BrandCatg.length==0){
                handleDom(['<p class="noinfo">暂时无其他款式信息</p>'],domCat.eq(0));
            }else{
                var arrhtml=joinHtml(d.BrandCatg);
                handleDom(arrhtml,domCat.eq(0));
            }

            if(!d.CatgBrand||d.CatgBrand.length==0){
                handleDom(['<p class="noinfo">暂时无其他款式信息</p>'],domCat.eq(1));
            }else{
                var arrhtml=joinHtml(d.CatgBrand);
                handleDom(arrhtml,domCat.eq(1));
            }

        },'json');

    },

// 放大镜-绑定切换图片
    mimgMouseoverEvent:function(){
        $("#spec-list").bind("mouseover",function(e){
            if(e.target.tagName.toLowerCase()=='img'){
                var $this = $(e.target);
                var loadflag=$this.attr("loadflag");
                var imgclass=$this.attr("class");

                if(loadflag=="0"){
                    $(".ZoomLoading").show();
                }
                // 绑定放大镜
                $("#pD-bimg").attr({"src":$this.attr("picBigUrl"),"jqimg":$this.attr("picLargeUrl")}).load(function(){
                    $this.attr("loadflag",1);
                    $(".ZoomLoading").hide();
                }).error(function() {
                    $(".ZoomLoading").show();
                }) ;
                $('#spec-list li').removeClass('hover');
                $this.parent().addClass('hover');
            }
        });
        $(".jqzoom").jqueryzoom({xzoom:470,yzoom:440,offset:3,position:"right",preload:1,lens:1});
    },
//加价购详情页
    packageSaleDetail:function(){
        Array.prototype.max = function(){   //获取数组中的最大值
            return Math.max.apply({},this)
        };
        //控制搭配商品列表模块的高度
        var maxHeight,arrHeight = [],dList = $(".jjg_dtl_list>li");
        dList.each(function(i){
            arrHeight.push($(this).height());
        })
        maxHeight=arrHeight.max();
        dList.css("height",maxHeight);

        var mainPrice = $('input[name=mainPrice]').val()-0;
        var minorMap={};
        $('.jPriceinp').each(function(){
            arrPrice = this.value.split(',');
            minorMap[this.name]={};
            minorMap[this.name].publicPrice = arrPrice[0];
            minorMap[this.name].tcPrice =  arrPrice[1];
        });
        //主商品
        $('#maingoodsize>a').click(function(){
            var $this = $(this);
            if ($this.hasClass('select')||$this.hasClass('no'))return;
            $('#maingoodsize>a').removeClass('select');
            $this.addClass('select');
            var curSize = $(this).text();
            $('.color_num>i').html(curSize);
            $('#jMainSize').html(curSize);
            return false;
        });
        //尺码选择
        $('.minor .size>a').click(function(){
            var $this = $(this),$parent = $this.parents('.minor:first');
            if ($this.hasClass('select')||$this.hasClass('no'))return;
            if(!$parent.hasClass('minorselect')){
                $('.minor').filter('.minorselect').removeClass('minorselect').find('.select').removeClass('select').find('input').attr('checked',false);
                $parent.addClass('minorselect').find('input[name=jjg_check_minro]').attr('checked','checked');
                //更新价格
                changePriceShow($parent.find('input.jPriceinp:first')[0].name);
                //更新浮层显示
                $('.imgthumb').attr('src',$parent.find('.jjg_pic img').attr('src'));

            }else{
                $parent.find('.select').removeClass('select');
            }
            var curSizeColor = $parent.find('.jcolor').text()+'&nbsp;'+$(this).text();
            $('#jMatchGoods').html($parent.find('.title a').html()+'&nbsp;'+curSizeColor);
            $this.addClass('select').find('input').attr('checked',true);
            $('.color_num').eq(1).html(curSizeColor);
        });
        //选择从商品
        $('.minor .jjg_check_minro').click(function(e){
            var $this = $(this),$parent = $this.parents('.minor:first');
            if(!$parent.hasClass('minorselect')){
                $('.minor').filter('.minorselect').removeClass('minorselect').find('.select').removeClass('select').find('input').attr('checked',false);
                $parent.addClass('minorselect').attr('checked','checked');
                var curColor=$parent.find('.jcolor').text();
                $('#jMatchGoods').html($parent.find('.title a').html()+'&nbsp;'+curColor);	//修改搭配商品名称
                //更新价格
                changePriceShow($parent.find('input.jPriceinp:first')[0].name);
                $('.imgthumb').attr('src',$parent.find('.jjg_pic img').attr('src'));
                $('.color_num').eq(1).html(curColor);
            }

        });
        //更改价格显示
        function changePriceShow(cNo){
            var cNo = minorMap[cNo];
            var bindPrice = parseInt(cNo.publicPrice)+mainPrice;
            var packgPrice = parseInt(cNo.tcPrice)+mainPrice;
            var save = bindPrice - packgPrice;
            $('.jjg_dtl_hd del').html('&yen;'+bindPrice);
            $('.packgPrice').html(packgPrice);
            $('.js_price>em').html('&yen;'+save);
        }
        //立即购买
        $('.bindSale_buy,#botCartbtn').click(buyNow);
        function buyNow(){
            $('.error').removeClass('error');
            var msg='';
            //判断从商品尺码
            if($('input[name=subProductNo]:checked').length==0){
                var domNo = $('.minor .select');
                if(domNo[0]){
                    domNo.children('input').attr('checked','checked');
                }else{
                    $('.minorselect').addClass('error');
                    msg='请选择从商品尺码!';
                }
            }
            //判断主商品尺码
            if($('input[name=productNo]:checked').length==0){
                var maindomNo = $('#maingoodsize>.select');
                if(maindomNo[0]){
                    maindomNo.children('input').attr('checked','checked');
                }else{
                    $('#maingoodsize').addClass('error');
                    msg+='请选择主商品尺码!';
                }
            }
            if(msg!=''){alert(msg);return false;}
            if($(this).hasClass('bindSale_buy')){
                //统计代码 #5847
                if(_gaq){
                    _gaq.push(['_trackPageview','/PageAction/Buy/suite']);
                }
                $('#jjg_detailform').submit();
            }else{
                var productNo = $('input[name=productNo]:checked').val(),subProductNo = $('input[name=subProductNo]:checked').val();
                $.post('/addProdutToCart.jhtml?r='+Math.random(),{subProductNo:subProductNo,productNo:productNo,productNum:1,targetUrl:'/yitianmall/shoppingmgt_new/simpleShoppingCart'},function(data){
                    if(data){
                        eval("data="+data);
                        $("#pordcount").html(data.shoppingCartCommidityCount);
                        alert('加入购物车成功');
                    }
                });
            }
        }
        //避免刷新页面input缓存选中问题
        $('input[name=productNo]:checked').parent().click();
        $('input[name=subProductNo]:checked').parent().click();
        //放大镜
        $(".big_pic").jqueryzoom({xzoom:470,yzoom:440,offset:3,position:"right",preload:1,lens:1});
        YGG.Module.pageBindEvent();
    },
    //其他页面效果绑定
    pageBindEvent:function(){
        //load dialog JS
        function loadYgDialog(callback){
            if(!ygDialog){
                loadjs($('#jsYgDialog').val(),callback);
            }else{
                callback();
            }
        }

        //尺码对照表
        var $CompareSize = $('#compare_size_link');
        if($CompareSize[0]){
            $CompareSize.click(function(){
                /*$('#goodsBar1>a:first').click();*/
                var $SizeArea=$('.size_area');
                loadYgDialog(function(){
                    dg=ygDialog({
                        content:$SizeArea[0].outerHTML,
                        title : '尺码对照表',
                        lock: false,
                        width: 780,
                        height: $SizeArea.height()+20
                    });
                })
            })
        }
        //加载自动完成
        $('#keyword').focus(function(){
            if(!autoWords){
                loadjs($('#jsAutocomplete').val(),function(){});
            }
        })
        var closeFlag=0;
        var $doc =$(document);

        var isShowBotBuyNav = true;
        if(stock<=0||YouGou.Util.isNull(commodityStatus)||commodityStatus==1){
            isShowBotBuyNav = false;
        }
        if($('#jjg_detailform')){
            isShowBotBuyNav = true;
        }
        var isIE6 = $.browser.msie && $.browser.version == "6.0";
        var dFixedbottom = $('.fixed_bottom');

        //var tBottom=$(".wcen.n_footinfo").offset().top;
        //alert(tBottom);
        //alert(dFixedbottomT);
        $(window).scroll(function(){
            if(isIE6){
                var dFixedbottomT=$(window).height()-58;
                var scrollT=$(document).scrollTop();
                var tBottom=$(".wcen.n_footinfo").offset().top+$(".wcen.n_footinfo").height();
                var top=dFixedbottomT+scrollT;
                if(top+58>tBottom)
                {
                    top=tBottom-58;
                }
                //由于动态加载问题，必须实时获取底边界
                dFixedbottom.css('top',top+'px');
            }
            //显示底部导航
            if(isShowBotBuyNav){
                $doc.scrollTop()>300?showBotBuyNav():$("#botBuyNav").hide();
            }
        });

        //显示底部购买导航
        function showBotBuyNav()
        {
            if(closeFlag==0)
            {
                $("#botBuyNav").show().height($("#botBuyNav .bot_buyContent").height()+30);
                $("#bot_buyNavIcon").hide();
            }
        }
        //购买导航关闭按钮事件
        $("#bot_buyClose").click(function(){
            $("#botBuyNav").hide(200);
            $("#bot_buyNavIcon").show();
            closeFlag=1;
        });
        //显示购买导航
        $("#bot_buyNavIcon").click(function(){
            $("#botBuyNav").show();
            $(this).hide();
            closeFlag=0;
        });
        //lazyload
        $("#goodsTjProList img,#contentDetail img,.good_rList:first>.pro_rList:visible img,#goods_lc_bz img").lazyload();
        //优购导购商标移动
        $('#brand-list').funMove({btnPre:$('#brand-left'),btnNxt:$('#brand-right'),moveStep:20});
        //二维码模块显示
        var $box = $("#qrCodeBox");

        $("#qrButton").live("mouseover",function(){
            var _this = $(this);
            var offset = _this.offset();
            var _top = offset.top + 36;
            $box.css({ "top": _top, "left": offset.left }).show();
        })
        $("#qrButton").live("mouseleave",function(){
            $box.hide();
        })
        //主要内容tab切换
        $(".pay_style").click(function(e){
            $('.goods_lc_triggle>a').eq(4).click();
            $('body').scrollTop($('#goods_lc_pay_send').offset().top)
        });
        $('#commentStatisticsData').click(function(){
            $('.goods_lc_triggle>a').eq(1).click();
        });
        //固定导航菜单的位置
        if(goodsbar_top){
            var isIE6 = $.browser.msie && $.browser.version == "6.0";
            $(window).scroll(function(){
                var scrollHeight=$(window).scrollTop();
                if(scrollHeight>goodsbar_top){
                    $('.goods_lc_triggle').addClass('js_fixed_triggle');
                    if(isIE6){
                        //处理IE6下fixed兼容定位
                        $('.js_fixed_triggle').css('top',$(document).scrollTop() + "px");
                    }
                }else{
                    $('.goods_lc_triggle').removeClass('js_fixed_triggle');
                }
            });
        }
        //如果没有问卷调查显示返回顶部
        if(!$('#fixedRight')[0]){
            $('<div class="fixed_right" id="fixedRight"><a rel="nofollow" href="#" class="gotop_lnk">返回顶部</a></div>').appendTo('body');
            $('#fixedRight').jqScrollTop({startPos:0,show:true,bottom:10});
        }
        //颜色大图显示
        var domColor=$("#imgBtn_0 .prodSpec>a");
        //颜色大图显示
        domColor.hover(function(){
            var _this=$(this);
            var _imgsrc=_this.children("img").attr("midpic");
            var offset = _this.offset();
            var _top=offset.top+42;
            $("#colorMidImgBox").css({"top":_top,"left":offset.left}).show();
            $("#proMidImg").attr("src",_imgsrc);
        },function(){
            $("#colorMidImgBox").hide();
        });
        //if(domColor.length<8 && domColor.length>5){
        //    $(".goods_buy .qbuy").css("marginTop","40px");
        //}



        //商品收藏
        $("#favoriteImg>a").bind("click",function(){
            loginByComntOrFav = 2;
            if(_gaq){
                _gaq.push(['_trackPageview','/PageAction/collect/detail/'+prodInfo.cNo]);
                _gaq.push(['_trackPageview','/PageAction/detail/add_to_favorite']);
            }
            if(!showLoginPop('favorite')){//先判断登陆再执行收藏
                if(!ygDialog){
                    loadjs($('#jsYgDialog').val(),favorite);
                }else{
                    favorite();
                }

            }
            return false;
        });
        //销售排行榜切换
        $(".goods_rph_tab a").hover(function(){
            var index=$(".goods_rph_tab a").index(this);
            var pro_rList=$(this).closest(".good_rList").find(".pro_rList");
            $(".goods_rph_tab a").removeClass("current");
            $(this).addClass("current");
            pro_rList.hide().eq(index).show();
            var pro_img=pro_rList.eq(index).find("img");
            pro_img.each(function(i){
                var pro_img_url=pro_img.eq(i).attr("original");
                pro_img.eq(i).attr("src",pro_img_url);
            })
        });
        //右侧更多品牌  setTimeout解决鼠标滑过内部元素触发mouseout问题
        $('.good_rList_cat .more').mouseover(function(){
            var time;
            clearTimeout(time);
            $(this).next().show().unbind().mouseout(function(e){
                var $this = $(this);
                time =setTimeout(function(){
                    $this.hide();
                },1);
            }).mouseover(function(){
                $(this).show();
                clearTimeout(time);

            });
        });
        //通用切换
        $('.js-tab-hd').click(function(e){
            if(e.target.tagName.toLowerCase()=='a'){
                var $target = $(e.target);
                var $this = $(this),$links = $this.children();
                $links.removeClass('hover');
                $target.addClass('hover');
                var tabCon = $this.siblings('.js-tab-bd').children();
                curTab = tabCon.hide().eq($links.index($target)).show();
                return false;
            }
        });

        //主要内容tab切换
        $('.goods_lc_triggle a').click(function(){
            var index=$('.goods_lc_triggle a').index(this);
            var allTab=$('.goods_lc_box .goods_lc_item');
            var curTab=allTab.eq(index);
            $('.goods_lc_triggle a').removeClass('current');
            $(this).addClass('current');
            allTab.hide();
            curTab.show();
            if(index>1){
                $('.goodsViewList').hide();
            }else{
                //ylb//$('.goodsViewList').show();
            }
            index==0?$('#goods_comment,#goods_lc_bz,#goods_comment .hd,#goods_lc_bz .hd').show():$('#goods_comment .hd,#goods_lc_bz .hd').hide();
            curTab.find('img').each(function(){
                var $this = $(this),src = $this.attr('src'),original = $this.attr('original');
                if(original&&src!=original){
                    $this.attr('src',original);
                }
            });
            var $iTop = $('#goods_lc').offset().top;
            $('html,body').animate({scrollTop:$iTop},0); //初始化内容位置到最上面，将参数 0 修改成其它值可以实现动画效果
        });
        //大学生分期
        $('#stdQufenqi').click(function(e) {
            e.preventDefault();
            var pData = {
                url: location.href,
                price: prodInfo.price,
                desc: '特殊要求写在这里吧',
                from_id: '@yougou',
                readonly: 'true'
            };
            loadYgDialog(function(){
                ygDialog({
                    skin:1,
                    loaded:function(){
                        $('.ygDialog iframe').attr('scrolling','no');
                    },
                    lock: true,
                    closable:true,
                    fixed:true,
                    content:'<iframe frameborder="0" scrolling="no" width="640" height="310" src="'+'http://www.qufenqi.com/calculator?'+$.param(pData)+'"></iframe>',
                    width:640,
                    height:310,
                    title:'使用“趣分期”进行分期付款'
                });
            });
            return false;
        });

    }
}

//尺码弹窗提示
var popSize = {
    show:function(eventDom){
        var pos={},pop = $("#select_size"),$window = $(window),winW = $window.width(),popW = pop.width();
        if(eventDom){
            pos = $(eventDom).offset();
        }else{
            pos.left=winW/2-popW/2;
            pos.top=$window.scrollTop()+$window.height()/2;
        }
        if(pos.left+popW>winW/2+450){
            pos.left=winW/2+450-popW;
        }
        $('.body_mask').show().css('height',$('body').height());
        pop.show().css({left:pos.left,top:pos.top-pop.height()+$(eventDom).height()});
    },
    hide:function(){
        $(".body_mask").hide();
        $("#select_size").fadeOut();
        $(".contrast_prosize a").removeClass("select");
        $("#size_select_btn").css({'visibility':'hidden'});
    }
};
(function(){

    // #10774 ajax请求面包屑数据
    (function(){

        //处理主站和闪购取产品编号问题
        if($('body').attr('id')=='ypsgDtl')
        {//闪购页面
            return;
        }
        //其他页面
        var pdtNo=$('#pordNoSpan').text();
        pdtNo=pdtNo.replace("商品编号：","");
        var pdtName=$('.goodsCon h1').text();


        var html='您当前位置：<a href="/">首页</a> &gt; ';
        var target=$('.ngoods_bor');
        //console.log(pdtNo);
        var url="/ssc/getGoodsMbx.sc?sku="+pdtNo;
        $.post(url,function(data){
            if(data)
            {
                var _data = {};
                _data.p_classn = [];
                for(var i=0;i<data.length;i++)
                {

                    for(key in data[i])
                    {
                        var str='<a href="/'+data[i][key]+'">'+key+'</a> &gt; ';
                        _data.p_classn.push(key)
                    }

                    html+=str;
                    //}
                }
                YGG.Module.filldsp_config(_data)
                target.html(html+pdtName);
            }else
            {
                target.html('您当前位置：<a href="/">首页</a>');
            }
        },"json");
    })();


    var doWhileExist = function(sModuleId,oFunction){
        if(document.getElementById(sModuleId)){oFunction(document.getElementById(sModuleId));}
    };
    //获取主要内容
    doWhileExist('yitianPrice',YGG.Module.getProductInfo);
    //获取推荐
    //doWhileExist('goodsTjProList',YGG.Module.getRecommend);
    doWhileExist('histyGuessGuds',YGG.Module.getRecommend);
    //获取评论 以及设置排行榜价格
    doWhileExist('goods_comment',YGG.Module.getComment);
    //获取历史浏览
    doWhileExist('historyGoods',YGG.Module.getCmntAndHistory);
    //获取根据浏览推荐商品

    doWhileExist('historyGoods2',YGG.Module.getRecentViewRecommend2);
    //获取销售分类
    doWhileExist('yitianPrice',YGG.Module.getBrandCatg);
    //获取历史浏览单品页
    doWhileExist('historyGoods2',YGG.Module.getCmntAndHistory);
    //放大镜
    doWhileExist('goodsImg0',YGG.Module.mimgMouseoverEvent);
    //页面其他效果
    doWhileExist('goodsBar1',YGG.Module.pageBindEvent);
    //加加购详细页
    doWhileExist('jjg_detailform',YGG.Module.packageSaleDetail);
    /*导航控制*/
    if(document.getElementById('popmenu')){
        var popMenu = $('#popmenu');
        popMenu.load('/inc/navbar_product_popmenu.shtml',function(){
            if($('#womenhall>div').length==0){
                var navMenu = $('#nav_menu>li:lt(9)');
                navMenu.each(function(index,item){
                    if(index>0){
                        $(this).append(popMenu.children('div:first'));
                    }
                })
            }
        });
    }
    //限制用户评论部分颜色部分的长度
    //单品页二维码盖住颜色样式修改 2016-05-26
    $("#qrCodeImg").css("width","90px");
    $(".goods_buy .goods_erweima").css({
        height:"auto",
        right:"-5px",
        width:"108px"
    });
    $(".goods_buy .goods_erweima>span").html("下载优购客户端");
    //单品页二维码盖住颜色样式修改2016-05-26
})();
