const titles = document.querySelector(".title-container");
const backspaceAndEnterRow = document.querySelector("#backspaceAndEnterRow");
const keyboardFirstRow = document.querySelector("#keyboardFirstRow");
const keyboardSecondRow = document.querySelector("#keyboardSecondRow");
const keyboardThirdRow = document.querySelector("#keyboardThirdRow");

const keysFirstRow = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
const keysSecondRow = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
const keysThirdRow = ["Z", "X", "C", "V", "B", "N", "M"];

const rows = 6;
const columns = 5;
let currentRow = 0;
let currentColumn = 0;
let termo = "CHUVA";
let termoMap = {};
for (let index = 0; index < termo.length; index++) {
  termoMap[termo[index]] = index;
}
const guesses = [];

for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
  guesses[rowIndex] = new Array(columns);
  const titleRow = document.createElement("div");
  titleRow.setAttribute("id", "row" + rowIndex);
  titleRow.setAttribute("class", "title-row");
  for (let columnIndex = 0; columnIndex < columns; columnIndex++) {
    const titleColumn = document.createElement("div");
    titleColumn.setAttribute("id", "row" + rowIndex + "column" + columnIndex);
    titleColumn.setAttribute(
      "class",
      rowIndex === 0 ? "title-column typing" : "title-column disabled"
    );
    titleRow.append(titleColumn);
    guesses[rowIndex][columnIndex] = "";
  }
  titles.append(titleRow);
}

const checkGuess = () => {
  const guess = guesses[currentRow].join("");
  if (guess.length !== columns) {
    return;
  }

  var currentColumns = document.querySelectorAll(".typing");
  for (let index = 0; index < columns; index++) {
    const letter = guess[index];
    if (termoMap[letter] === undefined) {
        currentColumns[index].classList.add("wrong")
    } else {
        if(termoMap[letter] === index) {
            currentColumns[index].classList.add("right")
        } else {
            currentColumns[index].classList.add("displaced")
        }
    }
  }

  if(guess === termo) {
      window.alert("Correto!")
      return
  } {
      if(currentRow === rows -1) {
          window.alert("Incorreto!")
      } else {
          moveToNextRow()
      }
  }
};

const moveToNextRow = () => {
    var typingColumns = document.querySelectorAll(".typing")
    for (let index = 0; index < typingColumns.length; index++) {
        typingColumns[index].classList.remove("typing")
        typingColumns[index].classList.add("disabled")
    }
    currentRow++
    currentColumn=0

    const currentRowEl = document.querySelector("#row"+currentRow)
    var currentColumns = currentRowEl.querySelectorAll(".title-column")
    for (let index = 0; index < currentColumns.length; index++) {
        currentColumns[index].classList.remove("disabled")
        currentColumns[index].classList.add("typing")
    }
}

const handleKeyboardOnClick = (key) => {
  if (currentColumn === columns) {
    return;
  }
  const currenttitle = document.querySelector(
    "#row" + currentRow + "column" + currentColumn
  );
  currenttitle.textContent = key;
  guesses[currentRow][currentColumn] = key;
  currentColumn++;
};

const createKeyboardRow = (keys, keyboardRow) => {
  keys.forEach((key) => {
    var buttonElement = document.createElement("button");
    buttonElement.textContent = key;
    buttonElement.setAttribute("id", key);
    buttonElement.addEventListener("click", () => handleKeyboardOnClick(key));
    keyboardRow.append(buttonElement);
  });
};

createKeyboardRow(keysFirstRow, keyboardFirstRow);
createKeyboardRow(keysSecondRow, keyboardSecondRow);
createKeyboardRow(keysThirdRow, keyboardThirdRow);

const handleBackspace = () => {
  if(currentColumn === 0){
      return
  }

  currentColumn--
  guesses[currentRow][currentColumn] = ""
  const title = document.querySelector("#row"+currentRow+"column"+currentColumn)
  title.textContent = ""
};

const backspaceButton = document.createElement("button");
backspaceButton.setAttribute("class", "buttonBackSpace");
backspaceButton.addEventListener("click", handleBackspace);
backspaceButton.textContent = "BACKSPACE";
backspaceAndEnterRow.append(backspaceButton);

const enterButton = document.createElement("button");
enterButton.setAttribute("class", "buttonEnter");
enterButton.addEventListener("click", checkGuess);
enterButton.textContent = "ENTER";
backspaceAndEnterRow.append(enterButton);

document.onkeydown = function (evt) {
    evt = evt || window.evt
    if(evt.key === "Enter"){
        checkGuess();
    } else if (evt.key === "Backspace") {
        handleBackspace()
    } else {
        handleKeyboardOnClick(evt.key.toUpperCase())
    }
}
