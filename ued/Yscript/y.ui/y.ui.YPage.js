 /**
  * 分页插件
  * 版本 : 1.0 
  * pagenum : 当前页数 ;
  * pagecount : 总页数 ;
  * callback : 点击页码需要调用的方法名 ;
  * showid : 页码列表显示控件id ;
  * parges : 其他参数 格式 'a,b'
 */
 function make_page_list(num, count, callback, id, parges) {

	if (count == 1) {
		$('#' + id).html(" ").show();
		return;
	}

	if (parges == undefined) {
		parges = '';
	} else {
		parges = ',' + parges;
	}
	var pagestr = '<div class="for-align">';

	if (num > 1) {
		if(parges == ''){
			pagestr += '<a class="home" href="javascript:' + callback + '(1);">Ê×Ò³</a>';
			pagestr += '<a class="prev" href="javascript:' + callback + '('+ (num - 1) +');"></a>';
		}else{
			pagestr += '<a class="home" href="javascript:' + callback + '(1'
					+ parges + ');">Ê×Ò³</a>';
			pagestr += '<a class="prev" href="javascript:' + callback + '('
					+ (num - 1) + parges + ');"></a>';
		}

	}

	var beginidx = num - 1;
	if (beginidx <= 0)
		beginidx = 1;

	var endidx = num + 1;
	if (endidx == 2)
		endidx++;

	if (endidx >= count)
		endidx = count;

	for ( var i = beginidx; i <= endidx; i++) {
		var cls = " class= 'page' ";
		if (i == num) {
			cls = "class= 'page active-page' ";
		}
		pagestr += '<a ' + cls + ' href="javascript:' + callback + '(' + i
				+ parges + ');">' + i + '</a>';
	}

	if (endidx < count)
		pagestr += '<a class="dot"></a>';

	if (num < count) {
		pagestr += '<a class="next" href="javascript:' + callback + '('
				+ (num + 1) + parges + ');"></a>';
	}

	if (count > 0) {
		pagestr += "<span>µ½</span><input type='text' class='jumppage_now' value='' /><span>Ò³</span><a class='ok' href='javascript:void(0)'>Ìø×ª</a>";
		pagestr += '<span class="sum" style="">¹²<font>' + count
				+ '</font>Ò³</span>';
	}

	pagestr += '</div>';

	$('#' + id).html(pagestr).show();

	$('.ok').unbind('click').bind('click', function() {
		var jumppagenow = parseFloat($(this).siblings('input.jumppage_now').val());
		//alert(jumppagenow);
		if(isNaN(jumppagenow) ||jumppagenow == ''){
			showmsg('ÇëÊäÈëÒªÌø×ªµÄÒ³Âë');
			return false;
		}
		if (jumppagenow > count) {
			eval(callback + '(' + count + parges+')');
		} else {
			eval(callback + '(' + jumppagenow + parges+')');
		}
	});
}function make_page_list(num, count, callback, id, parges) {

	if (count == 1) {
		$('#' + id).html(" ").show();
		return;
	}

	if (parges == undefined) {
		parges = '';
	} else {
		parges = ',' + parges;
	}
	var pagestr = '<div class="for-align">';

	if (num > 1) {
		if(parges == ''){
			pagestr += '<a class="home" href="javascript:' + callback + '(1);">Ê×Ò³</a>';
			pagestr += '<a class="prev" href="javascript:' + callback + '('+ (num - 1) +');"></a>';
		}else{
			pagestr += '<a class="home" href="javascript:' + callback + '(1'
					+ parges + ');">Ê×Ò³</a>';
			pagestr += '<a class="prev" href="javascript:' + callback + '('
					+ (num - 1) + parges + ');"></a>';
		}

	}

	var beginidx = num - 1;
	if (beginidx <= 0)
		beginidx = 1;

	var endidx = num + 1;
	if (endidx == 2)
		endidx++;

	if (endidx >= count)
		endidx = count;

	for ( var i = beginidx; i <= endidx; i++) {
		var cls = " class= 'page' ";
		if (i == num) {
			cls = "class= 'page active-page' ";
		}
		pagestr += '<a ' + cls + ' href="javascript:' + callback + '(' + i
				+ parges + ');">' + i + '</a>';
	}

	if (endidx < count)
		pagestr += '<a class="dot"></a>';

	if (num < count) {
		pagestr += '<a class="next" href="javascript:' + callback + '('
				+ (num + 1) + parges + ');"></a>';
	}

	if (count > 0) {
		pagestr += "<span>µ½</span><input type='text' class='jumppage_now' value='' /><span>Ò³</span><a class='ok' href='javascript:void(0)'>Ìø×ª</a>";
		pagestr += '<span class="sum" style="">¹²<font>' + count
				+ '</font>Ò³</span>';
	}

	pagestr += '</div>';

	$('#' + id).html(pagestr).show();

	$('.ok').unbind('click').bind('click', function() {
		var jumppagenow = parseFloat($(this).siblings('input.jumppage_now').val());
		//alert(jumppagenow);
		if(isNaN(jumppagenow) ||jumppagenow == ''){
			showmsg('ÇëÊäÈëÒªÌø×ªµÄÒ³Âë');
			return false;
		}
		if (jumppagenow > count) {
			eval(callback + '(' + count + parges+')');
		} else {
			eval(callback + '(' + jumppagenow + parges+')');
		}
	});
}
function make_page_list(pagenum, pagecount, callback, showid, parges) {

	if (pagecount == 1) {
		$('#' + showid).html(" ").show();
		return;
	}

	if (parges == undefined) {
		parges = '';
	} else {
		parges = ',' + parges;
	}
	var pagestr = '<div class="for-align">';

	if (pagenum > 1) {
		if(parges == ''){
			pagestr += '<a class="home" href="javascript:' + callback + '(1);">首页</a>';
			pagestr += '<a class="prev" href="javascript:' + callback + '('+ (pagenum - 1) +');"></a>';
		}else{
			pagestr += '<a class="home" href="javascript:' + callback + '(1'
					+ parges + ');">首页</a>';
			pagestr += '<a class="prev" href="javascript:' + callback + '('
					+ (pagenum - 1) + parges + ');"></a>';
		}

	}

	var beginidx = pagenum - 1;
	if (beginidx <= 0)
		beginidx = 1;

	var endidx = pagenum + 1;
	if (endidx == 2)
		endidx++;

	if (endidx >= pagecount)
		endidx = pagecount;

	for ( var i = beginidx; i <= endidx; i++) {
		var cls = " class= 'page' ";
		if (i == pagenum) {
			cls = "class= 'page active-page' ";
		}
		pagestr += '<a ' + cls + ' href="javascript:' + callback + '(' + i
				+ parges + ');">' + i + '</a>';
	}

	if (endidx < pagecount)
		pagestr += '<a class="dot"></a>';

	if (pagenum < pagecount) {
		pagestr += '<a class="next" href="javascript:' + callback + '('
				+ (pagenum + 1) + parges + ');"></a>';
	}

	if (pagecount > 0) {
		pagestr += "<span>到</span><input type='text' class='jumppage_now' value='' /><span>页</span><a class='ok' href='javascript:void(0)'>跳转</a>";
		pagestr += '<span class="sum" style="">共<font>' + pagecount
				+ '</font>页</span>';
	}

	pagestr += '</div>';

	$('#' + showid).html(pagestr).show();

	$('.ok').unbind('click').bind('click', function() {
		var jumppagenow = parseFloat($(this).siblings('input.jumppage_now').val());
		//alert(jumppagenow);
		if(isNaN(jumppagenow) ||jumppagenow == ''){
			showmsg('请输入要跳转的页码');
			return false;
		}
		if (jumppagenow > pagecount) {
			eval(callback + '(' + pagecount + parges+')');
		} else {
			eval(callback + '(' + jumppagenow + parges+')');
		}
	});
}