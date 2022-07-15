import { useState } from 'react'
import { Box, Paper } from '@mui/material'
import { ColoredButton, StyledTextField } from '.'
import { isValidEmail, isValidPassword } from 'utils'

export default function LoginForm() {
  const [userData, setUserData] = useState({
    email: '',
    password: ''
  })

  const [dataError, setDataError] = useState({
    email: false,
    password: false
  })

  const handleChange = (event) => {
    setDataError({ ...dataError, [event.target.name]: false })
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

  const handleSubmit = async (event) => {
    if (isValidEmail(userData.email) && isValidPassword(userData.password)) {
      // TODO: AXIOS POST request to server
      // TODO: Redirect to dashboard if ok
      // TODO: Error message if not ok
      console.log(`Email: ${userData.email} Password: ${userData.password}`)
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
            error={dataError.email}
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
            error={dataError.password}
            helperText={
              dataError.password
                ? 'Password must be at least 8 characters long and contain at least one number, one special character and one uppercase letter'
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
            variant="contained"
          >
            SIGN IN
          </ColoredButton>
        </Box>
      </Paper>
    </Box>
  )
}
