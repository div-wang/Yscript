Y('#fuwu').hover(function(){
	Y(".fuwuList").show()
},function(){
	Y(".fuwuList").hide()
})
Y('#shouji').hover(function(){
    Y(".ewm").show();
},function(){
	Y(".ewm").hide();
})
Y('#denglu').hover(function(){
	Y(".loginBox").show();
},function(){
	Y(".loginBox").hide();
})

//轮播图


var navHover = function(nav){
    var oNav = document.getElementById(nav);
    var oNavlist = oNav.getElementsByTagName('li');

    for (var i = 0; i < oNavlist.length ; i++) {
    	oNavlist[i].className = "";
        oNavlist[i].getElementsByTagName('div')[0].style.display = 'none'; 
        oNavlist[i].onmouseover = function(){
            this.className = 'selected';
            this.getElementsByTagName('div')[0].style.display = 'block';  
        }
        oNavlist[i].onmouseout = function(){
			this.className = '';
            this.getElementsByTagName('div')[0].style.display = 'none';
        }
    };

}


//票房top榜单
function zs_nav(zs_nav,zs_box,zs_nav_list,zs_nav_list_cur,className){
    var oZsnav = document.getElementById(zs_nav).getElementsByTagName(zs_nav_list);
    var oZsbox = document.getElementById(zs_box).getElementsByTagName('ul');
    for (var i = 0 ;i < oZsnav.length; i++) {
        
        oZsnav[i].index = i; 
        oZsnav[i].onmouseover = function (){ 
            for (var j = 0 ; j < oZsbox.length; j++ ) {
                oZsnav[j].className = '';
                oZsnav[j].getElementsByTagName(zs_nav_list_cur)[0].style.display = "none";
                oZsbox[j].style.display = 'none';
            };

            this.className = className;
            this.getElementsByTagName(zs_nav_list_cur)[0].style.display = "block";
            oZsbox[this.index].style.display = 'block';
        } 

    };
}


//指数排行
function zs_list(zx_list,classfix,classhove) {
    var oZslist = document.getElementById(zx_list).getElementsByTagName('li');
    for (var k = 0; k < oZslist.length ; k++) {
        oZslist[k].index = k;
        oZslist[k].onmouseover = function (){
            for (var j = 0 ; j < oZslist.length ; j++) {
                oZslist[j].getElementsByTagName('h3')[0].style.display = "block";
                oZslist[j].getElementsByTagName('div')[0].style.display = "none";
                oZslist[j].className = classfix;
                var s = oZslist.length-1;
                oZslist[s].style.borderBottom = "none"
            };
            
            this.getElementsByTagName('h3')[0].style.display = "none";
            this.getElementsByTagName('div')[0].style.display = "block";
            this.className = classhove;
        }
    };
} 

/*
 *左右滚动
 */
function Carousel(lb_box,width){
    var oLb_box = document.getElementById(lb_box);
    var oLb_ul = oLb_box.getElementsByTagName('ul')[0]
    var olb_li = oLb_box.getElementsByTagName('ul')[0].getElementsByTagName('li');
    var oLb_btn = oLb_box.getElementsByTagName('span');
    var a = 0; //记录轮播动画位置
    oLb_btn[0].onclick = function(){ //左滑动
        a = a-1 //点击一次位置-1
        if (a == -1) a=1; //如果<0 的话就置为最后一个
        startMove(oLb_ul,{left:-(width*a)}) //执行缓动动画，left每次向左-width px

    }
    oLb_btn[1].onclick = function (){ //右滑动
        a = a+1 //点击一次位置-1
        if (a == 2) a=0 //如果<0 的话就置为最后一个
        startMove(oLb_ul,{left:-(width*a)}) //执行缓动动画，left每次向左-width px
    }
    var start = setInterval(oLb_btn[1].onclick ,5000);//缓动动画自动执行，没5秒一次
}

/*
 *top页排行榜
 */
function Ranking(id){
    var oRanking = document.getElementById(id);
    var oRanking_li = oRanking.getElementsByTagName('li');
    for (var i = 0 ;i < oRanking_li.length; i++) {
        oRanking_li[i].onmouseover = function (){ 
            for (var j = 0 ; j < oRanking_li.length ; j++) {
            oRanking_li[j].className = "";
            }
            this.className = "one clearfix";
        }
    }
}
/*
 *划过图片变大
 */
function hoverimg(){
    var oDiv = document.getElementById('img_box');
    var oFloat = document.getElementById('float_layer');
    var oBig = document.getElementById('big_img');
    var oSmall = document.getElementById('pic');
    var oImg = oBig.getElementsByTagName('img')[0];
    var sUrl = oSmall.getElementsByTagName('img')[0].src
    oSmall.onmouseover = function ()
    {
        oFloat.style.display = 'block';
        oBig.style.display = 'block';
    };
    
    oSmall.onmouseout = function ()
    {
        oFloat.style.display = 'none';
        oBig.style.display = 'none';
    };
    
    oSmall.onmousemove = function (ev)
    {
        var oEvent = ev||event;
        
        var left = oEvent.clientX-oDiv.offsetLeft-oSmall.offsetLeft-oFloat.offsetWidth/2;
        var top  = oEvent.clientY-oDiv.offsetTop-oSmall.offsetTop-oFloat.offsetHeight/2;
        
        if(left < 0)
        {
            left = 0;
        }
        else if(left > oSmall.offsetWidth-oFloat.offsetWidth)
            left = oSmall.offsetWidth-oFloat.offsetWidth;

        
        if(top < 0)
        {
            top = 0;
        }
        else if(top > oSmall.offsetHeight-oFloat.offsetHeight)
        {
            top = oSmall.offsetHeight-oFloat.offsetHeight;
        }
        oFloat.style.left = left+'px';
        oFloat.style.top = top+'px';
        oImg.src = sUrl;
        var percentX = left/(oSmall.offsetWidth-oFloat.offsetWidth);
        var percentY = top/(oSmall.offsetHeight-oFloat.offsetHeight);
        oImg.style.left = -percentX*(oImg.offsetWidth-oBig.offsetWidth)+'px';
        oImg.style.top = -percentY*(oImg.offsetHeight-oBig.offsetHeight)+'px';
    };
}

//产品图片切换
function img() {
    var sm_pic = document.getElementById('sm_pic');
    var pic = document.getElementById('pic');
    var big_img = document.getElementById('big_img');
    var sm_pic_img = sm_pic.getElementsByTagName('img');
    var sm_pic_li = sm_pic.getElementsByTagName('li')
    for (var i = 0 ; i < sm_pic_img.length ; i++) {
        sm_pic_img[i].index = i;
        sm_pic_img[i].onclick = function(){
            for (var j = 0 ; j < sm_pic_img.length ; j++) {
                sm_pic_li[j].className = "";
                sm_pic_li[0].style.marginLeft = 0;
            }
            this.parentNode.className = 'current';
            big_img.src = this.src;
            pic.src = this.src;

        }
    };
}

/*
 *苹果打分
 */
var apples = function (id,span){        
    var oAbc = document.getElementById(id);
    var oPg = oAbc.getElementsByTagName('a');
    var oSpan = document.getElementById(span);
    for (var i = 0 ; i < oPg.length ; i++) {//循环小苹果
        oPg[i].index = i; //每个小苹果都有一个单独是数值表示;
        var bool = true; //记录小苹果有没有被点击
        var c = 0; //记录点击的是第几个小苹果
        oPg[i].onclick = function(){ //小苹果点击事件
            for (var k = 0 ; k < oPg.length ; k++) {
                oPg[k].className = "app0";
            }; //当前id下的所有小苹果全部变灰
            oSpan.innerHTML = this.title; //红色的好评文字
            var n = this.index; //当前被点击的小苹果的数值
            for (var j = 0 ; j < n+1 ; j++) {
                oPg[j].className = "app"+(n+1);
                c = n+1; //将点击的小苹果的数值返回出当前函数
            };  //当前被点击的小苹果个数的样式 
            bool = false; //小苹果被点击bool为假
        }
        oPg[i].onmouseover = function(){ //小苹果划过事件
            for (var k = 0 ; k < oPg.length ; k++) {
                oPg[k].className = "app0";
            }; //当前id下的所有小苹果全部变灰
            oSpan.innerHTML = this.title; //红色的好评文字
            var n = this.index; //当前被划过的小苹果的数值
            for (var j = 0 ; j < n+1 ; j++) {
                oPg[j].className = "app"+(n+1);
            }; //当前被划过的小苹果个数的样式  
            bool = true; //当前是划过，bool为真 

        }
        oPg[i].onmouseout = function(){ //小苹果划离事件
            if (bool) {  //如果bool为真，划离有事件
                for (var k = 0 ; k < oPg.length ; k++) {
                    oPg[k].className = "app0";
                }; //当前id下的所有小苹果全部变灰
                if (c) oSpan.innerHTML = oPg[c-1].title;
                for (var j = 0 ; j < c ; j++) {
                oPg[j].className = "app"+c;
                }; //划离之后还原被点击的小苹果的样式
            }
        }
        
    };
}

/*
 *印象标签
 */
var add_list_num = 0;//初始化印象点击次数
function addlabel(){
    var y_label = document.getElementById('y_label');
    var add_label = document.getElementById('add_label');
    add_list_num += 1; //每点击一次印象点击次数+1
    if (add_list_num > 3) {alert("最多三个印象");return}; //点击次数超过三次return
    var addinput = document.createElement("div"); //创建提交按钮
    addinput.id = "yxtj"; //创建提交按钮的id
    addinput.className = "fl"; //创建提交按钮的class
    addinput.innerHTML = '<input id="impro" class="text fl c999" type="text"><input type="button" value="提交" class="tijiao fl" onclick="addlist(this)">';//创建提交内容
    add_label.appendChild(addinput);  //插入提交按钮
    add_label.getElementsByTagName('a')[0].style.display = "none"; //隐藏添加印象标签
}
function addlist(obj){
    var y_label = document.getElementById('y_label');
    var add_label = document.getElementById('add_label');
    var add_list = y_label.getElementsByTagName("a");
    var input = obj.parentNode.getElementsByTagName('input')[0];
    if (input.value == "") {
      alert("请输入印象标签")
    }else{
      var addlist = document.createElement("a");//创建印象标签
      addlist.className = "yx"; //创建印象标签class
      addlist.href = "javascript:" //创建印象标签href
      addlist.innerHTML = input.value+"(1)"; //创建印象标签内容
      y_label.insertBefore(addlist,add_label);//插入印象标签
      add_label.removeChild(obj.parentNode); //删除提交按钮
      add_label.getElementsByTagName('a')[0].style.display = "block";//显示添加印象按钮
    }
}

/*
 *印象点赞
 */
function zan(obj){ 
    if (obj.name == 1 ){alert('你已经赞过了');return} //如果name=1则直接return
    else{
        obj.name = 1;//name！=1的时候第一次点击name="1"
        var i = obj.innerHTML.split("(")[1].split(")")[0];//获取当前的点赞数
        var zan_jia = document.createElement('div');//创建点赞动画div
        zan_jia.innerHTML = '+<b>1</b>';//创建点赞动画div内容
        obj.appendChild(zan_jia);//插入到当前点击的
        startMove(zan_jia,{top:-30,left:50},function(){ //动画效果
            obj.removeChild(zan_jia); //赞完之后删掉动画
            obj.innerHTML = obj.innerHTML.split("(")[0]+"("+(parseInt(i)+1)+")"; //点赞加1
            setCookie('zan_cookie','zan_jia1',3) //记录cookie
        });
    }
}

/*
 *问题反馈
 */
function feedback(){
    var aph_layte = document.createElement("div");
    aph_layte.setAttribute('style', 'position:absolute;top:0;width:'+Y(document.body).width()+'px'+';height:'+Y(document.body).height()+'px'+';background:#000;opacity:0.5;filter:alpha(opacity=50);z-index:1000')
    document.body.appendChild(aph_layte);
    
    Y(".feedback_right_dialog").show();
    Y("#feedback-close_x").click(function(){
        Y(".feedback_right_dialog").hide();
        document.body.removeChild(aph_layte)
        document.documentElement.removeChild(aph_layte);
    })
}

/*
 *十二星座
 */
function constellation(id,class1,class2){
    var constellation = document.getElementById(id);
    var constellation_text = constellation.getElementsByTagName('div')[constellation.getElementsByTagName('div').length-1];
    var constellation_text_a = constellation_text.getElementsByTagName('a');
    Y("."+class1).find("a").click(function() {
        for (var i = 0 ; i < constellation_text_a.length ; i++) {
            constellation_text_a[i].index = i; 
        };
        Y("#"+id).find("."+class2).hide();
        Y("#"+id).find("."+class2).eq(this.index).show();
        Y("."+class1).find("a").removeClass('selected');
        this.className = "selected";
    });
 }