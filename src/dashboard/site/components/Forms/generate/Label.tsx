import React from 'react'
import {
  Typography,
  IconButton,
  makeStyles,
  createStyles,
} from '@material-ui/core'
import HelpTwoToneIcon from '@material-ui/icons/HelpTwoTone'

function generateLabel(props) {
  const classes = useStyles()
  const { label, link } = props
  return (
    <React.Fragment>
      <Typography color="secondary">
        {label}
        <a
          className={classes.link}
          href={link}
          target="_blank"
          rel="noreferrer"
        >
          <IconButton size="small">
            <HelpTwoToneIcon />
          </IconButton>
        </a>
      </Typography>
    </React.Fragment>
  )
}

const useStyles = makeStyles((theme) =>
  createStyles({
    link: {
      textDecoration: 'none',
      color: theme.palette.primary.main,
    },
  })
)

export { generateLabel }
