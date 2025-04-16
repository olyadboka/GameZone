var candies = ["Blue", "Purple", "Red", "Yellow", "Green", "Orange"];
var board = [];
var columns = 9;
var rows = 9;
var score = 0;
var curTile;
var otherTile;

window.onload = function () {
  startGame();

  window.setInterval(function () {
    crushCandy();
    slideCandy();
    generateCandy();
  }, 100);
};

function startGame() {
  score = 0; // Reset the score to 0
  document.getElementById("score").innerText = score;

  for (let r = 0; r < rows; r++) {
    let row = [];
    for (let c = 0; c < columns; c++) {
      let tile = document.createElement("img");
      tile.id = r.toString() + "-" + c.toString();
      tile.src = "./image/" + randomCandy() + ".png";

      // drag events
      tile.addEventListener("dragstart", dragStart);
      tile.addEventListener("dragover", dragOver);
      tile.addEventListener("dragenter", dragEnter);
      tile.addEventListener("dragleave", dragLeave);
      tile.addEventListener("drop", dragDrop);
      tile.addEventListener("dragend", dragEnd);

      document.getElementById("board").append(tile);
      row.push(tile);
    }
    board.push(row);
  }
  console.log(board);
}

function randomCandy() {
  return candies[Math.floor(Math.random() * candies.length)];
}

function dragStart() {
  curTile = this;
}

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();
}

function dragLeave() {}

function dragDrop() {
  otherTile = this;
}

function dragEnd() {
  if (curTile.src.includes("blank") || otherTile.src.includes("blank")) {
    return;
  }

  let curcoord = curTile.id.split("-");
  let r1 = parseInt(curcoord[0]);
  let c1 = parseInt(curcoord[1]);

  let othercoord = otherTile.id.split("-");
  let r2 = parseInt(othercoord[0]);
  let c2 = parseInt(othercoord[1]);

  let moveLeft = r1 == r2 - 1 && c1 == c2;
  let moveRight = r1 == r2 + 1 && c1 == c2;
  let moveUp = c1 == c2 - 1 && r1 == r2;
  let moveDown = c1 == c2 + 1 && r1 == r2;

  let isAdjacent = moveUp || moveDown || moveRight || moveLeft;

  if (isAdjacent) {
    let curImg = curTile.src;
    let otherImg = otherTile.src;
    curTile.src = otherImg;
    otherTile.src = curImg;

    let validMove = checkValid();
    if (!validMove) {
      curTile.src = otherImg;
      otherTile.src = curImg;
    }
  }
}

function crushCandy() {
  let candiesCrushed = crushMatches();
  document.getElementById("score").innerText = score;
}

function crushMatches() {
  let totalCrushed = 0;

  // Check horizontal lines
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns - 2; c++) {
      let candy1 = board[r][c];
      let candy2 = board[r][c + 1];
      let candy3 = board[r][c + 2];
      if (
        candy1.src == candy2.src &&
        candy2.src == candy3.src &&
        !candy1.src.includes("blank")
      ) {
        let count = 3;
        while (
          c + count < columns &&
          board[r][c + count].src == candy1.src &&
          !board[r][c + count].src.includes("blank")
        ) {
          count++;
        }
        for (let i = 0; i < count; i++) {
          board[r][c + i].src = "./image/blank.png";
        }
        totalCrushed += count;
        c += count - 1;
      }
    }
  }

  // Check vertical lines
  for (let c = 0; c < columns; c++) {
    for (let r = 0; r < rows - 2; r++) {
      let candy1 = board[r][c];
      let candy2 = board[r + 1][c];
      let candy3 = board[r + 2][c];
      if (
        candy1.src == candy2.src &&
        candy2.src == candy3.src &&
        !candy1.src.includes("blank")
      ) {
        let count = 3;
        while (
          r + count < rows &&
          board[r + count][c].src == candy1.src &&
          !board[r + count][c].src.includes("blank")
        ) {
          count++;
        }
        for (let i = 0; i < count; i++) {
          board[r + i][c].src = "./image/blank.png";
        }
        totalCrushed += count;
        r += count - 1;
      }
    }
  }

  // Update the score based on candies crushed
  if (totalCrushed >= 3) {
    score +=
      totalCrushed >= 6
        ? 60
        : totalCrushed >= 5
        ? 50
        : totalCrushed >= 4
        ? 40
        : 30;
  }

  return totalCrushed;
}

function checkValid() {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns - 2; c++) {
      let candy1 = board[r][c];
      let candy2 = board[r][c + 1];
      let candy3 = board[r][c + 2];
      if (
        candy1.src == candy2.src &&
        candy2.src == candy3.src &&
        !candy1.src.includes("blank")
      ) {
        return true;
      }
    }
  }
  for (let c = 0; c < columns; c++) {
    for (let r = 0; r < rows - 2; r++) {
      let candy1 = board[r][c];
      let candy2 = board[r + 1][c];
      let candy3 = board[r + 2][c];
      if (
        candy1.src == candy2.src &&
        candy2.src == candy3.src &&
        !candy1.src.includes("blank")
      ) {
        return true;
      }
    }
  }
  return false;
}

function slideCandy() {
  for (let c = 0; c < columns; c++) {
    let ind = rows - 1;
    for (let r = rows - 1; r >= 0; r--) {
      if (!board[r][c].src.includes("blank")) {
        board[ind][c].src = board[r][c].src;
        ind--;
      }
    }

    for (let r = ind; r >= 0; r--) {
      board[r][c].src = "./image/blank.png";
    }
  }
}

function generateCandy() {
  for (let c = 0; c < columns; c++) {
    if (board[0][c].src.includes("blank")) {
      board[0][c].src = "./image/" + randomCandy() + ".png";
    }
  }
}
