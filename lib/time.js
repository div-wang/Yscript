//--2014-12-03-16-42 活动倒计时;
var TimeBool = true;
var startTime = function (time){
    var countdownDate = new Date(time[0],time[1]-1,time[2],time[3],time[4],time[5]) || eval('new Date('+parseInt(time[0])+','+parseInt(time[1]-1)+','+parseInt(time[2])+','+parseInt(time[3])+','+parseInt(time[4])+','+parseInt(time[5])+')');
    var today = new Date();
    var countdownTime = countdownDate.getTime() - today.getTime();
    var d = Math.floor(countdownTime/86400000) > 0 ? Math.floor(countdownTime/86400000) : 0;
    var h = Math.floor((countdownTime-(86400000*d))/3600000) > 0 ? Math.floor((countdownTime-(86400000*d))/3600000) : 0;
    var m = Math.floor((countdownTime-(86400000*d)-(3600000*h))/60000) > 0 ? Math.floor((countdownTime-(86400000*d)-(3600000*h))/60000) : 0;
    var s = Math.floor((countdownTime-(86400000*d)-(3600000*h)-(60000*m))/1000) > 0 ? Math.floor((countdownTime-(86400000*d)-(3600000*h)-(60000*m))/1000) : 0;
    if (d == 0 & h == 0 & m == 0 & s == 0) {
        TimeBool = false
    };
    m = checkTime(m)
    s = checkTime(s)
    document.getElementById('countdown').getElementsByTagName('li')[1].innerHTML= d+'<i>天</i>';
    document.getElementById('countdown').getElementsByTagName('li')[2].innerHTML= h+'<i>时</i>';
    document.getElementById('countdown').getElementsByTagName('li')[3].innerHTML= m+'<i>分</i>';
    document.getElementById('countdown').getElementsByTagName('li')[4].innerHTML= s+'<i>秒</i>';
    if (TimeBool) {
       var t = setTimeout(function(){startTime(time)},1000);
    }else{
        console.log('活动开始');
        clearTimeout(t);
    }
    function checkTime(i){
        if (i<10) {
            i = "0" + i
        }
        return i
    }
}