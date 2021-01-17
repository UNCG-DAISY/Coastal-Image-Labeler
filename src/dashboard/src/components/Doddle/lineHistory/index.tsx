import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import { FormControlLabel, IconButton } from '@material-ui/core'
import BrushIcon from '@material-ui/icons/Brush'

const useStyles = makeStyles({
  table: {
    //minWidth: 650,
  },
})

interface Props {
  lines: {
    points: {
      x: number
      y: number
    }[]
    brushColor: string
    brushRadius: 12
  }[]
  saveableCanvas: any
  setLineData: any
}

export default function LineHistroyTable(props: Props) {
  const classes = useStyles()
  const { lines, saveableCanvas, setLineData } = props

  function removeLine(index: number) {
    const saveData = JSON.parse(saveableCanvas.getSaveData() || '{}')

    if (saveData.lines.length == 0) {
      console.log('no length')
      return
    }

    const lines = saveData.lines
    lines.splice(index, 1)

    setLineData(lines)
    const newSaveData = JSON.stringify({
      width: saveData.width,
      height: saveData.height,
      lines: lines,
    })

    console.log(newSaveData)
    saveableCanvas.loadSaveData(newSaveData, true)
  }
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Line #</TableCell>
            <TableCell>Line Color</TableCell>
            <TableCell># of Points</TableCell>
            <TableCell>Brush Radius</TableCell>
            <TableCell>First Point</TableCell>
            <TableCell>Last Point</TableCell>
            <TableCell>Remove</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {lines.map((line, index) => (
            <TableRow key={`${line.brushColor}-${index}`}>
              <TableCell>Line {index + 1}</TableCell>
              <TableCell>
                <FormControlLabel
                  control={
                    <IconButton aria-label="upload picture" component="span">
                      <BrushIcon style={{ color: line.brushColor }} />
                    </IconButton>
                  }
                  label={line.brushColor}
                />
              </TableCell>
              <TableCell>{line.points.length}</TableCell>
              <TableCell>{line.brushRadius}</TableCell>
              <TableCell>
                {`(${line.points[0].x.toFixed(2)},${line.points[0].y.toFixed(
                  2
                )})`}
              </TableCell>
              <TableCell>
                {`(${line.points[line.points.length - 1].x.toFixed(
                  2
                )},${line.points[line.points.length - 1].y.toFixed(2)})`}
              </TableCell>
              <TableCell>
                <IconButton
                  aria-label="Reset size"
                  component="span"
                  size="small"
                  color="secondary"
                  onClick={() => {
                    removeLine(index)
                  }}
                >
                  <DeleteForeverIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
