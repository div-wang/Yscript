/** 
  * popup弹层
  * 版本 : 0.3 
  * agreement : 用户协议弹层 ;
        |--show : 显示弹层 ;
        └--close : 销毁弹层 ;
            └---obj ：this对象 ;
  * tryOut : 疯狂抢弹层 ;
        |--show : 显示弹层 ;
        |   |---callback ：回调函数 ;
        |   └---box : 样式对象 ;
        |        |---title : 标题 ;
        |        |---width : 宽度 ;
        |        └---height : 高度
        └--close : 销毁弹层 ;
            └--callback
  * select : 自定义弹层 ;
        |--show : 显示弹层 ;
        |   |---callback ：回调函数 ;
        |   └---box : 样式对象 ;
        |        |---title : 标题 ;
        |        |---width : 宽度 ;
        |        └---height : 高度
        └--close : 销毁弹层 ;
            └--callback
 */
var popup = {
    agreement:{
        show:function(){  
            if (document.getElementById('popup_agreement_tan') != undefined) return;
            var agreement_width = document.body.clientWidth || document.documentElement.clientWidth,
                agreement_height = document.body.clientHeight || document.documentElement.clientHeight;  

            var popup_agreement_style = document.createElement('style');
                popup_agreement_style.type = "text/css";
            var popup_agreement_style_text = '.popup_agreement_text{width:50%;height:70%;overflow-y:scroll;line-height:1.6;border:10px solid #999;background:#fff;color:#333;position:fixed;top:10%;left:25%;z-index:12; font-size:12px;}.popup_agreement_close{background:#e33a3d;width:20%;border-radius:5px; cursor:pointer; color:#fff; font-family:"微软雅黑"; font-size:14px;min-width:200px;height:3em;margin:0 auto;display:block;text-align:center;line-height:3em} #popup_agreement_tan{position:absolute;top:0;width:100%;height:100%;background:#000;opacity:0.5;filter:alpha(opacity=50);z-index:10;width:'+agreement_width+'px;height:'+agreement_height+'px;}'
                if (popup_agreement_style.styleSheet) { //IE
                  popup_agreement_style.styleSheet.cssText = popup_agreement_style_text;
                } else { 
                  popup_agreement_style.innerHTML = popup_agreement_style_text;
                }
                document.body.appendChild(popup_agreement_style);

            var popup_agreement_tan = document.createElement('div');
                popup_agreement_tan.id = 'popup_agreement_tan';
                document.body.appendChild(popup_agreement_tan);
            var popup_agreement_text = document.createElement('div');
                popup_agreement_text.innerHTML = '<a class="thickclose" id="closeBox" href="#" onclick="popup.agreement.close(this)">×</a><h4 style="text-align:center;height:30px;line-height:30px;font-size:12px; font-weight:bold;background:#f3f3f3;border-bottom"1px solid #ececec;position:relative;"><span >三九养生堂用户注册协议</span></h4><h4 style="margin-top:15px;"><span style="font-family:&#39;微软雅黑&#39;,&#39;sans-serif&#39; font-size:16px;font-weight:bold;padding-left:10px;">一、总则</span></h4><p style="margin:15px 0 15px 28px;"><span >1.1</span><span style="">三九养生堂的所有权和运营权归淮安三九网络科技有限公司所有。<br/> 1.2 用户在注册之前，应当仔细阅读本协议，并同意遵守本协议后方可成为注册用户。一旦注册成功，则用户与三九养生堂之间自动形成协议关系，用户应当受本协议的约束。用户在使用特殊的服务或产品时，应当同意接受相关协议后方能使用。<br/> 1.3 本协议则可由三九养生堂随时更新，用户应当及时关注并同意本站不承担通知义务。本站的通知、公告、声明或其它类似内容是本协议的一部分。</span></p><h4><span style="font-family:&#39;微软雅黑&#39;,&#39;sans-serif&#39;font-size:16px;font-weight:bold;padding-left:10px;">二、服务内容</span></h4><p style="margin:15px 0 15px 28px;"><span >2.1</span><span >三九养生堂的具体内容由本站根据实际情况提供。<br/> 2.2 本站仅提供相关的网络服务，除此之外与相关网络服务有关的设备(如个人电脑、手机、及其他与接入互联网或移动网有关的装置)及所需的费用(如为接入互联网而支付的电话费及上网费、为使用移动网而支付的手机费)均应由用户自行负担。</span></p><h4><span style="font-family:&#39;微软雅黑&#39;,&#39;sans-serif&#39;font-size:16px;font-weight:bold;padding-left:10px;">三、用户帐号</span></h4><p style="margin:15px 0 15px 28px;"><span >3.1</span><span >经本站注册系统完成注册程序并通过身份认证的用户即成为正式用户，可以获得本站规定用户所应享有的一切权限；未经认证仅享有本站规定的部分会员权限。三九养生堂有权对会员的权限设计进行变更。<br/> 3.2 用户只能按照注册要求使用真实姓名，及身份证号注册。用户有义务保证密码和帐号的安全，用户利用该密码和帐号所进行的一切活动引起的任何损失或损害，由用户自行承担全部责任，本站不承担任何责任。如用户发现帐号遭到未授权的使用或发生其他任何安全问题，应立即修改帐号密码并妥善保管，如有必要，请通知本站。因黑客行为或用户的保管疏忽导致帐号非法使用，本站不承担任何责任。</span></p><h4><span style="font-family:&#39;微软雅黑&#39;,&#39;sans-serif&#39;font-size:16px;font-weight:bold;padding-left:10px;">四、使用规则</span></h4><p style="margin:15px 0 15px 28px;"><span >4.1</span><span >遵守中华人民共和国相关法律法规，包括但不限于《中华人民共和国计算机信息系统安全保护条例》、《计算机软件保护条例》、《最高人民法院关于审理涉及计算机网络著作权纠纷案件适用法律若干问题的解释(法释[2004]1号)》、《全国人大常委会关于维护互联网安全的决定》、《互联网电子公告服务管理规定》、《互联网新闻信息服务管理规定》、《互联网著作权行政保护办法》和《信息网络传播权保护条例》等有关计算机互联网规定和知识产权的法律和法规、实施办法。<br/> 4.2 用户对其自行发表、上传或传送的内容负全部责任，所有用户不得在本站任何页面发布、转载、传送含有下列内容之一的信息，否则本站有权自行处理并不通知用户：<br/></span><span >(1)</span><span >违反宪法确定的基本原则的；<br/> (2)危害国家安全，泄漏国家机密，颠覆国家政权，破坏国家统一的；<br/> (3)损害国家荣誉和利益的；<br/> (4)煽动民族仇恨、民族歧视，破坏民族团结的；<br/> (5)破坏国家宗教政策，宣扬邪教和封建迷信的；<br/> (6)散布谣言，扰乱社会秩序，破坏社会稳定的；<br/> (7)散布淫秽、色情、赌博、暴力、恐怖或者教唆犯罪的；<br/> (8)侮辱或者诽谤他人，侵害他人合法权益的；<br/> (9)煽动非法集会、结社、游行、示威、聚众扰乱社会秩序的；<br/> (10)以非法民间组织名义活动的；<br/> (11)含有法律、行政法规禁止的其他内容的。</span></p><p style="margin-left: 28px"><span >4.3</span><span >用户承诺对其发表或者上传于本站的所有信息(即属于《中华人民共和国著作权法》规定的作品，包括但不限于文字、图片、音乐、电影、表演和录音录像制品和电脑程序等)均享有完整的知识产权，或者已经得到相关权利人的合法授权；如用户违反本条规定造成本站被第三人索赔的，用户应全额补偿本站一切费用(包括但不限于各种赔偿费、诉讼代理费及为此支出的其它合理费用)；<br/> 4.4 当第三方认为用户发表或者上传于本站的信息侵犯其权利，并根据《信息网络传播权保护条例》或者相关法律规定向本站发送权利通知书时，用户同意本站可以自行判断决定删除涉嫌侵权信息，除非用户提交书面证据材料排除侵权的可能性，本站将不会自动恢复上述删除的信息；</span></p><p style="margin-left: 56px"><span >(1)</span><span >不得为任何非法目的而使用网络服务系统；<br/> (2)遵守所有与网络服务有关的网络协议、规定和程序；</span></p><p style="margin-left: 56px"><span >(3)</span><span >不得利用本站进行任何可能对互联网的正常运转造成不利影响的行为；<br/> (4)不得利用本站进行任何不利于本站的行为。</span></p><p style="margin-left: 28px"><span >4.5</span><span >如用户在使用网络服务时违反上述任何规定，本站有权要求用户改正或直接采取一切必要的措施(包括但不限于删除用户张贴的内容、暂停或终止用户使用网络服务的权利)以减轻用户不当行为而造成的影响。</span></p><h4 style="padding-top:15px;"><span style="font-family:&#39;微软雅黑&#39;,&#39;sans-serif&#39;font-size:16px;font-weight:bold;padding-left:10px;">五、隐私保护</span></h4><p style="margin:15px 0 15px 28px;"><span >5.1</span><span >本站不对外公开或向第三方提供单个用户的注册资料及用户在使用网络服务时存储在本站的非公开内容，但下列情况除外：</span></p><p style="margin-left: 56px"><span >(1)</span><span >事先获得用户的明确授权；<br/> (2)根据有关的法律法规要求；<br/> (3)按照相关政府主管部门的要求；<br/> (4)为维护社会公众的利益。</span></p><p style="margin-left: 28px"><span >5.2</span><span >本站可能会与第三方合作向用户提供相关的网络服务，在此情况下，如该第三方同意承担与本站同等的保护用户隐私的责任，则本站有权将用户的注册资料等提供给该第三方。<br/> 5.3 在不透露单个用户隐私资料的前提下，本站有权对整个用户数据库进行分析并对用户数据库进行商业上的利用。</span></p><h4 style="padding-top:15px;"><span style="font-family:&#39;微软雅黑&#39;,&#39;sans-serif&#39;font-size:16px;font-weight:bold;padding-left:10px;">六、版权声明</span></h4><p style="margin:15px 0 15px 28px;"><span >6.1</span><span >本站的文字、图片、音频、视频等版权均归淮安三九网络科技有限公司享有或与作者共同享有，未经本站许可，不得任意转载。<br/> 6.2 本站特有的标识、版面设计、编排方式等版权均属淮安三九网络科技有限公司享有，未经本站许可，不得任意复制或转载。<br/> 6.3 使用本站的任何内容均应注明“来源于三九养生堂”及署上作者姓名，按法律规定需要支付稿酬的，应当通知本站及作者及支付稿酬，并独立承担一切法律责任。<br/> 6.4由于本站付有作者相应稿酬，凡在后台生成的有效文章不可删除，版权归三九养生堂所有。<br/> 6.5 本站所有内容仅代表作者自己的立场和观点，与本站无关，由作者本人承担一切法律责任。<br/> 6.6 恶意转载本站内容的，本站保留将其诉诸法律的权利。</span></p><h4><span style="font-family:&#39;微软雅黑&#39;,&#39;sans-serif&#39;font-size:16px;font-weight:bold;padding-left:10px;">七、责任声明</span></h4><p style="margin:15px 0 15px 28px;"><span >7.1</span><span >用户明确同意其使用本站网络服务所存在的风险及一切后果将完全由用户本人承担，三九养生堂对此不承担任何责任。<br/> 7.2 本站无法保证网络服务一定能满足用户的要求，也不保证网络服务的及时性、安全性、准确性。<br/> 7.3 本站不保证为方便用户而设置的外部链接的准确性和完整性，同时，对于该等外部链接指向的不由本站实际控制的任何网页上的内容，本站不承担任何责任。<br/> 7.4 对于因不可抗力或本站不能控制的原因造成的网络服务中断或其它缺陷，本站不承担任何责任，但将尽力减少因此而给用户造成的损失和影响。<br/> 7.5 对于站向用户提供的下列产品或者服务的质量缺陷本身及其引发的任何损失，本站无需承担任何责任： (1)本站向用户免费提供的各项网络服务；<br/> (2)本站向用户赠送的任何产品或者服务。</span></p><p style="margin-left: 28px"><span >7.6</span><span >本站有权于任何时间暂时或永久修改或终止本服务(或其任何部分)，而无论其通知与否，本站对用户和任何第三人均无需承担任何责任。</span></p><h4 style="padding-top:15px;"><span style="font-family:&#39;微软雅黑&#39;,&#39;sans-serif&#39;font-size:16px;font-weight:bold;padding-left:10px;">八、附则</span></h4><p style="margin:15px 0 15px 28px;"><span >8.1</span><span >本协议的订立、执行和解释及争议的解决均应适用中华人民共和国法律。<br/> 8.2 如本协议中的任何条款无论因何种原因完全或部分无效或不具有执行力，本协议的其余条款仍应有效并且有约束力。<br/> 8.3 本协议解释权及修订权归淮安三九网络科技有限公司所有。</span></p><span class="popup_agreement_close" onclick="popup.agreement.close(this)" style="margin-bottom:40px;margin-top:40px;">同意并继续</span>';
                popup_agreement_text.className = 'popup_agreement_text';
                document.body.appendChild(popup_agreement_text);
        } , 
        close:function(obj){
                var a = obj.parentNode.parentNode.childNodes;
                for (var i = 0 ; i < a.length; i++) {
                    if (a[i].nodeType==1 && a[i].type == "text/css") {
                        document.body.removeChild(a[i]);
                    }; 
                    if (a[i].nodeType==1 && a[i].id == "popup_agreement_tan") {
                        document.body.removeChild(a[i]);
                    };                   
                };
                document.body.removeChild(obj.parentNode);
        }
    },
    tryOut:{
        show:function(callback,box){
            if (document.getElementById('popup_tryOut_tan') != undefined) return;
            var tryOut_width = document.body.clientWidth || document.documentElement.clientWidth,
                tryOut_height = document.body.clientHeight || document.documentElement.clientHeight ;
            
            var popup_tryOut_style = document.createElement('style');
                popup_tryOut_style.type = "text/css";
            var popup_tryOut_style_text = '#popup_tryOut_tan{position:absolute;top:0;width:100%;height:100%;background:#000;opacity:0.5;filter:alpha(opacity=50);z-index:1000;width:'+tryOut_width+'px;height:'+tryOut_height+'px;}'
                if (popup_tryOut_style.styleSheet) { //IE
                  popup_tryOut_style.styleSheet.cssText = popup_tryOut_style_text;
                } else { 
                  popup_tryOut_style.innerHTML = popup_tryOut_style_text;
                }
                document.body.appendChild(popup_tryOut_style);

            var popup_tryOut_tan = document.createElement('div');
                popup_tryOut_tan.id = 'popup_tryOut_tan';
                document.body.appendChild(popup_tryOut_tan);
            if (box) {
            var popup_tryOut_box = document.createElement('div');
                popup_tryOut_box.id = 'popup_tryOut_box';
                popup_tryOut_box.className = 'try_address pr';
                popup_tryOut_box.style.display = 'block';
                popup_tryOut_box.style.width = box.width+'px';
                popup_tryOut_box.innerHTML = '<div class="all_contet"><h4 class="add_h4">'+box.title+'</h4><div class="blank15"></div><div class="popup_tryOut_box1" style="height:'+(box.height-120)+'px"></div><p class="all_bottom"><input type="button" class="bottom_btn" value="提交" onclick="popup.tryOut.close()"></p><div class="closebox" onclick="popup.tryOut.close()"></div></div>';
                document.body.appendChild(popup_tryOut_box);  
                popup_tryOut_box.style.height = box.height+'px';
            };
            if (typeof callback != 'undefined') callback();  
        } , 
        close:function(callback){
            if (document.getElementById('popup_tryOut_tan') != undefined) {
                document.body.removeChild(document.getElementById('popup_tryOut_tan'))
            };
            if (document.getElementById('popup_tryOut_box') != undefined) {
                document.body.removeChild(document.getElementById('popup_tryOut_box'))
            };
            var a = document.body.childNodes;
            for (var i = 0 ; i < a.length; i++) {
                if (a[i].nodeType==1 && a[i].type == "text/css") {
                    document.body.removeChild(a[i]);
                };                 
            };   
            if (typeof callback != 'undefined') callback();  
        }
    },
    select:{
        show:function(callback,box){
            if (document.getElementById('popup_select_tan') != undefined) return;
            var select_width = document.body.clientWidth || document.documentElement.clientWidth,
                select_height = document.body.clientHeight || document.documentElement.clientHeight ;
            
            var popup_select_style = document.createElement('style');
                popup_select_style.type = "text/css";
            var popup_select_style_text = '#popup_select_tan{position:absolute;top:0;width:100%;height:100%;background:#000;opacity:0.5;filter:alpha(opacity=50);z-index:1000;width:'+select_width+'px;height:'+select_height+'px;}#popup_select_box{width:550px; border:1px solid #cfcfcf; background:#fff; position:fixed; position:rerelative; left:50%; top:50%; margin: -150px 0 0 -210px; *margin: -3590px 0 0 -210px; z-index:1000;}.add_h4{height:26px; line-height:26px; background:url(./images/newlinebg3.gif); font-size:16px; color:#333; font-family:微软雅黑; padding-left:15px;margin:0;margin-bottom:10px}.add_top{padding:5px 15px;}#popup_select_box table{margin-top:10px;height:200px;width:90%;margin:0 auto;overflow-y:auto}#popup_select_box li{color:#333; padding:3px 0 3px 46px;  background:#fbfce2; border:1px dashed #cfcfcf; overflow:hidden;}.bottom_btn{padding: 2px 5px; border:none; text-align:center;background: url("./images/allbtbg2.gif") repeat-x;font-size:14px; cursor:pointer;color:#333;}#page a{margin-left:10px;color:#333;padding:1px 5px;background:#fbfce2; border:1px solid #cfcfcf; overflow:hidden;}#page input{width:40px;height:16px;}#page .next{margin-right:10px;}'
                if (popup_select_style.styleSheet) { //IE
                  popup_select_style.styleSheet.cssText = popup_select_style_text;
                } else { 
                  popup_select_style.innerHTML = popup_select_style_text;
                }
                document.body.appendChild(popup_select_style);

            var popup_select_tan = document.createElement('div');
                popup_select_tan.id = 'popup_select_tan';
                document.body.appendChild(popup_select_tan);
            if (box) {
            var popup_select_box = document.createElement('div');
                popup_select_box.id = 'popup_select_box';
                popup_select_box.className = 'popup_select_box';
                popup_select_box.style.width = box.width+'px';
                popup_select_box.style.height = box.height+'px';
                popup_select_box.style.display = 'block';
                popup_select_box.innerHTML = '<h4 class="add_h4">'+box.title+'</h4><form action="" ><div class="add_box"><div class="add_box1"><div class="add_top"><label>检索:</label><input type="text" name="n1" id="selectname"></div><table class="address1"></table><div id="page"></div><div style="height:25px;"></div></div></div><div class="all_bottom" style="text-align:right;background:#ddd"><input type="button"  class="bottom_btn" value="确定"/><input type="button"  class="bottom_btn" value="取消" onclick="popup.select.close()"/></div></form><div class="closebox" onclick="popup.select.close()" style="width:15px;height:15px; background:url(./images/all.png) -303px -22px; position:absolute; right:16px; top:10px; cursor:pointer;"></div>';
                document.body.appendChild(popup_select_box);    
            };
            if (typeof callback != 'undefined') callback();  
        } , 
        close:function(callback){
            if (typeof callback != 'undefined') callback();  
            if (document.getElementById('popup_select_tan') != undefined) {
                document.body.removeChild(document.getElementById('popup_select_tan'))
            };
            if (document.getElementById('popup_select_box') != undefined) {
                document.body.removeChild(document.getElementById('popup_select_box'))
            };
            var a = document.body.childNodes;
            for (var i = 0 ; i < a.length; i++) {
                if (a[i].nodeType==1 && a[i].type == "text/css") {
                    document.body.removeChild(a[i]);
                };                 
            }; 
        }
    }
};

