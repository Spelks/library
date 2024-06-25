document.addEventListener("DOMContentLoaded", ()=> {
  showBookOnShelf(); //Add placeholder book upon page load
  document.querySelectorAll("input").forEach(input => {
    checkInput(input); // Check input on page load
    input.addEventListener("input", () => {
      checkInput(input);
    });
  });
});

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

// Book constructor function to create new book objects
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
  labelReset();
}

function labelReset() {
  title.classList.remove("is-valid");
  author.classList.remove("is-valid");
  pages.classList.remove("is-valid");
}


//Creates the visual representation of the book and applies a data attribute
function showBookOnShelf() {
  shelf.innerHTML = "";
  myLibrary.forEach((book, index) => {
    const newDiv = document.createElement("div");
    const deleteBtn = document.createElement("button");
    const readBtn = document.createElement("button");
    const newP = document.createElement("p");
    const authorP = document.createElement("p");
    shelf.appendChild(newDiv);
    newDiv.appendChild(deleteBtn);
    newDiv.appendChild(readBtn);
    deleteBtn.textContent = "X";
    readBtn.textContent = "Read?"
    newDiv.appendChild(newP);
    newDiv.appendChild(authorP);
    newP.textContent = book.title;
    authorP.textContent = book.author;
    newDiv.classList.add("book");
    newDiv.setAttribute("data-id", index);
    toggleBookColor(index, newDiv);
    deleteBtn.addEventListener("click", (event)=> {
      event.stopPropagation();
      deleteBook(newDiv);
    });
    readBtn.addEventListener("click", (event)=> {
      event.stopPropagation();
      myLibrary[index].read = !myLibrary[index].read;
      toggleBookColor(index, newDiv);
    });


    openBook(newDiv, index);
  });
}

function toggleBookColor(index, book) {
  if(myLibrary[index].read === true) {
    book.style.backgroundColor = "rgb(124, 202, 124)";
  } else if (myLibrary[index].read === false) {
    book.style.backgroundColor = "rgb(216, 78, 78)";
  }
}

//Removes book div (and all children) matching library array object then runs book function to refresh 
function deleteBook(book) {
  shelf.removeChild(book);
  myLibrary.splice(book.getAttribute("data-id"), 1);
  showBookOnShelf();
}

function openBook(book, index) {
  book.addEventListener("click", ()=> {
    alert(`Book: ${myLibrary[index].title}. Author: ${myLibrary[index].author}. Pages: ${myLibrary[index].pages}. Read: ${myLibrary[index].read}`);
  })
}

function checkInput(input) {
  if (input.value) {
    input.classList.add("is-valid");
  } else {
    input.classList.remove("is-valid");
  }
}