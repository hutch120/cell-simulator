import React from 'react'
import { CELL_SIZE } from './Constants'
import Cell, { CellProps } from '../components/Cell'
import StateMachine from './StateMachine'
import { Outer, Grid } from '../components/styled/Board'

export interface BoardProps {
    rows: number,
    cols: number,
    boardRef: React.RefObject<HTMLDivElement>,
    cells: CellProps[],
    setCells: React.Dispatch<React.SetStateAction<CellProps[]>>
}

export default function Board ({ rows, cols, boardRef, cells, setCells } : BoardProps) {
  const boardWrapperSize = {
    height: rows * CELL_SIZE,
    width: cols * CELL_SIZE
  }

  const boardSize = {
    ...boardWrapperSize,
    backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px`
  }

  return <Outer>
          <Grid style={boardSize}
            onClick={(event : React.MouseEvent<HTMLElement>) => StateMachine.handleClickBoard(event, setCells, boardRef)}
            ref={boardRef}>
            {cells.map((cell) => {
              const cellKey = `${cell.x},${cell.y}`
              return <Cell x={cell.x} y={cell.y} key={cellKey} />
            })}
          </Grid>
      </Outer>
}
