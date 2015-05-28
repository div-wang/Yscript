/*
 *Yscript.js
 *版本：0.7 
 *制作：div_wang:826950544@qq.com
 *版权所有：39yst.com
 *特别感谢‘eglic(eglic.csdn@gmail.com)’、‘落雪飞花’，提供的技术支持！(*^__^*)
 */
(function (w,d) {
	//定义head和body；
	var H = d.getElementsByTagName('head')[0] || d.head || d.documentElement;
    var B = d.getElementsByTagName('body')[0] || d.body || d.documentElement;
    
	//浏览器检测  
	(function () {  
	    w.sys = {};  
	    var ua = navigator.userAgent.toLowerCase();   
	    var s;        
	    (s = ua.match(/msie ([\d.]+)/)) ? sys.ie = s[1] :  
	    (s = ua.match(/firefox\/([\d.]+)/)) ? sys.firefox = s[1] :  
	    (s = ua.match(/chrome\/([\d.]+)/)) ? sys.chrome = s[1] :   
	    (s = ua.match(/opera\/.*version\/([\d.]+)/)) ? sys.opera = s[1] :   
	    (s = ua.match(/version\/([\d.]+).*safari/)) ? sys.safari = s[1] : 0;      
	    if (/webkit/.test(ua)) sys.webkit = ua.match(/webkit\/([\d.]+)/)[1];  
	})();  

	//append方法处理
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
		var e = event || addEvent.fixEvent(w.event);
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
		if (typeof w.innerWidth != 'undefined') {
			return {
				width : w.innerWidth,
				height : w.innerHeight
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
		if (typeof w.getComputedStyle != 'undefined') {//W3C
			value = w.getComputedStyle(element, null)[attr];
		} else if (typeof element.currentStyle != 'undeinfed') {//IE
			value = element.currentStyle[attr];
		}
		return value;
	}

	//动画组件
	function startMove(obj, json, time, fnEnd) {
		if (time>30) var s = Math.round(time/30)
		else var s = 1;
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
				var speed=(json[attr]-cur)/s;
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

	//删除空格
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
		w.scrollTo(fixedScroll.left, fixedScroll.top);
	}

	//阻止默认行为
	function predef(e) {
		e.preventDefault();
	}

	 /**
	 * 主库文件
	 * @author	 Div_wang
	 * 
	 */
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

	//原型扩展入口
	Base.fn = Base.prototype;

	var $ = Base;
	
	//addDomLoaded
	Base.fn.ready = function (fn) {
		addDomLoaded(fn);
	};

	//获取ID节点
	Base.fn.getId = function (id) {
		return document.getElementById(id)
	};

	//获取元素节点数组
	Base.fn.getTagName = function (tag, parentNode) {
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
	Base.fn.getClass = function (className, parentNode) {
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
	Base.fn.find = function (str) {
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
	Base.fn.ge = function (num) {	
		return this.elements[num];
	};

	//获取首个节点，并返回这个节点对象
	Base.fn.first = function () {
		var firstNode = this.elements[0];
		this.elements = [];
		this.elements[0] = firstNode;
		return this;
	};

	//获取末个节点，并返回这个节点对象
	Base.fn.last = function () {
		var lastNode = this.elements[this.elements.length - 1];
		this.elements = [];
		this.elements[0] = lastNode;
		return this;
	};

	//获取某一个节点在整个节点组中是第几个索引
	Base.fn.index = function () {
		var children = this.elements[0].parentNode.children;
		for (var i = 0; i < children.length; i ++) {
			if (this.elements[0] == children[i]) return i;
		}
	};

	//获取某一个节点，并且返回Base对象
	Base.fn.eq = function (num) {
		var element = this.elements[num];
		this.elements = [];
		this.elements[0] = element;
		return this;
	};

	//获取某一个节点的父元素
	Base.fn.parent = function () {
		for (var i = 0; i < this.elements.length; i ++) {
			var parent = this.elements[i].parentNode;
		}
		this.elements = [];
		this.elements[0] = parent;
		return this;
	};

	//获取某一个节点的兄弟元素
	Base.fn.sublings = function () {
		var sN = [];
		for (var i = 0; i < this.elements.length; i ++) {
			var subling = this.elements[i].parentNode.childNodes;
			if(subling && subling.length > 0){
				for(var j = 0; j < subling.length; j++){
					if (subling[j].nodeType==1)
					sN.push(subling[j]);
				}
			}
		}
		this.elements = sN;
		return this;
	};

	//获取某一个节点的子元素
	Base.fn.childs = function () {
		var cN = [];
		for (var i = 0; i < this.elements.length; i ++) {
			var childs = this.elements[i].childNodes;
			if(childs && childs.length > 0){
				for(var j = 0;j < childs.length; j++){
					if (childs[j].nodeType==1)
					cN.push(childs[j]);
				}
			}
		}
		this.elements = [];
		this.elements = cN;
		return this;
	}

	Base.fn.append = function (html,location) {
		//alert(html instanceof HTMLElement)
		if(this.elements.length > 0){
			if (arguments.length == 1) location = 'beforeEnd';
			for(var i=0;i<this.elements.length;i++){
				if(typeof html === 'string'){
					this.elements[i].insertAdjacentHTML(location,html);
				}else if(html instanceof Base){
					if(html.elements.length > 0){
						for(var j=0;j<html.elements.length;j++){
							this.elements[i].insertAdjacentElement(location,html.elements[j]);
						}
					}
					return this;
				}else if(typeof html === 'object'){
					this.elements[i].insertAdjacentElement(location,html);
					return this;
				}else{
					throw new Error('错误的对象类型');
				}
			}
		} 
		return this;
	}

	//获取某一个节点的属性
	Base.fn.attr = function (obj, value) {
		for (var i = 0; i < this.elements.length; i ++) {
			if (typeof obj == 'string' && arguments.length == 1) {
				return this.elements[i].getAttribute(obj);
			} else if (typeof obj == 'string' && arguments.length == 2) {
				if (w.ActiveXObject && sys.ie < 8) {
					if (obj == 'style'){
						this.elements[i].style.cssText=value;
					}else if (obj == 'class'){
						this.elements[i].setAttribute('className', value);
					}
					return
				}
				this.elements[i].setAttribute(obj, value);
			} else if (typeof obj == 'object' && arguments.length == 1) {
				for(var c in obj){
					if (w.ActiveXObject && sys.ie < 8) {
						if (c == 'style'){
							this.elements[i].style.cssText=obj[c];
						}else if (c == 'class'){
							this.elements[i].setAttribute('className', obj[c]);
						}
						return
					}else{
						this.elements[i].setAttribute(c, obj[c]);
					}
				}
			}
		}
		return this;
	};

	//设置CSS
	Base.fn.css = function (attr,value) {
		for (var i = 0; i < this.elements.length; i ++) {
			if (typeof attr == 'string' && arguments.length == 1) {
				return getStyle(this.elements[i], attr);
			}else if (typeof attr == 'object' && arguments.length == 1){
				var val = ''
				for(var c in attr){
					val += c+':'+attr[c]+';'
				}
				if (w.ActiveXObject && sys.ie < 8) {
					this.elements[i].style.cssText=val;
					return
				}
				this.elements[i].setAttribute('style', val)
			}else if (typeof attr == 'string' && arguments.length == 2){
				this.elements[i].style[attr] = value;
			}
		}
		return this;
	}

	//设置某一个节点的透明度
	Base.fn.opacity = function (num) {
		for (var i = 0; i < this.elements.length; i ++) {
			this.elements[i].style.opacity = num / 100;
			this.elements[i].style.filter = 'alpha(opacity=' + num + ',finishOpacity=0,style=0)';
		}
		return this;
	};

	//获取某一个节点的高度值，
	Base.fn.height = function (obj) {
		for (var i = 0; i < this.elements.length; i ++) {
			var px = getStyle(this.elements[i],'height');
			var height = px[i].split('p');
			return height[0]
		}
	}

	//获取某一个节点的宽度值，
	Base.fn.width = function () {
		for (var i = 0; i < this.elements.length; i ++) {
			var px = getStyle(this.elements[i],'width');
			var width = px.split('p');
			return width[0]
		}
	}

	//获取某一个对象距离顶部的距离，
	Base.fn.offsetTop = function () {
		for (var i = 0; i < this.elements.length; i ++) {
			var top = this.elements[i].offsetTop ;
			return top
		}
	}

	//获取某一个对象距离左边的距离，
	Base.fn.offsetLeft = function () {
		for (var i = 0; i < this.elements.length; i ++) {
			var left = this.elements[i].offsetLeft ;
			return left
		}
	}

	//添加Class
	Base.fn.addClass = function (className) {
		for (var i = 0; i < this.elements.length; i ++) {
			if (!hasClass(this.elements[i], className)) {
				this.elements[i].className += ' ' + className;
			}
		}
		return this;
	}

	//移除Class
	Base.fn.removeClass = function (className) {
		for (var i = 0; i < this.elements.length; i ++) {
			if (hasClass(this.elements[i], className)) {
				this.elements[i].className = this.elements[i].className.replace(new RegExp('(\\s|^)' +className +'(\\s|$)'), ' ');
			}
		}
		return this;
	}


	//设置表单字段内容获取
	Base.fn.value = function (str) {
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

	//获取innerHTML
	Base.fn.html = function (str) {
		for (var i = 0; i < this.elements.length; i ++) {
			if (arguments.length == 0) {
				return this.elements[i].innerHTML;
			}
			this.elements[i].innerHTML = str;
		}
		return this;
	}

	//获取innerText
	Base.fn.text = function (str) {
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

	//设置事件发生器
	Base.fn.on = function (event, fn) {
		for (var i = 0; i < this.elements.length; i ++) {
			addEvent(this.elements[i], event, fn);
		}
		return this;
	};

	//设置鼠标移入移出方法
	Base.fn.hover = function (over, out) {
		for (var i = 0; i < this.elements.length; i ++) {
			addEvent(this.elements[i], 'mouseover', over);
			addEvent(this.elements[i], 'mouseout', out);
		}
		return this; 
	};

	//设置显示
	Base.fn.show = function (num) {
		if (arguments.length == 1) {
			for (var i = 0; i < this.elements.length; i ++) {
				var element = this.elements[i]
				if (element.style.display == 'block') {return}
				var styles = ''
				if (element.getAttribute('style') != null) {
					styles = element.getAttribute('style')
				}else{
					styles = 'display:block';
				}
				element.style.opacity = 0;
				element.style.display = 'block';
				var height = element.offsetHeight;
				var width = element.offsetWidth;
				element.style.height = 0;
				element.style.width = 0;
				startMove(element, {'opacity':100,'height':height,'width':width},num,function(){element.setAttribute('style',styles);element.style.display = 'block'})				
			}
		}else{
			for (var i = 0; i < this.elements.length; i ++) {
				this.elements[i].style.display = 'block';
			}
		};
		return this;
	};

	//设置隐藏
	Base.fn.hide = function (num) {
		if (arguments.length == 1) {
			for (var i = 0; i < this.elements.length; i ++) {
				var element = this.elements[i];
				if (element.style.display == 'none') {return}
				var styles = ''
				if (element.getAttribute('style')!=null) {
					styles = element.getAttribute('style');
				}else{
					styles = 'display:none'
				}
				startMove(element, {'opacity':0,'height':0,'width':0},num,function(){element.setAttribute('style',styles);element.style.display = 'none'})
			}
		}else{
			for (var i = 0; i < this.elements.length; i ++) {
				this.elements[i].style.display = 'none';
			}
		};
		return this;
	};

	//触发点击事件
	Base.fn.click = function (fn) {
		for (var i = 0; i < this.elements.length; i ++) {
			this.elements[i].onclick = fn;
		}
		return this;
	};

	//触发浏览器窗口事件
	Base.fn.resize = function (fn) {
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

	//跨浏览器获取视口大小
	Base.fn.getInner = function() {
		if (typeof w.innerWidth != 'undefined') {
			return {
				width : w.innerWidth,
				height : w.innerHeight
			}
		} else {
			return {
				width : document.documentElement.clientWidth,
				height : document.documentElement.clientHeight
			}
		}
	}

	//简易动画函数
	Base.fn.animate = function (json, time, fnEnd) {
		for (var i = 0; i < this.elements.length; i ++) {
			var _this = this.elements[i];
			startMove(_this, json, time, fnEnd)
		}
		return this
	}

	/**
	 * 表单字段获得焦点
	 * @author	 eglic.csdn@gmail.com
	 * @returns {_L9.Base.prototype}
	 */
	Base.fn.focus = function () {
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
	Base.fn.select = function () {
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

	//each函数
	Base.fn.each = function(object, callback, args) {
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

	//封装ajax
	Base.fn.ajax = function(conf) {
		var xhr = (function () {
			if (typeof XMLHttpRequest != 'undefined') {
				return new XMLHttpRequest();
			} else if (typeof ActiveXObject != 'undefined') {
				var version = ['MSXML2.XMLHttp.6.0','MSXML2.XMLHttp.3.0','MSXML2.XMLHttp'];
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
	        //async参数可选，默认为true
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

    //自定义弹窗msg
    var u;
    Base.fn.msgshow = function(str,callback){
    	var u;
        var msg_width = d.body.clientWidth || d.documentElement.clientWidth,
            msg_height = d.body.clientHeight || d.documentElement.clientHeight;  
        var msg_srt_height = parseInt(msg_height*0.3)-110
        var popup_msg_style = d.createElement('style');
            popup_msg_style.type = "text/css";
        var popup_msg_style_text = '.popup_msg_box{width:30%;min-height:30%;padding:30px 5px 0px;font-family:"微软雅黑";text-align:center; border:1px solid #999;border-radius:5px;background:#fff;color:#333;position:fixed;top:30%;left:35%;z-index:12; }.popup_msg_str{width:100%;word-break:break-all;word-wrap:break-word;font-size:14px;font-weight:bold;line-height:1.6;padding-bottom:60px}.popup_mag_true{background:#f4f4f4;width:100%;position:absolute;bottom:0px;left:0;border-radius:5px;padding:10px 0;}.popup_mag_true input{width:90px;height:30px;border:none;border-radius:5px;background:#e50014;color:#fff;font-size:13px;font-weight:bold;}.popup_msg_close{position:absolute;top:-7px;right:-7px;background:#fff;border-radius:50%; cursor:pointer; color:#f33c3c; font-size:17px;font-weight:900;width:25px;height:25px;display:block;} #popup_msg_tan{position:absolute;top:0;width:100%;height:100%;background:#000;opacity:0.5;filter:alpha(opacity=50);z-index:10;width:100%;height:'+msg_height+'px;}'
            if (popup_msg_style.styleSheet) { //IE
              popup_msg_style.styleSheet.cssText = popup_msg_style_text;
            } else { 
              popup_msg_style.innerHTML = popup_msg_style_text;
            }
            H.appendChild(popup_msg_style);
        var popup_msg_tan = d.createElement('div');
            popup_msg_tan.id = 'popup_msg_tan';
            B.appendChild(popup_msg_tan);
        var popup_msg_box = d.createElement('div');
            popup_msg_box.innerHTML = '<a class="popup_msg_close" onclick="msgx(this)">X</a><div class="popup_msg_str">'+str+'<div id="time"></div></div><div class="popup_mag_true"><input type="button" value="确 定" onclick="msgx(this.parentNode)"></div>';
            popup_msg_box.className = 'popup_msg_box';
            B.appendChild(popup_msg_box);

            if(callback && typeof callback === 'function'){
                callback();
            }else if(callback && typeof callback == 'string'){
                if (callback.match('http://')||callback.match('https://')){
                    u = callback
                    var i=5,t,s = d.getElementById('time');
                    s.innerHTML = i+'秒后自动跳转';
                    t = setInterval(function(){
                        i-=1;
                        s.innerHTML = i+'秒后自动跳转';
                        if (i==0)  window.location.href = callback;
                    },1000);
                }else{
                    popup_msg_box.innerHTML = '<a class="popup_msg_close" onclick="msgx(this)">X</a><div class="popup_msg_str">参数2不正确，请输入正确的网址;<div id="time"></div></div><div class="popup_mag_true"><input type="button" value="确 定" onclick="msgx(this.parentNode)"></div>';
                }
            }
        w.onresize = function(){
        	msg_width = d.body.clientWidth || d.dElement.clientWidth,
            msg_height = d.body.clientHeight || d.dElement.clientHeight;
           	popup_msg_tan.style.width = msg_width+'px';
           	popup_msg_tan.style.height = msg_height+'px'
        }
    }
    // 自定义弹窗msg关闭
    Base.fn.msgclose = function(obj){
	    if (u) window.location.href = u;
        var a = H.childNodes;
        H.removeChild(a[a.length-1]);
        B.removeChild(d.getElementById('popup_msg_tan'));
        B.removeChild(obj.parentNode);
    }

	//去头尾空白
	Base.fn.trim = function (str){
		return str.replace(/(^\s+)|(\s+$)/gi,'');
	}

	//写入Cookie，name为名字，value是值
	//duration过期时间（天为单位，默认1天）
	Base.fn.setCookie = function(name, value, duration) {
	    var oDate = new Date();
	    if (duration <= 0)
	        duration = 1;
		oDate.setDate(oDate.getDate()+duration);
	    document.cookie = name + "=" + encodeURI(value) + "; expires=" + oDate;
	};
	//读取Cookie,不存在返回空字符串""
	Base.fn.getCookie = function(name) {
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
	Base.fn.delCookie = function(name) {
	    setCookie(name, 1, -1);
	};

	//插件入口
	Base.fn.extend = function (name, fn) {
		Base.prototype[name] = fn;
	};

	//debug
    Base.fn.debug = function(callback){
	    w.onerror = function (errorMessage, scriptURI, lineNumber, columnNumber) {
	        // 其他情况，都以alert方式直接提示错误信息
	        var msgs = [];
	        msgs.push("亲，代码有错误");
	        msgs.push("<br>错误信息：", errorMessage);
	        msgs.push("<br>出错文件：", scriptURI);
	        msgs.push("<br>出错位置：", lineNumber + '行，' + columnNumber + '列');
	        msg(msgs.join(''));
	    }    	
    }

	//前台调用
	var $ = function (args) {
		return new Base(args);
	}

	w.$ = $; 
	w.Debug = $().debug
	w.msgx = $().msgclose;   
    w.msg = $().msgshow;

})(window,document);


/**
 * 获取url 参数
 * eglic(eglic.csdn@gmail.com)
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
 * eglic(eglic.csdn@gmail.com)
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
