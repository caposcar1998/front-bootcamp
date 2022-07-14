import { UsersTable } from 'components'

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

export default function Users() {
  return <UsersTable columns={columns} users={fakeUsers} />
}
