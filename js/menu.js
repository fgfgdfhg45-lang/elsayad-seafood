const CK=['مقلي','مشوي رده','مشوي سنجاري','مشوي فحم','طاجن'],S3=['صغير','وسط','كبير'],S2=['وسط','كبير'];
const none=(a,img)=>a.map(n=>[n,'',null,img]);
const C=[
{t:'الصواني',pre:'صينية ',items:[['الصياد','1 مكاريل سنجاري + 2 بوري فحم + 2 بلطي + 3 باغة + نص سبيط مقلي + نص فيليه مقلي + ربع جمبري مقلي/مشوي + ربع فيليه مشوي/شيش + 2 سي فود بالكريمة + 2 شوربة حمراء',2250,'sayad'],['المستعجل','نص سبيط مقلي + نص فيليه مشوي + نص جمبري مقلي + 2 بلطي + 2 مكرونة + 2 باغة + 2 بوري مقلي + 2 سي فود',1700,'mus'],['العتاوله','4 بوري سنجاري + نص جمبري شيش + نص جمبري مشوي اسكندراني + 2 سي فود',1600,'ata'],['المعلم','2 مكاريل سنجاري + 2 بوري سنجاري + 2 بلطي + 2 باغة + نص جمبري مقلي + 2 سي فود',1550,'moa'],['العرسان','نص فيليه مشوي + نص سبيط مقلي + نص جمبري + نص كابوريا + 2 سي فود',1150,'ars'],['العائلة','5 بلطي سنجاري + 7 عود جمبري مقلي + 7 عود جمبري مشوي + 2 سي فود',1100,'fam'],['الأهل','4 بلطي + 4 باغة + 1 مكاريل',700,'ahl'],['الصحاب','3 بوري سنجاري + 6 عود جمبري مقلي',650,'sah'],['أنا وأنت','2 بلطي سنجاري + ربع جمبري مقلي + 2 سي فود',600,'ana'],['الشقيانين','5 بلطي فحم',400,'shq']]},
{t:'الأسماك',sizes:S3,cook:1,items:[['بلطي','',[70,90,120],'shq'],['بوري','',[120,150,170],'sah'],['مكاريل','',[175,200,225],'ahl'],['باغة','',[75,90,100],'ahl'],['مكرونة','',[70,90,110],'shq'],['لوط','',[350,400,450],'ata'],['وجبة الصياد (فواكه بحر)','تتكون من فواكه البحر، ويضاف أرز وطحينة وسلطة وعيش',[250,300,350],'sea',1],['قاروص','',[250,300,350],'shq'],['دنيس','',[200,250,300],'ahl']]},
{t:'أصناف بالوزن',cook:1,note:1,items:none(['بربوني','تعابين','جندوفلي','سبيط بلدي','كاليماري مجمد','جمبري مجمد','فيليه قشر بياض','فيليه لوط','جمبري بلدي'],'sea')},
{t:'الجمبري',note:1,items:none(['جمبري مقلي','جمبري مشوي','جمبري وايت صوص','جمبري طاجن','جمبري اسكندراني','جمبري بتر فلاي'],'shrimp')},
{t:'السبيط',note:1,items:none(['سبيط مقلي','سبيط مشوي','سبيط محشي','سبيط وايت صوص','سبيط بالخلطة'],'squid')},
{t:'الكابوريا',note:1,items:none(['كابوريا بالخلطة','كابوريا مقلي','كابوريا طاجن'],'crab')},
{t:'الشوربات',sizes:S3,items:[['سي فود','',[120,150,200],'soup'],['سي فود مخلية','',[150,200,250],'soup'],['جمبري أحمر','',[100,150,200],'soup'],['ملوخية بالجمبري','',[80,120,150],'soup'],['شوربة سبيط','',[80,100,150],'soup'],['شوربة جمبري بالكريمة','',[100,150,200],'soup']]},
{t:'المكرونات',sizes:S2,items:[['طاجن مكرونة بالجمبري أحمر','',[150,200],'pasta'],['طاجن مكرونة بالجمبري أبيض','',[150,200],'pasta'],['طاجن مكرونة بالسي فود','',[250,300],'pasta'],['طاجن مكرونة بالسبيط','',[150,200],'pasta'],['طاجن سمك بالبطاطس','السعر حسب اختيار السمك',null,'pasta']]},
{t:'السندوتشات',sizes:S3,items:[['سندوتش جمبري','',[50,80,100],'sand'],['سندوتش فيليه','',[40,60,80],'sand'],['سندوتش سبيط','',[40,60,80],'sand'],['سندوتش الصياد','',[100,120,150],'sand']]},
{t:'الأرز',sizes:S2,items:[['أرز صيادية','',[30,50],'sides'],['أرز بالجمبري','',[150,200],'sides'],['أرز سي فود','',[200,250],'sides']]},
{t:'الإضافات',items:[['أرز','',30,'sides'],['سلطة','',15,'sides'],['طحينة','',10,'sides'],['عيش','',5,'sides'],['مياه معدنية','',10,'drinks'],['بيبسي','',20,'drinks']]}
];
const tb=document.getElementById('tabs'),pn=document.getElementById('panel');
function card(c,ci,ii){const it=c.items[ii],p=it[2],arr=Array.isArray(p);
return '<article class="tray it" data-i="'+ci+'|'+ii+'" data-s="0"><div class="im"><img loading="lazy" src="'+IMG[it[3]]+'" alt="'+(c.pre||'')+it[0]+'"></div><div class="b"><h3>'+(c.pre||'')+it[0]+'</h3><p>'+it[1]+'</p>'
+(arr?'<div class="szs">'+c.sizes.map((s,j)=>'<button type="button" class="sz'+(j?'':' on')+'" data-s="'+j+'">'+s+'</button>').join('')+'</div>':'')
+(c.cook&&!it[4]?'<select class="ck" aria-label="طريقة التسوية">'+CK.map(x=>'<option>'+x+'</option>').join('')+'</select>':'')
+'<div class="row"><span class="price pr">'+(p==null?'<small>السعر حسب الوزن</small>':(arr?p[0]:p)+' <small>جنيه</small>')+'</span><button type="button" class="btn sm add">أضف للطلب</button></div></div></article>'}
function render(ci){const c=C[ci];pn.innerHTML=(c.note?'<p class="sub">الأصناف دي بتتسعّر بالوزن، هنأكد السعر معاك قبل التحضير.</p>':'')+'<div class="trays">'+c.items.map((_,i)=>card(c,ci,i)).join('')+'</div>';
tb.querySelectorAll('.tab').forEach((b,i)=>b.setAttribute('aria-selected',i===ci))}
C.forEach((c,i)=>{const b=document.createElement('button');b.className='tab';b.role='tab';b.textContent=c.t;b.onclick=()=>render(i);tb.appendChild(b)});
pn.onclick=e=>{const el=e.target.closest('.it');if(!el)return;const[ci,ii]=el.dataset.i.split('|'),c=C[ci],it=c.items[ii],sz=e.target.closest('.sz');
if(sz){el.querySelectorAll('.sz').forEach(b=>b.classList.toggle('on',b===sz));el.dataset.s=sz.dataset.s;el.querySelector('.pr').innerHTML=it[2][sz.dataset.s]+' <small>جنيه</small>';return}
const a=e.target.closest('.add');if(!a)return;const s=+el.dataset.s,arr=Array.isArray(it[2]);let n=(c.pre||'')+it[0];if(arr)n+=' ('+c.sizes[s]+')';const k=el.querySelector('.ck');if(k)n+=' – '+k.value;
SYcartAdd(n,arr?it[2][s]:(it[2]||0));a.textContent='تمت الإضافة ✓';setTimeout(()=>a.textContent='أضف للطلب',1200)};
render(0);
