import React from 'react'
import { CellProps } from '../components/Cell'
import StateMachine from './StateMachine'

import { Outer, Inner, Content, Button, Input, InputWrapper } from '../components/styled/Controls'

export interface ControlsProps {
  interval: number,
  setInterval: React.Dispatch<React.SetStateAction<number>>,
  rows: number,
  setRows: React.Dispatch<React.SetStateAction<number>>,
  cols: number,
  setCols: React.Dispatch<React.SetStateAction<number>>,
  isRunning: boolean,
  setIsRunning: React.Dispatch<React.SetStateAction<boolean>>,
  setCells: React.Dispatch<React.SetStateAction<CellProps[]>>
}

export default function Controls ({ interval, setInterval, rows, setRows, cols, setCols, isRunning, setIsRunning, setCells } : ControlsProps) {
  return <Outer>
    <Inner>
      <Content>
        <InputWrapper>
          Update every
          <Input value={interval} onChange={(event: React.FormEvent<HTMLInputElement>) =>
            StateMachine.handleIntervalChange(event, setInterval)} />
            msec
        </InputWrapper>
        <InputWrapper>
          Rows
          <Input value={rows} onChange={(event: React.FormEvent<HTMLInputElement>) =>
            StateMachine.handleRowsChange(event, setRows)} />
        </InputWrapper>
        <InputWrapper>
          Columns
          <Input value={cols} onChange={(event: React.FormEvent<HTMLInputElement>) =>
            StateMachine.handleColsChange(event, setCols)} />
        </InputWrapper>

        <Button onClick={() => {
          setIsRunning(false)
          StateMachine.runIteration(setCells)
        }}>Iterate</Button>
        {isRunning && <Button onClick={() => setIsRunning(false)}>Stop</Button>}
        {!isRunning && <Button onClick={() => setIsRunning(true)}>Run</Button>}
        <Button onClick={() => {
          setIsRunning(false)
          StateMachine.handleRandom(setCells)
        }}>Random</Button>
        <Button onClick={() => {
          setIsRunning(false)
          StateMachine.handleClear(setCells)
        }}>Clear</Button>
        <Button onClick={() => {
          setIsRunning(false)
          StateMachine.handleTest1(setCells)
        }}>Test1</Button>
        <Button onClick={() => {
          setIsRunning(false)
          StateMachine.handleTest2(setCells)
        }}>Test2</Button>
        </Content>
        </Inner>
      </Outer>
}
