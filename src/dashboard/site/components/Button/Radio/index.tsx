import React, { ReactNode } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Radio, { RadioProps } from '@material-ui/core/Radio'
// import * as colors from '@material-ui/core/colors/';

interface Props extends RadioProps {
  children?: ReactNode
  styles?: {
    circle: string
    checked: string
  }
  otherProps?: any
}

export default function ColoredRadio(props: Props) {
  const { styles, ...otherProps } = props

  const useStyles = makeStyles({
    root: {
      color: styles.circle ?? '',
      '&$checked': {
        color: styles.checked ?? '',
      },
    },
    checked: {},
  })

  const classes = useStyles()

  return (
    <Radio
      {...otherProps}
      classes={{
        root: classes.root,
        checked: classes.checked,
      }}
    />
  )
}
