let words = [
  "Car",
  "Apple",
  "Book",
  "Laptop",
  "Phone",
  "Clock",
  "Sport",
  "Pizza",
  "Paris",
  "Mouse",
  "Sweets",
  "Smart",
  "Job",
  "Luxury",
  "Programming",
  "Windows",
];

let wordWrapper = document.querySelector(".word");
let buttons = document.querySelectorAll(".abc .letter");
let alertsElement = document.querySelector(".alerts");

function game() {
  let word = words[Math.floor(Math.random() * words.length)].toLowerCase();
  let foundLettersCount = 0;
  let chances = 10;
  let gameOver = false;

  for (let letter of word) {
    let span = document.createElement("span");
    span.classList.add("letter");
    span.setAttribute("data-letter", letter);
    wordWrapper.append(span);
  }

  function handleLetterClick(e) {
    if (gameOver) return;
    e.target.classList.add("clicked");
    let clickedLetter = e.target.textContent;

    let index = word.indexOf(clickedLetter);
    if (index === -1) {
      let alertElement = document.createElement("div");
      alertElement.textContent = "Wrong letter";
      alertElement.classList.add("alert", "show");
      alertsElement.append(alertElement);
      setTimeout(() => alertElement.remove(), 1_000);
      if (--chances === 0) {
        let alertElement = document.createElement("div");
        alertElement.textContent = "Game over";
        alertElement.classList.add("alert", "show");
        alertsElement.append(alertElement);
        gameOver = true;
        document
          .querySelectorAll(".word .letter")
          .forEach((el) => (el.textContent = el.getAttribute("data-letter")));
        return;
      }
    }

    while (index !== -1) {
      wordWrapper.children[index].textContent = clickedLetter;
      if (++foundLettersCount === word.length) {
        let alertElement = document.createElement("div");
        alertElement.textContent = "Found, Congrats";
        alertElement.classList.add("alert", "show");
        alertsElement.append(alertElement);
        setTimeout(() => alertElement.remove(), 1_000);
        gameOver = true;
      }
      index = word.indexOf(clickedLetter, index + 1);
    }
  }

  buttons.forEach((b) => b.addEventListener("click", handleLetterClick));
}

game();
