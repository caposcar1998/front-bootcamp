import { useEffect, useState } from 'react'
import axios from 'axios'
import { UsersTable } from 'components'
import { BACKEND_URL } from 'constant'

const columns = [
  { id: 'id', label: 'ID' },
  { id: 'name', label: 'Name' },
  { id: 'email', label: 'Email' },
  { id: 'update', label: '' },
  { id: 'delete', label: '' }
]

const fetchUsers = async () => {
  const results = await axios.get(`${BACKEND_URL}/api/v1/users`)
  return results.data
}

export default function Users() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [refetch, setRefetch] = useState(true)

  useEffect(() => {
    if (refetch) {
      setLoading(true)
      fetchUsers()
        .then((data) => {
          setUsers(
            data.map((user) => ({
              ...user,
              name: `${user.firstName} ${user.lastName}`
            }))
          )
          setLoading(false)
          setRefetch(false)
        })
        .catch(() => {
          setError(true)
          setLoading(false)
          setRefetch(false)
        })
    }
  }, [refetch])

  return (
    <UsersTable
      columns={columns}
      errorFetchingUsers={error}
      loadingUsers={loading}
      users={users}
      refetch={setRefetch}
    />
  )
}
