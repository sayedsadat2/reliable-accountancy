/* "Companies we work with" scrolling strip. The names live in config.js (partners.items). */
(function(){
"use strict";
var C=window.SITE_CONFIG,RA=window.RA,$=RA.$,el=RA.el;
var P=C.partners||{},box=$("partners");
if(!box)return;
var items=(P.items||[]).filter(function(x){return String(x||"").trim()});
if(P.enabled===false||!items.length){box.hidden=true;return}
$("partnersTitle").textContent=P.title||"Companies we work with";
var track=$("partnersTrack");
function set(hidden){var s=el("div","partners-set");if(hidden)s.setAttribute("aria-hidden","true");items.forEach(function(n){s.appendChild(el("span","",n))});return s}
track.appendChild(set(false));
function build(){
  /* measure one set, then add copies so the strip is never empty on wide screens */
  while(track.children.length>1)track.removeChild(track.lastChild);
  var w=track.firstChild.getBoundingClientRect().width;if(!w)return;
  var copies=Math.ceil(box.getBoundingClientRect().width/w)+1;
  for(var i=0;i<copies;i++)track.appendChild(set(true));
  track.style.setProperty("--set",w+"px");
  track.style.setProperty("--dur",(w/(P.speed||25))+"s");   /* speed in pixels per second */
}
build();
if(document.fonts&&document.fonts.ready)document.fonts.ready.then(build);
var t;window.addEventListener("resize",function(){clearTimeout(t);t=setTimeout(build,200)});
})();
