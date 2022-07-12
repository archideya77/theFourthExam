"use strict";

const elTemplate = document.querySelector(".template").content;
// const elPagiTemplate = document.querySelector(".pagi-temlate").content;
const elPagination = document.querySelector(".pagination");
const elContainer = document.querySelector(".container");
const elSpin = document.querySelector(".spin");
const elList = document.querySelector(".list");
const elResult = document.querySelector(".result");
const elShow = document.querySelector(".show");
const elInput = document.querySelector("input");
const sortBtn = document.querySelector(".sort");
const bookmarkBtn = document.querySelector(".bookmark__btn");
const bookmarkList = document.querySelector(".book");
const showModal = document.querySelector(".info__btn");
const modal = document.querySelector(".modal");
const closeModalBtn = document.querySelector(".close-modal");
const overlay = document.querySelector(".overlay");

let search = "java";
let orderBy = "relevance";
let page = "1";

const bookmark = [];
const pagination = [];

const renderBooks = function (arr, htmlElement) {
  const booksFragment = document.createDocumentFragment();
  elList.innerHTML = null;

  arr.forEach((book) => {
    const clonedBooksTemplate = elTemplate.cloneNode(true);

    clonedBooksTemplate.querySelector(".book__img").src =
      book.volumeInfo.imageLinks.smallThumbnail;
    clonedBooksTemplate.querySelector(".book__name").textContent =
      book.volumeInfo.title;
    clonedBooksTemplate.querySelector(".book__author").textContent =
      book.volumeInfo.authors;
    clonedBooksTemplate.querySelector(".book__year").textContent =
      book.volumeInfo.publishedDate;
    clonedBooksTemplate.querySelector(".read__btn").href =
      book.volumeInfo.previewLink;

    booksFragment.appendChild(clonedBooksTemplate);
  });
  htmlElement.appendChild(booksFragment);
};

elInput.addEventListener("change", function () {
  const inputValue = elInput.value;
  elInput.value = null;
  search = inputValue;
  getBooks();
});

sortBtn.addEventListener("click", function () {
  orderBy = "newest";
  getBooks();
});

const logoutBtn = document.querySelector(".logout_btn");

const token = window.localStorage.getItem("token");
if (!token) {
  window.location.replace("login.html");
}
logoutBtn.addEventListener("click", function () {
  window.localStorage.clear();
  window.location.replace("login.html");
});

prev.addEventListener("click", function () {
  if (page > 1) {
    page--;
  }
  getBooks();
});

next.addEventListener("click", function () {
  page++;
  getBooks();
});

const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

const getBooks = async function () {
  const request = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${search}&orderBy=${orderBy}&page=${page}`
  );
  const data = await request.json();
  console.log(data);
  if (data.items && data.items.length > 0) {
    renderBooks(data.items, elList);
  }
  elResult.textContent = `Result ${data.totalItems}`;
};
getBooks();
