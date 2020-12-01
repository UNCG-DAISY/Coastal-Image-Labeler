import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import Container from '@material-ui/core/Container'
import { SubmitButton } from '@/components/Button/premadeButtons'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'

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

export function ShowCustomModel(props) {
  const classes = useStyles()

  const { open, closeModel, message } = props

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
              <Typography variant="body1" component="h1" gutterBottom>
                <Paper elevation={3} variant="outlined" style={{ padding: 10 }}>
                  {message}
                </Paper>
              </Typography>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <div>
                  <SubmitButton
                    variant="outlined"
                    onClick={() => {
                      closeModel(false)
                    }}
                  >
                    OK
                  </SubmitButton>
                </div>
              </div>
            </Container>
          </div>
        </Fade>
      </Modal>
    </div>
  )
}
