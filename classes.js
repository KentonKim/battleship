export class Ship {
  constructor(name, length, isVertical = true) {
    this.name = name;
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
    this._shipLoc = {}
  }
  
  get grid() {
    return this._grid.map( subarray => 
      subarray.map( element => {
        if (element instanceof Ship) {
          return 0
        } else {
          return element
        }
      })
    )
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

    // Check validity 
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
        if (!(ship.name in this._shipLoc)) {
          this._shipLoc[ship.name] = []
        }
        this._shipLoc[ship.name].push([row, col])
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

    // Updates grid 
    // sends hit to correct ship
    if (gridValue <= 0) {
        this._grid[row][col] = 1
        return null 
    } else if (gridValue === 1 || gridValue === 2) {
        throw new Error("Attempted to shoot shot place")
    } else if (gridValue instanceof Ship) {
        gridValue.hit()
        if (gridValue.isSunk()) {
          for (let coord of this._shipLoc[gridValue.name]) {
            this._grid[coord[0]][coord[1]] = 3
          }
          return true
        } else {
          this._grid[row][col] = 2
          return false
        }
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

  _checkHanging(grid) {
    const validMoves= []
    let hangingShips = null
    for (let i = 0; i < grid.length; i += 1) {
      for (let j = 0;  j < grid[0].length; j += 1) {
        if (grid[i][j] === 0) {
          validMoves.push([i,j])
        } else if (grid[i][j] === 2) {
          hangingShips = [i,j]
        }
      }
    }
    return [hangingShips, validMoves]
  }

  _attackHanging(grid,coords) {
    let row = coords[0]
    let col = coords[1]
    let isVertical = null
    const vertMoves = []
    const horzMoves = []
    // check above
    while (row != 0) {
      if (grid[row-1][col] === 2) {
        isVertical = true
        row -= 1
        continue
      } else if (grid[row-1][col] === 0) {
        vertMoves.push([row-1,col])
      }
      break
    }

    row = coords[0]

    // check bot
    while (row != grid.length - 1) {
      if (grid[row+1][col] === 2) {
        isVertical = true
        row += 1
        continue
      } else if (grid[row+1][col] === 0) {
        vertMoves.push([row+1,col])
      }
      break
    }

    if (isVertical && vertMoves.length != 0) {
      return vertMoves[Math.floor(Math.random() * vertMoves.length)]
    }

    row = coords[0]

    // check left
    while (col != 0) {
      if (grid[row][col-1] === 2) {
        isVertical = false 
        col -= 1
        continue
      } else if (grid[row][col-1] === 0) {
        horzMoves.push([row,col-1])
      }
      break
    }

    col = coords[1]
    
    // check right 
    while (col != grid[0].length - 1) {
      if (grid[row][col+1] === 2) {
        isVertical = false 
        col += 1
        continue
      } else if (grid[row][col+1] === 0) {
        horzMoves.push([row,col+1])
      }
      break
    }

    if (isVertical === false && horzMoves.length != 0) {
      return horzMoves[Math.floor(Math.random() * horzMoves.length)]
    }

    horzMoves.push(...vertMoves)
    return horzMoves[Math.floor(Math.random() * horzMoves.length)]
  }

  playMove(grid) {
    let index 
    // scan for hanging ships
    const [hangingCoords, validMoves] = this._checkHanging(grid)
    if (hangingCoords !== null) {
      return this._attackHanging(grid, hangingCoords)
    }

    // if (this._difficulty === 0) { // Easy
    //   return this._playEasyMove(validMoves)
    // } else if (this._difficulty === 1) { // Medium
    //   return  this._playMediumMove(validMoves)
    // } else {
    //   return this._playHardMove(validMoves)
    // }

    return this._playEasyMove(validMoves)
  }

  _playEasyMove(moves) {
    const randNum = Math.floor(Math.random() * moves.length)
    return moves[randNum] 
  }
  
  _playMediumMove() {

  }

  _playHardMove() {

  }
}

export class Battlelog {
  constructor() {
    this._turn = 1
    this._log = []
  }

  addLog(result, player, coordinates) {
    this._log.push({
      turn: this._turn,
      player: player,
      result: result,
      coordinates: coordinates
    })
    this._incrementTurn()
  }

  get log() {
    return this._log
  }

  get turn() {
    return this._turn
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
    this._turn += 1
  }
}