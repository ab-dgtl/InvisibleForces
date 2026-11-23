const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const read = name => fs.readFileSync(path.join(__dirname, '..', name), 'utf8');

test('every page limits scripts, embedding objects, base URLs and referrer data', () => {
  for (const name of ['index.html', 'privacy.html', 'success.html']) {
    const html = read(name);
    const policy = html.match(/http-equiv="Content-Security-Policy" content="([^"]+)"/)[1];
    assert.match(policy, /object-src 'none'/);
    assert.match(policy, /base-uri 'none'/);
    assert.match(policy, /form-action 'self'/);
    assert.doesNotMatch(policy, /unsafe-eval|script-src[^;]*unsafe-inline|\*/);
    assert.match(html, /name="referrer" content="strict-origin-when-cross-origin"/);
  }
  assert.match(read('index.html'), /connect-src 'self' https:\/\/hook\.eu2\.make\.com;/);
  assert.match(read('success.html'), /script-src 'none'/);
  assert.doesNotMatch(read('privacy.html'), /src="js\/config\.js"/);
});

test('pinned executable and CSS dependencies carry SRI and anonymous CORS', () => {
  for (const name of ['index.html', 'privacy.html']) {
    const tags = read(name).match(/<(?:script|link)[^>]*cdn\.jsdelivr\.net[^>]*>/g);
    assert.ok(tags && tags.length);
    for (const tag of tags) {
      assert.match(tag, /integrity="sha384-[A-Za-z0-9+/=]+"/);
      assert.match(tag, /crossorigin="anonymous"/);
    }
  }
});

test('form bounds and exact product values remain consistent with JavaScript', () => {
  const html = read('index.html');
  for (const [id, max] of Object.entries({'field-name':100, 'field-phone':25, 'field-birth':10, 'field-telegram':33})) {
    const tag = html.match(new RegExp('<input[^>]+id="' + id + '"[^>]*>'))[0];
    assert.ok(tag.includes('maxlength="' + max + '"'));
  }
  assert.match(html, /id="field-website" name="contact_check"/);
  const options = [...html.matchAll(/<option value="([^"]+)"/g)].map(match => match[1]);
  assert.equal(options.length, 4);
  for (const option of options) assert.ok(read('js/main.js').includes("'" + option + "': 'https://link.payform.ru/"));
  assert.doesNotMatch(read('js/main.js'), /tables\/orders|api\.telegram\.org\/bot/);
});
