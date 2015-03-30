	var ajax = function(conf) {
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