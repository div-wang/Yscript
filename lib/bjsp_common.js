/**
 * 保健食品通用js插件
 * @author div-wang:https://div-wang.github.com/
 * @param {YST_bjsp} 主程序
 * @param {show} 划过显示大图
 *      {
            bp : 大图容器ID,
            p  : 显示图片容器ID,
            sp : 小图容器ID,
            fl ：划过区块ID,
        }
 * @param {img} 产品图切换
 * @param {rate} 评论打分
 *      {
            id : 打分父元素ID,
        }
 * @param {tabNav} 导航切换
 *      {
            id : 切换导航容器ID,
            classfix  : 切换列表的class(统一的class),
        } 
 */

(function (w,d){
    var Browser=new Object(); 
    Browser.userAgent=window.navigator.userAgent.toLowerCase(); 
    Browser.ie=/msie/.test(Browser.userAgent); 
    function cs(name){
        var node = document;
        var temps = [];
        var all = node.getElementsByTagName('*');
        for (var i = 0; i < all.length; i ++) {
            if ((new RegExp('(\\s|^)' +name +'(\\s|$)')).test(all[i].className)) {
                temps.push(all[i]);
            }
        }
        return temps;
    }
    var hoverimg = {
        oBig : {},
        oPic : {},
        oSmall : {},
        oFloat : {},
        oDiv : {},
        oBigImg : {},
        oPicImg : {},
        //划过显示大图
        show : function(bp,p,sp,fl){
            //获取划过显示大图的父元素id
            hoverimg.oBig = d.getElementById(bp); 
            //获取主显示区的id
            hoverimg.oPic = d.getElementById(p); 
            //获取划过图片的样式的id
            hoverimg.oFloat = d.getElementById(fl); 
            //获取整个图片函数的父元素id
            hoverimg.oDiv = d.getElementById(bp).parentNode;
            //获取划过显示大图的图片
            hoverimg.oBigImg = d.getElementById(bp).getElementsByTagName('img')[0]; 
            //获取主显示区图片的src
            hoverimg.oPicImg = d.getElementById(p).getElementsByTagName('img')[0] ;
            //划入主显示区大图显示，划过图片的样式显示
            hoverimg.oPic.onmouseover = function () {
                hoverimg.oFloat.style.display = 'block';
                hoverimg.oBig.style.display = 'block';
            };
            //划离主显示区大图隐藏，划过图片的样式隐藏
            hoverimg.oPic.onmouseout = function () {
                hoverimg.oFloat.style.display = 'none';
                hoverimg.oBig.style.display = 'none';
            };
            //划过主显示区的处理函数
            hoverimg.oPic.onmousemove = function (ev) {
                hoverimg.oBigImg.src = hoverimg.oPicImg.src;
                var oEvent = ev||w.event;
                var scrollTop = d.documentElement.scrollTop||d.body.scrollTop
                var dof = hoverimg.oDiv.offsetLeft
                var pow = hoverimg.oPic.offsetWidth;
                var dot = hoverimg.oDiv.offsetTop
                var poh = hoverimg.oPic.offsetHeight;
                var maxleft = Math.ceil(pow-112);
                var maxtop = Math.ceil(poh-112);
                //left = 当前鼠标的x轴位置-当前父元素距左边框的距离-主显示区距左边框的距离-划过元素的宽度的1/2
                var lefts = oEvent.clientX-dof-(112/2);
                var left;
                //超出父元素 left置为0
                if(lefts < 0) {
                    left = 0;
                }else if(lefts >= maxleft){
                    left = maxleft;
                }else{
                    left = lefts;
                }
                //top = 当前鼠标的y轴位置-当前父元素距上边框的距离-主显示区距上边框的距离-划过元素的高度的1/2
                var tops = oEvent.clientY-dot+scrollTop-(112/2);
                var top;
                //超出父元素 top置为0
                if(tops < 0) {
                    top = 0;
                }else if(tops > maxtop){
                    top = maxtop;
                }else{
                    top = tops;
                }
                //大图的
                var percentX = left/maxleft;
                var percentY = top/maxtop;
                //划过元素的left和top值
                hoverimg.oFloat.style.left = left+'px';
                hoverimg.oFloat.style.top = top+'px';
                hoverimg.oBigImg.style.left = -percentX*(hoverimg.oBigImg.offsetWidth-hoverimg.oBig.offsetWidth)+'px';
                hoverimg.oBigImg.style.top = -percentY*(hoverimg.oBigImg.offsetHeight-hoverimg.oBig.offsetHeight)+'px';
            };
            hoverimg.img();
        },
        //产品图片切换
        img : function () {
            hoverimg.oSmall = d.getElementById('small_pic');
            var oSmall_img = hoverimg.oSmall.getElementsByTagName('img');
            var oSmall_li = hoverimg.oSmall.getElementsByTagName('li')
            for (var i = 0 ; i < oSmall_img.length ; i++) {
                oSmall_img[i].onmouseover = function(){
                    for (var j = 0 ; j < oSmall_img.length ; j++) {
                        oSmall_li[j].className = "";
                    }
                    this.parentNode.className = 'current';
                    hoverimg.oPicImg.src = this.src;
                }
            };
            if(oSmall_li.length>4){
                hoverimg.oSmall.style.width = oSmall_li.length*70+'px';
                var as = hoverimg.oSmall.parentNode.parentNode.getElementsByTagName('a');
                var all_width = oSmall_li.length*70;
                var old_width = 280;
                var l = 0;
                as[0].onclick = function(){ 
                    if (l>=0) return;
                    l += 70;
                    hoverimg.oSmall.style.left = l+'px';
                };
                as[1].onclick = function(){
                    if ((all_width-old_width) + l == 0) return;
                    l -= 70;
                    hoverimg.oSmall.style.left = l+'px';
                };
            }
        },
        //评论打分
        rate : function(id) {      
            var oAbc = d.getElementById(id);
            var oPg = oAbc.getElementsByTagName('a');
            var oInput = oAbc.getElementsByTagName('input')[0]
            for (var i = 0 ; i < oPg.length ; i++) {//循环小苹果
                oPg[i].index = i; //每个小苹果都有一个单独是数值表示;
                var bool = true; //记录小苹果有没有被点击
                var c = 0; //记录点击的是第几个小苹果
                oPg[i].onclick = function(){ //小苹果点击事件
                    for (var k = 0 ; k < oPg.length ; k++) {
                        oPg[k].className = "strat1";
                    }; //当前id下的所有小苹果全部变灰
                    var n = this.index; //当前被点击的小苹果的数值
                    for (var j = 0 ; j < n+1 ; j++) {
                        oPg[j].className = 'strat2';
                        c = n+1; //将点击的小苹果的数值返回出当前函数
                    };  //当前被点击的小苹果个数的样式 
                    oInput.value = n+1;
                    bool = false; //小苹果被点击bool为假
                }
                oPg[i].onmouseover = function(){ //小苹果划过事件
                    var n = this.index; //当前被划过的小苹果的数值
                    for (var k = 0 ; k < oPg.length ; k++) {
                        oPg[k].className = "strat1";
                    }; //当前id下的所有小苹果全部变灰
                    for (var j = 0 ; j < n+1 ; j++) {
                        oPg[j].className = "strat2";
                    }; //当前被划过的小苹果个数的样式  
                    bool = true; //当前是划过，bool为真 

                }
                oPg[i].onmouseout = function(){ //小苹果划离事件
                    if (bool) {  //如果bool为真，划离有事件
                        for (var k = 0 ; k < oPg.length ; k++) {
                            oPg[k].className = "strat1";
                        }; //当前id下的所有小苹果全部变灰
                        for (var j = 0 ; j < c ; j++) {
                        oPg[j].className = "strat2";
                        }; //划离之后还原被点击的小苹果的样式
                    }
                }
                
            };
        },
        //导航切换
        tabNav : function(id,classfix) {
            var oZslist = d.getElementById(id).getElementsByTagName('li');
            var list = cs(classfix);
            for (var k = 0; k < oZslist.length ; k++) {
                oZslist[k].index = k;
                oZslist[k].onclick = function (){
                    for (var j = 0 ; j < oZslist.length ; j++) {
                        oZslist[j].className = '';
                        var s = oZslist.length-1;
                        oZslist[s].className = 'last';
                        list[j].style.display = 'none';
                    };
                    if (this.index == 3) {
                        this.className = 'last current';
                    }else{
                        this.className = 'current';
                    }

                    if (this.index == 0) {
                        for (var g = 0 ; g < k ; g++) {
                            list[g].style.display = 'block';
                        };
                    }else{
                        list[this.index].style.display = 'block';
                    }
                }
            };
        }
    }
    w.hoverImg = hoverimg.show;
    w.YST_bjsp = hoverimg;
})(window,document)


/**
 * @example
 * 评论打分
 */
YST_bjsp.rate('rate1');
YST_bjsp.rate('rate2');
YST_bjsp.rate('rate3');
YST_bjsp.rate('rate4');

/**
 * @example
 * 图片划过
 */
hoverImg('big_pic','pic','small_pic','float_layer')
