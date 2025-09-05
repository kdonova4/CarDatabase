import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import App from './App'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

// Mock axios
const mock = new MockAdapter(axios)

describe("App integration flow", () => {
  beforeEach(() => {
    mock.reset() // clear any previous mocks
    sessionStorage.clear()
  })

  it("logs in and fetches cars", async () => {
    // 1. Mock login response
    mock.onPost(`${import.meta.env.VITE_API_URL}/login`).reply(200, {}, {
      authorization: "Bearer fake-jwt-token"
    })

    // 2. Mock GET cars response
    mock.onGet(`${import.meta.env.VITE_API_URL}/api/cars`).reply(200, {
      _embedded: {
        cars: [
          {
            brand: "Toyota",
            model: "Corolla",
            color: "Blue",
            registrationNumber: "ABC-123",
            modelYear: 2020,
            price: 15000,
            _links: {
              self: { href: "http://localhost/api/cars/1" },
              car: { href: "http://localhost/api/cars/1" }
            }
          }
        ]
      }
    })

    // render app to be able to fire events
    render(<App />)

    // 3. Enter username + password
    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "testuser" }
    })
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "testpass" }
    })

    // 4. Click Login
    fireEvent.click(screen.getByRole("button", { name: /login/i }))

    // 5. Wait for DataGrid row to appear
    await waitFor(() => {
      expect(screen.getByText(/Toyota/i)).toBeDefined()
      expect(screen.getByText(/Corolla/i)).toBeDefined()
      expect(screen.getByText(/Blue/i)).toBeDefined()
    })
  })
})