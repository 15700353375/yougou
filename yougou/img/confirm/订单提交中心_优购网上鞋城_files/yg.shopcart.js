//placehold''er''
(function($) {
    if ($.fn.placeholder) {
        return;
    }
    $.fn.placeholder = function() {
        var fnFocus = function() {
            $(this).addClass('ph-wrap-focus').find('input').focus();
        }
        var fnPaste = function(e) {
            $(this).parent().addClass('ph-wrap-has');
        }
        var fnKey = function() {
            this.value != '' ? $(this).parent().addClass('ph-wrap-has') : '';
        }
        var fnBlur = function() {
            if ($.trim(this.value) == '') {
                $(this).val('').parent().removeClass(
                    'ph-wrap-has ph-wrap-focus');
            }
        }
        return this.each(function() {
            var $this = $(this);
            if ($this.parent().hasClass('ph-wrap')) {
                return
            }
            var dSpan = $('<span/>', {
                'class' : 'placeholder',
                text : $this.attr('placeholder')
            });
            dWrap = $('<div/>', {
                'class' : 'ph-wrap',
                click : fnFocus
            });
            $this.wrap(dWrap).before(dSpan).bind({
                keyup : fnKey,
                blur : fnBlur,
                paste : fnPaste
            });
            if ($.trim(this.value) != '') {
                $this.parent().addClass('ph-wrap-has');
            }
        })
    }
    // 检测 placeholder 支持
    $(function() {
        supportPlaceholder = 'placeholder' in document.createElement('input');
        if (!supportPlaceholder) {
            $('input[placeholder]').placeholder();
        }
    });
    window.onload = function() {
        $('.ph-wrap input').each(function() {
            if ($.trim(this.value) != '') {
                $(this).parent().addClass('ph-wrap-has');
            }
        });
    }
})(jQuery);
YouGou.order = {
    base : {},
    // 模块
    module : {},
    ui : {}
}
var ygOrder = YouGou.order;

var validator = null;
if (jQuery.validator) {
    jQuery.validator.addMethod("containSpecial", function(value, element) {
        var containSpecial = /([#$%^*+=<>?]+)/;
        return this.optional(element) || !containSpecial.test(value);
    }, "请输入正确格式字符");
    jQuery.validator
        .addMethod(
        "phone",
        function(value, element) {
            var rePhone = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0-9]|17[0-9])\d{8}$/;
            var addrId=$("#addressId").val();
            var isYG=$("#addressType").val()=="yougou"&&addrId!=""&&addrId!=null;
            if(isYG){
                return true;
            }
            return this.optional(element) || rePhone.test(value);
        }, "请您输入正确格式的手机号码");
    // 收货人姓名长度
    jQuery.validator.addMethod("receivingNameLengthRule", function(value,
                                                                   element) {
        var addrId=$("#addressId").val();
        var isYG=$("#addressType").val()=="yougou"&&addrId!=""&&addrId!=null;
        if(isYG){
            return true;
        }
        value = value.replace(/(^\s*)|(\s*$)/g, "");// 去除左右空格
        var pass = true;
        if (value == null || value == "") {
            pass = false;
        }
        var strLength = value.replace(/[^\x00-\xff]/g, "**").length;
        if (strLength <= 2 || strLength >= 25) {
            pass = false;
        }
        return this.optional(element) || pass;
    }, "请输入收货人姓名，要求3-25个字符");

    var numberRule = /(^\d*$)/; // 全为数字
    var englishAllRule = /^[a-z|A-Z]+$/;// 全部为英文
    var symbolAllRule = /[a-z\d\s\u4e00-\u9fa5]/;// 全部为标点符号
    var symbolRule = new RegExp(
        ".*(`|~|%|!|@|\\+|#|\\[|\\]|<|>|《|》|\/|\\^|=|\\?|~|！|:|；|;|：|·|\\$|￥|【|】|…|&|‘|“|”|\"|？|\\*|\\(|\\)|{|}|（|）|、|\\\\|\\|)+"); // 标点符号
    var followNumberRule = /\d{8}/;// 连续8个数字

    // 收货人姓名标点符号等
    jQuery.validator.addMethod("receivingNameSymbolRule", function(value,
                                                                   element) {
        var addrId=$("#addressId").val();
        var isYG=$("#addressType").val()=="yougou"&&addrId!=""&&addrId!=null;
        if(isYG){
            return true;
        }
        value = value.replace(/(^\s*)|(\s*$)/g, "");// 去除左右空格
        var pass = true;
        if (value.match(numberRule) || !value.match(symbolAllRule)
            || value.match(symbolRule)) {
            pass = false;
        }
        return this.optional(element) || pass;
    }, "请您使用真实姓名，不能全部是数字，不能包含特殊符号（括号、井号等）");

    // 收货详细地址长度
    jQuery.validator.addMethod("receivingAddressLengthRule", function(value,
                                                                      element) {
        var addrId=$("#addressId").val();
        var isYG=$("#addressType").val()=="yougou"&&addrId!=""&&addrId!=null;
        if(isYG){
            return true;
        }
        value = value.replace(/(^\s*)|(\s*$)/g, "");// 去除左右空格
        var pass = true;
        if (value == null || value == "") {
            pass = false;
        }
        var strLength = value.replace(/[^\x00-\xff]/g, "**").length;
        if (strLength <= 5 || strLength >= 120) {
            pass = false;
        }
        return this.optional(element) || pass;
    }, "请输入收货人地址，要求5-120个字符");

    // 收货人详细地址标点符号等
    jQuery.validator.addMethod("receivingAddressSymbolRule", function(value,
                                                                      element) {
        var addrId=$("#addressId").val();
        var isYG=$("#addressType").val()=="yougou"&&addrId!=""&&addrId!=null;
        if(isYG){
            return true;
        }
        value = value.replace(/(^\s*)|(\s*$)/g, "");// 去除左右空格
        var pass = true;
        if (value.match(numberRule) || !value.match(symbolAllRule)
            || value.match(englishAllRule) || value.match(symbolRule)
            || followNumberRule.test(value)) {
            pass = false;
        }
        return this.optional(element) || pass;
    }, "请填写详细地址，不能全部是数字/英文/包含特殊符号（括号、井号等）");

    // 支付方式
    jQuery.validator.addMethod("payment", function(value, element) {
        if (!YouGou.Util.isEmpty($("#onlinePayStyleNo").val())
            || $("#payment_2").attr('checked') == true) {
            return true;
        } else {
            $('html,body').animate({scrollTop : $("#paymentBank").offset().top}, 1000);
            return false;
        }
    }, "请选择支付方式");

    // 身份证格式校验
    jQuery.validator.addMethod("checkCardNo", function(value, element) {
        if($("#modify_card").length > 0){
            return true;
        }
        if(YouGou.Util.isEmpty($(".idcard_text").val())){
            //$('html,body').animate({scrollTop : $(".idcard_text").offset().top}, 300);
            return false;
        }
        var isPass = false;
        //验证身份证格式
        $.ajax({
            type:"post",
            url:'/order/validateCardNo.sc?r='+ Math.random(),
            data : {cardNo:$(".idcard_text").val(),cardName:$('#conPerson .padd_left').text()},
            async:false,
            success : function(d){
                if(d == "success"){	//验证通过
                    isPass = true;
                }
            }
        });
        if (isPass) {
            return true;
        } else {
            //$('html,body').animate({scrollTop : $(".idcard_text").offset().top}, 300);
            return false;
        }
    }, "请输入正确的身份证号");
}
// 基本路径,登录前购物车内容,显示发票栏
var basePath, arrUnloginShopcart, isShowInvcBox, invInfo;
if (!basePath) {
    basePath = '';
}
var cartContainer = "shoppingCartContainer";
var paymentContainer = "paymentContainer";
var cartActionBasePath = basePath + "/shoppingcart/";
var orderActionBasePath = basePath + "/order/";
var loginPopUrl = "/member/miniLogin.jhtml";
var toEditAddressPopUrl = "/my/updateAddressPop.jhtml";
var toAddAddressPopUrl = "/my/addAddressPop.jhtml";

// 购物车去结算登陆成功回调(因登陆跨域回调问题,该方法只能放到全局变量)
/*
 * function fnLoginSucCallback(){
 *
 * $.post('/shoppingcart/getShoppingCartChange.sc',{unloginshopcart:arrUnloginShopcart,tradeCurrency:$('#tradeCurrency').val()},function(str){
 * if(str=='true'){ $('.cart_b_paybtn').click(); }else{ location.reload(); } }) }
 */
// 由于变为两个购物车，因此分开写
// //购物车去结算登陆成功回调(因登陆跨域回调问题,该方法只能放到全局变量)
function fnLoginSucCallbackCNY() {
    $.post('/shoppingcart/getShoppingCartChange.sc', {
        unloginshopcart : arrUnloginShopcart,
        tradeCurrency : "CNY"
    }, function(str) {
        if (str == 'true') {
            $('#shoppingCartContainerCNY .cart_b_paybtn').click();
        } else {
            location.reload();
        }
    })
}
function changeValidateImage() {
    var requestHost = 'https:' == document.location.protocol ? 'https://passport.yougou.com'
        : 'http://www.yougou.com';
    $('#imageValidate2').attr("src",
        requestHost + '/servlet/imageCaptcha?rand=' + Math.random());
}
function fnLoginSucCallbackHKD() {
    $.post('/shoppingcart/getShoppingCartChange.sc', {
        unloginshopcart : arrUnloginShopcart,
        tradeCurrency : "HKD"
    }, function(str) {
        if (str == 'true') {
            $('#shoppingCartContainerHKD .cart_b_paybtn').click();
        } else {
            location.reload();
        }
    })
}

function fnLoginSucCallbackKRW() {
    $.post('/shoppingcart/getShoppingCartChange.sc', {
        unloginshopcart : arrUnloginShopcart,
        tradeCurrency : "KRW"
    }, function(str) {
        if (str == 'true') {
            $('#shoppingCartContainerKRW .cart_b_paybtn').click();
        } else {
            location.reload();
        }
    })
}

function fnLoginSucCallbackKRW_ZF() {
    $.post('/shoppingcart/getShoppingCartChange.sc', {
        unloginshopcart : arrUnloginShopcart,
        tradeCurrency : "KRW_ZF"
    }, function(str) {
        if (str == 'true') {
            $('#shoppingCartContainerKRW_ZF .cart_b_paybtn').click();
        } else {
            location.reload();
        }
    })
}

ygOrder = {
    ui : {
        showTip : function(str, srcElementDom) {
            var offset = $(srcElementDom).offset();
            if (!$('#yg-ui-showTip')[0]) {
                $('<div id="yg-ui-showTip" class="yg_ui_showTip">').appendTo(
                    'body');
            } else {
                $('#yg-ui-showTip').stop(true, true);
            }
            $('#yg-ui-showTip').html(str).css({
                'top' : offset.top,
                'left' : offset.left + 20
            }).show().animate({
                left : offset.left - 30
            })
            setTimeout(function() {
                $('#yg-ui-showTip').fadeOut('slow');
            }, 800);
        }
    },
    base : {
        // 安全验证：检查是否绑定手机号
        securityBind : function(dModule) {
            $.ajax({
                type : "POST",
                url : "/checkUserMobileIsExist.jhtml",
                cache : false,
                success : function(data) {
                    if ("true" == data) {
                        $('#mobileCheckDiv').show();
                    }
                }
            });
        },
        // 安全验证弹窗处理
        SafeCheck : function() {
            // 检查手机号
            var checkMobile = function() {
                var tip = $('#sendTips');
                tip.attr("class", "").html("").show();
                var rePhone = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0-9]|17[0-9])\d{8}$/;
                if ($("#Mobile").val() == "") {
                    $("#Mobile").focus();
                    tip.addClass("errortips").html("手机号码不能为空");
                    return false;
                }
                if (!rePhone.test($("#Mobile").val())) {
                    $("#Mobile").focus();
                    tip.addClass("errortips").html("手机号码格式错误");
                    return false;
                }
                var type = false;
                $.ajax({
                    type : "POST",
                    async : false,
                    url : "/checkUserMobile.jhtml?r=" + Math.random()
                    + "&phone=" + $("#Mobile").val(),
                    success : function(data) {
                        if ("1" == data) {
                            tip.hide();
                            type = true;
                        } else {
                            tip.attr("class", "").html("");
                            $("#sendTips").attr("class", "errortips")
                                .html(data);
                        }
                    }
                });
                return !!type;
            };
            // 检查验证码
            var codeNum = 0;
            var checkCode = function() {
                $("#codeTips").show();
                var $Code = $("#Code")
                if ($Code.val() == "") {
                    $Code.focus();
                    $("#codeTips").addClass("errortips").html("验证码不能为空");
                    codeNum += 1;
                    if (codeNum >= 3) {
                        $("#Tips").show();
                    }
                    return false;
                }
                var type = false;
                $.ajax({
                    type : "POST",
                    async : false,
                    url : "/my/checkPhoneCodes.jhtml?r=" + Math.random()
                    + "&phone=" + $("#Mobile").val() + "&code="
                    + $Code.val(),
                    success : function(data) {
                        if (parseInt(data) == 0 || parseInt(data) == 2) {
                            $Code.focus();
                            $("#codeTips").addClass("errortips").html("验证码错误");
                        } else {
                            $("#codeTips").hide();
                            type = true;
                        }
                    }
                });
                return !!type;
            };
            // 发送验证码
            $("#sendCodeBtn").bind(
                'click',
                function() {
                    var $this = $(this);
                    // TODO:验证码校验
                    var val = $('#code2_').val();
                    if (val == '') {
                        YGM.Util.show('codeTips2', '验证码不能为空');
                        return;
                    }
                    var validResult = false;
                    $.ajax({
                        type : "POST",
                        async : false,
                        url : '/api/checkCode2.sc',
                        data : 'code=' + val,
                        success : function(d) {
                            if (parseInt(d) == 0) {
                                msg = '验证码不正确';
                                YGM.Util.changeValidateImage2();
                                YGM.Util.show('codeTips2', msg);
                                validResult = false;
                            } else {
                                validResult = true;
                                YGM.Util.clear();
                            }
                        }
                    });
                    if (!validResult)
                        return;

                    if ($this.attr('disabled') == 'disabled')
                        return;
                    if (!checkMobile())
                        return;
                    $this.attr("disabled", "disabled").addClass("dis");
                    $("#sendTips").show().addClass("righttips").html(
                        "验证码已发送");
                    var time1 = 59;
                    timer1 = setInterval(function() {
                        $("#getMsgSpan").html(time1 + "秒后可重新发送");
                        time1 -= 1;
                        if (time1 <= 0) {
                            $("#getMsgSpan").html("重新发送验证码");
                            $("#sendCodeBtn").attr("disabled", "")
                                .removeClass("dis");
                            clearInterval(timer1);
                        }
                    }, 1000);
                    // 获取手机验证码
                    $.ajax({
                        type : "POST",
                        data : {
                            "phone" : $("#Mobile").val(),
                            "validCode" : $("#code2_").val()
                        },
                        url : "/my/getActiveCodes.jhtml",
                        success : function(data) {
                            switch (data) {
                                case null:
                                    $("#sendTips").attr("class", "errortips")
                                        .html('获取验证码失败!');
                                    break;
                                case '2':
                                    $("#sendTips").attr("class", "righttips")
                                        .html('验证码已发送');
                                    $('#MobileCodeSpan').show();
                                    break;
                                case '3':
                                    $("#sendTips").attr("class", "errortips")
                                        .html('获取验证码失败!');
                                    $('#Tips').show();
                                    break;
                                case '4':
                                    $("#sendTips").attr("class", "errortips")
                                        .html('手机号码存在异常，请更换手机号码!');
                                    break;
                                case '1':
                                    $("#sendTips").attr("class", "errortips")
                                        .html('手机号码格式不正确!');
                                    break;
                                case '5':
                                    $("#sendTips").attr("class", "errortips")
                                        .html('1分钟内不可重复获取验证码!');
                                    $('#MobileCodeSpan').show();
                                    break;
                                case '0':
                                    $("#sendTips").attr("class", "errortips")
                                        .html('图片验证码校验失败!');
                                    $('#MobileCodeSpan').show();
                                    break;
                                default:
                                    $("#sendTips").attr("class", "errortips")
                                        .html(data);
                                    break;

                            }
                        }
                    });
                });

            // 提交绑定
            $("#MobileCodeConfirm").bind(
                'click',
                function() {
                    var $this = $(this);
                    if ($this.attr('locked') == true)
                        return;
                    if (!checkMobile() || !checkCode())
                        return;
                    $('#MobileCodeConfirm span').html('正在验证...');
                    $this.attr('locked', true);
                    $.ajax({
                        type : "POST",
                        async : false,
                        url : "/updateCheckMobile.jhtml?r=" + Math.random()
                        + "&phone=" + $("#Mobile").val(),
                        success : function(data) {
                            if ("true" == data) {
                                alert('绑定手机号成功！');
                                $('#mobileCheckDiv').hide();
                            } else {
                                alert('绑定手机号失败！');
                            }
                            $this.attr('locked', false).find('span').html(
                                '确认');
                        }
                    });
                });

        },

        // 弹出登陆层
        openLoginPop : function(callback) {
            var callback = callback ? callback : '';
            var refreshTopWin = callback ? false : true;
            YouGou.Biz.loginPop({
                title : '您尚未登录',
                lock : true,
                closable : true,
                closeWin : true,
                refreshTopWin : refreshTopWin,
                callback : callback
            });
        },
        // 商品收藏

        addfavorite : function(cId, psize, srcElementDom) {
            var res = false;
            $.ajax({
                type : "POST",
                async : false,
                url: '/api/addCommodityFavorite.jhtml',
                data: {"id":cId,"productSize":psize},
                dataType : "json",
                success : function(data) {
                    var flag = parseInt(data.flag);
                    var strMsg = flag == 1 ? '您已经收藏过该商品' : '成功移至收藏夹';
                    ygOrder.ui.showTip(strMsg, srcElementDom);
                    if (flag == 1) {
                        res = true;
                    } else {
                        res = false;
                    }
                }
            });
            return res;
        },
        /*
         * addfavorite:function(cId,srcElementDom){ var res = false; $.ajax({
         * type: "POST", url: '/api/addCommodityFavorite.jhtml?id='+cId,
         * async:false, dataType:"json", success: function(data){ var flag =
         * parseInt(data.flag); var strMsg = flag==1?'您已经收藏过该商品':'成功移至收藏夹';
         * ygOrder.ui.showTip(strMsg,srcElementDom); if(flag==1){ res = true; }
         * else{ res = false; } } }); return res; },
         */
        // 记录当前发票信息
        saveInvc : function() {
            invInfo = {
                isChecked : $('#invc').attr('checked'),
                invcTt : $('input[name=invcTt]:checked').val(),
                unitName : $('input[name=unitName]').val()
            };
        },
        // 刷总价--step2
        calculateCart : function(callback) {
            // 记录当前发票信息
            ygOrder.base.saveInvc();
            var p = eInvoiceParam();
            $('#orderSettlementContainer').load(
                cartActionBasePath + 'refreshShoppingCart.sc',
                ygOrder.base.composeQueryCondition() + p + '&r='
                + Math.random(),
                function() {
                    if ($('.jsShopCartErr').length > 0) {
                        $('body').scrollTop(
                            $('.jsShopCartErr').offset().top);
                    }
                    ;
                    // 初始化优惠券和发票
                    ygOrder.module.coupon();
                    ygOrder.module.invcBox();
                });

        },
        // 重组请求参数(支付方式和物流方式)
        composeQueryCondition : function() {
            var params = "";
            var paymentRadio = $('input:radio[name="payment"]:checked').val();
            var _QueryConditiontradeCurrency = $('#tradeCurrency').val();
            var linkBuy = $('#linkBuy').val();
            if (!YouGou.Util.isEmpty(paymentRadio)) {
                params += "payment=" + paymentRadio;
                params += "&tradeCurrency=" + _QueryConditiontradeCurrency;
                if (linkBuy) {
                    params += "&linkBuy=" + linkBuy;
                }
            }
            return params;
        },
        isSupportCashOnDeliveryCallback : function(data) {
            // 重新评估配送方式，是否支持所在区域
            var lastParam = ygOrder.base.composeQueryCondition();
            if (!YouGou.Util.isNull(data)) {
                if (parseInt(data) == 0) {
                    // 支持货到付款
                    $('#cashOnDelivery_2').hide();
                    $('#cashOnDelivery_1').show();
                    // $('#payment_2').attr("disabled","");
                } else {
                    // 设置不支持货到付款
                    $('#cashOnDelivery_1').hide();
                    $('#cashOnDelivery_2').show();
                    $('#payment_1').attr("checked", true);
                    // $('#payment_3').attr("disabled","disabled");
                    var iDate = parseInt(data);
                    if (iDate) {
                        // 显示指定提示
                        $('.noArriveTips>div').hide();
                        $('#noSupportCODMsg_' + iDate).show();
                    }
                }

            }
            // 此处暂时屏蔽，如要开启在线支付打折活动，则需去掉屏蔽
            var currentParam = ygOrder.base.composeQueryCondition();
            if (lastParam != currentParam) {
                // 刷新step2总价
                ygOrder.base.calculateCart();
            }
        },
        // 检查是否支持货到付款
        isSupportCashOnDelivery : function(areaNo) {
            if (YouGou.Util.isEmpty(areaNo)) {
                return;
            }
            $.post(
                basePath + "/order/isSupportCashOnDelivery.sc",
                {
                    "receivingDistrict" : areaNo,
                    "linkBuy":$("#linkBuy").val()
                },
                function(data) {
                    ygOrder.base.isSupportCashOnDeliveryCallback(data.isSupportCashOnDeliverStatus);
                    // 设置是否可开发票
                    if (data.invcTtStatus == 1) {
                        $('#invcBox').show();
                        isShowInvcBox = true;
                    } else {
                        $('#invcBox').hide();
                        $('#invc').attr('checked', false);
                        isShowInvcBox = false;
                    }
                }, 'json');
        }
    },
    module : {
        // 优惠券礼品卡
        coupon : function() {
            var myCouponList = null, mygiftcardList = null;
            // 打开优惠券|礼品卡选择器
            function openCouponSelector(isForce) {
                // 打开选择器前先关闭
                $(".coupon_list").hide();
                $('#couponarea dl dd').css({zIndex: 0});
                var $parent = $(this).parents('dd:first'), dContainerId = $parent
                    .children('.coupon_list')[0].id, dataList, nCouponType;
                var $inp = $(".sinput", $parent).removeClass("Gray");
                if ($inp[0].id == 'couponNumber') {
                    dataList = myCouponList;
                    nCouponType = 1;
                } else {
                    dataList = mygiftcardList;
                    nCouponType = 5;
                }
                $('#' + dContainerId).parents('dd:first').css('z-index', 9);
                // 数据为空则ajax获取，否则直接渲染显示
                if (dataList == null || dataList.length == 0) {
                    // 等待
                    wait(dContainerId);
                    // var param+'&tradeCurrency='+$("#tradeCurrency").val();
                    var str = "&tradeCurrency=" + $("#tradeCurrency").val()
                        +"&linkBuy="+$("#linkBuy").val();
                    var url = basePath
                        + '/shoppingcart/queryUserAvailableCoupon.sc?couponType='
                        + nCouponType + str + '&t=' + Math.random();

                    $.getJSON(url,
                        function(data) {
                            dataList = data;
                            nCouponType == 1 ? myCouponList = data
                                : mygiftcardList = data;
                            renderCouponSelector(data, isForce, '#'
                                + dContainerId);
                        });
                } else {
                    renderCouponSelector(dataList, isForce, '#' + dContainerId);
                }
            }
            // 渲染优惠券|礼品卡选择器
            function renderCouponSelector(couponList, isForce, selector) {
                var str = selector == '#coupon_list' ? '优惠券' : '礼品卡';
                var couponListHtml = [];
                if (couponList == null || couponList.length == 0) {
                    couponListHtml.push('<div class="nocoupon">抱歉，您当前账户中没有可用的');
                    couponListHtml.push(str);
                    couponListHtml.push('，如果有线下');
                    couponListHtml.push(str);
                    couponListHtml.push('请输入。</div>');
                } else {
                    couponListHtml
                        .push('<div style="height:185px;overflow:auto;"><table border="0" cellpadding="0" cellspacing="0"><tbody>');
                    for (var i = 0; i < couponList.length; i++) {
                        var couponVo = couponList[i];
                        var strSiteNo = '';
                        switch (couponVo.siteNo) {
                            case 'yg':
                                strSiteNo = '时尚商城';
                                break;
                            case 'ol':
                                strSiteNo = '特卖商城';
                                break;
                            default:
                                strSiteNo = '全站';
                                break;
                        }
                        couponListHtml.push('<tr coupsign="'
                            + couponVo.couponNumberSign + '">');
                        couponListHtml
                            .push('<td width="25"><input type="radio" name="ncoupon_id" /></td>');
                        couponListHtml.push('<td width="118">'
                            + couponVo.couponNumber + '</td>');
                        //couponListHtml.push('<td width="80">' + strSiteNo
                        //		+ '</td>');
                        couponListHtml.push('<td width="90">&yen;'
                            + couponVo.parValue + '</td>');
                        couponListHtml.push('<td width="80">&yen;'
                            + couponVo.lowestPay + '</td>');
                        couponListHtml.push('<td width="149" class="Song">'
                            + couponVo.useStartTime.substring(0, 10));
                        couponListHtml.push(' 至 '
                            + couponVo.useEndTime.substring(0, 10)
                            + '</td></tr>');
                    }
                    couponListHtml.push('</tbody></table></div>');
                }
                // 渲染优惠券列表
                if ((couponList != null && couponList.length > 0) || isForce) {
                    // $("#coupon_list").html(couponListHtml.join('')).show();
                    $(selector).show().find('.nocoupon').replaceWith(
                        couponListHtml.join(''))
                }
                // 鼠标移上行高亮效果
                $("tr", selector).click(selectMarketingCoupon);

            }
            // 选择优惠券|礼品卡
            function selectMarketingCoupon() {
                var $this = $(this);
                $this.addClass("f_yellow cursor").find('input').attr("checked",
                    true);

                if ($this.parents('.coupon_list:first')[0].id == 'coupon_list') {
                    // 使用优惠券
                    bindMarketingCoupon($this.attr('coupsign'), 1);
                } else {
                    // 使用礼品卡
                    bindMarketingCoupon($this.attr('coupsign'), 5);
                }
            }

            // 输入优惠券|礼品卡编号 使用简单验证
            function useMarketingCoupon() {
                var str = '优惠券', nType = 1;
                if (this.id == 'usegiftcardBtn') {
                    str = '礼品卡';
                    nType = 5;
                }
                var $parent = $(this).parent(), $inp = $parent
                    .find('input:first');
                $parent.find('.coupon_list').hide();
                var couponNumber = $.trim($inp.val());
                if (couponNumber.length == 0) {
                    $inp.val('');
                    $parent.children('span:first').text('请输入' + str + '编码！');
                    $parent.children('.jsCancelCoup').show();
                    return false;
                }
                var couponNumberSign = hex_md5(couponNumber.toUpperCase());
                bindMarketingCoupon(couponNumberSign, nType);
            }

            // 确定使用优惠券||礼品卡
            function bindMarketingCoupon(couponNumberSign, couponType) {
                // 记录当前发票信息
                ygOrder.base.saveInvc();
                var couponType = couponType ? couponType : 1;
                $.ajax({
                    type : "POST",
                    url : basePath
                    + "/shoppingcart/bindMarketingCoupon.sc?t="+Math.random,
                    data : {
                        "couponNumberSign" : couponNumberSign,
                        "couponType" : couponType,
                        "tradeCurrency" : $("#tradeCurrency").val(),
                        "linkBuy":$("#linkBuy").val()
                    },
                    error : function(XmlHttpRequest, textStatus,
                                     errorThrown) {
                        if (couponType == 1) {
                            $("#useCouponBtn").show();
                        } else {
                            $("#usegiftcardBtn").show();
                        }
                        alert("暂时无法处理，请联系客服");
                    },
                    success : function(data) {
                        var result = eval("(" + data + ")");
                        if (result.key == "0") {
                            // 更新购物车
                            var param = "targetUrl=yitianmall/shoppingmgt_new/shoppingCartList";
                            // 此处不需要判断类型，因为在ygOrder.base.composeQueryCondition里已经加上了&tradeCurrency=xxx的参数
                            // param=param+'&tradeCurrency='+$("#tradeCurrency").val();
                            var p = eInvoiceParam();
                            $('#orderSettlementContainer')
                                .load(cartActionBasePath
                                + 'refreshShoppingCart.sc',
                                ygOrder.base.composeQueryCondition()
                                + '&'
                                + param
                                + p
                                + '&r='
                                + Math.random(),
                                function() {
                                    if ($('.jsShopCartErr').length > 0) {
                                        $('body').scrollTop($('.jsShopCartErr').offset().top);
                                    }
                                    ;
                                    initCoupon();
                                    ygOrder.module.invcBox();
                                });
                            // $('#'+cartContainer).load(cartActionBasePath+'refershShoppingCartContainer.sc',param+'&r='+Math.random(),initShopcart);
                        } else {
                            $('#coupon_list').hide().find('input')
                                .attr("checked", false);
                            if (couponType == 1) {
                                $("#useCouponBtn").show();
                                $("#cancelUseCouponBtn").show();
                                $("#couponNumberTips").html(
                                    result.value).show();
                                $(".qr_1").hover(function(){
                                    $(this).parents("dd").css({zIndex:10});
                                    var erweima_html = '<div class="erweima_html"><img src="http://s1.ygimg.cn/template/common/images/qrcode.png?3.3.5" width="136" height="136"</div>';
                                    $(this).append(erweima_html);
                                },function(){
                                    $(this).find("div.erweima_html").remove();
                                });
                                $('.jsEffectRange').click(
                                    showCouponEffectCommodityRange); // 显示优惠券使用范围
                            } else {
                                $("#usegiftcardBtn").show();
                                $("#cancelUsegiftcardBtn").show();
                                $("#giftcardNumberTips").html(
                                    result.value).show();
                                $(".qr_5").hover(function(){
                                    var erweima_html = '<div class="erweima_html"><img src="http://s1.ygimg.cn/template/common/images/qrcode.png?3.3.5" width="136" height="136"</div>';
                                    $(this).append(erweima_html); },function(){ 	$(this).find("div").remove();
                                });
                            }

                        }
                    }
                });
            }
            // 取消使用优惠券|礼品卡
            function cancelUseMarketingCoupon() {
                // 记录当前发票信息
                ygOrder.base.saveInvc();
                var param = this.id == 'cancelUseCouponBtn' ? 'couponType=1'
                    : 'couponType=5';
                param += eInvoiceParam();
                // ygOrder.base.composeQueryCondition()已经加上了参数&tradeCurrency=xxx;
                // param=param+'&tradeCurrency='+$("#tradeCurrency").val();
                // 刷新购物车
                // $('#'+cartContainer).load(cartActionBasePath +
                // 'unbindMarketingCoupon.sc?'+param+'&r='+Math.random(),initShopcart);
                $('#orderSettlementContainer').load(
                    cartActionBasePath + 'unbindMarketingCoupon.sc',
                    ygOrder.base.composeQueryCondition() + '&' + param
                    + '&r=' + Math.random(),
                    function() {
                        if ($('.jsShopCartErr').length > 0) {
                            $('body').scrollTop(
                                $('.jsShopCartErr').offset().top);
                        }
                        ;
                        initCoupon();
                        ygOrder.module.invcBox();
                    });
            }
            // 优惠券列表在取出数据之前先转圈等待
            function wait(container) {
                var couponListHtml = [];
                var strType = container == 'giftcard_list' ? '礼品卡' : '优惠券';
                couponListHtml.push('<dl style="width:552px">');
                couponListHtml
                    .push('<dd style="width:25px">&nbsp;</dd><dd style="width:118px">');
                couponListHtml.push(strType);
                couponListHtml
                    .push('编号</dd><dd style="width:90px">')
                couponListHtml.push(strType);
                couponListHtml
                    .push('面额</dd><dd style="width:80px">最低消费金额</dd><dd style="width:149px">有效期</dd><a class="couponlist_close"></a></dl><div class="nocoupon"><img src="/images/loading.gif" />正在查询可用');
                couponListHtml.push(strType);
                couponListHtml.push('，请稍等...</div>');
                // 延迟加载
                $("#" + container).html(couponListHtml.join('')).show();
            }
            // 显示优惠券作用商品范围(手输特定范围优惠券时，提示该商品仅限xx使用，这是XX触发的)
            function showCouponEffectCommodityRange() {
                var couponSchemeId = $(this).attr('couponSchemeId');
                $.ajax({
                    type : "POST",
                    async : false,
                    url : "/my/getCouponScheme.jhtml?r=" + Math.random()
                    + "&couponSchemeId=" + couponSchemeId,
                    success : function(result) {
                        var json = eval("(" + result + ")");
                        var contentHtml = '';

                        var useScopeStatement = json.useScopeStatement;
                        if (!useScopeStatement || useScopeStatement == '') {
                            contentHtml = "暂无信息";
                        } else {
                            contentHtml += '<span style="width:300px;">·'
                                + useScopeStatement + '</span>';
                            contentHtml += '</div><p class="blank10"></p>';
                        }
                        ygDialog({
                            title : "使用范围",
                            width : 650,
                            content : contentHtml
                        });
                    }
                });
            }
            // 初始化
            function initCoupon() {
                // 页面刷新后，将可用优惠券置空
                myCouponList = null, mygiftcardList = null;
                var dom = $('#couponarea');
                $('.sinput', dom).focus(openCouponSelector); // 打开优|礼选择层
                $('.coupon_btn', dom).click(openCouponSelector); // 打开优|礼选择层
                $('.jsUseCoup').click(useMarketingCoupon); // "确认"使用优惠券|礼品卡
                $('.jsCancelCoup').click(cancelUseMarketingCoupon); // “取消”使用优惠券|礼品卡
                $('.jsEffectRange').click(showCouponEffectCommodityRange);
                // 关闭选择层
                $('.coupon_list').click(function(e) {
                    var target = e.target;
                    // 礼品卡选择器关闭按钮事件
                    if ($(target).hasClass('couponlist_close')) {
                        $(this).hide().siblings('.sinput').addClass("Gray");
                        return false;
                    }
                    ;
                });
            }
            initCoupon();
        },
        // 购物车及
        shopcart : function(dModule) {
            // console.log(dModule);
            // 由于结算页有两个购物车，因此要区分
            var shopcartId = $(dModule).attr('id');
            // console.log(shopcartId);

            // 删除购物车货品
            // sid代表调用removeProduct的时候，是哪个购物车调的
            function removeProduct(id, isTip, productNo, sid, isFromAddFavorite) {
                if(isTip){
                    if (id.indexOf(",")>=0) {
                        if(!confirm("确认要删除已选择商品吗？")){
                            return;
                        }
                    } else {
                        if(!confirm("您确定要将此商品删除吗？")){
                            return;
                        }
                    }
                }
                var pFromAddFav = "";
                if (isFromAddFavorite) {
                    pFromAddFav += "&isFromAddFavorite=1"
                }
                // $('#'+cartContainer).load(cartActionBasePath +
                // "removeProduct.sc?id=" +
                // id+'&productNo='+productNo+"&r="+Math.random(),initShopcart)
                $/* ('#'+shopcartId) */.get(cartActionBasePath
                    + "removeProduct.sc?id=" + id + '&productNo='
                    + productNo + pFromAddFav + "&r=" + Math.random(),
                    function(tempdata) {
                        // console.log(tempdata);
                        if (tempdata === "") {
                            // $('#'+shopcartId).html(tempdata);
                            $("#" + sid).html(tempdata);
                        } else {
                            var cny = $("#shoppingCartContainerCNY");
                            var hkd = $("#shoppingCartContainerHKD");
                            var krw = $("#shoppingCartContainerKRW");
                            var krw_zf = $("#shoppingCartContainerKRW_ZF");
                            var cny_null_cart = $("#shoppingCartContainerCNY").find('.cart_null_div');
                            var hkd_null_cart = $("#shoppingCartContainerHKD").find('.cart_null_div');
                            var krw_null_cart = $("#shoppingCartContainerKRW").find('.cart_null_div');
                            var krw_zf_null_cart = $("#shoppingCartContainerKRW_ZF").find('.cart_null_div');
                            var tempdata_null_cart = tempdata.indexOf('cart_null_div');
                            if (tempdata_null_cart === -1) {
                                // $('#'+shopcartId).html(tempdata);
                                $("#" + sid).html(tempdata);
                            } else {
                                if (sid === "shoppingCartContainerHKD") {
                                    if (cny_null_cart.length === 0) {
                                        hkd.html("");
                                        if (cny.html() == "" && krw.html() == "" && krw_zf.html() == "") {
                                            cny.html(tempdata);
                                        }
                                    }
                                }

                                if (sid === "shoppingCartContainerKRW") {
                                    if (cny_null_cart.length === 0) {
                                        krw.html("");
                                        if (cny.html() == "" && hkd.html() == "" && krw_zf.html() == "") {
                                            cny.html(tempdata);
                                        }
                                    }
                                }

                                if (sid === "shoppingCartContainerKRW_ZF") {
                                    if (cny_null_cart.length === 0) {
                                        krw_zf.html("");
                                        if (cny.html() == "" && hkd.html() == "" && krw.html() == "") {
                                            cny.html(tempdata);
                                        }
                                    }
                                }

                                if (sid === "shoppingCartContainerCNY") {
                                    if (hkd.html() === "" && krw.html() === "" && krw_zf.html() == "") {
                                        cny.html(tempdata);
                                    } else {
                                        cny.html("");
                                    }
                                }
                            }

                        }
                        initShopcart();
                    });

            }
            // 增加或减少货品数量
            // sid表示代表当前在哪个购物车调用
            function changeProductNum(type, index, sid) {
                // var productNo = $("#productNo_"+index).val(),name =
                // "oldNum_"+productNo,sumProductNum=0;
                var productNo = $("#" + sid + " #productNo_" + index).val(), name = "oldNum_"
                    + productNo, sumProductNum = 0;
                // 此货品总数量
                // $('input[name='+name+']').each(function(){
                $("#" + sid + ' input[name=' + name + ']').each(
                    function() {
                        sumProductNum = parseInt(sumProductNum)
                            + parseInt(this.value);
                    });

                // var id = $("#productId_"+index).val();
                var id = $("#" + sid + " #productId_" + index).val();

                if (sumProductNum == 1 && type == "-") {
                    if (!removeProduct(id, true, productNo, sid)) {
                        $("#" + sid + " #selectNum_" + index).val(1);
                        $("#" + sid + " #oldNum_" + index).val(1);
                    }
                    return;
                }
                // 此行商品数量
                // var oldNum = parseInt($("#oldNum_"+index).val());
                var oldNum = parseInt($("#" + sid + " #oldNum_" + index).val());
                var newNum = type == "+" ? oldNum + 1 : oldNum - 1;
                // $("#oldNum_"+index).val(newNum);
                $("#" + sid + " #oldNum_" + index).val(newNum);

                updateCart(newNum, id, productNo, sid);
            }

            function updateCart(newNum, id, productNo, sid) {
                var param = "productNum=" + newNum + "&id=" + id
                    + ygOrder.base.composeQueryCondition() + '&productNo='
                    + productNo;
                $("#" + sid + ' #totalSpan').html(
                    '<img src="/images/loading.gif" />');
                $('#' + sid).load(
                    cartActionBasePath + "u_updateCart.sc?" + param + "&r="
                    + Math.random(), initShopcart);
            }

            // 会员尊享价
            function membersEnjoyPrice() {
                var acceptStatus = $(this).attr('checked') ? 1 : 2;
                var param = 'id=' + this.id.replace('memberCommodity_', '')
                    + '&productNo=' + $(this).attr('prono')
                    + '&acceptStatus=' + acceptStatus;
                var sid = getCartContainerId(this);
                // 刷新购物车
                // $('#'+cartContainer).load(cartActionBasePath +
                // 'checkMembercommodity.sc?'+param+'&r='+Math.random(),initShopcart);
                $('#' + sid).load(
                    cartActionBasePath + 'checkMembercommodity.sc?' + param
                    + '&r=' + Math.random(), initShopcart);
            }
            // 去结算
            function submitShopcart(target) {
                // console.log(target);
                // 判断状态
                // if($('.jsShopCartErr').length>0){
                if ($("#" + target + ' .jsShopCartErr').length > 0) {
                    alert('请检查您所购买的商品中可能存在已下架、已售罄，或者库存不足的情况！');
                    // $('body').scrollTop($('.jsShopCartErr').offset().top);
                    $('body').scrollTop(
                        $("#" + target + ' .jsShopCartErr').offset().top);
                    return false;
                };
                // 验证购物车中是否有非法货品
                var warnMsgLength = 0;
                var warnMsg = $('#' + target + ' div[name=num_warntips]');
                $('#' + target + ' div[name=num_warntips]').each(function(index){
                    //处理未选中选中
                    var dftchkbox = $($(this).parent().siblings(".col_chkbox")[0]).find("input[type='checkbox']");
                    if($(dftchkbox).attr('checked')==true)
                    {
                        warnMsgLength++;
                    }
                });

                if (warnMsgLength > 0) {
                    // 页面移动到货品栏异常提示信息处
                    $('html,body').animate({
                        scrollTop : warnMsg.offset().top - 200
                    }, 2000);
                    warnMsg.show();
                    alert("请您检查购物车商品!");
                    return false;
                }
                if ($('#isLock').val() == 'true') {
                    // 改账号已被锁定
                    $("#userLock").css({
                        'display' : 'inline-block'
                    });
                    alert("抱歉，您的账号已被锁定!");
                    return false;
                }
                var orderNum = $('#orderNum').val();
                var limitOrderNum = $('#limitOrderNum').val();
                if (orderNum != ''
                    && parseInt(orderNum) >= parseInt(limitOrderNum)
                    && 0 != parseInt(limitOrderNum)) {
                    alert("抱歉，每个会员每天最多下" + limitOrderNum + "单!");
                    return false;
                }
                var addProductNum = $('#addProductNum').val();
                var limitCartAddProductMaxNum = $('#limitCartAddProductMaxNum')
                    .val();

                if (addProductNum != ''
                    && parseInt(addProductNum) > parseInt(limitCartAddProductMaxNum)
                    && 0 != parseInt(limitCartAddProductMaxNum)) {
                    alert("购物车最多存放" + limitCartAddProductMaxNum + "件商品，请编辑购物车!");
                    return false;
                }
                var orderCommNum = $("#" + target + ' #orderCommNum').val();
                var limitOrderCommBuyMaxNum = $('#limitOrderCommBuyMaxNum')
                    .val();
                if (orderCommNum != ''
                    && parseInt(orderCommNum) > parseInt(limitOrderCommBuyMaxNum)
                    && 0 != parseInt(limitOrderCommBuyMaxNum)) {
                    alert("抱歉，每个订单内商品数量不能超过" + limitOrderCommBuyMaxNum
                        + "个，请删除部分商品后提交!");
                    return false;
                }
                //最小成单额验证提示
                var orderAmountLimit = $('#' + target + ' #orderAmountLimit').val();
                var lackOrderAmount = $('#' + target + ' #lackOrderAmount').val();
                if (orderAmountLimit != '' && parseInt(orderAmountLimit) > 0
                    && lackOrderAmount != ''
                    && parseInt(lackOrderAmount) > 0) {
                    alert("网站最低成单金额为" + orderAmountLimit + "元，您还需要购买"
                        + lackOrderAmount + "元商品，请继续选购");
                    return false;
                }
                //最大成单额验证提示
                var orderAmountMaxLimit = $('#' + target + ' #orderAmountMaxLimit').val();
                if (orderAmountMaxLimit != '' && parseInt(orderAmountMaxLimit) > 0) {
                    alert("根据海关规定，单次限额为" + orderAmountMaxLimit + "元，请分多次提交");
                    return false;
                }
                return true;
            }

            function bindCheckLabelOnClick(tradeCurrency) {
                var $chkAllLabel=$('label[name='+tradeCurrency+'checkAllLabel]').unbind("click");
                $chkAllLabel.attr("tradeCurrency",tradeCurrency);
                $chkAllLabel.bind("click",function(e){
                    if(e.target.type=="checkbox"){
                        var chkAllBox = $(this).find("input[type='checkbox']");
                        ygChkboxRefh.call(this,chkAllBox);
                        var url="/shoppingcart/checkBuyCommodity.sc?";
                        var checked,rowId;
                        if($(chkAllBox).attr('checked')==true)
                        {
                            checked=1;
                        }else{
                            checked=0;
                        }
                        var tradeCurrency=$(this).attr("tradeCurrency");
                        $('#shoppingCartContainer'+tradeCurrency+' .col_chkbox .ygChkbox').each(function(index,value){
                            //处理未选中选中
                            var dftchkbox = $(this).find("input[type='checkbox']");
                            if($(dftchkbox).attr('checked')!=true && $(dftchkbox).attr("disabled")!=true)
                            {
                                $(dftchkbox).attr('checked',true);
                            }
                            ygChkboxRefh.call(this,dftchkbox);

                            //拼接产品id
                            if(index==0)
                            {
                                rowId=$(dftchkbox).val();
                            }else
                            {
                                rowId+=";"+$(dftchkbox).val();
                            }
                        });
                        url+="checked="+checked+"&rowId="+rowId+"&tradeCurrency="+tradeCurrency;
                        url=YouGou.Util.setUrlStamp(url);
                        $.get(url,function(data){
                            if(data)
                            {
                                $('#shoppingCartContainer'+tradeCurrency).html(data);
                                initShopcart();
                            }else
                            {
                                alert("操作失败");
                            }

                        },"html");
                    }
                });
            }

            function getCartContainerId(obj) {
                var p_cny = $(obj).parentsUntil("body","#shoppingCartContainerCNY");
                var p_hkd = $(obj).parentsUntil("body","#shoppingCartContainerHKD");
                var p_krw = $(obj).parentsUntil("body","#shoppingCartContainerKRW");
                var p_krw_zf = $(obj).parentsUntil("body","#shoppingCartContainerKRW_ZF");
                var sid;
                if (p_cny.length != 0) {
                    sid = p_cny.attr('id');
                } else if (p_hkd.length != 0) {
                    sid = p_hkd.attr('id');
                } else if (p_krw.length != 0) {
                    sid = p_krw.attr('id');
                } else if (p_krw_zf.length != 0) {
                    sid = p_krw_zf.attr('id');
                }
                return sid;
            }

            // 初始化
            function initShopcart() {

                //处理有售罄和库存不足时的全选状态
                $(".cart_list_tb").each(function(){
                    var thCheck=$(this).find("thead tr th .ygChkbox i");
                    var thEndCheck=$(this).siblings(".shpcrt_operations").find(".ygChkbox i");
                    var thCheckBox=$(this).find("thead tr th .ygChkbox input[type='checkbox']");
                    var thEndCheckBox=$(this).siblings(".shpcrt_operations").find(".ygChkbox input[type='checkbox']");
                    var selector="tbody tr dd .ygChkbox i:not(.disabled)";
                    var checkSelector=selector+".checked";
                    var isAllChecked=$(this).find(selector).size()==$(this).find(checkSelector).size();
                    if (isAllChecked) {
                        thCheck.addClass("checked");
                        thEndCheck.addClass("checked");
                        thCheckBox.attr("checked","checked");
                        thEndCheckBox.attr("checked","checked");
                    } else {
                        thCheck.removeClass("checked");
                        thEndCheck.removeClass("checked");
                        thCheckBox.removeAttrs("checked");
                        thEndCheckBox.removeAttrs("checked");
                    }
                    var checkAllbtn=$(this).find("thead tr th .ygChkbox input[type='checkbox']");
                    isAllChecked?checkAllbtn.attr("checked","checked"):checkAllbtn.removeAttrs("checked");
                });
                //处理购物车全选
                bindCheckLabelOnClick('CNY');
                bindCheckLabelOnClick('HKD');
                bindCheckLabelOnClick('KRW');
                bindCheckLabelOnClick('KRW_ZF');

                //处理购物车多选
                $('.col_chkbox .ygChkbox').unbind('click');
                $('.col_chkbox .ygChkbox').bind('click',function(e){
                    if(e.target.type=="checkbox"){
                        var dftchkbox = $(this).find("input[type='checkbox']");
                        ygChkboxRefh.call(this,dftchkbox);

                        var url="/shoppingcart/checkBuyCommodity.sc?";
                        var checked,rowId,tradeCurrency;
                        if($(dftchkbox).attr('checked')==true){
                            checked=1;
                        }else{
                            checked=0;
                        }

                        //购物车中每一项选择
                        rowId=$(dftchkbox).val();
                        if ($(dftchkbox).attr("name")=="CNYcheck") {
                            tradeCurrency = "CNY";
                        } else if ($(dftchkbox).attr("name")=="HKDcheck") {
                            tradeCurrency = "HKD";
                        } else if ($(dftchkbox).attr("name")=="KRWcheck") {
                            tradeCurrency = "KRW";
                        } else if ($(dftchkbox).attr("name")=="KRW_ZFcheck") {
                            tradeCurrency = "KRW_ZF";
                        }
                        url+="checked="+checked+"&rowId="+rowId+"&tradeCurrency="+tradeCurrency;
                        url=YouGou.Util.setUrlStamp(url);
                        $.get(url,function(data){
                            if(data){
                                $('#shoppingCartContainer'+tradeCurrency).html(data);
                                initShopcart();
                            }else{
                                alert("操作失败");
                            }

                        },"html");
                    }
                });

                //处理多次请求问题
                $('.JsFavorite').unbind("click");
                $('.JsFavorite').click(function(){
                    var pid = $(this).attr('pid');
                    var spid,prono,psize;

                    var sid = getCartContainerId(this);

                    if(pid == 'all'){
                        var arrPid = [];
                        var arrPsize = [];
                        var arrSPid = [];
                        $('#'+sid+' .col_chkbox .ygChkbox').find("input[type='checkbox']:checked").each(function(){
                            arrPid.push($(this).attr('pid'));
                            arrPsize.push($(this).attr('psize'));
                            arrSPid.push($(this).val());
                            if (!prono) {
                                prono = $(this).attr('prono');
                            }
                        });
                        if(arrPid.length==0){
                            alert('请选择要收藏的商品');
                            return;
                        }
                        pid=arrPid.join(',');
                        spid=arrSPid.join(',');
                        psize=arrPsize.join(',');
                    } else {
                        prono = $(this).attr('prono');
                        spid = $(this).attr('spid');
                        psize = $(this).attr('psize');
                    }
                    var is_favorite = ygOrder.base.addfavorite(pid,psize,this);
                    if(!is_favorite){
                        removeProduct(spid,false,prono,sid,true);
                    }
                    /*ygOrder.base.addfavorite(pid,psize,this);
                     removeProduct(spid,false,prono,sid); */
                    return false;
                });

                //处理多次点击问题
                //$('#'+shopcartId+' .JsRemoveGood')
                $('.JsRemoveGood').unbind("click");
                $('.JsRemoveGood').bind('click',function(){
                    //console.log($(this).parentsUntil("body","#shoppingCartContainerCNY"));
                    var pid = $(this).attr('pid');
                    var prono;
                    var sid = getCartContainerId(this);
                    if(pid == 'all'){
                        var arrPid = [];
                        $('#'+sid+' .col_chkbox .ygChkbox').find("input[type='checkbox']:checked").each(function(){
                            arrPid.push($(this).val());
                            if (!prono) {
                                prono = $(this).attr('prono');
                            }
                        });
                        if(arrPid.length==0){
                            alert('请选择要删除的商品');
                            return;
                        }
                        pid=arrPid.join(',');
                    } else {
                        prono =  $(this).attr('prono');
                    }

                    removeProduct(pid,true,prono,sid);

                    return false;
                });


                // 清空购物车,由于初始化被调用两次，所以会被绑定两次，现在
                $('.clearShopcart').unbind("click");
                $('.clearShopcart').bind('click',
                    function(e) {
                        e.stopPropagation();
                        if (!confirm("您确定要清空购物车吗？")) {
                            return;
                        }
                        // $('#'+cartContainer).load(cartActionBasePath +
                        // "clearShoppingCart.sc?r="+Math.random(),initShopcart)
                        // 两个购物车后应该同时清除两个购物车
                        var tradeCurrency = $(this).attr("tradeCurrency");
                        $('#shoppingCartContainer'+tradeCurrency).load(
                            cartActionBasePath
                            + "clearShoppingCart.sc?r="
                            + Math.random()
                            + "&tradeCurrency="
                            + tradeCurrency);
                    });
                // 数量输入框输入数字
                var goodsTxtKeyUpFlag;  //全局变量用于标识是否延时执行keyup事件
                $('.goodsTxt').unbind("keyup");
                $('.goodsTxt').bind('keyup',function() {
                    var sid = getCartContainerId(this);
                    var $this = $(this);
                    var index = $this.attr('proindex');
                    // 此行商品数量
                    var oldNum = parseInt($("#" + sid + " #oldNum_" + index).val());
                    var productNo = $("#" + sid + " #productNo_" + index).val();
                    var selectNum = $.trim($("#" + sid + " #selectNum_" + index).val());
                    var id = $("#" + sid + " #productId_" + index).val();
                    var numberRule = /(^\d*$)/; // 全为数字
                    if (selectNum && selectNum.match(numberRule)) {
                        selectNum = parseInt(selectNum);
                        if (selectNum == 0) {
                            if (!removeProduct(id, true,productNo, sid)) {
                                $("#" + sid + " #selectNum_" + index).val(1);
                                $("#" + sid + " #oldNum_"+ index).val(1);
                            }
                            return;
                        }
                    } else {
                        selectNum = oldNum;
                    }
                    $("#" + sid + " #oldNum_" + index).val(selectNum);
                    $("#" + sid + " #selectNum_" + index).val(selectNum);
                    if (oldNum != selectNum) {
                        clearTimeout(goodsTxtKeyUpFlag);
                        goodsTxtKeyUpFlag = setTimeout(function(){
                            updateCart(selectNum, id, productNo, sid);
                        }, 300);
                    }
                });

                // 减
                // $('.goodsSub').click(function(){
                // 处理多次点击问题
                $('.goodsSub').unbind("click");
                $('.goodsSub').bind(
                    'click',
                    function() {
                        var $this = $(this);
                        var sid = getCartContainerId(this);
                        changeProductNum('-', $this.attr('proindex'), sid);
                    });
                // 加
                // $('.goodsPlus').click(function(){
                // 处理多次点击问题
                $('.goodsPlus').unbind("click");
                $('.goodsPlus').bind('click',
                    function() {
                        var $this = $(this);
                        var sid = getCartContainerId(this);
                        changeProductNum('+', $this.attr('proindex'), sid);
                    });
                // 隐藏错误提示
                $(".num_warntips").fadeIn("fast").delay(2000).mouseover(
                    function() {
                        $(this).hide();
                    });
                // 隐藏错误提示
                $(".integral_tips").fadeIn("fast").delay(2000).mouseover(
                    function() {
                        $(this).hide();
                    });
                // placeholder
                if (!supportPlaceholder) {
                    $('input[placeholder]').placeholder();
                }
                // 去结算验证
                // $('.cart_b_paybtn,.cart_s_paybtn').click(function(){
                // 处理多次点击问题
                $('.cart_b_paybtn,' + '.cart_s_paybtn').unbind("click");

                $('.cart_b_paybtn,' + '.cart_s_paybtn')
                    .bind('click',function() {
                        // 先验证购物车
                        var sid = getCartContainerId(this);

                        if (!submitShopcart(sid)) {
                            return false;
                        }

                        // 购物车通过再验证登陆状态
                        $.ajax({type : "POST",
                            async : false,
                            url : '/api/checkUserLogin.jhtml',
                            success : function(data) {
                                var _tradeCurrency = sid.substring(21);
                                if (data == "true") {
                                    // location.href=$('.cart_b_paybtn').attr('href');
                                    $.ajax({
                                        async : false,
                                        url : "/shoppingcart/checkSpCartGifts.sc?tradeCurrency="
                                        + _tradeCurrency,
                                        success : function(msg) {

                                            var _msg = eval("("+ msg+ ")");
                                            if (!$.isEmptyObject(_msg)) {
                                                var _continue_url = "/continueOrder.jhtml?tradeCurrency="
                                                    + _tradeCurrency;
                                                ygDialog({
                                                    skin : 3,
                                                    content : "<p style='padding:0 20px;'>您的购物车中尚有赠品可以领取</p><a class='uiClose spctbtnstyle' href='javascript:;'>领取</a><a href='"
                                                    + _continue_url
                                                    + "' class='sctbtnstyle'>继续结算</a>",
                                                    title : "",
                                                    width : 350
                                                })

                                            } else {
                                                location.href = $('#'+ sid+ ' .cart_b_paybtn').attr('href');
                                            }
                                        }
                                    });
                                } else {
                                    // 记录当前购物车
                                    arrUnloginShopcart = [];
                                    $('#'+ sid+ ' .shopping_cart_tr dl').each(
                                        function() {
                                            arrUnloginShopcart.push('{productno:'+ $('.JsRemoveGood',this).attr('prono')
                                                + ',num:'+ $('input[name=goodsCount]',this).val()+ '}');
                                        });
                                    arrUnloginShopcart = '[' + arrUnloginShopcart.join(',') + ']';

                                    ygOrder.base.openLoginPop('fnLoginSucCallback' + _tradeCurrency);
                                }
                            }
                        });
                        return false;
                    });
                // 购物车数量
                $('#shopcartNum').html($('#orderCommNum').val());
                // 会员尊享价
                $('.jsMemberCommodity').click(membersEnjoyPrice);
                // 初始化推荐
                initTuijian();
                // 赠品
                $(".shopping_cart_tr .giftImg").live("mousedown", function() {
                    $(this).parent().find(".giftBut").mousedown();
                });
                $(".shopping_cart_tr .giftBut")
                    .live("mousedown",
                    function() {
                        var goodsSize = 0;
                        var goodsCode = 0;
                        var goodsName = 0;
                        var goodsColor = 0;
                        var giftProductNo = "";
                        $(".giftPopupWra").hide();
                        $(this).find(".giftPopupWra").hide();
                        // $(".giftTex").removeClass("zindex999");
                        // $(this).parents(".giftTex").addClass("zindex999");
                        if (!$(this).find(".giftPopupWra").length) {
                            var mpn, mai, tc;
                            mpn = $(this).find(".lingqu").attr("mainproductno");
                            mai = $(this).find(".lingqu").attr("mainactiveid");
                            tc = $(this).find(".lingqu").attr("tradecurrency");
                            var ogi = ""
                            if ($(this).find(".lingqu").attr("oldgiftid") != null) {
                                ogi = "&oldGiftId="+ $(this).find(".lingqu").attr("oldgiftid");
                            }

                            getGiftPopupData($(this), mpn, mai, tc);

                            $(".shopping_cart_tr").find(".close")
                                .bind("click", function() {
                                    $(".giftPopupWra").hide();
                                });
                            $(".giftPopupWra .size").find("a").bind("click",
                                function() {
                                    if (!$(this).hasClass("no")) {
                                        $(".giftmsg").find("a").removeClass("select");
                                        $(this).addClass("select");
                                        goodsSize = $(this).html();
                                        goodsName = $(this).parents(".giftmsg")
                                            .find("a").html();
                                        goodsColor = $(this).parents(".giftmsg")
                                            .attr("color");
                                        giftProductNo = $(this).attr("giftproductno");
                                        $(this).parents(".giftList")
                                            .children(".option")
                                            .children("input[type=radio]")
                                            .attr("checked",true);
                                    }
                                    $(".giftPopupWra .sbmit").click();
                                });

                            $(".option")
                                .find("input[type=radio]")
                                .bind("click",
                                function() {
                                    goodsSize = 0;
                                    goodsName = 0;
                                    goodsColor = 0;
                                    $(".giftmsg")
                                        .find("a")
                                        .removeClass(
                                        "select");
                                });
                            $(".giftPopupWra .sbmit").bind("click",
                                function() {
                                    if (!goodsSize
                                        || !goodsName
                                        || !goodsColor) {
                                        alert("请选择赠品尺码");
                                        return false;
                                    }
                                    $.ajax({
                                        type : "POST",
                                        url : "/shoppingcart/addGiftProductToSpCart.sc",
                                        async : false,
                                        data : "giftProductNo="
                                        + giftProductNo
                                        + "&mainProductNo="
                                        + mpn
                                        + "&mainActiveId="
                                        + mai
                                        + "&tradeCurrency="
                                        + tc
                                        + ogi,
                                        success : function(
                                            msg) {
                                            var _msg = JSON
                                                .parse(msg)
                                            if (_msg.rs == "false") {
                                                alert(_msg.msg);
                                            } else {
                                                $(".giftPopupWra")
                                                    .hide();
                                                // $(this).parents(".giftTex").find(".giftNSC").html(goodsName.substr(0,14)+"...&nbsp;&nbsp;颜色:"+goodsColor+"&nbsp;&nbsp;尺码:"+goodsSize);
                                                // $(this).parents(".giftTex").find(".lingqu").html("重新选择");
                                            }
                                        }
                                    });
                                    var url = YouGou.Biz.ShoppingCart.cartActionBasePath
                                        + "refershShoppingCartContainer.sc?"
                                        + "&r="
                                        + Math.random()
                                        + "&tradeCurrency="
                                        + tc;
                                    $('#shoppingCartContainer'+tc).load(url,initShopcart);

                                });
                        } else {
                            $(this).parent().find(".giftPopupWra").show();
                        }
                    });
            }

            //购物车选择
            function ygChkboxRefh(obj){
                if(obj.attr("disabled") == true){
                    $(this).find(".skin").addClass("disabled");
                }else if(obj.attr("checked") == true){
                    $(this).find(".skin").addClass("checked");
                }else{
                    $(this).find(".skin").removeClass("checked");
                }
            }
            // 初始化最下面推荐
            function initTuijian() {

                var tipSpan, that, limitbuyMaxNum = 3, _bdH = $(document)
                    .height(), _bdW = $(document).width();
                // 尺码选择器start
                var popTmp = '<div id="cartSelector" class="cart_selector_pop none" ><b class="icon arr jsarr">&nbsp;</b><a href="javascript:;" class="icon close jsclose">&nbsp;</a><div class="bd" id="cartSelectorCon"><p class="loading">加载中，请稍后...</p></div></div>';
                var strHtmlTmp = '<dl class="uc_buy_item mt10"><dt class="fl">尺码</dt><dd class="fl item_c size" id="sizeDiv">\
							<%var sizeArry=size.split(",");var stockArry=stock.split(","),arrProids=proids.split(",");var arrStockNew=[],arrProidsNew=[]; for (var i=0;i<sizeArry.length;i++){%>\
													<%if(stockArry[i]>0){arrStockNew.push(stockArry[i]);arrProidsNew.push(arrProids[i]);%><a href="javascript:void(0);" data-name="<%=sizeArry[i]%>" <%var idx;var count=0; for(var j=0;j<sizeArry.length;j++){if(stockArry[j]>0){count+=1;idx=j;}if(count>1) break;} if((idx==i &&count==1) || (productSize == sizeArry[i] && count>1)){%>class="choosed" <%}%> <%if (sizeArry.length==1 &&stockArry[0]>0){%> class="choosed" <%}%>><%=sizeArry[i]%><i></i></a><%}%>\
													<%}%>\
													</dd></dl><dl class="uc_buy_item mt5"><dt class="fl">数量</dt><dd class="fl pro_num"><a href="javascript:void(0);" class="uc_ico subtract" id="numSub"></a><input name="" type="text" value="1" readonly class="buy_num" id="txtNum" /><a href="javascript:void(0);" class="uc_ico plus" id="numPlus"></a><span class="cgray ml15">本商品由<strong id="ShopName"><%=shopname%></strong>直接发货</span></dd></dl>\
								<dl class="uc_buy_item mt10"><dt class="fl">已选择</dt><dd class="fl have_choosed"><strong class="corg selColor" id="selColor"><%=colorAlt%></strong> <strong id="selSize" class="corg selSize"><%if(sizeArry.length==1 && stockArry[0]>0){%><%=size%><%}%><%if(count==1&&sizeArry.length>1){%><%=sizeArry[idx]%><%}%></strong></dd></dl><p class="addSmt mt10 clearfix"><a href="javascript:;" class="cart_sel_sumbtn" id="cartSelBtn">确定</a><strong id="cartPopTips" class="fl ml10 corg" style="margin-top:3px;"></strong><input value="<%=arrStockNew%>" type="hidden" name="txtSelStock" id="txtSelStock" /><input value="<%=arrProidsNew%>" type="hidden" name="txtSelProids" id="txtSelProids" /></p>';

                if (!$('#cartSelector')[0]) {
                    $('body').append(popTmp);
                }
                var $target = $("#cartSelector");
                // 浮层事件绑定
                function initCartSelectorPop() {
                    // 尺码点击
                    $(".item_c.size a").unbind("click");
                    $(".item_c.size a").bind(
                        "click",
                        function() {
                            $('#cartPopTips').text('');
                            $(this).addClass("choosed").siblings()
                                .removeClass("choosed");
                            $("#selSize").text($(this).attr("data-name"));
                            $("#txtNum").val(1);
                            return false;
                        });

                    // 加号点击
                    $("#numPlus").unbind("click");
                    $("#numPlus").bind(
                        "click",
                        function() {
                            var stockArray = $("#txtSelStock").val().split(',');
                            var sizeIndex = $target.find(".size a.choosed").index();
                            var numberInput = $("#txtNum");
                            if (sizeIndex < 0) {
                                tipSpan.text('请选择尺码');
                                return false;
                            }
                            var number = parseInt(numberInput.val()) + 1;
                            if (number > stockArray[sizeIndex]) {
                                number -= 1;
                                tipSpan.text('抱歉！您购买的数量超过库存量！');
                                return false;
                            }
                            if (number > limitbuyMaxNum) {
                                number = limitbuyMaxNum;
                                tipSpan.text('一次最多购买' + String(number)+ '件');
                                return false;
                            }
                            numberInput.val(number);
                            return false;
                        });

                    // 减号点击
                    // 处理多次点击问题
                    $("#numSub").unbind("click");
                    $("#numSub").bind("click", function() {
                        var numberInput = $("#txtNum");
                        var number = parseInt(numberInput.val()) - 1;
                        if (number < 1)
                            return;
                        numberInput.val(number);
                        return false;
                    });

                    // 确认按钮点击
                    // 处理多次点击问题
                    $("#cartSelBtn").unbind("click");
                    $("#cartSelBtn").bind("click",
                        function() {
                            // 购物车操作
                            var sizeIndex = $("#cartSelectorCon")
                                .find(".size a.choosed")
                                .index();
                            if (sizeIndex < 0) {
                                tipSpan.text('请选择尺码');
                                return false;
                            }
                            tipSpan.text('');
                            var number = $("#txtNum").val();
                            var proidArray = $("#txtSelProids").val().split(',');
                            var goodsNo = proidArray[sizeIndex];
                            var param = [];
                            param.push("&productNum=" + number);
                            param.push("&productNo=" + goodsNo);
                            param.push("&targetUrl=/yitianmall/shoppingmgt_new/simpleShoppingCart");
                            $.ajax({
                                type : "POST",
                                url : YouGou.Biz.ShoppingCart.cartActionBasePath + "c_addProdut.sc",
                                data : param.join(''),
                                success : function(data) {
                                    // 由于现在有两个购物车，所以要清除cart_null_div
                                    var null_cart_CNY = $('#shoppingCartContainerCNY').find(".cart_null_div");
                                    if (null_cart_CNY.length > 0) {
                                        null_cart_CNY.remove();
                                    }
                                    if (data != "") {
                                        data = eval("(" + data + ")");
                                        if (data.errorMsg) {
                                            alert(data.errorMsg);
                                            return false;
                                        }
                                        // 重新初始化购物车
                                        YouGou.Biz.ShoppingCart.showCart("1");
                                        $target.hide();
                                        // $('#'+cartContainer).load(YouGou.Biz.ShoppingCart.cartActionBasePath+"refershShoppingCartContainer.sc?"+"&r="+Math.random(),initShopcart);
                                        var url = YouGou.Biz.ShoppingCart.cartActionBasePath
                                            + "refershShoppingCartContainer.sc?"
                                            + "&r=" + Math.random()
                                            + "&tradeCurrency=" + data.tradeCurrency;
                                        $('#shoppingCartContainer'+data.tradeCurrency).load(url, initShopcart);
                                    }
                                }
                            });
                        });
                }

                function setPosition() {
                    var _t, _l, _h, _arrL, _posL, _posT, _par;
                    var $domArr;
                    $domArr = $target.find(".jsarr");
                    $domArr.removeClass("down");
                    _t = that.offset().top + 40;
                    _l = that.offset().left - 60;
                    _h = _t + $target.height();
                    _arrL = 100;
                    _posL = _l;
                    _posT = _t;
                    _par = that.closest('.cart_recpro');
                    if (_l < _par.offset().left) {
                        _posL = _l + 60;
                        _arrL = 40;
                    }
                    if (_l > _par.offset().left + _par.width() - 500) {
                        _posL = _l - 250;
                        _arrL = 345;
                    }
                    if (_h + 85 > _bdH) {
                        _posT = _t - $target.height() - 85;
                        $domArr.addClass("down");
                    }
                    $domArr.css({
                        left : _arrL
                    });
                    $target.css({
                        left : _posL,
                        top : _posT
                    });

                    if (_h - 20 <= _bdH) {
                        $target.css({
                            "top" : _posT - 20
                        });
                    } else {
                        $target.css({
                            "top" : _posT + 20
                        });
                    }
                    $target.animate({
                        "top" : _posT
                    }, 150);
                }

                // 加入购物车按钮点击
                // 处理多次点击问题
                $('.cart_addto_lnk').die("click");
                $('.cart_addto_lnk').live("click",
                    function() {
                        that = $(this);

                        /*
                         * $(window).resize(function(){
                         * setPosition(); });
                         */
                        var goodsNo = that.attr("goodsno");
                        $("#cartSelectorCon")
                            .html('<p class="loading">加载中，请稍后...</p>');
                        $target.show();
                        setPosition();

                        // ajax获取商品的颜色、尺码、库存等信息
                        $.ajax({
                            type : "POST",
                            url : "/my/getFavShopCarCommdity.jhtml?commodityNo="
                            + goodsNo,
                            async : true,
                            success : function(data) {
                                data = eval("(" + data + ")");
                                if (data != null) {
                                    stockArray = (data.stock + "").split(',');
                                    proidArray = (data.proids + "").split(',');
                                    limitbuyMaxNum = parseInt(data.limitbuyMaxNum);
                                    if (null == data.size) {
                                        data.size = "";
                                    }
                                    if (null == data.stock) {
                                        data.stock = "";
                                    }
                                    if (null == data.proids) {
                                        data.proids = "";
                                    }
                                    // 读取货品信息
                                    $("#cartSelectorCon").html(YouGou.Util.tpl(strHtmlTmp, data));
                                    initCartSelectorPop();
                                    $target.height($("#cartSelectorCon").height() + 10);
                                    setPosition();
                                    tipSpan = $('#cartPopTips');
                                }
                            }
                        });
                        // window.location.reload();
                    });

                // 关闭按钮点击
                $(".jsclose").click(function() {
                    $target.hide();
                });

                // 推荐图片懒加载
                $('.pro_list img').lazyload();
            }
            initShopcart();
        },
        // 猜你喜欢等推荐模块
        recommend : function(dModule) {
            // 加入购物车
            $('.cart_addto_lnk').click(function() {
                var pid = $(this).attr('pid');
            })
            // 尺码选择等
        },
        // 收货地址
        address : function(dModule) {
            var oldSelectedAddressId = null;
            function resetAddressUi() {
                if ($("#showallad").text() == "简易显示") {
                    $(".reciever_list").css({
                        'height' : '100%'
                    });
                } else {
                    $(".reciever_list").height(135);
                }
                if ($(".reciever_list dl").length <= 0) {
                    $(".reciever_list").css({
                        'height' : '0'
                    }).hide();
                    $("#selAddrTitle").html("请填写您的收货地址");
                } else {
                    $(".reciever_list").show();
                }
            }
            // 地址reset(使用新地址表单reset)
            function newAddress_reset() {
                $("#address_info input:text").each(
                    function() {
                        $(this).val("");
                        $("#" + $(this).attr("id") + "_tips").html('')
                            .removeClass("successHint").removeClass(
                            "errorHint");
                    });
                $("#receivingDistrict_tips").html('')
                    .removeClass("successHint").removeClass("errorHint");
                $("#province_i,#city_i,#area_i").text("");
                $("#receivingProvince,#receivingCity,#receivingDistrict,#receivingProvinceName,#receivingCityName,#receivingDistrictName")
                    .val("");
                $("#city_link,#area_link").css('color', 'gray');
                $("#province_link").text("请选择省");
                $("#city_link").text("请选择城市");
                $("#area_link").text("请选择县区");
            }

            // 修改地址hidden input 值
            function updateAddressHiddenData(addressObj) {
                if (YouGou.Util.isNull(addressObj)) {
                    return;
                }
                if (addressObj.type == "alipay" || addressObj.type == "51fanli"
                    || addressObj.type == "qqfanli") {
                    $("#update_address_div").hide();
                }
                $("#addressId").val(addressObj.id);
                $("#addressType").val(addressObj.type);
                if($("#addressId").val()==""){
                    $("#addressType").val("");
                }
                // $("#email").val(addressObj.email);
                $("#receivingName").val(addressObj.receivingName);
                $("#receivingAddress").val(addressObj.receivingAddress);
                $("#receivingMobilePhone").val(addressObj.receivingMobilePhone);
                LoadAddress(addressObj.receivingProvince,
                    addressObj.receivingProvinceName,
                    addressObj.receivingCity, addressObj.receivingCityName,
                    addressObj.receivingDistrict,
                    addressObj.receivingDistrictName);
                $("#receivingZipCode").val(addressObj.receivingZipCode);
                $("#deliveryDate").val(addressObj.distributionType);
            }
            // 地址隐藏域赋值
            function LoadAddress(provid, provNmae, cityid, cityNmae, areaid,
                                 areaName) {
                $("#receivingProvince").val(provid);
                $("#receivingProvinceName").val(provNmae);
                $("#receivingCity").val(cityid);
                $("#receivingCityName").val(cityNmae);
                var nowSelCityNo = cityid;
                var isNowAreaOk = false;
                var nowAreaArr = areaid.split('-');
                if (nowAreaArr != null && nowAreaArr.length == 4) {
                    var numb = jQuery.trim(nowAreaArr[0]) + "-"
                        + jQuery.trim(nowAreaArr[1]) + "-"
                        + jQuery.trim(nowAreaArr[2]);
                    if (numb == nowSelCityNo) {
                        isNowAreaOk = true;
                    }
                }
                if (nowSelCityNo != areaid && isNowAreaOk) {
                    $("#receivingDistrict").val(areaid);
                    try {
                        /* 注册配送地址变化事件,判断配送地址是否支持电子发票 */
                        $.oEInvoice.fCheckDistrictAllowEInvoice();
                    } catch (e) {
                    }

                    $("#receivingDistrictName").val(areaName);
                }
            }
            // 修改地址
            function updateAddress(addressId) {
                if (!YouGou.Util.isNull(addressCanUpdate)
                    && addressCanUpdate == "false") {
                    alert("对不起，您本周新增或者修改收货地址已超过" + maxOperationAddNum
                        + "次，请您下次再修改！");
                    return;
                }
                var dg = ygDialog({
                    id : 'addressPopDialog', // 控制一个弹窗实例
                    url : toEditAddressPopUrl + '?addressId=' + addressId,
                    title : '修改地址',
                    lock : true,
                    height : 275,
                    iframed : true,
                    width : 850,
                    skin : 3
                });
            }
            // 增加地址
            function addInAddress() {
                if (!YouGou.Util.isNull(addressCanUpdate)
                    && addressCanUpdate == "false") {
                    alert("对不起，您本周新增或者修改收货地址已超过" + maxOperationAddNum
                        + "次，请您下次再修改！");
                    return;
                }
                var dg = ygDialog({
                    id : 'addressPopDialog', // 控制一个弹窗实例
                    url : toAddAddressPopUrl + '?addressId=0',
                    title : '使用新地址',
                    lock : true,
                    height : 275,
                    iframed : true,
                    width : 850,
                    skin : 3
                });
            }
            // 删除收获地址
            function deleteAddress() {
                var addressId = $(this).attr('addrid');
                if (!confirm("您确定要删除收货地址吗？")) {
                    return;
                }
                // 选中地址的id
                var id = getSelectedAddress("pk");
                $.ajax({
                    type : "POST",
                    data : {
                        "id" : addressId
                    },
                    url : basePath + "/my/deleteAddressBookAjax.jhtml",
                    dataType : "json",
                    success : function(data) {
                        data = parseInt(data);
                        if (data == 1) {
                            alert("对不起，您未登录或者已经过期，请重新登录后再操作！");
                        } else if (data == 2) {
                            alert("对不起，您没有权限删除！");
                        } else if (data == 3) {
                            alert("删除成功！");
                            addressMap.remove("user_address_" + addressId);
                            $("#address_radio_" + addressId).remove();
                            var addrLen = $(".reciever_list dl").length;
                            if (addrLen <= 4) {
                                $("#showallad").hide();
                            }
                            // 如果删除为当前选中则更新
                            if (id == addressId) {
                                if ($('#reciever_list>dl').length > 0) {
                                    $('#reciever_list>dl:first').click();

                                } else {
                                    $('.reciever_list').hide();
                                    $('#address_radio_other').hide();
                                    $('#other_address_radio').click();
                                }
                            }
                            resetRecieverList();
                            // window.location.reload()
                        }
                    }
                });
            }
            // qq彩贝等删除地址
            function removeAddress() {
                if (!confirm("您确定要删除收货地址吗？")) {
                    return;
                }
                var addressId = $(this).attr('addrid');
                var addressObj = addressMap.get("user_address_" + addressId);
                // 选中地址的id
                var id = getSelectedAddress("pk");
                // 未登录、无地址
                if (addressMap.size() == 0) {
                    $('.reciever_list').hide();
                    $("#qq_cbaddress").remove();
                    $('#address_radio_other').hide();
                    $('#other_address_radio').click();
                    $("#update_address_div").remove();
                    var html = "";
                    if (addressObj.type == "qqfanli") {
                        // QQ彩贝无地址
                        html = '<p style="padding:10px 90px;clear:both;"><a href="javascript:location.reload();" class="f_blue" style="text-decoration:underline;">使用QQ彩贝地址</a></p>';
                    } else if (addressObj.type == "51fanli") {
                        // 51返利无地址
                        html = '<p style="padding:10px 90px;clear:both;"><a href="javascript:location.reload();" class="f_blue" style="text-decoration:underline;">使用51返利地址</a></p>';
                    }
                    $('#addressInfoContainer').after('<div id="allAddress"/>');
                    $('#allAddress').append(html);
                    newAddress_reset();
                } else {
                    $.ajax({
                        type : "POST",
                        data : {
                            "id" : addressId
                        },
                        url : basePath + "/order/delThirdpartyAddress.jhtml",
                        dataType : "json",
                        success : function(data) {
                            data = parseInt(data);
                            if (data == 1) {
                                alert("对不起，您未登录或者已经过期，请重新登录后再操作！");
                            } else if (data == 2) {
                                alert("对不起，您没有权限删除！");
                            } else if (data == 3) {
                                alert("删除成功！");
                                addressMap.remove("user_address_" + addressId);
                                $("#address_radio_" + addressId).remove();
                                var addrLen = $(".reciever_list dl").length;
                                if (addrLen <= 4) {
                                    $("#showallad").hide();
                                }
                                // 如果删除为当前选中则更新
                                if (id == addressId) {
                                    if ($('#reciever_list>dl').length > 0) {
                                        $('#reciever_list>dl:first').click();

                                    } else {
                                        $('.reciever_list').hide();
                                        $('#address_radio_other').hide();
                                        $('#other_address_radio').click();
                                    }
                                }
                                resetRecieverList();
                            }
                        }
                    });
                }
            }
            // 切换地址句柄
            function addressChangeEventHanlder(addressId, firstLoad) {
                var addressKey = "user_address_" + addressId;
                if (YouGou.Util.isNull(addressMap) || !addressId) {
                    return;
                }
                oldSelectedAddressId = addressId;
                var areaNo = null;
                // 使用新地址
                if (addressKey == "user_address_otherAddress") {
                    // addInAddress();
                    $("#address_radio_other").after($("#addressInfoContainer"));
                    $("#update_address_div").hide();
                    $("#addressInfoContainer").show();
                    // $('#addressInfoContainer
                    // #receivingMobilePhone').attr('maxlength','11');
                    // //恢复绕过ie10自身验证
                    $("#addressState").val("1");
                    $("#addressId").val("");
                    $("#addressType").val("");

                    // 其他地址根据区域切换
                    areaNo = $("#receivingDistrict").val();
                    Loadmyaddress(null, null, null);
                    if (!firstLoad) {
                        // 重新评估配送方式和支付方式，并计算购物车
                        if (!YouGou.Util.isEmpty(areaNo)) {
                            // 设置是否支持货到付款
                            ygOrder.base.isSupportCashOnDelivery(areaNo);
                        }
                    }
                } else {
                    var addressObj = addressMap.get(addressKey);
                    // $("#update_address_div").show();
                    $("#addressState").val("2");
                    updateAddressHiddenData(addressObj);
                    // 根据选择的地址切换
                    areaNo = addressObj.receivingDistrict;
                    ygOrder.base
                        .isSupportCashOnDeliveryCallback(addressObj.isSupportStatus);
                    // 是否支持开发票
                    if (addressObj.invcTtStatus == 1) {
                        $('#invcBox').show();
                        isShowInvcBox = true;
                    } else {
                        $('#invcBox').hide();
                        $('#invc').attr('checked', false);
                        isShowInvcBox = false;
                    }

                }
            }

            // 单选切换地址校验手机号码
            function checkPhoneByChangeAddress() {
                var allData = getSelectedAddress("all");
                var data = allData.data;
                $("#address_radio_p").remove();
                // 是否验证过手机号码
                if (data.isCheckPassPhone == "false") {
                    var _html = [];
                    var rePhone = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0-9]|17[0-9])\d{8}$/;
                    var addrId=data.id;
                    var isYG=data.type=="yougou"&&addrId!=""&&addrId!=null;

                    // 不是手机号码
                    if (!isYG&&!rePhone.test(data.receivingMobilePhone)) {
                        updateAddress(allData.pk, false);
                    }
                }
            }

            // 根据类型获取选中地址数据
            function getSelectedAddress(type) {
                var selcetedAdreesObj = $('input:radio[name="addressRadio"]:checked');
                var addressId = selcetedAdreesObj.attr("addressId");
                var addressKey = "user_address_" + addressId;
                if (YouGou.Util.isNull(type)) {
                    // 默认DataObj
                    return addressMap.get(addressKey);
                } else if (type == "pk") {
                    // 主键id
                    return addressId;
                } else if (type == "key") {
                    // Map key
                    return addressKey;
                } else if (type == "obj") {
                    // jquery obj
                    return selcetedAdreesObj;
                } else if (type == "data") {
                    // Map Data
                    return addressMap.get(addressKey);
                } else if (type == "all") {
                    return {
                        pk : addressId,
                        key : addressKey,
                        obj : selcetedAdreesObj,
                        data : addressMap.get(addressKey)
                    };
                }
            }

            // 初始化
            function initOrder() {
                if (!YouGou.Util.isNull(addressMap) && addressMap.size() > 0) {
                    // 如果有保存地址，则初始化选中地址
                    addressChangeEventHanlder(getSelectedAddress("pk"), true);
                } else {
                    // 没地址，则初始化新地址表单
                    var receivingProvince = $("#receivingProvince").val();
                    var receivingCity = $("#receivingCity").val();
                    if (YouGou.Util.isEmpty(receivingProvince)
                        || YouGou.Util.isEmpty(receivingCity)) {
                        $("#province_i,#city_i,#area_i").text("");
                        $("#receivingProvince,#receivingCity,#receivingDistrict").val("");
                        $("#city_link,#area_link").css('color', 'gray');
                        // area-mini.js
                        Loadmyaddress(null, null, null);
                    }
                }
            }
            // 事件初始化
            function initOrderRemark() {
                // 使用该邮编
                $("#usethiscode").click(
                    function() {
                        $("#receivingZipCode.sinput").val(
                            $("#thispostcode").text());
                    });
                // 显示全部地址
                $("#showallad").click(
                    function() {
                        var adinfo;
                        adinfo = $(this).text().length;
                        if (adinfo > 4) {
                            $(this).text("简易显示").addClass("hideallad")
                                .removeClass("showallad");
                            resetAddressUi();
                        } else {
                            $(this).text("显示全部地址").addClass("showallad")
                                .removeClass("hideallad");
                            $(".reciever_list").height(135);
                        }
                    });
                // 切换收货地址及滑过样式
                $(".reciever_list dl").live(
                    "click",
                    function(e) {
                        if ($(this).hasClass('new_addr')) {
                            /*
                             * $(".reciever_list
                             * dl.curr").removeClass("curr");
                             * $(this).addClass("curr");
                             */
                            $('#other_address_radio').click();
                            return;
                        }
                        // 修改|删除地址地址
                        if (e.target.nodeName.toLowerCase() == 'a') {
                            var $target = $(e.target)
                            if ($target.hasClass('address_update')) {
                                updateAddress($target.attr('addrid'));
                            } else if ($target.hasClass('delete')) {
                                deleteAddress.call(e.target);
                            } else if ($target.hasClass('qqdelete')) {
                                removeAddress.call(e.target);
                            }
                            return false;
                        }
                        // 2014.4.3已经没有#addressInfoContainer
                        // $("#addressInfoContainer").hide();
                        // $('#addressInfoContainer
                        // #receivingMobilePhone').attr('maxlength','15');
                        // //绕过ie10自身验证
                        var $this = $(this), dRadio = $this
                            .find('input[name=addressRadio]');
                        // 添加选中样式
                        $(".reciever_list dl.curr").removeClass("curr");
                        $this.addClass("curr");
                        // 设置radio button选中
                        $('input[name=addressRadio]')
                            .attr('checked', false);
                        dRadio.attr("checked", true)
                        var addressId = dRadio.attr("addressId");
                        // 触发切换方法
                        addressChangeEventHanlder(addressId, false);
                        checkPhoneByChangeAddress();
                        if(korea == "1"){	//首尔站商品
                            getCardsInfo(null);
                        }
                    });

                $(".reciever_list dl").live('mouseenter', function(e) {
                    e.stopPropagation();
                    $(".reciever_list dl").removeClass("hover");
                    $(this).addClass("hover").find(".actP").show();
                });
                $(".reciever_list dl").live('mouseleave', function(e) {
                    e.stopPropagation();
                    $(this).removeClass("hover").find(".actP").hide();
                });

                // 使用新地址
                $("#other_address_radio").unbind('click');
                $("#other_address_radio").bind("click", function(e) {
                    e.stopPropagation();
                    // $("#addressInfoContainer").hide();
                    // var addressId = $(this).attr("addressId");
                    // if(!YouGou.Util.isNull(addressCanUpdate) &&
                    // addressCanUpdate == "false"){
                    // $("#addressRadio_"+oldSelectedAddressId).attr("checked","checked");
                    // alert("您好，您本周新增或者修改收货地址已超过"+ maxOperationAddNum
                    // +"次，请您下次再更换！");
                    // return;
                    // }
                    // $(".reciever_list
                    // dl").removeClass("curr").removeClass("hover");
                    // $(".table_address").show();
                    addInAddress();
                    // 优购用户地址
                    // addressChangeEventHanlder(addressId,false);
                });

            }
            // 初始化
            initOrder();
            initOrderRemark(); // 事件绑定
            initPay(true); // 该方法在payonline里
            resetAddressUi();
            if (!$(".reciever_list .curr:first").find('input:radio').attr(
                    'checked')) {
                $(".reciever_list .curr:first").click();
            }
        },
        // 付款方式
        payStyle : function(dModule) {
            // 选择在线支付方式时，置空货到付款
            /*
             * $('input[name=webbankpay]').click(function(){
             * if($('#payment_2').attr('checked')){
             * $('#payment_1').attr('checked',true).click(); } });
             */
            $('input[name=webbankpay]').live('click', function() {
                if ($('#payment_2').attr('checked')) {
                    $('#payment_1').attr('checked', true).click();
                }
            });
            // 计算付款方式优惠活动价格
            function paymentChanged() {
                if ($(this).val() == "CASH_ON_DELIVERY") {
                    // 货到付款
                    if (parseFloat($("#higestPayDeliveryOrderAmount").val()) != 0) {
                        if (parseFloat($("#u_buyAmount").html()) >= (parseFloat($(
                                "#higestPayDeliveryOrderAmount").val()) + 15)) {
                            // $(".noArriveTips div").hide();
                            // $("#noSupportCODMsg_6").show();
                            $("#cashOnDelivery_1 .c9").html(
                                $("#noSupportCODMsg_6 .c9").html());
                            $(".arriveTips").hide();
                            $("#payment_2").attr("disabled", true).attr(
                                "checked", false);
                            return false;
                        }
                    }
                    $("input[name=webbankpay]").attr("checked", false);
                    $('.pay_online_div dd.curr').removeClass('curr');
                    $('#paymethod').val('');
                    $('#defaultbank').val('');
                    $('#bankType').val('');
                    $('#onlinePayStyleNo').val('');
                    // 手机验证
                    ygOrder.base.securityBind();
                } else {
                    $('#mobileCheckDiv').hide();
                }
                ygOrder.base.calculateCart();
            }
            // 支付方式 -- 只有“在线支付”或“货到付款”
            $("input[name=payment]").bind("click", paymentChanged);
            if ($("input[name=payment]:checked").val() == "CASH_ON_DELIVERY") {
                // 手机验证
                ygOrder.base.securityBind();
            }
            // 手机验证事件绑定
            ygOrder.base.SafeCheck();
            // 更多银行
            $('.pay_other a').click(
                function(e) {
                    e.preventDefault();
                    var $this = $(this);
                    var dg = ygDialog({
                        url : $this.attr('href'),
                        title : $this.attr('title') || '选择银行',
                        lock : true,
                        width : 690,
                        height : $this.attr('iheight') ? $this
                            .attr('iheight') : 'auto'
                    });
                    return false;
                });
            $('.payment_prvw').hover(function() {
                $('.prvw_fllinf').show();
            }, function() {
                $('.prvw_fllinf').hide();
            });
        },
        // 表单
        formInit : function(dModule) {
            // 表单验证
            function initValidator() {
                var rules = {};
                var msg = {};

                rules.receivingName = {required : true,receivingNameLengthRule : [],receivingNameSymbolRule : []};
                msg.receivingName = {required : "请输入收货人姓名，要求3-25个字符"};

                rules.receivingDistrict = {required : true};
                msg.receivingDistrict = {required : "请选择地区"};

                rules.receivingAddress = {required : true,receivingAddressLengthRule : [],receivingAddressSymbolRule : []};
                msg.receivingAddress = {required : "请输入收货人地址，要求5-120个字符",maxlength : jQuery.format("详细地址长度最多不能超过{0}位")};

                rules.receivingMobilePhone = {required : true,maxlength : 11,phone : []};
                msg.receivingMobilePhone = {required : "请输入手机号码",maxlength : jQuery.format("手机号码长度最多不能超过{0}位"),phone : "请您输入正确格式的手机号码"};

                if(korea == 1){
                    rules.idcard_text = {required : true,checkCardNo:[]};
                    msg.idcard_text = {required : "请输入身份证号"};
                }
                rules.webbankpay = { payment : []};

                validator = $("#orderForm").validate(
                    {
                        rules : rules,
                        messages : msg,
                        onkeyup : false,
                        focusInvalid : true,
                        ignore : "",
                        errorPlacement : function(error, element) {
                            try {
                                var errorHint;
                                if(element.attr("id") != ""){
                                    errorHint = $("#" + element.attr("id")
                                        + "_tips");
                                }

                                if (element.attr("id") != "" && $("#" + element.attr("id")).attr("type") == "radio") {
                                    errorHint = $("#" + element.attr("name")
                                        + "_tips");
                                }

                                if(element.attr("name") == "idcard_text"){
                                    errorHint = $("#subCardInfo_tips");
                                }
                                if (YouGou.Util.isEmpty(error.text())) {
                                    if (element.attr("id") != ""  && $("#" + element.attr("id")).attr("type") == "radio") {
                                        errorHint.parent().hide();
                                        errorHint.html('').removeClass("errorHint");
                                    } else {
                                        if(element.attr("name") != "idcard_text"){
                                            errorHint.html('').removeClass("errorHint")
                                                .addClass("successHint");
                                        }
                                    }
                                } else {
                                    if (element.attr("id") == "receivingName"
                                        || element.attr("id") == "receivingAddress") {
                                        var addressId = $("#addressId").val();
                                        if (!YouGou.Util.isEmpty(addressId)) {
                                            $('html,body').animate(
                                                {
                                                    scrollTop : $(
                                                        '#selAddrTitle')
                                                        .offset().top
                                                }, 300);
                                            ygDialog({
                                                id : 'addressPopDialog', // 控制一个弹窗实例
                                                url : toEditAddressPopUrl
                                                + '?addressId=' + addressId,
                                                title : '修改地址',
                                                lock : true,
                                                height : 275,
                                                iframed : true,
                                                width : 850,
                                                skin : 3
                                            });
                                            return;
                                        }
                                    }
                                    if (element.attr("id") != "" && $("#" + element.attr("id")).attr("type") == "radio") {
                                        errorHint.parent().show();
                                        errorHint.text(error.text()).addClass(
                                            "errorHint");
                                    } else {
                                        errorHint.text(error.text()).removeClass(
                                            "successHint")
                                            .addClass("errorHint");
                                    }
                                    if (element.attr("id") == "receivingDistrict") {
                                        $('html,body').animate(
                                            {
                                                scrollTop : $("#province_link")
                                                    .offset().top
                                            }, 300);
                                    }
                                }
                            } catch (e) {
                            }
                        },
                        success : function(element) {
                        },
                        submitHandler : function(form) {
                            try {
                                if (!$.oEInvoice.fValid(true)) {
                                    return false;
                                }
                            } catch (e) {
                            }
                            submitOrder(form);
                        },
                        invalidHandler : function(form, validator) {
                            var formValidatorMessage = "";
                            $.each(validator.invalid,function(key, value) {
                                formValidatorMessage += (value + "\r\n");
                            });
                            if (!YouGou.Util.isEmpty(formValidatorMessage)) {
                                alert(formValidatorMessage);
                            }
                        }
                    });
            }
            // 提交订单
            function submitOrder(form) {
                if(korea == 1){	//首尔站商品才验证
                    if(isThanOneCardsInfo == '0'){	//报关信息表单为输入框
                        var id = $(".idcard_text").attr("id");

                        if(YouGou.Util.isEmpty(id)){	//没有id 表示新增的   1表示传入后台的为cardNo 0 表示传入后台的值为cardId
                            $("#subCardInfo").val($(".idcard_text").val());
                            $("#isCardNoOrId").val("1");
                        }else{
                            $("#subCardInfo").val(id);
                            $("#isCardNoOrId").val("0");
                        }
                    }
                    if(isThanOneCardsInfo == "1"){ 	//报关信息表单为下拉框
                        $("#subCardInfo").val(oneCardId);
                        $("#isCardNoOrId").val("0");
                    }
                }
                // 判断状态
                if ($('.jsShopCartErr').length > 0) {
                    alert('您所购买的商品中可能存在已下架、已售罄，或者库存不足的情况，请返回购物车检查！');
                    $('body').scrollTop($('.jsShopCartErr').offset().top);
                    return false;
                }
                ;
                // 闪购不去判断购物车的内容
                if (!$('.ypsg_gopay_btn')[0]) {
                    var boolCheckOrder = true
                    $.ajax({
                        type : 'get',
                        async : false,
                        url : '/order/checkOrder.sc?tradeCurrency='
                        + $('#tradeCurrency').val()
                        + "&linkBuy="+$("#linkBuy").val()
                        + '&r='+ Math.random(),
                        success : function(d) {
                            if (d == 'false') {
                                alert('您所购买的商品中可能存在已下架、已售罄，或者库存不足的情况，请返回购物车检查！');
                                boolCheckOrder = false;
                                // return false;
                            }
                            if(d=="errorIntegral"){
                                alert('可用积分不足，请返回购物车取消部分积分换购商品！');
                                boolCheckOrder=false;
                            }
                        }
                    });
                    if (!boolCheckOrder) {
                        return false;
                    }
                }
                if ($('#isLock').val() == 'true') {
                    // 改账号已被锁定
                    $("#userLock").css({
                        'display' : 'inline-block'
                    });
                    alert("抱歉，您的账号已被锁定!");
                    return false;
                }

                var orderNum = $('#orderNum').val();
                var limitOrderNum = $('#limitOrderNum').val();
                if (orderNum != ''
                    && parseInt(orderNum) >= parseInt(limitOrderNum)
                    && 0 != parseInt(limitOrderNum)) {
                    alert("抱歉，每个会员每天最多下" + limitOrderNum + "单!");
                    return false;
                }

                var addProductNum = $('#addProductNum').val();
                var limitCartAddProductMaxNum = $('#limitCartAddProductMaxNum').val();
                if (addProductNum != ''
                    && parseInt(addProductNum) > parseInt(limitCartAddProductMaxNum)
                    && 0 != parseInt(limitCartAddProductMaxNum)) {
                    alert("购物车最多存放" + limitCartAddProductMaxNum + "件商品，请编辑购物车!");
                    return false;
                }

                var orderCommNum = $('#orderCommNum').val();
                var limitOrderCommBuyMaxNum = $('#limitOrderCommBuyMaxNum').val();
                if (orderCommNum != ''
                    && parseInt(orderCommNum) > parseInt(limitOrderCommBuyMaxNum)
                    && 0 != parseInt(limitOrderCommBuyMaxNum)) {
                    alert("抱歉，每个订单内商品数量不能超过" + limitOrderCommBuyMaxNum
                        + "个，请删除部分商品后提交!");
                    return false;
                }

                var orderAmountLimit = $('#orderAmountLimit').val();
                var lackOrderAmount = $('#lackOrderAmount').val();

                if (orderAmountLimit != '' && parseInt(orderAmountLimit) > 0
                    && lackOrderAmount != ''
                    && parseInt(lackOrderAmount) > 0) {
                    alert("网站最低成单金额为" + orderAmountLimit + "元，您还需要购买"
                        + lackOrderAmount + "元商品，请继续选购");
                    return false;
                }
                //最大成单额验证提示
                var orderAmountMaxLimit = $('#orderAmountMaxLimit').val();
                if (orderAmountMaxLimit != '' && parseInt(orderAmountMaxLimit) > 0) {
                    alert("根据海关规定，单次限额为" + orderAmountMaxLimit + "元，请分多次提交");
                    return false;
                }

                var addrId=$("#addressId").val();
                var isYG=$("#addressType").val()=="yougou"&&addrId!=""&&addrId!=null;

                if (!isYG&&!$("#orderForm").validate().element("#receivingName")) {
                    return false;
                }
                if (!isYG&&!$("#orderForm").validate().element("#receivingDistrict")) {
                    return false;
                }
                if (!isYG&&!$("#orderForm").validate()
                        .element("#receivingMobilePhone")) {
                    return false;
                }
                if (!isYG&&!$("#orderForm").validate().element("#receivingAddress")) {
                    return false;
                }

                // $('#reciever_list .curr:first').click();
                // 验证送货时间start=================
                // if(YouGou.Util.isEmpty($("input[name=deliveryDate]:checked").val())){
                // alert("请选择送货时间!");
                // return false;
                // }
                // 验证送货时间end=================
                // 检测是否货到付款
                if ($("input[name=payment]:checked").val() == 'CASH_ON_DELIVERY') {
                    // 验证是否绑定过手机号
                    var IsExist = true;
                    $.ajax({
                        type : 'get',
                        async : false,
                        url : '/checkUserMobileIsExist.jhtml?r='
                        + Math.random(),
                        success : function(data) {
                            if ("true" == data) {
                                $(".mobile_check").addClass("warn");
                                $("#mobileCheck_tips").addClass("errortips")
                                    .html("请您验证手机号码").show();
                                $('html,body').animate(
                                    {
                                        scrollTop : $("#mobileCheckDiv")
                                            .offset().top
                                    }, 1000);
                                alert('请您验证手机号码');
                                IsExist = false;
                            }
                        }
                    });
                    if (!IsExist) {
                        return false
                    }
                    ;
                }

                // 检查是否填写发票抬头
                if ($('.jsInvcIpt').is(':visible')) {
                    var _ipttxt = $('.jsInvcIpt');
                    var regx = /^[\w\W]{6,60}$/;
                    var _val = _ipttxt.val();
                    var _errorTip = $('.jsInvcTt').find('.error_tip');
                    if (_val == "") {
                        _errorTip.css('display', 'inline-block')
                            .html('请输入单位名称');
                        alert("请输入单位名称");
                        return false;
                    } else {
                        if (!regx.test(_val)) {
                            _errorTip.css('display', 'inline-block').html(
                                '单位名称至少为6个字符，最多为60个字符');
                            alert("单位名称至少为6个字符，最多为60个字符");
                            return false;
                        }
                    }

                }
                // 新增收获地址隐藏域验证
                var receivingProvince = $('#receivingProvince').val();
                var receivingProvinceName = $('#receivingProvinceName').val();
                var receivingCity = $('#receivingCity').val();
                var receivingCityName = $('#receivingCityName').val();
                var receivingDistrict = $('#receivingDistrict').val();
                var receivingDistrictName = $('#receivingDistrictName').val();
                if (receivingProvince == '' || receivingProvinceName == ''
                    || receivingCity == '' || receivingCityName == ''
                    || receivingDistrict == ''
                    || receivingDistrictName == '') {
                    alert("请检查收获城区");
                    return false;
                }
                var receivingAddress = $('#receivingAddress').val();
                if (receivingAddress == "") {
                    alert("请填写收获地址");
                    return false;
                } else if (receivingAddress.length >= 70) {
                    alert("收获地址过长");
                }
                // 新送货时间验证
                // var deliveryDate=$('#deliveryDate').val();
                // if(deliveryDate=="")
                // {
                // alert("请检查送货时间");
                // return false;
                // }
                // 检测货付金额是否超出1000//20140613
                /*
                 * var zuidajine =
                 * parseFloat($("#higestPayDeliveryOrderAmount").val()); var
                 * buyAmoutval = parseFloat($("#u_buyAmount").html());
                 * if($("#payment_3").get(0).checked && zuidajine <
                 * buyAmoutval){ alert("1000元以上不支持货到付款"); return false; }
                 */
                //首尔直发需要先检查订单成交金额是否大于0
                var tradeCurrency = $("#tradeCurrency").val();
                if (tradeCurrency == 'KRW_ZF') {
                    var buyAmountval = parseFloat($("#u_buyAmount").html());
                    if (buyAmountval <= 0) {
                        alert("您好，订单成交金额需大于0元");
                        return false;
                    }
                }
                //首尔订单确认页需要检查是否0元商品行
                if ($('#hasZeroProduct').val() == '1') {
                    alert("订单存在实付金额为0元的商品，将无法清关，请调整购物车或分开结算");
                    return false;
                }
                if(korea == '1' && $("#authSwitch").val() == 'false'){	//首尔站商品进行实名验证

                    var saveButton = $("#save_butten");
                    var modifyButton = $("#modify_card");
                    if(modifyButton.length > 0 ){
                        alert("身份证与姓名不一致,请点击修改,并填写正确的信息");
                        $('html,body').animate({scrollTop : $("#card_no").offset().top}, 280);
                        $("#subCardInfo_tips").addClass("errorHint").text("身份证与姓名不一致,请点击修改,并填写正确的信息");
                        return false;
                    }
                    if(saveButton.css("display") == 'block'){
                        alert("请先保存填写正确的信息");
                        $('html,body').animate({scrollTop : $("#card_no").offset().top}, 280);
                        $("#subCardInfo_tips").addClass("errorHint").text("请先保存填写正确的信息");
                        return false;
                    }
                    $(".idcard_text").attr("disabled",false);
                }
                $("#submi21t").hide().parent().addClass("waitInfo").html("正在提交订单，请稍候...");
                form.submit();
            }
            initValidator();
            // 判断状态
            if ($('.jsShopCartErr').length > 0) {
                alert('您所购买的商品中可能存在已下架、已售罄，或者库存不足的情况，请返回购物车检查！')
                $('body').scrollTop($('.jsShopCartErr').offset().top);
                return false;
            };
        },
        // 发票
        invcBox : function() {
            var _ipttxt = $('.jsInvcIpt');
            $('.jsInvcChck').change(function() {
                var _this = $(this);
                var _check = _this.attr('checked');
                var _bd = _this.parent().siblings();
                _check ? _bd.removeClass('none') : _bd.addClass('none');
            });
            $('.jsInvcTt input[name=invcTt]').change(
                function() {
                    var _this = $(this);
                    var _val = _this.val();
                    var _errorTip = $('.jsInvcTt').find('.error_tip');
                    if ($('.invc_cbox .ph-wrap')) {
                        var _phWrap = $('.invc_cbox .ph-wrap');
                    }
                    if (_val == 1) {
                        _ipttxt.css('display', 'inline-block');
                        _ipttxt.blur(function() {
                            var regx = /^[\w\W]{6,60}$/;
                            var _val = _ipttxt.val();
                            var _errorTip = $('.jsInvcTt').find(
                                '.error_tip');
                            if (_val == "") {
                                _errorTip.css('display', 'inline-block')
                                    .html('请输入单位名称');
                                return false;
                            } else {
                                if (!regx.test(_val)) {
                                    _errorTip
                                        .css('display', 'inline-block')
                                        .html('单位名称至少为6个字符，最多为60个字符');
                                    return false;
                                } else {
                                    _errorTip.css('display', 'none');
                                }
                            }
                        });
                        _phWrap.show();
                    } else {
                        _ipttxt.css('display', 'none');
                        _errorTip.css('display', 'none');
                        _phWrap.hide();
                    }
                });
            // 设置发票显示状态(更新时)
            if (typeof (isShowInvcBox) != 'undefined') {
                // 发票赋值
                if (invInfo) {
                    // 需要发票
                    if (invInfo.isChecked) {
                        $('#invc').click().change();
                    }
                    // 单位
                    if (invInfo.invcTt == 1) {
                        $('input[name=invcTt]').eq(1).click().change();
                    }
                    $('input[name=unitName]').val(invInfo.unitName);
                }

                if (isShowInvcBox) {
                    $('#invcBox').show();
                } else {
                    $('#invcBox').hide();
                }
            }
        },
        // 成功提交订单信息
        orderSmtsccss : function() {
            $('.jsShowOrderDtl').click(function() {
                var $bd = $('.jsSmtsccssBd');
                var $visible = $bd.is(':visible');
                var $box = $(this).parents('#orderSmtsccss');
                if ($visible) {
                    $box.removeClass('order_smtsccss_unfold');
                } else {
                    $box.addClass('order_smtsccss_unfold');
                }
                return false;
            });
        }

    }
};
$(function() {
    var doWhileExist = function(sModuleId, oFunction) {
        if (document.getElementById(sModuleId)) {
            oFunction(document.getElementById(sModuleId));
        }
    };
    // 初始化购物车
    // doWhileExist('shoppingCartContainer',ygOrder.module.shopcart);
    // 20140331 新增
    doWhileExist('shoppingCartContainerCNY', ygOrder.module.shopcart);
    doWhileExist('shoppingCartContainerHKD', ygOrder.module.shopcart);
    doWhileExist('shoppingCartContainerKRW', ygOrder.module.shopcart);
    doWhileExist('shoppingCartContainerKRW_ZF', ygOrder.module.shopcart);
    // 20140331 新增 结束

    // 初始化优惠券
    doWhileExist('couponarea', ygOrder.module.coupon);
    // 猜你喜欢等 需要改id
    // doWhileExist('recommend',ygOrder.module.recommend);
    // 提交订单：收货地址
    doWhileExist('reciever_list', ygOrder.module.address);
    doWhileExist('noaddress', ygOrder.module.address);
    // 提交订单：支付方式
    doWhileExist('payTypeList', ygOrder.module.payStyle);
    // 提交订单：表单处理
    doWhileExist('orderForm', ygOrder.module.formInit);
    // 发票
    doWhileExist('invcBox', ygOrder.module.invcBox);
    // 成功提交订单信息
    doWhileExist('orderSmtsccss', ygOrder.module.orderSmtsccss);

    // 初始时重置地址列表
    resetRecieverList();
});
// 关闭弹窗:为兼容修改地址里的关闭回调
function closeDialog() {
    ygDialog.close();
}
function shopcartLoginCall() {
    window.top.location.reload();
}
/* 以下都是兼容 */
// 当发货地址修改时，重新评估配送方式和支付方式，并计算购物车
function updateServiceDeliveryWay(areaNo) {
    if (!YouGou.Util.isEmpty(areaNo)) {
        ygOrder.base.isSupportCashOnDelivery(areaNo);
    }
}

// 用于更新地址后input数据放入Map并且重新渲染
function convertAddressMapData(addressId, addressInputObj) {
    var _tempOldData = addressMap.get("user_address_" + addressId);
    var saveOrUpdate = "1";
    if (YouGou.Util.isNull(_tempOldData)) {// 没有代表新增
        _tempOldData = '{"id":"","receivingName":"","receivingProvince":"","receivingProvinceName":"","receivingCity":"","receivingCityName":"","receivingDistrict":"","receivingDistrictName":"","receivingAddress":"","receivingMobilePhone":"","isCheckPassPhone":"","receivingTelephone":"","email":"","isDefaultAddress":"","receivingZipCode":"","payType":"","distributionType":"","type":"","isSupportStatus":"4","invcTtStatus":"0"}';
        _tempOldData = jQuery.parseJSON(_tempOldData);
        saveOrUpdate = "2";
    }
    if (YouGou.Util.isNull(addressInputObj)) {
        return;
    }
    if (!YouGou.Util.isEmpty(addressInputObj.receivingName)) {
        _tempOldData.receivingName = addressInputObj.receivingName;
    }
    if (!YouGou.Util.isEmpty(addressInputObj.receivingProvince)) {
        _tempOldData.receivingProvince = addressInputObj.receivingProvince;
        _tempOldData.receivingProvinceName = addressInputObj.receivingProvinceName;
    }
    if (!YouGou.Util.isEmpty(addressInputObj.receivingCity)) {
        _tempOldData.receivingCity = addressInputObj.receivingCity;
        _tempOldData.receivingCityName = addressInputObj.receivingCityName;
    }
    if (!YouGou.Util.isEmpty(addressInputObj.receivingDistrict)) {
        _tempOldData.receivingDistrict = addressInputObj.receivingDistrict;
        _tempOldData.receivingDistrictName = addressInputObj.receivingDistrictName;
    }
    if (!YouGou.Util.isEmpty(addressInputObj.receivingAddress)) {
        _tempOldData.receivingAddress = addressInputObj.receivingAddress;
    }
    if (!YouGou.Util.isEmpty(addressInputObj.receivingMobilePhone)) {
        _tempOldData.receivingMobilePhone = addressInputObj.receivingMobilePhone;
    }
    if (!YouGou.Util.isEmpty(addressInputObj.constactPhone)) {
        _tempOldData.constactPhone = addressInputObj.constactPhone;
    }
    if (!YouGou.Util.isEmpty(addressInputObj.receivingZipCode)) {
        _tempOldData.receivingZipCode = addressInputObj.receivingZipCode;
    }
    if (!YouGou.Util.isEmpty(addressInputObj.distributionType)) {
        _tempOldData.distributionType = addressInputObj.distributionType;
    }

    addressMap.put("user_address_" + addressId, _tempOldData);

    // 地址template
    var addTpl = [];
    var distributionTypeShow;
    if (addressInputObj.distributionType == 2) {
        distributionTypeShow = '不限时间';
    } else if (addressInputObj.distributionType == 1) {
        distributionTypeShow = '周一至周五';
    } else if (addressInputObj.distributionType == 3) {
        distributionTypeShow = '周六日/节假日';
    } else if (addressInputObj.distributionType == 4) {
        distributionTypeShow = '学校地址/地址白天没人';
    } else {
        distributionTypeShow = '';
    }

    if (saveOrUpdate == "2") {// 2代表新增
        addTpl.push('<dl id="address_radio_' + addressId + '" class="">');
        addTpl.push('<i>&nbsp;</i><p class="actP" style="display: none;"><a href="javascript:void(0);" title="修改收货地址" id="address_radio_update_'
            + addressId
            + '" name="address_radio_update" class="cblue address_update" addrid="'
            + addressId + '">修改</a>');
        addTpl.push(' | <a href="javascript:void(0);" id="address_radio_delete_'
            + addressId
            + '" name="address_radio_delete" class="cblue delete Gray" addrid="'
            + addressId + '">删除</a></p>');
        addTpl.push('<label> <input style="display:none" type="radio" name="addressRadio" addressKey="user_address_'
            + addressId
            + '" addressId="'
            + addressId
            + '" id="addressRadio_'
            + addressId
            + '" value="address_radio_'
            + addressId
            + '" checked="checked" /> </label>');
        addTpl.push('<dt><span class="area"><%=receivingProvinceName%><strong><%=receivingCityName%></strong></span>');
        addTpl.push('(<span class="conName"><%=receivingName%></span>&nbsp;收)');
        addTpl.push('</dt><dd>');
        addTpl.push('<p><%=receivingDistrictName%><%=receivingAddress%>&nbsp;<em class="Gray"><%=receivingMobilePhone%></em></p>');
        addTpl.push('<p class="mt5">' + distributionTypeShow + '</p>');
        addTpl.push('</dd>');
        addTpl.push('</dl>');
        var _html = YouGou.Util.tpl(addTpl.join(''), _tempOldData);
        $("#reciever_list").prepend(_html);
        resetRecieverList();
        $(".reciever_list dl").eq(0).click();
    } else {// 修改
        var delClass = "cblue delete Gray";
        if (addressId == "alipay") {
            delClass = "cblue qqdelete Gray";
        }
        addTpl.push('<i>&nbsp;</i><p class="actP"><a href="javascript:void(0);" title="修改收货地址" id="address_radio_update_'
            + addressId
            + '" name="address_radio_update" class="cblue address_update" addrid="'
            + addressId + '">修改</a>');
        addTpl.push(' | <a href="javascript:void(0);" id="address_radio_delete_'
            + addressId
            + '" name="address_radio_delete" class="'
            + delClass + '" addrid="' + addressId + '">删除</a></p>');
        addTpl.push('<label> <input style="display:none" type="radio" name="addressRadio" addressKey="user_address_'
            + addressId
            + '" addressId="'
            + addressId
            + '" id="addressRadio_'
            + addressId
            + '" value="address_radio_'
            + addressId
            + '" checked="checked" /> </label>');
        addTpl.push('<dt><span class="area"><%=receivingProvinceName%><strong><%=receivingCityName%></strong></span>');
        addTpl.push('(<span class="conName"><%=receivingName%></span>&nbsp;收)');
        addTpl.push('</dt><dd>');
        addTpl.push('<p><%=receivingDistrictName%><%=receivingAddress%>&nbsp;<em class="Gray"><%=receivingMobilePhone%></em></p>');
        addTpl.push('<p class="mt5">' + distributionTypeShow + '</p>');
        addTpl.push('</dd>');
        var _html = YouGou.Util.tpl(addTpl.join(''), _tempOldData);
        $("#address_radio_" + addressId).html(_html).click();
    }

}
// 更新收货地址赋值
function setNewAddress(addressObj) {
}
// 安全验证时需要调用的，因暂时无法确定哪些地方调用所以放到全局
function gaPvByCheckPhone(type) {
    try {
        // 手机号验证弹层弹出时
        if (type == "1") {
            _gaq.push([ '_trackPageview',
                '/PageAction/register/TC_registerpage/mail/bindmobile' ]);
            // 击获取验证码行为数量
        } else if (type == "2") {
            _gaq.push([ '_trackPageview',
                '/PageAction/register/TC_registerpage/mail/bindcode' ]);
            // 实际发送验证码数量
        } else if (type == "3") {
            _gaq.push([ '_trackPageview',
                '/PageAction/register/TC_registerpage/mail/bindsent' ]);
            // 完成验证数量
        } else if (type == "4") {
            _gaq.push([ '_trackPageview',
                '/PageAction/register/TC_registerpage/mail/bindsucces' ]);
        }
    } catch (e) {
    }
};

// 新增重置地址列表方法，使“使用新地址”选项始终处于地址列表的第三个位置上
// 此方法在editAddress.js中调用，因此暂时置于全局
function resetRecieverList() {
    var dl = $('#reciever_list dl').not('.new_addr');
    if (dl.length < 4) {
        return;
    }
    var add_new = $('#reciever_list dl.new_addr');
    dl.eq(2).after(add_new);
    /*
     * for(var i=0;i<dl.length;i++) { if(i==3) {
     * $('#reciever_list').append(add_new); }else {
     * $('#reciever_list').append(dl.eq(i)); }
     *  }
     */
}

// 购物车赠品数据
function getGiftPopupData(fifss, mpn, mai, tc) {
    $.ajax({
        type : "POST",
        url : "/shoppingcart/getSpCartGifts.sc",
        async : false,
        data : "mainProductNo=" + mpn + "&mainActiveId=" + mai
        + "&tradeCurrency=" + tc,
        success : function(msg) {

            fifss.html(function(index, val) {
                var oHtml = [];
                var data = eval(msg);
                oHtml.push("<div class='giftPopupWra'><div class='giftPopup clearfix'>");
                for (var i = 0; i < data.length; i++) {
                    var size = data[i].productSize;
                    var sizeInventory = data[i].productInventory;
                    var sizeno = "";
                    var InventoryCount = 0;
                    var ridios = "";
                    for (_sizeInventory in sizeInventory) {
                        InventoryCount += sizeInventory[_sizeInventory];
                    }
                    if (InventoryCount <= 0) {
                        ridios = '<span class="signs">失效</span>';
                    } else {
                        ridios = '<input type="radio" name="opt">';
                    }
                    oHtml.push('<li class="giftList clearfix">');
                    oHtml.push('<div class="option">' + ridios
                        + '</div>');
                    oHtml.push('<div class="primg"><img width="60" height="60" src="'
                        + data[i].picUrl
                        + '"></div>');
                    oHtml.push('<div class="giftmsg" color="'
                        + data[i].color + '">');
                    oHtml.push('<p><a href="' + data[i].url
                        + '">' + data[i].commodityName
                        + '</a></p>');

                    if (InventoryCount <= 0) {
                        oHtml.push('<span class="sizeNone">此商品已赠光</span>');
                    } else {
                        oHtml.push('<span class="size">');
                        for (_size in size) {
                            var si = size[_size];
                            if (sizeInventory[si] == 0) {
                                sizeno = ' class="no"';
                            } else {
                                sizeno = "";
                            }
                            oHtml.push('<a' + sizeno
                                + ' href="javascript:;" giftproductno="'
                                + size[_size]
                                + '">' + _size
                                + '</a>');
                        }
                        oHtml.push('</span>');
                    }
                    oHtml.push('</div></li>');
                }
                oHtml.push("<div class='giftConfirm clearfix'><a class='sbmit' href='javascript:;'>领 取</a><a class='close' href='javascript:;'>关 闭</a></div><p class='sanjiao'></p><p class='close'></p>");
                oHtml.push("</div></div>");
                return val + oHtml.join('');
            });
        }
    });
}
// 购物车页面的推荐商品
function getActiveRecommendList() {
    $(".gwcgm").parent().parent().show();
    $.ajax({
        type : "POST",
        url : "/order/getActiveRecommendList.sc",
        dataType : "json",
        async : false,
        cache : false,
        success : function(data) {
            if (typeof (data.favoritesCommodity) != "undefined") {
                showActiveReconmmendList(
                    data.favoritesCommodity[0].commodityList,
                    ".zjsc", "您最近收藏的商品");
            }
            if (typeof (data.lackOrderCommodityList) != "undefined") {
                var zdtxtit = "再买" + $(".loa").val()
                    + "元才能成单，为您推荐的凑单商品";
                showActiveReconmmendList(
                    data.lackOrderCommodityList[0].commodityList,
                    ".zdtx", zdtxtit);
            }
            if (typeof (data.packageSalePromotionActive) != "undefined") {
                showActiveReconmmendList(
                    data.packageSalePromotionActive[0].commodityList,
                    ".jjg", "您可以参加以下活动");
            }
            if (typeof (data.quotaPromotionActive) != "undefined") {
                var zmjmztit = "再买"
                    + data.quotaPromotionActive[0].activeRuleVo.minRuleAmount
                    + "元就满足："
                    + data.quotaPromotionActive[0].active.activeName;
                showActiveReconmmendList(
                    data.quotaPromotionActive[0].commodityList,
                    ".zmjmz", zmjmztit);
            }
            if (typeof (data.historyCommodity) != "undefined") {
                showActiveReconmmendList(
                    data.historyCommodity[0].commodityList,
                    ".recently_browse", "最近浏览过的商品");
            }
        }
    });
}
function showActiveReconmmendList(_data, elementname, tit) {
    var sHtml = [];
    var ygPriceOrMark = "";
    var zhekou = 0;
    for (var i = 0; i < _data.length; i++) {
        var commodityPrice = 0;
        if (_data[i].activePrice && _data[i].activePrice > 0) {
            ygPriceOrMark = " Red'>活动价：";
            zhekou = (_data[i].activePrice / _data[i].markPrice) * 100;
            commodityPrice = _data[i].activePrice;
        } else {
            ygPriceOrMark = "'>优购价：";
            zhekou = (_data[i].sellPrice / _data[i].markPrice) * 100;
            commodityPrice = _data[i].sellPrice;
        }

        sHtml.push("<li style=\"position:relative; left:0px;\"><div class=\"hpro_box\"><div class=\"pic\">");
        sHtml.push("<a href='" + _data[i].saleSeasonNo
            + "'target=\"_blank\"><img width=\"160\" height=\"160\" src='"
            + _data[i].defalutPic + "'></a>");
        sHtml.push("</div>");
        sHtml.push("<p class=\"title mt5\"><a href='" + _data[i].saleSeasonNo
            + "#ref=cart&#ref=cart&amp;po=buy' target=\"_blank\">"
            + _data[i].commodityName + "</a></p>");
        sHtml.push("<div class=\"price c9 mt3\">");
        sHtml.push("<p class='price_sc'>");
        sHtml.push("<em class='ygprc15'>&yen;<i>" + commodityPrice
            + "</i></em>");
        sHtml.push("<del>&yen;" + _data[i].markPrice + "</del>");
        sHtml.push("<span class='ico_discount'><i>" + Math.round(zhekou) / 10
            + "</i>折</span></p>");
        /*
         * sHtml.push("<div class=\"price c9 mt3\"><p>市场价：<del>"+_data[i].markPrice+"</del></p>");
         * sHtml.push("<p class='price' style='overflow:hidden'><span
         * class='fl"+ygPriceOrMark+"<em class='ygprc16'>￥<i>"+commodityPrice+"</i></em>("+Math.round(zhekou)/10+"折)</span></p>");
         */

        sHtml.push("<p class=\"mt5\"><a href=\"javascript:;\" class=\"cart_addto_lnk\" goodsno='"
            + _data[i].commodityNo + "'>加入购物车</a></p>");
        sHtml.push("</div></li>");
    }

    $(elementname).find("ul").html(sHtml.join(""));
    $(elementname).parent().parent().show();
    uc.proLfSlide(elementname, 5, 5);
    $(elementname).parent().parent().children("h3").html(tit);
}
// 购物车页面的推荐商品end

//相似用户的购买商品推荐 start
function getSimilarRecommendList() {
    $.ajax({
        type : "POST",
        url : "/order/similarCustomerRecommendList.sc",
        dataType : "json",
        async : false,
        cache : false,
        success : function(data) {
            if (typeof (data) != "undefined") {
                $("#similar_recommend").show();
                showSimilarReconmmendList(data);
            }
        }
    });
}

function showSimilarReconmmendList(_data) {
    if (_data && _data.length > 0) {
        var sHtml = [];
        for (var i = 0; i < _data.length; i++) {
            sHtml.push("<li><div class=\"hpro_box\"><div class=\"pic\"><a href='" + _data[i].dpUrl + "#ref=cart&#ref=cart&amp;po=buy' target=\"_blank\">");
            sHtml.push("<img src='"+_data[i].thumbnail+"' width=\"160\" height=\"160\" alt='"+_data[i].name+"' /></a></div>");
            sHtml.push("<p class=\"title mt5\"><a href='"+_data[i].dpUrl+"#ref=cart&#ref=cart&amp;po=buy' target=\"_blank\">"+_data[i].name+"</a></p>");
            sHtml.push("<div class=\"price c9 mt3\"><p class=\"price_sc\"><em class=\"ygprc15\">&yen;<i>"+_data[i].salePrice+"</i></em>");
            if (_data[i].marketPrice) {
                sHtml.push("<del>&yen;"+_data[i].marketPrice+"</del>");
            } else {
                sHtml.push("<del>&yen;</del>");
            }

            sHtml.push("<span class=\"ico_discount\"><i>"+_data[i].rebate+"</i>折</span></p>");
            sHtml.push("<p class=\"mt15\"><a href=\"javascript:;\" class=\"cart_addto_lnk\" goodsno='"+_data[i].goodsno+"'>加入购物车</a></p></div>");
            if (_data[i].has2=='0') {
                sHtml.push("<br><div class=\"pic\"><a href='"+_data[i].dpUrl2+"#ref=cart&#ref=cart&amp;po=buy' target=\"_blank\">");
                sHtml.push("<img src='"+_data[i].thumbnail2+"' width=\"160\" height=\"160\" alt='"+_data[i].name2+"' /></a></div>");
                sHtml.push("<p class=\"title mt5\"><a href='"+_data[i].dpUrl2+"#ref=cart&#ref=cart&amp;po=buy' target=\"_blank\">"+_data[i].name2+"</a></p>");
                sHtml.push("<div class=\"price c9 mt3\"><p class=\"price_sc\">");
                sHtml.push("<em class=\"ygprc15\">&yen;<i>"+_data[i].salePrice2+"</i></em>");
                if (_data[i].marketPrice2) {
                    sHtml.push("<del>&yen;"+_data[i].marketPrice2+"</del>");
                } else {
                    sHtml.push("<del>&yen;</del>");
                }
                sHtml.push("<span class=\"ico_discount\"><i>"+_data[i].rebate2+"</i>折</span></p>");
                sHtml.push("<p class=\"mt15\"><a href=\"javascript:;\" class=\"cart_addto_lnk\" goodsno='"+_data[i].goodsno2+"'>加入购物车</a></p>");
                sHtml.push("</div>");
            }
            sHtml.push("</div></li>");
        }
        $("#similar_recommend").find(".uc_hpro_lst").html(sHtml.join(""));
    }
}
//相似用户的购买商品推荐 end

function spctsubmit(sid) {
    location.href = $('#' + sid + ' .cart_b_paybtn').attr('href');
}

/* 电子发票相关处理函数 */
(function($) {
    /* 电子发票操作对象 */
    var oEInvoice = {
        /* 判断是否开发票 */
        fNeedEInvoice : function() {
            var y = $("#einvc:checked").size() > 0;
            return y;
        },
        /* 开发票点击 */
        fClickInvoice : function() {
            var y = oEInvoice.fNeedEInvoice();
            var _bd = $('.eInvoiceBd');
            y ? _bd.removeClass('none') : _bd.addClass('none');
            if (y) {
                // 设置默认抬头为收货人姓名
                $("#eInvoiceTitle").val($("#receivingName").val());
                // 设置默认收票人手机为收货人手机
                $("#eInvoicePhone").val($("#receivingMobilePhone").val());
                var addrId=$("#addressId").val();
                var isYG=$("#addressType").val()=="yougou"&&addrId!=""&&addrId!=null;
                if(isYG){
                    $("#eInPhoneAddrId").val(addrId);
                }
                else{
                    $("#eInPhoneAddrId").val("");
                }
                $("#eInPhoneSpan").html($("#eInvoicePhone").val());
                $("#eInvoicePhone").hide();
                $("#eInPhoneSpan").show();

            } else {
                /* 隐藏手机验证出错信息 */
                var msg = $("#eInvoiceInvalidMsg1");
                if (!msg.hasClass("hid")) {
                    msg.addClass("hid");
                }
                msg = $("#eInvoiceInvalidMsg2");
                if (!msg.hasClass("hid")) {
                    msg.addClass("hid");
                }
                /* 隐藏抬头验证信息 */
                msg = $("#eInvoiceInvalidMsg3");
                if (!msg.hasClass("hid")) {
                    msg.addClass("hid");
                }
                $("#eInPhoneAddrId").val("");

            }
            $("#eInbtnEdit").show();
            $("#eInbtnSubmit").hide();
            $("#eInbtnCancel").hide();

        },
        /* 验证手机号 */
        fValidMobilePhone : function(showAlert) {
            var y = oEInvoice.fNeedEInvoice();
            if (!y) {
                return true;
            }
            var p = $("#eInvoicePhone").val();
            /* 隐藏手机验证出错信息 */
            var msg = $("#eInvoiceInvalidMsg1");
            if (!msg.hasClass("hid")) {
                msg.addClass("hid");
            }
            msg = $("#eInvoiceInvalidMsg2");
            if (!msg.hasClass("hid")) {
                msg.addClass("hid");
            }
            p = $.trim(p + "");
            var isValid = false;
            /* 手机号为空 */
            if (p == "") {
                isValid = false;
                msg = $("#eInvoiceInvalidMsg1");
                if (msg.hasClass("hid")) {
                    msg.removeClass("hid");
                    if (showAlert) {
                        alert(msg.html());
                    }
                }
                msg = $("#eInvoiceInvalidMsg2");
                if (!msg.hasClass("hid")) {
                    msg.addClass("hid");
                }
            } else {
                var eInAddr=$("#eInPhoneAddrId").val();
                if(eInAddr==""||eInAddr==null){
                    var mpr = "^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0-9]|17[0-9])\\d{8}$";
                    isValid = p.match(mpr);
                    if (!isValid) {
                        /* 手机号格式不正确 */
                        msg = $("#eInvoiceInvalidMsg2");
                        if (msg.hasClass("hid")) {
                            msg.removeClass("hid");
                            if (showAlert) {
                                alert(msg.html());
                            }
                        }
                        msg = $("#eInvoiceInvalidMsg1");
                        if (!msg.hasClass("hid")) {
                            msg.addClass("hid");
                        }
                    }
                }else {
                    isValid=true;
                }
            }

            return isValid;
        },
        /* 验证地区是否支持电子发票 */
        fCheckDistrictAllowEInvoice : function() {
            var district = $("#receivingDistrict").val();
            district = $.trim(district + "");
            if ("" == district) {
                /* 区域编码为空不支持电子发票 */
                oEInvoice.fSetIsAllowEInvoice(false);
                return;
            }
            /* ajax请求判断地区是否支持电子发票 */
            $.ajax({
                url : "/order/checkDistrict.sc",
                data : "district=" + district,
                async : false,
                dataType : "text",
                success : function(d) {
                    oEInvoice.fSetIsAllowEInvoice("1" == d);
                },
                error : function() {
                    oEInvoice.fSetIsAllowEInvoice(false);
                }
            });
        },
        /* 设置是否支持电子发票 */
        fSetIsAllowEInvoice : function(y) {
            if (y) {
                /* 显示电子发票入口 */
                $("#diveInvoice").show();
            } else {
                /* 设置不开电子发票 */
                $("#einvc").removeAttr("checked");
                /* 关闭电子发票下拉层 */
                $('.eInvoiceBd').addClass('none');
                /* 隐藏电子发票入口 */
                $("#diveInvoice").hide();
            }
        },
        /* 验证开发票 */
        fValid : function(showAlert) {
            var y = oEInvoice.fNeedEInvoice();
            if (!y) {
                return true;
            }
            y = oEInvoice.fValidTitle(showAlert);
            if (!y) {
                return false;
            }
            y = oEInvoice.fValidMobilePhone(showAlert);
            return y;
        },
        fValidTitle : function(showAlert) {
            var y = oEInvoice.fNeedEInvoice();
            if (!y) {
                return true;
            }
            var errorMsg = "你输入的发票抬头信息有误，请重新输入";

            var t = $("#eInvoiceTitle").val();
            /* 隐藏手机验证出错信息 */
            var $msg = $("#eInvoiceInvalidMsg3");
            if (!$msg.hasClass("hid")) {
                $msg.addClass("hid");
            }

            t = $.trim(t + "");
            var isValid = false;
            /* 抬头为空 */
            if (t == "") {
                isValid = true;
            } else {
                var mpr = "^[ a-zA-Z\一-\龥]{1,}$";
                isValid = t.match(mpr);
                if (!isValid) {
                    if ($msg.hasClass("hid")) {
                        $msg.removeClass("hid");
                    }
                    if (showAlert) {
                        alert(errorMsg);
                    }
                }
            }
            $("#eInvoiceTitle").val(t);
            return isValid;
        },
        /*修改*/
        fEdit:function(){
            $("#eInvoicePhone").val('');
            $("#eInvoicePhone").show();
            $("#eInPhoneSpan").hide();
            $("#eInbtnEdit").hide();
            $("#eInbtnSubmit").show();
            $("#eInbtnCancel").show();
            /*备份*/
            $("#eInPhoneAddrIdBak").val($("#eInPhoneAddrId").val());
            $("#eInPhoneAddrId").val("");
        },
        /*提交*/
        feInSubmit:function(){
            var p = $("#eInvoicePhone").val();
            /* 隐藏手机验证出错信息 */
            var msg = $("#eInvoiceInvalidMsg1");
            if (!msg.hasClass("hid")) {
                msg.addClass("hid");
            }
            msg = $("#eInvoiceInvalidMsg2");
            if (!msg.hasClass("hid")) {
                msg.addClass("hid");
            }
            p = $.trim(p + "");
            var isValid = false;
            /* 手机号为空 */
            if (p == "") {
                isValid = false;
                msg = $("#eInvoiceInvalidMsg1");
                if (msg.hasClass("hid")) {
                    msg.removeClass("hid");
                }
                msg = $("#eInvoiceInvalidMsg2");
                if (!msg.hasClass("hid")) {
                    msg.addClass("hid");
                }
            } else {
                var mpr = "^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0-9]|17[0-9])\\d{8}$";
                isValid = p.match(mpr);
                if (!isValid) {
                    /* 手机号格式不正确 */
                    msg = $("#eInvoiceInvalidMsg2");
                    if (msg.hasClass("hid")) {
                        msg.removeClass("hid");

                    }
                    msg = $("#eInvoiceInvalidMsg1");
                    if (!msg.hasClass("hid")) {
                        msg.addClass("hid");
                    }
                }
            }
            if(isValid){
                $("#eInPhoneSpan").html($("#eInvoicePhone").val());
                $("#eInvoicePhone").hide();
                $("#eInPhoneSpan").show();
                $("#eInbtnEdit").show();
                $("#eInbtnSubmit").hide();
                $("#eInbtnCancel").hide();
                $("#eInPhoneAddrId").val('');
            }
        },
        /*取消*/
        feInCancel:function(){
            $("#eInvoicePhone").val($("#eInPhoneSpan").html());
            $("#eInvoicePhone").hide();
            $("#eInPhoneSpan").show();
            $("#eInbtnEdit").show();
            $("#eInbtnSubmit").hide();
            $("#eInbtnCancel").hide();
            /*还原*/
            $("#eInPhoneAddrId").val($("#eInPhoneAddrIdBak").val());
            oEInvoice.fValidMobilePhone(false);
        }

    };
    /* 将操作对象暴露给$ */
    $.oEInvoice = oEInvoice;
})($);

function eInvoiceParam() {
    var param = "&tt=1";
    var eInvShow = $("#diveInvoice").size() > 0;
    if (eInvShow) {
        param += "&eInvShow=1";
        var districtSuport = $("#diveInvoice:visible").size() > 0;
        if (districtSuport) {
            param += "&districtSuport=1";
        }
        var y = $("#einvc:checked").size() > 0;
        if (y) {
            param += "&needEInvoice=1";
            // 抬头
            param += "&eInvoiceTitle="
                + encodeURI(encodeURI($("#eInvoiceTitle").val()));
            // 收票人手机
            param += "&eInvoicePhone=" + $("#eInvoicePhone").val();
        }
    }
    return param;
}
//切换地址查询出身份证信息
function getCardsInfo(conName){
    conName = $.trim(conName);
    if(YouGou.Util.isEmpty(conName)){
        conName = $('.curr .conName').text();
    }
    $(".padd_left").text(conName);
    $("#subCardInfo_tips").removeClass("errorHint").text("");

    //发送请求
    $.ajax({
        type : 'post',
        async : false,
        dataType : "json",
        data : {conName : conName},
        url : '/order/getCardsInfo.sc?r='+ Math.random(),
        success : function(d) {
            if(d.state =="success"){
                var relDiv = $(".customs_info").find("div .rel");
                if(d.data.length == 0){	//没有验证记录
                    isThanOneCardsInfo = 0;
                    if(relDiv.length > 0){	//如果从下拉类型切换过来
                        relDiv.remove();
                        $("#modify_card").remove();
                        $("#card_no").after('<input type="text" maxlength="18" name="idcard_text" placeholder="请填写收货人身份证号" class="idcard_text"  value="" />');
                    }
                    $(".veriry_tip").removeClass("veriry_tip").addClass("mess_tip").find(".corg").text("根据海关要求，购买境外商品需提供收货人真实姓名及身份证号码，请如实填写。");
                    $(".idcard_text").attr("disabled",false).attr("readOnly",false).attr("id","").val("");
                    $("#modify_card").remove();
                    $("#save_butten").css("display","block");

                }else if(d.data.length == 1){	//有一条验证记录
                    isThanOneCardsInfo = 0;
                    var cardsInfo = d.data[0];
                    if(relDiv.length > 0){	//如果从下拉类型切换过来
                        relDiv.remove();
                        $("#card_no").after('<input type="text" maxlength="18" name="idcard_text" class="idcard_text" placeholder="请填写收货人身份证号" id="'+cardsInfo.id+'" value="'+cardsInfo.cardNo+'" readonly/>');
                    }
                    $("#modify_card").remove();
                    if(cardsInfo.checkedFlag == 2){
                        $(".mess_tip").removeClass("mess_tip").addClass("veriry_tip").find(".corg").text("此身份证信息已通过验证。");
                    }else{
                        $(".idcard_text").after('<a href="javascript:;" class="cblue upda_a" id="modify_card">修改</a>');
                        $(".veriry_tip").removeClass("veriry_tip").addClass("mess_tip").find(".corg").text("此身份证号和收货人姓名不一致，请修改。");
                    }
                    $("#save_butten").css("display","none");
                    if($(".customs_info").find(".placeholder").length > 0){	//兼容ie
                        $(".customs_info").find(".placeholder").remove();
                    }
                    $("#modify_card").bind("click",modifyInfo);
                    $(".idcard_text").attr("disabled",true).attr("readOnly",true).val(cardsInfo.cardNo);
                    $(".idcard_text").attr("id",cardsInfo.id);

                }else if(d.data.length > 1){	//存在多条验证记录
                    isThanOneCardsInfo = 1;
                    $(".mess_tip").removeClass("mess_tip").addClass("veriry_tip").find(".corg").text("此身份证信息已通过验证。");
                    $(".idcard_text").remove();
                    $("#save_butten").css("display","none");
                    relDiv.remove();
                    var tempMap = new YouGou.Util.Map();
                    var tempArr = new Array();
                    var str = '<select class="idcard_select" style="width:170px" id="idcard_select">';
                    for(var i=0;i<d.data.length;i++){
                        str += '<option value='+d.data[i].id+'>'+d.data[i].cardNo+'</option>';
                        tempMap.put("card_"+d.data[i].id,{"id":d.data[i].id,"cardNo":d.data[i].cardNo});
                        tempArr.push(d.data[i].id);
                    }
                    str += '</select>' ;
                    cardsMap = tempMap;
                    cardsArr = tempArr;
                    $("#card_no").after(str);
                    beautitySelect();
                    relDiv = $(".customs_info").find("div .rel");
                    $("#modify_card").remove();//重新绑定方法
                    relDiv.after('<a href="javascript:;" class="cblue upda_a" id="modify_card">修改</a>');
                    oneCardNo = d.data[0].cardNo;
                    oneCardId = d.data[0].id;
                    $("#modify_card").bind("click",modifySelectToInput);
                }
            }else if(d.state =="error"){
                relDiv.remove();
                if($(".idcard_text").length > 0){
                    $(".idcard_text").val("");
                    $(".idcard_text").attr("id","").attr("readOnly",true);
                }else{
                    $("#card_no").after('<input type="text" maxlength="18"  name="idcard_text" class="idcard_text" placeholder="请填写收货人身份证号" value="" readOnly/>');
                }
                $("#modify_card").remove();
                $("#save_butten").css("display","none");
                alert(d.msg);
            }
        }
    });
}
function saveCardInfo(){
    $("#subCardInfo_tips").removeClass("errorHint").text("");
    var cardId = $(".idcard_text").attr("id");
    var cardNo = $(".idcard_text").val();
    var cardName = $(".padd_left").text();
    //发送请求
    $.ajax({
        type : 'post',
        async : false,
        dataType : "json",
        data : {cardNo:cardNo, cardId:cardId, cardName:cardName, authToken:$("#authToken").val()},
        url : '/order/saveOrModifyCardInfo.sc?r='+ Math.random(),
        success : function(d) {
            if(d.state == "success"){
                //去掉保存按钮，新增修改按钮
                $("#save_butten").css("display","none");
                $(".mess_tip").removeClass("mess_tip").addClass("veriry_tip").find(".corg").text("此身份证信息已通过验证。");
                $("#subCardInfo_tips").removeClass("errorHint").removeClass("successHint");
                //$(".idcard_text").after('<a href="javascript:;" class="cblue upda_a" id="modify_card">修改</a>');
                if(YouGou.Util.isEmpty(cardId)){
                    $(".idcard_text").attr("id",d.data.id);
                }
                if(isThanOneCardsInfo == "1"){
                    $(".idcard_text").remove();
                    var cardsList = cardsMap.valArray();
                    var str = '<select class="idcard_select" style="width:170px" id="idcard_select"><option value="'+cardId+'">'+cardNo+'</option>';
                    for(var i=0;i<cardsList.length;i++){
                        if(cardsList[i].id == oneCardId){
                            continue;
                        }
                        str += '<option value='+cardsList[i].id+'>'+cardsList[i].cardNo+'</option>';
                    }
                    str += '</select>' ;
                    $("#modify_card").before(str);
                    beautitySelect();
                    $("#modify_card").bind("click",modifySelectToInput);
                }else{
                    $("#modify_card").bind("click",modifyInfo);
                    $(".idcard_text").attr("disabled",true).attr("readOnly",true).val(cardNo);
                }
            }else{
                $("#subCardInfo_tips").addClass("errorHint").text(d.msg);
            }
        },
        error : function(d){
        }
    });
}
var beforeCard;
//一条记录时
function modifyInfo(){
    var _p = $(this).parent();
    var ipt = _p.find(".idcard_text");
    beforeCard = $(ipt).val();
    $(ipt).attr("disabled",false).attr("readOnly",false).focus().val("");
    _p.find(".p_words").css("display","block");
    $("#save_butten").show();
    $(".mess_tip").find(".corg").text("根据海关要求，购买境外商品需提供收货人真实姓名及身份证号码，请如实填写。");
    $("#subCardInfo_tips").removeClass("errorHint").removeClass("successHint").text("");
    $(this).remove();
    if($(".customs_info").find(".placeholder").length == 0){	//兼容ie
        comPlaceholder();
    }
}
//多条记录
function modifySelectToInput(){
    $(".rel").remove();
    beforeCard = oneCardNo;
    $(this).before('<input type="text" maxlength="18" name="idcard_text" class="idcard_text" id="'+oneCardId+'" value="" />');
    $(".idcard_text").focus();
    $("#save_butten").css("display","block");
    $(".veriry_tip").removeClass("veriry_tip").addClass("mess_tip").find(".corg").text("根据海关要求，购买境外商品需提供收货人真实姓名及身份证号码，请如实填写。");
    $("#subCardInfo_tips").removeClass("errorHint").text("");
    $(this).remove();
    comPlaceholder();
}
/*function validateIdCard(idCard){
 //15位和18位身份证号码的正则表达式
 var regIdCard=/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
 var result = true;
 //如果通过该验证，说明身份证格式正确，但准确性还需计算
 if(regIdCard.test(idCard)){
 if(idCard.length==18){
 var idCardWi=new Array( 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ); //将前17位加权因子保存在数组里
 var idCardY=new Array( 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ); //这是除以11后，可能产生的11位余数、验证码，也保存成数组
 var idCardWiSum=0; //用来保存前17位各自乖以加权因子后的总和
 for(var i=0;i<17;i++){
 idCardWiSum+=idCard.substring(i,i+1)*idCardWi[i];
 }

 var idCardMod=idCardWiSum%11;//计算出校验码所在数组的位置
 var idCardLast=idCard.substring(17);//得到最后一位身份证号码

 //如果等于2，则说明校验码是10，身份证号码最后一位应该是X
 if(idCardMod==2){
 if(idCardLast!="X"&&idCardLast!="x"){
 $("#subCardInfo_tips").text("身份证号码错误！");
 result = false;
 }
 }else{
 //用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
 if(idCardLast !=idCardY[idCardMod]){
 $("#subCardInfo_tips").text("身份证号码错误！");
 result = false;
 }
 }
 }
 }else{
 $("#subCardInfo_tips").text("身份证格式不正确!");
 result = false;
 }
 return result ;
 }*/
function changeConName(){
    var conName = $("#receivingName").val();
    if($("#orderForm").validate().element("#receivingName")){	//验证通过
        if($("#conPerson").length == 0){
            $("#card_no").before('<p class="p_words" id="conPerson">&nbsp;收&nbsp;货&nbsp;人：<span class="padd_left">'+conName+'</span></p>');
        }
        getCardsInfo(conName);

    }else{						//验证不通过
        $("#conPerson").remove();
        $("#modify_card").remove();
        $(".idcard_text").attr("disabled",false).attr("readOnly",false).val("");
        $("#save_butten").css("display","none");
    }
}
//美化select
function beautitySelect(){
    $('#idcard_select').jqSelect({		//美化下拉框样式
        inputId:'idcard_text',
        panelHeight:150,
        editable:false
    });
    $(".combox-ul").bind("click" , function(){
        oneCardNo = $(this).find(".hover").text();
        oneCardId = cardsArr[$(this).find(".hover").index()];
    });
}
function comPlaceholder(){
    var doc = document, inputs = doc.getElementsByTagName('input'),
        supportPlaceholder = 'placeholder' in doc.createElement('input'),
        placeholder = function(input) {
            var text = input.getAttribute('placeholder'), defaultValue = input.defaultValue;
            if (defaultValue == '') {
                input.value = text ;
                input.setAttribute("old_color", input.style.color);
                input.style.color = "#c0c0c0";
            }
            input.onfocus = function() {
                this.style.color = this.getAttribute("old_color");
                if (input.value === text) {
                    this.value = '' ;
                }
            };
            input.onblur = function() {
                if (input.value === '') {
                    this.style.color = "#c0c0c0";
                    this.value = text;
                }
            }
        };
    if (!supportPlaceholder) {
        for ( var i=0, len=inputs.length; i<len; i++) {
            var input = inputs[i], text = input.getAttribute('placeholder');

            if (input.type === 'text' && text && input.className==='idcard_text') {
                placeholder(input);
            }
        }
    }
}

/*********立即领取赠品z-index值 start************/
var target = document.getElementById("tr_td");
if(target!=null){
    var lis = target.getElementsByClassName("giftBut");
    for(var i=0; i<lis.length; i++){
        lis[i].style.zIndex = 999-i;
    }
}
/*********立即领取赠品z-index值 end************/
