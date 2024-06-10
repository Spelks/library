addEventListener("DOMContentLoaded", showBookOnShelf);

const dialog = document.querySelector("dialog");
const showButton = document.querySelector("dialog + button");
const closeButton = document.querySelector("dialog button");
const bookForm = document.querySelector("[data-book-form]");
const shelf = document.querySelector("[data-shelf]");

bookForm.addEventListener("submit", addBookToLibrary);

// Initial "Add Book" button opens the dialog modally
showButton.addEventListener("click", () => {
  dialog.showModal();
});

// "Close" button closes the dialog
closeButton.addEventListener("click", () => {
  dialog.close();
});

const myLibrary = [
  {
    "title": "To Kill a Mockingbird",
    "author": "Harper Lee",
    "pages": "281",
    "read": true
  }
];

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
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
  showBookOnShelf();
  dialog.close();
  bookForm.reset();
}

function showBookOnShelf() {
  const newDiv = document.createElement("div");
  const newP = document.createElement("p");
  myLibrary.forEach(book => {
    shelf.appendChild(newDiv);
    newDiv.appendChild(newP);
    newP.textContent = book.title;
    newDiv.classList.add("book");    
  });
}
