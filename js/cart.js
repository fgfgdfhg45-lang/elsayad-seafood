(function(){
const IC=(p,w)=>'<svg class="ico" viewBox="0 0 24 24" width="'+w+'" height="'+w+'" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+p+'</svg>';
const P_CART='<circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 002 1.58h9.78a2 2 0 001.95-1.57l1.65-7.43H5.12"/>',P_BIKE='<circle cx="18.5" cy="17.5" r="3.5"/><circle cx="5.5" cy="17.5" r="3.5"/><circle cx="15" cy="5" r="1"/><path d="M12 17.5V14l-3-3 4-3 2 3h2"/>',P_STORE='<path d="M3 9l1-5h16l1 5"/><path d="M4 9v11h16V9"/><path d="M9 20v-6h6v6"/><path d="M3 9a3 3 0 006 0 3 3 0 006 0 3 3 0 006 0"/>';
const K='sy_cart',WA='201009127745',CU='sy_cust',LAST='sy_last',P_REPEAT='<path d="M3 12a9 9 0 109-9 9.75 9.75 0 00-6.74 2.74L3 8"/><path d="M3 3v5h5"/>';let cart=get(K)||[],mode='delivery',repeated=false;
const E=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const fab=document.createElement('button');fab.className='btn fab';document.body.appendChild(fab);
const rp=document.createElement('div');rp.className='fab repw';rp.hidden=true;document.body.appendChild(rp);
function paintRep(){const l=get(LAST);let dis=false;try{dis=sessionStorage.getItem('sy_rep_x')==='1'}catch(e){}
const show=!!(l&&l.items&&l.items.length&&!cart.length&&!dis);rp.hidden=!show;if(show)rp.innerHTML='<button type="button" class="btn rp" data-rp="go">'+IC(P_REPEAT,18)+' <span>كرر طلبي الأخير</span></button><button type="button" class="rx" data-rp="x" aria-label="إخفاء">&times;</button>'}
const md=document.createElement('div');md.className='modal';
md.innerHTML='<div class="box cartbox" role="dialog" aria-modal="true" aria-label="طلبك"><div id="cb"></div></div>';document.body.appendChild(md);
const tot=()=>cart.reduce((s,i)=>s+i.p*i.q,0),cnt=()=>cart.reduce((s,i)=>s+i.q,0),wt=()=>cart.some(i=>!i.p)?' + أصناف بسعر اليوم':'';
const f12=t=>{let[h,mi]=t.split(':').map(Number);const s=h>=12?'م':'ص';h=h%12||12;return h+':'+String(mi).padStart(2,'0')+' '+s};
function save(){set(K,cart);fab.hidden=!cnt();fab.innerHTML=IC(P_CART,20)+' <span>طلبك ('+cnt()+') · '+tot()+' جنيه'+wt()+'</span>';paintRep()}
window.SYcartAdd=(n,p,t)=>{t=t||'';const f=cart.find(i=>i.n===n&&(i.t||'')===t);f?f.q++:cart.push({n,p,q:1,t});save()};
function view(){const u=get('sy_cur')||{},cu=get(CU)||{},v=id=>{const e=$(id);return e?e.value:null},T={n:v('cn'),p:v('cp'),x:v('cx'),a:v('ca'),t:v('ct')},kp=$('ckeep'),keepOn=kp?kp.checked:cu.keep!==false,pv=(a,b)=>E(a!=null?a:(b||''));
$('cb').innerHTML='<h3>طلبك</h3>'+(repeated?'<p class="sub">ده طلبك الأخير. راجع الأصناف قبل التأكيد، والأسعار ممكن تتغير.</p>':'')+'<div id="ci">'+cart.map((i,x)=>'<div class="ci"><span>'+E(i.n)+(i.t?'<small class="sub" style="display:block">ملاحظة: '+E(i.t)+'</small>':'')+'</span><span class="qty"><button data-q="'+x+'|-1" aria-label="أقل">−</button><b>'+i.q+'</b><button data-q="'+x+'|1" aria-label="أكتر">+</button></span><b>'+(i.p?i.p*i.q:'سعر اليوم')+'</b></div>').join('')+'</div><p class="price" style="text-align:left">الإجمالي: '+tot()+' جنيه'+wt()+'</p>'
+'<input id="cn" placeholder="الاسم" autocomplete="name" value="'+pv(T.n,cu.name||u.name)+'"><input id="cp" type="tel" placeholder="رقم موبايلك (01xxxxxxxxx)" autocomplete="tel" value="'+pv(T.p,cu.phone)+'">'
+'<input id="cx" placeholder="تفاصيل أو ملاحظات (اختياري)" value="'+pv(T.x,'')+'">'
+'<p class="sub" style="margin:10px 0 0"><b>طريقة الاستلام</b></p>'
+'<div class="szs" style="margin:6px 0"><button type="button" class="sz on" data-m="delivery">'+IC(P_BIKE,16)+' دليفري</button><button type="button" class="sz" data-m="pickup">'+IC(P_STORE,16)+' استلام من الفرع</button></div>'
+'<input id="ca" placeholder="العنوان بالتفصيل" autocomplete="street-address" value="'+pv(T.a,cu.address)+'">'
+'<p class="sub" id="dn" style="margin:4px 0 0">'+IC(P_BIKE,16)+' سعر الدليفري بيختلف حسب المنطقة، وهنأكده معاك على واتساب.</p>'
+'<div id="pk"><p class="sub" id="ctp" style="margin:4px 0 0">اكتب معاد الاستلام (من 1 ظ لـ 8 م)</p><p class="sub" id="ctd" style="margin:4px 0 0">اكتب معاد التسليم اللي عايزه (من 1 ظ لـ 8 م)</p><input id="ct" type="time" min="13:00" max="20:00" value="'+pv(T.t,'')+'"></div>'
+'<label class="keep"><input type="checkbox" id="ckeep"'+(keepOn?' checked':'')+'> احفظ بياناتي على الجهاز ده للمرة الجاية</label>'+((cu.name||cu.phone||cu.address)?'<p class="sub" style="margin:2px 0 0"><button type="button" class="sw" id="cw">مسح بياناتي المحفوظة</button></p>':'')
+(window.SYphase&&SYphase()==='closed'?'<p class="msg">المطعم مقفول دلوقتي (10 ص – 8 م)، هنجهز طلبك مع أول فتح.</p>':(window.SYphase&&SYphase()==='pre'?'<p class="msg">بنستقبل الأوردرات من 1 ظهراً، هنجهز طلبك مع أول ميعاد.</p>':''))+'<div class="msg" id="cm" aria-live="polite"></div><button class="btn" id="cs" style="width:100%;justify-content:center">تأكيد الطلب</button><p style="text-align:center;margin-top:8px"><button class="sw" id="cc">إغلاق</button></p>';
const setMode=m=>{mode=m;document.querySelectorAll('[data-m]').forEach(x=>x.classList.toggle('on',x.dataset.m===m));$('ca').hidden=m==='pickup';$('dn').hidden=m==='pickup';$('ctp').hidden=m!=='pickup';$('ctd').hidden=m==='pickup'};
document.querySelectorAll('[data-m]').forEach(b=>b.onclick=()=>setMode(b.dataset.m));setMode(mode);
if($('cw'))$('cw').onclick=()=>{try{localStorage.removeItem(CU)}catch(e){}$('cn').value='';$('cp').value='';$('ca').value='';$('cw').parentNode.remove();$('cm').textContent='اتمسحت بياناتك المحفوظة'};
$('cc').onclick=closeM;$('cs').onclick=send}
function closeM(){repeated=false;md.classList.remove('on')}
function open(){if(!cart.length)return;mode=(get(CU)||{}).mode==='pickup'?'pickup':'delivery';view();md.classList.add('on')}
async function send(){const m=$('cm');m.className='msg';const n=$('cn').value.trim(),p=$('cp').value.trim().replace(/\s/g,''),a=$('ca').value.trim(),x=$('cx').value.trim(),pick=mode==='pickup',t=$('ct').value;
if(!n){m.textContent='اكتب اسمك.';return}if(!/^01[0125]\d{8}$/.test(p)){m.textContent='اكتب رقم موبايل مصري صحيح.';return}
if(!pick&&!a){m.textContent='اكتب العنوان.';return}if(!t){m.textContent=pick?'اكتب معاد الاستلام.':'اكتب معاد التسليم.';return}if(t<'13:00'||t>'20:00'){m.textContent=pick?'معاد الاستلام لازم يكون بين 1 ظ و 8 م.':'معاد التسليم لازم يكون بين 1 ظ و 8 م.';return}
const o={name:n,phone:p,address:pick?'استلام من الفرع':a,type:pick?'pickup':'delivery',pickupTime:t,notes:x,items:cart.map(i=>Object.assign({name:i.n,price:i.p,qty:i.q},i.t?{note:i.t}:{})),total:tot()};
const keep=$('ckeep')?$('ckeep').checked:true;
if(keep)set(CU,{name:n,phone:p,address:pick?((get(CU)||{}).address||''):a,mode,keep:true});else{try{localStorage.removeItem(CU)}catch(e){}}
set(LAST,{items:cart.map(i=>({n:i.n,p:i.p,q:i.q,t:i.t||''})),t:Date.now()});
let id=null;$('cs').disabled=true;m.textContent='جاري تجهيز الطلب...';
if(window.SY&&SY.enabled){try{id=await SY.order(o)}catch(e){id=null}}
const SEP='────────────',line=i=>i.name+'\n    عدد '+i.qty+(i.price?(i.qty>1?' × '+i.price+' = '+(i.price*i.qty):' — '+i.price)+' جنيه':' — سعر اليوم')+(i.note?'\n    ملاحظة: '+i.note:'');
const when=new Intl.DateTimeFormat('en-GB',{timeZone:'Africa/Cairo',day:'2-digit',month:'2-digit',year:'numeric',hour:'2-digit',minute:'2-digit',hour12:false}).format(new Date()).replace(',','');
const txt=['*طلب جديد'+(id?' #'+id.slice(0,6).toUpperCase():'')+'*',SEP,'*نوع الطلب:* '+(pick?'استلام من الفرع':'دليفري'),'*الاسم:* '+n,'*الموبايل:* '+p,pick?'*معاد الاستلام:* '+f12(t):'*العنوان:* '+a+'\n*معاد التسليم:* '+f12(t),SEP,'*الأصناف:*'].concat(o.items.map((i,k)=>(k+1)+') '+line(i))).concat([SEP,'*الإجمالي:* '+o.total+' جنيه'+wt()]).concat(x?['*ملاحظات:* '+x]:[]).concat(['*وقت الطلب:* '+when,'_مرسل من موقع أسماك الصياد الشرقية_']).join('\n');
repeated=false;cart=[];save();
$('cb').innerHTML='<h3>طلبك جاهز '+ICON_CHK+'</h3><p class="sub">'+(id?'اتسجّل برقم <b>'+id.slice(0,6).toUpperCase()+'</b>. ':'')+'اضغط الزر وابعته على واتساب عشان نأكده معاك.</p><a class="btn wa" style="width:100%;justify-content:center" target="_blank" rel="noopener" href="https://wa.me/'+WA+'?text='+encodeURIComponent(txt)+'">ابعت الطلب على واتساب</a><p style="text-align:center;margin-top:8px"><button class="sw" id="cc">إغلاق</button></p>';$('cc').onclick=closeM}
document.addEventListener('click',e=>{const q=e.target.closest('[data-q]');if(q){const[x,d]=q.dataset.q.split('|');cart[x].q+=+d;if(cart[x].q<1)cart.splice(x,1);save();cart.length?view():md.classList.remove('on')}});
md.onclick=e=>{if(e.target===md)closeM()};fab.onclick=open;
rp.onclick=e=>{const b=e.target.closest('[data-rp]');if(!b)return;if(b.dataset.rp==='x'){try{sessionStorage.setItem('sy_rep_x','1')}catch(err){}paintRep();return}
const l=get(LAST);if(!l||!l.items||!l.items.length)return;cart=l.items.map(i=>({n:i.n,p:i.p,q:i.q,t:i.t||''}));repeated=true;save();open()};
save();
})();
