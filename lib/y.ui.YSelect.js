/*
 *id     ： id    当前插件的父元素
 *data   ： json  选择的数据（json格式）
 *bool   ： true/false  data数据如果要分离成两个 值为true
 *config ： 配置data的内部对象(type在bool为true的时候生效)
 	{   
		id    : 数据字段,
		name  : 数据名称, 
		alias : 数据名称首字母,
		type  : 数据类型
	}  
 *fn     ： function fn(){}   回调函数，点击生成标签的时执行的函
 */
function YSelect(id,Ydata,bool,config,fn){
	var data = [];
	Yselect_close = {};
	var name_list = {A:[],B:[],C:[],D:[],E:[],F:[],G:[],H:[],I:[],J:[],K:[],L:[],M:[],N:[],O:[],P:[],Q:[],R:[],S:[],T:[],U:[],V:[],W:[],X:[],Y:[],Z:[],其他:[]} //新建数组，防止出现undefind
	var YDropdowns = document.getElementById(id);
	//处理数据
	function Pretreatment(){ 
		var CatalogData = [];
		var BrandData = [];
		var china = [];
		var foreign = [];
		for (var i in Ydata) {
			if (Ydata[i][config.type] == null) 
			CatalogData.push(Ydata[i][config.id]+';'+Ydata[i][config.name]+';'+Ydata[i][config.alias])
			else
			BrandData.push(Ydata[i][config.id]+';'+Ydata[i][config.name]+';'+Ydata[i][config.alias]+';'+Ydata[i][config.type])
		};
		if (BrandData != "") {
		    for (var i = 0 ; i < BrandData.length ; i++) {
				var str = BrandData[i].split(';')
				if (str[3] == 0) china.push(str[0] + ';' + str[1] + ';' + str[2]);
				else foreign.push(str[0] + ';' + str[1] + ';' + str[2]);
			}
			if (bool) {
				data = china;
				return data;
			}else {
				data = foreign;
				return data;
			}
		}else{
			data = CatalogData;
			//返回出数据
			return data; 
		}
	};
	//处理Pretreatment返回出的数据
	function jsondata(data_name,ida){		
		var tit = []; //定义首字母
		var Ahtml = {A:[],B:[],C:[],D:[],E:[],F:[],G:[],H:[],I:[],J:[],K:[],L:[],M:[],N:[],O:[],P:[],Q:[],R:[],S:[],T:[],U:[],V:[],W:[],X:[],Y:[],Z:[],其他:[]}; //新建数组，防止出现undefind
		//新建选择框父元素
		var Yselect_box = document.createElement("div"); 
		Yselect_box.id = ida+"_Yselect_box";
		//字母返回值的容器
		var Yselect_div = document.createElement("div");
		//26字母容器 
		var Yselect_letter = document.createElement("p"); 
		Yselect_letter.id = ida+'_Yselect_letter'
		//创建皮肤，有两套皮肤可供选择
		var stylelink = document.createElement("style") 
		stylelink.type = 'text/css'; 
		//stylelink.innerHTML = '#'+id+'_Yselect_box{width: 100%;position:absolute;top:30px;left:0;z-index:9999;background:#fff}#'+id+'_Yselect_box p{background: #469bde;padding:0 10px;}#'+id+'_Yselect_box p span.close{font: 16px/20px 微软雅黑;cursor:pointer;position:absolute;top:0;right:0;color:#f00}#'+id+'_Yselect_box .hide_tag{border: 1px solid #469bde;padding:5px;display: none;min-height:100px;max-height:300px;min-width:300px;max-width:800px;overflow:auto}#'+id+'_Yselect_box p a{padding:5px;line-height: 28px;color:#fff}#'+id+'_Yselect_box .hide_tag a{width:80px;display:block;text-decoration:none;padding:5px;line-height: 12px;font-size:12px;float:left;color:#444;overflow: hidden; text-overflow:ellipsis;white-space:nowrap;}#'+id+'_Yselect_box .hide_tag a:hover{background:#469bde;color:#fff;}#'+id+'_Yselect_box .cur{border-bottom: 2px solid #fac51f}';
		//stylelink.innerHTML = '#'+ida+'_Yselect_box{width: 100%;min-width:500px;max-width:800px;position:absolute;top:30px;left:0;z-index:9999;background:#fff;border:1px solid #ddd;}#'+ida+'_Yselect_box p{padding:0 10px;}#'+ida+'_Yselect_box p span.close{font: 16px/20px 微软雅黑;cursor:pointer;position:absolute;top:0;right:0;color:#666}#'+ida+'_Yselect_box .hide_tag{padding:5px 10px;display: none;min-height:50px;max-height:200px;overflow:auto}#'+ida+'_Yselect_box p a{padding:5px;line-height: 28px;color:#333;border-bottom:2px solid #bbb;font-weight:bold}#'+ida+'_Yselect_box .hide_tag a{width:80px;display:block;text-decoration:none;padding:5px;line-height: 12px;font-size:12px;float:left;color:#444;overflow: hidden; text-overflow:ellipsis;white-space:nowrap;}#'+ida+'_Yselect_box .hide_tag a:hover{background:#469bde;color:#fff;}#'+ida+'_Yselect_box a.cur{border-bottom: 2px solid #469bde;color:#469bde}';
	    rules = document.createTextNode('#'+ida+'_Yselect_box{width: 100%;min-width:500px;max-width:800px;position:absolute;top:30px;left:0;z-index:9999;background:#fff;border:1px solid #ddd;}#'+ida+'_Yselect_box p{padding:0 10px;}#'+ida+'_Yselect_box p span.close{font: 16px/20px 微软雅黑;cursor:pointer;position:absolute;top:0;right:0;color:#666}#'+ida+'_Yselect_box .hide_tag{padding:5px 10px;display: none;min-height:50px;max-height:200px;overflow:auto}#'+ida+'_Yselect_box p a{padding:5px;line-height: 28px;color:#333;border-bottom:2px solid #bbb;font-weight:bold}#'+ida+'_Yselect_box .hide_tag a{width:80px;display:block;text-decoration:none;padding:5px;line-height: 12px;font-size:12px;float:left;color:#444;overflow: hidden; text-overflow:ellipsis;white-space:nowrap;}#'+ida+'_Yselect_box .hide_tag a:hover{background:#469bde;color:#fff;}#'+ida+'_Yselect_box a.cur{border-bottom: 2px solid #469bde;color:#469bde}');
		if(stylelink.styleSheet)
	    	stylelink.styleSheet.cssText = rules.nodeValue;
		else {
			stylelink.appendChild(rules);		
		}
		for (var i = 0 ; i < data_name.length ; i++) {
			var str = data_name[i].split(';')
			//判断首字母，赋值给tit	
			tit.push(str[2].charAt(0).toLocaleUpperCase()) 	
		};
		//将数据插入name_list里
		for(var j in tit){
			if(name_list[tit[j]])
			name_list[tit[j]].push(data_name[j]);
			else name_list.其他.push(data_name[j])		
		}	
		//处理数据，以字母分离，为空就隐藏
		for (var k in name_list){ 
			if (name_list[k].length != 0) {
				for (var i = 0 ; i < name_list[k].length ; i++) {
					var allhtml = '<a href="javascript:" onclick="'+fn+'(this)" title="'+ name_list[k][i].split(';')[1] + '" name="'+ name_list[k][i].split(';')[0] + '">' + name_list[k][i].split(';')[1] + '</a>';
					Ahtml[k] += allhtml ;
				};
				Yselect_letter.innerHTML += '<a href="javascript:" >'+k+'</a>';
				Yselect_div.innerHTML += '<div class="hide_tag">'+Ahtml[k]+'</div>';
			};
		} 
		var bool = true
		Yselect_box.innerHTML = '<p id="'+ida+'_Yselect_letter'+'">'+Yselect_letter.innerHTML+'<span class="close">x</span></p>'+ Yselect_div.innerHTML;
		//将select插入页面
		YDropdowns.appendChild(Yselect_box);
		YDropdowns.appendChild(stylelink); 
		//点击销毁select
		Yselect_box.getElementsByTagName('p')[0].getElementsByTagName('span')[0].onclick = function (){
			YDropdowns.removeChild(Yselect_box)
			YDropdowns.removeChild(stylelink);
			bool = false
		} 
		//销毁select函数
		Yselect_close.close = function (obool){
			if(obool){
				YDropdowns.removeChild(Yselect_box)
				YDropdowns.removeChild(stylelink);
				bool = false
				return
			};
			if (bool) {
				YDropdowns.removeChild(Yselect_box)
				YDropdowns.removeChild(stylelink);
			}
		} 
		return Yselect_close
	}
	jsondata(Pretreatment(),id)
	navlist(id)
	//tab选项卡处理函数
	function navlist(ids){ 
		var a = document.getElementById(ids+'_Yselect_letter').getElementsByTagName('a');
		var div = document.getElementById(ids+'_Yselect_box').getElementsByTagName('div');
		div[0].style.display = "block" ; a[0].className = "cur";
		for (var i = 0 ; i < a.length ; i++) {
			a[i].index = i;
			a[i].onclick = function(){
				for (var j = 0 ; j < a.length ; j++){
					div[j].style.display = "none";
					a[j].className = "";
				};
				div[this.index].style.display = "block";
				this.className = "cur"
			};
		};
	};
};	
