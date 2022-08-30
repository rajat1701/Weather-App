console.log("Client side javascript file is loaded!");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");
const forBorder = document.querySelector(".message");
weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = search.value;

  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";

  fetch("/weather?address=" + location).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
        forBorder.style.border = "2px solid white";
        forBorder.style.boxShadow = "5px 10px";
      } else {
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;
        forBorder.style.border = "2px solid white";
        forBorder.style.boxShadow = "5px 10px";
      }
    });
  });
});
