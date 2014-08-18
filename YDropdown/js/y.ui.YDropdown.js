function YDropdown(YDropdown,YDropdownlist,YDropdowndiv,url,bool,config,fn){
	var data = [];
	var name_list = {A:[],B:[],C:[],D:[],E:[],F:[],G:[],H:[],I:[],J:[],K:[],L:[],M:[],N:[],O:[],P:[],Q:[],R:[],S:[],T:[],U:[],V:[],W:[],X:[],Y:[],Z:[]}
	var YDropdown = document.getElementById(YDropdown);
	var YDropdowns = document.getElementById(YDropdowndiv);
	var YDropdown_p = document.getElementById(YDropdownlist)
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
		/*var stylelink = document.createElement("style") 
		stylelink.innerHTML = style;
		document.body.insertBefore(stylelink,YDropdown)*/
		var tit = [];
		var Ahtml = {A:[],B:[],C:[],D:[],E:[],F:[],G:[],H:[],I:[],J:[],K:[],L:[],M:[],N:[],O:[],P:[],Q:[],R:[],S:[],T:[],U:[],V:[],W:[],X:[],Y:[],Z:[]};
		for (var i = 0 ; i < data_name.length ; i++) {
			var str = data_name[i].split(';')
			tit.push(str[2].charAt(0).toLocaleUpperCase()) //判断首字母			
		};
		for(var j in tit){
			name_list[tit[j]].push(data_name[j]);			
		}	
		for (var k in name_list){
			for (var i = 0 ; i < name_list[k].length ; i++) {
				var allhtml = '<a href="javascript:" style="padding:0 3px" onclick="'+fn+'()" name="'+ name_list[k][i].split(';')[0] + '">' + name_list[k][i].split(';')[1] + '</a>';
				Ahtml[k] += allhtml ;
			};
			YDropdown_p.innerHTML += '<a href="javascript:" >'+k+'</a>';
			YDropdowns.innerHTML += '<div class="hide_tag">'+Ahtml[k]+'</div>';
		}
	}
	jsondata(Pretreatment())
	navlist()
	function navlist(){
		var a = YDropdown_p.getElementsByTagName('a');
		var div = YDropdowns.getElementsByTagName('div');
		//alert(div.length)
		for (var i = 0 ; i < a.length ; i++) {
			a[i].index = i;
			a[i].onclick = function(){
				for (var j = 0 ; j < a.length ; j++){
					div[j].style.display = "none";
					this.className = "";
				}
				div[this.index].style.display = "block";
				this.className = "cur"
			}
		};
	}
}	

