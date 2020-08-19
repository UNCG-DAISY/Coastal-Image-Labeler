import React from 'react'
import Box from '@material-ui/core/Box'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'

import { Alert, AlertTitle } from '@material-ui/lab'
import Button from '@material-ui/core/Button'

import { CatalogSelectionData } from '../../../../../interfaces'
import { theme } from '../../../theme'
import { useRowStyles } from '../Styles'
import { SubTable } from './Subtable'

interface Props {
  row: CatalogSelectionData
}

export function Row(props: Props) {
  const { row } = props
  const [open, setOpen] = React.useState(false)
  const classes = useRowStyles()

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.totalImages}</TableCell>
        <TableCell align="right">{row.catalogInfo.year}</TableCell>
        <TableCell align="right">
          <Button
            href={row.catalogInfo.link}
            color="primary"
            size="small"
            variant="contained"
            target="_blank"
            rel="noreferrer"
          >
            More Info
          </Button>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Alert
                severity="info"
                color="info"
                variant="outlined"
                style={{ marginBottom: theme.spacing(1) }}
              >
                <AlertTitle>Info</AlertTitle>
                <Typography variant="h6" gutterBottom component="div">
                  {row.catalogInfo.description}
                </Typography>
              </Alert>
              <SubTable row={row} />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}
