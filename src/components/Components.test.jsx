import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import LoginForm from './LoginForm'
import UserForm from './UserForm'

test('Renders Login form', () => {
  render(<LoginForm />)
  const linkElement = screen.getByText(/SIGN IN/i)
  expect(linkElement).toBeInTheDocument()
})

test('Renders user form', () => {
  render(<UserForm />)
  const linkElement = screen.getByText(/Create user/i)
  expect(linkElement).toBeInTheDocument()
})
