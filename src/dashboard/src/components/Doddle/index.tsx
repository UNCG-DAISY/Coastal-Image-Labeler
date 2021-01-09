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
import { FormControlLabel, IconButton } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import ReplayIcon from '@material-ui/icons/Replay'
import Divider from '@material-ui/core/Divider'
import CanvasDraw from './canvasDraw'
// const testImage =
//   'https://nationalinterest.org/sites/default/files/main_images/G69%20%281%29.jpg'

interface Props {
  questionSet: QuestionSetDocument
  imageDocument: ImageDocument
}

export default function DoddleOnImage(props: Props) {
  const { questionSet } = props
  const drawingImage =
    'https://nationalinterest.org/sites/default/files/main_images/G69%20%281%29.jpg' //imageDocument.path.compressed
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
  const [saveableCanvas, setSaveableCanvas] = useState(
    useRef<{ getSaveData: any }>(null)
  )
  //let saveableCanvas = useRef<{ getSaveData: any }>(null)
  const [loadingImage, setLoadingImage] = useState('loading')
  // let loadableCanvas = useRef<{ getSaveData: any }>(null)

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

  useEffect(() => {
    const img = new Image()
    img.src = drawingImage
    img.onload = () => {
      updateImageRatio(img.height, img.width, imgMaxSize)
      setImgWidth(img.width)
      setImgHeight(img.height)
      setImgMaxSize(doddleQuestion.largestAxisMaxSize)
      setLoadingImage('loaded')
    }
    img.onerror = () => {
      setLoadingImage('error')
    }
    console.log(saveableCanvas)
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
              // canvasWidth={imgWidth * imageRatio}
              // canvasHeight={imgHeight * imageRatio}
              // loadTimeOffset={10}
              // imgSrc={drawingImage}
              // ref={(canvasDraw) => (saveableCanvas = canvasDraw)}
              // brushColor={brushColor}
              // lazyRadius={lazyRadius}
              // brushRadius={brushSize}
              imgWidth={imgWidth}
              imageRatio={imageRatio}
              imgHeight={imgHeight}
              drawingImage={drawingImage}
              saveableCanvas={setSaveableCanvas}
              brushColor={brushColor}
              lazyRadius={lazyRadius}
              brushSize={brushSize}
            />
            <Divider style={{ marginTop: 10, marginBottom: 20 }} />
            {/* <TextField
              id="imgSizer"
              type="number"
              helperText="Image Size (largest axis)"
              defaultValue={imgMaxSize}
              onChange={(event) => {
                const val = parseInt(event.target.value)
                setImgMaxSize(parseInt(event.target.value))
                updateImageRatio(imgHeight, imgWidth, val)
              }}
              disabled
            /> */}

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <TextField
                  id="brushSizer"
                  type="number"
                  helperText="Size of brush"
                  defaultValue={doddleQuestion.initBrushSize}
                  onChange={(event) => {
                    setBrushSize(
                      parseInt(event.target.value) ??
                        doddleQuestion.initBrushSize
                    )
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
                <TextField
                  id="lazySizer"
                  type="number"
                  helperText="Size of lazy radius"
                  defaultValue={doddleQuestion.initLazyRadius}
                  onChange={(event) => {
                    setLazyRadius(
                      parseInt(event.target.value) ??
                        doddleQuestion.initLazyRadius
                    )
                  }}
                  style={{ maxWidth: 140 }}
                  value={lazyRadius}
                />
                <FormControlLabel
                  control={
                    <IconButton
                      aria-label="Reset lazy radius"
                      component="span"
                      size="small"
                    >
                      <ReplayIcon />
                    </IconButton>
                  }
                  label={'reset'}
                  onClick={() => {
                    setLazyRadius(doddleQuestion.initLazyRadius)
                  }}
                  style={{ marginLeft: 5, marginTop: 10 }}
                />
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
      </div>
    )
  }

  return <div>{determineContent()}</div>
}
