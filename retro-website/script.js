(function () {
  function getSafeText(value) {
    return String(value || '').replace(/[<>]/g, '');
  }

  function updateCounter() {
    var key = 'retro_site_visits';
    var current = Number(localStorage.getItem(key) || '0');
    current += 1;
    localStorage.setItem(key, String(current));

    var counterNodes = document.querySelectorAll('[data-visitor-count]');
    for (var i = 0; i < counterNodes.length; i++) {
      counterNodes[i].textContent = String(current).padStart(6, '0');
    }
  }

  function renderGuestbook() {
    var listEl = document.getElementById('guestbook-entries');
    if (!listEl) return;

    var entries = JSON.parse(localStorage.getItem('retro_guestbook_entries') || '[]');
    listEl.innerHTML = '';

    if (!entries.length) {
      var empty = document.createElement('p');
      empty.className = 'small-note';
      empty.textContent = 'No messages yet. Be the first netizen to sign!';
      listEl.appendChild(empty);
      return;
    }

    for (var i = 0; i < entries.length; i++) {
      var entry = entries[i];

      var container = document.createElement('div');
      container.className = 'entry';

      var strong = document.createElement('strong');
      strong.textContent = getSafeText(entry.name);

      var stamp = document.createElement('span');
      stamp.className = 'small-note';
      stamp.textContent = ' [' + getSafeText(entry.time) + ']';

      var br = document.createElement('br');
      var message = document.createElement('span');
      message.textContent = getSafeText(entry.message);

      container.appendChild(strong);
      container.appendChild(stamp);
      container.appendChild(br);
      container.appendChild(message);

      listEl.appendChild(container);
    }
  }

  function handleGuestbookSubmit() {
    var form = document.getElementById('guestbook-form');
    if (!form) return;

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var name = document.getElementById('name').value.trim();
      var message = document.getElementById('message').value.trim();
      if (!name || !message) {
        alert('Please enter both name and message!');
        return;
      }

      var entries = JSON.parse(localStorage.getItem('retro_guestbook_entries') || '[]');
      entries.unshift({
        name: name,
        message: message,
        time: new Date().toLocaleString()
      });

      localStorage.setItem('retro_guestbook_entries', JSON.stringify(entries.slice(0, 20)));
      form.reset();
      renderGuestbook();
    });
  }

  updateCounter();
  handleGuestbookSubmit();
  renderGuestbook();
})();
