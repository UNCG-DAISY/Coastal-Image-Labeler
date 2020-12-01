import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Fade from '@material-ui/core/Fade'
import Container from '@material-ui/core/Container'
import { SkipButton, SubmitButton } from '@/components/Button/premadeButtons'

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

export function ShowZenodo(props) {
  const classes = useStyles()

  const {
    open,
    setOpenModal,
    data,
    onChnageValue,
    error,
    onSubmitValue,
  } = props

  console.log('error123', error)

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
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <Container maxWidth="xl">
              <form>
                {data.map((row) => (
                  <div key={row} className="row">
                    <div className="col-25">
                      <label htmlFor={row}> {row} </label>
                    </div>
                    <div className="col-75">
                      <input
                        style={{
                          width: '100 %',
                          padding: '12px 20px',

                          margin: '6px 0',
                          display: 'inline-block',
                          border: '1px solid #ccc',
                        }}
                        type="text"
                        name={row}
                        id={row}
                        onChange={onChnageValue}
                        placeholder={row}
                      />
                    </div>
                    <div className="col-100">
                      {error[row] ? (
                        <small
                          style={{
                            width: '100 %',
                            marginTop: '0.25rem',
                            fontSize: '80%',
                            color: '#dc3545',
                          }}
                        >
                          {error[row]}
                        </small>
                      ) : (
                        ''
                      )}
                    </div>
                  </div>
                ))}
              </form>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                }}
              >
                <div>
                  <SkipButton
                    variant="outlined"
                    onClick={() => {
                      setOpenModal(false)
                    }}
                  >
                    Cancel
                  </SkipButton>
                </div>
                <div>
                  <SubmitButton type="submit" onClick={onSubmitValue}>
                    Submit
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
