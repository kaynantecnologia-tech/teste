/* Vibe a sós — liga a animação da assinatura e a insígnia flutuante. Sem bibliotecas externas. */
(function(){
  function init(){
    var reduz=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var logos=document.querySelectorAll('[data-vibe-logo]');
    function tocar(el){el.classList.remove('vs-play');void el.offsetWidth;el.classList.add('vs-play')}
    if(!reduz){
      logos.forEach(function(el){
        tocar(el);
        el.addEventListener('mouseenter',function(){tocar(el)});
      });
    }
    var ins=document.querySelector('[data-vibe-insignia]');
    if(ins){
      ins.style.opacity='0';ins.style.pointerEvents='none';
      var mostrar=function(){var on=window.scrollY>300;ins.style.opacity=on?'1':'0';ins.style.pointerEvents=on?'auto':'none'};
      window.addEventListener('scroll',mostrar,{passive:true});mostrar();
      var zap=ins.getAttribute('data-whatsapp');
      var menu=document.createElement('div');menu.className='vs-insignia-menu';
      menu.innerHTML='<button type="button" data-a="topo">\u2302 In\u00edcio</button>'+(zap?'<button type="button" data-a="zap">\ud83d\udcac D\u00favidas</button>':'');
      document.body.appendChild(menu);
      ins.addEventListener('click',function(){
        if(!zap){window.scrollTo({top:0,behavior:reduz?'auto':'smooth'});return}
        menu.classList.toggle('vs-aberto');
      });
      menu.addEventListener('click',function(e){
        var a=e.target.getAttribute('data-a');menu.classList.remove('vs-aberto');
        if(a==='topo')window.scrollTo({top:0,behavior:reduz?'auto':'smooth'});
        if(a==='zap')window.open('https://wa.me/'+zap,'_blank','noopener');
      });
    }
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
