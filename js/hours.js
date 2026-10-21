(function(){
function isOpen(){const p=new Intl.DateTimeFormat('en-GB',{timeZone:'Africa/Cairo',hour:'numeric',minute:'numeric',hour12:false}).formatToParts(new Date());const h=+p.find(x=>x.type==='hour').value%24;return h>=10&&h<22}
window.SYisOpen=isOpen;
function paint(){const o=isOpen();document.querySelectorAll('[data-hours]').forEach(e=>{e.className='hb'+(o?' on':'');e.innerHTML='<i></i>'+(o?'مفتوح الآن · حتى 10 م':'مقفول الآن · نفتح 10 ص')})}
paint();setInterval(paint,60000);
})();
