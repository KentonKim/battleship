export class Ship {
  constructor(length, isVertical = true) {
    this.length = length;
    this.hitCount = 0;
    this._isSunk = false;
    this._isVertical = isVertical
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

  set isVertical(bool) {
    this._isVertical = bool
  }

  get isVertical() {
    return this._isVertical
  }
}

export class Gameboard {
  constructor() {
    this.log = []; // keep track of missed attacks
    this._grid = Array.from({ length: 10 }, () => Array(10).fill(0));
  }

  _isInBounds(coordinates) {
    if (coordinates[0] >= 0 
        && coordinates[0] <= 9
        && coordinates[1] >= 0
        && coordinates[1] <= 9) {
            return true
    } else {
        return false
    }
  }

  _isEmpty(coordinates) {
    if (this._grid[coordinates[0]][coordinates[1]] === 0) {
        return true
    } else {
        return false
    }
  }

  /* PLAY WITH SHIPS ALLOWED TO BE ADJACENT
  _indicateNearbyShip(coordinates) {
    let row = coordinates[0]
    let col = coordinates[1]

    for (let i = -1; i < 2; i += 1) {
      for (let j = -1; j < 2; j += 1) {
        if (i === 0 && j === 0) {
          continue
        } else if (this._isInBounds([row + i, col + j]) && this._grid[row+i][col+j] === 0) {
          this._grid[row+i][col+j] = -1
        }
      }
    }
    return
  }
  */

  addShip(ship, coordinates) {
    // Assume coordinates within grid bounds
    const shipLength = ship.length
    let row = coordinates[0]
    let col = coordinates[1]

    const incrementRowCol = (ship) => {
        if (ship.isVertical) {
            row += 1
        } else {
            col += 1
        }
    }
    for (let i = 0; i < shipLength; i += 1) {
        if (!this._isInBounds([row, col]) || !this._isEmpty([row, col])) {
            throw new Error('Invalid place for ship')
        }
        incrementRowCol(ship)
    }

    row = coordinates[0]
    col = coordinates[1]

    for (let i = 0; i < shipLength; i += 1) {
        this._grid[row][col] = ship
        // this._indicateNearbyShip([row,col])
        incrementRowCol(ship)
    }

    return true 
  }

  deleteShip() {}
  moveShip(ship) {}

  receiveAttack(coordinates) {
    // Assume valid coordinates
    const row = coordinates[0]
    const col = coordinates[1]
    const gridValue = this._grid[row][col]
    // sends hit to correct ship

    // Updates grid 
    if (gridValue <= 0) {
        this._grid[row][col] = 1
        return null 
    } else if (gridValue === 1 || gridValue === 2) {
        throw new Error("Attempted to shoot shot place")
    } else if (gridValue instanceof Ship) {
        gridValue.hit()
        this._grid[row][col] = 2
        return gridValue.isSunk() 
    } else {
        throw new Error("Unexpected value in grid")
    }
  }

  isWiped() {
    //  report if all ships have been sunk
    for (let i = 0; i < this._grid.length; i += 1) {
        for (let j = 0; j < this._grid[0].length; j += 1) {
            if (this._grid[i][j] instanceof Ship) {
                return false
            }
        }
    }
    return true
  }
}

export class Player {
  constructor(name) {
    this.name = name
  }
}

export class Computer extends Player {
  constructor(name) {
    super(name)
    this._difficulty = 1 
  }

  set difficulty(number) {
    if (number < 0 || number > 2) {
        throw new Error('Difficulty must be inside [0,2]')
    } else if (number === this._difficulty) {
        return
    } else {
        this._difficulty = number
    }
  }

  playMove() {
    if (this._difficulty === 0) { // Easy
        this._playEasyMove()
    } else if (this._difficulty === 1) { // Medium
        this._playMediumMmove()
    } else {
        this._playHardMove()
    }
  }

  _playEasyMove() {}
  
  _playMediumMmove() {

  }

  _playHardMove() {

  }
}

export class Battlelog {
  constructor() {
    this.turn = 1
    this._log = []
  }

  addLog(result, player, coordinates) {
    this._log.push({
      turn: this.turn,
      player: player,
      result: result,
      coordinates: coordinates
    })
    this._incrementTurn()
  }

  get log() {
    return this._log
  }

  filteredLog(player) {
    const filteredArr = []
    for (let i = 0; i < this._log.length; i += 1) {
      if (this._log[i].player === player) {
        filteredArr.push(this._log[i])
      }
    }
    return filteredArr
  }

  _incrementTurn() {
    this.turn += 1
  }
}