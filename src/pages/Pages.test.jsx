import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Login from './Login'
import NoPage from './NoPage'
import User from './User'
import Users from './Users'
import { BrowserRouter } from 'react-router-dom'

test('Renders Login ', () => {
  render(<BrowserRouter> <Login /> </BrowserRouter>)
  const linkElement = screen.getByText(/SIGN IN/i)
  expect(linkElement).toBeInTheDocument()
})

test('Renders No page', () => {
  render(<BrowserRouter> <NoPage /> </BrowserRouter>)
  const linkElement = screen.getByText(/Reload/i)
  expect(linkElement).toBeInTheDocument()
})

test('Renders user', () => {
  render(<BrowserRouter> <User /> </BrowserRouter>)
  const linkElement = screen.getByText(/CREATE/i)
  expect(linkElement).toBeInTheDocument()
})

test('Renders users', () => {
  render(<BrowserRouter><Users /> </BrowserRouter>)
  const linkElement = screen.getByText(/id/i)
  expect(linkElement).toBeInTheDocument()
})
