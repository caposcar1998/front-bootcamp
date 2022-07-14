import { TableHead, TableRow, TableCell } from '@mui/material'

export default function TableHeader({ columns }) {
  return (
    <TableHead>
      <TableRow>
        {columns.map((column) => (
          <TableCell
            key={column.id}
            align="center"
          >
            {column.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}
