/* Scroll reveal, hero parallax, sticky header, mobile menu, client-login link. */
(function(){
"use strict";
var C=window.SITE_CONFIG,RA=window.RA,$=RA.$,el=RA.el,icon=RA.icon,send=RA.send,say=RA.say,MSG=RA.MSG,chips=RA.chips,SC=window.SITE_CONTENT;
/* motion */
var rm=window.matchMedia&&window.matchMedia("(prefers-reduced-motion:reduce)").matches;
if(!rm&&"IntersectionObserver" in window){
  document.documentElement.classList.add("js");
  var targets=document.querySelectorAll(".sec h2,.sec .kick,.sec .lead,.card,.itab,.ipanel,.more div,.steps li,.tbl,details,.checks li,.bw,.panel,.addr,.promise p");
  Array.prototype.forEach.call(targets,function(t,i){t.classList.add("rv");t.style.setProperty("--d",(i%4)*0.09+"s")});
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}})},{threshold:.12,rootMargin:"0px 0px -6% 0px"});
  Array.prototype.forEach.call(targets,function(t){io.observe(t)});
}
var hd=document.querySelector("header.top"),tb=document.querySelector(".topbar"),tick=false;
/* the hero slides under the top bar and header, so it needs to know how tall they are */
function stack(){document.documentElement.style.setProperty("--stack",((tb?tb.offsetHeight:0)+hd.offsetHeight)+"px")}
stack();window.addEventListener("resize",stack);window.addEventListener("load",stack);
if(document.fonts&&document.fonts.ready)document.fonts.ready.then(stack);
window.addEventListener("scroll",function(){if(tick)return;tick=true;requestAnimationFrame(function(){hd.classList.toggle("sc",window.scrollY>10);tick=false})},{passive:true});

/* menu */
var mb=$("menuBtn"),nav=$("nav");
mb.onclick=function(){var o=nav.classList.toggle("open");mb.setAttribute("aria-expanded",o)};
Array.prototype.forEach.call(nav.querySelectorAll("a"),function(a){a.addEventListener("click",function(){nav.classList.remove("open");mb.setAttribute("aria-expanded","false")})});
if(C.portalUrl&&/^https?:\/\//i.test(C.portalUrl)){var pl=$("portalLink");pl.href=C.portalUrl;pl.hidden=false;pl.parentNode.hidden=false}else{$("portalLink").parentNode.hidden=true}
})();
