import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

import { CatalogSelectionData } from '../../../../interfaces'
import { useRowStyles } from './Styles'
import { Row } from './Row'

interface Props {
  data: CatalogSelectionData[]
}

export function SelectArchive(props: Props) {
  const { data } = props
  const classes = useRowStyles()

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow className={classes.header}>
            <TableCell />
            <TableCell className={classes.headerText}>Catalog</TableCell>
            <TableCell className={classes.headerText} align="right">
              Total Images
            </TableCell>
            <TableCell className={classes.headerText} align="right">
              Year
            </TableCell>
            <TableCell className={classes.headerText} align="right">
              Link
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
