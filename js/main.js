/* ===========================================================
   Проект «Невидимые опоры» — логика страницы
   =========================================================== */
(function () {
  'use strict';

  /* ---------- Год в футере ---------- */
  var yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Появление блоков при прокрутке ---------- */
  var revealEls = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ---------- Выбор тарифа из карточки ---------- */
  var tariffSelect = document.getElementById('field-tariff');
  document.querySelectorAll('.tariff-cta').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var value = btn.getAttribute('data-tariff');
      if (tariffSelect && value) {
        var found = Array.prototype.some.call(tariffSelect.options, function (opt) {
          if (opt.value === value) { tariffSelect.value = value; return true; }
          return false;
        });
        if (!found) {
          var opt = document.createElement('option');
          opt.value = value;
          opt.textContent = value;
          tariffSelect.appendChild(opt);
          tariffSelect.value = value;
        }
      }
      var order = document.getElementById('order');
      if (order) order.scrollIntoView({ behavior: 'smooth', block: 'start' });
      var nameField = document.getElementById('field-name');
      if (nameField) setTimeout(function () { nameField.focus({ preventScroll: true }); }, 600);
    });
  });

  /* ---------- Валидация и отправка формы ---------- */
  var form = document.getElementById('order-form');
  if (!form) return;
  var statusEl = document.getElementById('form-status');

  var FIELDS = ['field-name', 'field-birth', 'field-phone', 'field-email'];

  function setError(id, message) {
    var input = document.getElementById(id);
    var holder = form.querySelector('[data-error-for="' + id + '"]');
    var wrap = input ? input.closest('.field') : null;
    if (holder) holder.textContent = message || '';
    if (wrap) wrap.classList.toggle('invalid', Boolean(message));
    return !message;
  }

  function validate() {
    var ok = true;
    var name = document.getElementById('field-name').value.trim();
    var birth = document.getElementById('field-birth').value.trim();
    var phone = document.getElementById('field-phone').value.trim();
    var email = document.getElementById('field-email').value.trim();

    ok = setError('field-name', name.length >= 2 ? '' : 'Пожалуйста, укажите имя') && ok;
    ok = setError('field-birth', birth ? '' : 'Пожалуйста, укажите дату рождения') && ok;

    var digits = phone.replace(/\D/g, '');
    ok = setError('field-phone', digits.length >= 7 ? '' : 'Пожалуйста, укажите телефон') && ok;
    ok = setError('field-email',
      /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) ? '' : 'Пожалуйста, укажите корректную почту') && ok;

    return ok;
  }

  FIELDS.forEach(function (id) {
    var el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('input', function () {
      var holder = form.querySelector('[data-error-for="' + id + '"]');
      if (holder && holder.textContent) setError(id, '');
    });
  });

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (!validate()) {
      if (statusEl) {
        statusEl.textContent = 'Пожалуйста, заполните отмеченные поля.';
        statusEl.classList.add('error');
      }
      return;
    }

    var submitBtn = form.querySelector('.form-submit');
    var payload = {
      id: 'ord_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
      name: document.getElementById('field-name').value.trim(),
      birth_date: document.getElementById('field-birth').value,
      phone: document.getElementById('field-phone').value.trim(),
      email: document.getElementById('field-email').value.trim(),
      tariff: tariffSelect ? tariffSelect.value : '',
      created_at: new Date().toISOString()
    };

    if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Отправляем…'; }
    if (statusEl) { statusEl.textContent = ''; statusEl.classList.remove('error'); }

    fetch('tables/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.json();
      })
      .then(function () {
        form.reset();
        FIELDS.forEach(function (id) { setError(id, ''); });
        if (statusEl) {
          statusEl.classList.remove('error');
          statusEl.textContent = 'Спасибо! Ваша заявка отправлена — я свяжусь с вами.';
        }
      })
      .catch(function () {
        if (statusEl) {
          statusEl.classList.add('error');
          statusEl.textContent = 'Не удалось отправить заявку. Пожалуйста, попробуйте ещё раз.';
        }
      })
      .finally(function () {
        if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Отправить заявку'; }
      });
  });
})();
