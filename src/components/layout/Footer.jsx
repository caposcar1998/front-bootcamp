import { Typography } from '@mui/material'

const currentYear = new Date().getFullYear()

export default function Footer() {
  return (
    <Typography color="#23D2AA" paddingBottom={1} variant="h6">
      BEAT {currentYear}&copy;. All rights reserved.
    </Typography>
  )
}
