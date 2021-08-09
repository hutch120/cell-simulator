import React from 'react'
import Game from './game/Game'
import { CELL_SIZE, WIDTH, HEIGHT } from './game/Constants'

export default function App () {
  const rows = HEIGHT / CELL_SIZE // default 30
  const cols = WIDTH / CELL_SIZE // default 40

  return <Game rowsInitial={rows} colsInitial={cols} />
}
