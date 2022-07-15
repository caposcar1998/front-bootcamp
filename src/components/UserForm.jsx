import { Button, Paper, TextField } from '@mui/material'
import { Box } from '@mui/system'
import { useState } from 'react'

export default function UserForm() {
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [username, setUserName] = useState('')
  const [mail, setMail] = useState('')
  const [password, setPassword] = useState('')

  const onTextChange = (e) => setMail(e.target.value)
  const onNameChange = (e) => setName(e.target.value)
  const onAddressChange = (e) => setAddress(e.target.value)
  const onUsernameChange = (e) => setUserName(e.target.value)
  const onPasswordChange = (e) => setPassword(e.target.value)
  const handleSubmit = () => (
    console.log(name, address, username, mail, password)
  )

  return (
    <Paper>
        <h2>Create user</h2>
        <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' },
              alignItems: 'center',
              justifyContent: 'center'
            }}
      noValidate
      autoComplete="off"
    >
        <div>
            <TextField
            onChange={onTextChange}
            value={mail}
            label={'Mail'}
            />
            <TextField
            onChange={onNameChange}
            value={name}
            label={'Name'}
            />
        </div>
        <div>
            <TextField
            onChange={onAddressChange}
            value={address}
            label={'Address'}
            />
            <TextField
            onChange={onUsernameChange}
            value={username}
            label={'Username'}
            />
        </div>
        <div>
            <TextField
            onChange={onPasswordChange}
            value={password}
            label={'Password'}
            type="password"/>
        </div>

        <Button variant="contained" onClick={handleSubmit}>Submit</Button>
        </Box>
    </Paper>
  )
}
