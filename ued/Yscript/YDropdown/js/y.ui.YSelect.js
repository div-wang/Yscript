function YDropdown(YDropdown,url,bool,config,fn){
	var data = [];
	Yselect_close = {};
	var name_list = {A:[],B:[],C:[],D:[],E:[],F:[],G:[],H:[],I:[],J:[],K:[],L:[],M:[],N:[],O:[],P:[],Q:[],R:[],S:[],T:[],U:[],V:[],W:[],X:[],Y:[],Z:[],其他:[]}
	var YDropdowns = document.getElementById(YDropdown);
	function Pretreatment(){
		var CatalogData = [];
		var BrandData = [];
		var china = [];
		var foreign = [];
		for (var i in url) {
			if (url[i][config.type] == null) 
			CatalogData.push(url[i][config.id]+';'+url[i][config.name]+';'+url[i][config.alias])
			else
			BrandData.push(url[i][config.id]+';'+url[i][config.name]+';'+url[i][config.alias]+';'+url[i][config.type])
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
			return data;
		}
	};
	function jsondata(data_name,id){		//处理数组
		var tit = [];
		var Ahtml = {A:[],B:[],C:[],D:[],E:[],F:[],G:[],H:[],I:[],J:[],K:[],L:[],M:[],N:[],O:[],P:[],Q:[],R:[],S:[],T:[],U:[],V:[],W:[],X:[],Y:[],Z:[],其他:[]};
		var Yselect_box = document.createElement("div");
		Yselect_box.id = id+"_Yselect_box";
		var Yselect_div = document.createElement("div");
		var Yselect_letter = document.createElement("p");
		Yselect_letter.id = id+'_Yselect_letter'
		var stylelink = document.createElement("style") 
		//stylelink.innerHTML = '#'+id+'_Yselect_box{width: 100%;position:absolute;top:30px;left:0;z-index:9999;background:#fff}#'+id+'_Yselect_box p{background: #469bde;padding:0 10px;}#'+id+'_Yselect_box p span.close{font: 16px/20px 微软雅黑;cursor:pointer;position:absolute;top:0;right:0;color:#f00}#'+id+'_Yselect_box .hide_tag{border: 1px solid #469bde;padding:5px;display: none;min-height:100px;max-height:300px;min-width:300px;max-width:800px;overflow:auto}#'+id+'_Yselect_box p a{padding:5px;line-height: 28px;color:#fff}#'+id+'_Yselect_box .hide_tag a{width:80px;display:block;text-decoration:none;padding:5px;line-height: 12px;font-size:12px;float:left;color:#444;overflow: hidden; text-overflow:ellipsis;white-space:nowrap;}#'+id+'_Yselect_box .hide_tag a:hover{background:#469bde;color:#fff;}#'+id+'_Yselect_box .cur{border-bottom: 2px solid #fac51f}';
		stylelink.innerHTML = '#'+id+'_Yselect_box{width: 100%;min-width:500px;max-width:800px;position:absolute;top:30px;left:0;z-index:9999;background:#fff;border:1px solid #ddd;}#'+id+'_Yselect_box p{padding:0 10px;}#'+id+'_Yselect_box p span.close{font: 16px/20px 微软雅黑;cursor:pointer;position:absolute;top:0;right:0;color:#666}#'+id+'_Yselect_box .hide_tag{padding:5px 10px;display: none;min-height:50px;max-height:200px;overflow:auto}#'+id+'_Yselect_box p a{padding:5px;line-height: 28px;color:#333;border-bottom:2px solid #bbb;font-weight:bold}#'+id+'_Yselect_box .hide_tag a{width:80px;display:block;text-decoration:none;padding:5px;line-height: 12px;font-size:12px;float:left;color:#444;overflow: hidden; text-overflow:ellipsis;white-space:nowrap;}#'+id+'_Yselect_box .hide_tag a:hover{background:#469bde;color:#fff;}#'+id+'_Yselect_box a.cur{border-bottom: 2px solid #469bde;color:#469bde}';
		for (var i = 0 ; i < data_name.length ; i++) {
			var str = data_name[i].split(';')
			tit.push(str[2].charAt(0).toLocaleUpperCase()) //判断首字母			
		};
		for(var j in tit){
			if(name_list[tit[j]])
			name_list[tit[j]].push(data_name[j]);
			else name_list.其他.push(data_name[j])		
		}
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
		Yselect_box.innerHTML = '<p id="'+id+'_Yselect_letter'+'">'+Yselect_letter.innerHTML+'<span class="close">x</span></p>'+ Yselect_div.innerHTML;
		YDropdowns.appendChild(Yselect_box);
		YDropdowns.appendChild(stylelink);	
		Yselect_box.getElementsByTagName('p')[0].getElementsByTagName('span')[0].onclick = function Yselect_close(){
			YDropdowns.removeChild(Yselect_box)
			YDropdowns.removeChild(stylelink);
			bool = false
		}
		Yselect_close.close = function Yselect_close(){
			if (bool) {
				YDropdowns.removeChild(Yselect_box)
				YDropdowns.removeChild(stylelink);
			}
		}
		return Yselect_close
	}
	jsondata(Pretreatment(),YDropdown)
	navlist(YDropdown)
	function navlist(id){
		var a = document.getElementById(id+'_Yselect_letter').getElementsByTagName('a');
		var div = document.getElementById(id+'_Yselect_box').getElementsByTagName('div');
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
