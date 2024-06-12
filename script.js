addEventListener("DOMContentLoaded", showBookOnShelf); //Add placeholder book upon page load

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

//Library array containing placeholder book
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

//Gets the form data and pushes it to the myLibrary array
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

//Creates the visual representation of the book and applies a data attribute
function showBookOnShelf() {
  const newDiv = document.createElement("div");
  const deleteBtn = document.createElement("button");
  const newP = document.createElement("p");
  const authorP = document.createElement("p");
  myLibrary.forEach(book => {
    shelf.appendChild(newDiv);
    newDiv.appendChild(deleteBtn);
    deleteBtn.textContent = "X";
    newDiv.appendChild(newP);
    newDiv.appendChild(authorP);
    newP.textContent = book.title;
    authorP.textContent = book.author;
    newDiv.classList.add("book");
    newDiv.setAttribute("data-id", myLibrary.length -1);  //Data attibute testing  
  });
}