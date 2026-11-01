'use strict';
(() => {
  const dialog = document.getElementById('introDialog');
  const video = document.getElementById('introVideo');
  const title = document.getElementById('introTitle');
  const start = document.getElementById('introStart');
  const note = document.getElementById('introNote');
  const routes = {
    'lesen.html': { video: 'assets/intro-lesen.mp4', title: 'Lesen und im Bild suchen' },
    'laute.html': { video: 'assets/intro-zischlaute.mp4', title: 'Was zischt denn da?' }
  };
  let destination = null;
  let request = 0;
  let holdTimer = null;

  function stop() {
    clearTimeout(holdTimer);
    holdTimer = null;
    request++;
    video.pause();
    video.removeAttribute('src');
    video.load();
    start.hidden = true;
    note.textContent = '';
  }

  function enterGame() {
    if (!destination) return;
    const href = destination;
    destination = null;
    stop();
    dialog.close();
    window.location.assign(href);
  }

  async function play() {
    const current = request;
    try {
      await video.play();
      if (current === request) start.hidden = true;
    } catch {
      if (current === request && destination) {
        start.hidden = false;
        note.textContent = 'Drücke auf „Video starten“ oder gehe direkt zum Spiel.';
      }
    }
  }

  document.querySelectorAll('.game').forEach(link => {
    const href = link.getAttribute('href');
    if (!routes[href]) return;
    link.addEventListener('click', event => {
      if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      if (typeof dialog.showModal !== 'function') return;
      event.preventDefault();
      if (destination) return;
      stop();
      destination = href;
      title.textContent = routes[href].title;
      video.setAttribute('aria-label', 'Würstchen begrüßt dich: ' + routes[href].title);
      video.src = routes[href].video;
      video.load();
      dialog.showModal();
      play();
    });
  });

  video.addEventListener('ended', () => {
    if (!destination || holdTimer !== null) return;
    const current = request;
    holdTimer = setTimeout(() => {
      holdTimer = null;
      if (current === request) enterGame();
    }, 3000);
  });
  video.addEventListener('error', () => {
    if (!destination || !video.getAttribute('src')) return;
    start.hidden = true;
    note.textContent = 'Das Video konnte nicht geladen werden. Du kannst direkt zum Spiel gehen.';
  });
  start.addEventListener('click', play);
  document.getElementById('introSkip').addEventListener('click', enterGame);
  document.getElementById('introBack').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => { destination = null; stop(); });
})();
