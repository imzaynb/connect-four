import { Tile } from "./Tile.class";
import { Color } from "./color";

export const generateIndex = (row: number, col: number, numCols: number): number => {
  return row * numCols + col;
}

export const rowFromIndex = (index: number, numCols: number): number => {
  return Math.floor(index / numCols);
}

export const colFromIndex = (index: number, numCols: number): number => {
  return index % numCols;
}

export const calculateWinner = (board: Tile[][], index: number): number[][] | false => {
  const colWin = checkColsInSameRow(board, index);
  const rowWin = checkRowsInSameColumn(board, index);
  const ascDiagWin = checkAscendingDiags(board, index);
  const desDiagWin = checkDescendingDiags(board, index);

  if (colWin) return colWin;
  if (rowWin) return rowWin;
  if (ascDiagWin) return ascDiagWin;
  if (desDiagWin) return desDiagWin;
  return false;
}

const checkRowsInSameColumn = (board: Tile[][], index: number): number[][] | false => {
  const NUM_COLS = board[0].length;

  let col = colFromIndex(index, NUM_COLS);
  let row = rowFromIndex(index, NUM_COLS);

  let thisColor: Color = board[row][col].color

  let rowsToCheck: number[][][] = [
    [[0, 1, 2, 3]],
    [[0, 1, 2, 3], [1, 2, 3, 4]],
    [[0, 1, 2, 3], [1, 2, 3, 4], [2, 3, 4, 5]],
    [[0, 1, 2, 3], [1, 2, 3, 4], [2, 3, 4, 5]],
    [[1, 2, 3, 4], [2, 3, 4, 5]],
    [[2, 3, 4, 5]],
  ]

  for (let slice of rowsToCheck[row]) {
    if (board[slice[0]][col].color == thisColor &&
      board[slice[1]][col].color == thisColor &&
      board[slice[2]][col].color == thisColor &&
      board[slice[3]][col].color == thisColor
    )
      return [
        [slice[0], col],
        [slice[1], col],
        [slice[2], col],
        [slice[3], col],
      ];
  }

  return false;
}

const checkColsInSameRow = (board: Tile[][], index: number): number[][] | false => {
  const NUM_COLS = board[0].length;

  let col: number = colFromIndex(index, NUM_COLS);
  let row: number = rowFromIndex(index, NUM_COLS);

  let thisColor: Color = board[row][col].color;


  let colsToCheck: number[][][] = [
    [[0, 1, 2, 3]],
    [[0, 1, 2, 3], [1, 2, 3, 4]],
    [[0, 1, 2, 3], [1, 2, 3, 4], [2, 3, 4, 5]],
    [[0, 1, 2, 3], [1, 2, 3, 4], [2, 3, 4, 5], [3, 4, 5, 6]],
    [[1, 2, 3, 4], [2, 3, 4, 5], [3, 4, 5, 6]],
    [[2, 3, 4, 5], [3, 4, 5, 6]],
    [[3, 4, 5, 6]],
  ]

  for (let slice of colsToCheck[col]) {
    if (board[row][slice[0]].color == thisColor &&
      board[row][slice[1]].color == thisColor &&
      board[row][slice[2]].color == thisColor &&
      board[row][slice[3]].color == thisColor
    )
      return [
        [row, slice[0]],
        [row, slice[1]],
        [row, slice[2]],
        [row, slice[3]],
      ];
  }

  return false;
}

const checkAscendingDiags = (board: Tile[][], index: number): number[][] | false => {
  const NUM_ROWS = board.length;
  const NUM_COLS = board[0].length;

  let col = colFromIndex(index, NUM_COLS);
  let row = rowFromIndex(index, NUM_COLS);

  let thisColor: Color = board[row][col].color


  for (let i = -3; i <= 0; i++) {
    console.log(
      row + i + 0, col + i + 0, "\t",
      row + i + 1, col + i + 1, "\t",
      row + i + 2, col + i + 2, "\t",
      row + i + 3, col + i + 3);
    if (row + i < 0 || col + i < 0 || row + i + 3 >= NUM_ROWS || col + i + 3 >= NUM_COLS) {
      console.log("out of bounds");
      continue;
    }
    if (board[row + i + 0][col + i + 0].color === thisColor &&
      board[row + i + 1][col + i + 1].color === thisColor &&
      board[row + i + 2][col + i + 2].color === thisColor &&
      board[row + i + 3][col + i + 3].color === thisColor) {

      return [
        [row + i + 0, col + i + 0],
        [row + i + 1, col + i + 1],
        [row + i + 2, col + i + 2],
        [row + i + 3, col + i + 3]
      ];
    }
  }

  return false;
}

const checkDescendingDiags = (board: Tile[][], index: number): number[][] | false => {
  const NUM_ROWS = board.length;
  const NUM_COLS = board[0].length;

  let col = colFromIndex(index, NUM_COLS);
  let row = rowFromIndex(index, NUM_COLS);

  let thisColor: Color = board[row][col].color

  for (let i = -3; i <= 0; i++) {
    console.log(
      row + i + 0, col + i + 0, "\t",
      row + i + 1, col + i + 1, "\t",
      row + i + 2, col + i + 2, "\t",
      row + i + 3, col + i + 3);
    if (row + i < 0 || col - i >= NUM_COLS || row + i + 3 >= NUM_ROWS || col - i - 3 < 0) {
      console.log("out of bounds");
      continue;
    }
    if (board[row + i + 0][col - i - 0].color === thisColor &&
      board[row + i + 1][col - i - 1].color === thisColor &&
      board[row + i + 2][col - i - 2].color === thisColor &&
      board[row + i + 3][col - i - 3].color === thisColor) {

      return [
        [row + i + 0, col - i - 0],
        [row + i + 1, col - i - 1],
        [row + i + 2, col - i - 2],
        [row + i + 3, col - i - 3]
      ];
    }
  }
  return false;
}