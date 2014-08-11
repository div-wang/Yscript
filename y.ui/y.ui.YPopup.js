/*y:点击按钮;
 *title:弹层的标题;
 *center:弹层的内容id;
 *height,width：宽高;
 *y_innt:预处理函数;
 *callback：点击提交的回调函数;
 */
function YPopup(y,title,center,width,height,y_innt,callback){
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
    y_innt();
    if (y_popup_style == undefined) {
    var y_popup_style = document.createElement('style');
    y_popup_style.innerHTML = '#y_popup{background: #000;opacity: 0.4; filter: alpha(opacity=40);position: absolute;z-index:2;top: 0;left: 0;}#y_popup_center{z-index:1000;background: #fff;border:1px solid #ccc;border-radius:5px;-weiket-border-radius:12px;position:absolute;z-index:10;box-shadow:0 0 5px #555;}#y_popup_center .title{background: #ccc;clear:both;height:30px;border-bottom:2px solid #eaeaea;text-align:center;line-height:30px;color:blue}#y_popup_center span{float:right;cursor: pointer;color:#f00}#y_popup_form{position:relative;width:100%;height:100%;}#y_popup_input {padding:5px 10px;display:block;margin:5px auto;position:absolute;bottom:35px;left:40%;}'
    document.body.appendChild(y_popup_style);
    };
    
    var y_popup = document.getElementById('y_popup');
    var y_popup_center = document.getElementById('y_popup_center');
    var y_popup_input = document.getElementById('y_popup_input');
    if (y_popup === null) {
       var y_popup = document.createElement('div');
       y_popup.id = 'y_popup';
       document.body.appendChild(y_popup);
        y_popup.style.height = getInner().height+'px';
        y_popup.style.width = getInner().width+'px';
    }else{
        y_popup.style.display = "block";
    }
    if (y_popup_center === null) {
       var y_popup_center = document.createElement('div')
       y_popup_center.id = "y_popup_center";
       y_popup_center.innerHTML = '<div class="title">'+title+'<span>x</span></div><form action="#" id="y_popup_form"></form>;'
       document.body.appendChild(y_popup_center);
        y_popup_center.style.height = height + 'px';
        y_popup_center.style.width = width + 'px';
        y_popup_center.style.left = (getInner().width-y_popup_center.clientWidth)/2+'px';
        y_popup_center.style.top = (getInner().height-y_popup_center.clientHeight)/2+'px';    
    }else{
        y_popup_center.style.display = "block";
    }
    if (y_popup_html === undefined) {
        var y_popup_html = document.getElementById(center);
        var y_popup_pore = y_popup_html.parentNode;
        var y_popup_form = document.getElementById('y_popup_form');
        y_popup_form.appendChild(y_popup_html);
    }
    if(y_popup_input === null) {
       var y_popup_input = document.createElement('input');
       y_popup_input.id = "y_popup_input";
       y_popup_input.value = "提交";
       y_popup_input.type = "button"
       y_popup_form.appendChild(y_popup_input);
    }else{
        y_popup_input.style.display = "block";
    }
    y_popup_input.onclick = function(){
        if (callback()) {
            document.body.removeChild(y_popup_style);
            y_popup_form.removeChild(y_popup_html)
            y_popup_pore.appendChild(y_popup_html)
            y_popup.style.display = "none";
            y_popup_center.style.display = "none";

        };
    }
}
