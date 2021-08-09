import React, { useState, useRef, useEffect } from 'react'
import { CELL_SIZE } from './Constants'
import Cell, { CellProps } from '../components/Cell'
import Controls from './Controls'

import { AppWrapper } from '../components/styled/AppWrapper'
import { Board } from '../components/styled/Board'
import { ControlsWrapper } from '../components/styled/ControlsWrapper'
import { Button } from '../components/styled/Button'
import { Title } from '../components/styled/Title'
import { Input, InputWrapper } from '../components/styled/Input'

interface GameProps {
  rowsInitial: number,
  colsInitial: number
}

export default function Game ({ rowsInitial, colsInitial } : GameProps) {
  const [cells, setCells] = useState<CellProps[]>([])
  const [rows, setRows] = useState(rowsInitial)
  const [cols, setColumns] = useState(colsInitial)
  const [isRunning, setIsRunning] = useState(false)
  const [interval, setInterval] = useState(100)
  const boardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    Controls.initalise(rows, cols)
  }, [rows, cols])

  useEffect(() => {
    (isRunning) ? Controls.run(interval, setCells) : Controls.stop()
  }, [isRunning])

  const boardStyle = {
    height: rows * CELL_SIZE,
    width: cols * CELL_SIZE,
    backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px`
  }

  return <AppWrapper>
      <Title>Cell Simulator</Title>

      <ControlsWrapper>
        <InputWrapper>
          Update every
          <Input value={interval} onChange={(event: React.FormEvent<HTMLInputElement>) =>
            Controls.handleIntervalChange(event, setInterval)} />
            msec
        </InputWrapper>
        <InputWrapper>
          Rows
          <Input value={rows} onChange={(event: React.FormEvent<HTMLInputElement>) =>
            Controls.handleRowsChange(event, setRows)} />
        </InputWrapper>
        <InputWrapper>
          Columns
          <Input value={cols} onChange={(event: React.FormEvent<HTMLInputElement>) =>
            Controls.handleColsChange(event, setColumns)} />
        </InputWrapper>

        <Button onClick={() => {
          setIsRunning(false)
          Controls.runIteration(setCells)
        }}>Iterate</Button>
        {isRunning && <Button onClick={() => setIsRunning(false)}>Stop</Button>}
        {!isRunning && <Button onClick={() => setIsRunning(true)}>Run</Button>}
        <Button onClick={() => {
          setIsRunning(false)
          Controls.handleRandom(setCells)
        }}>Random</Button>
        <Button onClick={() => {
          setIsRunning(false)
          Controls.handleClear(setCells)
        }}>Clear</Button>
        <Button onClick={() => {
          setIsRunning(false)
          Controls.handleTest1(setCells)
        }}>Test1</Button>
        <Button onClick={() => {
          setIsRunning(false)
          Controls.handleTest2(setCells)
        }}>Test2</Button>
      </ControlsWrapper>

      <Board style={boardStyle}
        onClick={(event : React.MouseEvent<HTMLElement>) => Controls.handleClickBoard(event, setCells, boardRef)}
        ref={boardRef}>
        {cells.map((cell) => {
          const cellKey = `${cell.x},${cell.y}`
          return <Cell x={cell.x} y={cell.y} key={cellKey} />
        })}
      </Board>
    </AppWrapper>
}
