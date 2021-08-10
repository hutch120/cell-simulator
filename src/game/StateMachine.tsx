import React from 'react'
import { CellProps } from '../components/Cell'
import { CELL_SIZE } from './Constants'

let intervalID : number | null = null
let board : boolean[][] = []
let rows: number
let cols: number

function initalise (_rows: number, _cols: number) {
  rows = _rows
  cols = _cols
  board = makeEmptyBoard()
}

function run (interval: number, setCells: React.Dispatch<React.SetStateAction<CellProps[]>>) {
  runIteration(setCells)
  intervalID = window.setInterval(() => {
    runIteration(setCells)
  }, interval)
}

function stop () {
  if (intervalID) {
    window.clearInterval(intervalID)
    intervalID = null
  }
}

function makeEmptyBoard (): boolean[][] {
  const emptyBoard : boolean[][] = []
  for (let y = 0; y < rows; y++) {
    emptyBoard[y] = []
    for (let x = 0; x < cols; x++) {
      emptyBoard[y][x] = false
    }
  }
  return emptyBoard
}

function getElementOffset (boardRef: React.RefObject<HTMLDivElement>) {
  const rect = boardRef?.current?.getBoundingClientRect()
  const doc = document.documentElement
  return {
    x: (rect?.left ?? 0 + window.pageXOffset) - doc.clientLeft,
    y: (rect?.top ?? 0 + window.pageYOffset) - doc.clientTop
  }
}

function makeCells (setCells: React.Dispatch<React.SetStateAction<CellProps[]>>) {
  const cells : CellProps[] = []
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (board[y][x]) {
        cells.push({ x, y })
      }
    }
  }
  setCells(cells)
}

function handleClickBoard (event: React.MouseEvent<HTMLElement>, setCells: React.Dispatch<React.SetStateAction<CellProps[]>>, boardRef: React.RefObject<HTMLDivElement>) {
  const elemOffset = getElementOffset(boardRef)
  const offsetX = event.clientX - elemOffset.x
  const offsetY = event.clientY - elemOffset.y
  const x = Math.floor(offsetX / CELL_SIZE)
  const y = Math.floor(offsetY / CELL_SIZE)
  if (x >= 0 && x <= cols && y >= 0 && y <= rows) {
    board[y][x] = !board[y][x]
  }
  makeCells(setCells)
}

function runIteration (setCells: React.Dispatch<React.SetStateAction<CellProps[]>>) {
  const newBoard = makeEmptyBoard()

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const neighbors = calculateNeighbors(board, x, y)
      if (board[y][x]) {
        if (neighbors === 2 || neighbors === 3) {
          newBoard[y][x] = true
        } else {
          newBoard[y][x] = false
        }
      } else {
        if (!board[y][x] && neighbors === 3) {
          newBoard[y][x] = true
        }
      }
    }
  }

  board = newBoard
  makeCells(setCells)
}

/**
     * Calculate the number of neighbors at point (x, y)
     * @param {Array} board
     * @param {int} x
     * @param {int} y
     */
function calculateNeighbors (board: boolean[][], x: number, y: number) {
  let neighbors = 0
  const dirs = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]]
  for (let i = 0; i < dirs.length; i++) {
    const dir = dirs[i]
    const y1 = y + dir[0]
    const x1 = x + dir[1]
    if (x1 >= 0 && x1 < cols && y1 >= 0 && y1 < rows && board[y1][x1]) {
      neighbors++
    }
  }
  return neighbors
}

function handleIntervalChange (event: React.FormEvent<HTMLInputElement>, setInterval: React.Dispatch<React.SetStateAction<number>>) {
  const value = parseInt(event?.currentTarget?.value) || 0
  setInterval(value)
}

function handleRowsChange (event: React.FormEvent<HTMLInputElement>, setRows: React.Dispatch<React.SetStateAction<number>>) {
  const value = parseInt(event?.currentTarget?.value) || 0
  setRows(value)
}

function handleColsChange (event: React.FormEvent<HTMLInputElement>, setCols: React.Dispatch<React.SetStateAction<number>>) {
  const value = parseInt(event?.currentTarget?.value) || 0
  setCols(value)
}

function handleClear (setCells: React.Dispatch<React.SetStateAction<CellProps[]>>) {
  board = makeEmptyBoard()
  makeCells(setCells)
}

function handleRandom (setCells: React.Dispatch<React.SetStateAction<CellProps[]>>) {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      board[y][x] = (Math.random() >= 0.5)
    }
  }
  makeCells(setCells)
}

function handleTest1 (setCells: React.Dispatch<React.SetStateAction<CellProps[]>>) {
  board = makeEmptyBoard()
  board[10][11] = true
  board[10][12] = true
  board[10][13] = true
  board[9][13] = true
  board[8][12] = true
  makeCells(setCells)
}

function handleTest2 (setCells: React.Dispatch<React.SetStateAction<CellProps[]>>) {
  board = makeEmptyBoard()
  board[10][11] = true
  board[10][12] = true
  board[10][13] = true
  board[9][13] = true
  board[8][12] = true
  makeCells(setCells)
}

export default {
  initalise,
  run,
  stop,
  handleClickBoard,
  handleIntervalChange,
  handleRowsChange,
  handleColsChange,
  handleRandom,
  handleClear,
  runIteration,
  handleTest1,
  handleTest2
}
