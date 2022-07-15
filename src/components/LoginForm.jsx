import { useState } from 'react'
import { Box, Paper } from '@mui/material'
import axios from 'axios'
import { ColoredButton, StyledTextField } from '.'
import { BACKEND_URL } from 'constant'
import { isValidEmail, isValidPassword } from 'utils'

export default function LoginForm() {
  const [userData, setUserData] = useState({
    email: '',
    password: ''
  })

  const [loading, setLoading] = useState(false)

  const [dataError, setDataError] = useState({
    email: false,
    password: false,
    login: false
  })

  const handleChange = (event) => {
    setDataError({ ...dataError, login: false, [event.target.name]: false })
    setUserData({
      ...userData,
      [event.target.name]: event.target.value
    })
  }

  const handleError = (event) => {
    if (event.target.name === 'email') {
      return setDataError({
        ...dataError,
        email: !isValidEmail(event.target.value)
      })
    }
    return setDataError({
      ...dataError,
      password: !isValidPassword(event.target.value)
    })
  }

  const handleSubmit = async () => {
    if (isValidEmail(userData.email) && isValidPassword(userData.password)) {
      setLoading(true)
      try {
        const loginResult = await axios.post(
          `${BACKEND_URL}/api/v1/users/login`,
          userData
        )
        if (loginResult.status === 200 && loginResult.data.Id) {
          sessionStorage.setItem('loggedUser', JSON.stringify(loginResult.data))
          window.location.reload()
        } else {
          setDataError({ ...dataError, login: true })
          setLoading(false)
        }
      } catch {
        setDataError({
          ...dataError,
          login: true
        })
        setLoading(false)
      }
    }
    if (!isValidEmail(userData.email)) {
      setDataError((currentData) => ({ ...currentData, email: true }))
    }
    if (!isValidPassword(userData.password)) {
      setDataError((currentData) => ({ ...currentData, password: true }))
    }
  }

  return (
    <Box
      sx={{
        height: '80%',
        minHeight: '200px',
        width: '80%',
        minWidth: '300px',
        margin: '0 auto'
      }}
    >
      <Paper
        sx={{ backgroundColor: 'whitesmoke', height: '100%', width: '100%' }}
        elevation={3}
      >
        <Box
          display="flex"
          flexDirection="column"
          height="100%"
          justifyContent="center"
          padding={4}
          width="100%"
        >
          <StyledTextField
            error={dataError.email || dataError.login}
            helperText={dataError.email ? 'Invalid email address' : ''}
            name="email"
            label="Email"
            type="email"
            variant="outlined"
            value={userData.email}
            onChange={handleChange}
            onBlur={handleError}
          />
          <StyledTextField
            error={dataError.password || dataError.login}
            helperText={
              dataError.password
                ? 'Password must be at least 8 characters long and contain at least one number, one special character and one uppercase letter'
                : dataError.login
                  ? 'Invalid email or password'
                  : ''
            }
            name="password"
            label="Password"
            type="password"
            variant="outlined"
            value={userData.password}
            onChange={handleChange}
            onBlur={handleError}
          />
          <ColoredButton
            onClick={handleSubmit}
            size="large"
            type="submit"
            disabled={loading}
            variant="contained"
          >
            {!loading ? 'SIGN IN' : 'SIGNING IN...'}
          </ColoredButton>
        </Box>
      </Paper>
    </Box>
  )
}
