
/*
 * 划过图片变大,
 * hoverImg(bp,p,sp,fl),
    {
      bp : 大图div容器ID,
      p  ：默认图片div容器ID,
      sp ：小图div容器ID,
      fl ：划过显示区块ID,
    }
 */
(function (w,d){
    var hoverimg = {
        oBig : {},
        oPic : {},
        oSmall : {},
        oFloat : {},
        oDiv : {},
        oBigImg : {},
        oPicImg : {},
        show : function(bp,p,sp,fl){
            //获取划过显示大图的父元素id
            hoverimg.oBig = d.getElementById(bp); 
            //获取主显示区的id
            hoverimg.oPic = d.getElementById(p); 
            //获取划过图片的样式的id
            hoverimg.oFloat = d.getElementById(fl); 
            //获取整个图片函数的父元素id
            hoverimg.oDiv = hoverimg.oBig.parentNode;
            //获取划过显示大图的图片
            hoverimg.oBigImg = hoverimg.oBig.getElementsByTagName('img')[0]; 
            //获取主显示区图片的src
            hoverimg.oPicImg = hoverimg.oPic.getElementsByTagName('img')[0] ;
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
                var oEvent = ev||window.event;
                var scrollTop = d.documentElement.scrollTop||d.body.scrollTop
                //left = 当前鼠标的x轴位置-当前父元素距左边框的距离-主显示区距左边框的距离-划过元素的宽度的1/2
                var left = oEvent.clientX-hoverimg.oDiv.offsetLeft-hoverimg.oPic.offsetLeft-hoverimg.oFloat.offsetWidth/2;
                //left = 当前鼠标的y轴位置-当前父元素距上边框的距离-主显示区距上边框的距离-划过元素的高度的1/2
                var top  = oEvent.clientY-hoverimg.oDiv.offsetTop+scrollTop-hoverimg.oPic.offsetTop-hoverimg.oFloat.offsetHeight/2;
                //超出父元素 left置为0
                if(left < 0) left = 0;
                else if(left > hoverimg.oPic.offsetWidth-hoverimg.oFloat.offsetWidth)
                    left = hoverimg.oPic.offsetWidth-hoverimg.oFloat.offsetWidth;
                //超出父元素 top置为0
                if(top < 0) top = 0;
                else if(top > hoverimg.oPic.offsetHeight-hoverimg.oFloat.offsetHeight)
                    top = hoverimg.oPic.offsetHeight-hoverimg.oFloat.offsetHeight;
                //划过元素的left和top值
                hoverimg.oFloat.style.left = left+'px';
                hoverimg.oFloat.style.top = top+'px';
                //大图的
                hoverimg.oBigImg.src = hoverimg.oPicImg.src;
                var percentX = left/(hoverimg.oPic.offsetWidth-hoverimg.oFloat.offsetWidth);
                var percentY = top/(hoverimg.oPic.offsetHeight-hoverimg.oFloat.offsetHeight);
                hoverimg.oBigImg.style.left = -percentX*(hoverimg.oBigImg.offsetWidth-hoverimg.oBig.offsetWidth)+'px';
                hoverimg.oBigImg.style.top = -percentY*(hoverimg.oBigImg.offsetHeight-hoverimg.oBig.offsetHeight)+'px';
            };
            hoverimg.img();
        },
        //产品图片切换
        img : function (obj) {
            hoverimg.oSmall = d.getElementById('small_pic');
            var oSmall_img = hoverimg.oSmall.getElementsByTagName('img');
            var oSmall_li = hoverimg.oSmall.getElementsByTagName('li')
            for (var i = 0 ; i < oSmall_img.length ; i++) {
                oSmall_img[i].onclick = function(){
                    for (var j = 0 ; j < oSmall_img.length ; j++) {
                        oSmall_li[j].className = "";
                        oSmall_li[0].style.marginLeft = 0;
                    }
                    this.parentNode.className = 'current';
                    hoverimg.oBigImg.src = this.src;
                    hoverimg.oPicImg.src = this.src;
                    console.log(hoverimg.oPicImg.src);
                }
            };
        }
    }
    w.hoverImg = hoverimg.show;
})(window,document)

