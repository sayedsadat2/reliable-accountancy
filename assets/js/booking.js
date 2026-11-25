/* Booking widget: calendar, time slots and request form. */
(function(){
"use strict";
var C=window.SITE_CONFIG,RA=window.RA,$=RA.$,el=RA.el,icon=RA.icon,send=RA.send,say=RA.say,MSG=RA.MSG,chips=RA.chips,SC=window.SITE_CONTENT;
/* booking */
var MN=["January","February","March","April","May","June","July","August","September","October","November","December"],DH=["SUN","MON","TUE","WED","THU","FRI","SAT"];
var BK={t:null,type:"Video call"};
function pad(n){return n<10?"0"+n:""+n}
function dkey(d){return d.getFullYear()+"-"+pad(d.getMonth()+1)+"-"+pad(d.getDate())}
var T0=new Date(),MINd=new Date(T0.getFullYear(),T0.getMonth(),T0.getDate()+1),MAXd=new Date(T0.getFullYear(),T0.getMonth(),T0.getDate()+60);
function avail(d){var w=d.getDay();return w>0&&w<6&&d>=MINd&&d<=MAXd}
var f0=new Date(MINd);while(!avail(f0))f0.setDate(f0.getDate()+1);
BK.d=f0;BK.y=f0.getFullYear();BK.m=f0.getMonth();
function fmtD(d){return d.toLocaleDateString("en-CA",{weekday:"long",month:"long",day:"numeric",year:"numeric"})}
var TIMES=[];for(var h=9;h<17;h++){[0,30].forEach(function(mi){TIMES.push(((h>12)?h-12:h)+":"+pad(mi)+(h<12?" am":" pm"))})}
function sum(){return BK.type+" · "+fmtD(BK.d)+" at "+BK.t+" Eastern, 30 minutes"}
function drawCal(){
  $("mName").textContent=MN[BK.m]+" "+BK.y;
  $("mPrev").disabled=(BK.y===MINd.getFullYear()&&BK.m<=MINd.getMonth());
  $("mNext").disabled=(BK.y===MAXd.getFullYear()&&BK.m>=MAXd.getMonth());
  var c=$("cal");c.innerHTML="";
  DH.forEach(function(x){c.appendChild(el("div","dh",x))});
  var first=new Date(BK.y,BK.m,1).getDay(),days=new Date(BK.y,BK.m+1,0).getDate();
  for(var i=0;i<first;i++)c.appendChild(el("span"));
  for(var n=1;n<=days;n++){(function(n){
    var d=new Date(BK.y,BK.m,n),b=el("button","",n);b.type="button";b.disabled=!avail(d);b.setAttribute("aria-label",fmtD(d));
    if(dkey(d)===dkey(BK.d)){b.className="sel";b.setAttribute("aria-pressed","true")}
    b.onclick=function(){BK.d=d;BK.t=null;$("bkForm").hidden=true;drawCal();drawSlots()};
    c.appendChild(b)})(n)}
}
function drawSlots(){
  $("bkDate").textContent="Showing times for "+fmtD(BK.d);
  var box=$("slots");box.innerHTML="";
  TIMES.forEach(function(t){var b=el("button","",t);b.type="button";if(BK.t===t)b.className="sel";
    b.onclick=function(){BK.t=t;$("bkSum").textContent=sum();$("bkForm").hidden=false;$("bkDone").hidden=true;drawSlots()};
    box.appendChild(b)});
}
function drawType(){chips($("bkType"),["Video call","Phone call"],BK.type,function(x){BK.type=x;drawType();if(BK.t)$("bkSum").textContent=sum()})}
$("mPrev").onclick=function(){BK.m--;if(BK.m<0){BK.m=11;BK.y--}drawCal()};
$("mNext").onclick=function(){BK.m++;if(BK.m>11){BK.m=0;BK.y++}drawCal()};
$("bkForm").onsubmit=function(e){
  e.preventDefault();var f=this,when=fmtD(BK.d)+" at "+BK.t+" Eastern";
  send("Meeting request: "+when,{Name:$("bName").value,Email:$("bEmail").value,Phone:$("bPhone").value,Topic:$("bTopic").value,"Meeting type":BK.type,"Requested time":when+" (30 minutes)",Notes:$("bNote").value},$("bHp").value,function(ok,m){
    var d=$("bkDone");d.innerHTML="";
    d.appendChild(el("p","",ok?"Request for "+when+" ("+BK.type.toLowerCase()+").":MSG.fail));
    if(ok)d.appendChild(el("p","note",m==="mailto"?"Your email app should open with the request. Send it, and we will confirm the time by reply. If nothing opened, email "+C.email+".":"We will confirm this time by email shortly."));
    d.hidden=false;if(ok){$("bkForm").hidden=true;BK.t=null;f.reset();drawSlots()}
  });
};
if(C.bookingUrl&&/^https?:\/\//i.test(C.bookingUrl)){$("bookWidget").hidden=true;$("bookExt").hidden=false;$("bookExtLink").href=C.bookingUrl}
drawType();drawCal();drawSlots();
})();
