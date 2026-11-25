/* Insights, client stories, business showcase and the contact form. */
(function(){
"use strict";
var C=window.SITE_CONFIG,RA=window.RA,$=RA.$,el=RA.el,icon=RA.icon,send=RA.send,say=RA.say,MSG=RA.MSG,chips=RA.chips,SC=window.SITE_CONTENT;
/* optional content sections: appear only when you add items in SETTINGS */
if(C.insights.length){$("insights").hidden=false;C.insights.forEach(function(a){var c=el("div","card");c.appendChild(el("div","meta",a.cat||"Insight"));c.appendChild(el("h3","",a.t));c.appendChild(el("p","",a.d));if(a.u&&/^https?:\/\//i.test(a.u)){var k=el("a","","Read more");k.href=a.u;k.rel="noopener";c.appendChild(k)}$("insCards").appendChild(c)})}
if(C.stories.length){$("stories").hidden=false;C.stories.forEach(function(s){var c=el("div","card");c.style.color="var(--ink)";c.appendChild(el("div","meta",s.ind));c.appendChild(el("h3","",s.n));[["Challenge",s.ch],["What we did",s.did],["Result",s.res]].forEach(function(r){c.appendChild(el("p","",r[0]+": "+r[1]))});$("storyCards").appendChild(c)})}

/* showcase */
var IND=SC.more;
var dirF="All";
function drawDir(){
  var inds=["All"];C.listings.forEach(function(a){if(inds.indexOf(a.i)<0)inds.push(a.i)});
  $("dirChips").hidden=inds.length<3;
  if(inds.indexOf(dirF)<0)dirF="All";
  chips($("dirChips"),inds,dirF,function(x){dirF=x;drawDir()});
  var box=$("dirCards");box.innerHTML="";
  var l=C.listings.filter(function(a){return dirF==="All"||a.i===dirF});
  if(!l.length){var e=el("div","empty");e.appendChild(el("p","","New listings appear here once approved. Be one of the first: add your business with the form below."));box.style.display="block";box.appendChild(e);return}
  box.style.display="";
  l.forEach(function(a){var c=el("div","card");c.appendChild(el("div","meta",a.i+" · "+a.c));c.appendChild(el("h3","",a.n));c.appendChild(el("p","",a.d));
    if(a.s)c.appendChild(el("p","note","Services: "+a.s));
    if(a.w&&/^https?:\/\//i.test(a.w)){var k=el("a","","Visit website");k.href=a.w;k.rel="noopener noreferrer";k.target="_blank";c.appendChild(k)}
    box.appendChild(c)});
}
IND.forEach(function(x){$("lInd").appendChild(el("option","",x[0]))});
drawDir();
$("listForm").onsubmit=function(e){e.preventDefault();var f=this;
  send("Business listing request",{Name:$("lName").value.trim(),Industry:$("lInd").value,City:$("lCity").value.trim(),Link:$("lWeb").value.trim(),About:$("lWhat").value.trim(),Services:$("lSvc").value.trim(),Email:$("lMail").value.trim(),Consent:"Agreed to publish"},$("lHp").value,function(ok,m){say($("lMsg"),ok,m);if(ok)f.reset()})};
/* contact */
$("quote").onsubmit=function(e){e.preventDefault();var f=this;
  send("Website enquiry",{Name:($("qFirst").value+" "+$("qLast").value).trim(),Company:$("qCo").value,Phone:$("qPhone").value,Email:$("qMail").value,Service:$("qSvc").value,Message:$("qMsg").value},$("qHp").value,function(ok,m){say($("quoteOk"),ok,m);if(ok)f.reset()})};
})();
