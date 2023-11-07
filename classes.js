export class Ship {
    constructor(length) {
        this.length = length
        this.hit = 0 
        this._isSunk = false
    }

    hit() {
        this.hit += 1
    }

    isSunk() {
        if (this.length === this.hit) {
            return true
        }
        return false
    }
}

export class Gameboard {
    constructor() {
        this.ships = []
        this.log = [] // keep track of missed attacks

    }

    addShip(ship) {

    }

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
    constructor() {
    }
}

export class Computer extends Player {
    constructor() {

    }
}