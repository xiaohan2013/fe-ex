// JavaScript Document
var imgArray = [
    "images/bg4.mp3",
    "images/logo.png",
    "images/bwave.png",
    "images/circle.png",
    "images/music.png",
    "images/next.png",
    "images/page0_info.png",
    "images/page0_subtitle.png",
    "images/page0_title.png",
    "images/page1_build.png",
    "images/page2_bubble.png",
    "images/page2_map1.png",
    "images/page2_map2.png",
    "images/page3_elem.png",
    "images/page3_red.png",
    "images/page4_plane.png",
    "images/page4_plane0.png",
    // "images/page4_plane1.png",
    // "images/page4_plane2.png",
    "images/page4_plane3.png",
    "images/page4_speed.png",
    // "images/page4_speed2.png",
    "images/page5_bdialog.png",
    "images/page5_curve.png",
    "images/page5_file.png",
    "images/page5_frontFile.png",
    "images/page5_pen.png",
    "images/page5_person.png",
    "images/page5_sdialog.png",
    // "images/page5_wifi.png",
    "images/page5_wifi2.png",
    "images/page6_bubble.png",
    "images/page6_file.png",
    "images/page6_logo.png",
    "images/page6_resume.png",
    "images/share.png",
    "images/swave.png"
];
var now = 0;
$.ajax({
    type:'get',
    url:'https://activity.lagou.com/activityapi/common/getNow',
    success:function(data){
        now = data.content;
    }
});
// 资源加载
var Loader = function(){
    this.currProgress = 0;  // 当前加载进度
    this.isCompleted = false; // 判断是否加载完毕
    this.total = 100;  // 最大值100

    var loaded = 0;

    //var content = document.getElementById('content');
    // var number = document.getElementsByClassName('number')[0];
    //var w = document.getElementsByClassName('progress')[0].offsetWidth / 20;
        this.Loading = function(imgArray,success){
        var self = this;
        for( var i = 0 ; i < imgArray.length; i++ ){
            var ext = imgArray[i].substring(imgArray[i].lastIndexOf('.')).toLowerCase();
            if( ext == '.png' || ext == '.jpg' || ext == '.jpeg' || ext == '.gif' ){
                var img = new Image();
                img.onload = function(){
                    loaded ++;
                    //self.currProgress = loaded / imgArray.length * 100;
                    //content.style.width = self.currProgress / 100 * w+"rem";
                    //number.innerHTML = (self.currProgress).toFixed(1)+"%";
                    if( loaded == imgArray.length ){
                        success();  // 回调函数
                    }
                };
                img.onerror = function(){
                    loaded ++;
                    if( loaded == imgArray.length ){
                        success();  // 回调函数
                    }
                };
                // img.src = ctx + "/template/1024/" + imgArray[i];
                img.src = imgArray[i];
            }else{
                this.loadMusic(imgArray[i]);
            }
        }
    };
    this.loadMusic = function(path){
        $.ajax({
            type: 'get',
            url: path,
            data: {},
            async:false,   // false 同步  true  异步
            success: function (data) {
                loaded++;
                if( loaded == imgArray.length ){
                    success();  // 回调函数
                }
                //console.log("success");
            },
            error: function (xhr, type)  {
                loaded++;
                if( loaded == imgArray.length ){
                    success();  // 回调函数
                }
                //console.log('error');
            }
        })
    };
    this.success = function(){
        console.log("加载完毕");
        //init.initDate();  // 设置时间
        // init.page1Play();  // 播放音乐
        init(now);

        //$('.page5').removeClass('hidden');
        //$('.page5 .message').removeClass('hidden');
        //$('.page5 .messBG').addClass('person').removeClass('hidden');
        //init.nextAnimate();
    };
    this.loadLoading = function(imgArray,obj){
        var img = new Image();
        img.onload = function(){
            obj.Loading(imgArray,obj.success);
        };
        img.onerror = function(){
            obj.Loading(imgArray,obj.success);
        };
        // img.src = ctx + "/template/1024/" + imgArray[0];
        img.src = imgArray[0];
    };
};
//window.onload = function(){
var loader = new Loader();
loader.loadLoading(imgArray,loader);
//};



var data={
    direction:{
        x:"down",
        y:"down"
    },
    start:{ x:0, y:0 },
    end:{ x:0, y:0 },
    now:0,
    last:0, 
    page:{
        up:{
            last:"moveULast",
            now:"moveUNow",
        },
        down:{
            last:"moveDLast",
            now:"moveDNow",
        },
    },
    main:"",
    pageLength:$(".page").length,
    isMoving:false,
    space:0
};
/**init************************************************************ */
function init(now){
    $('.loading').addClass('hide');
    $('.page0').removeClass('hide').addClass('page-current');

    var startTime = '2017/02/13 00:00:00',
        start = 0,
        timeData = {};
    if(now == 0 || !now){
        now = new Date().getTime();
    }
    start = new Date(startTime).getTime();
    data.space = start - now;
    timeData = getDateData(data.space);
    setTime(timeData);

    setInterval(function(){
        data.space -= 1000;
        setTime(getDateData(data.space));
    },1000);
    initEvent();
    // initMusic();
    initLink();
}
initMusic();
function getDateData(space){
    var timeData = {
            d:'0',
            h:'00',
            m:'00',
            s:'00'
        },
        ss = 1000,
        mm = ss * 60,
        hh = mm * 60,
        dd = hh * 24;
    if(space > 0){
        timeData.d = Math.floor(space / dd);
        timeData.h = Math.floor((space % dd) / hh);
        timeData.m = Math.floor(((space % dd) % hh) / mm);
        timeData.s = Math.floor((((space % dd) % hh) % mm) / ss);
        timeData.d = timeData.d < 10 ? timeData.d : timeData.d % 10;
        timeData.h = timeData.h < 10 ? '0'+timeData.h : timeData.h;
        timeData.m = timeData.m < 10 ? '0'+timeData.m : timeData.m;
        timeData.s = timeData.s < 10 ? '0'+timeData.s : timeData.s;
    }
    return timeData;
}

function setTime(data){
    var html = '<div class="time-days">'+
                    '<p class="days">'+data.d+'</p>'+
                    '<p class="chinese">天</p>'+
                '</div>'+
                '<div class="sprit">/</div>'+
                '<div class="time-hours">'+
                    '<p class="hours">'+data.h+'</p>'+
                    '<p class="chinese">时</p>'+
                '</div>'+
                '<div class="sprit">/</div>'+
                '<div class="time-minutes">'+
                    '<p class="minutes">'+data.m+'</p>'+
                    '<p class="chinese">分</p>'+
                '</div>'+
                '<div class="sprit">/</div>'+
                '<div class="time-seconds">'+
                    '<p class="seconds">'+data.s+'</p>'+
                    '<p class="chinese">秒</p>'+
                '</div>';

    $('.page0 .time').html(html);
}
/**initEvent************************************************************ */
function initEvent(){
    initPageMoveEvent();
    // initLineCanvas();
    // initSVG();
}
/**initPageMoveEvent start************************************************************ */
function initPageMoveEvent(){
    var startMoving = false;
    document.addEventListener("touchstart",function(ev){
        var touch = ev.targetTouches[0];
        data.start.x = touch.clientX;
        data.start.y = touch.clientY;
    },false);
    document.addEventListener("touchmove",function(ev){
        ev.preventDefault();
        var touch = ev.targetTouches[0];
        data.end.x = touch.clientX;
        data.end.y = touch.clientY;
        startMoving = true;
    },false);
    document.addEventListener("touchend",function(ev){
        data.direction.x = (data.end.x - data.start.x) > 0 ? "down" : (data.end.x - data.start.x) < 0 ? "up" : "down";
        data.direction.y = (data.end.y - data.start.y) > 0 ? "down" : (data.end.y - data.start.y) < 0 ? "up" : "down";
        if(startMoving && Math.abs(data.end.y - data.start.y) > 20){
            if(!data.isMoving){
                data.isMoving = true;
                pageMove();
                data.end.x = 0;
                data.end.y = 0;
                data.start.x = 0;
                data.start.y = 0;
            }
            startMoving = false;
        }
    },false);
}

function pageMove(){;
    data.last = data.now;
    var od = "down";
    if(data.direction.y == "up"){
        data.now++;
    }else{
        data.now--;
        od = "up";
    }
    if(data.now >= data.pageLength){
        // data.now = 0;
        data.last = data.pageLength - 2;
        data.now = data.pageLength - 1;
        data.isMoving = false;
        return;
    }
    if(data.now <= -1){
        // data.now = data.pageLength - 1;
        data.last = 0;
        data.now = 0;
        data.isMoving = false;
        return;
    }
    $(".page .page-center").removeClass(data.page[data.direction.y].now+" "+data.page[data.direction.y].last +" "+data.page[od].now+" "+data.page[od].last);
    $(".page").removeClass('opacityHide opacityShow pageCurrent').addClass("hide");
    
    $(".page"+data.now).removeClass("hide").addClass("opacityShow pageCurrent");
    $(".page"+data.now+" .page-center").addClass(data.page[data.direction.y].now);

    $(".page"+data.last).removeClass("hide").addClass("opacityHide");
    $(".page"+data.last+" .page-center").addClass(data.page[data.direction.y].last);

    setTimeout(function(){
        $(".page .page-center").removeClass(data.page[data.direction.y].now+" "+data.page[data.direction.y].last +" "+data.page[od].now+" "+data.page[od].last);
        $(".page"+data.last).addClass("hide").remove("opacityHide");
        $(".page"+data.now).removeClass("hide opacityShow");

        if(data.now == 0){
            $('.bgmusic').addClass('hide');
        }else{
            $('.bgmusic').removeClass('hide');
        }
        data.isMoving = false;
    },500);
};
/**initPageMoveEvent end************************************************************ */

var fontSize = parseFloat(document.documentElement.style.fontSize);
function getRem(value){
    return value / (750 / 16) * fontSize;
}

function initLineCanvas(){
    var canvas = document.getElementById('lineCanvas'),
        ctx = canvas.getContext('2d'),
        width = document.documentElement.clientWidth,
        height = document.documentElement.clientHeight;
    
    canvas.width = width;
    canvas.height = height;

    ctx.strokeStyle = 'rgba(255,255,255,0.5)';
    ctx.lineWidth = getRem(5);

    ctx.beginPath();
    ctx.moveTo(getRem(588),getRem(265));
    ctx.lineTo(getRem(599),getRem(265));
    ctx.quadraticCurveTo(getRem(606),getRem(262),getRem(613),getRem(273));
    ctx.quadraticCurveTo(getRem(614),getRem(294),getRem(616),getRem(308));
    ctx.lineTo(getRem(588),getRem(316));
    ctx.quadraticCurveTo(getRem(570),getRem(323),getRem(552),getRem(328));
    ctx.bezierCurveTo(getRem(532),getRem(338),getRem(539),getRem(348),getRem(532),getRem(348));
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(getRem(520),getRem(347), getRem(6), 0, Math.PI * 2, true);  
    ctx.stroke();
}

function initSVG(){
    var svg1 = document.getElementById('lineSVG'),
        svg2 = document.getElementById('lineSVG2');
    
    if(htmlStatus == 1){  // 宽
        var scaleX = (RC.w / RC.h * GC.h) / GC.w,
            scaleY = 1,
            w = GC.w * scaleX;
        svg1.style.transform = 'scale('+scaleX+','+scaleY+')';
        svg1.style.webkitTransform = 'scale('+scaleX+','+scaleY+')';
        svg1.style.margin = '0 0 0 -'+w/2+'px';

        svg2.style.transform = 'scale('+scaleX+','+scaleY+')';
        svg2.style.webkitTransform = 'scale('+scaleX+','+scaleY+')';
        svg2.style.margin = '0 0 0 -'+w/2+'px';
    }
}

function initSVG2(){
    var 
        svg1 = document.getElementById('lineSVG'),
        // svg = document.getElementById('lineSVG0'),
        svg2 = document.getElementById('lineSVG2'),
        scaleX = (16 / lastSize) * (GC.w / RC.w),
        scaleY = scaleX;//htmlStatus == 1 ? (GC.w / RC.w) * (lastSize / 16 ) : (GC.h / RC.h);
    // setSVG(svg,scaleX,scaleY);
    setSVG(svg1,scaleX,scaleY);
    setSVG(svg2,scaleX,scaleY);
}

function setSVG(svg,scaleX,scaleY){
    svg.style.transform = 'scale('+scaleX+','+scaleY+')';
    svg.style.webkitTransform = 'scale('+scaleX+','+scaleY+')';
    svg.style.transformOrigin = '0 0';
    svg.style.webkitTransformOrigin = '0 0';
}

function getParams(parm){
    var reg = new RegExp("(^|&)" + parm + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);

    if (r != null) return unescape(r[2]); 
    return null;
}

function initLink(){
    var linkToAPP = document.getElementById('linkToAPP'),
        app = getParams('lagoufrom');

    switch(app){
        case 'ios':
            // window.location.href = 'lagou://lagou.com/h5/close';
            linkToAPP.style.display = 'none';
            break;
        case 'android':
            // window.location.href = 'lagou://lagou.com/h5/close';
            linkToAPP.style.display = 'none';
            break;
        default:
            break;
    }
}



function initMusic(){
    var bgmusic_button = $(".bgmusic");
    var audio = document.getElementById("music");
    audio.preload = 'auto';
    audio.play();

    bgmusic_button.click(function(e){
        e.stopPropagation();
        e.preventDefault();

        if($(this).hasClass('open')){
            audio.pause();
            bgmusic_button.removeClass("open").addClass("close");
        }else{
            audio.play();
            bgmusic_button.removeClass("close").addClass("open");
        }
    });

    autoPlayMusic(audio);
}

function autoPlayMusic(audio) {
    // 自动播放音乐效果，解决浏览器或者APP自动播放问题
    function musicInBrowserHandler() {
        musicPlay(audio,true);
        document.body.removeEventListener('touchstart', musicInBrowserHandler);
    }
    document.body.addEventListener('touchstart', musicInBrowserHandler);

    // 自动播放音乐效果，解决微信自动播放问题
    function musicInWeixinHandler() {
        musicPlay(audio,true);
        document.addEventListener("WeixinJSBridgeReady", function () {
            musicPlay(audio,true);
        }, false);
        document.removeEventListener('DOMContentLoaded', musicInWeixinHandler);
    }
    document.addEventListener('DOMContentLoaded', musicInWeixinHandler);
}

function musicPlay(audio,isPlay) {
    if (isPlay && audio.paused) {
        audio.play();
    }
    if (!isPlay && !audio.paused) {
        audio.pause();
    }
}
