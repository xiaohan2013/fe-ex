// lagou
dataHost = "a.lagou.com";

(function(i, s, o, g, r, a, m) {
    i['LgAnalytics'] = r;
    i[r] = i[r] || function() {
        (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date();
    a = s.createElement(o),
        m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m)
})(window, document, 'script', '//a.lagou.com/js/a.js', 'gatherer');

gatherer('create', 'UA-41268416-1', {'alwaysSendReferrer': true});
gatherer('send', 'pageview');

//baidu
var _bdhmProtocol = (("https:" == document.location.protocol) ? " https://" : " http://");
document.write(unescape("%3Cscript src='" + _bdhmProtocol + "hm.baidu.com/h.js%3F4233e74dff0ae5bd0a3d81c6ccf756e6' type='text/javascript'%3E%3C/script%3E"));
//google analytics
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-41268416-1', 'auto');
ga('require', 'displayfeatures');
ga('require', 'linker');
ga('send', 'pageview');

//平台统计代码click log for platform add by vee 2015-07-04
function initResumeLog(logtype, deliverId, positionId, position){

        //平台统计代码 调用函数见analytics.js add by vee 2015-07-28
        var param = {};
        param.logtype = logtype; //suc=0表成功 1表失败
        param.position = position || GetQueryString('i');
        param.orderid = deliverId;
        param.positionid = positionId;
        param.url = location.href;
        param.fromsite = document.referrer || null;
        logImgLoader('logImgSet',param);
}

function logImgLoader(id,param) {
    var time = new Date();
    param.time = time.getTime();
    param.userid = window.global.idmd5;
     //logtype-0表成功 logtype-1表失败
    var uri = 'v=1&logtype='+param.logtype+'&position='+param.position+'&orderid='+param.orderid+'&userid='+param.userid+'&positionid='+param.positionid+'&url='+param.url+'&fromsite='+param.fromsite+'&optime='+param.time;
    $(document.body).append("<img src='http://a.lagou.com/click?"+uri+"' id='"+id+"' style='position:fixed;left:-10000px;bottom:0;' />");
    $('#'+id).remove();
}
//公用函数 获取url的参数 add by vee 2015-07-04
function GetQueryString(name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)
      return  unescape(r[2]); 
    return null;
}


/**
 * _PTJ 平台统计文件
 * @author stormlu@lagou.com
 * @date 2015-08-26
 * @global window._PTJ
 */

/**
 * 使用需知：
 *
 * 使用script标签引入：
 * <script src="https://static.lagou.com/static/analysis/plat_tj.js"></script>
 *
 * 1、编码统计
 *
 * @每个需要添加编码统计的标签必须添加如下自定义属性，如没有使用此插件的默认值即可（一般为空）
 * eg: <a href="xxx" data-lg-tj-id="ADKD" data-lg-tj-no="0101" data-lg-tj-cid="gongsi"></a>
 *
 * 具体实现: 动态创建img的方法
 *
 * 编码ID规则: ADKD_序列号_版本号_内容ID_随机数
 *
 *
 * 2、GA统计
 * 使用script标签引入：
 * <script src="https://static.lagou.com/static/analysis/analytics.js"></script>
 *
 * @每个需要添加GA统计的标签需添加如下自定义属性，其中data-lg-gatj-method,data-lg-gatj-msgtype,data-lg-gatj-val为可选属性
 * eg: <a href="xxx" data-lg-gatj-method="send" data-lg-gatj-msgtype="event" data-lg-gatj-msg="dashboard,去筛选,number" data-lg-gatj-val="2"></a>
 *
 * 参数释义详见 https://developers.google.com/analytics/devguides/collection/analyticsjs/events
 **/


(function() {

    /**
     * 方法1：请求目标地址
     * @type {Object}
     */
    var REMOTE = {

        server: 'https://a.lagou.com/track'

    };

    /**
     * 编码ID规则
     *
     * _PID ：ADKD
     * _PNO ：序列号
     * _PV ：版本号
     * _PCONTENTID ：内容ID
     * _PRANDOM ：随机数
     *
     * @type {Object}
     */
    var _PID = '',
        _PNO = '',
        _PV = 0,
        _PCONTENTID = '',
        _PRANDOM = '',
    //GA统计
        _GAMETHOD = '',
        _GAMSGTYPE = '',
        _GATJ = '',
        _GATJVAL = 0,
        v = 1,
        t = 'a',
        dl = window.location.href,
        dr = document.referrer,
        dt = document.title;

    /**
     * 以https://开头的正则
     * @type {Object}
     */
    //var reg_HTTP = /https:\/\/([^\/]+)\//i;
    /*
     v  版本号
     t  类型
     取值
     含义
     button button
     a  a标签

     dl 当前URL
     dr Referer
     dt 当前Title
     aid  追踪ID
     */
    /**
     * 给全部html标签注册事件
     *
     * 处理浏览器兼容问题
     */
    var _ELS = document;

    if (_ELS.addEventListener) {

        _ELS.addEventListener('click', postEncodingID, false);

    } else if (_ELS.attachEvent) {

        _ELS.attachEvent('onclick', postEncodingID);

    }

    /**
     * 注册事件处理
     *
     * @param {Object} opt 请求参数
     */

    function postEncodingID(e) {

        var target = e.target || e.srcElement;
        var arr_GATJ = [];

        while(target && target.getAttribute){
            if(target.getAttribute('data-lg-tj-id') || target.getAttribute('data-lg-gatj-msg')){
                break;
            }else{
                target=target.parentNode;
            }
        };
        if(!target || !target.getAttribute){
            return;
        };

        try {

            _PID = (target.getAttribute('data-lg-tj-id') || 'idnull').trim();
            _PNO = (target.getAttribute('data-lg-tj-no') == 'idnull' ? 'idnull' : (target.getAttribute('data-lg-tj-no') || 'idnull')).trim();
            _PCONTENTID = (target.getAttribute('data-lg-tj-cid') == 'idnull' ? 'idnull' : (target.getAttribute('data-lg-tj-cid') || 'idnull')).trim();
            _PRANDOM = getRandom();
            //GA统计
            _GAMETHOD = (target.getAttribute('data-lg-gatj-method') || 'send').trim();
            _GAMSGTYPE = (target.getAttribute('data-lg-gatj-msgtype') || 'event').trim();
            _GATJ = (target.getAttribute('data-lg-gatj-msg') || '').trim();
            _GATJVAL = parseInt(target.getAttribute('data-lg-gatj-val') || 0);
            //GA统计
            if (_GATJ && typeof ga == 'function') {
                arr_GATJ.push(_GAMETHOD, _GAMSGTYPE);
                arr_GATJ = arr_GATJ.concat(_GATJ.split(','));
                !!_GATJVAL && arr_GATJ.push(_GATJVAL);
                ga.apply(null, arr_GATJ);
            };

            if (_PID != 'idnull') {

                var _params = {};
                _params.v = v;
                _params.t = target.tagName.toLocaleLowerCase();
                _params.dl = dl.replace('#','&');
                _params.dr = dr;
                _params.dt = dt;
                _params.aid = [_PID, _PNO, _PV, _PCONTENTID, _PRANDOM].join('_');

                imgGET(_params);

            } else {

                return;

            }

        } catch (e) {}

    }

    /**
     * 发送请求给远程服务
     *
     */
    function imgGET(params) {

        var _img = new Image();
        paramsArr = [];
        for (var item in params) {
            if (typeof item == 'string') {
                paramsArr.push(item + '=' + params[item]);
            }
        }
        _img.src = REMOTE.server + '?' + paramsArr.join('&');

    }

    /**
     * 返回随机数
     */
    function getRandom(digit) {
        window._CASH_RANDOM ? '' : window._CASH_RANDOM = {};
        var _cash_random = window._CASH_RANDOM || {},
            _digit = digit || 4,
            _random = getRandomSimple();

        while (_cash_random[_random]) {
            _random = getRandomSimple();
            if (!_cash_random[_random]) break;
        }

        window._CASH_RANDOM[_random] = _random;

        return _random;

        //随即返回随机数  --  可能重复
        function getRandomSimple() {
            var random = '';
            for (var i = 0; i < _digit; i++) {
                var r = Math.floor(Math.random() * 10);
                random += r.toString();
            }
            return random.toString();
        }
    }

    /**
     * 使用_PTJ全局变量对外
     * 调用方法 _PTJ.postEncodingID
     * @type {Object}
     */
    window._PTJ = window._PTJ || {

            postEncodingID: postEncodingID

        }


})();