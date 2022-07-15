import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { TableHeader, UserRow, UsersTable } from '.'

const columns = [
  { id: 'id', label: 'ID' },
  { id: 'name', label: 'Name' },
  { id: 'email', label: 'Email' },
  { id: 'update', label: '' },
  { id: 'delete', label: '' }
]

const fakeUsers = [
  { id: 1, name: 'Leanne Graham', email: 'test@test.com' },
  { id: 2, name: 'Ervin Howell', email: 'test2@test.com' },
  { id: 3, name: 'Clementine Bauch', email: 'test3@test.com' }
]

test('Renders table header', () => {
  render(<TableHeader columns={columns} />)
  const linkElement = screen.getByText(/id/i)
  expect(linkElement).toBeInTheDocument()
})

test('Renders rows', () => {
  const user = { id: 1, name: 'John', email: 'oscar@oscar.com' }
  render(<UserRow user={user} />)
  const linkElement = screen.getByText(/John/i)
  expect(linkElement).toBeInTheDocument()
})

test('Renders user table', () => {
  render(<UsersTable columns={columns} users= {fakeUsers}/>)
  const headerElement = screen.getByText(/Leanne Graham/i)
  expect(headerElement).toBeInTheDocument()
})
