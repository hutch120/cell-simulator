import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'

test('renders Cell Simulator title', () => {
  render(<App />)
  const linkElement = screen.getByText(/Cell Simulator/i)
  expect(linkElement).toBeInTheDocument()
})
