let currPlayer = "X";
let Number_of_Rows = 5;
const turns = Number_of_Rows ** 2;
let currTurns = 0;

const createBoardArray = () => {
  let board = [];
  for (let row = 0; row < Number_of_Rows; row++) {
    board.push(Array.from({ length: Number_of_Rows }, () => "_"));
  }
  return board;
};

let board = createBoardArray();

const checkRows = (currPlayer) => {
  let coulmn = 0;
  for (let row = 0; row < Number_of_Rows; row++) {
    while (coulmn < Number_of_Rows) {
      if (board[row][coulmn] !== currPlayer) {
        coulmn = 0;
        break;
      }
      coulmn++;
    }
    if (coulmn === Number_of_Rows) {
      return true;
    }
  }
};

const checkCoulmn = (currPlayer) => {
  let row = 0;
  for (let coulmn = 0; coulmn < Number_of_Rows; coulmn++) {
    while (row < Number_of_Rows) {
      if (board[row][coulmn] !== currPlayer) {
        row = 0;
        break;
      }
      row++;
    }
    if (row === Number_of_Rows) {
      return true;
    }
  }
};

const checkDiagonals = () => {
  let count = 0;
  while (count < Number_of_Rows) {
    if (board[count][count] !== currPlayer) {
      count = 0;
      break;
    }
    count++;
  }
  if (count === Number_of_Rows) {
    return true;
  }
};

const checkReveseDiagonals = () => {
  let count = 0;
  while (count < Number_of_Rows) {
    if (board[count][Number_of_Rows - 1 - count] !== currPlayer) {
      count = 0;
      break;
    }
    count++;
  }
  if (count === Number_of_Rows) {
    return true;
  }
};

const restBtn = document.querySelector("#reset");

const checkWin = (currPlayer) => {
  if (checkRows(currPlayer)) {
    return true;
  }

  if (checkCoulmn(currPlayer)) {
    return true;
  }

  if (checkDiagonals()) {
    return true;
  }

  if (checkReveseDiagonals()) {
    return true;
  }
};
//
const resetBoard = () => {
  document.querySelector(".board").remove();
  createBoard();
  board = createBoardArray();
  currPlayer = "X";
  currTurns = 0;
};
//
const runWinEvent = (currPlayer) => {
  setTimeout(() => {
    alert(`Player ${currPlayer} won`);
    resetBoard();
  }, 100);
};
//

const runDrawEvent = () => {
  setTimeout(() => {
    alert("Draw , Play agin");
    resetBoard();
  }, 100);
};
//
const drawMarkInCell = (cell, currPlayer) => {
  cell.querySelector(".value").textContent = currPlayer;
  cell.classList.add(`cell--${currPlayer}`);
};
///
const XOPlacment = (index, numOfRows) => {
  const rows = Math.floor(index / numOfRows);
  const col = index % numOfRows;

  return [rows, col];
};
///
const cellClickHandler = (event, index) => {
  const cell = event.target;
  const [rows, col] = XOPlacment(index, Number_of_Rows);
  if (board[rows][col] === "_") {
    currTurns++;
    board[rows][col] = currPlayer;
    drawMarkInCell(cell, currPlayer);

    if (checkWin(currPlayer)) {
      runWinEvent(currPlayer);
    } else {
      if (currTurns === turns) {
        runDrawEvent();
      }
      currPlayer = currPlayer === "X" ? "O" : "X";
    }
  }
};
///
const createBoard = () => {
  const container = document.querySelector(".container");
  const board = document.createElement("div");
  board.classList.add("board");

  for (let i = 0; i < Number_of_Rows ** 2; i++) {
    const elementString = `<div class="cell" role="button" tabindex="${
      i + 1
    }"><span class="value"></span></div>`;
    const elementCell = document
      .createRange()
      .createContextualFragment(elementString);
    elementCell.querySelector(".cell").onclick = (event) =>
      cellClickHandler(event, i);
    board.appendChild(elementCell);
    document.documentElement.style.setProperty("--grid-rows", Number_of_Rows);
  }
  container.insertAdjacentElement("afterbegin", board);
};

restBtn.addEventListener("click", resetBoard);
createBoard();
