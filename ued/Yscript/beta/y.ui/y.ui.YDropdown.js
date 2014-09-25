
function YDropdown(YDropdown,YDropdownlist,url){
	var RegionData = [];
	var namea = [], nameb = [], namec = [], named = [], namee = [], namef = [], nameg = [], nameh = [], namei = [], namej = [], namek = [], namel = [], namem = [], namen = [], nameo = [], namep = [], nameq = [], namer = [], names = [], namet = [], nameu = [], namev = [], namew = [], namex = [], namey = [], namez = [], nameqt = [];
	function getJSON(url){
		ajax({
			url:url,
			success:function(result)
			{
			//将json字符串转成json对象	
			var json = eval('(' + result + ')')
			each(json, function(i, value){
		    	RegionData.push(value.id+';'+value.name+';'+value.alias);  
		    	})
			}
		})
		//返回数组
		return RegionData
	};
	//处理数组
	var abc = function(){
		var tit = [];
		for (var i = 0 ; i < RegionData.length ; i++) {
			var str = RegionData[i].split(';')
			tit.push(str[2].charAt(0)) //判断首字母
			switch (tit[i]){
				case "a":
				namea.push(str[1]);
				break;
				case "b":
				nameb.push(str[1]);
				break;
				case "c":
				namec.push(str[1]);
				break;
				case "d":
				named.push(str[1]);
				break;
				case "e":
				namee.push(str[1]);
				break;
				case "f":
				namef.push(str[1]);
				break;
				case "g":
				nameg.push(str[1]);
				break;
				case "h":
				nameh.push(str[1]);
				break;
				case "i":
				namei.push(str[1]);
				break;
				case "j":
				namej.push(str[1]);
				break;
				case "k":
				namek.push(str[1]);
				break;
				case "l":
				namel.push(str[1]);
				break;
				case "m":
				namem.push(str[1]);
				break;
				case "n":
				namen.push(str[1]);
				break;
				case "o":
				nameo.push(str[1]);
				break;
				case "p":
				namep.push(str[1]);
				break;
				case "q":
				nameq.push(str[1]);
				break;
				case "r":
				namer.push(str[1]);
				break;
				case "s":
				names.push(str[1]);
				break;
				case "t":
				namet.push(str[1]);
				break;
				case "u":
				nameu.push(str[1]);
				break;
				case "v":
				namev.push(str[1]);
				break;
				case "w":
				namew.push(str[1]);
				break;
				case "x":
				namex.push(str[1]);
				break;
				case "y":
				namey.push(str[1]);
				break;
				case "z":
				namez.push(str[1]);
				break;
				default : 
				nameqt.push(str[1]);
			}

		};
		//返回首字母匹配的字符串
		return namea, nameb, namec, named, namee, namef, nameg, nameh, namei, namej, namek, namel, namem, namen, nameo, namep, nameq, namer, names, namet, nameu, namev, namew, namex, namey, namez, nameqt;
	};
	//延时加载abc，each函数执行时间较长
	setTimeout(abc,100);

	var YDropdown_input = document.getElementById(YDropdown);
	var YDropdown_list = document.getElementById(YDropdownlist);
	YDropdown_list.innerHTML = '<style type="text/css">*{margin:0;padding:0}input{width:380px;height:30px;border:1px solid #ccc;color:#999}#YDropdown_list{position:relative;width:400px;height:auto;border:1px solid #aaa}#YDropdown_list ul{width:400px;height:30px;text-align:center;}#YDropdown_list ul li{display:none;line-height:30px;padding:0 5px;cursor:pointer}#YDropdown_list dl{width:400px;height:auto;display:none;margin-bottom:20px}#YDropdown_list dl div{margin-top:20px;padding:0 10px;height:100%}#YDropdown_list dl div span{width:20px;display:inline-table;height:100%;text-align:center}#YDropdown_list dl div a{padding:0 3px;display:inline-table;font-size:12px}</style><ul><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li></ul><dl style="display:block"></dl><dl></dl><dl></dl><dl></dl><dl></dl><dl></dl><dl></dl><dl></dl>'
	var YDropdown_li = YDropdown_list.getElementsByTagName('ul')[0].getElementsByTagName('li');
	var YDropdown_dl = YDropdown_list.getElementsByTagName('dl');
	var YDropdown_a = YDropdown_list.getElementsByTagName('a');	
	YDropdown_input.onfocus = function(){
		YDropdown_input.value = "";
		YDropdown_input.style.color = "#333 ";	
		YDropdown_list.style.display = "block"
	}
	YDropdown_input.onblur = function(){
		if (YDropdown_input.value == ""){
		YDropdown_input.value = "中文/拼音";
		YDropdown_input.style.color = "#999 ";	
		}
	}
	for (var i = 0 ; i < YDropdown_li.length-1 ; i++) {
		YDropdown_li[i].index = i;
		YDropdown_li[i].onclick = function(){ 
			for (var j = 0 ; j < YDropdown_li.length-1 ; j++) {
			YDropdown_li[j].className = "";
			YDropdown_dl[j].style.display = "none";
			}
			this.className = "cur";
			YDropdown_dl[this.index].style.display = "block";
		}
	};
	//延时插入字符串，each函数执行时间较长
setTimeout(function(){
	var dl = 0;
	//判断字母下有否有字符串，如没有则隐藏;
	var listSTR = function(name,span){
		if (name == '') return
		else {
			var Ahtml = '';
			for (var i = 0 ; i < name.length ; i++) {
				var allhtml = '<a href="javascript:" style="padding:0 3px">'+name[i]+'</a>';
				Ahtml += allhtml;
			};
			if (YDropdown_dl[dl].getElementsByTagName('div').length == 4)
				dl += 1
			if(YDropdown_dl[dl].getElementsByTagName('div').length<4){
				YDropdown_dl[dl].innerHTML += '<div><span>'+span+'</span>'+Ahtml+'</div>';
				YDropdown_li[dl].style.display = 'inline-table';
				YDropdown_li[dl].innerHTML += span;
			}

		}
	}
	listSTR(namea,'A');
	listSTR(nameb,'B');
	listSTR(namec,'C');
	listSTR(named,'D');
	listSTR(namee,'E');
	listSTR(namef,'F');
	listSTR(nameg,'G');
	listSTR(nameh,'H');
	listSTR(namei,'I');
	listSTR(namej,'J');
	listSTR(namek,'K');
	listSTR(namel,'L');
	listSTR(namem,'M');
	listSTR(namen,'N');
	listSTR(nameo,'O');
	listSTR(namep,'P');
	listSTR(nameq,'Q');
	listSTR(namer,'R');
	listSTR(names,'S');
	listSTR(namet,'T');
	listSTR(nameu,'U');
	listSTR(namev,'V');
	listSTR(namew,'W');
	listSTR(namex,'X');
	listSTR(namey,'Y');
	listSTR(namez,'Z');
	listSTR(nameqt,'其他');	
	for (var x = 0 ; x < YDropdown_a.length ; x++) {
		YDropdown_a[x].onclick = function(){ 
			YDropdown_input.style.color = "#333 ";	
			YDropdown_input.value =  this.innerHTML;
			YDropdown_list.style.display = "none";
		}
	}
},200);
/*	for (var x = 0 ; x < YDropdown_a.length ; x++) {
		YDropdown_a[x].onclick = function(){ 
			if (YDropdown_input.value !== "中文/拼音")
				YDropdown_input.style.color = "#333";	
			else YDropdown_input.value ="";		
			YDropdown_input.value +=  this.innerHTML+',';
		}
	}*/
}	
