import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { UserForm } from 'components'

export default function User() {
  const [queryParams] = useSearchParams()
  const userId = queryParams.get('id')

  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (userId) {
      setLoading(true)
      axios
        .get(`/api/v1/users/${userId}`)
        .then(({ data }) => {
          setUser(data)
        })
        .catch(() => {
          setUser({})
          setError(true)
        })
    }
  }, [userId])

  return (
    <UserForm loadingUser={loading} errorFetchingUser={error} user={user} />
  )
}
