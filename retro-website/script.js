(function () {
  function updateCounter() {
    var key = 'retro_site_visits';
    var current = Number(localStorage.getItem(key) || '0');
    current += 1;
    localStorage.setItem(key, String(current));

    var counterEl = document.getElementById('visitor-count');
    if (counterEl) {
      counterEl.textContent = String(current).padStart(6, '0');
    }
  }

  function renderGuestbook() {
    var listEl = document.getElementById('guestbook-entries');
    if (!listEl) return;

    var entries = JSON.parse(localStorage.getItem('retro_guestbook_entries') || '[]');
    if (!entries.length) {
      listEl.innerHTML = '<p class="small-note">No messages yet. Be the first netizen to sign!</p>';
      return;
    }

    listEl.innerHTML = entries
      .map(function (entry) {
        return (
          '<div class="entry"><strong>' +
          entry.name +
          '</strong> <span class="small-note">[' +
          entry.time +
          ']</span><br>' +
          entry.message +
          '</div>'
        );
      })
      .join('');
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
