import { useState } from 'react'
import { Box, Paper } from '@mui/material'
import { ColoredButton, StyledTextField } from '.'
import {
  encryptPassword,
  isValidName,
  isValidEmail,
  isValidPassword
} from 'utils'

export default function UserForm({ user }) {
  const [userData, setUserData] = useState({
    firstName: user?.firstName || '',
    surName: user?.lastName || '',
    email: user?.email || '',
    password: ''
  })

  const [dataError, setDataError] = useState({
    firstName: false,
    surName: false,
    email: false,
    password: false
  })

  const handleNamesChange = (event) => {
    setDataError({ ...dataError, [event.target.name]: false })
    setUserData({
      ...userData,
      [event.target.name]: event.target.value
        ? (
            event.target.value[0]?.toUpperCase() +
            event.target.value.slice(1).toLowerCase()
          ).trim()
        : ''
    })
  }

  const handleSessionDataChange = (event) => {
    setDataError({ ...dataError, [event.target.name]: false })
    setUserData({
      ...userData,
      [event.target.name]: event.target.value
    })
  }

  const handleError = (event) => {
    switch (event.target.name) {
      case 'firstName':
        return setDataError({
          ...dataError,
          firstName: !isValidName(event.target.value)
        })
      case 'surName':
        return setDataError({
          ...dataError,
          surName: !isValidName(event.target.value)
        })
      case 'email':
        return setDataError({
          ...dataError,
          email: !isValidEmail(event.target.value)
        })
      case 'password':
        return setDataError({
          ...dataError,
          password: !isValidPassword(event.target.value)
        })
    }
  }

  const handleSubmit = async (event) => {
    if (
      isValidName(userData.firstName) &&
      isValidName(userData.surName) &&
      isValidEmail(userData.email) &&
      isValidPassword(userData.password)
    ) {
      const encryptedPassword = await encryptPassword(userData.password)
      // TODO: AXIOS POST request to server
      // TODO: Redirect to dashboard if ok
      // TODO: Error message if not ok
      const dataObject = {
        FirstName: userData.firstName,
        LastName: userData.surName,
        Email: userData.email,
        Password: encryptedPassword
      }
      const userDataJson = JSON.stringify(dataObject)
      console.log(`User data: ${userDataJson}`)
    }
    if (!isValidName(userData.firstName)) {
      setDataError((currentData) => ({ ...currentData, firstName: true }))
    }
    if (!isValidName(userData.surName)) {
      setDataError((currentData) => ({ ...currentData, surName: true }))
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
        height: '70%',
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
            error={dataError.firstName}
            helperText={dataError.firstName ? 'Invalid first name' : ''}
            name="firstName"
            label="First name"
            variant="outlined"
            value={userData.firstName}
            onChange={handleNamesChange}
            onBlur={handleError}
          />
          <StyledTextField
            error={dataError.surName}
            helperText={dataError.surName ? 'Invalid last name' : ''}
            name="surName"
            label="Last name"
            variant="outlined"
            value={userData.surName}
            onChange={handleNamesChange}
            onBlur={handleError}
          />
          <StyledTextField
            error={dataError.email}
            helperText={dataError.email ? 'Invalid email address' : ''}
            name="email"
            label="Email"
            type="email"
            variant="outlined"
            value={userData.email}
            onChange={handleSessionDataChange}
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
            onChange={handleSessionDataChange}
            onBlur={handleError}
          />
          <ColoredButton
            onClick={handleSubmit}
            size="large"
            type="submit"
            variant="contained"
          >
            {user ? 'UPDATE' : 'CREATE'}
          </ColoredButton>
        </Box>
      </Paper>
    </Box>
  )
}
