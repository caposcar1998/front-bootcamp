import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Login from './Login'
import NoPage from './NoPage'
import User from './User'
import Users from './Users'

test('Renders Login ', () => {
  render(<Login />)
  const linkElement = screen.getByText(/SIGN IN/i)
  expect(linkElement).toBeInTheDocument()
})

test('Renders No page', () => {
  render(<NoPage />)
  const linkElement = screen.getByText(/Create user/i)
  expect(linkElement).toBeInTheDocument()
})

test('Renders user', () => {
  render(<User />)
  const linkElement = screen.getByText(/Create user/i)
  expect(linkElement).toBeInTheDocument()
})

test('Renders users', () => {
  render(<Users />)
  const linkElement = screen.getByText(/Create user/i)
  expect(linkElement).toBeInTheDocument()
})
