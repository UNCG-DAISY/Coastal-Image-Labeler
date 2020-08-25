import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import JSONPretty from 'react-json-pretty'
import { theme, customColors } from '../theme'
// import Typography from '@material-ui/core/Typography';
// import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'

import { ReviewBeforeSubmit } from '../StaticText/home'
import Router from 'next/router'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  })
)

export function ShowTagData(props) {
  const classes = useStyles()

  const { tag, open } = props

  return (
    <div>
      <Modal
        disablePortal
        disableEnforceFocus
        disableAutoFocus
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <Container maxWidth="sm">
              <ReviewBeforeSubmit />

              <JSONPretty
                id="json-pretty"
                data={tag}
                style={{
                  fontSize: '2.0em',
                  backgroundColor: `${theme.palette.background.default}`,
                  paddingLeft: '0.1em',
                }}
                theme={{
                  main: `color:#ffffff;background:${theme.palette.background.default}:#;overflow:auto;`,
                  error: 'color:#ffffff;background:#272822;overflow:auto;',
                  key: `color:${theme.palette.primary.light};`,
                  string: `color:${theme.palette.secondary.light};`,
                  value: `color:${customColors.orange};`,
                  boolean: `color:${customColors.purple};`,
                }}
              />
              <div style={{ justifyContent: 'space-between', display: 'flex' }}>
                <Button variant="outlined" onClick={() => Router.reload()}>
                  Continue
                </Button>
                <Button variant="outlined" onClick={() => Router.reload()}>
                  Error
                </Button>
              </div>
            </Container>
          </div>
        </Fade>
      </Modal>
    </div>
  )
}
