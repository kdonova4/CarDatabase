import { render, screen } from '@testing-library/react'

import { describe, expect, it, test } from 'vitest'
import App from './App'
describe("App tests", () => {
  it("component renders", () => {
    render(<App />)
    expect(screen.getByText(/Car Shop/i)).toBeDefined()
  })
})