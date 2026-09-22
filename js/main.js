/* ===========================================================
   Проект «Невидимые опоры» — логика страницы
   =========================================================== */
(function () {
  'use strict';

  /* ---------- Год в футере ---------- */
  var yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Год публикации политики ---------- */
  var legalDateEl = document.getElementById('legal-date');
  if (legalDateEl) {
    legalDateEl.textContent = '01.01.' + new Date().getFullYear();
  }

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

  /* ===========================================================
     МАСКА ТЕЛЕФОНА (библиотека imask)
     =========================================================== */
  var phoneInput = document.getElementById('field-phone');
  var phoneMask = null;
  if (phoneInput && typeof window.IMask !== 'undefined') {
    try {
      phoneMask = window.IMask(phoneInput, {
        mask: '+{7} (000) 000-00-00',
        lazy: false,
        placeholderChar: '_'
      });
    } catch (e) { phoneMask = null; }
  }

  /* ===========================================================
     ЗАЯВКА
     =========================================================== */
  var form = document.getElementById('order-form');
  if (!form) return;
  var statusEl = document.getElementById('form-status');

  var FIELDS = ['field-name', 'field-birth', 'field-phone', 'field-email', 'field-consent'];
  var consentField = document.getElementById('field-consent');
  var honeypot = document.getElementById('field-website');

  function setError(id, message) {
    var input = document.getElementById(id);
    var holder = form.querySelector('[data-error-for="' + id + '"]');
    var wrap = input ? input.closest('.field') : null;
    if (holder) holder.textContent = message || '';
    if (wrap) wrap.classList.toggle('invalid', Boolean(message));
    return !message;
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

  /* ---------- Валидация ---------- */
  function validate() {
    var ok = true;
    var name = document.getElementById('field-name').value.trim();
    var birth = document.getElementById('field-birth').value.trim();
    var phone = document.getElementById('field-phone').value.trim();
    var email = document.getElementById('field-email').value.trim();

    ok = setError('field-name', name.length >= 2 ? '' : 'Пожалуйста, укажите имя') && ok;
    ok = setError('field-birth', birth ? '' : 'Пожалуйста, укажите дату рождения') && ok;

    var digits = phone.replace(/\D/g, '');
    ok = setError('field-phone', digits.length >= 11 ? '' : 'Пожалуйста, укажите телефон полностью') && ok;
    ok = setError('field-email',
      /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) ? '' : 'Пожалуйста, укажите корректную почту') && ok;

    var consentHolder = form.querySelector('[data-error-for="field-consent"]');
    if (consentHolder) {
      if (consentField && !consentField.checked) {
        consentHolder.textContent = 'Необходимо согласие на обработку персональных данных';
        ok = false;
      } else {
        consentHolder.textContent = '';
      }
    }

    return ok;
  }

  FIELDS.forEach(function (id) {
    var el = document.getElementById(id);
    if (!el) return;
    var evt = el.type === 'checkbox' ? 'change' : 'input';
    el.addEventListener(evt, function () {
      var holder = form.querySelector('[data-error-for="' + id + '"]');
      if (holder && holder.textContent) setError(id, '');
    });
  });

  /* ---------- Отправка уведомления в Telegram ---------- */
  function sendToTelegram(payload) {
    var cfg = (window.SITE_CONFIG && window.SITE_CONFIG.telegram) || {};
    if (!cfg.enabled) return Promise.resolve({ skipped: true });

    var text =
      'Новая заявка — Невидимые опоры\n' +
      'Имя: ' + payload.name + '\n' +
      'Дата рождения: ' + payload.birth_date + '\n' +
      'Телефон: ' + payload.phone + '\n' +
      'Почта: ' + payload.email + '\n' +
      'Тариф: ' + payload.tariff + '\n' +
      'Дата заявки: ' + payload.created_at;

    // Вариант 1 (рекомендуется): вебхук / сервис-посредник
    if (cfg.webhookUrl) {
      return fetch(cfg.webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: text, chat_id: cfg.chatId || '', data: payload })
      });
    }

    // Вариант 2: напрямую через Bot API (токен виден в исходном коде)
    if (cfg.botToken && cfg.chatId) {
      var url = 'https://api.telegram.org/bot' + cfg.botToken + '/sendMessage';
      return fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: cfg.chatId, text: text, disable_web_page_preview: true })
      });
    }

    return Promise.resolve({ misconfigured: true });
  }

  /* ---------- Отправка формы ---------- */
  form.addEventListener('submit', function (event) {
    event.preventDefault();

    // Honeypot: скрытое поле заполнено — это бот. Тихо «принимаем» заявку.
    if (honeypot && honeypot.value.trim() !== '') {
      form.reset();
      if (phoneMask) phoneMask.value = '';
      if (statusEl) {
        statusEl.classList.remove('error');
        statusEl.textContent = 'Спасибо! Ваша заявка отправлена — я свяжусь с вами.';
      }
      return;
    }

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

    var saveToTable = fetch('tables/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).then(function (res) {
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return res.json();
    });

    // Заявка сохраняется в таблицу; параллельно уходит уведомление в Telegram
    Promise.all([
      saveToTable,
      sendToTelegram(payload).catch(function () { return { telegramError: true }; })
    ])
      .then(function () {
        form.reset();
        if (phoneMask) phoneMask.value = '';
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
