function YDropdown(YDropdown,YDropdownlist,url,config){
	var RegionData = [];
	var namea = [], nameb = [], namec = [], named = [], namee = [], namef = [], nameg = [], nameh = [], namei = [], namej = [], namek = [], namel = [], namem = [], namen = [], nameo = [], namep = [], nameq = [], namer = [], names = [], namet = [], nameu = [], namev = [], namew = [], namex = [], namey = [], namez = [], nameqt = [];

	function getJSON(url){
		var gid = config.id;
		var gname = config.name;
		var galias = config.alias;
		ajax({
			url:url,
			async:true,
			success:function(result)
			{
			//将json字符串转成json对象	
			var json = eval('(' + result + ')')
			each(json, function(i, value){
				//alert(value[gid])
		    	RegionData.push(value[gid]+';'+value[gname]+';'+value[galias]);  
		    	})
			}
		})
		//返回数组
		return RegionData
		//alert(RegionData)
	};
	getJSON(url);
	var ds = setInterval(function(){
		//alert(typeof(RegionData))
		if(RegionData != ""){ 
			jsondata();
			clearInterval(ds);
		};
	},50);

function jsondata(){
	//处理数组
	var abc = function(){
		var tit = [];
		for (var i = 0 ; i < RegionData.length ; i++) {
			var str = RegionData[i].split(';')
			tit.push(str[2].charAt(0).toLocaleUpperCase()) //判断首字母
			switch (tit[i]) {
				case "A":
					namea.push(str[0] + ';' + str[1]);
					break;
				case "B":
					nameb.push(str[0] + ';' + str[1]);
					break;
				case "C":
					namec.push(str[0] + ';' + str[1]);
					break;
				case "D":
					named.push(str[0] + ';' + str[1]);
					break;
				case "E":
					namee.push(str[0] + ';' + str[1]);
					break;
				case "F":
					namef.push(str[0] + ';' + str[1]);
					break;
				case "G":
					nameg.push(str[0] + ';' + str[1]);
					break;
				case "H":
					nameh.push(str[0] + ';' + str[1]);
					break;
				case "I":
					namei.push(str[0] + ';' + str[1]);
					break;
				case "J":
					namej.push(str[0] + ';' + str[1]);
					break;
				case "K":
					namek.push(str[0] + ';' + str[1]);
					break;
				case "L":
					namel.push(str[0] + ';' + str[1]);
					break;
				case "M":
					namem.push(str[0] + ';' + str[1]);
					break;
				case "N":
					namen.push(str[0] + ';' + str[1]);
					break;
				case "O":
					nameo.push(str[0] + ';' + str[1]);
					break;
				case "P":
					namep.push(str[0] + ';' + str[1]);
					break;
				case "Q":
					nameq.push(str[0] + ';' + str[1]);
					break;
				case "R":
					namer.push(str[0] + ';' + str[1]);
					break;
				case "S":
					names.push(str[0] + ';' + str[1]);
					break;
				case "T":
					namet.push(str[0] + ';' + str[1]);
					break;
				case "U":
					nameu.push(str[0] + ';' + str[1]);
					break;
				case "V":
					namev.push(str[0] + ';' + str[1]);
					break;
				case "W":
					namew.push(str[0] + ';' + str[1]);
					break;
				case "X":
					namex.push(str[0] + ';' + str[1]);
					break;
				case "Y":
					namey.push(str[0] + ';' + str[1]);
					break;
				case "Z":
					namez.push(str[0] + ';' + str[1]);
					break;
				default :
					nameqt.push(str[0] + ';' + str[1]);
			}

		};
		//返回首字母匹配的字符串
		return namea, nameb, namec, named, namee, namef, nameg, nameh, namei, namej, namek, namel, namem, namen, nameo, namep, nameq, namer, names, namet, nameu, namev, namew, namex, namey, namez, nameqt;
	};
	
	//延时加载abc，each函数执行时间较长
	//setTimeout(abc,100);
	abc()
	var YDropdowns = document.getElementById(YDropdown);
	var YDropdown_input = YDropdowns.getElementsByTagName('input')[0];
	var hidden_input = YDropdowns.getElementsByTagName('input')[1];
	var YDropdown_list = document.getElementById(YDropdownlist);
	YDropdown_list.innerHTML = '<style type="text/css">*{margin:0;padding:0}.YDropdown{width:400px;height:30px;position:result;background:#fff}.YDropdown_input{width:400px;height:30px;border:1px solid #ccc;color:#999}.YDropdown_list{position:abloute;top:30px;left:0;width:400px;height:auto;border:1px solid #aaa;background:#fff}.YDropdown_list ul{width:400px;height:30px;text-align:center;background:#fff}.YDropdown_list ul li{display:none;line-height:30px;cursor:pointer;border-bottom:2px solid #ccc;width:40px;margin:0 5px;background:#fff;}.YDropdown_list ul li.cur{border-bottom:2px solid #f00;}.YDropdown_list dl{width:400px;height:auto;display:none;margin-bottom:20px}.YDropdown_list dl div{margin-top:20px;padding:0 10px;height:100%;background:#fff}.YDropdown_list dl div span{width:20px;display:inline-table;height:100%;text-align:center;background:#fff;}.YDropdown_list dl div a{padding:0 3px;display:inline-table;font-size:12px;background:#fff}</style><ul><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li></ul><dl style="display:block"></dl><dl></dl><dl></dl><dl></dl><dl></dl><dl></dl><dl></dl><dl></dl>'
	var YDropdown_li = YDropdown_list.getElementsByTagName('ul')[0].getElementsByTagName('li');
	var YDropdown_dl = YDropdown_list.getElementsByTagName('dl');
	var YDropdown_a = YDropdown_list.getElementsByTagName('a');	
	YDropdown_input.onfocus = function(){
		YDropdown_input.value = "";
		YDropdown_input.style.color = "#333 ";	
		YDropdown_list.style.display = "block"
		YDropdown_list.style.zIndex = 999;
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
	var dl = 0;
	//判断字母下有否有字符串，如没有则隐藏;
	var listSTR = function(name,span){
		if (name == '') return
		else {
			var Ahtml = '';
			for (var i = 0 ; i < name.length ; i++) {
					var allhtml = '&nbsp;&nbsp;<a href="javascript:" style="padding:0 3px" name="' + name[i].split(';')[0] + '">' + name[i].split(';')[1] + '</a>&nbsp;&nbsp;';
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
			hidden_input.value = this.name;
			YDropdown_list.style.display = "none";
		}
	}

}

}	
