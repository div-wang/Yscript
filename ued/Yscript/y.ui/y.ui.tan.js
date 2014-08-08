//btn:点击按钮id;html:弹层的内容id; height，width：宽高;
function y_tan(btn,html,height,width){
    function getInner() {
        if (typeof window.innerWidth != 'undefined') {
            return {
                width : window.innerWidth,
                height : window.innerHeight
            }
        } else {
            return {
                width : document.documentElement.clientWidth,
                height : document.documentElement.clientHeight
            }
        }
    }
    var but = document.getElementById(btn);
    var tan_html = document.getElementById(html);
    but.onclick = function(){
        var html =  document.body.innerHTML;
        document.body.innerHTML = html+'<div id="tan" style="background: #000;opacity: 0.4; filter: alpha(opacity=40);position: absolute;z-index:2;top: 0;left: 0;"></div><div id="tan_box" style="background: #fff;border:1px solid #ccc;border-radius:12px;-weiket-border-radius:12px;position:absolute;z-index:10;"></div>'
        var tan = document.getElementById('tan');
        var tan_box = document.getElementById('tan_box');
        tan.style.height = getInner().height+'px';
        tan.style.width = getInner().width+'px';
        tan_box.style.height = height + 'px';
        tan_box.style.width = width + 'px';
        tan_box.style.left = (getInner().width-tan_box.clientWidth)/2+'px';
        tan_box.style.top = (getInner().height-tan_box.clientHeight)/2+'px';
        tan_box.innerHTML = tan_html.innerHTML
    }
}