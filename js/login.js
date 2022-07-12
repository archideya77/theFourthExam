"use strict";

const elForm = document.querySelector(".form");
const usernameInput = document.querySelector(".username__input");
const passwordInput = document.querySelector(".password__input");

elForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const usernameInputValue = usernameInput.value;
  const passwordInputValue = passwordInput.value;

  fetch("https://reqres.in/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: usernameInputValue,
      password: passwordInputValue,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.token) {
        window.localStorage.setItem("token", data.token);

        window.location.replace("index.html");
      } else {
        alert("Parol yoki Username xato kiritilgan!");
      }
    });
});
