import { Color } from "./color";

export class Tile {
  color: Color;
  selected: boolean;
  won: boolean;

  constructor(color: Color) {
    this.color = color;
    this.selected = false;
    this.won = false;
  }

  getStyleText() {
    if (this.won) {
      return this.color + "__won";
    }
    if (this.selected) {
      return this.color + "__selected";
    }
    return this.color;
  }
}