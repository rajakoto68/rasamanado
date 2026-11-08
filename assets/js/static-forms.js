/* Versi HTML statis: form login & daftar belum terhubung ke server.
   Hapus file ini dan arahkan form ke backend (auth/proses_*.php) jika sudah ada server PHP. */
(function () {
  ['loginForm', 'registerForm'].forEach(function (id) {
    var form = document.getElementById(id);
    if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      var box = document.querySelector('.alert-error');
      if (!box) {
        box = document.createElement('div');
        box.className = 'alert-error';
        form.parentNode.insertBefore(box, form);
      }
      box.style.display = '';
      box.style.opacity = '1';
      box.style.transform = 'none';
      box.textContent = 'Ini versi tampilan (HTML statis). Proses ' +
        (id === 'loginForm' ? 'login' : 'pendaftaran') +
        ' butuh server PHP dan database.';
      var btn = form.querySelector('button[type="submit"]');
      if (btn) { btn.disabled = false; btn.style.cursor = ''; }
    }, true);
  });
})();
