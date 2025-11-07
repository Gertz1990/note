document.addEventListener('DOMContentLoaded', () => {
  const notesEl = document.getElementById('notes');
  const addBtn = document.getElementById('addBtn');
  const editor = document.getElementById('editor');
  const saveBtn = document.getElementById('save');
  const cancelBtn = document.getElementById('cancel');
  const titleInput = document.getElementById('title');
  const bodyInput = document.getElementById('body');
  const searchInput = document.getElementById('search');

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  function createNoteElement(title, body) {
    const art = document.createElement('article');
    art.className = 'note';
    art.innerHTML = `
      <h3 class="note-title">${escapeHtml(title)}</h3>
      <p class="note-body">${escapeHtml(body)}</p>
      <div class="note-footer">
        <time>${new Date().toLocaleDateString()}</time>
        <button class="del">Удалить</button>
      </div>`;
    art.querySelector('.del').addEventListener('click', () => art.remove());
    return art;
  }

  addBtn.addEventListener('click', () => {
    editor.classList.add('visible');
    titleInput.focus();
  });

  saveBtn.addEventListener('click', () => {
    const t = titleInput.value.trim() || 'Без названия';
    const b = bodyInput.value.trim();
    notesEl.prepend(createNoteElement(t, b));
    titleInput.value = bodyInput.value = '';
    editor.classList.remove('visible');
  });

  cancelBtn.addEventListener('click', () => {
    titleInput.value = bodyInput.value = '';
    editor.classList.remove('visible');
  });

  notesEl.addEventListener('click', (e) => {
    if (e.target.classList.contains('del')) {
      e.target.closest('.note').remove();
    }
  });

  searchInput.addEventListener('input', () => {
    const q = searchInput.value.toLowerCase();
    document.querySelectorAll('.note').forEach((n) => {
      const txt = (n.querySelector('.note-title').textContent + ' ' + n.querySelector('.note-body').textContent).toLowerCase();
      n.style.display = txt.includes(q) ? '' : 'none';
    });
  });
});
