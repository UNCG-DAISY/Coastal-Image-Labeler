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
  selectedCheckBox: any
  selectedCatalogsData: any
}

export function ShowExportData(props: Props) {
  const { data, selectedCheckBox, selectedCatalogsData } = props
  const classes = useRowStyles()

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow className={classes.header}>
            <TableCell className={classes.headerText}>
              <input
                id="all"
                checked={selectedCatalogsData.indexOf('all') >= 0}
                onChange={(event) => {
                  event.stopPropagation()
                  selectedCheckBox('all')
                }}
                type="checkbox"
              ></input>
              <label htmlFor="all"></label>
            </TableCell>
            <TableCell className={classes.headerText}>
              Select Specific user collection to export{' '}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <Row
              key={row}
              row={row}
              selectedCheckBox={selectedCheckBox}
              selectedCatalogsData={selectedCatalogsData}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
