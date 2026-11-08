/* Halaman daftar: tampilkan/sembunyikan password & cek kecocokan */
(function () {
  function bindToggle(btnId, inputId) {
    var btn = document.getElementById(btnId);
    var input = document.getElementById(inputId);
    if (!btn || !input) return;
    btn.addEventListener('click', function () {
      input.type = input.type === 'password' ? 'text' : 'password';
    });
  }
  bindToggle('togglePassword', 'password');
  bindToggle('toggleConfirmPassword', 'password_confirm');

  var form = document.getElementById('registerForm');
  var pass = document.getElementById('password');
  var conf = document.getElementById('password_confirm');
  var nik = document.getElementById('nik');

  if (nik) {
    nik.setAttribute('inputmode', 'numeric');
    nik.addEventListener('input', function () {
      nik.value = nik.value.replace(/\D/g, '');
    });
  }
  function check() {
    if (!pass || !conf) return;
    conf.setCustomValidity(conf.value && pass.value !== conf.value ? 'Konfirmasi password tidak sama' : '');
  }
  if (pass && conf) {
    pass.addEventListener('input', check);
    conf.addEventListener('input', check);
  }
  if (form) form.addEventListener('submit', check);
})();
