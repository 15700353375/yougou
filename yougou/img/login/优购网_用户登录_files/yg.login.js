//placeholder
(function($){
	if($.fn.placeholder){return;}
	$.fn.placeholder = function () {
		var fnFocus = function () {
			$(this).addClass('ph-wrap-focus').find('input').focus();
		}
		var fnPaste=function(e) {
			$(this).parent().addClass('ph-wrap-has');
		}
		var fnKey = function () {
			this.value != '' ? $(this).parent().addClass('ph-wrap-has') : '';
		}
		var fnBlur = function () {
			if ($.trim(this.value) == '') {
				$(this).val('').parent().removeClass('ph-wrap-has ph-wrap-focus');
			}
		}
		return this.each(function () {
			var $this = $(this), dSpan = $('<span/>', { 'class': 'placeholder', text: $this.attr('placeholder') });
			dWrap = $('<div/>', { 'class': 'ph-wrap', click: fnFocus });
			$this.wrap(dWrap).before(dSpan).bind({ keyup: fnKey, blur: fnBlur,paste:fnPaste });
			if ($.trim(this.value) != '') {
				$this.parent().addClass('ph-wrap-has');
			}
		})
	}
	// 检测 placeholder 支持
	$(function(){
		var supportPlaceholder = 'placeholder' in document.createElement('input');
		if (!supportPlaceholder) {
			$('input[placeholder]').placeholder();
		}
	});
	window.onload=function(){
		$('.ph-wrap input').each(function () {
			if ($.trim(this.value) != '') {
				$(this).parent().addClass('ph-wrap-has');
			}
		});
	}
})(jQuery);
//输入密码时验证capslk
(function($) {
	var curID = 0;//
	$.fn.extend({
		capsLockTip : function(options) {
			options = $.extend({}, $.CapsLockTip.defaults, options);
			return this.each(function() {
				new $.CapsLockTip($(this),options);
			});
		}
	});
	$.CapsLockTip = function(input,options) {
		// 设置当前实例的配置参数。
		var _this = this;
		var width=options.width;// 设置自动完成框的宽度
		width = width < $(input).width()?$(input).width():width;
		var $input = $(input).attr("curCapsLockId", curID++);
		var $div = $("#autocapsLock" + $input.attr("curCapsLockId")).length != 0 ? $("#autocapsLock"
			+ $input.attr("curCapsLockId"))
			: $("<div/>").attr("id",
			"autocapsLock" + $input.attr("curCapsLockId")).css({
				"padding-top" : "3px",
				position : "absolute",
				"z-index" : "99999"
			}).css("width",width)
			.css("left", $input.offset().left + "px")
			.css("top", $input.offset().top + 35 + 3 + "px")
			.appendTo("body").text(options.text).hide();
		if(!$div.attr("class")&&options.styleClass){
			$div.addClass(options.styleClass);
		}else{
			$div.css({color : "#555555",
				"font-size" : "12px",
				border : "solid 1px #ffeab9",
				"border-bottom-color" : "#ffeab9",
				"border-right-color" : "#ffeab9",
				"background":"#ffffcc"
			});
		}
		$input.bind("keypress", function(_event) {
			if($.fn.capsLockTip.capsLockActived){return;}
			var e = _event || window.event;
			var kc = e.keyCode || e.which;// 按键的keyCode
			var isShift = e.shiftKey || (kc == 16) || false;// shift键是否按住
			$.fn.capsLockTip.capsLockActived = false;
			if ((kc >= 65 && kc <= 90 && !isShift)
				|| (kc >= 97 && kc <= 122 && isShift))
				$.fn.capsLockTip.capsLockActived = true;
			_this.showTips($.fn.capsLockTip.capsLockActived);
		});
		$input.bind("keydown",function(_event) {
			var e = _event || window.event;
			var kc = e.keyCode || e.which;
			if (kc == 20&& null != $.fn.capsLockTip.capsLockActived) {
				$.fn.capsLockTip.capsLockActived = !$.fn.capsLockTip.capsLockActived;
				_this.showTips($.fn.capsLockTip.capsLockActived);
			}
		});
		$input.bind("focus", function(_event) {
			if (null != $.fn.capsLockTip.capsLockActived)
				_this.showTips($.fn.capsLockTip.capsLockActived);
		});
		$input.bind("blur", function(_event) {
			_this.showTips(false);
		});
		//Show or hide the Caps Lock prompt.
		this.showTips = function(display) {
			if (display) {
				$div.show();
			} else {
				$div.hide();
			}
		};
		// Caps Lock key state
		$.fn.capsLockTip.capsLockActived = null;
	};
	$.CapsLockTip.defaults = {
		styleClass:"",//提示框样式class名称
		width:0,//提示框宽度
		text:"大写键已被锁定"//错误提示信息
	};
})(jQuery);

var gIsCodeShow;

//错误提示
function showError(id,msg){
	$('#'+id).html( msg ).attr('className','errortips');
	$('#'+id).parent().prev("dd").children(".nreg_input_bg").css({"border":"1px solid #e60012"});
}
//移除错误提示
function removeError(id){
	$('#'+id).html('').removeClass('errortips');
	if(id=='code2_tip'){
		$('#'+id).parent().prev("dd").children(".nreg_input_bg").removeAttr("style").css({"width":"202px"});
	}else{
		$('#'+id).parent().prev("dd").children(".nreg_input_bg").removeAttr("style");
	}
}
//校验账号
function checkUser(){
	if($.trim($('#email_').val())==''){
		showError("login_email_tip","请输入账号");
		return false;
	}
	removeError('login_email_tip');
	return true;
}
//更改验证码图片
function changeValidateImage2(){
	$('#code2_').val('');
	var requestHost = 'https:' == document.location.protocol ? 'https://passport.yougou.com' : 'http://www.yougou.com';
	//$('#imageValidate2').attr("src", requestHost+'/servlet/imageValidate?rand='+Math.random());
	$('#imageValidate2').attr("src",requestHost+'/servlet/imageCaptcha?rand='+Math.random());
}
//校验密码
function checkPass(){
	var iLen = $.trim($('#password_').val()).length;
	if(iLen==0){
		showError("login_password_tip","请输入密码");
		return false;
	}
	if(iLen<6||iLen>25){
		showError("login_password_tip","密码应6-25位之间");
		return false;
	}
	removeError('login_password_tip');
	return true;
}
//校验验证码
function checkValiCode(){
	var val = $.trim($('#code2_').val());
	if(val==''){
		showError("code2_tip","请输入验证码");
		return false;
	}
	if(val.length<4){
		showError("code2_tip","验证码格式错误");
		return false;
	}
	removeError('code2_tip');
	return true;
}

// 弹窗登陆成功回调
function poploginSuccessHandler(){
	var loginEmail = $("#login_email").val();
	try{
		$.cookie("belle_username", loginEmail.replace("@","#"), {expires: 30, path: '/', domain: '.yougou.com', secure: false });
	}catch(e){}
	window.top.isLogin = true;
	try
	{
		try
		{
			parent.synUserAddressData();
			closeLoginPop();
		}
		catch(e)
		{
			closeDialog();
		}
	}
	catch(e)
	{
		try{
			//购物车页
			parent.shopcartLoginCall();
		}catch(e){
			//单品页等
			parent.closeDialog();
		}

	}
}

function loginSucCallBack(){
	if($('#redirectURL_1')[0]){
		var redirect = encodeURI($("#redirectURL_1").val());
		if(redirect.length <= 0) redirect = "/my/ucindex.jhtml";
		var re=new RegExp("^((https|http|www.))");
		redirect = YouGou.Util.setUrlStamp(redirect);//加上时间戳
		if(re.test(redirect)){
			location.href =redirect;
		}else{
			location.href = "http://www.yougou.com"+redirect;

		}

	}else{
		poploginSuccessHandler();
	}
}
var loginOptFlag = false;
//验证登陆
function validaLogin(){
	$('.errortips').html('').removeClass('errortips');
	var isCode =  gIsCodeShow?checkValiCode():true;
	var isPass = checkPass();
	var username = $('#email_').val(),password = $('#password_').val(),verifycode = $('#code2_').val();
	var loginNonceName = $("#loginNonceId").attr('name');
	var loginNonceValue = $("#loginNonceId").attr('value');
	if(checkUser()&&checkPass()&&isCode){
		if(loginOptFlag){
			return false;
		}
		loginOptFlag = true;
		var data = {"username" :username,"password":password,"verifycode":verifycode,"isVerify":isCode};
		data[loginNonceName] = loginNonceValue;
		$.ajax({
			type : "POST",
			url:"/my/procsignin.jhtml?callback=?",
			async : false,
			data : data,
			dataType:"jsonp",
			success: function(d){
				if(!!d.verifycode&&!gIsCodeShow){
					changeValidateImage2();
					gIsCodeShow=true;
					$("#code_container").show();
				}
				var msg = d.msg;
				switch(msg){
					case 'login_success':
						loginSucCallBack();
						break;
					case 'username_err':
						$("#password_").val("");
						showError("login_email_tip","您的账号或密码有误");
						showError("login_password_tip","");
						loginOptFlag = false;
						break;
					case 'pwd_err':
						$("#password_").val("");
						showError("login_email_tip","您的账号或密码有误");
						showError("login_password_tip","");
						loginOptFlag = false;
						break;
					case 'vercode_err':
						changeValidateImage2();
						showError("code2_tip","验证码输入错误");
						loginOptFlag = false;
						break;
					case 'nonce_err':
						$("#password_").val("");
						showError("login_email_tip","请刷新页面后重新提交");
						loginOptFlag = false;
						break;
					case 'ip_limit_err':
						showError("login_email_tip","您所在ip登录次数过多，请稍候再试");
						loginOptFlag = false;
						break;
					case 'account_blacklist':
						showError("login_email_tip","登录异常，请重试。");
						loginOptFlag = false;
						break;
					case 'sys_err':
						showError("login_email_tip","登录异常，请重试。");
						loginOptFlag = false;
						break;
					case 'user_limit_err':
						showError("login_email_tip","您登录过于频繁，请稍候再试。");
						loginOptFlag = false;
						break;
					default:
						location.reload();
						break;
				}
			}
		});
	}
	return false;
};
$(function(){
	$('#email_').blur(checkUser);
	$('#password_').blur(checkPass);
	$('#code2_').blur(checkValiCode);
	$('#loginform').submit(validaLogin);
	$('.nlog_submit').hover(function(){
		$(this).addClass('nlog_subon');
	},function(){
		$(this).removeClass('nlog_subon');
	});
	gIsCodeShow = $("#code_container").is(':visible')?true:false;
	changeValidateImage2();
	//init pop login
	$('#pop_login').click(validaLogin);

	$("#password_").capsLockTip({width:"80px",text:"大写状态开启"});
});
