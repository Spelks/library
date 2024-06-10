const dialog = document.querySelector("dialog");
const showButton = document.querySelector("dialog + button");
const closeButton = document.querySelector("dialog button");
const bookForm = document.querySelector("[data-book-form]");

bookForm.addEventListener("submit", addBookToLibrary);

// Initial "Add Book" button opens the dialog modally
showButton.addEventListener("click", () => {
  dialog.showModal();
});

// "Close" button closes the dialog
closeButton.addEventListener("click", () => {
  dialog.close();
});

const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(event) {
  event.preventDefault();
  const title = document.querySelector("[data-title]").value;
  const author = document.querySelector("[data-author]").value;
  const pages = document.querySelector("[data-pages]").value;
  const read = document.querySelector("[data-read").checked;

  myLibrary.push(new Book(title, author, pages, read));

  dialog.close();
  bookForm.reset();
}
