import React, { ReactNode } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox'
// import * as colors from '@material-ui/core/colors/';

interface Props extends CheckboxProps {
  children?: ReactNode
  styles?: {
    box: string
    checked: string
  }
  otherProps?: any
}

export default function ColoredCheckbox(props: Props) {
  const { styles, ...otherProps } = props

  const useStyles = makeStyles({
    root: {
      color: styles.box ?? '',
      '&$checked': {
        color: styles.checked ?? '',
      },
    },
    checked: {},
  })

  const classes = useStyles()

  return (
    <Checkbox
      {...otherProps}
      classes={{
        root: classes.root,
        checked: classes.checked,
      }}
    />
  )
}
