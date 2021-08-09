import React from 'react'
import { CELL_SIZE } from '../game/Constants'
import { Box } from './styled/Box'

export interface CellProps {
  x: number,
  y: number
}

export default function Cell ({ x, y } : CellProps) {
  return <Box style={{
    left: `${CELL_SIZE * x + 1}px`,
    top: `${CELL_SIZE * y + 1}px`,
    width: `${CELL_SIZE - 1}px`,
    height: `${CELL_SIZE - 1}px`
  }} />
}
