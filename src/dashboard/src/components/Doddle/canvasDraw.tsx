// @ts-nocheck
import CanvasDraw from './react-canvas-draw/es'

interface Props {
  imgWidth: number
  imageRatio: number
  imgHeight: number
  drawingImage: string
  saveableCanvas: any
  brushColor: string
  lazyRadius: number
  brushSize: number
}

export default function MyCanvas(props: Props) {
  const {
    imgWidth,
    imageRatio,
    imgHeight,
    drawingImage,
    saveableCanvas,
    brushColor,
    lazyRadius,
    brushSize,
  } = props
  return (
    <CanvasDraw
      canvasWidth={imgWidth * imageRatio}
      canvasHeight={imgHeight * imageRatio}
      loadTimeOffset={10}
      imgSrc={drawingImage}
      ref={(canvasDraw) => saveableCanvas(canvasDraw)}
      brushColor={brushColor}
      lazyRadius={lazyRadius}
      brushRadius={brushSize}
    />
  )
}
