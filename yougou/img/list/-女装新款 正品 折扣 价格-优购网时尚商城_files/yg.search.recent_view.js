(function(){
	
	//最近浏览推荐
	$.ajax({
		   type: "POST",
		   url: "/commodity/getRecentViewRecommend.sc",
		   dataType : "json",
		   cache:false,
		   success: function(srvr){
				if(srvr){
			//		srvr=JSON.parse('[{"isActive":"1","marketPrice":"490","thumbnail":"http://i2.ygimg.cn/pics/ojack/2014/99982197/99982197_01_s.jpg?3","dpUrl":"http://www.yougou.com/c-ojack/sku-xta6580-99982197.shtml","name":"欧尼杰 OJACK 男士2014精品时尚休闲小翻领波点短袖T恤 上衣 专柜正品","salePrice":"118","rebate":"2.4","priceGroup":"13"},{"isActive":"1","marketPrice":"469","thumbnail":"http://i2.ygimg.cn/pics/goldpool/2014/99981567/99981567_01_s.jpg?1","dpUrl":"http://www.yougou.com/c-goldpool/sku-mt64392-99981567.shtml","name":"高尔普GOLDPOOL 2014夏季新款字母印花短袖T恤MT64392","salePrice":"88","rebate":"1.9","priceGroup":"12"},{"isActive":"1","marketPrice":"199","thumbnail":"http://i2.ygimg.cn/pics/jameskingdom/2014/99981421/99981421_01_s.jpg?5","dpUrl":"http://www.yougou.com/c-jameskingdom/sku-dg063068514-99981421.shtml","name":"占姆士JamesEarl 男士夏款休闲百搭短袖T恤DG063068514","salePrice":"49","rebate":"2.5","priceGroup":"11"},{"isActive":"1","marketPrice":"299","thumbnail":"http://i1.ygimg.cn/pics/swsport/2014/99987122/99987122_01_s.jpg?4","dpUrl":"http://www.yougou.com/c-swsport/sku-211578-99987122.shtml","name":"七匹狼swsport 男士夏季棉质时尚运动圆领T恤211578","salePrice":"109","rebate":"3.6","priceGroup":"13"},{"isActive":"1","marketPrice":"519","thumbnail":"http://i2.ygimg.cn/pics/edenbo/2014/99983721/99983721_01_s.jpg?3","dpUrl":"http://www.yougou.com/c-edenbo/sku-spl5211f6029e-99983721.shtml","name":"爱登堡 男士夏季新品T恤 男装简单百搭男短袖T恤 SPL5211F6029E","salePrice":"139","rebate":"2.7","priceGroup":"13"},{"isActive":"1","marketPrice":"699","thumbnail":"http://i2.ygimg.cn/pics/goldpool/2012/99884208/99884208_01_s.jpg?2","dpUrl":"http://www.yougou.com/c-goldpool/sku-le56492-99884208.shtml","name":"GOLDPOOL高尔普 男士商务型男短袖衬衫 LE56492","salePrice":"129","rebate":"1.8","priceGroup":"13"}]')
					show_recent_view_rec(srvr);
				}
		   }
		});
	
	var show_recent_view_rec = function(data){
		if(!data || data == '') return;
		var list_common = $(".rec_list");
		var html = '';
		if(data.length>10){
			data.length=10;
		}else{
			data.length;
		}
		for(var i = 0; i < data.length; i++){
			var good = data[i];
			var img = good.thumbnail;
			img = img.replace(/_(mb|m|s|c|t)/, "_s");
			var url = good.dpUrl + "#ref=search&po=list";
			if( i == data.length -1){
				html += '<div class="pdt_wrap last">';
			}else{
				html += '<div class="pdt_wrap">';
			}

            var zhekou =Math.round (good.salePrice / good.marketPrice *100)/10+'';
            zhekou=zhekou.indexOf('.')<0?zhekou+'.0':zhekou;
			html += '  <div class="img_box">';
			html += '    <a href="' + url + '" target="_blank">';
			html += '      <img src="' + img + '" width="160" height="160"/>';
			html += '    </a>';
			html += '  </div>';
			html += '  <p class="pdt_name"><a href="' + url +  '" target="_blank">' + good.name + '</a></p>';
			html += '  <p class="price_sc"><em class="ygprc15">&yen;<i>'+good.salePrice+'</i></em><del>&yen;'+good.marketPrice+'</del> <span class="ico_discount"><i>'+zhekou+'</i>折</span></p> '
            html += '</div>';
		}
		html += '<div class="bottom_bg"></div>';
		list_common.append(html);
		list_common.show();
	};
	
	
	
	
	//最近浏览
	
	$.ajax({
	   type: "POST",
	   url: "/commodity/getHistoryOrCommCommodity.sc",
	   dataType : "json",
	   cache:false,
	   success: function(rsp){
			if(rsp){
				//最近浏览
			//	rsp = JSON.parse('{"reviewcomStr":[{"cNo":"99892608","publicPrice":"1498","salePrice":"1273","activePrice":"1273","activeDiscount":"8.5","cName":"CAT/卡特2013秋冬棕色牛皮男装休闲鞋传奇复古(Legendary Raw)CAT型格P716545","brand":"卡特","categoryName":"休闲靴","img":"http://i1.ygimg.cn/pics/cat/2013/99892608/99892608_01_t.jpg?2","url":"http://www.yougou.com/c-cat/sku-p71654-99892608.shtml"},{"cNo":"99899365","publicPrice":"2290","salePrice":"239","activePrice":"239","activeDiscount":"1.0","cName":"SNOW FLYING雪中飞 女装毛领休闲面包状羽绒服中长款羽绒服 XR8068","brand":"雪中飞","categoryName":"羽绒服","img":"http://i1.ygimg.cn/pics/snowflying/2010/99899365/99899365_01_t.jpg","url":"http://www.yougou.com/c-snowflying/sku-xr8068-99899365.shtml"},{"cNo":"99905185","publicPrice":"1798","salePrice":"868","activePrice":"569","activeDiscount":"3.2","cName":"Bata/拔佳2013冬季黑色小牛皮女长靴(防静电)绒里 经典上班 AZC83DG3","brand":"拔佳","categoryName":"长靴","img":"http://i1.ygimg.cn/pics/bata/2013/99905185/99905185_01_t.jpg?2","url":"http://www.yougou.com/c-bata/sku-azc83dg3-99905185.shtml"},{"cNo":"99923086","publicPrice":"698","salePrice":"593","activePrice":"558","activeDiscount":"8.0","cName":"Merrell/迈乐2013秋冬男装黑色猪皮休闲鞋R4608","brand":"迈乐","categoryName":"户外休闲鞋","img":"http://i1.ygimg.cn/pics/merrell/2013/99923086/99923086_01_t.jpg?6","url":"http://www.yougou.com/c-merrell/sku-r4608-99923086.shtml"},{"cNo":"99928980","publicPrice":"669","salePrice":"279","activePrice":"279","activeDiscount":"4.2","cName":"卓诗尼2013新款冬靴欧美防水台骑士靴冬季皮带扣女靴子134379502棕色","brand":"卓诗尼","categoryName":"长靴","img":"http://i1.ygimg.cn/pics/josiny/2013/99928980/99928980_01_t.jpg","url":"http://www.yougou.com/c-josiny/sku-134379502-99928980.shtml"},{"cNo":"99930415","publicPrice":"790","salePrice":"399","activePrice":"368","activeDiscount":"4.7","cName":"英国HI-TEC海泰客男款专业户外防水登山鞋32-5C003","brand":"海泰客","categoryName":"徒步鞋","img":"http://i1.ygimg.cn/pics/hitec/2013/99930415/99930415_01_t.jpg?2","url":"http://www.yougou.com/c-hitec/sku-325c003-99930415.shtml"}],"recommendPrice":[]}')
				show_recent_view(rsp);
			}
	   }
	});
	var show_recent_view = function(data){
		if(!data.reviewcomStr || data.reviewcomStr == '') return;
		var list_common = $(".list_common")
		list_common.show();
		var html = '';
		var goods = data.reviewcomStr;
		if(goods.length>3){
			goods.length=3;
		}else{
			goods.length;
		}
		for(var i = 0; i < goods.length; i++){
			good = goods[i];
			var img = good.img
			img = img.replace(/_(mb|m|s|c|t)/, "_s")
			if( i == goods.length -1){
				html += '<div class="pdt_wrap last">';
			}else{
				html += '<div class="pdt_wrap">';
			}
			html += '  <div class="img_box">';
			html += '    <a href="' + good.url + '" target="_blank">';
			html += '      <img src="' + img + '" width="160" height="160"/>';
			html += '    </a>';
			html += '  </div>';
			html += '  <p class="pdt_name"><a href="' + good.url + '" target="_blank">' + good.cName + '</a></p>';
			//var activePrice=good.activePrice;
			/*var salePrice = good.salePrice;
			if(good.activePrice != good.salePrice){
				salePrice =  good.activePrice ;
			}*/
			var strLabel;
			var salePrice;
			if(good.activePrice!=good.salePrice)
			{
				salePrice=good.activePrice;
				strLabel="活动价：";				
			}else{
				salePrice=good.salePrice;
				strLabel="优购价：";
			}
			/*html += '  <p class="pdt_price">市场价：<del>&yen;' + good.publicPrice + '</del><br/>'+strLabel+'<span>&yen;<i>' + salePrice + '</i></span></p>';*/
            var zhekou=Math.round (salePrice / good.publicPrice *100)/10+'';
            zhekou=zhekou.indexOf('.')<0?zhekou+'.0':zhekou;

            html += '  <p class="price_sc"><em class="ygprc15">&yen;<i>'+salePrice+'</i></em><del>&yen;'+ good.publicPrice+'</del> <span class="ico_discount"><i>'+zhekou+'</i>折</span></p> '
			html += '</div>';
		}
		html += '<div class="bottom_bg"></div>';
		list_common.append(html);
	};
	
	//显示更多分类
	$(".vm").click(function(){
		$(this).nextAll('li').each(function(){
			$(this).show();
		});
		//修复 IE6 闪的问题
		$(this).remove();
	});
	
	//显示或隐藏其他分类
	$("#so").click(function(){
		$(this).find('li').each(function(){
			$(this).show();
		});
	});
})();
