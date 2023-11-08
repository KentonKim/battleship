/* eslint-disable no-undef */
import { Ship, Gameboard } from "./classes"

describe("Ship class", () => {
 let length = 5 
 let ship

 beforeEach(() => {
    ship = new Ship(length)
 })

 it("Initialized with correct length", () => {
    expect(ship.length).toBe(length)
 })

 it("Sinks with correct number of hits", () => {
    for (let i = 0; i < length; i += 1) {
        expect(ship.isSunk()).toBe(false)
        ship.hit()
    }
    expect(ship.isSunk()).toBe(true)
 })

 it("Throws error when hit more than length and checked", () => {
    for (let i = 0; i < length+1; i += 1) {
        ship.hit()
    }
    expect(() => {
        ship.isSunk()
    }).toThrow()
 })
})

describe("Gameboard class", () => {
   let gameboard
   let ship

   beforeEach(() => {
      gameboard = new Gameboard()
      ship = new Ship(4)
   })

   it.skip("Invalid place due to vertical bounds", () => {
      expect(() => {
         gameboard.addShip(ship, [7,2])
      }).toThrow()
   })

   it.skip("Invalid place due to horizontal bounds", () => {
      expect(() => {
         gameboard.addShip(ship, [0,8], false)
      }).toThrow()
   })

   it.skip("Invalid place to put due to ship in way", () => {
      gameboard.addShip(ship, [3,0])
      const newShip = new Ship(3)
      expect(() => {
         gameboard.addShip(newShip, [2,1], false)
      }).toThrow()
   })

   it.skip("Valid place to put vertical ship", () => {
      expect(gameboard.addShip(ship, [0,0])).toBe(true)
   })

   it.skip("Valid place to put horizontal ship", () => {
      expect(gameboard.addShip(ship, [0,0], false)).toBe(true)
   })

   describe("Actions in game", () => {
      beforeEach(() => {
         gameboard.addShip(ship, [0,0])
      })

      it.skip("Acknowledges a hit", () => {
         expect(gameboard.receiveAttack([0,0])).toBe(true)
      })

      it.skip("Acknowledges a miss", () => {
         expect(gameboard.receiveAttack([1,0])).toBe(false)
      })

      it.skip("Acknowledges a wipeout", () => {
         for (let i = 0; i < 4; i += 1) {
            gameboard.receiveAttack([i,0])
         }
         expect(gameboard.isWiped()).toBe(true)
      })

      it.skip("Acknowledges a continued game", () => {
         for (let i = 0; i < 3; i += 1) {
            gameboard.receiveAttack([i,0])
         }
         expect(gameboard.isWiped()).toBe(false)
      })

      it.skip("Prevents repeated hit", () => {
         gameboard.receiveAttack([0,0])
         expect(() => {
            gameboard.receiveAttack([0,0])
         }).toThrow()
      })

      it.skip("Prevents repeated miss", () => {
         gameboard.receiveAttack([0,1])
         expect(() => {
            gameboard.receiveAttack([0,1])
         }).toThrow()
      })
   })
})

describe("Player class", () => {

})

describe("Computer class", () => {

})

