const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const source = fs.readFileSync(path.join(__dirname, '../js/main.js'), 'utf8');
const products = {
  'Silver — 3 500 р': 'ab5074df-54cc-4417-8ee7-40da778a4eec',
  'Gold — 15 000 р': '47766fb9-0e86-4da1-85f3-718eb51d43fa',
  '12 сфер жизни — 7500 руб': '78c28127-ff1a-45f4-a2a9-d4038a21f13b',
  '12 карт 12 месяцев — 7500 руб': 'c49b52d2-ccf9-4541-8b0d-8f349b308fa3'
};
const tick = () => new Promise(resolve => setImmediate(resolve));
function setup(options = {}) {
  const noop = () => {};
  const fields = {}, errors = {}, requests = [], redirects = [], timers = new Map(), events = {};
  let handler, timerId = 0;
  const ids = ['name', 'birth', 'phone', 'telegram', 'consent', 'website', 'tariff'];
  for (const id of ids) {
    fields['field-' + id] = {value: '', checked: true, addEventListener: noop, closest: () => null};
    errors['field-' + id] = {textContent: ''};
  }
  fields['field-name'].value = 'Тестовое Имя';
  fields['field-phone'].value = '+7 (900) 123-45-67';
  fields['field-tariff'].value = options.tariff || Object.keys(products)[0];
  for (const [key, value] of Object.entries(options.values || {})) fields['field-' + key].value = value;
  fields['field-consent'].checked = options.consent !== false;
  const status = {textContent: '', classList: {add: noop, remove: noop}};
  const button = {disabled: false, textContent: 'Перейти к оплате'};
  const form = {
    querySelector(selector) {
      if (selector === '.form-submit') return button;
      if (options.noErrorHolder) return null;
      return errors[(selector.match(/data-error-for="([^"]+)"/) || [])[1]] || null;
    },
    reset() { fields['field-tariff'].value = Object.keys(products)[0]; },
    addEventListener(event, callback) { handler = callback; }
  };
  const config = options.config || {enabled: true, webhookUrl: 'https://hook.eu2.make.com/offline-test-only'};
  const context = {
    document: {getElementById: id => id === 'order-form' ? form : id === 'form-status' ? status : fields[id], querySelectorAll: () => []},
    window: {SITE_CONFIG: {telegram: config}, location: {assign: url => redirects.push(url)}, console: {warn: noop}, addEventListener: (event, fn) => { events[event] = fn; }},
    console: {warn: noop}, URL, AbortController,
    setTimeout(callback) { const id = ++timerId; timers.set(id, callback); return id; },
    clearTimeout(id) { timers.delete(id); },
    fetch(url, init) {
      const request = {url, init, body: JSON.parse(init.body)};
      requests.push(request);
      // There are NO network calls in this suite.
      if (options.fetch) return options.fetch(request);
      return Promise.resolve({ok: true, status: 200, json: async () => ({})});
    }
  };
  vm.runInNewContext(source, context);
  return {fields, status, button, requests, redirects, timers, events, submit: () => handler({preventDefault: noop})};
}

test('one successful request, correct product redirect, consent and no client-controlled recipient', async () => {
  for (const [tariff, id] of Object.entries(products)) {
    const app = setup({tariff}); app.submit();
    app.fields['field-tariff'].value = 'Gold — 15 000 р';
    await tick();
    assert.equal(app.requests.length, 1, 'only the configured webhook, no tables/orders');
    assert.equal(app.requests[0].body.data.tariff, tariff);
    assert.equal(app.requests[0].body.data.consent, true);
    assert.equal(app.requests[0].body.data.website, '');
    assert.equal('chat_id' in app.requests[0].body, false);
    assert.deepEqual(app.redirects, ['https://link.payform.ru/?paymentLinkId=' + id]);
    assert.equal(app.timers.size, 0);
    app.fields['field-tariff'].value = tariff;
    app.submit(); await tick();
    assert.equal(app.requests.length, 1, 'no resubmit after acceptance while navigation is pending');
  }
});

test('pending repeated submit events only send once', async () => {
  let finish;
  const app = setup({fetch: () => new Promise(resolve => { finish = resolve; })});
  app.submit(); app.submit(); app.submit();
  assert.equal(app.requests.length, 1);
  assert.equal(app.button.disabled, true);
  finish({ok: true, status: 200}); await tick();
  assert.equal(app.redirects.length, 1);
});

test('invalid fields, bot trap and missing consent make no requests', async () => {
  for (const values of [
    {name: ''}, {name: '\u200b\u200b'}, {name: 'А'.repeat(101)}, {name: 'Иван\nТариф: Gold'},
    {name: '<a>Иван</a>'}, {phone: ''}, {phone: '+7 (___) ___-__-__'},
    {phone: '1'.repeat(30)}, {phone: '+7 (999) 999-99-99'}, {phone: 'abc79001234567'},
    {telegram: 'a'.repeat(33)}, {birth: '31/02/2000'}, {birth: '01/01/2099'},
    {website: 'bot'}, {tariff: 'unknown'}, {tariff: '__proto__'}
  ]) {
    const app = setup({values}); app.submit(); await tick();
    assert.equal(app.requests.length, 0, JSON.stringify(values));
    assert.equal(app.redirects.length, 0);
  }
  for (const noErrorHolder of [false, true]) {
    const app = setup({consent: false, noErrorHolder}); app.submit(); await tick();
    assert.equal(app.requests.length, 0, 'consent validation must not depend on error element');
  }
});

test('valid names and optional fields remain usable', async () => {
  for (const name of ['Анна-Мария', 'O’Connor', '李明', 'Иван', 'Élise']) {
    const app = setup({values: {name, birth: '__/__/____', telegram: ''}});
    app.submit(); await tick(); assert.equal(app.redirects.length, 1, name);
  }
});

test('failed request preserves data, allows retry with same order id, and never redirects', async () => {
  const app = setup({fetch: async () => ({ok: false, status: 500})});
  app.submit(); await tick();
  assert.equal(app.redirects.length, 0); assert.equal(app.button.disabled, false);
  assert.equal(app.fields['field-name'].value, 'Тестовое Имя');
  const id = app.requests[0].body.data.id;
  app.submit(); await tick();
  assert.equal(app.requests[1].body.data.id, id);
  app.fields['field-tariff'].value = 'Gold — 15 000 р';
  app.submit(); await tick();
  assert.notEqual(app.requests[2].body.data.id, id);
  assert.equal(app.timers.size, 0);
});

test('timeout aborts a stalled request and restores button without redirect', async () => {
  const app = setup({fetch: request => new Promise((resolve, reject) => {
    request.init.signal.addEventListener('abort', () => { const err = new Error('aborted'); err.name = 'AbortError'; reject(err); });
  })});
  app.submit(); assert.equal(app.timers.size, 1);
  for (const callback of app.timers.values()) callback();
  await tick();
  assert.equal(app.button.disabled, false); assert.equal(app.redirects.length, 0);
  assert.match(app.status.textContent, /подтвердить|ответ/);
});

test('missing or unsafe config fails closed; direct bot tokens never leave browser', async () => {
  for (const config of [
    {enabled: false}, {enabled: true},
    {enabled: true, botToken: 'dummy-not-a-secret', chatId: '123'},
    {enabled: true, webhookUrl: 'http://hook.eu2.make.com/test'},
    {enabled: true, webhookUrl: 'https://evil.example/test'},
    {enabled: true, webhookUrl: 'https://hook.eu2.make.com.evil.example/test'},
    {enabled: true, webhookUrl: 'https://user:pass@hook.eu2.make.com/test'},
    {enabled: true, webhookUrl: 'https://hook.eu2.make.com/'},
    {enabled: true, webhookUrl: 'https://hook.eu2.make.com:8443/test'}
  ]) {
    const app = setup({config}); app.submit(); await tick();
    assert.equal(app.requests.length, 0); assert.equal(app.redirects.length, 0); assert.equal(app.button.disabled, false);
  }
});

test('browser Back restores form; same accepted order reopens payment without sending again', async () => {
  const app = setup(); app.submit(); await tick();
  app.events.pageshow({persisted: true});
  assert.equal(app.button.disabled, false);
  app.submit(); await tick();
  assert.equal(app.requests.length, 1);
  assert.equal(app.redirects.length, 2);
  app.events.pageshow({persisted: true});
  app.fields['field-tariff'].value = 'Gold — 15 000 р';
  app.submit(); await tick();
  assert.equal(app.requests.length, 2);
  assert.equal(app.redirects[2], 'https://link.payform.ru/?paymentLinkId=' + products['Gold — 15 000 р']);
});

test('synchronous fetch failure restores form and clears timeout', async () => {
  const app = setup({fetch: () => { throw new Error('sync network wrapper failure'); }});
  app.submit(); await tick();
  assert.equal(app.button.disabled, false);
  assert.equal(app.redirects.length, 0);
  assert.equal(app.timers.size, 0);
});
