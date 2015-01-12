    //匿名执行函数
    (function (){
        var make_page_list = {
            pageshow : 1,
            con : 1,
            pid : 'pages',
            page:function (f,z) {
                make_page_list.con = z; 
                var pages = document.getElementById(make_page_list.pid);
                var btn = '<a href="javascript:;" id="prv_btn" onclick="make_page_list.callback('+make_page_list.pageshow+',\'p\')">上一页</a><a href="javascript:;" class="c333" onclick="make_page_list.pagelist()">'+f+'/'+z+'页</a><a href="javascript:;" id="next_btn" onclick="make_page_list.callback('+make_page_list.pageshow+',\'n\')">下一页</a>';
                var list = document.createElement('ul');
                    list.id = 'pagelist';
                var oFragment = document.createDocumentFragment();
                for (var i = 0 ; i < z ; i++) {
                    var list_li = document.createElement('li');
                    if ((i+1) == f) {
                        list_li.innerHTML = '<a class="cur" href="javascript:;" onclick=make_page_list.callback('+(i+1)+',false)>'+(i+1)+'</a>';
                    }else{
                        list_li.innerHTML = '<a href="javascript:;" onclick=make_page_list.callback('+(i+1)+',false)>'+(i+1)+'</a>';  
                    }
                    oFragment.appendChild(list_li);
                };
                list.appendChild(oFragment);
                pages.innerHTML = btn;
                pages.appendChild(list); 
            },
            pagelist:function (){
                var d = document.getElementById('pagelist');
                if (d.style.display == 'block') {
                    d.style.display = 'none';
                }else{
                    d.style.display = 'block';
                }
            },
            callback:function (i,c){
                if (c=='p' && i > 1) {
                    make_page_list.pageshow -= 1;
                }else if (c=='n' && i < make_page_list.con) {
                    make_page_list.pageshow += 1;
                }else{
                    make_page_list.pageshow = i
                }
                console.log(make_page_list.pageshow);
            }
        }
        window.make_page_list = make_page_list; 
        window.make_pages_list = make_page_list.page; 
    })()
    //当前页数
    // make_page_list.pageshow;
    //总页数
    // make_page_list.con;
    //当前分页的容器id;
    // make_page_list.pid;
    /*
     * 分页执行方法;
     * 需要传入f,z,id两个参数;
     * f  : 当前页数;
     * z  ：总页数;
     */
    // make_pages_list(3, 50)
    // make_page_list.pid = 'pages'
    /*
     * 自定义callback,
     * 需要传入i,c两个参数;
     * i : 当前点击页数;
     * p ：返回3个参数
       --'p':上一页;
       --'n':下一页;
       --false:直接点击页数;
     */
    make_page_list.callback=function(i,c){
        if (c=='p' && i >= 1) {
            if (i == 1) {
                document.getElementById('prv_btn').setAttribute('onclick','');
                return;
            };
            make_page_list.pageshow -= 1;
            make_pages_list(make_page_list.pageshow, make_page_list.con)
        }else if (c=='n' && i <= make_page_list.con) {
            if (i == make_page_list.con) {
                document.getElementById('next_btn').setAttribute('onclick','');
                return;
            };
            make_page_list.pageshow += 1;
            make_pages_list(make_page_list.pageshow, make_page_list.con)
        }else{
            make_page_list.pageshow = i;
            make_pages_list(make_page_list.pageshow, make_page_list.con)
        }
        alert(make_page_list.pageshow);
    }