/* سكوتر دليفري بيعدّي في الشاشة */
(function(){
if(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches)return;
function wheel(x){return '<g transform="translate('+x+' 62)"><g class="mt-w"><circle r="11" fill="#1b1b1b"/><circle r="5.5" fill="#8a94a6"/><path d="M0-9V9M-9 0H9" stroke="#e9eef7" stroke-width="1.6"/></g></g>'}
var bike='<svg viewBox="0 0 140 80" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">'
+'<g class="mt-sp" stroke="#ffd7a8" stroke-width="2" stroke-linecap="round"><path d="M118 30h14"/><path d="M122 38h14"/><path d="M118 46h10"/></g>'
+'<path d="M36 41l-3-17h11" fill="none" stroke="#1b1b1b" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>'
+'<path d="M30 58q0-14 9-18h12l6 12h38v6z" fill="#e8603c"/><path d="M57 52h38v4H57z" fill="#963220"/>'
+'<rect x="62" y="44" width="30" height="7" rx="3.5" fill="#243759"/>'
+'<circle cx="30" cy="37" r="3.2" fill="#ffe066"/>'
+'<rect x="88" y="21" width="28" height="25" rx="4" fill="#e8603c"/><rect x="88" y="30" width="28" height="4" fill="#fff" opacity=".92"/><rect x="88" y="21" width="28" height="4" rx="2" fill="#963220"/>'
+'<path d="M74 44l-16 8" stroke="#243759" stroke-width="6" stroke-linecap="round"/>'
+'<path d="M63 45l4-19q5-4 10 0l4 19z" fill="#1f5fbf"/>'
+'<path d="M68 31l-22-5" stroke="#1f5fbf" stroke-width="5" stroke-linecap="round"/>'
+'<circle cx="72" cy="17" r="7" fill="#f2c29b"/><path d="M64 17a8 8 0 0116 0z" fill="#12285a"/><rect x="62" y="16" width="6" height="3" rx="1.5" fill="#12285a"/>'
+wheel(24)+wheel(98)+'</svg>';
var ic='<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="18.5" cy="17.5" r="3.5"/><circle cx="5.5" cy="17.5" r="3.5"/><circle cx="15" cy="5" r="1"/><path d="M12 17.5V14l-3-3 4-3 2 3h2"/></svg>';
var d=document.createElement('div');d.className='moto';d.setAttribute('aria-hidden','true');
d.innerHTML='<div class="mt-bike">'+bike+'</div><div class="mt-sign"><i class="mt-ic">'+ic+'</i><div class="mt-tx"><b>أوردر لحد مكانك</b><span>سعر الدليفري بيختلف حسب المنطقة</span></div></div>';
document.body.appendChild(d);
})();
