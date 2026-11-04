/* Quantity stepper (kg) + option pills */
(function(){
var MIN=.5,MAX=50,STEP=.5;
var AR='٠١٢٣٤٥٦٧٨٩';
function fix(v){
  v=String(v).replace(/[٠-٩]/g,function(d){return AR.indexOf(d)}).replace(/[٫،,]/g,'.').replace(/[^\d.]/g,'');
  var p=v.split('.');if(p.length>2)v=p[0]+'.'+p.slice(1).join('');
  v=parseFloat(v);if(!isFinite(v))v=MIN;if(v<MIN)v=MIN;if(v>MAX)v=MAX;
  return Math.round(v*100)/100;
}
function fmt(v){return v===.5?'نص كيلو':(v+' كيلو')}
window.SYqty={fix:fix,fmt:fmt,val:function(i){return fmt(fix(i.value))}};
function fire(i){['input','change'].forEach(function(t){i.dispatchEvent(new Event(t,{bubbles:true}))})}
document.addEventListener('click',function(e){
  var b=e.target.closest&&e.target.closest('.qb');if(!b)return;
  var q=b.closest('.qty'),i=q&&q.querySelector('.qi');if(!i)return;
  i.value=fix(fix(i.value)+(+b.dataset.d)*STEP);fire(i);
});
document.addEventListener('focusout',function(e){
  var i=e.target.closest&&e.target.closest('.qi');if(!i)return;
  var v=fix(i.value);if(String(v)!==i.value){i.value=v;fire(i)}
});
document.addEventListener('keydown',function(e){
  var i=e.target.closest&&e.target.closest('.qi');if(!i)return;
  if(e.key==='Enter'){e.preventDefault();i.blur()}
});
/* option pills: group .opts, buttons .op; sets data-v on group and mirrors into #ck-hidden if present */
document.addEventListener('click',function(e){
  var b=e.target.closest&&e.target.closest('.op');if(!b)return;
  var g=b.closest('.opts');if(!g)return;
  g.querySelectorAll('.op').forEach(function(x){var on=x===b;x.classList.toggle('on',on);x.setAttribute('aria-checked',on?'true':'false')});
  g.dataset.v=b.dataset.v;
  var h=g.nextElementSibling;
  if(h&&h.tagName==='INPUT'&&h.type==='hidden'){h.value=b.dataset.v;fire(h)}
  g.dispatchEvent(new CustomEvent('opchange',{bubbles:true,detail:b.dataset.v}));
});
})();
