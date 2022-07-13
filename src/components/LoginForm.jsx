import { Box, Button, Paper, TextField } from '@mui/material'
import { styled } from '@mui/material/styles'

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
            id="outlined-basic"
            label="Email"
            type="email"
            variant="outlined"
          />
          <StyledTextField
            id="outlined-basic"
            label="Password"
            type="password"
            variant="outlined"
          />
          <ColoredButton size="large" variant="contained">
            SIGN IN
          </ColoredButton>
        </Box>
      </Paper>
    </Box>
  )
}
