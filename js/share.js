/* مشاركة الأصناف */
(function(){
if(navigator.share)document.documentElement.classList.add('can-share');
function toast(m){var t=document.createElement('div');t.className='toast';t.setAttribute('role','status');t.innerHTML=m;document.body.appendChild(t);setTimeout(function(){t.remove()},1800)}
function copy(u){
  function done(){toast('اتنسخ الرابط '+ICON_CHK)}
  if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(u).then(done,fb)}else fb();
  function fb(){var a=document.createElement('textarea');a.value=u;a.style.position='fixed';a.style.opacity='0';document.body.appendChild(a);a.select();try{document.execCommand('copy');done()}catch(e){}a.remove()}
}
function share(t,u){
  if(navigator.share){navigator.share({title:t,text:t+' – أسماك الصياد الشرقية',url:u}).catch(function(){})}
  else copy(u);
}
document.addEventListener('click',function(e){
  var b=e.target.closest('.shi,[data-act]');if(!b)return;
  if(b.classList.contains('shi')){
    e.preventDefault();e.stopPropagation();
    var u=new URL('menu/'+b.getAttribute('data-slug')+'.html',document.baseURI).href;
    var card=b.closest('.tray'),h=card&&card.querySelector('h3');
    share(h?h.textContent.trim():document.title,u);return;
  }
  var act=b.getAttribute('data-act'),url=b.getAttribute('data-url')||location.href;
  if(act==='native')share(b.getAttribute('data-title')||document.title,url);
  else if(act==='copy')copy(url);
});
})();
