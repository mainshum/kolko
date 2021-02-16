// budowa planszy

const boardEl = document.querySelector('#board');
const board = {};
let currentPlayer = true;

const boolToSymbol = bool => bool ? 'X' : 'O';
const isFilled = (row, col) => board[row][col] !== null;


// OBJECT DESTRUCTURING
const handleInput = ({target}) => {
    const row = target.getAttribute('data-row');
    const col = target.getAttribute('data-col');

    if (!row || !col) 
        return;

    // sprawdz symbol w danym miejscu
    if (isFilled(row, col)) 
        alert('Nie mozna tutaj, bo juz cos jest!');

    const symbol = boolToSymbol(currentPlayer);

    board[row][col] = symbol;

    const matchingEl = boardEl
        .querySelector(`[data-row="${row}"][data-col="${col}"]`);

    matchingEl.textContent = symbol;

    // sprawdzamy czy ktos wygral
    //if (winnerExists()) 
    //    alert(`${symbol} zwycieza!`);

    currentPlayer = !currentPlayer;

};

boardEl.addEventListener('click', handleInput);

const init = ((boardSizeStr) => {

    const boardSize = Number.parseInt(boardSizeStr);

    const boardRows = Array(boardSize).fill().map((_, _rowInd) =>
        Array(boardSize).fill().map((_, _colInd) => null));

    // rysowanie planszy
    boardRows.map((row, rowInd) => {
        board[rowInd] = {};

        const rowEl = document.createElement('div');
        rowEl.classList.add('board_row');
        boardEl.appendChild(rowEl);

        row.map((col, colInd) => {
            board[rowInd][colInd] = null;
            const cellEl = document.createElement('div');
            cellEl.classList.add('cell_el');
            cellEl.setAttribute('data-row', rowInd);
            cellEl.setAttribute('data-col', colInd);
            rowEl.appendChild(cellEl);
        });
    });

})(prompt('Wprowadz wielkosc'))

