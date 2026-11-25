/* Social media links in the footer. Addresses live in config.js (social). Only filled-in ones appear. */
(function(){
"use strict";
var C=window.SITE_CONFIG,RA=window.RA,$=RA.$;
var S=C.social||{},box=$("socialLinks");
if(!box)return;
var ICON={"facebook": "<circle cx=\"16\" cy=\"16\" r=\"16\" fill=\"#1877F2\"/><path d=\"M17.4 26v-8.2h2.8l.5-3.3h-3.3v-2c0-1 .4-1.7 1.8-1.7h1.6V7.9c-.3 0-1.3-.1-2.4-.1-2.5 0-4.1 1.5-4.1 4.2v2.5H11.5v3.3h2.8V26z\" fill=\"#fff\"/>", "instagram": "<defs><linearGradient id=\"ig\" x1=\"0\" y1=\"1\" x2=\"1\" y2=\"0\"><stop offset=\"0\" stop-color=\"#FEDA75\"/><stop offset=\".4\" stop-color=\"#FA7E1E\"/><stop offset=\".7\" stop-color=\"#D62976\"/><stop offset=\"1\" stop-color=\"#4F5BD5\"/></linearGradient></defs><circle cx=\"16\" cy=\"16\" r=\"16\" fill=\"url(#ig)\"/><rect x=\"8.5\" y=\"8.5\" width=\"15\" height=\"15\" rx=\"4.5\" fill=\"none\" stroke=\"#fff\" stroke-width=\"2\"/><circle cx=\"16\" cy=\"16\" r=\"3.6\" fill=\"none\" stroke=\"#fff\" stroke-width=\"2\"/><circle cx=\"20.7\" cy=\"11.3\" r=\"1.1\" fill=\"#fff\"/>", "tiktok": "<circle cx=\"16\" cy=\"16\" r=\"16\" fill=\"#111\"/><path d=\"M17.6 8v10.2a2.9 2.9 0 1 1-2.9-2.9\" fill=\"none\" stroke=\"#25F4EE\" stroke-width=\"2.4\" stroke-linecap=\"round\" transform=\"translate(-.9 .6)\"/><path d=\"M17.6 8c.3 2.3 1.6 3.7 4 3.9\" fill=\"none\" stroke=\"#FE2C55\" stroke-width=\"2.4\" stroke-linecap=\"round\" transform=\"translate(.9 -.4)\"/><path d=\"M17.6 8v10.2a2.9 2.9 0 1 1-2.9-2.9M17.6 8c.3 2.3 1.6 3.7 4 3.9\" fill=\"none\" stroke=\"#fff\" stroke-width=\"2.4\" stroke-linecap=\"round\"/>", "linkedin": "<circle cx=\"16\" cy=\"16\" r=\"16\" fill=\"#0A66C2\"/><rect x=\"9\" y=\"13\" width=\"3\" height=\"9.5\" fill=\"#fff\"/><circle cx=\"10.5\" cy=\"9.9\" r=\"1.8\" fill=\"#fff\"/><path d=\"M14.3 13h2.9v1.3c.5-.9 1.6-1.6 3.1-1.6 3 0 3.7 2 3.7 4.5v5.3h-3v-4.7c0-1.1 0-2.5-1.5-2.5s-1.7 1.2-1.7 2.4v4.8h-3z\" fill=\"#fff\"/>", "x": "<circle cx=\"16\" cy=\"16\" r=\"16\" fill=\"#000\"/><path d=\"M9.5 9.5l13 13M22.5 9.5l-13 13\" stroke=\"#fff\" stroke-width=\"2.4\" stroke-linecap=\"round\"/>", "youtube": "<circle cx=\"16\" cy=\"16\" r=\"16\" fill=\"#FF0000\"/><rect x=\"7.5\" y=\"10.5\" width=\"17\" height=\"11\" rx=\"3.3\" fill=\"#fff\"/><path d=\"M14 13.4v5.2l4.6-2.6z\" fill=\"#FF0000\"/>", "whatsapp": "<circle cx=\"16\" cy=\"16\" r=\"16\" fill=\"#25D366\"/><path d=\"M16 8.2a7.8 7.8 0 0 0-6.7 11.8L8.2 24l4.1-1.1A7.8 7.8 0 1 0 16 8.2z\" fill=\"none\" stroke=\"#fff\" stroke-width=\"1.9\" stroke-linejoin=\"round\"/><path d=\"M13 12.6c.3-.5.7-.4 1-.1l.7 1.2c.1.3 0 .5-.3.8l-.3.4c.5 1 1.3 1.8 2.4 2.4l.4-.4c.3-.3.5-.3.8-.2l1.2.7c.3.2.4.5.1 1-.4.8-1.3 1.1-2.3.8-2.6-.8-4.3-2.6-4.8-4.5-.1-.9.1-1.6.4-2.1z\" fill=\"#fff\"/>"};
var NAMES=[["facebook","Facebook"],["instagram","Instagram"],["linkedin","LinkedIn"],["youtube","YouTube"],["tiktok","TikTok"],["x","X"]];
var urls=[];
function add(key,label,url,newTab){
  var a=document.createElement("a");
  a.href=url;a.target="_blank";a.rel="noopener noreferrer me";
  a.setAttribute("aria-label",label+" (opens in a new tab)");
  a.innerHTML='<svg viewBox="0 0 32 32" aria-hidden="true">'+ICON[key]+'</svg><span></span>';
  a.lastChild.textContent=label;
  box.appendChild(a);
}
NAMES.forEach(function(n){
  var u=String(S[n[0]]||"").trim();
  if(/^https:\/\//i.test(u)){add(n[0],n[1],u);urls.push(u)}
});
var W=C.whatsapp;
if(W&&W.enabled&&W.number){add("whatsapp","WhatsApp","https://wa.me/"+String(W.number).replace(/\D/g,"")+"?text="+encodeURIComponent(W.message||""))}
var g=String(S.googleReviews||"").trim();
if(/^https:\/\//i.test(g)){var r=document.createElement("a");r.href=g;r.target="_blank";r.rel="noopener noreferrer";r.textContent="Review us on Google";box.appendChild(r)}
if(!box.children.length)return;
box.parentNode.hidden=false;
/* tell search engines these pages belong to the business */
try{var ld=document.querySelector('script[type="application/ld+json"]');if(ld&&urls.length){var d=JSON.parse(ld.textContent);d.sameAs=urls;ld.textContent=JSON.stringify(d)}}catch(e){}
})();
