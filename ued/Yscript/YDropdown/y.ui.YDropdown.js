
	var RegionData = [];
	var namea = [], nameb = [], namec = [], named = [], namee = [], namef = [], nameg = [], nameh = [], namei = [], namej = [], namek = [], namel = [], namem = [], namen = [], nameo = [], namep = [], nameq = [], namer = [], names = [], namet = [], nameu = [], namev = [], namew = [], namex = [], namey = [], namez = [], nameqt = [];
	function getJSON(url){
		$.getJSON(url, function(result)
		{
			$.each(result, function(i, field){
		      RegionData.push(field.id+';'+field.name+';'+field.alias);  
		     })
		})
		return RegionData
	};
	var abc = function(){
		var tit = [];
		for (var i = 0 ; i < RegionData.length ; i++) {
			var str = RegionData[i].split(';')
			tit.push(str[2].charAt(0))
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
		return namea, nameb, namec, named, namee, namef, nameg, nameh, namei, namej, namek, namel, namem, namen, nameo, namep, nameq, namer, names, namet, nameu, namev, namew, namex, namey, namez, nameqt;
	};
	
	setTimeout(abc,100);

	var YDropdown_input = document.getElementById('YDropdown');
	var YDropdown_list = document.getElementById('YDropdown_list');
	YDropdown_list.innerHTML = '<style type="text/css">*{margin:0;padding:0}input{width:380px;height:30px;border:1px solid #ccc;color:#999}#YDropdown_list{position:relative;width:400px;height:auto;border:1px solid #aaa}#YDropdown_list ul{width:400px;height:30px;text-align:center}#YDropdown_list ul li{display:none;line-height:30px;padding:0 5px;cursor:pointer}#YDropdown_list dl{width:400px;height:auto;display:none;margin-bottom:20px}#YDropdown_list dl div{margin-top:20px;padding:0 10px;height:100%}#YDropdown_list dl div span{width:20px;display:inline-table;height:100%;text-align:center}#YDropdown_list dl div a{padding:0 3px;display:inline-table;font-size:12px}</style><ul><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li></ul><dl style="display:block"></dl><dl></dl><dl></dl><dl></dl><dl></dl><dl></dl><dl></dl><dl></dl>'
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
setTimeout(function(){
	var dl = 0;
	var listSTR = function(name,cc,div,span){
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
				
			}
			if (YDropdown_li[dl].innerHTML.length == 4)
				dl += 1
			if(YDropdown_li[dl].innerHTML.length < 4){
				YDropdown_li[dl].innerHTML += span;
				
			}
		}
	}
	listSTR(namea,0,0,'a');
	listSTR(nameb,0,1,'b');
	listSTR(namec,0,2,'c');
	listSTR(named,0,3,'d');
	listSTR(namee,0,0,'e');
	listSTR(namef,0,1,'f');
	listSTR(nameg,0,2,'g');
	listSTR(nameh,0,3,'h');
	listSTR(namei,0,0,'i');
	listSTR(namej,0,1,'j');
	listSTR(namek,0,2,'k');
	listSTR(namel,0,3,'l');
	listSTR(namem,0,0,'m');
	listSTR(namen,0,1,'n');
	listSTR(nameo,0,2,'o');
	listSTR(namep,0,3,'p');
	listSTR(nameq,0,0,'q');
	listSTR(namer,0,1,'r');
	listSTR(names,0,2,'s');
	listSTR(namet,0,3,'t');
	listSTR(nameu,0,0,'u');
	listSTR(namev,0,1,'v');
	listSTR(namew,0,2,'w');
	listSTR(namex,0,3,'x');
	listSTR(namey,0,0,'y');
	listSTR(namez,0,1,'z');
	listSTR(nameqt,7,0,'其他');	
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
	
