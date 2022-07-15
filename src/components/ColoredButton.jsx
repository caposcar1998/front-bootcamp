import { Button } from '@mui/material'
import { styled } from '@mui/material/styles'

const ColoredButton = styled(Button)({
  backgroundColor: '#000028',
  '&:hover': {
    backgroundColor: '#23D2AA'
  }
})

export default ColoredButton
