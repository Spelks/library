document.addEventListener("DOMContentLoaded", ()=> {
  showBookOnShelf(); //Add placeholder book upon page load
  document.querySelectorAll("input").forEach(input => {
    checkInput(input); // Check input on page load
    input.addEventListener("input", () => {
      checkInput(input);
    });
  });
});

const dialogForm = document.querySelector("[data-dialog-form]");
const showFormBtn = document.querySelector("[data-dialog-form] + button");
const closeFormBtn = document.querySelector("[data-dialog-form] button");
const bookForm = document.querySelector("[data-book-form]");
const shelf = document.querySelector("[data-shelf]");
const popupTitle = document.querySelector("[data-popup-title");
const popupAuthor = document.querySelector("[data-popup-author");
const popupPages = document.querySelector("[data-popup-pages");
const popupRead = document.querySelector("[data-popup-read");
const dialogInfo = document.querySelector("[data-dialog-info]");
const closeInfoBtn = document.querySelector("[data-dialog-info] button");
const deleteInfoBtn = document.querySelector("[data-popup-delete-btn]");

//eventListeners for dialog pop-ups and book form
closeInfoBtn.addEventListener("click", ()=> dialogInfo.close());
closeFormBtn.addEventListener("click", ()=> dialogForm.close());
showFormBtn.addEventListener("click", ()=> dialogForm.showModal());
bookForm.addEventListener("submit", addBookToLibrary);

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
  dialogForm.close();
  bookForm.reset();
  labelReset();
}

//resets labels to default state once submitted
function labelReset() {
  title.classList.remove("is-valid");
  author.classList.remove("is-valid");
  pages.classList.remove("is-valid");
}


//Creates the visual representation of the book and applies a data attribute
function showBookOnShelf() {
  shelf.innerHTML = "";
  myLibrary.forEach((book, index) => {
    const bookDiv = document.createElement("div");
    const deleteBtn = document.createElement("button");
    const readBtn = document.createElement("button");
    const bookTitle = document.createElement("p");
    const author = document.createElement("p");
    shelf.appendChild(bookDiv);
    bookDiv.appendChild(deleteBtn);
    bookDiv.appendChild(readBtn);
    deleteBtn.textContent = "X";
    readBtn.textContent = "Read?"
    bookDiv.appendChild(bookTitle);
    bookDiv.appendChild(author);
    bookTitle.textContent = book.title;
    author.textContent = book.author;
    bookDiv.classList.add("book");
    bookDiv.setAttribute("data-id", index);
    toggleBookColor(bookDiv, index);
    deleteBtn.addEventListener("click", (event)=> {
      event.stopPropagation();
      deleteBook(bookDiv);
    });
    readBtn.addEventListener("click", (event)=> {
      event.stopPropagation();
      myLibrary[index].read = !myLibrary[index].read;
      toggleBookColor(bookDiv, index);
    });
    openBook(bookDiv, index);
  });
}

//flips background color of book based on read state
function toggleBookColor(book, index) {
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

//pulls object data from myLibrary and displays in pop-up when book is clicked
function openBook(book, index) {
  book.addEventListener("click", ()=> {
    dialogInfo.showModal();
    popupTitle.textContent = myLibrary[index].title;
    popupAuthor.textContent = myLibrary[index].author;
    popupPages.textContent = myLibrary[index].pages;
    popupRead.textContent = myLibrary[index].read;
    if(myLibrary[index].read === true) {
      popupRead.textContent = "Have Read";
      popupRead.style.color = "green";
    } else {
      popupRead.textContent = "Have Not Read";
      popupRead.style.color = "red";
    }
    deleteInfoBtn.addEventListener("click", ()=> {
      deleteBook(book);
      dialogInfo.close();
    })
  })
}

//adds/removes class to position label state
function checkInput(input) {
  if (input.value) {
    input.classList.add("is-valid");
  } else {
    input.classList.remove("is-valid");
  }
}