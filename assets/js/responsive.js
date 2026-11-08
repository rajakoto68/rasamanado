/* Menu hamburger untuk navbar di HP */
(function () {
  var navbar = document.getElementById('navbar');
  if (!navbar) return;
  var btn = navbar.querySelector('.nav-toggle');
  if (!btn) return;

  function setOpen(open) {
    navbar.classList.toggle('nav-open', open);
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    btn.setAttribute('aria-label', open ? 'Tutup menu' : 'Buka menu');
  }
  btn.addEventListener('click', function () {
    setOpen(!navbar.classList.contains('nav-open'));
  });
  navbar.querySelectorAll('.nav-menu a').forEach(function (a) {
    a.addEventListener('click', function () { setOpen(false); });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setOpen(false);
  });
  window.addEventListener('resize', function () {
    if (window.innerWidth > 900) setOpen(false);
  });
})();
