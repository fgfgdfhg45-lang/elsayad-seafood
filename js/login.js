let mode='login';
const ERR={'auth/invalid-credential':'الإيميل أو كلمة المرور غلط.','auth/wrong-password':'الإيميل أو كلمة المرور غلط.','auth/user-not-found':'الإيميل أو كلمة المرور غلط.','auth/email-already-in-use':'الإيميل ده مسجل قبل كده. سجّل دخول.','auth/weak-password':'كلمة المرور ضعيفة.','auth/invalid-email':'اكتب بريد إلكتروني صحيح.','auth/too-many-requests':'محاولات كتير، حاول بعد شوية.'};
function setMode(m){mode=m;const r=m==='reg';$('nm').hidden=!r;$('mt').textContent=r?'إنشاء حساب':'تسجيل الدخول';$('go').textContent=r?'إنشاء الحساب':'دخول';$('q').textContent=r?'عندك حساب؟':'معندكش حساب؟';$('sw').textContent=r?'سجّل دخول':'أنشئ حساب';$('msg').textContent=''}
$('sw').onclick=()=>setMode(mode==='login'?'reg':'login');
const enc=p=>btoa(unescape(encodeURIComponent(p)));
$('go').onclick=async()=>{const em=$('em').value.trim().toLowerCase(),pw=$('pw').value,nm=$('nm').value.trim(),m=$('msg');m.className='msg';
if(!/^\S+@\S+\.\S+$/.test(em)){m.textContent='اكتب بريد إلكتروني صحيح.';return}
if(pw.length<6){m.textContent='كلمة المرور لازم تكون 6 أحرف على الأقل.';return}
if(mode==='reg'&&!nm){m.textContent='اكتب اسمك.';return}
if(window.SY&&SY.enabled){try{mode==='reg'?await SY.signup(em,pw,nm):await SY.login(em,pw)}catch(x){m.textContent=ERR[x.code]||'حصل خطأ، حاول تاني.';return}}
else{const us=get('sy_users')||{};
 if(mode==='reg'){if(us[em]){m.textContent='الإيميل ده مسجل قبل كده. سجّل دخول.';return}us[em]={name:nm,p:enc(pw)};set('sy_users',us);set('sy_cur',{name:nm,email:em})}
 else{const u=us[em];if(!u||u.p!==enc(pw)){m.textContent='الإيميل أو كلمة المرور غلط.';return}set('sy_cur',{name:u.name,email:em})}}
m.className='msg ok';m.textContent='تم بنجاح ✓';setTimeout(()=>location.href='index.html',600)};
