'use strict';
(() => {
  const VERSION = '2026.11.08.4';
  let installPrompt = null, registration = null, applying = false, checking = false, installedHere = false;
  const standalone = () => matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
  const ios = /iPhone|iPad|iPod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const status = text => document.querySelectorAll('[data-app-status]').forEach(el => { el.textContent = text; });
  function render() {
    document.querySelectorAll('[data-app-action="install"]').forEach(b => { b.textContent = standalone() || installedHere ? 'Installiert' : 'Installieren'; b.disabled = standalone() || installedHere; });
    document.querySelectorAll('[data-app-action="update"]').forEach(b => { b.disabled = checking; b.textContent = registration?.waiting ? 'Aktualisierung laden' : 'Aktualisieren'; });
  }
  addEventListener('beforeinstallprompt', event => { event.preventDefault(); installPrompt = event; render(); });
  addEventListener('appinstalled', () => { installedHere = true; installPrompt = null; status('Lesedetektive wurde installiert. Du findest die App auf deinem Startbildschirm.'); render(); });
  async function install() {
    if (standalone()) return;
    if (installPrompt) {
      const prompt = installPrompt; installPrompt = null;
      try { await prompt.prompt(); const choice = await prompt.userChoice; status(choice.outcome === 'accepted' ? 'Installation bestätigt. Folge noch der Bestätigung deines Geräts.' : 'Du kannst weiter im Browser spielen und später installieren.'); }
      catch { status('Der Installationsdialog konnte nicht geöffnet werden. Bitte versuche es noch einmal.'); }
      render();return;
    }
    if (ios) status('Auf iPhone oder iPad: Öffne die Seite in Safari. Tippe auf „Teilen“ und dann „Zum Home-Bildschirm“. Bestätige mit „Hinzufügen“; lasse „Als Web-App öffnen“ eingeschaltet, falls angeboten.');
    else if (/Android/i.test(navigator.userAgent)) status('Die Installation wird vorbereitet. Lass die Seite kurz geöffnet und tippe dann erneut auf „Installieren“. Falls dein Browser keinen Installationsdialog anbietet, öffne diese Seite in einem unterstützten Browser, zum Beispiel Samsung Internet, Chrome oder Edge.');
    else status('Die Installation wird vorbereitet. Wenn dein Browser sie unterstützt, öffnet „Installieren“ den Dialog. In Safari auf dem Mac findest du „Zum Dock hinzufügen“ im Menü „Ablage“. Du kannst jederzeit hier im Browser spielen.');
  }
  async function update() {
    if (checking) return;
    if (!('serviceWorker' in navigator)) { status('Bitte öffne die Seite mit Internet in einem aktuellen Browser.'); return; }
    checking = true; render(); status('Suche nach Aktualisierungen …');
    try {
      registration ||= await navigator.serviceWorker.getRegistration('./');
      if (!registration) { status('Die Offline-Vorbereitung läuft noch. Bitte versuche es gleich erneut.'); return; }
      await registration.update();
      if (registration.waiting) { applying = true; status('Aktualisierung wird übernommen. Deine Profile und Spielstände bleiben erhalten.'); registration.waiting.postMessage({type:'LD_ACTIVATE_UPDATE'}); return; }
      const response = await fetch('./version.json',{cache:'no-store'});
      if (!response.ok) throw Error('Version');
      const remote = await response.json();
      status(remote.version === VERSION ? 'Du hast die aktuelle Version. Deine Profile und Spielstände bleiben erhalten.' : 'Eine neue Version wird geladen. Tippe nach dem Laden erneut auf „Aktualisieren“.');
    } catch { status('Aktualisieren ist gerade nicht möglich. Bitte prüfe die Internetverbindung. Deine Spielstände bleiben erhalten.'); }
    finally { checking = false; render(); }
  }
  document.querySelectorAll('[data-app-action]').forEach(b => b.addEventListener('click', () => b.dataset.appAction === 'install' ? install() : update()));
  if ('serviceWorker' in navigator && location.protocol === 'https:') {
    navigator.serviceWorker.addEventListener('controllerchange', () => { if (applying) { applying = false; location.reload(); } });
    navigator.serviceWorker.addEventListener('message', event => {
      const data = event.data;
      if (data?.type === 'LD_OFFLINE_PROGRESS') status(`Für die Nutzung ohne Internet wird vorbereitet (${data.completed}/${data.total}). Bitte geöffnet lassen.`);
      if (data?.type === 'LD_OFFLINE_READY') status('Lesedetektive ist auf diesem Gerät auch ohne Internet bereit.');
      if (data?.type === 'LD_OFFLINE_ERROR') status('Die Offline-Vorbereitung konnte nicht abgeschlossen werden. Bitte mit Internet erneut öffnen.');
    });
    navigator.serviceWorker.register('./sw.js',{updateViaCache:'none'}).then(reg => {
      registration = reg;
      if (reg.waiting) { status('Eine Aktualisierung ist verfügbar. Tippe auf „Aktualisieren“.'); render(); }
      reg.active?.postMessage({type:'LD_STATUS'});
      reg.addEventListener('updatefound', () => { reg.installing?.addEventListener('statechange', () => { if (reg.waiting) { status('Eine Aktualisierung ist bereit. Tippe auf „Aktualisieren“.'); render(); } }); });
      reg.update().catch(() => {});
    }).catch(() => status('Die Nutzung ohne Internet konnte nicht eingerichtet werden. Du kannst online spielen.'));
  }
  render();
})();
