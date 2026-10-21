const PG=['m10','m3','m2','m4','m9','m8','m5','m6','m7','m1'];
$('frame').innerHTML=PG.map((k,i)=>'<figure class="pg"><img loading="lazy" src="'+IMG[k]+'" alt="منيو أسماك الصياد صفحة '+(i+1)+'"><span>'+(i+1)+' / '+PG.length+'</span></figure>').join('');
const pio=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');pio.unobserve(e.target)}}),{threshold:.08});
document.querySelectorAll('.pg').forEach(p=>{pio.observe(p);p.onclick=()=>{$('lbi').src=p.querySelector('img').src;$('lb').classList.add('on')}});
$('lb').onclick=()=>$('lb').classList.remove('on');
