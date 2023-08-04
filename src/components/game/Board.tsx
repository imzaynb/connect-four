"use client";

import { Color } from "@/util/color";
import Square from "./Square";
import { useState } from "react";
import { calculateWinner, colFromIndex, generateIndex, rowFromIndex } from "@/util/connect-four";
import { Tile } from "@/util/Tile.class";

interface BoardProps {
  className?: string,
}

export default function Board({ className = "" }: BoardProps) {
  const [board, setBoard] = useState(
    Array(6)
      .fill(null)
      .map(() => (
        Array(7)
          .fill(null)
          .map(() => ((new Tile(Color.NONE))))
      ))
  );
  const [isRed, setIsRed] = useState(true);
  const [isWon, setIsWon] = useState(false);

  const handleClick = (index: number) => {
    if (isWon) {
      return;
    }

    // const row = Math.floor(index / board[0].length);
    const col = colFromIndex(index, board[0].length);

    // deep copy the array by returning an array of copies of the rows  
    const newBoard = board.map(row => {
      return row.slice()
    });

    let insertedRow = null;

    for (let thisRow = board.length - 1; thisRow >= 0; thisRow--) {
      if (newBoard[thisRow][col].color === Color.NONE) {
        insertedRow = thisRow;
        if (isRed) {
          newBoard[thisRow][col].color = Color.RED;

          const swapRedState = !isRed;
          setIsRed(swapRedState);

          break;
        } else {
          newBoard[thisRow][col].color = Color.YELLOW;

          const swapRedState = !isRed;
          setIsRed(swapRedState);

          break;
        }
      }
    }

    if (insertedRow !== null) {
      let insertedIndex = generateIndex(insertedRow, col, board[0].length)

      let winningIndices = calculateWinner(board, insertedIndex);

      if (winningIndices !== false) {
        setIsWon(true);

        // set the whole board to look frozen by all being selected!

        for (let row of newBoard) {
          for (let el of row) {
            el.selected = true;
          }
        }

        newBoard[winningIndices[0][0]][winningIndices[0][1]].won = true;
        newBoard[winningIndices[1][0]][winningIndices[1][1]].won = true;
        newBoard[winningIndices[2][0]][winningIndices[2][1]].won = true;
        newBoard[winningIndices[3][0]][winningIndices[3][1]].won = true;
      }
    }

    setBoard(newBoard);
  }

  const handleEnter = (index: number) => {
    if (isWon) {
      return;
    }

    const col = colFromIndex(index, board[0].length);

    const newBoard = board.map(row => {
      return row.slice();
    });


    for (let thisRow = 0; thisRow < board.length; thisRow++) {
      newBoard[thisRow][col].selected = true;
    }

    setBoard(newBoard);
  }

  const handleLeave = (index: number) => {
    if (isWon) {
      return;
    }

    const col = colFromIndex(index, board[0].length);

    const newBoard = board.map(row => {
      return row.slice();
    });

    for (let thisRow = 0; thisRow < board.length; thisRow++) {
      newBoard[thisRow][col].selected = false;
    }

    setBoard(newBoard);
  }


  return (
    <div className={`${className} space-y-2`}>
      {
        board.map((row: Tile[], rowIndex: number) => {
          return (
            <div className="flex w-[min-content] space-x-2">
              {
                row.map((thisTile: Tile, colIndex: number) => {
                  const index = generateIndex(rowIndex, colIndex, board[0].length);
                  return (
                    <Square
                      tile={thisTile}
                      key={index}
                      onSquareClick={() => handleClick(index)}
                      onSquareEnter={() => handleEnter(index)}
                      onSquareLeave={() => handleLeave(index)} />
                  )
                })
              }
            </div>
          )
        })
      }
    </div>
  )
}