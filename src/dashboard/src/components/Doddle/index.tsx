import React, { useEffect, useRef, useState } from 'react'
// import CanvasDraw from 'react-canvas-draw'

import Skeleton from '@material-ui/lab/Skeleton'
import TextField from '@material-ui/core/TextField'
import {
  DoddleQuestion,
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
import CanvasDraw from './canvasDraw'
import { routes } from '@/components/Constants'
import LineHistoryTable from './lineHistory'
import { SubmitButton, SkipButton } from '@/components/Button/premadeButtons'
import { SuccessErrorBar } from '@/components/Snackbar'
import { UserProp } from '@/interfaces/index'
import { submitDoddleImageTags } from '@/components/API/post/submitDoddleTags'
// const testImage =
//   'https://nationalinterest.org/sites/default/files/main_images/G69%20%281%29.jpg'

interface Props {
  questionSet: QuestionSetDocument
  imageDocument: ImageDocument
  user: UserProp
  // skipImage: ()=>void
}

export default function DoddleOnImage(props: Props) {
  const { questionSet, imageDocument, user } = props
  const drawingImage = routes.getReq.showImage('compressed', imageDocument._id) //testImage

  const doddleQuestion: DoddleQuestion = questionSet.questions.filter(
    (question: QuestionSetQuestions) => {
      if (question.type == 'doddleDraw') return true
    }
  )[0]

  const [imgWidth, setImgWidth] = useState(0)
  const [imgHeight, setImgHeight] = useState(0)
  const [imageRatio, setRatio] = useState(1)
  const [imgMaxSize, setImgMaxSize] = useState(
    doddleQuestion.largestAxisMaxSize
  )

  const [brushColor, setBrushColor] = useState(doddleQuestion.colors[0].color)
  const [brushSize, setBrushSize] = useState(doddleQuestion.initBrushSize)
  const [lazyRadius, setLazyRadius] = useState(doddleQuestion.initLazyRadius)

  let saveableCanvas: any = null
  let setSaveableCanvas: any = null
  ;[saveableCanvas, setSaveableCanvas] = useState(useRef(null))
  const [lineData, setLineData] = useState([])
  //let saveableCanvas = useRef<{ getSaveData: any }>(null)
  const [loadingImage, setLoadingImage] = useState('loading')
  // let loadableCanvas = useRef<{ getSaveData: any }>(null)
  const [globalDisable, setGlobalDisable] = useState(false)
  const [openSnackbar, setSnackbar] = React.useState(false)
  const [snackbarTime, setSnackbarTime] = React.useState(2000)
  const [snackbarStatus, setSnackbarStatus] = React.useState(false)
  const [snackbarMessage, setSnackbarMessage] = React.useState('')
  // function submitDrawing() {
  //   console.log(imageDocument)
  // }

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

    // setImgWidth(ratio * width)
    // setImgHeight(ratio * height)
  }

  function submitButtonDisabled() {
    return !(lineData.length && !globalDisable)
  }

  async function onSubmitDoddle(doddleData) {
    setGlobalDisable(true)
    const submitData = {
      userId: user.data._id,
      imageId: imageDocument._id as string,
      tags: {
        type: 'doddle',
        ...doddleData,
      },
      date: Date.now(),
    }

    // do api call
    await submitDoddleImageTags({ body: submitData })

    setSnackbar(true)
    setSnackbarStatus(true)
    setSnackbarMessage('Image dooddle submited')
    setSnackbarTime(2000)
    console.log(submitData)
  }
  useEffect(() => {
    const img = new Image()
    img.src = drawingImage
    img.onload = () => {
      updateImageRatio(img.height, img.width, imgMaxSize)
      setImgWidth(img.width)
      setImgHeight(img.height)
      setImgMaxSize(doddleQuestion.largestAxisMaxSize)
      setLoadingImage('loaded')
      setLazyRadius(doddleQuestion.initLazyRadius)
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
            {/* @ts-ignore */}
            <CanvasDraw
              imgWidth={imgWidth}
              imageRatio={imageRatio}
              imgHeight={imgHeight}
              drawingImage={drawingImage}
              saveableCanvas={setSaveableCanvas}
              brushColor={brushColor}
              lazyRadius={lazyRadius}
              brushSize={brushSize}
              onChange={() => {
                const objData = JSON.parse(saveableCanvas.getSaveData() || '{}')
                setLineData(objData.lines)
              }}
              disabled={globalDisable}
            />
            <Divider style={{ marginTop: 10, marginBottom: 20 }} />

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <TextField
                  id="brushSizer"
                  type="number"
                  helperText="Size of brush"
                  onChange={(event) => {
                    let size =
                      parseInt(event.target.value) ??
                      doddleQuestion.initBrushSize
                    if (size <= 0) {
                      size = 1
                    }
                    setBrushSize(size)
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
                    setBrushSize(doddleQuestion.initBrushSize)
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
                    saveableCanvas.undo()
                  }}
                  style={{ marginTop: 5 }}
                >
                  Undo
                </Button>
              </div>
            </div>

            <Divider style={{ marginTop: 10, marginBottom: 20 }} />

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <SkipButton
                  variant="outlined"
                  onClick={() => {
                    onSubmitDoddle({})
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
                    onSubmitDoddle(JSON.parse(saveableCanvas.getSaveData()))
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
            {doddleQuestion.colors.map((color, index) => {
              return (
                <Grid item key={`color-${index}`}>
                  <FormControlLabel
                    control={
                      <IconButton aria-label="upload picture" component="span">
                        <BrushIcon style={{ color: color.color }} />
                      </IconButton>
                    }
                    label={color.label}
                    onClick={() => {
                      setBrushColor(color.color)
                    }}
                  />
                </Grid>
              )
            })}
          </Grid>
        </div>

        <Divider style={{ marginTop: 10, marginBottom: 20 }} />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {lineData.length == 0 ? (
            <div>Start drawing to see line data</div>
          ) : (
            <LineHistoryTable
              lines={lineData}
              setLineData={setLineData}
              saveableCanvas={saveableCanvas}
            />
          )}
        </div>

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
