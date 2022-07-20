import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Box, Paper, Stack, Skeleton, Typography } from '@mui/material'
import { ColoredButton, StyledTextField } from '.'
import { isValidName, isValidEmail, isValidPassword } from 'utils'
import { BACKEND_URL } from 'constant'

export default function UserForm({ user, loadingUser, errorFetchingUser }) {
  const navigate = useNavigate()

  const [userData, setUserData] = useState({
    firstName: '',
    surName: '',
    email: '',
    password: ''
  })
  const [changesMade, setChangesMade] = useState(false)

  useEffect(() => {
    if (user) {
      setUserData((currentData) => ({
        ...currentData,
        firstName: user.firstName,
        surName: user.lastName,
        email: user.email
      }))
    }
  }, [user])

  useEffect(() => {
    if (
      user &&
      (user.firstName !== userData.firstName ||
        user.lastName !== userData.surName ||
        user.email !== userData.email ||
        (userData.password !== '' && userData.password !== user.password))
    ) {
      return setChangesMade(true)
    } else if (
      !user &&
      (userData.firstName !== '' ||
        userData.surName !== '' ||
        userData.email !== '' ||
        userData.password !== '')
    ) {
      return setChangesMade(true)
    } else {
      return setChangesMade(false)
    }
  }, [userData])

  const [dataError, setDataError] = useState({
    firstName: false,
    surName: false,
    email: false,
    password: false
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

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
          password: user?.password
            ? !(
                event.target.value === '' || isValidPassword(event.target.value)
              )
            : !isValidPassword(event.target.value)
        })
    }
  }

  const handleSubmit = async () => {
    setError(false)
    if (
      isValidName(userData.firstName) &&
      isValidName(userData.surName) &&
      isValidEmail(userData.email) &&
      (user?.password
        ? userData.password === '' || isValidPassword(userData.password)
        : isValidPassword(userData.password))
    ) {
      setLoading(true)
      const dataObject = {
        firstName: userData.firstName,
        lastName: userData.surName,
        email: userData.email,
        password: userData.password || user.password
      }
      if (user) {
        await axios
          .put(
            `${BACKEND_URL}/api/v1/users/${user.id}?id=${user.id}`,
            dataObject
          )
          .then(() => {
            setLoading(false)
            setError(false)
            navigate('/users')
          })
          .catch(() => {
            setLoading(false)
            setError(true)
          })
      } else {
        await axios
          .post(`${BACKEND_URL}/api/v1/users`, dataObject)
          .then(() => {
            setLoading(false)
            setError(false)
            navigate('/users')
          })
          .catch(() => {
            setLoading(false)
            setError(true)
          })
      }
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
    if (!isValidPassword(userData.password) && !user?.password) {
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
          {loadingUser ? (
            <Stack width="100%" spacing={4}>
              <Skeleton
                animation="wave"
                variant="rectangular"
                width="100%"
                height={50}
              />
              <Skeleton
                animation="wave"
                variant="rectangular"
                width="100%"
                height={50}
              />
              <Skeleton
                animation="wave"
                variant="rectangular"
                width="100%"
                height={50}
              />
              <Skeleton
                animation="wave"
                variant="rectangular"
                width="100%"
                height={50}
              />
            </Stack>
          ) : (
            <>
              <StyledTextField
                error={dataError.firstName}
                helperText={dataError.firstName ? 'Invalid first name' : ''}
                name="firstName"
                label="First name"
                variant="outlined"
                value={userData.firstName}
                onChange={handleNamesChange}
                onBlur={handleError}
                disabled={errorFetchingUser || loading}
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
                disabled={errorFetchingUser || loading}
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
                disabled={errorFetchingUser || loading}
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
                disabled={errorFetchingUser || loading}
              />
            </>
          )}
          <ColoredButton
            onClick={handleSubmit}
            disabled={errorFetchingUser || loading || !changesMade}
            size="large"
            type="submit"
            variant="contained"
          >
            {loading && !user
              ? 'CREATING...'
              : loading
                ? 'UPDATING'
                : user
                  ? 'UPDATE'
                  : 'CREATE'}
          </ColoredButton>
          {errorFetchingUser && (
            <Typography color="red" marginTop={2}>
              Error fetching user data, please reload the page.
            </Typography>
          )}
          {error && (
            <Typography color="red" marginTop={2}>
              Something went wrong, please try again.
            </Typography>
          )}
        </Box>
      </Paper>
    </Box>
  )
}
