export class Ship {
  constructor(length) {
    this.length = length;
    this.hitCount = 0;
    this._isSunk = false;
  }

  hit() {
    this.hitCount += 1;
  }

  isSunk() {
    if (this.hitCount === this.length) {
      return true;
    } else if (this.hitCount > this.length) {
      throw new Error("Ship has been hit more than its length");
    }
    return false;
  }
}

export class Gameboard {
  constructor() {
    this.log = []; // keep track of missed attacks
    this._shipLocations = {};
  }

  addShip(ship, coordinates, isVertical = true) {}

  deleteShip() {}

  moveShip(ship) {
    
  }

  receiveAttack(coordinates) {
    // sends hit to correct ship
    // or records coords of missed shot
  }

  isWiped() {
    //  report if all ships have been sunk
  }
}

export class Player {
  constructor() {}
}

export class Computer extends Player {
  constructor() {}
}
