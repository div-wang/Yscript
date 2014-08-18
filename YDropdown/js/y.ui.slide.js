//轮播图插件
function y_slide(box, box_cur, point, point_cur, lr_but){
    var oBox = document.getElementById(box);
    var oList = document.getElementById(point).getElementsByTagName(point_cur);
    var oBoxli = oBox.getElementsByTagName(box_cur);
    var img = 0;
    var bool = true;
    for (var i = 0 ;i < oList.length; i++) {
        oList[i].index = i;
        oList[i].onclick = function (){  
            var a = this.index;
            for (var j = 0 ; j < oList.length; j++ ) {
                oList[j].className = '';
                oBoxli[j].style.display = 'none';
            };
            this.className = 'cur';            
            oBoxli[a].style.display = 'block';
            img = a;
        }   
    };
    function autoslide(){ 
        if (bool) {  
            for (var j = img ; j < oList.length; j++ ) {
                var a = oBoxli[j].getAttribute("name");
                oList[j].className = '';
                oBoxli[j].style.display = 'none';
            };   
            img = img + 1;
            if (img == oList.length) {img = 0}; 
            oList[img].className = 'cur';            
            oBoxli[img].style.display = 'block';
        }else return
    }
    var start = setInterval(autoslide,3000);
    oBox.onmouseover = function(){
        bool = false;
    }
    oBox.onmouseout = function(){
        bool = true;
    }
    if(lr_but){
        var oBoxspan = oBox.getElementsByTagName(lr_but)

        oBox.onmouseover = function(){
            oBoxspan[0].style.display = 'block';
            oBoxspan[1].style.display = 'block';
        }
        oBox.onmouseout = function(){
            oBoxspan[0].style.display = 'none';
            oBoxspan[1].style.display = 'none';        
        }

        oBoxspan[0].onmouseover = function(){
            this.style.filter='alpha(opacity:"60")';
            this.style.opacity= '0.6';
        }

        oBoxspan[0].onclick = function(){
            for (var j = 0 ; j < oList.length; j++ ) {
                oList[j].className = '';
                oBoxli[j].style.display = 'none';
            };
                if (img>0) img = img-1
                else img = 4;
                oList[img].className = 'sp_cur';            
                oBoxli[img].style.display = 'block'                       
        }
        oBoxspan[1].onclick = function(){
            for (var j = 0 ; j < oList.length; j++ ) {
                oList[j].className = '';
                oBoxli[j].style.display = 'none';
            };
                if (img<4) img = img+1
                else img = 0
                oList[img].className = 'sp_cur';            
                oBoxli[img].style.display = 'block';
        }   
    }
}