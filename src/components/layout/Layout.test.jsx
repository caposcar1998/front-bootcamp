import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Footer, Header, Layout } from '.'

test('Renders header', () => {
  render(<Header />)
  const linkElement = screen.getByText(/TAREK/i)
  expect(linkElement).toBeInTheDocument()
})

test('Renders footer', () => {
  render(<Footer />)
  const linkElement = screen.getByText(/BEAT/i)
  expect(linkElement).toBeInTheDocument()
})

test('Renders Layout', () => {
  render(<Layout />)
  const headerElement = screen.getByText(/BEAT/i)
  const footerElement = screen.getByText(/TAREK/i)
  expect(headerElement).toBeInTheDocument()
  expect(footerElement).toBeInTheDocument()
})
