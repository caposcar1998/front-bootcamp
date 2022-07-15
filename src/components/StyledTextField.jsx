import { TextField } from '@mui/material'
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

export default StyledTextField
