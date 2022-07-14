import { useState } from 'react'
import { Box, Button, Paper, TextField } from '@mui/material'
import { styled } from '@mui/material/styles'

const isValidEmail = (email) => {
  const re = /^([a-zA-Z0–9._%-]+@[a-zA-Z0–9.-]+\.[a-zA-Z]{2,6})*$/
  return email !== '' && re.test(String(email).toLowerCase())
}

const isValidPassword = (password) => {
  const re =
    /(?=(.*[0-9]))(?=.*[!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/
  return password !== '' && re.test(String(password))
}

async function encryptPassword(password) {
  const msgUint8 = new TextEncoder().encode(password)
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
  return hashHex
}

const StyledTextField = styled(TextField)({
  marginBottom: '24px',
  '& label.Mui-focused': {
    color: '#000028'
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#000028'
    },
    '&:hover fieldset': {
      borderColor: '#23D2AA'
    },
    '&.Mui-focused fieldset': {
      borderColor: '#23D2AA'
    }
  }
})

const ColoredButton = styled(Button)({
  backgroundColor: '#000028',
  '&:hover': {
    backgroundColor: '#23D2AA'
  }
})

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
      const encryptedPassword = await encryptPassword(userData.password)
      // TODO: AXIOS POST request to server
      // TODO: Redirect to dashboard if ok
      // TODO: Error message if not ok
      console.log(`Email: ${userData.email} Password: ${encryptedPassword}`)
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
