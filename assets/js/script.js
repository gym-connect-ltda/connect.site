(function(){
  // Nav scroll state
  var nav = document.getElementById('siteNav');
  var onScroll = function(){
    if(window.scrollY > 40){ nav.classList.add('scrolled'); } else { nav.classList.remove('scrolled'); }
  };
  document.addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  // Mobile menu
  var toggle = document.getElementById('navToggle');
  var menu = document.getElementById('mobileMenu');
  var close = document.getElementById('mobileClose');
  toggle && toggle.addEventListener('click', function(){ menu.classList.add('open'); });
  close && close.addEventListener('click', function(){ menu.classList.remove('open'); });
  menu && menu.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){ menu.classList.remove('open'); });
  });

  // Reveal on scroll
  var revealEls = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){ e.target.classList.add('in-view'); io.unobserve(e.target); }
      });
    }, {threshold:0.15});
    revealEls.forEach(function(el){ io.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add('in-view'); });
  }

  // Checkpoint rail active state
  var sections = ['hero','problem','features','access','benefits','cta-final'];
  var nodes = document.querySelectorAll('.rail-node');
  var secEls = sections.map(function(id){ return document.getElementById(id); }).filter(Boolean);
  if('IntersectionObserver' in window && nodes.length){
    var railIO = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          var id = entry.target.id;
          nodes.forEach(function(n){
            n.classList.toggle('active', n.getAttribute('data-target') === id);
          });
        }
      });
    }, {threshold:0.4, rootMargin:'-10% 0px -10% 0px'});
    secEls.forEach(function(s){ railIO.observe(s); });
  }
})();
