import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  IconButton,
  Paper,
  Stack,
  Skeleton,
  TableContainer,
  Table,
  TableBody,
  TablePagination,
  TableCell,
  Tooltip
} from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { TableHeader, UserRow } from '.'

export default function UsersTable({
  columns,
  errorFetchingUsers,
  loadingUsers,
  refetch,
  users
}) {
  const navigate = useNavigate()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const handleAddUser = () => {
    navigate('/user')
  }

  return (
    <Paper
      elevation={3}
      sx={{ backgroundColor: 'whitesmoke', height: '80%', width: '80%' }}
    >
      <Box
        position="relative"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="space-between"
        padding={1}
        height="100%"
        width="100%"
        overflow="hidden"
        color="#000028"
      >
        <TableContainer>
          <Table>
            <TableHeader columns={columns} />
            <TableBody>
              {loadingUsers ? (
                <TableCell colSpan={5}>
                  <Stack width="100%" spacing={1}>
                    <Skeleton
                      animation="wave"
                      variant="rectangular"
                      width="100%"
                      height={50}
                    />
                    <Skeleton
                      animation="wave"
                      variant="rectangular"
                      width="100%"
                      height={50}
                    />
                    <Skeleton
                      animation="wave"
                      variant="rectangular"
                      width="100%"
                      height={50}
                    />
                    <Skeleton
                      animation="wave"
                      variant="rectangular"
                      width="100%"
                      height={50}
                    />
                    <Skeleton
                      animation="wave"
                      variant="rectangular"
                      width="100%"
                      height={50}
                    />
                    <Skeleton
                      animation="wave"
                      variant="rectangular"
                      width="100%"
                      height={50}
                    />
                    <Skeleton
                      animation="wave"
                      variant="rectangular"
                      width="100%"
                      height={50}
                    />
                  </Stack>
                </TableCell>
              ) : errorFetchingUsers ? (
                <TableCell colSpan={5}>
                  Something went wrong and users could not be loaded
                </TableCell>
              ) : users.length ? (
                users
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((user, pos) => {
                    return (
                      <UserRow
                        key={`${pos}User${user.id}`}
                        user={user}
                        refetch={refetch}
                      />
                    )
                  })
              ) : (
                <TableCell colSpan={5}>No users registered yet...</TableCell>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <Tooltip
          sx={{ position: 'absolute', right: 24, top: 12 }}
          title="Add user"
        >
          <IconButton onClick={handleAddUser}>
            <AddCircleIcon fontSize="large" sx={{ color: '#23D2AA' }} />
          </IconButton>
        </Tooltip>
      </Box>
    </Paper>
  )
}
