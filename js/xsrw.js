/**
 * Created by asus8 on 2016/9/2.
 */
// 第一：判断设备
var u = navigator.userAgent;
$(function() {
    if (u.indexOf('Andriod') > -1 || u.indexOf('Linux') > -1) { //安卓手机
        andriodInit();
    } else if (u.indexOf('iPhone') > -1) { //苹果手机
        iosInit();
    }
})
function andriodInit(){
    try {

        var data = window.android.getContent(); //得到安卓传的数据
        data = JSON.parse(data);
        if(data.reg=="0")
        {
            andriodBindClick();
            $(".get").css("display", "none");
        } else{
            $(".img-box:eq(0) .get").css("display", "block");
            if(data.xinshoubiao==1){  //新手标为1 的情况
                $(".img-box:eq(1) .get").css("display", "block");
                $(".qtz").attr("src", "images/icon-qtz-2.png");
                $(".img-box1>a").click(function(){
                    event.preventDefault();
                    window.android.openCk();
                });
                $(".img-box2>a").click(function(){
                    event.preventDefault();
                    window.android.canNotqtz();
                });
                if(data.shoutou==1){
                    $(".img-box:eq(2) .get").css("display", "block");
                    $(".qlq").attr("src", "images/icon-qlq-2.png");
                    $(".img-box3>a").click(function(){
                        event.preventDefault();
                        window.android.canNotqlq();
                    });
                }else{
                    $(".img-box3>a").click(function(){
                        event.preventDefault();
                        window.android.openLq();
                    });
                }
            } else if(data.xinshoubiao==0){ //新手标为0 的情况
                //andriodBindClick();
                $(".img-box1>a").click(function(){
                    event.preventDefault();
                    window.android.openCk();
                });
                $(".img-box2>a").click(function(){
                    event.preventDefault();
                    window.android.openTz();
                });
                if(data.shoutou==1){
                    $(".img-box:eq(2) .get").css("display", "block");
                    $(".qlq").attr("src", "images/icon-qlq-2.png");
                    $(".img-box3>a").click(function(){
                        event.preventDefault();
                        window.android.canNotqlq();
                    });
                }else{
                    $(".img-box3>a").click(function(){
                        event.preventDefault();
                        window.android.openLq();
                    });
                }
                $(".img-box:eq(1) .get").css("display", "none");
            }
        }
    } catch (e) {
        console.log(e);
    }
}
function iosInit(){
    try {
        connectWebViewJavascriptBridge(function(bridge) {
            bridge.init(function(message, responseCallback) {
                data = message;

                responseCallback('get');
                if(data.reg=="0")
                {
                    $(".get").css("display", "none");
                    notloginBindClick();
                } else
                {
                     $(".img-box:eq(0) .get").css("display", "block");
                     if( data.xinshoubiao > 0 ) {  //新手标为1
					     $(".img-box:eq(1) .get").css("display", "block") ;
					     $(".qtz").attr("src", "images/icon-qtz-2.png");

                         $(".img-box1 a").click(function(){
                             var target=$(this).attr("data-value");
                             event.preventDefault();
                             send(target);
                         });
                         $(".img-box2 a").click(function() {
                             event.preventDefault();
                             sendBought();
                         });
                         if(data.shoutou==1){
                             $(".img-box:eq(2) .get").css("display", "block");
                             $(".qlq").attr("src", "images/icon-qlq-2.png");
                             $(".img-box3 a").click(function(){
                                 event.preventDefault();
                                 sendBought();
                             })
                         }else{
                             $(".img-box3 a").click(function(){
                                 var target=$(this).attr("data-value");
                                 event.preventDefault();
                                 send(target);
                             })
                         }
                     }else{//新手标为0
                                 $(".img-box:eq(1) .get").css("display", "none");

                                 $("#a1").click(function(){
                                         var target=$(this).attr("data-value");
                                         event.preventDefault();
                                         send(target);
                                 })
                                 $("#a2").click(function(){
                                         var target=$(this).attr("data-value");
                                         event.preventDefault();
                                         send(target);
                                 })
                                 if(data.shoutou==1){
                                     $(".img-box:eq(2) .get").css("display", "block");
                                     $(".qlq").attr("src", "images/icon-qlq-2.png");
                                     $(".img-box3 a").click(function(){
                                         event.preventDefault();
                                         sendBought();
                                     })
                                 }else{
                                     $(".img-box3 a").click(function(){
                                         var target=$(this).attr("data-value");
                                         event.preventDefault();
                                         send(target);
                                     })
                                 }
                             }
                
                }
            });
            bridge.registerHandler('testObjcCallback', function(data, responseCallback) {
                responseCallback('post');
            })
        })
    } catch (e) {
        console.log(e);
    }
}
function connectWebViewJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) {
        callback(WebViewJavascriptBridge)
    } else {
        document.addEventListener('WebViewJavascriptBridgeReady', function() {
            callback(WebViewJavascriptBridge)
        }, false)
    }
}

/*
 * 返回数据给ios 安卓
 * */
function andriodBindClick(){
    $(".img-box1>a").click(function(){
        event.preventDefault();
        window.android.openCk();
    });
    $(".img-box2>a").click(function(){
        event.preventDefault();
        window.android.openTz();

    });
    $(".img-box3>a").click(function(){
        event.preventDefault();
        window.android.openLq();
    });
}
/***** ios****/
function  notloginBindClick(){
    $(".img-box a").click(function(){
        event.preventDefault();
        Nologinsend();
    });
}

function send(value){
    if (u.indexOf('Andriod') > -1 || u.indexOf('Linux') > -1) { //安卓手机
        //android.showToast("Login"); //发送数据给安卓客户端并接受结果  showToast与安卓约定的方法
    } else if (u.indexOf('iPhone') > -1) { //苹果手机
        connectWebViewJavascriptBridge(function(bridge) {
            bridge.registerHandler('testObjcCallback', function(data, responseCallback) {
                responseCallback('post');
            })
            bridge.send({
                "status":value   //IOS必须是JSON
            });
        });
    }
}

function sendBought(){
    connectWebViewJavascriptBridge(function (bridge) {
        bridge.registerHandler('testObjcCallback', function (data, responseCallback) {
            responseCallback('post');
        });
        bridge.send({
            "status": "bought"  //IOS必须是JSON
        });
    });
}

function   Nologinsend(){
    if (u.indexOf('Andriod') > -1 || u.indexOf('Linux') > -1) { //安卓手机
        //android.showToast("nologin"); //发送数据给安卓客户端并接受结果  showToast与安卓约定的方法
    } else if (u.indexOf('iPhone') > -1) { //苹果手机
        connectWebViewJavascriptBridge(function(bridge) {
            bridge.registerHandler('testObjcCallback', function(data, responseCallback) {
                responseCallback('post');
            });
            bridge.send({
                "status":"noLogin"  //IOS必须是JSON
            });
        });
    }
}