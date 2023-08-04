import { Tile } from "@/util/Tile.class";
import { Color } from "@/util/color"
import { MouseEventHandler } from "react";

interface SquareProps {
  className?: string,
  tile: Tile,
  onSquareClick: MouseEventHandler,
  onSquareEnter: MouseEventHandler,
  onSquareLeave: MouseEventHandler,
}

export default function Square({ className = '', tile, onSquareClick, onSquareEnter, onSquareLeave }: SquareProps) {
  // the color interpolation only works if tailwind has already "saw" that color before... interesting!
  return (
    <button
      onClick={onSquareClick}
      onMouseEnter={onSquareEnter}
      onMouseLeave={onSquareLeave}
      className={`${className} ${tile.getStyleText()} w-[5.5rem] h-[5.5rem] rounded-md flex flex-row justify-center items-center dark:border-none border-2`}>
      {
        <p>{tile.color}</p>
      }
    </button>
  )
}