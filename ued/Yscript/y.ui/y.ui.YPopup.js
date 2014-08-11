/*btn:点击按钮;
 *tit:弹层的标题;
 *tan_html:弹层的内容id;
 *height,width：宽高;
 *callback：点击提交的回调函数;
 */
function YPopup(but,tit,tan_html,height,width,callback){
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
    var tan_html = document.getElementById(tan_html).innerHTML;
    var body =  document.body.innerHTML;
    var html = '<div id="tan" style="background: #000;opacity: 0.4; filter: alpha(opacity=40);position: absolute;z-index:2;top: 0;left: 0;"></div><div id="tan_box" style="background: #fff;border:1px solid #ccc;border-radius:5px;-weiket-border-radius:12px;position:absolute;z-index:10;"><h3 style="background: #ccc;clear:both;height:38px;border-bottom:2px solid #eaeaea">'+tit+'<span style="float:right;cursor: pointer">x</span></h3><form action="#" id="tan_form">'+tan_html+'<input type="button" value="提交" id="taninput" style="padding:5px 10px;display:block;margin:5px auto;"></form></div>'
	document.body.innerHTML = body + html ; 
    var tan = document.getElementById('tan');
    var tan_box = document.getElementById('tan_box');
    tan.style.height = getInner().height+'px';
    tan.style.width = getInner().width+'px';
    tan_box.style.height = height + 'px';
    tan_box.style.width = width + 'px';
    tan_box.style.left = (getInner().width-tan_box.clientWidth)/2+'px';
    tan_box.style.top = (getInner().height-tan_box.clientHeight)/2+'px';
    var tab_span = tan_box.getElementsByTagName('h3')[0].getElementsByTagName('span')[0];
    tab_span.onclick = function (){document.body.removeChild(tan);document.body.removeChild(tan_box);}
    //function valuedata(){}
    var taninput = document.getElementById('taninput');
    taninput.onclick = function(){
        if (callback()) {
        document.body.removeChild(tan);document.body.removeChild(tan_box);
        };
    };

}
