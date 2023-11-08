/* eslint-disable no-undef */
import { Ship, Gameboard, Computer, Battlelog, Player } from "./classes"

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

 it("Indicates correct orientation", () => {
   expect(ship.isVertical).toBe(true)
 })

 it("Indicates correct orientation after changing", () => {
   ship.isVertical = false
   expect(ship.isVertical).toBe(false)
 })

})

describe("Gameboard class", () => {
   let gameboard
   let ship

   beforeEach(() => {
      gameboard = new Gameboard()
      ship = new Ship(4)
   })

   it("Invalid place due to vertical bounds", () => {
      expect(() => {
         gameboard.addShip(ship, [7,2])
      }).toThrow()
   })

   it("Invalid place due to horizontal bounds", () => {
      expect(() => {
         ship.isVertical = false
         gameboard.addShip(ship, [0,8])
      }).toThrow()
   })

   it("Invalid place to put due to ship in way", () => {
      gameboard.addShip(ship, [0,3])
      const newShip = new Ship(3, false)
      expect(() => {
         gameboard.addShip(newShip, [2,1])
      }).toThrow()
   })

   it.skip("Invalid place to put due to ship nearby", () => {
      gameboard.addShip(ship, [0,3])
      const newShip = new Ship(2, false)
      expect(() => {
         gameboard.addShip(newShip, [2,1])
      }).toThrow()
      expect(() => {
         gameboard.addShip(newShip, [4,4])
      }).toThrow()
   })

   it("Valid place to put vertical ship", () => {
      expect(gameboard.addShip(ship, [0,0])).toBe(true)
   })

   it("Valid place to put horizontal ship", () => {
      ship.isVertical = false
      expect(gameboard.addShip(ship, [0,0])).toBe(true)
   })

   describe("Actions in game", () => {
      beforeEach(() => {
         gameboard.addShip(ship, [0,0])
      })

      it("Acknowledges a hit", () => {
         expect(gameboard.receiveAttack([0,0])).toBe(true)
      })

      it("Acknowledges a miss", () => {
         expect(gameboard.receiveAttack([0,1])).toBe(false)
      })

      it("Acknowledges a wipeout", () => {
         for (let i = 0; i < 4; i += 1) {
            gameboard.receiveAttack([i,0])
         }
         expect(gameboard.isWiped()).toBe(true)
      })

      it("Acknowledges a continued game", () => {
         for (let i = 0; i < 3; i += 1) {
            gameboard.receiveAttack([i,0])
         }
         expect(gameboard.isWiped()).toBe(false)
      })

      it("Prevents repeated hit", () => {
         gameboard.receiveAttack([0,0])
         expect(() => {
            gameboard.receiveAttack([0,0])
         }).toThrow()
      })

      it("Prevents repeated miss", () => {
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
   let computer 
   beforeEach(() => {
      computer = new Computer('Comp')
   })

   it("Allows for changing difficulty", () => {
      expect(() => {
        computer.difficulty = 0 
      }).not.toThrow()
   })

   it("Prevents incorrectly changing difficulty", () => {
      expect(() => {
         computer.difficulty = 10
      }).toThrow()
   })

   describe("Computer moves", () => {
      // Initialize a board

      describe("Easy computer moves", () => {
         beforeAll(() => {
            computer.difficulty = 0
         })

         it.skip("Easy computer attacks random place", () => {

         })

         it.skip("Easy computer attacks 25% place", () => {

         })

         it.skip("Easy computer attacks 25% place", () => {

         })
      })

      describe("Med computer moves", () => {
         beforeAll(() => {
            computer.difficulty = 1
         })
         it.skip("Easy computer attacks calculated place", () => {

         })

      })

      describe("Hard computer moves", () => {
         beforeAll(() => {
            computer.difficulty = 2
         })
         it.skip("Hard computer attacks probable place", () => {

         })

      })
   })
})

describe("Battlelog class", () => {
   let battlelog
   let player1
   let player2

   beforeAll(() => {
      player1 = new Player('user')
      player2 = new Player('computer')
      battlelog = new Battlelog()
      battlelog.addLog(2, player1, [0,0])
      battlelog.addLog(2, player2, [0,1])
      battlelog.addLog(3, player1, [0,2])
   })

   it("Displays log", () => {
      expect(battlelog.log).toEqual([
         {
            turn: 1,
            player: player1,
            result: 2,
            coordinates: [0,0]
         },
         {
            turn: 2,
            player: player2,
            result: 2,
            coordinates: [0,1]
         },
         {
            turn: 3,
            player: player1,
            result: 3,
            coordinates: [0,2]
         }
      ])
   })

   it("Displays filtered log", () => {
      expect(battlelog.filteredLog(player1)).toEqual([
         {
            turn: 1,
            player: player1,
            result: 2,
            coordinates: [0,0]
         },
         {
            turn: 3,
            player: player1,
            result: 3,
            coordinates: [0,2]
         }
      ])
   })
})

