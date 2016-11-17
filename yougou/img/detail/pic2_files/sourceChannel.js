function anmSourceRecord() { 
	var s = document.referrer; var admanageType = "C"; var path="/";
	if(s==null || s==""){ 
		admanageType = "A"; 
	}else{ 
		var source = getCookie('source'); 
		if(source!=null && source!=""&&source!="error"){ admanageType="B";	 }else{	 
			if(s.indexOf("http://www.yougou.com")!=-1 || s.indexOf("http://outlets.yougou.com")!=-1 || s.indexOf("http://flashbuy.yougou.com")!=-1 || s.indexOf("http://tmall.yougou.com")!=-1 || s.indexOf("http://mall.yougou.com")!=-1){ 
				var value = getCookie('admanageType'); admanageType = value;	 
			} 
			var qqLoginSource = getCookie('qqLoginSource');
			if (qqLoginSource != null && qqLoginSource != ""
					&& qqLoginSource != "error") {
				var value = getCookie('admanageType');
				admanageType = value;
				document.cookie = "qqLoginSource" + "=;expires="
				+ (new Date(0)).toUTCString() + ";domain=.yougou.com;path=" + path;
			}
		} 			
		document.cookie = "source"+"=;expires="+(new Date(0)).toUTCString()+";domain=.yougou.com;path="+path; 
	} 
	var exp = new Date(); 
	exp.setTime(exp.getTime() + 1000 * 60 * 60 * 24); 
	document.cookie = "admanageType=" + escape (admanageType) + ";expires=" + exp.toUTCString()+";domain=.yougou.com;path="+path; 
}

function getCookie(name){
	var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)"); 
	if(arr=document.cookie.toString().match(reg)){ 
		return unescape(arr[2]); 
	}else{ 
		return "error"; 
	}
}

anmSourceRecord();

