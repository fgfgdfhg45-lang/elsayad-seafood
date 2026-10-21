(function(){
const K='sy_cart',WA='201009127745';let cart=get(K)||[],mode='delivery';
const fab=document.createElement('button');fab.className='btn fab';document.body.appendChild(fab);
const md=document.createElement('div');md.className='modal';
md.innerHTML='<div class="box cartbox" role="dialog" aria-modal="true" aria-label="طلبك"><div id="cb"></div></div>';document.body.appendChild(md);
const tot=()=>cart.reduce((s,i)=>s+i.p*i.q,0),cnt=()=>cart.reduce((s,i)=>s+i.q,0),wt=()=>cart.some(i=>!i.p)?' + أصناف بسعر اليوم':'';
const f12=t=>{let[h,mi]=t.split(':').map(Number);const s=h>=12?'م':'ص';h=h%12||12;return h+':'+String(mi).padStart(2,'0')+' '+s};
function save(){set(K,cart);fab.hidden=!cnt();fab.textContent='🛒 طلبك ('+cnt()+') · '+tot()+' جنيه'+wt()}
window.SYcartAdd=(n,p)=>{const f=cart.find(i=>i.n===n);f?f.q++:cart.push({n,p,q:1});save()};
function view(){const u=get('sy_cur')||{};mode='delivery';
$('cb').innerHTML='<h3>طلبك</h3><div id="ci">'+cart.map((i,x)=>'<div class="ci"><span>'+i.n+'</span><span class="qty"><button data-q="'+x+'|-1" aria-label="أقل">−</button><b>'+i.q+'</b><button data-q="'+x+'|1" aria-label="أكتر">+</button></span><b>'+(i.p?i.p*i.q:'سعر اليوم')+'</b></div>').join('')+'</div><p class="price" style="text-align:left">الإجمالي: '+tot()+' جنيه'+wt()+'</p>'
+'<input id="cn" placeholder="الاسم" autocomplete="name" value="'+(u.name||'')+'"><input id="cp" type="tel" placeholder="رقم موبايلك (01xxxxxxxxx)" autocomplete="tel">'
+'<input id="cx" placeholder="تفاصيل أو ملاحظات (اختياري)">'
+'<p class="sub" style="margin:10px 0 0"><b>طريقة الاستلام</b></p>'
+'<div class="szs" style="margin:6px 0"><button type="button" class="sz on" data-m="delivery">🛵 دليفري</button><button type="button" class="sz" data-m="pickup">🏪 استلام من الفرع</button></div>'
+'<input id="ca" placeholder="العنوان بالتفصيل" autocomplete="street-address">'
+'<p class="sub" id="dn" style="margin:4px 0 0">🛵 سعر الدليفري بيختلف حسب المنطقة، وهنأكده معاك على واتساب.</p>'
+'<div id="pk" hidden><p class="sub" style="margin:4px 0 0">اكتب معاد الاستلام (من 10 ص لـ 9 م)</p><input id="ct" type="time" min="10:00" max="21:00"></div>'
+(window.SYisOpen&&!SYisOpen()?'<p class="msg">المطعم مقفول دلوقتي (10 ص – 9 م)، هنجهز طلبك مع أول فتح.</p>':'')+'<div class="msg" id="cm" aria-live="polite"></div><button class="btn" id="cs" style="width:100%;justify-content:center">تأكيد الطلب</button><p style="text-align:center;margin-top:8px"><button class="sw" id="cc">إغلاق</button></p>';
document.querySelectorAll('[data-m]').forEach(b=>b.onclick=()=>{mode=b.dataset.m;document.querySelectorAll('[data-m]').forEach(x=>x.classList.toggle('on',x===b));$('ca').hidden=mode==='pickup';$('dn').hidden=mode==='pickup';$('pk').hidden=mode!=='pickup'});
$('cc').onclick=()=>md.classList.remove('on');$('cs').onclick=send}
function open(){if(!cart.length)return;view();md.classList.add('on')}
async function send(){const m=$('cm');m.className='msg';const n=$('cn').value.trim(),p=$('cp').value.trim().replace(/\s/g,''),a=$('ca').value.trim(),x=$('cx').value.trim(),pick=mode==='pickup',t=$('ct').value;
if(!n){m.textContent='اكتب اسمك.';return}if(!/^01[0125]\d{8}$/.test(p)){m.textContent='اكتب رقم موبايل مصري صحيح.';return}
if(pick){if(!t){m.textContent='اكتب معاد الاستلام.';return}if(t<'10:00'||t>'21:00'){m.textContent='معاد الاستلام لازم يكون بين 10 ص و 9 م.';return}}else if(!a){m.textContent='اكتب العنوان.';return}
const o={name:n,phone:p,address:pick?'استلام من الفرع':a,type:pick?'pickup':'delivery',pickupTime:pick?t:'',notes:x,items:cart.map(i=>({name:i.n,price:i.p,qty:i.q})),total:tot()};
let id=null;$('cs').disabled=true;m.textContent='جاري تجهيز الطلب...';
if(window.SY&&SY.enabled){try{id=await SY.order(o)}catch(e){id=null}}
const txt='طلب جديد'+(id?' #'+id.slice(0,6).toUpperCase():'')+'\nنوع الطلب: '+(pick?'استلام من الفرع':'دليفري')+'\nالاسم: '+n+'\nالموبايل: '+p+(pick?'\nمعاد الاستلام: '+f12(t):'\nالعنوان: '+a)+'\n'+o.items.map(i=>'• '+i.name+' × '+i.qty+(i.price?'':' (سعر اليوم)')).join('\n')+'\nالإجمالي: '+o.total+' جنيه'+wt()+(x?'\nملاحظات: '+x:'');
cart=[];save();
$('cb').innerHTML='<h3>طلبك جاهز ✓</h3><p class="sub">'+(id?'اتسجّل برقم <b>'+id.slice(0,6).toUpperCase()+'</b>. ':'')+'اضغط الزر وابعته على واتساب عشان نأكده معاك.</p><a class="btn wa" style="width:100%;justify-content:center" target="_blank" rel="noopener" href="https://wa.me/'+WA+'?text='+encodeURIComponent(txt)+'">ابعت الطلب على واتساب</a><p style="text-align:center;margin-top:8px"><button class="sw" id="cc">إغلاق</button></p>';$('cc').onclick=()=>md.classList.remove('on')}
document.addEventListener('click',e=>{const q=e.target.closest('[data-q]');if(q){const[x,d]=q.dataset.q.split('|');cart[x].q+=+d;if(cart[x].q<1)cart.splice(x,1);save();cart.length?view():md.classList.remove('on')}});
md.onclick=e=>{if(e.target===md)md.classList.remove('on')};fab.onclick=open;save();
})();
