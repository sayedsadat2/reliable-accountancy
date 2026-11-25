/* ==========================================================================
   Chat bubble + WhatsApp button.
   - With receptionist.endpoint set (see config.js) the chat talks to Adrian, your AI receptionist.
   - With no endpoint it answers common questions from the list below and takes a message.
   - Messages left in the chat go to your Adrian server (alerts) or to the normal forms/email.
   Edit the answers in OFFLINE_FAQ. Everything else is set in config.js.
   ========================================================================== */
(function(){
"use strict";
var C=window.SITE_CONFIG,RA=window.RA,el=RA.el,icon=RA.icon,send=RA.send;
var CH=C.chat||{},WA=C.whatsapp||{},RC=C.receptionist||{};
var chatOn=CH.enabled!==false,waOn=WA.enabled!==false&&/^\d{8,15}$/.test(String(WA.number||""));
if(!chatOn&&!waOn)return;

/* ---------- Built-in answers (used when no receptionist endpoint is set, or Adrian is unreachable) ----------
   keys = words that trigger the answer. actions = buttons shown under it: book, message, whatsapp, call.
   Keep answers factual. Do not add prices: fees are quoted in a consultation. */
var OFFLINE_FAQ=[
 {keys:["hello","hi ","hey","good morning","good afternoon"],a:"Hello! I can answer questions about our services, hours and how to book. What would you like to know?"},
 {keys:["thank"],a:"You're welcome. Is there anything else I can help with?"},
 {keys:["hour","open","when are you","weekend","available","closed"],a:"We work Monday to Friday, 9:00 a.m. to 5:00 p.m. Eastern, by appointment, by phone and online. Outside those hours, leave a message and we will return your call the next business day.",actions:["book","message"]},
 {keys:["price","fee","cost","quote","charge","how much","rate"],a:"Fees depend on your situation, so we do not quote prices in chat. Your first meeting is free, and you receive a clear written fee quote before any work begins.",actions:["book","message"]},
 {keys:["payroll","t4","record of employment","roe","cpp","ei ","remittance","employee"],a:"Payroll: pay runs, CPP, EI and source deductions, CRA remittances, T4 and T4A slips, and Records of Employment.",actions:["book"]},
 {keys:["gst","hst","sales tax","input tax"],a:"GST/HST: registration, regular filing and input tax credit review, with the right rate for Ontario and other provinces.",actions:["book"]},
 {keys:["bookkeep","books","quickbooks","xero","sage","reconcil"],a:"Bookkeeping: monthly or quarterly bookkeeping in QuickBooks, Xero, Sage or Excel, with reconciled accounts and clean books at year end.",actions:["book"]},
 {keys:["tax return","t1","t2","income tax","personal tax","corporate tax","corporation","filing","return"],a:"Tax: T1 returns for individuals and families, and T2 returns with CCA schedules and GIFI statements for corporations.",actions:["book"]},
 {keys:["incorporat","register","business number","start a business","new business","numbered company"],a:"Business registration: federal or Ontario incorporation, Business Number, and GST/HST and payroll accounts set up correctly.",actions:["book"]},
 {keys:["cra","letter","notice","audit","reassess","collections"],a:"If you received a letter from CRA, please do not ignore the deadline on it. Leave your details and the date on the letter and our team will call you back.",actions:["message","book"]},
 {keys:["service","what do you do","offer","help with","accounting"],a:"We offer bookkeeping, payroll, GST/HST, personal and corporate tax, business registration, and planning and advice, for businesses and families across Canada.",actions:["book","message"]},
 {keys:["language","dari","pashto","farsi","persian","french","speak"],a:"We can follow up in English, Dari or Pashto. Leave a message with your preferred language and we will call you back in it.",actions:["message"]},
 {keys:["book","meeting","appointment","consult","schedule","call me","discovery"],a:"Your first meeting is free. Pick a weekday time, by video or phone, in the booking section of this page.",actions:["book","message"]},
 {keys:["phone","email","contact","address","where","location","reach"],a:"You can call "+(C.phone||"")+(C.phone2?" or "+C.phone2:"")+", or email "+(C.email||"")+". We work by appointment, by phone and online, from Scarborough, Ontario, for clients across Canada.",actions:["message","whatsapp"]},
 {keys:["human","person","someone","speak to","talk to","john","accountant","representative"],a:"Of course. Leave your details and the right person will get back to you, or call "+(C.phone||"")+" during office hours.",actions:["message","whatsapp"]}
];
var FALLBACK="I'm not sure I can answer that one correctly. I can take a message so a person replies, or you can book a free meeting.";

/* ---------- Small helpers ---------- */
var doc=document;
function digits(s){return String(s||"").replace(/\D/g,"")}
function waLink(){return "https://wa.me/"+digits(WA.number)+"?text="+encodeURIComponent(WA.message||"Hello")}
function store(k,v){try{if(v===undefined)return JSON.parse(sessionStorage.getItem(k)||"null");sessionStorage.setItem(k,JSON.stringify(v))}catch(e){return null}}
function sid(){var s=store("ra_sid");if(!s){s=(window.crypto&&crypto.randomUUID?crypto.randomUUID():String(Date.now())+Math.random().toString(36).slice(2)).replace(/[^A-Za-z0-9_-]/g,"").slice(0,48);if(s.length<8)s=s+"0000abcd";store("ra_sid",s)}return s}
function endpoint(){var e=String(RC.endpoint||"").trim().replace(/\/+$/,"");return /^https?:\/\//i.test(e)?e:""}

/* ---------- Build the dock (WhatsApp + chat button) ---------- */
var fb=doc.getElementById("fallbackFloat");if(fb&&fb.parentNode)fb.parentNode.removeChild(fb);
var dock=el("div","ra-dock");doc.body.appendChild(dock);
var waBtn=null,launcher=null,panel=null;

if(waOn){
  waBtn=el("a","ra-wa");waBtn.href=waLink();waBtn.target="_blank";waBtn.rel="noopener noreferrer";
  waBtn.setAttribute("aria-label","Message us on WhatsApp (opens in a new tab)");
  waBtn.appendChild(icon("wa"));waBtn.appendChild(el("span","","WhatsApp"));
  dock.appendChild(waBtn);
}
if(!chatOn)return;

launcher=el("button","ra-launch");launcher.type="button";
launcher.setAttribute("aria-haspopup","dialog");launcher.setAttribute("aria-expanded","false");launcher.setAttribute("aria-controls","raChat");
launcher.appendChild(icon("chat"));launcher.appendChild(el("span","","Chat with "+(CH.name||"us")));
dock.appendChild(launcher);

panel=el("section","ra-chat");panel.id="raChat";panel.hidden=true;
panel.setAttribute("role","dialog");panel.setAttribute("aria-label","Chat with "+(CH.name||"Reliable Accountancy"));
var head=el("header","ra-head");
var av=el("div","ra-av","R");av.setAttribute("aria-hidden","true");
var who=el("div","ra-who");who.appendChild(el("b","",CH.name||"Reliable Accountancy"));
var sub=el("small","");sub.appendChild(el("i","ra-dot"));sub.appendChild(doc.createTextNode((CH.subtitle||"Virtual receptionist")+" · replies instantly"));who.appendChild(sub);
var closeB=el("button","ra-x","×");closeB.type="button";closeB.setAttribute("aria-label","Close chat");
head.appendChild(av);head.appendChild(who);head.appendChild(closeB);
var log=el("div","ra-log");log.setAttribute("role","log");log.setAttribute("aria-live","polite");log.tabIndex=0;
var qr=el("div","ra-qr");
var form=el("form","ra-form");form.autocomplete="off";
var input=el("input");input.type="text";input.maxLength=500;input.placeholder="Type your question…";input.setAttribute("aria-label","Your message");
var sendB=el("button","ra-send");sendB.type="submit";sendB.setAttribute("aria-label","Send");sendB.appendChild(icon("arrow"));
form.appendChild(input);form.appendChild(sendB);
var lead=buildLead();
var foot=el("div","ra-foot");foot.appendChild(el("p","",CH.privacyNote||""));
var links=el("div","ra-links");foot.appendChild(links);
[panel].forEach(function(p){p.appendChild(head);p.appendChild(log);p.appendChild(qr);p.appendChild(form);p.appendChild(lead);p.appendChild(foot)});
dock.appendChild(panel);
(function(){
  var a=el("a","","Book a meeting");a.href="#book";a.onclick=function(){closeChat(true)};links.appendChild(a);
  if(C.phoneTel){var t=el("a","","Call "+(C.phone||""));t.href="tel:"+C.phoneTel;links.appendChild(t)}
  if(RC.showCallButton&&RC.callNumber){var c=el("a","","Call "+(CH.name||"Adrian"));c.href="tel:"+RC.callNumber;links.appendChild(c)}
})();

/* ---------- Messages ---------- */
var history=store("ra_msgs")||[];
function save(){store("ra_msgs",history.slice(-40))}
function addMsg(role,text,noSave){
  var m=el("div","ra-m "+(role==="user"?"u":"b"));m.textContent=text;log.appendChild(m);
  log.scrollTop=log.scrollHeight;
  if(!noSave){history.push({r:role,t:text});save()}
  return m;
}
function typing(on){
  var t=log.querySelector(".ra-typing");
  if(on&&!t){t=el("div","ra-m b ra-typing");t.setAttribute("aria-label",(CH.name||"Assistant")+" is typing");for(var i=0;i<3;i++)t.appendChild(el("i"));log.appendChild(t);log.scrollTop=log.scrollHeight}
  if(!on&&t)t.parentNode.removeChild(t);
}
var ACTIONS={
  book:{label:"Book a free meeting",run:function(){closeChat(true);var b=doc.getElementById("book");if(b)b.scrollIntoView({behavior:"smooth"})}},
  message:{label:"Leave a message",run:function(){showLead()}},
  whatsapp:{label:"WhatsApp us",run:function(){window.open(waLink(),"_blank","noopener")},hide:!waOn},
  call:{label:"Call "+(C.phone||""),run:function(){location.href="tel:"+C.phoneTel}}
};
function setChips(list){
  qr.innerHTML="";
  (list||[]).forEach(function(x){
    var label=typeof x==="string"?x:x.label,action=typeof x==="string"?null:x.action;
    if(action&&ACTIONS[action]&&ACTIONS[action].hide)return;
    var b=el("button","",label);b.type="button";
    b.onclick=function(){if(action&&ACTIONS[action]){addMsg("user",label);ACTIONS[action].run()}else ask(label)};
    qr.appendChild(b)});
  log.scrollTop=log.scrollHeight;
}
function chipsFromActions(acts){return (acts||[]).map(function(a){return {label:ACTIONS[a].label,action:a}})}

/* ---------- Answering ---------- */
function offline(text){
  var t=" "+text.toLowerCase()+" ",best=null,score=0;
  OFFLINE_FAQ.forEach(function(f){var s=0;f.keys.forEach(function(k){if(t.indexOf(k)>-1)s+=k.length>3?2:1});if(s>score){score=s;best=f}});
  return best?{reply:best.a,chips:chipsFromActions(best.actions)}:{reply:FALLBACK,chips:chipsFromActions(["message","book"])};
}
var busy=false;
function ask(text){
  text=String(text||"").trim();if(!text||busy)return;
  addMsg("user",text);input.value="";setChips([]);
  var ep=endpoint();
  if(!ep){var o=offline(text);setTimeout(function(){addMsg("bot",o.reply);setChips(o.chips)},350);return}
  busy=true;sendB.disabled=true;typing(true);
  var ctl=window.AbortController?new AbortController():null,timer=setTimeout(function(){if(ctl)ctl.abort()},25000);
  fetch(ep+"/api/web/chat",{method:"POST",headers:{"Content-Type":"application/json"},
    body:JSON.stringify({sessionId:sid(),message:text,page:location.pathname+location.hash,lang:navigator.language||""}),signal:ctl?ctl.signal:undefined})
  .then(function(r){return r.json().catch(function(){return {}}).then(function(d){return {ok:r.ok,d:d}})})
  .then(function(x){
    typing(false);
    if(x.ok&&x.d&&x.d.reply){if(x.d.sessionId)store("ra_sid",x.d.sessionId);addMsg("bot",x.d.reply);setChips(x.d.handoff?chipsFromActions(["message"]):chipsFromActions(["book","message"]));if(x.d.handoff)showLead()}
    else if(x.d&&x.d.error&&!x.d.fallback){addMsg("bot",x.d.error,true);setChips([])}
    else unreachable(text);
  })
  .catch(function(){typing(false);unreachable(text)})
  .then(function(){clearTimeout(timer);busy=false;sendB.disabled=false});
}
function unreachable(text){
  var o=offline(text);
  addMsg("bot",o.reply===FALLBACK?"I can't reach our receptionist right now. Please leave a message and a person will reply, or call "+(C.phone||"us")+" during office hours.":o.reply);
  setChips(o.reply===FALLBACK?chipsFromActions(["message","book"]):o.chips);
  if(o.reply===FALLBACK)showLead();
}

/* ---------- Leave-a-message form ---------- */
function buildLead(){
  var f=el("form","ra-lead");f.hidden=true;f.noValidate=false;
  function row(label,type,id,req,ph){var l=el("label","");l.htmlFor=id;l.textContent=label;var i=el(type==="textarea"?"textarea":"input");i.id=id;if(type!=="textarea")i.type=type;if(ph)i.placeholder=ph;if(req)i.required=true;i.maxLength=type==="textarea"?900:120;f.appendChild(l);f.appendChild(i);return i}
  f.appendChild(el("h3","","Leave a message"));
  f.appendChild(el("p","","A person will reply by the next business day."));
  row("Your name","text","raName",true);
  row("Phone","tel","raPhone",false,"416 555 0100");
  row("Email","email","raEmail",false);
  var l=el("label","","Preferred language");l.htmlFor="raLang";f.appendChild(l);
  var s=el("select");s.id="raLang";["English","Dari","Pashto","Other"].forEach(function(x){s.appendChild(el("option","",x))});f.appendChild(s);
  row("How can we help?","textarea","raMsg",true);
  var hp=el("input","ra-hp");hp.id="raHp";hp.tabIndex=-1;hp.autocomplete="off";hp.setAttribute("aria-hidden","true");f.appendChild(hp);
  var row2=el("div","ra-lead-actions");
  var go=el("button","ra-primary","Send message");go.type="submit";
  var cancel=el("button","ra-ghost","Back to chat");cancel.type="button";cancel.onclick=function(){hideLead()};
  row2.appendChild(go);row2.appendChild(cancel);f.appendChild(row2);
  var note=el("p","ra-note","We use these details only to reply to you.");f.appendChild(note);
  f.onsubmit=function(e){
    e.preventDefault();
    var d={name:f.querySelector("#raName").value.trim(),phone:f.querySelector("#raPhone").value.trim(),email:f.querySelector("#raEmail").value.trim(),language:s.value,message:f.querySelector("#raMsg").value.trim(),page:location.pathname,website:hp.value};
    if(!d.phone&&!d.email){note.textContent="Please add a phone number or an email so we can reply.";note.className="ra-note err";return}
    go.disabled=true;note.className="ra-note";note.textContent="Sending…";
    var ep=endpoint();
    function done(ok){
      go.disabled=false;
      if(ok){f.reset();hideLead();addMsg("bot","Thank you, "+d.name.split(" ")[0]+". Your message has been sent and a person will reply by the next business day.");setChips(chipsFromActions(["book"]));note.textContent="We use these details only to reply to you."}
      else{note.className="ra-note err";note.textContent="Sorry, that did not send. Please email "+C.email+" or call "+(C.phone||"us")+"."}
    }
    if(ep){
      fetch(ep+"/api/web/lead",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(d)})
        .then(function(r){done(r.ok)}).catch(function(){fallbackForm(d,done)});
    }else fallbackForm(d,done);
  };
  return f;
}
function fallbackForm(d,done){
  send("Chat message",{Name:d.name,Phone:d.phone,Email:d.email,Language:d.language,Message:d.message},d.website,function(ok){done(ok)});
}
function showLead(){lead.hidden=false;form.hidden=true;qr.hidden=true;log.classList.add("short");var n=lead.querySelector("input");if(n)n.focus();log.scrollTop=log.scrollHeight}
function hideLead(){lead.hidden=true;form.hidden=false;qr.hidden=false;log.classList.remove("short");input.focus()}

/* ---------- Open / close ---------- */
var started=false;
function start(){
  if(started)return;started=true;
  if(history.length){history.forEach(function(h){addMsg(h.r,h.t,true)});setChips(CH.quickReplies)}
  else{addMsg("bot",CH.welcome||"Hello! How can I help?");setChips(CH.quickReplies)}
}
function openChat(){
  panel.hidden=false;launcher.setAttribute("aria-expanded","true");launcher.classList.add("on");start();
  setTimeout(function(){if(!lead.hidden){var n=lead.querySelector("input");if(n)n.focus()}else input.focus()},50);
}
function closeChat(skipFocus){
  panel.hidden=true;launcher.setAttribute("aria-expanded","false");launcher.classList.remove("on");
  if(!skipFocus)launcher.focus();
}
launcher.onclick=function(){panel.hidden?openChat():closeChat()};
closeB.onclick=function(){closeChat()};
doc.addEventListener("keydown",function(e){if(e.key==="Escape"&&!panel.hidden)closeChat()});
form.onsubmit=function(e){e.preventDefault();ask(input.value)};
if(CH.openAfterSeconds>0&&!store("ra_seen")){setTimeout(function(){if(panel.hidden){openChat();store("ra_seen",1)}},CH.openAfterSeconds*1000)}
})();
