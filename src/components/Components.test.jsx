import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import LoginForm from './LoginForm'
import { BrowserRouter } from 'react-router-dom'

test('Renders Login form', () => {
  render(<BrowserRouter> <LoginForm/> </BrowserRouter>)
  const linkElement = screen.getByText(/SIGN IN/i)
  expect(linkElement).toBeInTheDocument()
})
