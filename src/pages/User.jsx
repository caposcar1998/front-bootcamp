import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { UserForm } from 'components'
import { BACKEND_URL } from 'constant'

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
        .get(`${BACKEND_URL}/api/v1/users/${userId}`)
        .then(({ data }) => {
          setUser(data)
          setLoading(false)
        })
        .catch(() => {
          setUser(null)
          setLoading(false)
          setError(true)
        })
    }
  }, [userId])

  return (
    <UserForm loadingUser={loading} errorFetchingUser={error} user={user} />
  )
}
