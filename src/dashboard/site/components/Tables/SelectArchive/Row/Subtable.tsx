import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import TableHead from '@material-ui/core/TableHead'
import Button from '@material-ui/core/Button'

import { useRowStyles } from '../Styles'
import { CatalogSelectionData } from '../../../../../interfaces'

interface Props {
  row: CatalogSelectionData
}

export function SubTable(props: Props) {
  const classes = useRowStyles()
  const { row } = props
  return (
    <Table size="small" aria-label="purchases">
      <TableHead>
        <TableRow className={classes.header}>
          <TableCell className={classes.headerText}>Archive</TableCell>
          <TableCell className={classes.headerText}>Total Images</TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {row.archives.map((archiveRow, index) => (
          <TableRow key={archiveRow.name + index}>
            <TableCell component="th" scope="row">
              {archiveRow.name}
            </TableCell>
            <TableCell>{archiveRow.totalImages}</TableCell>
            <TableCell>
              <Button
                href={`/auth/tag/${row._id}/${archiveRow._id}`}
                color="primary"
                size="small"
                variant="contained"
              >
                Tag
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
