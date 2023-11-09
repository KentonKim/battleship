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

   it("Displays hidden ship grid", () => {
      gameboard.addShip(new Ship(1), [0,0])
      gameboard.addShip(new Ship(1), [2,2])
      gameboard.addShip(new Ship(1), [5,5])
      gameboard.addShip(new Ship(1), [7,3])
      const mockGrid = Array.from({ length: 10 }, () => Array(10).fill(0))
      expect(gameboard.grid).toEqual(mockGrid)
   })

   it("Displays sunken ship grid", () => {
      gameboard.addShip(new Ship(2), [0,0])
      gameboard.receiveAttack([0,0])
      gameboard.receiveAttack([1,0])
      const mockGrid = Array.from({ length: 10 }, () => Array(10).fill(0))
      mockGrid[0][0] = 3
      mockGrid[1][0] = 3
      expect(gameboard.grid).toEqual(mockGrid)
   })

   it("Displays partial ship grid", () => {
      gameboard.addShip(new Ship(2), [0,0])
      gameboard.receiveAttack([0,0])
      const mockGrid = Array.from({ length: 10 }, () => Array(10).fill(0))
      mockGrid[0][0] = 2
      expect(gameboard.grid).toEqual(mockGrid)
   })

   describe("Actions in game", () => {
      beforeEach(() => {
         gameboard.addShip(ship, [0,0])
      })

      it("Acknowledges a hit", () => {
         expect(gameboard.receiveAttack([0,0])).toBe(false)
      })

      it("Acknowledges a sink", () => {
         gameboard.receiveAttack([0,0])
         gameboard.receiveAttack([1,0])
         gameboard.receiveAttack([2,0])
         expect(gameboard.receiveAttack([3,0])).toBe(true)
      })

      it("Acknowledges a miss", () => {
         expect(gameboard.receiveAttack([0,1])).toBeNull()
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
   let grid

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

   describe("Attacks valid spaces", () => {
      beforeEach(() => {
         grid = Array.from({ length: 5 }, () => Array(5).fill(1))
         grid[3][3] = 0
      })

      it("Easy computer attacks open space", () => {
         computer.difficulty = 0
         expect(computer.playMove(grid)).toEqual([3,3])
      })

      it.skip("Medium computer attacks open space", () => {
         computer.difficulty = 1
         expect(computer.playMove(grid)).toEqual([3,3])
      })

      it.skip("Hard computer attacks open space", () => {
         computer.difficulty = 2
         expect(computer.playMove(grid)).toEqual([3,3])
      })
   })

   describe("Attacks 25% place", () => {
      beforeEach(() => {
         grid = Array.from({ length: 5 }, () => Array(5).fill(0))
         grid[1][1] = 2
      })

      it.skip("Easy computer attacks 25% place", () => {
         computer.difficulty = 0
         let coords = computer.playMove(grid)
         expect(
            [[0,1],[1,0],[1,2],[2,1]].some((element => {
               element[0] === coords[0] && element[1] === coords[1]
            }))
         ).toBe(true)
      })

      it.skip("Medium computer attacks 25% place", () => {
         computer.difficulty = 1
         let coords = computer.playMove(grid)
         expect(
            [[0,1],[1,0],[1,2],[2,1]].some((element => {
               element[0] === coords[0] && element[1] === coords[1]
            }))
         ).toBe(true)
      })

      it.skip("Hard computer attacks 25% place", () => {
         computer.difficulty = 2
         let coords = computer.playMove(grid)
         expect(
            [[0,1],[1,0],[1,2],[2,1]].some((element => {
               element[0] === coords[0] && element[1] === coords[1]
            }))
         ).toBe(true)
      })
   })

   describe("Attacks 100% place", () => {
      beforeEach(() => {
         grid = Array.from({ length: 5 }, () => Array(5).fill(0))
         grid[0][0] = 2
         grid[0][1] = 2
      })

      it.skip("Easy computer attacks 100% place", () => {
         computer.difficulty = 0
         expect(computer.playMove(grid)).toBe([0,2])
      })

      it.skip("Medium computer attacks 100% place", () => {
         computer.difficulty = 1
         expect(computer.playMove(grid)).toBe([0,2])
      })

      it.skip("Hard computer attacks 100% place", () => {
         computer.difficulty = 2
         expect(computer.playMove(grid)).toBe([0,2])
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

