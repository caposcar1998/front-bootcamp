import { Button } from '@mui/material'
import { Container } from '@mui/system'
import { useNavigate } from "react-router-dom";

export default function NoPage() {
  function reloadPage() {
    const navigate = useNavigate()
    const path = '/'
    navigate(path)
  }
  return (
  <Container>
    <h1> No page found </h1>
    <h1>404</h1>
    <Button variant="contained" onClick={reloadPage}>Reload</Button>
  </Container>
  )
}
