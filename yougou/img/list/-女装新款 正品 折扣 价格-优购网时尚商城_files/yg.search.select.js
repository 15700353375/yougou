( function(){
	
	Array.prototype.contains = function( obj ) {
		for( var i = 0 ; i < this.length ; i++ ) {
			var _obj = this[ i ] ;
			if( obj == _obj ) return true ;
		}
		return false ;
	} ;
	
	Array.prototype.addAll = function( array ) {
		for( var i = 0 ; i < array.length ; i++ ) {
			var _obj = array[ i ] ;
			if( this.contains( _obj ) ) continue ;
			this.push( _obj ) ;
		}
	} ;
	
	var _isEmpty = function( str ){
		return !str || str == '0' ;
	} ;
	
	var _splAttr = function( str ) {
		var key = str.substr( 0 , 3 ) ;
		str = str.substr( 3 ) ;
		var array = [] ;
		while( true ) {
			array.push( str.substr( 0 , 3 ) ) ;
			str = str.substr( 3 ) ;
			if( str.length == 0 ) break ;
		}
		return { key : key , array : array } ;
	} ;
	
	var _addLinkInfo = function( segments , obj ){
		if( !obj ) obj = { brands : [] , category : [] , attrs :{} } ;
		var brands = segments[ 0 ] ;
		var category = segments[ 1 ] ;
		var attrs = segments[ 2 ] ;
		var _spl = function( str ){ return _isEmpty( str ) ? [] : str.split('_') ; } ;
		brands = _spl( brands ) ;
		brands.sort();
		category = _spl( category ) ;
		attrs = _spl( attrs ) ;
		obj.brands.addAll( brands ) ;
		obj.category.addAll( category ) ;
		if( !_isEmpty( attrs ) ) {
			for( var i = 0 ; i < attrs.length ; i++ ) {
				var attr_obj = _splAttr( attrs[ i ] ) ;
				if( !obj.attrs[ attr_obj.key ] ) obj.attrs[ attr_obj.key ] = [] ;
				obj.attrs[ attr_obj.key ].addAll( attr_obj.array ) ;
				obj.attrs[ attr_obj.key ].sort() ;
			}
		}
		return obj ;
	} ;
	
	var _getParam = function( q ){
		var idx = q.indexOf( '?' ) ;
		if( idx != -1 ) {
			q = q.substr( idx + 1 ) ;
		}
		var segments = q.split('&') ;
		var obj = {} ;
		for( var i = 0 ; i < segments.length ; i++ ) {
			var kv = segments[i].split( '=' ) ;
			obj[ kv[ 0 ] ] = kv[ 1 ] ;
		}
		return obj ;
	}
	
	var _getLinkArray = function( segments , choosed , ul , flag ){
		var link_obj = _addLinkInfo( segments ) ;
		var itemNo = ul.attr( 'name' ) ;
		var idx = 2 ;
		var prefix ;
		if( itemNo == 'seo_en_brand_name' ) {
			idx = 0 ;
			prefix = '' ;
			var selected = prefix + choosed.map(function(){
				return $(this).attr('name') ;
			}).get().join("_") ;
			link_obj = _addLinkInfo( [ selected ] , link_obj ) ;
		}else if( itemNo.indexOf( 'catg_level_no_' ) == 0 ) {
			idx = 1 ;
			var selected = choosed.map(function(){
				return $(this).attr('name') ;
			}).get().join("") ;
			//当分类允许多选时使用下面代码
			//selected = ul.parent().attr("name") + "_" + selected;
			link_obj = _addLinkInfo( [ undefined , selected ] , link_obj ) ;
		}else{
			choosed.each( function(i,n){
				var segs = $('a' ,this).attr( 'href' ) ;
				if( flag == 'key' ) {
					var param = _getParam( segs ) ;
					segs = [ undefined , undefined , param.attrStr ] ;
				}else{
					segs = segs.split('-') ;
					segs = [ undefined , undefined , segs[ 3 ] ] ;
				}
				link_obj = _addLinkInfo( segs , link_obj ) ;
			} ) ;
		}
		
		var j = [] ;
		if( link_obj.brands.length == 0 ) j.push( '0' ) ;
		else j.push( link_obj.brands.join('_') ) ;

		if( link_obj.category.length == 0 ) j.push( '0' ) ;
		else j.push( link_obj.category.join('_') ) ;
		
		var attr_str ;
		var a = [] ;
		for( var k in link_obj.attrs ) {
			a.push( k + link_obj.attrs[ k ].join('') ) ;
		}
		a.sort() ;
		if( a.length == 0 ) j.push( '0' ) ;
		else j.push( a.join('_') ) ;
		return j ;
	} ;
	
	$( function(){
		
		//filter独立筛选项多选搜索提交
		$('input[name="filter_multi_search"]').click( function(){
			var dd = $( this ).closest( 'dd' ) ;
			var ul = $( 'ul' , dd ) ;
			var choosed = $('li.choosed' , ul ) ;
			if( choosed.length == 0 ) return false ;
			var baseLink = $('#baseLink').val() ;
			var segments = baseLink.split( '-' ) ;
			var j = _getLinkArray( segments , choosed , ul ) ;
			var query = $('#queryParams').val() ;
			if( query ) query = '?' + query ;
			var order = $('#orderBy').val() ;
			if( order ) j.push( order ) ;
			window.location.href = '/f-' + j.join( '-' ) + '.html' + query ;
		} ) ;

		//filter更多筛选项多选搜索提交
		$('input[name="filter_moremulti_search"]').click( function(){
			var dd = $( this ).closest( 'div').parent() ;
			var ul = $( 'ul' , dd ) ;
			var choosed = $('li.check_li' , ul ) ;
			if( choosed.length == 0 ) return false ;
			var baseLink = $('#baseLink').val() ;
			var segments = baseLink.split( '-' ) ;
			var j = _getLinkArray( segments , choosed , ul ) ;
			var query = $('#queryParams').val() ;
			if( query ) query = '?' + query ;
			var order = $('#orderBy').val() ;
			if( order ) j.push( order ) ;
			window.location.href = '/f-' + j.join( '-' ) + '.html' + query ;
		} ) ;
		
		//searchkey独立筛选项多选搜索提交
		$('input[name="keyword_multi_search"]').click( function(){
			var dd = $( this ).closest( 'dd' ) ;
			var ul = $( 'ul' , dd ) ;
			var choosed = $('li.choosed' , ul ) ;
			if( choosed.length == 0 ) return false ;
			var baseLink = $('#baseLink').val() ;
			var query = $('#queryStr').val() ;
			var price = $('#price_area').val() ;
			var order = $('#orderBy').val() ;
			var mctcd = $("#mctcd").val();//品牌旗舰店merchard_code
			var storeId = $("#storeId").val();//品牌旗舰店storeId
			var param = _getParam( query ) ;
			var segments = [ param.brandEnName , param.catgNo , param.attrStr ] ;
			var j = _getLinkArray( segments , choosed , ul , 'key') ;
			var array = [] ;
			if( !_isEmpty( j[ 0 ] ) ) array.push( 'brandEnName=' + j[ 0 ] ) ;
			if( !_isEmpty( j[ 1 ] ) ) array.push( 'catgNo=' + j[ 1 ] ) ;
			if( !_isEmpty( j[ 2 ] ) ) array.push( 'attrStr=' + j[ 2 ] ) ;
			if( order ) order = '&orderBy=' + order ;
			if( mctcd ) mctcd = '&mctcd=' + mctcd;
			if( storeId ) storeId = '&storeId=' + storeId;
			window.location.href = baseLink + '&' + array.join( '&' ) + ( price || '' ) + ( order || '' ) + ( mctcd || '' ) + ( storeId || '');
		} ) ;
		
		//searchkey更多筛选项多选搜索提交
		$('input[name="keyword_moremulti_search"]').click( function(){
			var dd = $( this ).closest( 'div' ).parent() ;
			var ul = $( 'ul' , dd ) ;
			var choosed = $('li.check_li' , ul ) ;
			if( choosed.length == 0 ) return false ;
			var baseLink = $('#baseLink').val() ;
			var query = $('#queryStr').val() ;
			var price = $('#price_area').val() ;
			var order = $('#orderBy').val() ;
			var mctcd = $("#mctcd").val();//品牌旗舰店merchard_code
			var storeId = $("#storeId").val();//品牌旗舰店storeId
			var param = _getParam( query ) ;
			var segments = [ param.brandEnName , param.catgNo , param.attrStr ] ;
			var j = _getLinkArray( segments , choosed , ul , 'key') ;
			var array = [] ;
			if( !_isEmpty( j[ 0 ] ) ) array.push( 'brandEnName=' + j[ 0 ] ) ;
			if( !_isEmpty( j[ 1 ] ) ) array.push( 'catgNo=' + j[ 1 ] ) ;
			if( !_isEmpty( j[ 2 ] ) ) array.push( 'attrStr=' + j[ 2 ] ) ;
			if( order ) order = '&orderBy=' + order ;
			if( mctcd ) mctcd = '&mctcd=' + mctcd;
			if( storeId ) storeId = '&storeId=' + storeId;
			window.location.href = baseLink + '&' + array.join( '&' ) + ( price || '' ) + ( order || '' ) + ( mctcd || '' ) + ( storeId || '');
		} ) ;
	} ) ;
} ) () ;