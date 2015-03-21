Yscript.js
===================================
文件编号：	Yscript.js  
文件版本号：	0.6(2015.03.18.12.00)

###1、选择器
    以大写的Y为选择器 、Ys == new Y == Y() 一个空的Y对象  
    1）id选择符：Y(‘#idName’)   
    2）class选择符：Y(‘.className’)  
    3）节点选择符：Y(‘nodeName’)  
    4）子节点选择器：find(‘nodeName’)  
    5）选择第一个节点对象：first()  
    6）选择最后一个节点对象：last()  
    7）选择父节点对象：parent()  
    8）选择兄弟节点对象：sublings()  
    9）选择子节点对象：childs()  
    10）寻找当前节点对象：eq()  
    11）寻找所有节点：ge()  
    12）当前节点所在的索引：index()  
    //特别注意：ge()寻找的不是节点对象，只是DOM节点，具体区别就是后面不能使用 .css() 等操作，只能用原生js函数

###2、鼠标点击、划过事件
    事件函数与jquery一致  
    1）鼠标点击事件：click(function(){… })  
    2）鼠标划过事件：hover(function(){… }，function(){… })  
    //hover(划过事件函数，离开事件函数)  
  
###3、显示隐藏和透明度
    1）显示：show(num)  
  	2）隐藏：hide(num)  
  	3）透明度：opacity(num)  
  	// show()，hide() num为时间，毫秒为单位；opacity(num)的num为具体透明度，num=0-100的整数值；

###4、操作class
  	1）增加class：addClass(‘className’)  
  	2）删除class：removeClass(‘className’)  

###5、操作css
  	1）css操作属性：
      css(‘cssStyle’) //获取一个css属性
      css(‘cssStyle’, ‘value’) //设置一个css属性
      css({‘cssStyle1’：‘value1’ ‘cssStyle2’：‘value2’…}) 
      //设置一串css属性
  	2）attr操作属性：attr(‘obj’, ‘value’)
    	attr(‘obj’)  //获取一个行内属性
      attr(‘obj’, ‘value’)  //设置一个行内属性
      attr({‘obj1’：‘value1’ ‘obj2’：‘value2’…}) 
      //设置一串css属性
    
###6、文档操作
    1）获取对象文本内容：text()  
    2）获取对象html内容：html()  
    3）获取对象value内容：value()  
    4）操作对象文本内容：text(‘value’)  
    5）操作对象html内容：html (‘value’)  
    6）操作对象value内容：value (‘value’)  
      //改变对象的值只需要在函数内赋值就可以了  
    7）增加一个节点：append(html, location)  
      //html可以是字符串也可以是对象，location定位插入文档在DOM节点的位置，默认在当前节点最后一个子节点之后插入 
      location{
        beforeBegin：在当前节点第一个子节点之前插入
        afterBegin：当前节点之前插入
        beforeEnd：在当前节点最后一个子节点之后插入
        afterEnd：当前节点之前插入
      }

###7、动画操作
    1）animate（attr，time ，fn）  
    // attr是具体的动画属性值json格式，time动画执行时间毫秒数，fn是回调函数
  
###8、Cookie
    1）setCookie(name, value, duration)  
      调用方法：setCookie=ys. setCookie=Y().setCookie
    2）getCookie(name)   
  	  调用方法：getCookie=ys. getCookie=Y().getCookie
    3）	delCookie(name)  
      调用方法：delCookie =ys. delCookie=Y().delCookie
    // name为名字，value是值	 
    //duration过期时间（天为单位，默认1天）

###9、Ajax
    ajax({
        type:"post",  //type参数可选，默认为get
        url:"test.jsp",  //url参数，必填
        data:"name=dipoo&info=good",
        dataType:"json",  //dataType参数可选，默认为text
        async: true , //async参数必填，true/false
        success:fn  //回调函数可选  
    });

###10、获取对象属性值
    1）获取对象高度：height()  
    2）获取对象宽度：width()  
    3）获取当前对象距顶部的距离：offsetTop()  
    4）获取当前对象距左边的距离：offsetLeft()  
    5）获取当前当前窗口宽度：getInner().width  
    获取当前当前窗口高度：getInner().height  

###11、补充说明
    1）Each遍历：each(object, callback, args)  
    2）去首位空格：trim(string)  
    3）事件发生器bind(event, fn)  
    4）获取url 参数：url.getUrlParam(key)  
    5）设置url 参数：url.setUrlParam(key,value)  
    6）增加debug，默认打印错误信息；

###12、msg自定义弹窗
	  mag (str) 打印信息：str可以使string，number和function；








