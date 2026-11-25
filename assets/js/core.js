/* Shared helpers used by every other script. */
window.RA=(function(){
var C=window.SITE_CONFIG;
var $=function(i){return document.getElementById(i)};
function el(t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e}
function icon(n){var s=document.createElementNS("http://www.w3.org/2000/svg","svg");s.setAttribute("class","ic");s.setAttribute("aria-hidden","true");var u=document.createElementNS("http://www.w3.org/2000/svg","use");u.setAttribute("href","#i-"+n);s.appendChild(u);return s}
function chips(box,items,curv,fn){box.innerHTML="";items.forEach(function(x){var b=el("button","",x);b.type="button";b.setAttribute("aria-pressed",x===curv);b.onclick=function(){fn(x)};box.appendChild(b)})}
/* sending: endpoint if set, otherwise opens the visitor's email app */
function send(kind,fields,hp,cb){
  if(hp){cb(true,"spam");return}
  if(C.formEndpoint){
    var p={_form:kind};for(var k in fields)p[k]=fields[k];
    fetch(C.formEndpoint,{method:"POST",headers:{"Content-Type":"application/json","Accept":"application/json"},body:JSON.stringify(p)})
      .then(function(r){if(!r.ok)throw new Error("bad");cb(true,"sent")}).catch(function(){cb(false)});
  }else{
    var body=Object.keys(fields).map(function(k){return k+": "+fields[k]}).join("\n");
    location.href="mailto:"+C.email+"?subject="+encodeURIComponent(kind+" - "+(fields.Name||""))+"&body="+encodeURIComponent(body);
    cb(true,"mailto");
  }
}
var MSG={sent:"Thank you. We received your message and will reply within one business day.",mailto:"Your email app should now open with your message ready to send. If it did not, write to "+C.email+".",spam:"Thank you.",fail:"Sorry, that did not send. Please email "+C.email+" or call 416-939-0201."};
function say(box,ok,mode){box.textContent=ok?MSG[mode]:MSG.fail}
return {$:$,el:el,icon:icon,chips:chips,send:send,say:say,MSG:MSG};
})();
