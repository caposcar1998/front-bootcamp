import { Box } from '@mui/material'
import { Header, Footer } from '.'

export default function Layout({ children }) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100%"
      width="100%"
      justifyContent="space-between"
      alignItems="center"
      textAlign="center"
    >
      <Header />
      <main
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          width: '100%'
        }}
      >
        {children}
      </main>
      <Footer />
    </Box>
  )
}
