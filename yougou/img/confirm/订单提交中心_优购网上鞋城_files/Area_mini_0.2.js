var CityListCache = [] ; 
var adressArr = [];
var _provid = "";
var _cityid = "";
var _areaid = "";
var _isIE6 = window.VBArray && !window.XMLHttpRequest;


// init Address
function Loadmyaddress(provid,cityid,areaid) {	
	_provid = provid;
	_cityid = cityid;
	_areaid = areaid;	
	if(areaid != null && areaid != ""){
		doInit(provid,cityid,areaid);
	}else{		
		if(provid != null && provid != ""){
			doInit(provid,cityid,areaid);
			var _areaid_ = $("#receivingDistrict").val();
			if(_areaid_ == "" || _areaid_ == null){
				$("#area_link").text("请选择县区");
				$("#area_link").css('color','black');			
			}
		}else{
			LoadProvince(provid);
		}
		
	}	
    initAreaSelector();
}

function initAddressData(provid,cityid,areaid,callback){
	$.ajax({
		type : "POST",
		data:{"provno":provid,"cityno":cityid,"areano":areaid},
		dataType:"json",
		url: "/my/getRevorsAddress.jhtml",
		success : function(data) {
			if(data != null){				
				callback(data);					
			}				
		}
	});	
}
//初始化修改div地址
function doInit(provid,cityid,areaid){
	initAddressData(provid,cityid,areaid,function(data){
		$.each(data,function(n,value) {		
			$("#province_select ul").append("<li><span><a href='javascript:;' onclick=getselectprovince(event,'"+value.no+"','"+value.name+"') rel='"+value.no+"'>"+value.name+"</a></span></li>");
			if(_provid == value.no){
				_tName = value.name;
				if(typeof(_tName) == "string" && _tName != "") {
			    	$("#province_link,#province_i").text(_tName);
					$("#receivingProvince").val(_provid);			
					$("#receivingProvinceName").val(_tName);
				}	
					$.each(value.city,function(n,value){		  				
		  				$("#city_select ul").append("<li><span><a href='javascript:;'  onclick=getselectcity(event,'"+value.name+"','"+value.no+"') rel='"+value.name+"'>"+value.name+"</a></span></li>");
		  				if(_cityid == value.no){
		  					_cName = value.name;
		  					if(typeof(_cName) == "string" && _cName != "") {
		  						$("#city_link,#city_i").text(_cName);
		  						$("#receivingCity").val(_cityid);
		  						$("#receivingCityName").val(_cName);
		  						$("#city_link").css('color','black');
		  					}else{
		  						$("#city_link").css('color','gray');
		  					}
		  						$.each(value.area,function(n,value){		 					
				 					$("#area_select ul").append("<li><span><a href='javascript:void(0)' id='city_click' onclick=getselectarea('"+value.name+"','"+value.no+"','"+value.post+"')  >"+value.name+"</a></span></li>");
				 					if(_areaid == value.no){
				 						_aName = value.name;
				 						_aPost = value.post;
				 						if (typeof(_aName) == "string" && _aName != "") {
				 					     	$("#area_i,#area_link").text(_aName);
				 							$("#receivingDistrict").val(_areaid);
				 							$("#receivingDistrictName").val(_aName);
				 							if(_aPost != null && _aPost!= ''){
				 								$("#receivingZipCode").val(_aPost);
				 							}
				 							$("#area_link").css('color','black');
				 						}else{
				 							$("#area_link").css('color','gray');
				 						}
									}
				 				});
		  				}	  				
			   		});
			}
		});	
	});
}

function ieFrameMask(obj){
	var iframeMask=$('<iframe src="about:blank" style="width:100%;height:100%;position:absolute;top:0;left:0;z-index:-1;filter:alpha(opacity=0);overflow:hidden;"></iframe>');
	var _w=obj.width();
	var _h=obj.height();
	$('.dropdown_span').find('iframe').remove();
	obj.append(iframeMask);
	setTimeout(function(){
		iframeMask.height(_h).width(_w);
	},0);
	
}

// 初始化区域选择
function initAreaSelector(){
   $("#province_link").click(function(event){
		$("#province_select").show();
		
		if(_isIE6){
			ieFrameMask($("#province_select"));
		}
		
		$("#city_select").hide();
		$("#area_select").hide();
		if (event.stopPropagation) {
			// this code is for Mozilla and Opera
			event.stopPropagation();
		}else if (window.event) {
			// this code is for IE
			window.event.cancelBubble = true;
		}
	});

	$("#city_link").click(function(event){
		if($("#receivingProvince").val()!=''){
			$("#province_select").hide();
			$("#city_select").show();
			if(_isIE6){
				ieFrameMask($("#city_select"));
			}
			$("#area_select").hide();
			if (event.stopPropagation) {
				// this code is for Mozilla and Opera
				event.stopPropagation();
			}else if (window.event) {
				// this code is for IE
				window.event.cancelBubble = true;
			}
		}
		
	});

	$("#area_link").click(function(event){
		if($("#receivingCity").val()!=''){
			$("#province_select").hide();
			$("#city_select").hide();
			$("#area_select").show();
			if(_isIE6){
				ieFrameMask($("#area_select"));
			}
			if (event.stopPropagation) {
				// this code is for Mozilla and Opera
				event.stopPropagation();
			}else if (window.event) {
				// this code is for IE
				window.event.cancelBubble = true;
			}
		}
    });    
	
	$("body").click(function(){
		$("#province_link,#province_select,#city_link,#city_select,#area_link,#area_select").click(function(){
	   		return false;
		});
		$("#province_select").hide();
		$("#city_select").hide();
		$("#area_select").hide();

	});
}

//Ajax回调--获取省
function loadProvinceData(no,callback){	
	$.ajax({
		type : "POST",
		data:{"no":no},
		dataType:"json",
		url: "/my/getProvinceByNo.jhtml",
		success : function(data) {
			if(data != null){
				callback(data);
			}				
		}
	});
}

// 选择省
function LoadProvince(no) {			
	$("#province_select ul").empty();
	$("#province_link").html("请选择省");
	$("#province_i").text("");
	$("#province_link").css('color','black');

	$("#receivingZipCode").val("");
	$("#thispostcode").html("");
	$("#postdiv").hide();		

	$("#city_select ul").empty();
	$("#city_link").text("请选择城市");
	$("#city_i").text("");
	$("#receivingZipCode").val("");
	$("#thispostcode").html("");
	$("#postdiv").hide();
	$("#city_link").css('color','gray');
	
	$("#area_select ul").empty();
	$("#area_link").text("请选择县区");
	$("#area_i").text("");
	$("#area_link").css('color','gray');
	
	loadProvinceData(no,function(data){
		
		$.each(data,function(n,value) {		
			$("#province_select ul").append("<li><span><a href='javascript:;' onclick=getselectprovince(event,'"+value.no+"','"+value.name+"') rel='"+value.no+"'>"+value.name+"</a></span></li>");
			
		});			
	});	
}

// 加载城市
function LoadCity(data) {	
	
	
    $("#city_select ul").empty();
	$("#city_link").text("请选择城市");
	$("#city_i").text("");
	$("#receivingZipCode").val("");
	$("#thispostcode").html("");
	$("#postdiv").hide();
	$("#city_link").css('color','black');
	$.each(data,function(n,value) {	  	  				
		 $("#city_select ul").append("<li><span><a href='javascript:;'  onclick=getselectcity(event,'"+value.name+"','"+value.no+"') rel='"+value.name+"'>"+value.name+"</a></span></li>");
	});	
	$("#area_select ul").empty();
	$("#area_link").text("请选择县区");
	$("#area_i").text("");
	$("#area_link").css('color','gray');
	if(_isIE6){
	   ieFrameMask($("#city_select"));
	}
}

// 加载区
function LoadArea(data) {
	$("#area_select ul").empty();
	$("#area_link").text("请选择县区");
	$("#area_i").text("");
	$("#area_link").css('color','black');
	$.each(data,function(n,value){
		$("#area_select ul").append("<li><span><a href='javascript:void(0)' id='city_click' onclick=getselectarea('"+value.name+"','"+value.no+"','"+value.post+"')  >"+value.name+"</a></span></li>");
	});		
	if(_isIE6){
	   ieFrameMask($("#area_select"));
	}
}

//Ajax回调 --市区
function loadCityOrAreaData(no,callback){
	$.ajax({
		type : "POST",
		data:{"no":no},
		dataType:"json",
		url: "/my/getCityOrAreaByNo.jhtml",
		success : function(data) {
			if(data != null){
				callback(data);
			}				
		}
	});
}

//省级推入缓存
function pushProvinceCahe(no,name){
	var isdifer = false ;
	$.each(CityListCache,function(n,value) {
		if(value.no == no){
			isdifer = true ;
		}
	});	
	if(!isdifer){		
		var provinceObj = {"no":no,"name":name,"city":[]};		
		loadCityOrAreaData(no,function(data){
			$.each(data,function(n,value){
				var cityObj = {"no":value.no,"name":value.name,"area":[]};
				provinceObj.city.push(cityObj);
			});
		});
		CityListCache.push(provinceObj);
	}	
}

//市级推入缓存
function pushCityCahe(no,name){	
	var provinNo = $("#receivingProvince").val();
	$.each(this.CityListCache,function(n,pvalue) {
		if(pvalue.no == provinNo){	
			$.each(pvalue.city,function(n,cvalue) {
				if(no == cvalue.no){
					if(cvalue.area.length == 0){						
						loadCityOrAreaData(cvalue.no,function(data){
							$.each(data,function(n,avalue){						
									var areaObj = {"no":avalue.no,"name":avalue.name,"post":avalue.post};
									cvalue.area.push(areaObj);										
							});
						});		
					}
				}
			});						
		}
	});
	//console.log(this.CityListCache);
}

//省级数据传递
function getselectprovince(event,no,name){	
 	$("#receivingCity").val("");
	$("#receivingCityName").val("");
	$("#receivingDistrict").val("");
	$("#receivingDistrictName").val("");
	$("#province_link,#province_i").html(name);
	$("#receivingProvince").val(no);
	$("#receivingProvinceName").val(name);
	$("#receivingZipCode").val("");
	$("#receivingDistrict_tips").html("&nbsp;").removeClass("successHint").removeClass("errorHint");
		
	var readCache = false;
	$.each(CityListCache,function(n,value) {
		if(value.no == no && value.city.length > 0){
			readCache = true ;			
			LoadCity(value.city);
		}
	});	
	if(!readCache){	
		var isdifer = false ;
		$.each(CityListCache,function(n,value) {
			if(value.no == no){
				isdifer = true ;
			}
		});	
		if(!isdifer){		
			var provinceObj = {"no":no,"name":name,"city":[]};		
			loadCityOrAreaData(no,function(data){
				LoadCity(data);
				$.each(data,function(n,value){
					var cityObj = {"no":value.no,"name":value.name,"area":[]};
					provinceObj.city.push(cityObj);
				});
			});
			CityListCache.push(provinceObj);
		}
	}
	$("#city_link").css('color','black');
	$("#area_link").css('color','gray');
	$("#province_select").hide();
	$("#city_select").show();
	if (event.stopPropagation) {
		// this code is for Mozilla and Opera
		event.stopPropagation();
	}else if (window.event) {
		// this code is for IE
		window.event.cancelBubble = true;
	}
}

//取得城市
function getselectcity(event,value,no){
	$("#receivingDistrict").val("");
	$("#receivingDistrictName").val("");
	$("#city_link,#city_i").html(value);
	$("#receivingCity").val(no);
	$("#receivingCityName").val(value);
	$("#receivingZipCode").val("");	
	var str1 = $("#receivingProvince").val();
	
	var readCache = false;
	$.each(CityListCache,function(n,value) {
		if(value.no == str1 && value.city.length > 0){
			$.each(value.city,function(n,value) {
				if(value.no == no && value.area.length > 0){
					readCache = true ;
					LoadArea(value.area);
				}
			});			
		}
	});	
	if(!readCache){
		loadCityOrAreaData(no,function(data){
			LoadArea(data);
			var provinNo = $("#receivingProvince").val();
			$.each(this.CityListCache,function(n,pvalue) {
				if(pvalue.no == provinNo){	
					$.each(pvalue.city,function(n,cvalue) {
						if(no == cvalue.no){
							if(cvalue.area.length == 0){						
								$.each(data,function(n,avalue){						
									var areaObj = {"no":avalue.no,"name":avalue.name,"post":avalue.post};
									cvalue.area.push(areaObj);										
								});
							}
						}
					});						
				}
			});
		});	
	}
	$("#city_link").css('color','black');
	$("#area_link").css('color','black');	
	$("#city_select").hide();
	$("#area_select").show();
	$("#receivingDistrict_tips").html('请选择区域').removeClass("successHint").addClass("errorHint");
	if (event.stopPropagation) {
		// this code is for Mozilla and Opera
		event.stopPropagation();
	}else if (window.event) {
		// this code is for IE
		window.event.cancelBubble = true;
	}
}

//取得area
function getselectarea(value,no,post){
	$("#area_link,#area_i").html(value);
	var nowSelCityNo = $("#receivingCity").val();
	var isNowAreaOk = false;
	var nowAreaArr = no.split('-');
	if (nowAreaArr != null && nowAreaArr.length == 4) {
		var numb = jQuery.trim(nowAreaArr[0])+"-"+jQuery.trim(nowAreaArr[1])+"-"+jQuery.trim(nowAreaArr[2]);
		if(numb == nowSelCityNo){
			isNowAreaOk = true;
		}
	}
	if(nowSelCityNo != no && isNowAreaOk){
		$("#receivingDistrict").val(no);
		$("#receivingDistrictName").val(value);
	}
	$("#receivingZipCode").val("");
	if(post!=''&&post!='undefined'){
		$("#thispostcode").html(post);
		$("#area_link").css('color','black');
		$("#postdiv2").hide();
		$("#postdiv").show();
	}
	$("#area_select").hide();
	$("#receivingDistrict_tips").html('&nbsp;').removeClass("errorHint").addClass("successHint");
	$("#receivingZipCode").focus();
	//修改发货地址，不影响计算
	updateServiceDeliveryWay(no);
}