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
  onChange: () => void
  disabled: boolean
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
    onChange,
    disabled,
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
      onChange={onChange}
      disabled={disabled}
    />
  )
}
