const ebookList = document.getElementById('ebook-list');
const ebookPreview = document.getElementById('ebook-preview');

// Load e-book list from storage
const ebooks = JSON.parse(localStorage.getItem('ebooks'));
if (ebooks) {
  ebooks.forEach((ebook) => {
    const listItem = document.createElement('li');
    listItem.textContent = ebook.title;
    listItem.dataset.ebookId = ebook.id;
    ebookList.appendChild(listItem);
  });
}

// Add event listeners
ebookList.addEventListener('click', (e) => {
  if (e.target.tagName === 'LI') {
    const ebookId = e.target.dataset.ebookId;
    const ebook = getEbookFromStorage(ebookId);
    ebookPreview.innerHTML = `
      <embed src="data:application/pdf;base64,${ebook.data}" type="application/pdf" width="100%" height="500px">
    `;
  }
});

// Helper functions
function getEbookFromStorage(ebookId) {
  const ebooks = JSON.parse(localStorage.getItem('ebooks'));
  return ebooks.find((ebook) => ebook.id === ebookId);
}

function saveEbookToStorage(ebook) {
  const ebooks = JSON.parse(localStorage.getItem('ebooks')) || [];
  ebooks.push(ebook);
  localStorage.setItem('ebooks', JSON.stringify(ebooks));
}

function generateUUID() {
  return Math.random().toString(36).substr(2, 9);
}
