(function () {
  const body = document.body;
  // Force dark mode and hide toggle if present
  body.removeAttribute('data-theme');
  const toggle = document.getElementById('theme-toggle');
  if (toggle) {
    toggle.classList.add('hidden');
  }
})();
