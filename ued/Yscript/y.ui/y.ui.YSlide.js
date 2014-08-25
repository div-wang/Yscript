/**
 * YSlide轮播图插件
 * @param {type} config
 * config.box           : 轮播图容器ID (轮播图容器的父ID)
 * config.num           : 轮播图的数量 (数字，根据具体轮播子元素数量而定)
 * config.speed         : 轮播图的速度 (毫秒数,0-正无穷)
 * config.direction     : 轮播图方向 (left/right/top/bottom)
 * config.point         : 轮播图点选按钮 (true/false)
 * config.lr_btn        : 左右按钮
 * config.lr_btn.show   : 左右按钮显示隐藏 (true/false)
 * config.lr_btn.hover  ：左右按钮划过效果 (true/false)
 */
function YSlide (config){
    //动画
    function startMove(obj, json, fnEnd) {
        function getStyle(obj, name) {
            if(obj.currentStyle) {
                return obj.currentStyle[name];
            }
            else {
                return getComputedStyle(obj, false)[name];
            }
        }
        clearInterval(obj.timer);
        obj.timer=setInterval(function (){
            var bStop=true;     //假设：所有值都已经到了
            for(var attr in json) {
                var cur=0;
                if(attr=='opacity') {
                    cur=Math.round(parseFloat(getStyle(obj, attr))*100);
                }
                else {
                    cur=parseInt(getStyle(obj, attr));
                }
                var speed=(json[attr]-cur)/6;
                speed=speed>0?Math.ceil(speed):Math.floor(speed);
                if(cur!=json[attr])
                    bStop=false;
                
                if(attr=='opacity') {
                    obj.style.filter='alpha(opacity:'+(cur+speed)+')';
                    obj.style.opacity=(cur+speed)/100;
                }
                else {
                    obj.style[attr]=cur+speed+'px';
                }
            }
            if(bStop) {
                clearInterval(obj.timer);           
                if(fnEnd)fnEnd();
            }
        }, 30);
    };
    function getStyle(element, attr) {
        var value;
        if (typeof window.getComputedStyle != 'undefined') {//W3C
            value = window.getComputedStyle(element, null)[attr];
        } else if (typeof element.currentStyle != 'undeinfed') {//IE
            value = element.currentStyle[attr];
        }
        return value;
    }
    var oBox = document.getElementById(config.box);
    var oBoxUL = oBox.getElementsByTagName('ul')[0];
    var oBoxList = oBoxUL.getElementsByTagName(config.boxList);
    var direction = config.direction;
    var bool = true;
    var img = 0;
    if(config.point){ //如果point为true，创建点选按钮，并默认第一个选中
        var point = document.createElement('ol');
        var point_html = '';
        for (var i = 0 ;i < config.num; i++) {
            point_html += '<li>'+i+'</li>'
        };
        point.innerHTML = point_html;
        oBox.insertBefore(point,oBoxUL);
        point.getElementsByTagName('li')[0].className = 'cur';
        var point_li = point.getElementsByTagName('li');
        for (var j = 0 ;j < config.num; j++) {
            point_li[j].index = j;
            point_li[j].onclick = function (){  
                var a = this.index;
                for (var k = 0 ; k < config.num; k++ ) {
                    point_li[k].className = '';
                };
                this.className = 'cur';            
                eval('startMove(oBoxUL,{'+direction+':-(oBox_w*a-1)})');
                img = a;
            }   
        };
    }
    if(config.lr_btn.show){ //如果config.lr_btn.show为true，创建左右按钮
       var l_btn = document.createElement('span'); 
       l_btn.id = 'YSlide_left_btn';
       l_btn.setAttribute('style','position:absolute;left:10px;top:50%;width:20px;height:80px;margin-top:-40px;background:#ccc;pointer :cursor;z-index:1');
       var r_btn = document.createElement('span');
       r_btn.id = 'YSlide_right_btn';
       r_btn.setAttribute('style','position:absolute;right:10px;top:50%;width:20px;height:80px;margin-top:-40px;background:#ccc;pointer :cursor;z-index:1');
       oBox.appendChild(r_btn);
       oBox.appendChild(l_btn);
       if (config.lr_btn.hover) { //如果config.lr_btn.hover为true，默认划过box显示，划出box隐藏
            r_btn.style.display = 'none';
            l_btn.style.display = 'none'; 
            oBox.onmouseover = function(){
                r_btn.style.display = 'block';
                l_btn.style.display = 'block';
                bool = false;
            }
            oBox.onmouseout = function(){
                r_btn.style.display = 'none';
                l_btn.style.display = 'none'; 
                bool = true;       
            }
        };
        l_btn.onclick = function(){  //点击左按钮事件          
            if (img>0) img = img-1
            else img = 4;
            eval('startMove(oBoxUL,{'+direction+':-(oBox_w*img)})');
            if (config.point) {
                var point_li = point.getElementsByTagName('li');
                for (var j = 0 ; j < config.num; j++ ) {
                point_li[j].className = '';
                };
                point_li[img].className = 'cur';  
            };                                         
        }
        r_btn.onclick = function(){ //点击右按钮事件 
            if (img<4) img = img+1
            else img = 0
            eval('startMove(oBoxUL,{'+direction+':-(oBox_w*img)})');
            if (config.point) {
                var point_li = point.getElementsByTagName('li');
                for (var j = 0 ; j < config.num; j++ ) {
                point_li[j].className = '';
                };
                point_li[img].className = 'cur';  
            }; 
        } //如果config.lr_btn.show，创建左右按钮
    }
    if (config.direction == direction) { //根据方向自动滚动
        if (direction == 'left' || direction == 'right') { 
            var oBox_w = getStyle(oBox, 'width').split('p')[0];
            var oBoxUL_width = oBox_w*config.num+1+'px';
            oBoxUL.style.width = oBoxUL_width;  
            //var oBoxLI = oBoxUL.getElementsByTagName('li')[0]
            //oBoxUL.appendChild(oBoxLI);
        }if (direction == 'top' || direction == 'bottom') {
            var oBox_h = getStyle(oBox, 'height').split('p')[0];
            var oBoxUL_top = oBox_h*config.num+1+'px';
            oBoxUL.style.height = oBoxUL_top;
            //var oBoxLI = oBoxUL.getElementsByTagName('li')[0]
            //oBoxUL.appendChild(oBoxLI);
        };// 判断上下左右
        function autoslide(){ 
            if (bool) {
                if (img == config.num-1) {img = -1};
                img = img + 1;
                eval('startMove(oBoxUL,{'+direction+':-(oBox_w*img)})');
                if(config.point){
                    var point_li = point.getElementsByTagName('li');
                    for (var s = 0 ; s < config.num; s++ ) {
                        point_li[s].className = '';
                    }; 
                    point_li[img].className = 'cur'
                }   
            }else return;
        }
        var start = setInterval(autoslide , config.speed) 
    };   
}