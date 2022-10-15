class Book {
  constructor(
    title = "Unknown",
    author = "Unknown",
    pages = 0,
    status = false
  ) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
  }
}

class Library extends Book {
  constructor() {
    super();
    this.books = [];
  }

  addBook(newBook) {
    this.books.push(newBook);
  }

  getBook(title) {
    return this.books.find((element) => element.title === title);
  }

  removeBook(title) {
    return this.books.filter((element) => element.title !== title);
  }

  isInLibrary(newBook) {
    return this.books.some((element) => element.title === newBook.title);
  }
}

const library = new Library();

const openModalButtons = document.querySelectorAll("[data-modal-target]");
const closeModalButtons = document.querySelectorAll("[data-close-button]");
const overlay = document.querySelector("#overlay");
const submitBtn = document.querySelector("#submit");
const container = document.querySelector(".container");

submitBtn.addEventListener("click", () => {
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const pages = document.querySelector("#pages").value;
  const isRead = document.querySelector("#isread").checked;
  library.addBook(new Book(title, author, pages, isRead));
  updateContainer();
  removeButton();
});

overlay.addEventListener("click", () => {
  const modals = document.querySelectorAll(".modal.active");
  modals.forEach((modal) => {
    closeModal(modal);
  });
});

openModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = document.querySelector(button.dataset.modalTarget);
    openModal(modal);
  });
});

closeModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = button.closest(".modal");
    closeModal(modal);
  });
});

function openModal(modal) {
  if (modal === null) return;
  modal.classList.add("active");
  overlay.classList.add("active");
}

function closeModal(modal) {
  if (modal === null) return;
  modal.classList.remove("active");
  overlay.classList.remove("active");
}

function createCard(book) {
  const bookCard = document.createElement("div");
  const title = document.createElement("h3");
  const author = document.createElement("h3");
  const pages = document.createElement("h3");
  const removeBtn = document.createElement("button");

  title.textContent = `${book.title}`;
  author.textContent = `${book.author}`;
  pages.textContent = `${book.pages}`;
  removeBtn.textContent = "Remove";

  removeBtn.classList.add("removeBtn");

  bookCard.appendChild(title);
  bookCard.appendChild(author);
  bookCard.appendChild(pages);
  bookCard.appendChild(removeBtn);

  bookCard.classList.add("book-card");
  container.appendChild(bookCard);
}

const updateContainer = () => {
  resetContainer();
  for (book of library.books) {
    createCard(book);
  }
  //library.books.forEach( book => createCard(book))
};

const resetContainer = () => {
  container.innerHTML = "";
};

const getPosition = (title) => {
  let position;

  for (let i = 0; i < library.books.length; i++) {
    if (library.books[i].title == title) {
      position = i;
    }
  }
  clearArray(position);
};

const removeButton = () => {
  const arr1 = container.querySelectorAll(".removeBtn");
  arr1.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const parent = e.target.parentElement;
      let titleHolder = parent.querySelector("h3").textContent;
      parent.parentNode.removeChild(parent);
      getPosition(titleHolder);
    });
  });
};

const clearArray = (position) => {
  library.books.splice(position, 1);
};

//test
