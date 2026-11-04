(function(){
function isOpen(){const p=new Intl.DateTimeFormat('en-GB',{timeZone:'Africa/Cairo',hour:'numeric',minute:'numeric',hour12:false}).formatToParts(new Date());const h=+p.find(x=>x.type==='hour').value%24;return h>=10&&h<20}
function phase(){const p=new Intl.DateTimeFormat('en-GB',{timeZone:'Africa/Cairo',hour:'numeric',hour12:false}).formatToParts(new Date());const h=+p.find(x=>x.type==='hour').value%24;return h<10||h>=20?'closed':(h<13?'pre':'open')}
window.SYphase=phase;
window.SYisOpen=isOpen;
function paint(){const o=isOpen();document.querySelectorAll('[data-hours]').forEach(e=>{e.className='hb'+(o?' on':'');e.innerHTML='<i></i>'+(o?(phase()==='pre'?'مفتوح الآن · الأوردرات من 1 ظ':'مفتوح الآن · حتى 8 م'):'مقفول الآن · نفتح 10 ص')})}
paint();setInterval(paint,60000);
})();
