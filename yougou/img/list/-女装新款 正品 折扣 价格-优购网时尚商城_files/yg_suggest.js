$(function(){
	var ygSuggest=function () {
		var BASE_DOMAIN = 'http://www.yougou.com';
		var o = $.extend({
			defWord : null
		},o||{});
		var jsonUrl = '/ssc/suggest.sc';
		var $searchT = $('#keyword');
		$searchT.attr("autocomplete", "off");
		//var sw = $searchT.width();
		var oldVal = '',cursor = -1;//
		$searchT.after('<ul class="searchmenu" style="display:none"></ul>')
		var $keyList = $('.searchmenu');
		var sSearch = {
			init : function () {
				var that = this;
				$searchT.keyup(function (e) {//keyup事件
					that._keyEvent( this, e, false );
				}).focus(function ( e ) {//focus事件
					that._keyEvent( this, e, true );
				});
				$(document).click(function (e) {//document点击事件
					var target= e.target;
					if (!($(e.target).attr('id')=='keyword')) {
						$keyList.hide();
					}
				});
				$(document).delegate('.searchmenu .li-searchKey','click',function (e) {//点击列表处理
				//	var link = $keyList.find('li.curr span').html();
					var link = $keyList.find('li.curr span').attr('url');
					if(link) location.href = BASE_DOMAIN + link;
					else location.href = BASE_DOMAIN + '/sr/searchKey.sc?keyword=' + $keyList.find('li.curr div.search-item').html();
				});
				$(document).delegate('.searchmenu div.close','click',function (e) {//点击列表处理
					$keyList.empty().hide();
				});
				
				$(document).delegate('.searchmenu .li-searchKey','mouseover',function (e) {//点击列表处理
					$(this).addClass("curr");
				});
				$(document).delegate('.searchmenu .li-searchKey','mouseout',function (e) {//点击列表处理
					$(this).removeClass("curr");
				});
			},
			_keyEvent : function (o,e,style) {
				var that = this;
				var _self = $(o);
				var val = $.trim($(o).val());
				val = (val != o.defWord)?val:'';
				var keycode = e.keyCode;
				var url = jsonUrl+'?term='+encodeURI(val);
				var lock = (keycode>36&&keycode<41||oldVal==val||keycode == 13)?true:false;//是否在操作光标键
				if (!lock&&oldVal!=val) {//如果value有变化重置list index
					cursor = -1;
					oldVal=val;
				}
				if (!lock||style) {//输入请求事件
//					if(!val) {
//						$keyList.empty().hide();
//						return;
//					}
					$.ajax({
						type:"POST",
						dataType : "json",
						url:url,
						success:function ( data ) {
							if (data && data.length != 0) {
								var dLen = data.length;
								var suggestList = '';
								var b = '';
								var c = '';
								var h = '';
								for (i = 0; i < dLen; i++) {
									var type = data[i].type;
									if(type == 1){
										if( !b ) b = '<div class="fore">';
//										b += '<li class="li-searchKey">';
//										b += '<div class="search-item">'+data[i].suggest+'</div>';
//										b += '<div class="search-count">约'+data[i].count+'个商品</div>';
//										b += '</li>';
										b += '<li class="li-searchKey">';
										b += '<div class="search-item">在品牌<strong>'+data[i].suggest+'</strong>中搜索</div>';
										//b += '<span style="display:none">/sr/searchKey.sc?keyword=' + data[i].brand_en_name +'&orderBy=0&brandEnName='+ data[i].brand_en_name +'</span>';
										b += '<span style="display:none" url="/sr/searchKey.sc?keyword='+data[i].brand_en_name+'&orderBy=0&brandEnName='+data[i].brand_en_name+'"> </span>';
										b += '<div class="search-count">约'+data[i].count+'个商品</div>';
										b += '</li>';
									}else if(type == 2){
										if( !c ) c = '<div class="fore">';
//										c += '<li class="li-searchKey">';
//										c += '<div class="search-item">'+data[i].suggest+'</div>';
//										c += '<div class="search-count">约'+data[i].count+'个商品</div>';
//										c += '</li>';
										c += '<li class="li-searchKey">';
										var begin=data[i].cnames.lastIndexOf(">");
										var subString=data[i].cnames.substring(begin+1);
										c += '<div class="search-item">在分类<strong>'+data[i].cnames+'</strong>中搜索</div>';
										//c += '<span style="display:none">/sr/searchKey.sc?keyword=' + subString +'&orderBy=0&catgNo=' + data[i].cno +'</span>';
										c += '<span style="display:none" url="/sr/searchKey.sc?keyword='+subString+'&orderBy=0&catgNo='+data[i].cno+'"> </span>';
										c += '<div class="search-count">约'+data[i].count+'个商品</div>';
										c += '</li>';
									}else if(type == 3){
										h += '<li class="li-searchKey">';
										h += '<div class="search-item">'+data[i].suggest+'</div>';
										h += '<div class="search-count">约'+data[i].count+'个商品</div>';
										h += '</li>';
									}
								}
								if( b ) b += '</div>';
								if( c ) c += '</div>';
								suggestList += b;
								suggestList += c;
								suggestList += h;
								suggestList += '<div class="close">关闭</div>';
								$keyList.html(suggestList).show();
								that._doKey(_self,keycode);
							}else {
								$keyList.empty().hide();
							}
						}
					});
				}else {//只光标操作
					that._doKey(_self,keycode);
				}
			},
			_doKey : function (_self,keycode) {//键盘事件
				var that = this;
				var $li = $keyList.find('li');
				var keyLen = $li.length;
				if (keycode==38) {//键盘上键事件
					if(cursor > 0)
						cursor -= 1;
					else
						cursor = keyLen - 1;
					that._liEvent(_self);
				}
				if (keycode==40) {//键盘下键事件
					if(cursor < keyLen - 1)
						cursor += 1;
					else
						cursor = 0;
					that._liEvent(_self);
				}
				if (keycode==13) {//键盘回车键事件
					//var link = $keyList.find('li.curr span').html();
					var link = $keyList.find('li.curr span').attr('url');
					if(link) location.href = BASE_DOMAIN + link;
				}
			},
			_liEvent : function(_self) {//键盘上下处理
				$keyList.find('li').removeClass('curr');
				var nowLi = $keyList.find('li').eq(cursor);
				var itemValue = nowLi.find('div.search-item strong').html();
				if( !itemValue ) itemValue =  nowLi.find('div.search-item').html();
				else{
					if(itemValue.indexOf('&gt;') != -1){
						itemValue = itemValue.split('&gt;').pop();
					}
				}
				_self.val(itemValue);
				nowLi.addClass('curr');
			}
		};
		sSearch.init();
	};
	ygSuggest();
});