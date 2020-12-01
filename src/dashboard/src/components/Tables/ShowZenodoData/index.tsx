import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { useRowStyles } from '../Styles'
import { Row } from './Row'

interface Props {
  data: any[]
  role: any
  zenoButton: any
}

export function ShowZenodoData(props: Props) {
  const { data, zenoButton, role } = props
  const classes = useRowStyles()

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow className={classes.header}>
            <TableCell />
            <TableCell className={classes.headerText}>
              {' '}
              Select A Catalog And Upload To Zenodo
            </TableCell>
            <TableCell className={classes.headerText} align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <Row key={row.name} row={row} zenoButton={zenoButton} role={role} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
