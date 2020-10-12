import React from 'react'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import { useRowStyles } from '../../Styles'

interface Props {
  row: string
  selectedCheckBox: any
  selectedCatalogsData: any
}

export function Row(props: Props) {
  const { row, selectedCheckBox, selectedCatalogsData } = props

  const classes = useRowStyles()

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell component="th" scope="row">
          {console.log(
            'selectedCatalogsData',
            selectedCatalogsData,
            'row.name',
            row
          )}
          <input
            id={row}
            checked={selectedCatalogsData.indexOf(row) >= 0}
            onChange={(event) => {
              event.stopPropagation()
              selectedCheckBox(row)
            }}
            type="checkbox"
          ></input>
          <label htmlFor={row}></label>
        </TableCell>
        <TableCell>{row}</TableCell>
      </TableRow>
    </React.Fragment>
  )
}
