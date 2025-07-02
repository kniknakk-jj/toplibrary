document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('bookForm');
  const tableBody = document.querySelector('#bookTable tbody');

  const loadBooks = () => {
    const books = JSON.parse(localStorage.getItem('books') || '[]');
    tableBody.innerHTML = '';
    books.forEach((book, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.pages}</td>
        <td>${book.read ? 'Yes' : 'No'}</td>
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
    const read = document.getElementById('read').checked;

    if (title && author && pages > 0) {
      const books = JSON.parse(localStorage.getItem('books') || '[]');
      books.push({ title, author, pages, read });
      localStorage.setItem('books', JSON.stringify(books));
      form.reset();
      loadBooks();
    }
  });

  tableBody.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-btn')) {
      const index = e.target.dataset.index;
      const books = JSON.parse(localStorage.getItem('books') || '[]');
      books.splice(index, 1);
      localStorage.setItem('books', JSON.stringify(books));
      loadBooks();
    }
  });

  loadBooks();
});
