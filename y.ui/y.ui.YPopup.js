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
    var tan_html = document.getElementById(tan_html);
    var html = document.createElement('div') //创建元素节点 
    //var body = document.body.innerHTML;
    html.innerHTML = '<div id="tan" style="background: #000;opacity: 0.4; filter: alpha(opacity=40);position: absolute;z-index:2;top: 0;left: 0;"></div><div id="tan_box" style="background: #fff;border:1px solid #ccc;border-radius:5px;-weiket-border-radius:12px;position:absolute;z-index:10;box-shadow:0 0 5px #555;"><h3 style="background: #ccc;clear:both;height:30px;border-bottom:2px solid #eaeaea;text-align:center;line-height:30px;color:blue">'+tit+'<span style="float:right;cursor: pointer;color:#f00">x</span></h3><form action="#" id="tan_form" style="position:relative;width:100%;height:100%;"><input type="button" value="提交" id="taninput" style="padding:5px 10px;display:block;margin:5px auto;position:absolute;bottom:35px;left:40%;"></form></div>'
    document.body.appendChild(html); 
    var tan_form = document.getElementById('tan_form');
    tan_form.appendChild(tan_html);
    var tan = document.getElementById('tan');
    var tan_box = document.getElementById('tan_box');
    tan.style.height = getInner().height+'px';
    tan.style.width = getInner().width+'px';
    tan_box.style.height = height + 'px';
    tan_box.style.width = width + 'px';
    tan_box.style.left = (getInner().width-tan_box.clientWidth)/2+'px';
    tan_box.style.top = (getInner().height-tan_box.clientHeight)/2+'px';
    var tab_span = tan_box.getElementsByTagName('h3')[0].getElementsByTagName('span')[0];
    tab_span.onclick = function (){document.body.removeChild(html);}
    //function valuedata(){}
    var taninput = document.getElementById('taninput');
    taninput.onclick = function(){
        if (callback()) {
        document.body.removeChild(html);
        };
    };

}
