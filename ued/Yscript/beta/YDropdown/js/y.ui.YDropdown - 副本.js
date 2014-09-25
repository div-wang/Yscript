function YDropdown(YDropdown,YDropdownlist,url,config){
	var CatalogData = [];
	var BrandData = [];
	var china = [];
	var foreign = [];
	var namea = [], nameb = [], namec = [], named = [], namee = [], namef = [], nameg = [], nameh = [], namei = [], namej = [], namek = [], namel = [], namem = [], namen = [], nameo = [], namep = [], nameq = [], namer = [], names = [], namet = [], nameu = [], namev = [], namew = [], namex = [], namey = [], namez = [], nameqt = [];
	each(url, function(i, value){
		if (value["type"] != "") 
		CatalogData.push(value[config.id]+';'+value[config.name]+';'+value[config.alias]);
		else
    	BrandData.push(value[config.id]+';'+value[config.name]+';'+value[config.alias]+';'+value["type"]);  
	})
    for (var i = 0 ; i < BrandData.length ; i++) {
		var str = BrandData[i].split(';')
		if (str[3] == 0) foreign.push(str[0] + ';' + str[1] + ';' + str[2]);
		else china.push(str[0] + ';' + str[1] + ';' + str[2]);
	}
	var ds = setInterval(function(){
		if(china != ""){ 
			//alert(china)			
			jsondata(china);
			oDiv(YDropdown);
			clearInterval(ds);
		}else if (foreign != "") {
			//alert(foreign)			
			jsondata(foreign);
			oDiv(YDropdown);
			clearInterval(ds);
		}else if(CatalogData != ""){ 
			//alert(china)			
			jsondata(CatalogData);
			oDiv(YDropdown);
			clearInterval(ds);
		}
	},50);


	function jsondata(data_name){
		//处理数组
		var abc = function(){
			var tit = [];
			for (var i = 0 ; i < data_name.length ; i++) {
				var str = data_name[i].split(';')
				nameqt.push(str[0] + ';' + str[1]);
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
				}

			};
			//返回首字母匹配的字符串
			return namea, nameb, namec, named, namee, namef, nameg, nameh, namei, namej, namek, namel, namem, namen, nameo, namep, nameq, namer, names, namet, nameu, namev, namew, namex, namey, namez, nameqt;
		};
		
		//延时加载abc，each函数执行时间较长
		//setTimeout(abc,100);
		abc()
		var YDropdowns = document.getElementById(YDropdown);
		var YDropdown_p = document.getElementById(YDropdownlist);
		//var spanhtml = '';
		var listSTR = function(name,span){
			/*if (name == '') return
			else {*/
				var Ahtml = '';
				
				for (var i = 0 ; i < name.length ; i++) {
					name[i].index = i;
					var allhtml = '&nbsp;&nbsp;<a href="javascript:" style="padding:0 3px" name="' + name[i].split(';')[0] + '">' + name[i].split(';')[1] + '</a>&nbsp;&nbsp;';
					Ahtml += allhtml;

				};
				if (span == "所有") YDropdown_p.innerHTML += Ahtml;
				YDropdowns.innerHTML += '<div class="hide_tag">'+Ahtml+'</div>';
		}
		
		listSTR(nameqt,'所有');	
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

	}

}	
  function abc(obj){
    var oParent = obj.parentNode;
    var oSpan = oParent.getElementsByTagName('span');
    var oP = oParent.getElementsByTagName('p');
    var oDiv = oParent.getElementsByTagName('div');
    obj.style.display = "none";
    oSpan[0].style.display = "none";
    oSpan[1].style.display = "block";
    oP[0].style.display = "none";
    oP[1].style.display = "block";
    oDiv[0].style.display = "block";
  }
  function efg(obj){
    var oParent = obj.parentNode;
    var oSpan = oParent.getElementsByTagName('span');
    var oP = oParent.getElementsByTagName('p');
    var oDiv = oParent.getElementsByTagName('div');
    obj.style.display = "none";
    oSpan[0].style.display = "block";
    oSpan[1].style.display = "none";
    oP[0].style.display = "block";
    oP[1].style.display = "none";
    for (var i = 0 ; i < oDiv.length ; i++) {
        oDiv[i].style.display = "none";
    }
  }
  function pinpai(obj){
    var oPinpai1 = document.getElementById("w0");
    var oPinpai2 = document.getElementById("w1");
    var oSpan1 = oPinpai1.getElementsByTagName('span');
    var oP1 = oPinpai1.getElementsByTagName('p');
    var oDiv1 = oPinpai1.getElementsByTagName('div');
    var oSpan2 = oPinpai2.getElementsByTagName('span');
    var oP2 = oPinpai2.getElementsByTagName('p');
    var oDiv2 = oPinpai2.getElementsByTagName('div');
    var abc = obj.parentNode;
    obj.parentNode.parentNode.removeChild(abc);
    oPinpai1.style.display = "block";
    oPinpai2.style.display = "block";
    oSpan1[0].style.display = "block";
    oSpan1[1].style.display = "none";
    oP1[0].style.display = "block";
    oP1[1].style.display = "none";
    oSpan2[0].style.display = "block";
    oSpan2[1].style.display = "none";
    oP2[0].style.display = "block";
    oP2[1].style.display = "none";
    for (var i = 0 ; i < oDiv.length ; i++) {
        oDiv1[i].style.display = "none";
        oDiv2[i].style.display = "none";
    }
  }
  function gongxiao(obj){
    var gongxiao = document.getElementById("w2");
    var oSpan = gongxiao.getElementsByTagName('span');
    var oP = gongxiao.getElementsByTagName('p');
    var oDiv = gongxiaow.getElementsByTagName('div');
    var abc = obj.parentNode;
    obj.parentNode.parentNode.removeChild(abc);
    gongxiao.style.display = "block";
    oSpan[0].style.display = "block";
    oSpan[1].style.display = "none";
    oP[0].style.display = "block";
    oP[1].style.display = "none";
    for (var i = 0 ; i < oDiv.length ; i++) {
        oDiv[i].style.display = "none";
    }
  }
  function oDiv(id){
    var oDivbox = document.getElementById(id);
    var oDiv = oDivbox.getElementsByTagName('div');
    var oDiva = oDivbox.getElementsByTagName("p")[1].getElementsByTagName('a');
    var oDivboxa = oDivbox.getElementsByTagName('a');
    var YDropdown_input = document.getElementById("x0");
    var a = 0;
    for (var k = 0 ; k < oDivboxa.length ; k++) {
        oDivboxa[k].onclick = function(){
	        var oPinpai1 = document.getElementById("w0");
	        var oPinpai2 = document.getElementById("w1");
	        a += 1;
            //alert(this.parentNode.nodeName)
            if(oDivbox.getElementsByTagName('p')[0].style.display == "none"){
                if (this.parentNode.nodeName=="P") {
                    for (var i = 0 ; i < oDiva.length ; i++) {
                        oDiva[i].index = i;
                        oDiva[i].onclick = function(){
                           for (var j = 0 ; j < oDiva.length ; j++) {
                               oDiva[j].className = "";
                               oDiv[j].style.display = "none"; 
                            }
                           this.className = "current";
                           oDiv[this.index].style.display = "block";
                        }
                        
                    };
                    return
                }
                if (this.parentNode.parentNode.id == "w0" || this.parentNode.parentNode.id == "w1"){ 
                    YDropdown_input.innerHTML +=  '<a href="javascript:" id="pinpai" name="'+this.name+'"><b>品牌：</b>'+this.innerHTML+'<em  onclick="pinpai(this)"></em></a>'; 
                    oPinpai1.style.display = "none";
                    oPinpai2.style.display = "none";
                }else {
                    //if (a == 3) {
                        YDropdown_input.innerHTML +=  '<a href="javascript:" id="gongxiao" name="'+this.name+'"><b>功效：</b>'+this.innerHTML+'<em onclick="gongxiao(this)"></em></a>';
                        this.parentNode.parentNode.style.display = "none";
                    /*}else{
                        YDropdown_input.innerHTML +=  '<a href="javascript:" id="gongxiao" name="'+this.name+'"><b>功效：</b>'+this.innerHTML+'<em onclick="gongxiao(this)"></em></a>';
                    }*/
                }
            }else{
                if (this.parentNode.parentNode.id == "w0" || this.parentNode.parentNode.id == "w1"){ 
                    YDropdown_input.innerHTML +=  '<a href="javascript:" id="pinpai" name="'+this.name+'"><b>品牌：</b>'+this.innerHTML+'<em  onclick="pinpai(this)"></em></a>'; 
                    oPinpai1.style.display = "none";
                    oPinpai2.style.display = "none";               
                }else {
                    //if (a == 3) {
                        YDropdown_input.innerHTML +=  '<a href="javascript:" id="gongxiao" name="'+this.name+'"><b>功效：</b>'+this.innerHTML+'<em onclick="gongxiao(this)"></em></a>';
                        this.parentNode.parentNode.style.display = "none";
                    /*}else{
                        YDropdown_input.innerHTML +=  '<a href="javascript:" id="gongxiao" name="'+this.name+'"><b>功效：</b>'+this.innerHTML+'<em onclick="gongxiao(this)"></em></a>';
                    	this.style.display = "none";
                    }*/
                }
            }
        }
    };
  }
