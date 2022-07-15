import { useState } from 'react'
import {
  Box,
  Paper,
  TableContainer,
  Table,
  TableBody,
  TablePagination
} from '@mui/material'
import { TableHeader, UserRow } from '.'

export default function UsersTable({ columns, users }) {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <Paper
      elevation={3}
      sx={{ backgroundColor: 'whitesmoke', height: '80%', width: '80%' }}
    >
      <Box
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
              {users
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user, pos) => {
                  return <UserRow key={`${pos}User${user.id}`} user={user} />
                })}
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
      </Box>
    </Paper>
  )
}
