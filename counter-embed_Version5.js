(function() {
  // ---- CONFIG ----
  var stats = [
    { value: 3000, suffix: '+', label: 'donors to the NMH Fund last year', format: 'number' },
    { value: 5.4, suffix: ' million', label: 'amount raised to support students and faculty', format: 'currency' },
    { value: 18, suffix: '%', label: 'percentage of dollars from gifts by current parents', format: 'percent' },
    { value: 1279, suffix: '', label: 'donors who increased their gifts last year', format: 'number' },
    { value: 1646, suffix: '', label: 'donors who made gifts of $100 or less', format: 'number' }
  ];

  // ---- STYLES ----
  var style = document.createElement('style');
  style.innerHTML =
    "@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');" +
    ".nmh-counter-grid { " +
      "font-family: 'Roboto', Arial, sans-serif;" +
      "display: grid;" +
      "grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));" +
      "gap: 1.2rem;" +
      "width: 100%;" +
      " }" +
    ".nmh-counter-item { text-align: center; padding calc(1rem + 20px); background: #7E2D40; border-radius: 10px; box-shadow: 0 1px 8px rgba(126,45,64,0.07);" +
      "display: flex; flex-direction: column; align-items: center; justify-content: center;" +
      " }" +
    ".nmh-counter-number { font-size: 2em; font-weight: 700; color: #fff; margin-bottom: 0.45em; letter-spacing: 0.02em; line-height: 1.1; }" +
    ".nmh-counter-label { font-size: 1em; color: #fff; font-weight: 400; letter-spacing: 0.01em; }" +
    "@media (max-width: 600px) {" +
      ".nmh-counter-grid { grid-template-columns: 1fr; gap:1rem;} " +
      ".nmh-counter-item { width: 90%; }" +
    "}";
  document.head.appendChild(style);

  // ---- CREATES WIDGET ----
  function renderWidget() {
    var widget = document.getElementById('nmh-counter-widget');
    if (!widget) return;

    // Clear any previous content
    widget.innerHTML = '';

    // Create grid wrapper
    var grid = document.createElement('div');
    grid.className = 'nmh-counter-grid';

    stats.forEach(function(stat) {
      var item = document.createElement('div');
      item.className = 'nmh-counter-item';

      var num = document.createElement('div');
      num.className = 'nmh-counter-number';
      num.setAttribute('data-target', stat.value);
      num.setAttribute('data-format', stat.format);
      num.setAttribute('data-suffix', stat.suffix || '');

      num.textContent = (stat.format === 'currency') ? '$0' : '0';

      var label = document.createElement('div');
      label.className = 'nmh-counter-label';
      label.textContent = stat.label;

      item.appendChild(num);
      item.appendChild(label);
      grid.appendChild(item);
    });

    widget.appendChild(grid);
  }

  // ---- ANIMATE COUNTER ----
  function animateCounter(el, target, suffix, format, duration) {
    var start = 0, startTs = null, decimals = 0;
    if (format === 'currency') decimals = 1;
    if (format === 'percent') decimals = 0;

    function formatValue(val) {
      if (format === 'currency') return '$' + val.toFixed(decimals);
      if (format === 'percent') return val.toFixed(decimals);
      return val.toLocaleString();
    }

    function step(ts) {
      if (!startTs) startTs = ts;
      var elapsed = ts - startTs;
      var progress = Math.min(elapsed / duration, 1);
      var val = start + (target - start) * progress;
      if (progress < 1) {
        el.textContent = (format === 'currency' || format === 'percent')
          ? formatValue(val) + suffix
          : formatValue(Math.floor(val)) + suffix;
        requestAnimationFrame(step);
      } else {
        el.textContent = formatValue(target) + suffix;
      }
    }
    requestAnimationFrame(step);
  }

  function startAnimations() {
    document.querySelectorAll('.nmh-counter-number').forEach(function(el) {
      var target = parseFloat(el.getAttribute('data-target'));
      var format = el.getAttribute('data-format');
      var suffix = el.getAttribute('data-suffix') || '';
      animateCounter(el, target, suffix, format, 5000);
    });
  }

  // ---- INIT WHEN DOM READY ----
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(function() {
      renderWidget();
      startAnimations();
    }, 1);
  } else {
    window.addEventListener('DOMContentLoaded', function() {
      renderWidget();
      startAnimations();
    });
  }
})();
