import { LoginForm } from 'components'
import { Box } from '@mui/material'

export default function Login() {
  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <LoginForm />
      </Box>
    </>
  )
}
