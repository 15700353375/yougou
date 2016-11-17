(function ($) {

    var _isIE6 = window.VBArray && !window.XMLHttpRequest;

    function init(target) {
        var state = $.data(target, 'select'),
            opts = state.options,
            _t = $(target),
            _selOpt = $('option:selected', target),
            _val = _selOpt.text(),
            _ph = opts.panelHeight,
            wrap, ul, _ipt, _w,iptId;

        _t.wrap($('<div class="rel combox sinput"></div>')).hide();
        wrap = _t.parent();
        iptId=opts.inputId?opts.inputId:"";
        wrap.append('<input name='+iptId+' id='+iptId+' class="combox-ipt sinput" type="text" value="' + _val + '" /><i class="combox-arr"></i>');
        ul = $('<ul tabIndex="0" hidefocus="true" class="combox-ul">');
        _ipt = wrap.find('.combox-ipt');
        _w = opts.width ? opts.width : _t.width();
        wrap.width(_w);
        _ipt.width(_w - 24);
        wrap.height(_ipt.outerHeight());
        ul.css({top: _ipt.outerHeight()});
        if (_ph) {
            ul.css({'max-height': _ph});
            if (_isIE6) {
                ul.height(_ph);
            }
        }
        if (!opts.editable) {
            _ipt.attr('readonly', true);
        }
        ul.appendTo(wrap);

        bindEvent(target);
    }

    function getItems(target, keyword) {
        var _t = $(target);
        var lis = [];
        var ops = $('option', _t);
        for (var i = 0; i < ops.length; i++) {
            var _txt = $.trim($(ops[i]).text());
            if (keyword == "" || !keyword || (keyword && keyword != "" && _txt.toLowerCase().indexOf(keyword.toLowerCase()) >= 0)) {
            	if(_txt!=""){
            		lis.push('<li>' + _txt + '</li>');
            	}
            }
        }
        return lis;
    }

    function setScrollTop(target, index) {
        var _t = $(target);
        var ul = _t.parent().find('ul');
        var visbleNum = parseInt(ul.height() / 18);
        if (index >= visbleNum - 2) {
            ul.scrollTop((index - visbleNum + 2) * 25);
        }
    }


    function setScroll(target, v) {
        var _t = $(target);
        var ul = _t.parent().find('ul');
        var idx = $('.hover', ul).index();
        var n = idx + v;
        if (n >= $('option', _t).length || n < 0) {
            return;
        }

        _t.find('option').eq(n).attr('selected', true);
        ul.find('li').removeClass('hover').eq(n).addClass('hover');
        setScrollTop(target, n);
    }

    function selectItem(target) {
        var _t = $(target);
        var _p = _t.parent();
        var ul = _p.find('ul');
        var ipt = _p.find('.combox-ipt');
        var li = $('li.hover', ul);
        var _txt = $.trim(li.text());
        $.each($('option', _t), function () {
            var __this = $(this);
            if ($.trim(__this.text()) == _txt) {
                __this.attr('selected', true);
            }
        });
        ipt.val(_txt);
        ul.hide();
        if (_isIE6) {
            $('select').css({'visibility': 'visible'});
        }
    }

    function bindEvent(target) {
        var state = $.data(target, 'select');
        var opts = state.options;
        var _t = $(target);
        var _p = _t.parent();
        var ul = _p.find('ul');
        var ipt = _p.find('.combox-ipt');

        _p.bind('mouseover', function (e) {
            var t = $(e.target);
            if (t[0].nodeName.toLowerCase() == "li") {
                t.addClass('hover').siblings().removeClass('hover');
            }
        });

        _p.bind('mouseleave', function () {
            ul.hide();
        });

        _p.bind('click', function (e) {
            var t = $(e.target);
            if (t[0].nodeName.toLowerCase() == "li") {
                selectItem(target);
            }

            if (t.hasClass('combox-arr')) {
                if (ul.css('display') == "block") {
                    ul.hide();
                    if (_isIE6) {
                        $('select').css({'visibility': 'visible'});
                    }
                } else {
                    ul.empty().append(getItems(target).join(''));
                    ul.show().focus();
                    var idx = $('option:selected', target).index();
                    ul.find('li').removeClass('hover').eq(idx).addClass('hover');
                    setScrollTop(target, idx);
                    if (_isIE6) {
                        $('select').css({'visibility': 'hidden'});
                    }
                }
            }

        });

        if (opts.editable) {
            ipt.keyup(function (event) {
                if (event.keyCode == 40 || event.keyCode == 38 || event.keyCode == 13 || event.keyCode == 27) {

                    return;
                }
                var _this = $(this);
                ul.empty();
                var lis = getItems(target, _this.val());
                if (lis.length > 0) {
                    ul.append(lis.join(''));
                    ul.show();
                } else {
                    ul.hide();
                }
            });
        }


        ul.keydown(function (event) {
            switch (event.keyCode) {
                case 38: // up
                    setScroll(target, -1);
                    event.preventDefault();
                    break;
                case 40: // down
                    setScroll(target, 1);
                    event.preventDefault();
                    break;
                case 27: //escape
                    ul.hide();
                    break;
                case 13://enter
                    selectItem(target);
                    break;
            }
        });

        ipt.keydown(function (event) {
            switch (event.keyCode) {
                case 40: // down
                    ul.focus();
                    setScroll(target, 1);
                    return false;
                    break;
            }
        });
    }

    function getValue(target) {
        var _t = $(target);
        var _p = _t.parent();
        var ipt = _p.find('.combox-ipt');
        return $.trim(ipt.val());
    }

    function setValue(target, v) {
        var _t = $(target);
        var _p = _t.parent();
        var ipt = _p.find('.combox-ipt');
        ipt.val(v);
    }

    $.fn.jqSelect = function (options, param) {

        if (typeof options == "string") {
            return $.fn.select.methods[options](this, param);
        }


        return this.each(function () {
            var state = $.data(this, 'select'),
                opts;
            if (state) {
                opts = $.extend(state.options, options);
                state.options = opts;
            } else {
                $.data(this, 'select', {
                    options: $.extend({}, options)
                });
                init(this);
            }
        });
    }
    

    $.fn.select.methods = {
        getValue: function (jq) {
            return getValue(jq);
        },
        setValue: function (jq, param) {
            setValue(jq, param);
        }
    }

})(jQuery);