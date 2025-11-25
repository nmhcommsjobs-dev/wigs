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
    "#nmh-counter-widget { font-family: 'Roboto', Arial, sans-serif; max-width: 1200px; margin: 2rem auto; display: grid;" +
    "grid-template-columns: repeat(5, 1fr); gap: 1.2rem; padding: 1.5rem;" +
    "background: #d9cfd2; border-radius: 14px; box-shadow: 0 6px 24px rgba(126,45,64,0.12); }" +
    ".nmh-counter-item { text-align: center; padding: 1rem 0.2rem; background: #f8f4f6; border-radius: 10px; box-shadow: 0 1px 8px rgba(126,45,64,0.07); width: 70%; margin: 0 auto; }" +
    ".nmh-counter-number { font-size: 2em; font-weight: 700; color: #7E2D40; margin-bottom: 0.45em; letter-spacing: 0.02em; line-height: 1.1; }" +
    ".nmh-counter-label { font-size: 1em; color: #444; font-weight: 400; letter-spacing: 0.01em; }" +
    "@media (max-width: 1280px) { #nmh-counter-widget { max-width: 98vw; } }" +
    "@media (max-width: 900px) { #nmh-counter-widget { grid-template-columns: repeat(2, 1fr); } }" + // 2 per row on tablet
    "@media (max-width: 600px) { #nmh-counter-widget { grid-template-columns: 1fr; padding: 1rem; } .nmh-counter-item{width:95%;}}";
  document.head.appendChild(style);

  // ---- CREATES WIDGET ----
  function renderWidget() {
    var widget = document.getElementById('nmh-counter-widget');
    if (!widget) return;
    widget.innerHTML = '';
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
      widget.appendChild(item);
    });
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
      animateCounter(el, target, suffix, format, 1200);
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