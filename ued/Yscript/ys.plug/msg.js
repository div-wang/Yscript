//信息提示，msg(string|num|function)
(function (){
    var w = window;
    var d = document;
    var msg = {
        show:function(str){
            var msg_width = d.body.clientWidth || d.dElement.clientWidth,
                msg_height = d.body.clientHeight || d.dElement.clientHeight;  
            var popup_msg_style = d.createElement('style');
                popup_msg_style.type = "text/css";
            var popup_msg_style_text = '.popup_msg_box{border-radius:5px;width:30%;min-height:30%;font-family:"微软雅黑"; word-break:break-all;word-wrap:break-word;font-size:14px;font-weight:bold;padding:30px 5px 10px;text-align:center;line-height:1.6;border:1px solid #999;background:#fff;color:#333;position:fixed;top:30%;left:35%;z-index:12; }.popup_msg_close{position:absolute;top:5px;right:5px;background:#3e7ef8;border-radius:5px; cursor:pointer; color:#fff; font-family:"微软雅黑"; font-size:14px;width:20px;height:1.5em;display:block;text-align:center;line-height:1.5em} #popup_msg_tan{position:absolute;top:0;width:100%;height:100%;background:#000;opacity:0.5;filter:alpha(opacity=50);z-index:10;width:100%;height:'+msg_height+'px;}'
                if (popup_msg_style.styleSheet) { //IE
                  popup_msg_style.styleSheet.cssText = popup_msg_style_text;
                } else { 
                  popup_msg_style.innerHTML = popup_msg_style_text;
                }
                d.body.appendChild(popup_msg_style);
            var popup_msg_tan = d.createElement('div');
                popup_msg_tan.id = 'popup_msg_tan';
                d.body.appendChild(popup_msg_tan);
            var popup_msg_box = d.createElement('div');
                popup_msg_box.innerHTML = '<a class="popup_msg_close" onclick="msgx(this)">X</a>'+str;
                popup_msg_box.className = 'popup_msg_box';
                d.body.appendChild(popup_msg_box);
        },
        close:function(obj){
            var a = obj.parentNode.parentNode.childNodes;
            for (var i = 0 ; i < a.length; i++) {
                if (a[i].nodeType==1 && a[i].type == "text/css") {
                    d.body.removeChild(a[i]);
                }; 
                if (a[i].nodeType==1 && a[i].id == "popup_msg_tan") {
                    d.body.removeChild(a[i]);
                };                   
            };
            d.body.removeChild(obj.parentNode);
        }
    } 
    w.msgx = msg.close;   
    w.msg = msg.show;
})();



