(function () {
    var _o_window = window, _o_document = document;
    var _undefined = undefined, _null = null, _empty = "";
    var _substring = "substring", _split = "split", _length = "length", _join = "join", _str_indexOf = "indexOf";
    if (typeof YGUnion == "undefined") {
        YGUnion = {version: "1.0", Biz: {}}
    }
    YGUnion.Biz = {Common: {_unionKey: ["wid", "cid","bid","qihoo_id","ext","qid","baidu_key"], writeCookie: function () {
        var baidu_key_reg = new RegExp("(^|&)baidu_key=([^&]*)(&|$)", "i");
        var utm_source_reg = new RegExp("(^|&)utm_source=([^&]*)(&|$)", "i");
        var baidu_key = window.location.search.substr(1).match(baidu_key_reg);
        var utm_source = window.location.search.substr(1).match(utm_source_reg);
        if (utm_source != null&&baidu_key==null){
            var exp = new Date();
            exp.setTime(exp.getTime() - 1);
            var arr = document.cookie.match(new RegExp("(^| )__ygcpsp=([^;]*)(;|$)"));
            if(arr!=null) document.cookie= name + "="+arr+";expires="+exp.toGMTString();
        }

        var b = _o_document.location.search;
        if (undefined != b && b != "") {
            var e = [];
            b = b[_substring](1);
            var a = b[_split]("&");
            for (var d = 0; d < a[_length]; d++) {
//                var c = a[d][_split]("=");
                try{
                var key=a[d][_substring](0,a[d][_str_indexOf]("="));
                var value=a[d][_substring](a[d][_str_indexOf]("=")+1);
//                if (this.inArray(this._unionKey, c[0])) {
                if (this.inArray(this._unionKey, key)) {
                    if (e != _empty) {
                        e += "|"
                    }
//                    e += c[0] + "=" + escape(c[1])
                    e += key + "=" + escape(value)
                }
                }catch(ex){

                }
            }
            if (e != _empty) {
                var f = new Date();
                f.setTime(f.getTime() + 1000 * 60 * 60 * 24);
                _o_document.cookie = "__ygcpsp=" + escape(e) + ";expires=" + f.toUTCString() + ";domain=" + _o_document.domain[_substring](_o_document.domain[_str_indexOf](".")) + ";path=/";
                _o_document.cookie = "cps=null;expires=-1;domain=" + _o_document.domain[_substring](_o_document.domain[_str_indexOf](".")) + ";path=/"
            }
        }
    }, inArray: function (a, c) {
        var b = String.fromCharCode(2);
        var d = new RegExp(b + c + b);
        return(d.test(b + a.join(b) + b))
    }}};
    YGUnion.Biz.Common.writeCookie();
})();