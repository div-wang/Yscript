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
		var Ahtml = {A:[],B:[],C:[],D:[],E:[],F:[],G:[],H:[],I:[],J:[],K:[],L:[],M:[],N:[],O:[],P:[],Q:[],R:[],S:[],T:[],U:[],V:[],W:[],X:[],Y:[],Z:[]};
		var allHtml = ""
		var htmlbox = document.createElement("div");
		htmlbox.id = "htmlbox";
		var htmlall = document.createElement("div");
		var htmlk = document.createElement("p");
		var stylelink = document.createElement("style") 
		stylelink.innerHTML = '#htmlbox{width: 500px;}#htmlbox p{background: #eee}#htmlbox .hide_tag{border: 1px solid #eee;display: none}#htmlbox a{padding:0 5px;line-height: 24px;color:#555}#htmlbox .cur{border-bottom: 2px solid blue}';
		//document.body.insertBefore(stylelink,YDropdown)
		for (var i = 0 ; i < data_name.length ; i++) {
			var str = data_name[i].split(';')
			tit.push(str[2].charAt(0).toLocaleUpperCase()) //判断首字母			
		};
		for(var j in tit){
			name_list[tit[j]].push(data_name[j]);			
		}	
		for (var k in name_list){
			for (var i = 0 ; i < name_list[k].length ; i++) {
				var allhtml = '<a href="javascript:" style="padding:0 3px" onclick="'+fn+'(this)" name="'+ name_list[k][i].split(';')[0] + '">' + name_list[k][i].split(';')[1] + '</a>';
				Ahtml[k] += allhtml ;
				allHtml += allhtml;
			};
			htmlk.innerHTML += '<a href="javascript:" >'+k+'</a>';
			htmlall.innerHTML += '<div class="hide_tag">'+Ahtml[k]+'</div>';
		}
		htmlbox.innerHTML = '<p id="zimu"><a href="javascript:" class="cur">所有</a>'+htmlk.innerHTML+'</p><div class="hide_tag" style="display:block">'+allHtml+'</div>'+ htmlall.innerHTML
		YDropdown.appendChild(htmlbox);
		YDropdown.appendChild(stylelink);
	}
	jsondata(Pretreatment())
	navlist()
	function navlist(){
		var a = document.getElementById('zimu').getElementsByTagName('a');
		var div = document.getElementById('htmlbox').getElementsByTagName('div');
		//alert(div.length)
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

function abc(obj){
    obj.innerHTML = '收起<em class="icon_down icon_down2"></em>';
    obj.setAttribute("onclick","efg(this)");
    Y("#w00").show();
    Y("#w000").show();
    Y(".hide_tag").eq(0).show();

}
function efg(obj){
    obj.innerHTML = '更多<em class="icon_down icon_down2"></em>';
    obj.setAttribute("onclick","abc(this)");
    Y("#w00").hide();
    Y("#w000").hide();
    Y(".hide_tag").hide();
}