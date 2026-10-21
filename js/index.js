document.getElementById('gal').innerHTML=['shrimp','squid','crab','soup','sand','sea'].map((k,i)=>'<img loading="lazy" src="'+IMG[k]+'" alt="طبق مأكولات بحرية '+(i+1)+' من أسماك الصياد">').join('');
// counters
const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;io.unobserve(e.target);const n=+e.target.dataset.n;let s=null;const f=t=>{s=s||t;const p=Math.min((t-s)/1200,1);e.target.textContent=Math.round(n*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(f)};requestAnimationFrame(f)}));
document.querySelectorAll('[data-n]').forEach(e=>io.observe(e));
