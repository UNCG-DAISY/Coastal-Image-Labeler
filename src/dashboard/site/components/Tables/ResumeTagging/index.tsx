import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

import { ResumeTaggingDataCatalog } from '../../../../interfaces'
import { useRowStyles } from './Styles'
import { Row } from './Row'
import { SkeletonTable } from './skeleton'

interface Props {
  data: ResumeTaggingDataCatalog[]
}

export function ResumeTagging(props: Props) {
  const { data } = props
  const classes = useRowStyles()

  return data?.length === 0 || !data ? (
    <SkeletonTable />
  ) : (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow className={classes.header}>
            <TableCell />
            <TableCell className={classes.headerText}>Catalog</TableCell>
            <TableCell className={classes.headerText} align="right">
              Tagged/Total
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
          {data.map((row: ResumeTaggingDataCatalog, index) => (
            <Row key={row.name + ' ' + index} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
