/* Industries tabs and the "more industries" list. Text lives in content.js. */
(function(){
"use strict";
var C=window.SITE_CONFIG,RA=window.RA,$=RA.$,el=RA.el,icon=RA.icon,send=RA.send,say=RA.say,MSG=RA.MSG,chips=RA.chips,SC=window.SITE_CONTENT;
/* industries */
var CORE=SC.core,IND=SC.more;
var cur=0;
function drawInd(){
  var tabs=$("itabs");tabs.innerHTML="";
  CORE.forEach(function(c,i){
    var b=el("button","itab");b.type="button";b.setAttribute("role","tab");b.id="itab"+i;b.setAttribute("aria-selected",i===cur);b.setAttribute("aria-controls","ipanel");
    b.appendChild(icon(c.ic));b.appendChild(el("b","",c.k));
    b.onclick=function(){cur=i;drawInd()};
    b.onkeydown=function(e){if(e.key==="ArrowRight"||e.key==="ArrowLeft"){cur=(cur+(e.key==="ArrowRight"?1:CORE.length-1))%CORE.length;drawInd();$("itab"+cur).focus()}};
    tabs.appendChild(b);
  });
  var c=CORE[cur],p=$("ipanel");p.innerHTML="";p.setAttribute("aria-labelledby","itab"+cur);
  p.appendChild(el("h3","",c.k));p.appendChild(el("p","",c.p));
  var ul=el("ul","items"+(c.pairs?" pairs":""));
  if(c.pairs)c.pairs.forEach(function(x){var li=el("li");li.appendChild(el("b","",x[0]));li.appendChild(el("span","",x[1]));ul.appendChild(li)});
  else c.items.forEach(function(x){var li=el("li");li.appendChild(icon("check"));li.appendChild(el("span","",x));ul.appendChild(li)});
  p.appendChild(ul);
}
var more=$("more");IND.forEach(function(x){var d=el("div");d.appendChild(el("b","",x[0]));d.appendChild(el("small","",x[1]));more.appendChild(d)});
drawInd();
})();
