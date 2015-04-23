(function(){
    function ScrollRefresh(n,max,t){
        //zepto jsonp 兼容处理
        var jsonps = 0, 
        //记录页数
            p = 1,
        //布尔参数，判断是否加载成功
            bool = true,
        //记录划过的高度    
            st = $(n).offset().top;

        /**
         * refresh传递对象t，对象下包含url、page、node、callback；
         * @param  {string} url [当前应用的请求url]
         * @param  {num} page [页数]
         * @param  {string} node [节点的字符串]
         * @param  {function} callback [callback函数]
         */
        function refresh(t){
            
            jsonps += 1 ;
            bool = false;
            $.ajax({
                type:"get",
                url:t.url,
                data:{'page':t.page},
                dataType:"html",
                success:function(d){
                    $(t.node).last().after(d)
                    if (typeof t.callback === 'function') {
                        t.callback()
                    };
                }
            });   
        }


        $(window).scroll(function(event) {
            var s = document.body.scrollTop+$(window).height();
            if(s > st){
                if(!bool) return false;
                if(p == max){return false;alert('已经是最后一页了！')}
                refresh({
                    url:t.url,
                    page:p += 1,
                    node:t.node,
                    callback:function(){
                        alert('ok');
                        st = $(n).offset().top;
                        bool = true;
                    }
                }) 
            }
        });        
    }
    window.ScrollRefresh = ScrollRefresh
})()
