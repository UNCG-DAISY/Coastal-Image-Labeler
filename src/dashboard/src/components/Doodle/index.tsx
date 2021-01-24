import React, { useEffect, useState } from 'react'
// import CanvasDraw from 'react-canvas-draw'

import Skeleton from '@material-ui/lab/Skeleton'
import TextField from '@material-ui/core/TextField'
import {
  DoodleQuestion,
  ImageDocument,
  QuestionSetDocument,
  QuestionSetQuestions,
} from '@/interfaces/models'
// import Button from '@material-ui/core/Button'
import ErrorCard from '@/components/ErrorCards'
import BrushIcon from '@material-ui/icons/Brush'
import { Button, FormControlLabel, IconButton } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import ReplayIcon from '@material-ui/icons/Replay'
import Divider from '@material-ui/core/Divider'
// import CanvasDraw from './canvasDraw'
import { routes } from '@/components/Constants'
// import LineHistoryTable from './lineHistory'
import { SubmitButton, SkipButton } from '@/components/Button/premadeButtons'
import { SuccessErrorBar } from '@/components/Snackbar'
import { UserProp } from '@/interfaces/index'
import { submitDoodleImageTags } from '@/components/API/post/submitDoodleTags'
import Router from 'next/router'
import { useSvgDrawing } from 'react-hooks-svgdrawing'
import { ViewImage } from '@/components/Button/premadeButtons'
// const testImage =
//   'https://nationalinterest.org/sites/default/files/main_images/G69%20%281%29.jpg'

interface Props {
  questionSet: QuestionSetDocument
  imageDocument: ImageDocument
  user: UserProp
  // skipImage: ()=>void
}

export default function DoodleOnImage(props: Props) {
  const { questionSet, imageDocument, user } = props
  const drawingImage = routes.getReq.showImage('compressed', imageDocument._id) //testImage

  const doodleQuestion: DoodleQuestion = questionSet.questions.filter(
    (question: QuestionSetQuestions) => {
      if (question.type == 'doodleDraw') return true
    }
  )[0]

  const [imgWidth, setImgWidth] = useState(0)
  const [imgHeight, setImgHeight] = useState(0)
  const [imageRatio, setRatio] = useState(1)
  const [imgMaxSize, setImgMaxSize] = useState(
    doodleQuestion.largestAxisMaxSize
  )

  const [brushColor, setBrushColor] = useState(
    doodleQuestion.colors[0].color ?? '#000000'
  )
  const [brushSize, setBrushSize] = useState(doodleQuestion.initBrushSize)
  const [loadingImage, setLoadingImage] = useState('loading')
  const [globalDisable, setGlobalDisable] = useState(false)
  const [openSnackbar, setSnackbar] = React.useState(false)
  const [snackbarTime, setSnackbarTime] = React.useState(2000)
  const [snackbarStatus, setSnackbarStatus] = React.useState(false)
  const [snackbarMessage, setSnackbarMessage] = React.useState('')

  const [renderRefDraw, drawingCanvas] = useSvgDrawing({
    penWidth: brushSize, // pen width
    penColor: brushColor, // pen color
  })

  function updateImageRatio(
    height: number,
    width: number,
    imgMaxAxisSize: number
  ) {
    if (height <= 0 || width <= 0 || imgMaxAxisSize <= 0) {
      return
    }

    let ratio = imageRatio ?? 1
    if (height > width) {
      ratio = imgMaxAxisSize / height
    } else {
      ratio = imgMaxAxisSize / width
    }
    setRatio(ratio)
  }

  function submitButtonDisabled() {
    return globalDisable
  }

  async function onSubmitDoodle(doodleData) {
    setGlobalDisable(true)
    const submitData = {
      userId: user.data._id,
      imageId: imageDocument._id as string,
      tags: {
        type: 'doodle',
        originalImgWidth: imgWidth,
        originalImgHeight: imgHeight,
        imageRatio: imageRatio,
        imgWidth: imgWidth * imageRatio,
        imgHeight: imgHeight * imageRatio,
        imgMaxSize: imgMaxSize,
        ...doodleData,
      },
      date: Date.now(),
    }
    console.log(submitData)
    // do api call
    const resSubmitTag = await submitDoodleImageTags({ body: submitData })

    setSnackbarMessage(resSubmitTag.message)

    if (resSubmitTag.success) {
      setSnackbarStatus(true)
      setSnackbar(true)
      setSnackbarMessage(
        `${resSubmitTag.message} - Getting new image in ${
          snackbarTime / 1000
        } seconds`
      )
      setTimeout(() => {
        Router.reload()
      }, snackbarTime)
    } else {
      setSnackbar(true)
      setSnackbarTime(999999)
      setSnackbarStatus(false)
    }
  }

  function updatePenWidth(size: number) {
    if (size <= 0) {
      size = 1
    }
    setBrushSize(size)
    drawingCanvas.changePenWidth(size)
  }
  useEffect(() => {
    const img = new Image()
    img.src = drawingImage
    img.onload = () => {
      updateImageRatio(img.height, img.width, imgMaxSize)
      setImgWidth(img.width)
      setImgHeight(img.height)
      setImgMaxSize(doodleQuestion.largestAxisMaxSize)
      setLoadingImage('loaded')
    }
    img.onerror = () => {
      setLoadingImage('error')
    }
  }, [])

  function determineContent() {
    if (loadingImage == 'loading')
      return <Skeleton variant="rect" width={512} height={512} />

    if (loadingImage == 'error') {
      return (
        <ErrorCard
          message={
            'An error has occured loading image. Please Contact an Admin.'
          }
          title="Error"
        />
      )
    }

    return (
      <div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <ViewImage
                style={{ marginRight: 10 }}
                onClick={() => {
                  window.open(
                    routes.getReq.showImage('compressed', imageDocument._id),
                    'Compressed Image'
                  )
                }}
              >
                View compressed image
              </ViewImage>
              <ViewImage
                onClick={() => {
                  window.open(
                    routes.getReq.showImage('original', imageDocument._id),
                    'Full Image'
                  )
                }}
              >
                View full image
              </ViewImage>
            </div>
            <Divider style={{ marginTop: 10, marginBottom: 20 }} />
            <div
              style={{
                width: imgWidth * imageRatio,
                height: imgHeight * imageRatio,
                backgroundImage: `url(${drawingImage})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
              }}
              ref={renderRefDraw}
            />
            <Divider style={{ marginTop: 10, marginBottom: 20 }} />

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <TextField
                  id="brushSizer"
                  type="number"
                  helperText="Size of brush"
                  onChange={(event) => {
                    const size =
                      parseInt(event.target.value) ??
                      doodleQuestion.initBrushSize
                    updatePenWidth(size)
                  }}
                  style={{ maxWidth: 100 }}
                  value={brushSize}
                />
                <FormControlLabel
                  control={
                    <IconButton
                      aria-label="Reset size"
                      component="span"
                      size="small"
                      color="secondary"
                    >
                      <ReplayIcon />
                    </IconButton>
                  }
                  label={'reset'}
                  onClick={() => {
                    updatePenWidth(doodleQuestion.initBrushSize)
                  }}
                  style={{ marginLeft: 5, marginTop: 10 }}
                />
              </div>
              <div>
                <Button
                  variant="outlined"
                  color="secondary"
                  startIcon={<ReplayIcon />}
                  onClick={() => {
                    drawingCanvas.undo()
                  }}
                  style={{ marginTop: 5 }}
                >
                  Undo
                </Button>
              </div>
            </div>

            {/* <Divider style={{ marginTop: 10, marginBottom: 20 }} /> */}

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: 20,
                marginBottom: 20,
              }}
            >
              <div>
                <SkipButton
                  variant="outlined"
                  onClick={() => {
                    onSubmitDoodle({})
                  }}
                  disabled={globalDisable}
                >
                  Skip
                </SkipButton>
              </div>
              <div>
                <SubmitButton
                  type="submit"
                  onClick={() => {
                    onSubmitDoodle({
                      svg: drawingCanvas.getSvgXML(),
                    })
                  }}
                  disabled={submitButtonDisabled()}
                >
                  Submit
                </SubmitButton>
              </div>
            </div>

            <Divider style={{ marginTop: 10, marginBottom: 20 }} />
          </div>
        </div>

        <div>
          <Grid
            container
            alignContent="center"
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            {doodleQuestion.colors.map((color, index) => {
              return (
                <Grid item key={`color-${index}`}>
                  <Button
                    variant="outlined"
                    color="inherit"
                    startIcon={<BrushIcon style={{ color: color.color }} />}
                    style={{ margin: 5 }}
                    onClick={() => {
                      drawingCanvas.changePenColor(color.color)
                      setBrushColor(color.color)
                    }}
                  >
                    {color.label}
                  </Button>
                </Grid>
              )
            })}
          </Grid>
        </div>

        <Divider style={{ marginTop: 10, marginBottom: 20 }} />

        {openSnackbar && (
          <SuccessErrorBar
            duration={snackbarTime}
            message={snackbarMessage}
            success={snackbarStatus}
          />
        )}
      </div>
    )
  }

  return <div>{determineContent()}</div>
}
