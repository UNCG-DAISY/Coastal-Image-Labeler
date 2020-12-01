import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import TableHead from '@material-ui/core/TableHead'
import { useRowStyles } from '@/components/Tables/Styles'
import React from 'react'
import { ZenodoInfo } from '@/interfaces/index'
import { ColoredLink } from '@/components/ColoredLink'
import { theme } from '@/components/theme'

interface Props {
  row: { zenodoInfo: ZenodoInfo[] }
}

export function SubTable(props: Props) {
  const classes = useRowStyles()
  const { row } = props

  return (
    <Table size="small" aria-label="purchases">
      <TableHead>
        <TableRow className={classes.header}>
          <TableCell className={classes.headerText}> DOI NUMBER</TableCell>
          <TableCell className={classes.headerText}> Date published</TableCell>
          <TableCell className={classes.headerText}> Download link</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {row.zenodoInfo.map((zenodoRow, index) => (
          <TableRow key={zenodoRow.doi + index}>
            <TableCell component="th" scope="row">
              {zenodoRow.doi}
            </TableCell>
            <TableCell>{zenodoRow.created}</TableCell>
            <TableCell>
              <ColoredLink
                style={{ color: theme.palette.secondary.main }}
                href={zenodoRow.links}
                target="_blank"
              >
                {zenodoRow.links}
              </ColoredLink>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
