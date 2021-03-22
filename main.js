const prompt = require("prompt-sync")({ sigint: true });

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

class Field {
  constructor(field = [[]]) {
    this._field = field;
    this._x = 0;
    this._y = 0;
    this._field[0][0] = pathCharacter;
  }

  run() {
    let isPlaying = true;
    while (isPlaying) {
      this.print();
      this.ask();
      if (!this.isInBounds()) {
        console.log("Out of bounds, please start again!");
        isPlaying = false;
        break;
      } else if (this.isHole()) {
        console.log("You fell in a hole, please try again!");
        isPlaying = false;
        break;
      } else if (this.isHat()) {
        console.log("You've found the hat, congratulations!");
        isPlaying = false;
        break;
      }
      this._field[this._y][this._x] = pathCharacter;
    }
  }

  isInBounds() {
    return (
      this._y >= 0 &&
      this._x >= 0 &&
      this._y < this._field.length &&
      this._x < this._field[0].length
    );
  }

  isHole() {
    return this._field[this._y][this._x] === hole;
  }

  isHat() {
    return this._field[this._y][this._x] === hat;
  }

  ask() {
    const move = prompt("Which way are we going?").toUpperCase();
    switch (move) {
      case "W":
        this._y -= 1;
        break;
      case "S":
        this._y += 1;
        break;
      case "A":
        this._x -= 1;
        break;
      case "D":
        this._x += 1;
        break;
      default:
        console.log("Enter WASD to move in the field.");
        this.ask();
        break;
    }
  }

  print() {
    for (let subArr of this._field) {
      console.log(subArr.join(""));
    }
  }

  static generateField(height, width, percent) {
    const randomHeight = () => {
      return Math.floor(Math.random() * height);
    };
    const randomWidth = () => {
      return Math.floor(Math.random() * width);
    };

    const field = new Array(height).fill(0).map((ele) => new Array(width));
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        field[y][x] = fieldCharacter;
      }
    }

    const numberOfHoles = Math.floor(height * width * percent);

    for (let i = 0; i < numberOfHoles; i++) {
      let ht = randomHeight();
      let wd = randomWidth();
      if (field[ht][wd] === fieldCharacter) {
        field[ht][wd] = hole;
      }
    }

    let hatHeight = randomHeight();
    let hatWidth = randomWidth();
    while (hatHeight === 0 && hatWidth === 0) {
      hatHeight = randomHeight();
      hatWidth = randomWidth();
    }
    field[hatHeight][hatWidth] = hat;

    return field;
  }
}

const myField2 = new Field(Field.generateField(5, 5, 0.2));
myField2.run();
