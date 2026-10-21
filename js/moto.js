/* موتسكل دليفري بالبكسل بيعدّي في الشاشة */
(function(){
if(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches)return;
var rows=["..............HHHH........",".............HHHHHH.......",".OOOOOOOOO...HHHHWWW......",".OOOOOOOOO...HHHHWWW......",".OWWWWWWWO.BBBBB.....K....",".OOOOOOOOO.BBBBBBBBSSK....",".OOOOOOOOO.BBBBB.....K.YY.",".KKKKKKKKKKKKKNNNN...K.YY.","........RRRRRRRRRNNR.K....",".....KKK..RRRRRRRNNR.KKK..","....K...K.DDDDDDDNNDK.K.K.","...K.....K.GGGGGGKKK..K..K","...K..G..K..KKKKK..K..G..K","...K.....K.........K.....K","....K...K...........K...K.",".....KKK.............KKK.."],pal={K:'#1b1b1b',G:'#8a94a6',R:'#e8603c',D:'#963220',H:'#12285a',S:'#f2c29b',B:'#1f5fbf',N:'#243759',Y:'#ffe066',W:'#fff',O:'#e8603c'};
var W=rows[0].length,H=rows.length,s='<svg viewBox="0 0 '+W+' '+H+'" shape-rendering="crispEdges" xmlns="http://www.w3.org/2000/svg">';
rows.forEach(function(r,y){var x=0;while(x<r.length){var c=r[x];if(c==='.'){x++;continue}var e=x;while(e<r.length&&r[e]===c)e++;s+='<rect x="'+x+'" y="'+y+'" width="'+(e-x)+'" height="1" fill="'+pal[c]+'"/>';x=e}});
[3,19].forEach(function(ox){var cx=ox+3,cy=12;
s+='<g class="mt-a" fill="#8a94a6"><rect x="'+cx+'" y="'+(cy-2)+'" width="1" height="5"/><rect x="'+(cx-2)+'" y="'+cy+'" width="5" height="1"/></g>';
s+='<g class="mt-b" fill="#8a94a6"><rect x="'+(cx-1)+'" y="'+(cy-1)+'" width="1" height="1"/><rect x="'+(cx+1)+'" y="'+(cy-1)+'" width="1" height="1"/><rect x="'+(cx-1)+'" y="'+(cy+1)+'" width="1" height="1"/><rect x="'+(cx+1)+'" y="'+(cy+1)+'" width="1" height="1"/></g>'});
s+='</svg>';
var d=document.createElement('div');d.className='moto';d.setAttribute('aria-hidden','true');
d.innerHTML='<div class="mt-bike">'+s+'</div><div class="mt-sign"><b>أوردر لحد مكانك 🛵</b><span>سعر الدليفري بيختلف حسب المنطقة</span></div>';
document.body.appendChild(d);
})();
