function YDropdown(YDropdown,url,bool,config,fn){
	var data = [];
	var name_list = {A:[],B:[],C:[],D:[],E:[],F:[],G:[],H:[],I:[],J:[],K:[],L:[],M:[],N:[],O:[],P:[],Q:[],R:[],S:[],T:[],U:[],V:[],W:[],X:[],Y:[],Z:[]}
	var YDropdown = document.getElementById(YDropdown);
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
	function jsondata(data_name){		//处理数组
		var tit = [];
		var qtHtml = [] ;
		var qtzimu = '' ;
		var Ahtml = {A:[],B:[],C:[],D:[],E:[],F:[],G:[],H:[],I:[],J:[],K:[],L:[],M:[],N:[],O:[],P:[],Q:[],R:[],S:[],T:[],U:[],V:[],W:[],X:[],Y:[],Z:[]};
		var htmlbox = document.createElement("div");
		htmlbox.id = "htmlbox";
		var htmlall = document.createElement("div");
		var htmlk = document.createElement("p");
		var stylelink = document.createElement("style") 
		stylelink.innerHTML = '#htmlbox{width: 100%;position:absolute;top:30px;left:0;z-index:9999;background:#fff}#htmlbox p{background: #469bde;padding:0 10px}#htmlbox .hide_tag{border: 1px solid #469bde;display: none;max-height:200px;overflow:auto}#htmlbox a{padding:5px;line-height: 24px;color:#fff}#htmlbox .hide_tag a{padding:0 20px;display:block;line-height: 28px;float:left;color:#444}#htmlbox .cur{border-bottom: 2px solid #fac51f}';
		for (var i = 0 ; i < data_name.length ; i++) {
			var str = data_name[i].split(';')
			tit.push(str[2].charAt(0).toLocaleUpperCase()) //判断首字母			
		};
		for(var j in tit){
			if(name_list[tit[j]])
			name_list[tit[j]].push(data_name[j]);
			else qtHtml.push(data_name[j])		
		}
		for (var j = 0 ; j < qtHtml.length ; j++) {
			var qthtml = '<a href="javascript:" onclick="'+fn+'(this)" name="'+ qtHtml[j].split(';')[0] + '">' + qtHtml[j].split(';')[1] + '</a>';
			qtzimu += qthtml;
		};
		for (var k in name_list){
			if (name_list[k].length != 0) {
				for (var i = 0 ; i < name_list[k].length ; i++) {
					var allhtml = '<a href="javascript:" onclick="'+fn+'(this)" name="'+ name_list[k][i].split(';')[0] + '">' + name_list[k][i].split(';')[1] + '</a>';
					Ahtml[k] += allhtml ;
					//allHtml += allhtml;
				};
				htmlk.innerHTML += '<a href="javascript:" >'+k+'</a>';
				htmlall.innerHTML += '<div class="hide_tag">'+Ahtml[k]+'</div>';
			};
		}
		htmlbox.innerHTML = '<p id="zimu">'+htmlk.innerHTML+'<a href="javascript:">其他</a></p>'+ htmlall.innerHTML+'<div class="hide_tag">'+qtzimu+'</div>'
		YDropdown.appendChild(htmlbox);
		YDropdown.appendChild(stylelink); 
	}
	jsondata(Pretreatment())
	navlist()
	function navlist(){
		var a = document.getElementById('zimu').getElementsByTagName('a');
		var div = document.getElementById('htmlbox').getElementsByTagName('div');
		div[0].style.display = "block" ; a[0].className = "cur";
		for (var i = 0 ; i < a.length ; i++) {
			a[i].index = i;
			a[i].onclick = function(){
				for (var j = 0 ; j < a.length ; j++){
					div[j].style.display = "none";
					a[j].className = "";
				}
				div[this.index].style.display = "block";
				this.className = "cur"
			}
		};
	}
}	
