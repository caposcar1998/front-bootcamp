import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { IconButton, TableRow, TableCell, Tooltip } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import BorderColorIcon from '@mui/icons-material/BorderColor'

export default function UserRow({ user: { id, name, email } }) {
  const navigate = useNavigate()

  const handleUserDeletion = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: `User ${email} will be deleted and you won't be able to revert this!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#23D2AA',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Deleted!', 'The user has been deleted.', 'success')
      }
    })
  }

  const handleUserUpdate = () => {
    navigate(`/user?id=${id}`)
  }

  return (
    <TableRow hover role="checkbox" tabIndex={-1}>
      <TableCell align="center">{id}</TableCell>
      <TableCell align="center">{name}</TableCell>
      <TableCell align="center">{email}</TableCell>
      <TableCell align="center">
        <Tooltip title="Update user">
          <IconButton onClick={handleUserUpdate}>
            <BorderColorIcon sx={{ color: '#23D2AA' }} />
          </IconButton>
        </Tooltip>
      </TableCell>
      <TableCell align="center">
        <Tooltip title="Delete user">
          <IconButton onClick={handleUserDeletion}>
            <DeleteIcon sx={{ color: '#d33' }} />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  )
}
