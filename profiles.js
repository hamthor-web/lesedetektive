'use strict';
(() => {
  const LIST = 'lesedetektive:profiles:v1';
  const ACTIVE = 'lesedetektive:active-profile:v1';
  let current = null;
  let resolveReady;
  const ready = new Promise(resolve => { resolveReady = resolve; });
  let persistent = true;
  const memory = new Map();
  const get = key => { if (memory.has(key)) return memory.get(key); try { return localStorage.getItem(key); } catch { persistent = false; return null; } };
  const put = (key, value) => { try { localStorage.setItem(key, value); } catch { persistent = false; memory.set(key, value); } };
  function list() {
    try { const data = JSON.parse(get(LIST)); return Array.isArray(data) ? data.filter(p => typeof p.id === 'string' && typeof p.name === 'string') : []; }
    catch { return []; }
  }
  function gameKey(game) { return `lesedetektive:progress:v1:${current.id}:${game}`; }
  function load(game) {
    if (!current) return null;
    try { return JSON.parse(get(gameKey(game))); } catch { return null; }
  }
  function save(game, state) { if (current) put(gameKey(game), JSON.stringify(state)); }

  const dialog = document.createElement('dialog');
  dialog.id = 'profileDialog';
  dialog.className = 'profile-welcome';
  dialog.setAttribute('aria-labelledby', 'profileHeading');
  dialog.innerHTML = '<div class="profile-brand"><img src="assets/logo.png" alt="" width="56" height="80"><h2 id="profileHeading">Wer spielt heute?</h2></div><p>Jedes Kind hat hier seinen eigenen Spielstand auf diesem Gerät.</p><div class="profile-list"></div><form class="profile-create"><label>Neues Profil <input name="name" maxlength="32" autocomplete="off" enterkeyhint="done" placeholder="Name des Kindes" required></label><button type="submit">Profil anlegen</button></form><p class="profile-error" role="alert"></p><p class="profile-storage" role="status"></p><div class="profile-install"><button type="button" data-app-action="install">Installieren</button><button type="button" data-app-action="update">Aktualisieren</button><p data-app-status role="status" aria-live="polite"></p></div><button type="button" class="profile-cancel" hidden>Zurück</button>';
  dialog.innerHTML = '<div class="welcome-art" aria-hidden="true"><img src="assets/startbildschirm.png" width="1792" height="2688" alt="" decoding="async" fetchpriority="high"></div><div class="welcome-controls"><div class="profile-panel">' + dialog.innerHTML + '</div></div>';
  document.body.append(dialog);
  const profileList = dialog.querySelector('.profile-list');
  const error = dialog.querySelector('.profile-error');
  const form = dialog.querySelector('form');
  function render() {
    profileList.replaceChildren(...list().map(profile => {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = profile.name;
      button.addEventListener('click', () => select(profile));
      return button;
    }));
    dialog.querySelector('.profile-cancel').hidden = !current;
    dialog.querySelector('.profile-storage').textContent = persistent ? '' : 'Dein Browser erlaubt hier kein dauerhaftes Speichern. Du kannst für diese Sitzung spielen.';
  }
  function select(profile) {
    const changed = current && current.id !== profile.id;
    current = profile;
    try { sessionStorage.setItem(ACTIVE, profile.id); } catch { /* The session can still be used in memory. */ }
    document.querySelectorAll('[data-profile-name]').forEach(el => { el.textContent = profile.name; });
    document.documentElement.classList.remove('profile-loading');
    dialog.close();
    resolveReady(profile);
    window.dispatchEvent(new Event('ld-profile-ready'));
    if (changed) window.location.reload();
  }
  function choose() { error.textContent = ''; render(); if (!dialog.open) dialog.showModal(); }
  form.addEventListener('submit', event => {
    event.preventDefault();
    const input = form.elements.namedItem('name');
    const name = String(input.value).trim().slice(0, 32);
    if (!name) { error.textContent = 'Bitte einen Namen eingeben.'; return; }
    const all = list();
    if (all.some(p => p.name.toLocaleLowerCase('de') === name.toLocaleLowerCase('de'))) { error.textContent = 'Diesen Namen gibt es schon. Bitte wähle ihn oben aus.'; return; }
    const profile = { id: crypto.randomUUID(), name };
    put(LIST, JSON.stringify([...all, profile]));
    input.value = '';
    select(profile);
  });
  dialog.addEventListener('cancel', event => { if (!current) event.preventDefault(); });
  dialog.querySelector('.profile-cancel').addEventListener('click', () => dialog.close());
  document.querySelectorAll('[data-profile-switch]').forEach(el => el.addEventListener('click', choose));
  window.LDProfiles = { ready, list, load, save, choose, active: () => current };
  let saved;
  try { saved = sessionStorage.getItem(ACTIVE); } catch { /* New session. */ }
  const active = list().find(p => p.id === saved);
  if (active) select(active); else choose();
})();
