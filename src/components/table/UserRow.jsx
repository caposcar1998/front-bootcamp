import { IconButton, TableRow, TableCell, Tooltip } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import BorderColorIcon from '@mui/icons-material/BorderColor'

export default function UserRow({ user: { id, name, email } }) {
  return (
    <TableRow hover role="checkbox" tabIndex={-1}>
      <TableCell align="center">{id}</TableCell>
      <TableCell align="center">{name}</TableCell>
      <TableCell align="center">{email}</TableCell>
      <TableCell align="center">
        <Tooltip title="Update user">
          <IconButton>
            <BorderColorIcon sx={{ color: '#23D2AA' }} />
          </IconButton>
        </Tooltip>
      </TableCell>
      <TableCell align="center">
        <Tooltip title="Delete user">
          <IconButton>
            <DeleteIcon sx={{ color: 'red' }} />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  )
}
