import React, { useState, useRef, useEffect } from 'react'
import { CellProps } from '../components/Cell'
import StateMachine from './StateMachine'
import Controls, { ControlsProps } from './Controls'
import Board, { BoardProps } from './Board'
import { Page, Title, Instructions } from '../components/styled/Game'

interface GameProps {
  rowsInitial: number,
  colsInitial: number
}

export default function Game ({ rowsInitial, colsInitial } : GameProps) {
  const [cells, setCells] = useState<CellProps[]>([])
  const [rows, setRows] = useState(rowsInitial)
  const [cols, setCols] = useState(colsInitial)
  const [isRunning, setIsRunning] = useState(false)
  const [interval, setInterval] = useState(100)
  const boardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    StateMachine.initalise(rows, cols)
  }, [rows, cols])

  useEffect(() => {
    (isRunning) ? StateMachine.run(interval, setCells) : StateMachine.stop()
  }, [isRunning])

  const controlsArgs: ControlsProps = { interval, setInterval, rows, setRows, cols, setCols, isRunning, setIsRunning, setCells }
  const boardArgs: BoardProps = { rows, cols, boardRef, cells, setCells }

  return <Page>
      <Title>Cell Simulator</Title>
      <Instructions>Click the board squares to setup the initial state, or use Random button to randomize the board.</Instructions>
      <Instructions>Then click Run or Iterate button to see the iterations.</Instructions>
      <Controls {...controlsArgs} />
      <Board {...boardArgs} />
    </Page>
}
