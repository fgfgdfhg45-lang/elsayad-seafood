(function(){
const grid=$('rv'),esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const stars=n=>'<span class="stars" role="img" aria-label="'+n+' من 5">'+'★'.repeat(n)+'<i>'+'★'.repeat(5-n)+'</i></span>';
const card=r=>'<figure class="rv">'+stars(r.rating)+'<blockquote>'+esc(r.text)+'</blockquote><figcaption>'+(r.g&&r.url?'<a href="'+esc(r.url)+'" target="_blank" rel="noopener">'+esc(r.name)+'</a>':esc(r.name))+(r.g?' <span class="gb">Google'+(r.when?' · '+esc(r.when):'')+'</span>':'')+'</figcaption></figure>';
let live=[],g=[];const draw=()=>{grid.innerHTML=g.concat(live,window.SEED_REVIEWS||[]).map(card).join('')};draw();
function load(){if(window.SY&&SY.enabled)SY.getReviews().then(a=>{live=a;draw()}).catch(()=>{})}
window.SY&&SY.loaded?load():addEventListener('sy-ready',load);
const md=document.createElement('div');md.className='modal';md.innerHTML='<div class="box" role="dialog" aria-modal="true" aria-label="اكتب تقييمك"><div id="rb"></div></div>';document.body.appendChild(md);
let rate=5;
function form(){const u=get('sy_cur')||{};$('rb').innerHTML='<h3>اكتب تقييمك</h3><div class="pick" id="pk">'+[1,2,3,4,5].map(i=>'<button type="button" data-s="'+i+'" aria-label="'+i+' نجوم">★</button>').join('')+'</div><input id="rn" maxlength="40" placeholder="اسمك" autocomplete="name" value="'+esc(u.name||'')+'"><textarea id="rt" maxlength="400" rows="4" placeholder="رأيك في الأكل والخدمة"></textarea><div class="msg" id="rm" aria-live="polite"></div><button class="btn" id="rs" style="width:100%;justify-content:center">إرسال التقييم</button><p style="text-align:center;margin-top:8px"><button class="sw" id="rc">إغلاق</button></p>';
paint5();$('pk').onclick=e=>{const b=e.target.closest('[data-s]');if(b){rate=+b.dataset.s;paint5()}};$('rc').onclick=()=>md.classList.remove('on');$('rs').onclick=send}
function paint5(){document.querySelectorAll('#pk button').forEach(b=>b.classList.toggle('on',+b.dataset.s<=rate))}
async function send(){const m=$('rm'),n=$('rn').value.trim(),t=$('rt').value.trim();m.className='msg';
if(n.length<2){m.textContent='اكتب اسمك.';return}if(t.length<5){m.textContent='اكتب رأيك في كلمتين على الأقل.';return}
if(!(window.SY&&SY.enabled)){m.textContent='استقبال التقييمات هيشتغل بعد ربط Firebase.';return}
const last=+(localStorage.getItem('sy_rv')||0);if(Date.now()-last<300000){m.textContent='ابعت تقييم واحد كل 5 دقايق.';return}
$('rs').disabled=true;m.textContent='جاري الإرسال...';
try{await SY.addReview({name:n,rating:rate,text:t});try{localStorage.setItem('sy_rv',Date.now())}catch(e){}
$('rb').innerHTML='<h3>شكراً لتقييمك ✓</h3><p class="sub">هيظهر على الموقع بعد مراجعته.</p><p style="text-align:center"><button class="sw" id="rc">إغلاق</button></p>';$('rc').onclick=()=>md.classList.remove('on')}
catch(e){m.textContent='حصل خطأ، حاول تاني.';$('rs').disabled=false}}
$('rvBtn').onclick=()=>{rate=5;form();md.classList.add('on')};
md.onclick=e=>{if(e.target===md)md.classList.remove('on')};

// ===== تقييمات Google Maps (Places API) =====
(async function(){const c=window.GOOGLE_PLACES;if(!c||!c.placeId||!c.apiKey||/^PASTE/.test(c.placeId+c.apiKey))return;
const w=$('gw');if(w){w.href='https://search.google.com/local/writereview?placeid='+encodeURIComponent(c.placeId);w.hidden=false}
try{const res=await fetch('https://places.googleapis.com/v1/places/'+encodeURIComponent(c.placeId)+'?fields=rating,userRatingCount,reviews&languageCode=ar&key='+encodeURIComponent(c.apiKey));if(!res.ok)return;const d=await res.json();
g=(d.reviews||[]).map(x=>({g:1,name:(x.authorAttribution&&x.authorAttribution.displayName)||'عميل',url:x.authorAttribution&&x.authorAttribution.uri,rating:Math.round(x.rating)||5,text:(x.text&&x.text.text)||(x.originalText&&x.originalText.text)||'',when:x.relativePublishTimeDescription})).filter(x=>x.text);
const s=$('gsum');if(s&&d.rating){s.innerHTML='تقييم Google: <b>'+d.rating.toFixed(1)+'</b> <span class="stars">★</span> من '+(d.userRatingCount||0)+' تقييم · <a href="https://search.google.com/local/reviews?placeid='+encodeURIComponent(c.placeId)+'" target="_blank" rel="noopener">شوف كل التقييمات على Google</a>';s.hidden=false}
draw()}catch(e){}})();
})();
