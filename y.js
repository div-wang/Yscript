/*
 *y.js
 *版本：0.1.2 
 *制作：div_wang
 *版权所有：39yst.com
 *特别感谢‘落雪飞花’，提供的技术支持！(*^__^*)
 *未经授权，不得用做商业用途，否则承担法律责任。
 */
(function () {

/*
 *工具类开始
 */

//浏览器检测  
(function () {  
    window.sys = {};  
    var ua = navigator.userAgent.toLowerCase();   
    var s;        
    (s = ua.match(/msie ([\d.]+)/)) ? sys.ie = s[1] :  
    (s = ua.match(/firefox\/([\d.]+)/)) ? sys.firefox = s[1] :  
    (s = ua.match(/chrome\/([\d.]+)/)) ? sys.chrome = s[1] :   
    (s = ua.match(/opera\/.*version\/([\d.]+)/)) ? sys.opera = s[1] :   
    (s = ua.match(/version\/([\d.]+).*safari/)) ? sys.safari = s[1] : 0;      
    if (/webkit/.test(ua)) sys.webkit = ua.match(/webkit\/([\d.]+)/)[1];  
	if (typeof(HTMLElement) !== "undefined") {
		HTMLElement.prototype.insertAdjacentElement = function(where, parsedNode) {
			switch (where) {
				case "beforeBegin":
					this.parentNode.insertBefore(parsedNode, this);
					break;
				case "afterBegin":
					this.insertBefore(parsedNode, this.firstChild);
					break;
				case "beforeEnd":
					this.appendChild(parsedNode);
					break;
				case "afterEnd":
					if (this.nextSibling)
						this.parentNode.insertBefore(parsedNode, this.nextSibling);
					else
						this.parentNode.appendChild(parsedNode);
					break;
			}
		}
		HTMLElement.prototype.insertAdjacentHTML = function(where, htmlStr) {
			var r = this.ownerDocument.createRange();
			r.setStartBefore(this);
			var parsedHTML = r.createContextualFragment(htmlStr);
			this.insertAdjacentElement(where, parsedHTML);
		}
		HTMLElement.prototype.insertAdjacentText = function(where, txtStr) {
			var parsedText = document.createTextNode(txtStr);
			this.insertAdjacentElement(where, parsedText);
		}
	}
})();  

//DOM加载
function addDomLoaded(fn) {
	var isReady = false;
	var timer = null;
	function doReady() {
		if (timer) clearInterval(timer);
		if (isReady) return;
		isReady = true;
		fn();
	}
	
	if ((sys.opera && sys.opera < 9) || (sys.firefox && sys.firefox < 3) || (sys.webkit && sys.webkit < 525)) {
		//无论采用哪种，基本上用不着了
		timer = setInterval(function () {
			if (document && document.getElementById && document.getElementsByTagName && document.body) {
				doReady();
			}
		}, 1);
	} else if (document.addEventListener) {//W3C
		addEvent(document, 'DOMContentLoaded', function () {
			fn();
			removeEvent(document, 'DOMContentLoaded', arguments.callee);
		});
	} else if (sys.ie && sys.ie < 9){
		var timer = null;
		timer = setInterval(function () {
			try {
				document.documentElement.doScroll('left');
				doReady();
			} catch (e) {};
		}, 1);
	}
}

//跨浏览器添加事件绑定
function addEvent(obj, type, fn) {
	if (typeof obj.addEventListener != 'undefined') {
		obj.addEventListener(type, fn, false);
	} else {
		//创建一个存放事件的哈希表(散列表)
		if (!obj.events) obj.events = {};
		//第一次执行时执行
		if (!obj.events[type]) {	
			//创建一个存放事件处理函数的数组
			obj.events[type] = [];
			//把第一次的事件处理函数先储存到第一个位置上
			if (obj['on' + type]) obj.events[type][0] = fn;
		} else {
			//同一个注册函数进行屏蔽，不添加到计数器中
			if (addEvent.equal(obj.events[type], fn)) return false;
		}
		//从第二次开始我们用事件计数器来存储
		obj.events[type][addEvent.ID++] = fn;
		//执行事件处理函数
		obj['on' + type] = addEvent.exec;
	}
}

//为每个事件分配一个计数器
addEvent.ID = 1;

//执行事件处理函数
addEvent.exec = function (event) {
	var e = event || addEvent.fixEvent(window.event);
	var es = this.events[e.type];
	for (var i in es) {
		es[i].call(this, e);
	}
};

//同一个注册函数进行屏蔽
addEvent.equal = function (es, fn) {
	for (var i in es) {
		if (es[i] == fn) return true;
	}
	return false;
}

//把IE常用的Event对象配对到W3C中去
addEvent.fixEvent = function (event) {
	event.preventDefault = addEvent.fixEvent.preventDefault;
	event.stopPropagation = addEvent.fixEvent.stopPropagation;
	event.target = event.srcElement;
	return event;
};

//IE阻止默认行为
addEvent.fixEvent.preventDefault = function () {
	this.returnValue = false;
};

//IE取消冒泡
addEvent.fixEvent.stopPropagation = function () {
	this.cancelBubble = true;
};


//跨浏览器删除事件
function removeEvent(obj, type, fn) {
	if (typeof obj.removeEventListener != 'undefined') {
		obj.removeEventListener(type, fn, false);
	} else {
		if (obj.events) {
			for (var i in obj.events[type]) {
				if (obj.events[type][i] == fn) {
					delete obj.events[type][i];
				}
			}
		}
	}
}


//跨浏览器获取视口大小
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

//跨浏览器获取滚动条位置
function getScroll() {
	return {
		top : document.documentElement.scrollTop || document.body.scrollTop,
		left : document.documentElement.scrollLeft || document.body.scrollLeft
	}
}


//跨浏览器获取Style
function getStyle(element, attr) {
	var value;
	if (typeof window.getComputedStyle != 'undefined') {//W3C
		value = window.getComputedStyle(element, null)[attr];
	} else if (typeof element.currentStyle != 'undeinfed') {//IE
		value = element.currentStyle[attr];
	}
	return value;
}


//判断class是否存在
function hasClass(element, className) {
	return element.className.match(new RegExp('(\\s|^)' +className +'(\\s|$)'));
}


//跨浏览器添加link规则
function insertRule(sheet, selectorText, cssText, position) {
	if (typeof sheet.insertRule != 'undefined') {//W3C
		sheet.insertRule(selectorText + '{' + cssText + '}', position);
	} else if (typeof sheet.addRule != 'undefined') {//IE
		sheet.addRule(selectorText, cssText, position);
	}
}

//跨浏览器移出link规则
function deleteRule(sheet, index) {
	if (typeof sheet.deleteRule != 'undefined') {//W3C
		sheet.deleteRule(index);
	} else if (typeof sheet.removeRule != 'undefined') {//IE
		sheet.removeRule(index);
	}
}

//跨浏览器获取innerText
function getInnerText(element) {
	return (typeof element.textContent == 'string') ? element.textContent : element.innerText;
}

//跨浏览器设置innerText
function setInnerText(elememt, text) {
	if (typeof element.textContent == 'string') {
		element.textContent = text;
	} else {
		element.innerText = text;
	}
}

//获取某一个元素到最外层顶点的位置
function offsetTop(element) {
	var top = element.offsetTop;
	var parent = element.offsetParent;
	while (parent != null) {
		top += parent.offsetTop;
		parent = parent.offsetParent;
	}
	return top;
}

//删除左后空格
function trim(str) {
	return str.replace(/(^\s*)|(\s*$)/g, '');
}

//某一个值是否存在某一个数组中
function inArray(array, value) {
	for (var i in array) {
		if (array[i] === value) return true;
	}
	return false;
}

//获取某一个节点的上一个节点的索引
function prevIndex(current, parent) {
	var length = parent.children.length;
	if (current == 0) return length - 1;
	return parseInt(current) - 1;
}

//获取某一个节点的下一个节点的索引
function nextIndex(current, parent) {
	var length = parent.children.length;
	if (current == length - 1) return 0;
	return parseInt(current) + 1;
}

//滚动条固定
function fixedScroll() {
	window.scrollTo(fixedScroll.left, fixedScroll.top);
}

//阻止默认行为
function predef(e) {
	e.preventDefault();
}


/*
 *
 *方法类开始
 *
 */
//基础库
function Base(args) {
	//创建一个数组，来保存获取的节点和节点数组
	this.elements = [];
	
	if (typeof args == 'string') {
		//css模拟
		if (args.indexOf(' ') != -1) {
			var elements = args.split(' ');			//把节点拆开分别保存到数组里
			var childElements = [];					//存放临时节点对象的数组，解决被覆盖的问题
			var node = [];								//用来存放父节点用的
			for (var i = 0; i < elements.length; i ++) {
				if (node.length == 0) node.push(document);		//如果默认没有父节点，就把document放入
				switch (elements[i].charAt(0)) {
					case '#' :
						childElements = [];				//清理掉临时节点，以便父节点失效，子节点有效
						childElements.push(this.getId(elements[i].substring(1)));
						node = childElements;		//保存父节点，因为childElements要清理，所以需要创建node数组
						break;
					case '.' : 
						childElements = [];
						for (var j = 0; j < node.length; j ++) {
							var temps = this.getClass(elements[i].substring(1), node[j]);
							for (var k = 0; k < temps.length; k ++) {
								childElements.push(temps[k]);
							}
						}
						node = childElements;
						break;
					default : 
						childElements = [];
						for (var j = 0; j < node.length; j ++) {
							var temps = this.getTagName(elements[i], node[j]);
							for (var k = 0; k < temps.length; k ++) {
								childElements.push(temps[k]);
							}
						}
						node = childElements;
				}
			}
			this.elements = childElements;
		} else {
			//find模拟
			switch (args.charAt(0)) {
				case '#' :
					this.elements.push(this.getId(args.substring(1)));
					break;
				case '.' : 
					this.elements = this.getClass(args.substring(1));
					break;
				default : 
					this.elements = this.getTagName(args);
			}
		}
	} else if (typeof args == 'object') {
		if (args != undefined) {    //_this是一个对象，undefined也是一个对象，区别与typeof返回的带单引号的'undefined'
			this.elements[0] = args;
		}
	} else if (typeof args == 'function') {
		this.ready(args);
	}
}

//addDomLoaded
Base.prototype.ready = function (fn) {
	addDomLoaded(fn);
};

//获取ID节点
Base.prototype.getId = function (id) {
	return document.getElementById(id)
};

//获取元素节点数组
Base.prototype.getTagName = function (tag, parentNode) {
	var node = null;
	var temps = [];
	if (parentNode != undefined) {
		node = parentNode;
	} else {
		node = document;
	}
	var tags = node.getElementsByTagName(tag);
	for (var i = 0; i < tags.length; i ++) {
		temps.push(tags[i]);
	}
	return temps;
};

//获取CLASS节点数组
Base.prototype.getClass = function (className, parentNode) {
	var node = null;
	var temps = [];
	if (parentNode != undefined) {
		node = parentNode;
	} else {
		node = document;
	}
	var all = node.getElementsByTagName('*');
	for (var i = 0; i < all.length; i ++) {
		if ((new RegExp('(\\s|^)' +className +'(\\s|$)')).test(all[i].className)) {
			temps.push(all[i]);
		}
	}
	return temps;
}

//设置CSS选择器子节点
Base.prototype.find = function (str) {
	var childElements = [];
	for (var i = 0; i < this.elements.length; i ++) {
		switch (str.charAt(0)) {
			case '#' :
				childElements.push(this.getId(str.substring(1)));
				break;
			case '.' : 
				var temps = this.getClass(str.substring(1), this.elements[i]);
				for (var j = 0; j < temps.length; j ++) {
					childElements.push(temps[j]);
				}
				break;
			default : 
				var temps = this.getTagName(str, this.elements[i]);
				for (var j = 0; j < temps.length; j ++) {
					childElements.push(temps[j]);
				}
		}
	}
	this.elements = childElements;
	return this;
}

//获取某一个节点，并返回这个节点对象
Base.prototype.ge = function (num) {	
	return this.elements[num];
};

//获取首个节点，并返回这个节点对象
Base.prototype.first = function () {
	return this.elements[0];
};

//获取末个节点，并返回这个节点对象
Base.prototype.last = function () {
	return this.elements[this.elements.length - 1];
};


//获取某一个节点的属性
Base.prototype.attr = function (obj, value) {
	for (var i = 0; i < this.elements.length; i ++) {
		if (arguments.length == 1) {
			return this.elements[i].getAttribute(obj);
		} else if (arguments.length == 2) {
			this.elements[i].setAttribute(obj, value);
		}
	}
	return this;
};

//获取某一个节点在整个节点组中是第几个索引
Base.prototype.index = function () {
	var children = this.elements[0].parentNode.children;
	for (var i = 0; i < children.length; i ++) {
		if (this.elements[0] == children[i]) return i;
	}
};

//设置某一个节点的透明度
Base.prototype.opacity = function (num) {
	for (var i = 0; i < this.elements.length; i ++) {
		this.elements[i].style.opacity = num / 100;
		this.elements[i].style.filter = 'alpha(opacity=' + num + ',finishOpacity=0,style=0)';
	}
	return this;
};

//获取某一个节点，并且Base对象
Base.prototype.eq = function (num) {
	var element = this.elements[num];
	this.elements = [];
	this.elements[0] = element;
	return this;
};

//获取某一个节点的高度值，
Base.prototype.height = function (obj) {
	for (var i = 0; i < this.elements.length; i ++) {
			var px = getStyle(this.elements[i],'height');
			var height = px.split('p');
			return height[0]
	}
}

//获取某一个节点的宽度值，
Base.prototype.width = function () {
	for (var i = 0; i < this.elements.length; i ++) {
			var px = getStyle(this.elements[i],'width');
			var width = px.split('p');
			return width[0]
	}
}

//获取某一个对象距离顶部的距离，
Base.prototype.offsetTop = function () {
	for (var i = 0; i < this.elements.length; i ++) {
			var top = this.elements[i].offsetTop ;
			return top
	}
}
//获取某一个对象距离左边的距离，
Base.prototype.offsetLeft = function () {
	for (var i = 0; i < this.elements.length; i ++) {
			var left = this.elements[i].offsetLeft ;
			return left
	}
}

//设置CSS
Base.prototype.css = function (attr, value) {
	for (var i = 0; i < this.elements.length; i ++) {
		if (arguments.length == 1) {
			return getStyle(this.elements[i], attr);
		}
		this.elements[i].style[attr] = value;
	}
	return this;
}


//添加Class
Base.prototype.addClass = function (className) {
	for (var i = 0; i < this.elements.length; i ++) {
		if (!hasClass(this.elements[i], className)) {
			this.elements[i].className += ' ' + className;
		}
	}
	return this;
}

//移除Class
Base.prototype.removeClass = function (className) {
	for (var i = 0; i < this.elements.length; i ++) {
		if (hasClass(this.elements[i], className)) {
			this.elements[i].className = this.elements[i].className.replace(new RegExp('(\\s|^)' +className +'(\\s|$)'), ' ');
		}
	}
	return this;
}


//设置表单字段内容获取
Base.prototype.value = function (str) {
	for (var i = 0; i < this.elements.length; i ++) {
		if(this.elements[i].tagName != 'INPUT' && 
				this.elements[i].tagName != 'TEXTAREA')
			continue;
		else{
			if (arguments.length == 0) {
				return this.elements[i].value;
			}
			this.elements[i].value = str;
			return this;
		}
	}
	return null;
}

/**
 * 表单字段获得焦点
 * @author	 eglic.csdn@gmail.com
 * @returns {_L9.Base.prototype}
 */
Base.prototype.focus = function () {
	for (var i = 0; i < this.elements.length; i ++) {
		if(this.elements[i].tagName != 'INPUT' && 
				this.elements[i].tagName != 'BUTTON' && 
				this.elements[i].tagName != 'TEXTAREA')
			continue;
		else{
			this.elements[i].focus();
		}
	}
	return this;
}

/**
 * 表单字段选中内容
 * @author	 eglic.csdn@gmail.com
 * @returns {_L9.Base.prototype}
 */
Base.prototype.select = function () {
	for (var i = 0; i < this.elements.length; i ++) {
		if(this.elements[i].tagName != 'INPUT' && 
				this.elements[i].tagName != 'TEXTAREA')
			continue;
		else{
			this.elements[i].select();
		}
	}
	return this;
}

//设置innerHTML
Base.prototype.html = function (str) {
	for (var i = 0; i < this.elements.length; i ++) {
		if (arguments.length == 0) {
			return this.elements[i].innerHTML;
		}
		this.elements[i].innerHTML = str;
	}
	return this;
}

//设置innerText
Base.prototype.text = function (str) {
	for (var i = 0; i < this.elements.length; i ++) {
		if (arguments.length == 0) {
			return getInnerText(this.elements[i]);
		}
		if (typeof this.elements[i].textContent == 'string') 
		this.elements[i].textContent = str ;
		else
		this.elements[i].innerText = str ;
	}
	return this;
}
Base.prototype.childs = function () {
	var c = [];
	for (var i = 0; i < this.elements.length; i ++) {
		if(this.elements[i] instanceof HTMLElement){
			if(this.elements[i].childNodes && this.elements[i].childNodes.length > 0){
				for(var j=0;j<this.elements[i].childNodes.length;j++){
					c.push(this.elements[i].childNodes[j]);
				}
			}
		}
	}
	return c;
}

Base.prototype.append = function (html) {
	if(this.elements.length > 0) for(var i=0;i<this.elements.length;i++){
		if(typeof html === 'string'){
			this.elements[i].insertAdjacentHTML('beforeEnd',html);
		}else if((html instanceof HTMLElement) || (html instanceof Text)){
			this.elements[i].insertAdjacentElement('beforeEnd',html);
			return this;
		}else if(html instanceof Base){
			if(html.elements.length > 0){
				for(var j=0;j<html.elements.length;j++){
					this.elements[i].insertAdjacentElement('beforeEnd',html.elements[j]);
				}
			}
			return this;
		}else{
			throw new Error('错误的对象类型');
		}
	}
	return this;
}

//设置事件发生器
Base.prototype.bind = function (event, fn) {
	for (var i = 0; i < this.elements.length; i ++) {
		addEvent(this.elements[i], event, fn);
	}
	return this;
};

//设置鼠标移入移出方法
Base.prototype.hover = function (over, out) {
	for (var i = 0; i < this.elements.length; i ++) {
		addEvent(this.elements[i], 'mouseover', over);
		addEvent(this.elements[i], 'mouseout', out);
	}
	return this; 
};

//设置显示
Base.prototype.show = function () {
	for (var i = 0; i < this.elements.length; i ++) {
		this.elements[i].style.display = 'block';
	}
	return this;
};

//设置隐藏
Base.prototype.hide = function () {
	for (var i = 0; i < this.elements.length; i ++) {
		this.elements[i].style.display = 'none';
	}
	return this;
};

//触发点击事件
Base.prototype.click = function (fn) {
	for (var i = 0; i < this.elements.length; i ++) {
		this.elements[i].onclick = fn;
	}
	return this;
};

//触发浏览器窗口事件
Base.prototype.resize = function (fn) {
	for (var i = 0; i < this.elements.length; i ++) {
		var element = this.elements[i];
		addEvent(window, 'resize', function () {
			fn();
			if (element.offsetLeft > getInner().width + getScroll().left - element.offsetWidth) {
				element.style.left = getInner().width + getScroll().left - element.offsetWidth + 'px';
				if (element.offsetLeft <= 0 + getScroll().left) {
					element.style.left = 0 + getScroll().left + 'px';
				}
			}
			if(element.offsetTop > getInner().height + getScroll().top - element.offsetheight) {
				element.style.top = getInner().height + getScroll().top - element.offsetheight + 'px';
				if (element.offsetTop <= 0 + getScroll().top) {
					element.style.top = 0 + getScroll().top + 'px';
				}
			}
		});
	}
	return this;
};


//插件入口
Base.prototype.extend = function (name, fn) {
	Base.prototype[name] = fn;
};



//前台调用
var Y = function (args) {
	return new Base(args);
}

window.Y = Y;

})();

//写入Cookie，name为名字，value是值
//duration过期时间（天为单位，默认1天）
function setCookie(name, value, duration) {
    var oDate = new Date();
    if (duration <= 0)
        duration = 1;
	oDate.setDate(oDate.getDate()+duration);
    document.cookie = name + "=" + encodeURI(value) + "; expires=" + oDate;
};
//读取Cookie,不存在返回空字符串""
function getCookie(name) {
    var arr=document.cookie.split('; ');
	for(var i=0;i<arr.length;i++) {
		var arr2=arr[i].split('=');
		if(arr2[0]==name) {
			return decodeURIComponent(arr2[1]);
		}
	}
	return "";
};
//移除Cookie
function delCookie(name) {
    setCookie(name, 1, -1);
};

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
		var bStop=true;		//假设：所有值都已经到了
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
}


//封装ajax
ajax = function(conf) {
	var xhr = (function () {
		if (typeof XMLHttpRequest != 'undefined') {
			return new XMLHttpRequest();
		} else if (typeof ActiveXObject != 'undefined') {
			var version = [
										'MSXML2.XMLHttp.6.0',
										'MSXML2.XMLHttp.3.0',
										'MSXML2.XMLHttp'
			];
			for (var i = 0; version.length; i ++) {
				try {
					return new ActiveXObject(version[i]);
				} catch (e) {
					//跳过
				}	
			}
		} else {
			throw new Error('您的系统或浏览器不支持XHR对象！');
		}
	})();
	//type参数,可选
    var type = conf.type;
    //url参数，必填 
    var url = conf.url;
    //data参数可选，只有在post请求时需要
    var data = conf.data;
    //datatype参数可选    
    var dataType = conf.dataType;
    //异步还是同步
    var async = conf.async;
    //回调函数可选
    var success = conf.success;
    
    if (type == null){
        //type参数可选，默认为get
        type = "get";
    }
    if (dataType == null){
        //dataType参数可选，默认为text
        dataType = "text";
    }
    if (async == null){
        //type参数可选，默认为get
        async = true;
    }

    // 打开
    xhr.open(type, url, async);
    // 发送
    if (type == "GET" || type == "get") {
        xhr.send(null);
    } else if (type == "POST" || type == "post") {
        xhr.setRequestHeader("content-type",
                    "application/x-www-form-urlencoded");
        xhr.send(data);
    }
    if (async) {
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 && xhr.status == 200) {
				if(dataType == "text"||dataType=="TEXT") {
					if (success != null){
						//普通文本
						success(xhr.responseText);
					}
				}else if(dataType=="xml"||dataType=="XML") {
					if (success != null){
						//接收xml文档    
						success(xhr.responseXML);
					}  
				}else if(dataType=="json"||dataType=="JSON") {
					if (success != null){
						//将json字符串转换为js对象  
						success(eval("("+xhr.responseText+")"));
					}
				}
			}
		};
	}else{
		if(xhr.readyState == 4 && xhr.status == 200){
			//TODO: 根据datatype 返回相应的值
			if(dataType == "text"||dataType=="TEXT") {
				return xhr.responseText;
			}else if(dataType=="xml"||dataType=="XML") {
				return xhr.responseXML;
			}else if(dataType=="json"||dataType=="JSON") {
				return eval("("+xhr.responseText+")");
			}
		}else{
			return null;
		}
	}
}

/**
 * 获取url 参数
 */
String.prototype.getUrlParam = function(key){
	if(this.indexOf('?') > 0){
		var sreg = '(\\?|\\&)(' + key + ')(\\=)(.*?)([\\&]|$)';
		var oreg = new RegExp(sreg,'gim');
		if(oreg.test(this)){
			return RegExp.$4;
		}else{
			return null;
		}
	}else{
		return null;
	}
}
/**
 * 设置url 参数
 */
String.prototype.setUrlParam = function(key,value){
	if(this.indexOf('?') > 0){
		var sreg = '(\\?|\\&)(' + key + ')(\\=)(.*?)([\\&]|$)';
		var oreg = new RegExp(sreg,'gim');
		if(oreg.test(this)){
			return this.replace(oreg,'$1$2$3' + value + '$5');
		}else{
			return this + '&' + key + '=' + value;
		}
	}else{
		return this + '?' + key + '=' + value;
	}
}
/**
 * 去头尾空白
 */
String.prototype.trim = function (){
	return this.replace(/(^\s+)|(\s+$)/gi,'');
}

function each(object, callback, args) {
//该方法有三个参数:进行操作的对象obj，进行操作的函数fn，函数的参数args
	var name, i = 0,length = object.length;
	if (args) {
		if (length == undefined) {
			for (name in object) {
				if (callback.apply(object[name], args) === false) {
					break;
				}
			}
		}else {
			for (; i < length;) {
				if (callback.apply(object[i++], args) === false) {
					break;
				}
			}
		}
	} else {
		if (length == undefined) {
			for (name in object) {
				if (callback.call(object[name], name, object[name]) === false) {
					break;
				}
			}
		} else {
			for (var value = object[0]; i < length && callback.call(value, i, value) !== false; value = object[++i]) {}
		}
	}
	return object;
}