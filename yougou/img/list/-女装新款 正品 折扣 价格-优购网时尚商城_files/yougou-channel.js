//== Yougou Channel JS == 
//== Author:Arway Date:2012-02-29 Email:1805759699@qq.com ==
	
   //== brand move function ==
   var nfun_move=function(position_left,position_right,position_id){	      
	$("#"+position_left).click(function(){
	$("#"+position_id+" img").each(function() {
       if($(this).attr("src")!=$(this).attr("original")){
		   $(this).attr("src",$(this).attr("original"));
		   } 
    });
		  var index = $("#"+position_id+" a").length-20;
		  $("#"+position_id+" a:lt("+index+")").appendTo("#"+position_id);

	})
	  $("#"+position_right).click(function(){
		$("#"+position_id+" img").each(function() {
       if($(this).attr("src")!=$(this).attr("original")){
		   $(this).attr("src",$(this).attr("original"));
		   } 
    });  
		$("#"+position_id+" a:lt(20)").appendTo("#"+position_id);
	})
	}
  //== brand move function end ==
  

  //== channel_clothes_tab function ==
  var channel_tab=function(tabid,tabelem){
    $("#"+tabid+" .title a:not(.f_gray)").each(function(index, element) {
	$(this).mouseover(function(){
	$(this).siblings().removeClass("on");
	$(this).addClass("on");
	$("#"+tabid+" "+tabelem).hide();
    if(index>0){		
    $("#"+tabid+" "+tabelem+":eq("+index+")").show();
    $("#"+tabid+" "+tabelem+":eq("+index+") img").each(function(){
    var imgsrc=$(this).attr("original");
    $(this).attr("src",imgsrc)
	})
	}
	else{
	$("#"+tabid+" "+tabelem+":eq("+index+")").show();
		}
	})
    })	
	}
  //== channel_clothes_tab function end	==  

  //== channel_mid_ad ==
  var channel_mid_ad=function(ad_id){
	  
	  $("#"+ad_id+" img").each(function(index, element) {
	  var imgsrc=$(this).attr("src2");
	  $(this).attr("src",imgsrc);
	  });
	  $("#"+ad_id+"").show()
      }
  //== channel_mid_ad ==
  
  
  
/******************
 推荐产品左右切换，限制5个
*****************/
function fun_move(position_left,position_right,position_id){       
$("#"+position_left).click(function(){
$("#"+position_id+" img").each(function() {
   if($(this).attr("src")!=$(this).attr("original")){
	   $(this).attr("src",$(this).attr("original"));
	   } 
});
	  var index = $("#"+position_id+" li").length-5;
	  $("#"+position_id+" li:lt("+index+")").appendTo("#"+position_id);

})
  $("#"+position_right).click(function(){
	$("#"+position_id+" img").each(function() {
   if($(this).attr("src")!=$(this).attr("original")){
	   $(this).attr("src",$(this).attr("original"));
	   } 
});  
	$("#"+position_id+" li:lt(5)").appendTo("#"+position_id);
})
};

/*
*修复ie6 png24透明
*fixPNG(image);
*/
function fixPNG(myImage) {
	if ($.browser.msie&&$.browser.version=="6.0")
	{
	var imgID = (myImage.id) ? "id='" + myImage.id + "' " : "";
	var imgClass = (myImage.className) ? "class='" + myImage.className + "' " : "";
	var imgTitle = (myImage.title) ? "title='" + myImage.title   + "' " : "title='" + myImage.alt + "' ";
	var imgStyle = "display:inline-block;" + myImage.style.cssText;
	var strNewHTML = "<span " + imgID + imgClass + imgTitle+ " style=\"" + "width:" + myImage.width+ "px;height:" + myImage.height+ "px;margin-right:"+$(myImage).css('margin-right')+";" + imgStyle + "filter:progid:DXImageTransform.Microsoft.AlphaImageLoader"+ "(src=\'" + myImage.src + "\',sizingMethod='scale');\"></span>";
	myImage.outerHTML = strNewHTML;
	} 
}

/*打标背景透明*/
$(function(){
if($.browser.msie&&$.browser.version=="6.0")
{
	$(".salepic img").each(function(index, element) {
		fixPNG($(this)[0]);
	});
	
	$(".salepic2 img").each(function(index, element) {
		fixPNG($(this)[0]);
	});
}
});


/*focus img*/
// 优购网焦点图   create by Arway 2012-02-24 1805759699@qq.com
 var  yougou_focusimg=function(focusid,changetime){	
 function changesrc(){	  	  
    $("#"+focusid+" img").each(function(index, element) {	
	var imgsrc=$(this).attr("src2");
	$(this).attr("src")==imgsrc?$(this):$(this).attr("src",imgsrc);
	})	  
    }
 

	var sWidth = $("#"+focusid+"").width(),
	    len = $("#"+focusid+" ul li").length,
	    index = 0,
	    picTimer;
	
	// number btn 
	var btn = "<div class='btn'>";
	for(var i=0; i < len; i++) {
		btn += "<span>" + (i+1) + "</span>";
	}
	btn += "</div>"
	$("#"+focusid+"").append(btn);

	//btn mouseover
	$("#"+focusid+" .btn span").mouseenter(function() {
		index = $("#"+focusid+" .btn span").index(this);
		showPics(index);
	}).eq(0).trigger("mouseenter");
	
	//count ul's width
	$("#"+focusid+" ul").css("width",sWidth * (len + 1));
	
	
	//mouseout:move 
	$("#"+focusid+"").hover(function() {
		clearInterval(picTimer);
	},function() {
		picTimer = setInterval(function() {
			if(index == len) { 
				showFirPic();
				index = 0;
			} else { 
				showPics(index);
			}
			index++;
		},changetime); //changetime
	}).trigger("mouseleave");
	
	//showpics
	function showPics(index) { 
		var nowLeft = -index*sWidth,
		    thisimgsrc=$("#"+focusid+" img:eq("+index+")");
	    thisimgsrc.attr("src")==thisimgsrc.attr("src2")?$(this):thisimgsrc.attr("src",thisimgsrc.attr("src2"));
		$("#"+focusid+" ul").stop(true,false).animate({"left":nowLeft},500); 
		$("#"+focusid+" .btn span").removeClass("on").eq(index).addClass("on");
	}
	
	function showFirPic() { 
		$("#"+focusid+" ul").append($("#"+focusid+" ul li:first").clone());
		var nowLeft = -len*sWidth;
		$("#"+focusid+" ul").stop(true,false).animate({"left":nowLeft},500,function() {
			$("#"+focusid+" ul").css("left","0");
			$("#"+focusid+" ul li:last").remove();
		}); 
		$("#"+focusid+" .btn span").removeClass("on").eq(0).addClass("on"); 
	}


    setTimeout(changesrc,changetime);
}

/**
  * 搜索关键字到品牌名称通用方法
  * @param param0  一级关键字
  * @param param   二级关键字
  * @param brandName  品牌
  * @param url 自定义url
  * @return
  */
 function brandNameAndUrl(param0,param,brandName,url,footer,logoSmallUrl) {
 	var brandUrl = url;
/* 	if(url != "") {
 		brandUrl = encodeURI(encodeURI(url));
 	} else {
 		var brandNameTmp = encodeURI(encodeURI(brandName));
 		var paramStr = param0 == "7p" ? "param0="+param0+"&param3="+brandNameTmp :
 							param0 == "Hi" ? "param0="+param0+"&param4="+brandNameTmp :
 							param0 == "f6" ? "param0="+param0+"&param5="+brandNameTmp :
 							param0 == "6J" ? "param0="+param0+"&param3="+brandNameTmp :
 							param0 == "79" ? "param0="+param0+"&param4="+brandNameTmp :
 							param0 == "w7" ? "param0="+param0+"&param4="+brandNameTmp : "";
 		brandUrl = "/s/search.sc?" + paramStr;
 	}
 */
 	if(footer == "footer") document.write("<a href='"+brandUrl+"' target='_blank'>"+brandName+"</a>");
 	else document.write("<a href='"+brandUrl+"' target='_blank'><img width=\"85\" height=\"40\" src=\""+logoSmallUrl+"\" title=\""+brandName+"\" alt=\""+brandName+"\"/></a>");
 }
 /**
  * 搜索关键字到品牌名称通用方法
  * @param param0  一级关键字
  * @param param   二级关键字
  * @param brandName  品牌
  * @param url 自定义url
  * @return
  */
 function styleNameAndUrl(param0,param,styleName,url) {
 	var styleUrl = url;
/* 	if(url != "") {
 		styleUrl = encodeURI(encodeURI(url));
 	} else {
 		var styleNameTmp = encodeURI(encodeURI(styleName));
 		var paramStr = param0 == "7p" ? "param0="+param0+"&param4="+styleNameTmp :
 			param0 == "Hi" ? "param0="+param0+"&param5="+styleNameTmp :
 				param0 == "f6" ? "param0="+param0+"&param6="+styleNameTmp :
 					param0 == "6J" ? "param0="+param0+"&param4="+styleNameTmp :
 						param0 == "79" ? "param0="+param0+"&param5="+styleNameTmp :
 							param0 == "w7" ? "param0="+param0+"&param5="+styleNameTmp : "";
 		styleUrl = "/s/search.sc?" + paramStr;
 	}
 */
 	document.write("<a href='"+styleUrl+"' target='_blank'>"+styleName+"</a>");
 }