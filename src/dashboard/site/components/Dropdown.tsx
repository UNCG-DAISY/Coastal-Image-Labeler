import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
//import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

import { CatalogSelectionData } from '../../interfaces'

interface Props {
  data: CatalogSelectionData[]
  selectedItem: string
  setItem: React.Dispatch<React.SetStateAction<string>>
  label: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
)

export function Dropdown(props: Props) {
  const { data, selectedItem, setItem, label } = props
  const classes = useStyles()

  const filteredData = data.map((value, index) => {
    return {
      name: value.name,
      value: index,
    }
  })

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setItem(event.target.value as string)
  }

  return (
    <div>
      <FormControl className={classes.formControl} variant="outlined">
        {/* <InputLabel id="demo-simple-select-helper-label">{label}</InputLabel> */}
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={selectedItem}
          onChange={handleChange}
        >
          <MenuItem value="">None</MenuItem>
          {filteredData.map((value, index) => {
            return (
              <MenuItem key={value.name + index} value={value.value}>
                {value.name}
              </MenuItem>
            )
          })}
        </Select>
        <FormHelperText>Please select {label}</FormHelperText>
      </FormControl>
    </div>
  )
}
