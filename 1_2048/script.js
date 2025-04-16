var board;
var score = 0;
var rows = 4;
var columns = 4;
var gameOver = false;

window.onload = function() {
    setGame();
    document.getElementById('restart-button').addEventListener('click', restartGame);
}

function setGame() {
    board = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
    
    document.getElementById("board").innerHTML = "";

    for(let r = 0; r < rows; r++) { 
        for(let c = 0; c < columns; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            let num = board[r][c];
            updateTile(tile, num);
            document.getElementById("board").append(tile);
        }
    }
    
    setTwo();
    setTwo();
    gameOver = false;
    document.getElementById("score").innerText = score;
    document.getElementById("game-over").classList.add("hidden");
    document.getElementById("restart-button").classList.add("hidden");
}

function hasEmptyTile() {
    for(let r = 0; r < rows; r++) {
        for(let c = 0; c < columns; c++) {
            if(board[r][c] == 0) return true;
        }
    }
    return false;
}

function canMerge() {
    for(let r = 0; r < rows; r++) {
        for(let c = 0; c < columns; c++) {
            if(board[r][c] == 0) return true;
            if(c < columns - 1 && board[r][c] == board[r][c + 1]) return true;
            if(r < rows - 1 && board[r][c] == board[r + 1][c]) return true;
        }
    }
    return false;
}

function checkGameOver() {
    if (!hasEmptyTile() && !canMerge()) {
        gameOver = true;
        document.getElementById("game-over").innerText = `Game Over! Your score is ${score}`;
        document.getElementById("game-over").classList.remove("hidden");
        document.getElementById("restart-button").classList.remove("hidden");
        document.getElementById("score").classList.add("hidden");
    }
}

function setTwo() {
    if (gameOver) return;

    if (!hasEmptyTile()) {
        checkGameOver();
        return;
    }

    let found = false;
    while (!found) {
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);
    
        if (board[r][c] == 0) {
            board[r][c] = 2;
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            tile.innerText = "2";
            tile.classList.add("x2");
            found = true;
        }
    }
}

function updateTile(tile, num) {
    tile.innerText = "";
    tile.className = "tile";
    if (num > 0) {
        tile.innerText = num.toString();
        tile.classList.add("x" + num.toString());
    }
}

document.addEventListener('keyup', (e) => {
    if (gameOver) return;

    let moved = false;
    if (e.code == "ArrowLeft") {
        moved = slideLeft();
    } else if (e.code == "ArrowRight") {
        moved = slideRight();
    } else if (e.code == "ArrowUp") {
        moved = slideUp();
    } else if (e.code == "ArrowDown") {
        moved = slideDown();
    }

    if (moved) {
        setTwo();
        checkGameOver();
    }

    document.getElementById("score").innerText = score;
});

function filterZeros(row) {
    return row.filter(num => num != 0);
}

function slide(row) {
    row = filterZeros(row);

    for (let i = 0; i < row.length - 1; i++) {
        if (row[i] == row[i + 1]) {
            row[i] *= 2;
            row[i + 1] = 0;
            score += row[i];
        }
    }

    row = filterZeros(row);

    while (row.length < columns) {
        row.push(0);
    }

    return row;
}

function slideLeft() {
    let moved = false;
    for (let r = 0; r < rows; r++) {
        let row = board[r];
        let newRow = slide(row);
        if (!arraysEqual(row, newRow)) moved = true;
        board[r] = newRow;

        for (let c = 0; c < columns; c++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
    return moved;
}

function slideRight() {
    let moved = false;
    for (let r = 0; r < rows; r++) {
        let row = board[r];
        row.reverse();
        let newRow = slide(row);
        if (!arraysEqual(row, newRow)) moved = true;
        board[r] = newRow.reverse();

        for (let c = 0; c < columns; c++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
    return moved;
}

function slideUp() {
    let moved = false;
    for (let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        let newRow = slide(row);
        if (!arraysEqual(row, newRow)) moved = true;
        for (let r = 0; r < rows; r++) {
            board[r][c] = newRow[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
    return moved;
}

function slideDown() {
    let moved = false;
    for (let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row.reverse();
        let newRow = slide(row);
        if (!arraysEqual(row, newRow)) moved = true;
        newRow.reverse();
        for (let r = 0; r < rows; r++) {
            board[r][c] = newRow[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
    return moved;
}

function arraysEqual(a, b) {
    return a.length === b.length && a.every((val, index) => val === b[index]);
}
