document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('bookForm');
  const tableBody = document.querySelector('#bookTable tbody');
  const modal = document.getElementById('bookModal');
  const openBtn = document.getElementById('openModalBtn');
  const closeBtn = document.querySelector('.close-button');

  const loadBooks = () => {
    const books = JSON.parse(localStorage.getItem('books') || '[]');
    tableBody.innerHTML = '';

    books.forEach((book, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.pages}</td>
        <td>
          <label class="switch">
            <input type="checkbox" class="read-toggle" data-index="${index}" ${book.read ? 'checked' : ''}>
            <span class="slider round"></span>
          </label>
        </td>
        <td><button class="remove-btn" data-index="${index}">Remove</button></td>
      `;
      tableBody.appendChild(row);
    });
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value.trim();
    const author = document.getElementById('author').value.trim();
    const pages = parseInt(document.getElementById('pages').value);

    if (title && author && pages > 0) {
      const books = JSON.parse(localStorage.getItem('books') || '[]');
      books.push({ title, author, pages, read: false }); // default to false
      localStorage.setItem('books', JSON.stringify(books));
      form.reset();
      modal.style.display = 'none';
      loadBooks();
    }
  });

  // Delegated event for remove and toggle switch
  tableBody.addEventListener('click', (e) => {
    const books = JSON.parse(localStorage.getItem('books') || '[]');

    if (e.target.classList.contains('remove-btn')) {
      const index = e.target.dataset.index;
      books.splice(index, 1);
      localStorage.setItem('books', JSON.stringify(books));
      loadBooks();
    }

    if (e.target.classList.contains('read-toggle')) {
      const index = e.target.dataset.index;
      books[index].read = e.target.checked;
      localStorage.setItem('books', JSON.stringify(books));
    }
  });

  openBtn.addEventListener('click', () => {
    modal.style.display = 'block';
  });

  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });

  loadBooks();
});
