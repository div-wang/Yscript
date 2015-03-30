/**
 * 39养生堂分享js组件
 * yst_share_39
 *   {
 *     data
 *       {
 *         url :分享链接(默认当前页面),
 *         title : 分享标题(默认是title),
 *         pic : 分享图片(默认当前页面第一张图片),
 *         content : 分享内容(默认seo描述)
 *         
 *       }
 *   }
 * ysShare(obj) 
 *   {
 *     type = obj.className (默认判断当前函数绑定的class)
 *     typr == sina : 分享到新浪微博
 *     typr == tqq : 分享到腾讯微博
 *     typr == qzone : 分享到qq空间
 *     typr == ren : 分享到人人网
 *     typr == fave : 收藏到百度
 *     typr == weixin : 分享微信链接
 *     typr == all : 打开所有
 *   }
 */

(function(){
  function openUrl(url){ 
    var tmp=window.open("about:blank","","height=400,width=600,top=100,left=200,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no") 
    tmp.location=url; 
  } 
  var meta = document.getElementsByTagName('meta'),description;
  for (var i =  0 ; i < meta.length ; i++) {
      if(meta[i].name == 'description') description = meta[i].content;
  };
  var share = {
    data : {
      'url':window.location.href,
      'title':document.title,
      'pic': document.getElementsByTagName('img')[0].src,
      'content':description
    },
    weixin : function (){
      var weixin_share_width = document.body.clientWidth || document.documentElement.clientWidth;
      var weixin_share = document.createElement('div');
          weixin_share.className = 'weixin_share';
          weixin_share.style.left= (weixin_share_width-240)/2+'px';
          weixin_share.innerHTML = '<style type="text/css">.weixin_share{ position:fixed;top:20%;width:230px;padding:5px;overflow:hidden;background:#fff;border:1px solid #ccc;pointer:cursor;z-index:1111111111111}.weixin_share_head {font-size: 12px;font-weight: bold;text-align: left;line-height: 16px;height: 16px;position: relative;color: #000;}.weixin_share_main {padding:10px 15px}.weixin_share_close {width: 16px;height: 16px;position: absolute;right: 0;top: 0;color: #999;text-decoration: none;font-size: 16px;}.weixin_share_foot {font-size: 12px;text-align: left;line-height: 22px;color: #666;}</style><div class="weixin_share_head"><span>分享到微信朋友圈</span><a href="javascript:" class="weixin_share_close" onclick="yst_share_39.weixin_close(this)">×</a></div><div class="weixin_share_main"><img src="http://qr.liantu.com/api.php?bg=fcfcfc&fg=000000&el=l&w=200&m=10&text='+window.location.href+'"/></div><div class="weixin_share_foot">打开微信，点击底部的“发现”，<br>使用“扫一扫”即可将网页分享至朋友圈。</div></div>';
          document.body.appendChild(weixin_share); 
    },
    weixin_close : function (obj){ 
      var par = obj.parentNode.parentNode;
      document.body.removeChild(par)
    },
    ys : function (obj) {
        switch (obj.className) {
            case "sina":
                url = "http://service.weibo.com/share/share.php?title=" + encodeURIComponent(yst_share_39.data.content + '「' + yst_share_39.data.title + '」' + ' 点这里' + yst_share_39.data.url) + '&pic=' + encodeURIComponent(yst_share_39.data.pic)
                openUrl(url);
                break;
            case "tqq":
                url = "http://share.v.t.qq.com/index.php?c=share&a=index&url=" + encodeURIComponent(yst_share_39.data.url) + '&title=' + encodeURIComponent(yst_share_39.data.title) + '&pic=' + encodeURIComponent(yst_share_39.data.pic)
                openUrl(url);
                break;
            case "qzone":
                url = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=' + encodeURIComponent(yst_share_39.data.url + '#-39yst-1-001') + '&title=' + encodeURIComponent(yst_share_39.data.title) + '&site=39yst&pics=' + encodeURIComponent(yst_share_39.data.pic) + '$desc=' + encodeURIComponent(yst_share_39.data.content);
                openUrl(url);
                break;
            case "ren":
                url = 'http://widget.renren.com/dialog/share?resourceUrl=' + encodeURIComponent(yst_share_39.data.url) + '&srcUrl=' + encodeURIComponent(yst_share_39.data.pic) + '&title=' + encodeURIComponent(yst_share_39.data.title) +'&description=' + encodeURIComponent(yst_share_39.data.content);
                openUrl(url);
                break;
                baidu : function () {
            case 'baidu_fave' :
                url = "http://cang.baidu.com/do/add?iu=" + encodeURIComponent(yst_share_39.data.url) + '&tit=' + encodeURIComponent(yst_share_39.data.title);
                openUrl(url);
            case "weixin":
                yst_share_39.weixin();
                break;
            case "all":
                url1 = "http://service.weibo.com/share/share.php?title=" + encodeURIComponent(yst_share_39.data.content + '「' + yst_share_39.data.title + '」' + ' 点这里' + yst_share_39.data.url) + '&pic=' + encodeURIComponent(yst_share_39.data.pic)
                url2 = "http://share.v.t.qq.com/index.php?c=share&a=index&url=" + encodeURIComponent(yst_share_39.data.url) + '&title=' + encodeURIComponent(yst_share_39.data.title) + '&pic=' + encodeURIComponent(yst_share_39.data.pic)
                url3 = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=' + encodeURIComponent(url + '#-39yst-1-001') + '&title=' + encodeURIComponent(yst_share_39.data.title) + '&site=39yst&pics=' + encodeURIComponent(yst_share_39.data.pic) + '$desc=' + encodeURIComponent(yst_share_39.data.content);
                url4 = 'http://widget.renren.com/dialog/share?resourceUrl=' + encodeURIComponent(yst_share_39.data.url) + '&srcUrl=' + encodeURIComponent(yst_share_39.data.pic) + '&title=' + encodeURIComponent(yst_share_39.data.title) +'&description=' + encodeURIComponent(yst_share_39.data.content);
                openUrl(url1);
                openUrl(url2);
                openUrl(url3);
                openUrl(url4);
                break; 
            default:
                break;
        }
    }
  }
  window.yst_share_39 = share;
  window.ysShare = share.ys;
})()