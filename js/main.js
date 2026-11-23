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

  /* ---------- МАСКА ДАТЫ РОЖДЕНИЯ (дд/мм/гггг) ----------
     Год ограничен 4 цифрами маской; поле необязательное. */
  var birthInput = document.getElementById('field-birth');
  var birthMask = null;
  if (birthInput && typeof window.IMask !== 'undefined') {
    try {
      birthMask = window.IMask(birthInput, {
        mask: '00/00/0000',
        lazy: false,
        placeholderChar: '_'
      });
    } catch (e) { birthMask = null; }
  }

  /* ===========================================================
     ЗАЯВКА
     =========================================================== */
  var form = document.getElementById('order-form');
  if (!form) return;
  var statusEl = document.getElementById('form-status');

  var FIELDS = ['field-name', 'field-birth', 'field-phone', 'field-telegram', 'field-consent'];
  var consentField = document.getElementById('field-consent');
  var honeypot = document.getElementById('field-website');
  var submitting = false;
  var accepted = false;
  var lastAttempt = null;

  window.addEventListener('pageshow', function (event) {
    if (!event.persisted || !accepted) return;
    accepted = false;
    submitting = false;
    var button = form.querySelector('.form-submit');
    if (button) { button.disabled = false; button.textContent = 'Перейти к оплате'; }
    if (statusEl) statusEl.textContent = 'Заявка уже принята. Можно вернуться к оплате.';
  });

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
  /* Дата дд/мм/гггг → проверка реальности даты (поле необязательное) */
  function checkBirth(value) {
    if (!value) return true;
    var m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(value);
    if (!m) return false;
    var d = parseInt(m[1], 10), mo = parseInt(m[2], 10), y = parseInt(m[3], 10);
    if (mo < 1 || mo > 12) return false;
    if (d < 1 || d > 31) return false;
    if (y < 1900 || y > 2100) return false;
    var daysInMonth = new Date(y, mo, 0).getDate();
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    return d <= daysInMonth && new Date(y, mo - 1, d) <= today;
  }

  function validate() {
    var ok = true;
    var name = document.getElementById('field-name').value.trim();
    var birthRaw = document.getElementById('field-birth').value.trim();
    var phone = document.getElementById('field-phone').value.trim();
    var telegram = document.getElementById('field-telegram').value.trim();

    var nameValid = name.length >= 2 && name.length <= 100 && /\p{L}/u.test(name) &&
      /^[\p{L}\p{M}][\p{L}\p{M} .'’\-]*$/u.test(name);
    ok = setError('field-name', nameValid ? '' : 'Укажите имя буквами, от 2 до 100 символов') && ok;

    // Дата рождения — необязательно. При маске пустое поле содержит
    // подсказку «__/__/____», поэтому ориентируемся на наличие цифр.
    var birthFilled = birthRaw.replace(/\D/g, '') !== '';
    ok = setError('field-birth',
      checkBirth(birthFilled ? birthRaw : '') ? '' : 'Укажите дату в формате дд/мм/гггг') && ok;

    // Telegram — необязательно; если заполнен, проверяем имя пользователя
    ok = setError('field-telegram',
      (!telegram || /^@?[A-Za-z0-9_]{4,32}$/.test(telegram)) ? '' : 'Укажите имя пользователя Telegram, например @username') && ok;

    var digits = phone.replace(/\D/g, '');
    var phoneValid = phone.length <= 25 && /^[+\d ()\-]+$/.test(phone) &&
      /^[78]\d{10}$/.test(digits) && !/^(\d)\1{9}$/.test(digits.slice(1));
    ok = setError('field-phone', phoneValid ? '' : 'Укажите корректный телефон полностью') && ok;

    var consentHolder = form.querySelector('[data-error-for="field-consent"]');
    var hasConsent = Boolean(consentField && consentField.checked);
    if (consentHolder) consentHolder.textContent = hasConsent ? '' : 'Необходимо согласие на обработку персональных данных';
    ok = hasConsent && ok;

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

  /* ---------- Передача заявки в Make (не подтверждение оплаты) ---------- */
  function sendApplication(payload) {
    var cfg = (window.SITE_CONFIG && window.SITE_CONFIG.telegram) || {};
    var url;
    try {
      url = new URL(cfg.webhookUrl);
      if (!cfg.enabled || url.protocol !== 'https:' || url.hostname !== 'hook.eu2.make.com' ||
          url.port || url.username || url.password || url.pathname === '/') {
        throw new Error('Invalid application endpoint');
      }
    } catch (err) {
      return Promise.reject(new Error('Application endpoint is not configured'));
    }
    if (typeof AbortController === 'undefined') {
      return Promise.reject(new Error('Browser does not support request timeout'));
    }

    var text =
      'Новая заявка — Невидимые опоры\n' +
      'Имя: ' + payload.name + '\n' +
      'Дата рождения: ' + (payload.birth_date || '— не указана') + '\n' +
      'Телефон: ' + payload.phone + '\n' +
      'Telegram: ' + (payload.telegram || '— не указан') + '\n' +
      'Тариф: ' + payload.tariff + '\n' +
      'Дата заявки: ' + payload.created_at;

    var controller = new AbortController();
    var timeout = setTimeout(function () { controller.abort(); }, 15000);
    // Keep text + data compatible with the existing Make mapping.
    // The receiver must validate data and use a fixed Telegram recipient.
    var request;
    try {
      request = fetch(url.href, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        credentials: 'omit',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({
          text: text,
          disable_web_page_preview: true,
          data: payload
        })
      });
    } catch (err) {
      clearTimeout(timeout);
      return Promise.reject(err);
    }
    return request.then(function (res) {
      if (!res.ok) throw new Error('Application endpoint rejected request');
      // A 2xx from Make acknowledges acceptance, not Telegram delivery.
      return { accepted: true };
    }).finally(function () {
      clearTimeout(timeout);
    });
  }

  var paymentLinks = {
    'Silver — 3 500 р': 'https://link.payform.ru/?paymentLinkId=ab5074df-54cc-4417-8ee7-40da778a4eec',
    'Gold — 15 000 р': 'https://link.payform.ru/?paymentLinkId=47766fb9-0e86-4da1-85f3-718eb51d43fa',
    '12 сфер жизни — 7500 руб': 'https://link.payform.ru/?paymentLinkId=78c28127-ff1a-45f4-a2a9-d4038a21f13b',
    '12 карт 12 месяцев — 7500 руб': 'https://link.payform.ru/?paymentLinkId=c49b52d2-ccf9-4541-8b0d-8f349b308fa3'
  };

  /* ---------- Отправка формы ---------- */
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (submitting || accepted) return;

    // Autofill can fill the trap too: do not claim success or discard data.
    if (honeypot && honeypot.value.trim() !== '') {
      if (statusEl) {
        statusEl.classList.add('error');
        statusEl.textContent = 'Заявка не отправлена. Отключите автозаполнение и обновите страницу.';
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
      birth_date: (function () {
        var v = document.getElementById('field-birth').value.trim();
        return v.replace(/\D/g, '') !== '' ? v : '';
      })(),
      phone: document.getElementById('field-phone').value.trim(),
      telegram: document.getElementById('field-telegram').value.trim(),
      tariff: tariffSelect ? tariffSelect.value : '',
      created_at: new Date().toISOString(),
      consent: true,
      website: '',
      schema_version: 1
    };

    var paymentUrl = Object.prototype.hasOwnProperty.call(paymentLinks, payload.tariff)
      ? paymentLinks[payload.tariff] : null;
    if (!paymentUrl) {
      if (statusEl) {
        statusEl.classList.add('error');
        statusEl.textContent = 'Пожалуйста, выберите тариф из списка.';
      }
      return;
    }

    // Preserve the id for a retry of unchanged data. Server-side deduplication
    // is still required: a network error does not prove non-delivery.
    var signature = JSON.stringify([payload.name, payload.birth_date, payload.phone, payload.telegram, payload.tariff]);
    if (lastAttempt && lastAttempt.signature === signature) {
      payload.id = lastAttempt.id;
      payload.created_at = lastAttempt.created_at;
      if (lastAttempt.accepted) {
        accepted = true;
        window.location.assign(paymentUrl);
        return;
      }
    } else {
      lastAttempt = { signature: signature, id: payload.id, created_at: payload.created_at };
    }

    submitting = true;
    if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Отправляем…'; }
    if (statusEl) { statusEl.textContent = ''; statusEl.classList.remove('error'); }

    sendApplication(payload)
      .then(function () {
        accepted = true;
        lastAttempt.accepted = true;
        if (statusEl) {
          statusEl.classList.remove('error');
          statusEl.textContent = 'Заявка принята сервисом. Переходим к оплате…';
        }
        window.location.assign(paymentUrl);
      })
      .catch(function () {
        if (statusEl) {
          statusEl.classList.add('error');
          statusEl.textContent = 'Не удалось подтвердить приём заявки. Данные сохранены в форме. Проверьте соединение и повторите попытку.';
        }
      })
      .finally(function () {
        submitting = false;
        if (submitBtn && !accepted) { submitBtn.disabled = false; submitBtn.textContent = 'Перейти к оплате'; }
      });
  });
})();
