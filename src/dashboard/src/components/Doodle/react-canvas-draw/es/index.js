/* eslint-disable prefer-rest-params */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-redeclare */
// @ts-nocheck
const _extends =
  Object.assign ||
  function (target) {
    for (let i = 1; i < arguments.length; i++) {
      const source = arguments[i]
      for (const key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key]
        }
      }
    }
    return target
  }

let _class, _temp

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function')
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    )
  }
  return call && (typeof call === 'object' || typeof call === 'function')
    ? call
    : self
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError(
      'Super expression must either be null or a function, not ' +
        typeof superClass
    )
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true,
    },
  })
  if (superClass)
    Object.setPrototypeOf
      ? Object.setPrototypeOf(subClass, superClass)
      : (subClass.__proto__ = superClass)
}

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { LazyBrush } from 'lazy-brush'
import { Catenary } from 'catenary-curve'

import ResizeObserver from 'resize-observer-polyfill'

import drawImage from './drawImage'

function midPointBtw(p1, p2) {
  return {
    x: p1.x + (p2.x - p1.x) / 2,
    y: p1.y + (p2.y - p1.y) / 2,
  }
}

const canvasStyle = {
  display: 'block',
  position: 'absolute',
}

const canvasTypes = [
  {
    name: 'interface',
    zIndex: 15,
  },
  {
    name: 'drawing',
    zIndex: 11,
  },
  {
    name: 'temp',
    zIndex: 12,
  },
  {
    name: 'grid',
    zIndex: 10,
  },
]

const dimensionsPropTypes = PropTypes.oneOfType([
  PropTypes.number,
  PropTypes.string,
])

const _default =
  ((_temp = _class = (function (_PureComponent) {
    _inherits(_default, _PureComponent)

    function _default(props) {
      _classCallCheck(this, _default)

      const _this = _possibleConstructorReturn(
        this,
        _PureComponent.call(this, props)
      )

      _this.componentWillUnmount = function () {
        _this.canvasObserver.unobserve(_this.canvasContainer)
      }

      _this.drawImage = function () {
        if (!_this.props.imgSrc) return

        // Load the image
        _this.image = new Image()

        // Prevent SecurityError "Tainted canvases may not be exported." #70
        //_this.image.crossOrigin = "anonymous";

        // Draw the image once loaded
        _this.image.onload = function () {
          return drawImage({ ctx: _this.ctx.grid, img: _this.image })
        }
        _this.image.src = _this.props.imgSrc
      }

      _this.undo = function () {
        const lines = _this.lines.slice(0, -1)
        _this.clear()
        _this.simulateDrawingLines({ lines: lines, immediate: true })
        _this.triggerOnChange()
      }

      _this.getSaveData = function () {
        // Construct and return the stringified saveData object
        return JSON.stringify({
          lines: _this.lines,
          width: _this.props.canvasWidth,
          height: _this.props.canvasHeight,
        })
      }

      _this.loadSaveData = function (saveData) {
        const immediate =
          arguments.length > 1 && arguments[1] !== undefined
            ? arguments[1]
            : _this.props.immediateLoading

        if (typeof saveData !== 'string') {
          throw new Error('saveData needs to be of type string!')
        }

        const _JSON$parse = JSON.parse(saveData),
          lines = _JSON$parse.lines,
          width = _JSON$parse.width,
          height = _JSON$parse.height

        if (!lines || typeof lines.push !== 'function') {
          throw new Error('saveData.lines needs to be an array!')
        }

        _this.clear()

        if (
          width === _this.props.canvasWidth &&
          height === _this.props.canvasHeight
        ) {
          _this.simulateDrawingLines({
            lines: lines,
            immediate: immediate,
          })
        } else {
          // we need to rescale the lines based on saved & current dimensions
          const scaleX = _this.props.canvasWidth / width
          const scaleY = _this.props.canvasHeight / height
          const scaleAvg = (scaleX + scaleY) / 2

          _this.simulateDrawingLines({
            lines: lines.map(function (line) {
              return _extends({}, line, {
                points: line.points.map(function (p) {
                  return {
                    x: p.x * scaleX,
                    y: p.y * scaleY,
                  }
                }),
                brushRadius: line.brushRadius * scaleAvg,
              })
            }),
            immediate: immediate,
          })
        }
      }

      _this.simulateDrawingLines = function (_ref) {
        const lines = _ref.lines,
          immediate = _ref.immediate

        // Simulate live-drawing of the loaded lines
        // TODO use a generator
        let curTime = 0
        const timeoutGap = immediate ? 0 : _this.props.loadTimeOffset

        lines.forEach(function (line) {
          const points = line.points,
            brushColor = line.brushColor,
            brushRadius = line.brushRadius

          // Draw all at once if immediate flag is set, instead of using setTimeout

          if (immediate) {
            // Draw the points
            _this.drawPoints({
              points: points,
              brushColor: brushColor,
              brushRadius: brushRadius,
            })

            // Save line with the drawn points
            _this.points = points
            _this.saveLine({ brushColor: brushColor, brushRadius: brushRadius })
            return
          }

          // Use timeout to draw

          const _loop = function _loop(i) {
            curTime += timeoutGap
            window.setTimeout(function () {
              _this.drawPoints({
                points: points.slice(0, i + 1),
                brushColor: brushColor,
                brushRadius: brushRadius,
              })
            }, curTime)
          }

          for (let i = 1; i < points.length; i++) {
            _loop(i)
          }

          curTime += timeoutGap
          window.setTimeout(function () {
            // Save this line with its props instead of this.props
            _this.points = points
            _this.saveLine({ brushColor: brushColor, brushRadius: brushRadius })
          }, curTime)
        })
      }

      _this.handleDrawStart = function (e) {
        e.preventDefault()

        // Start drawing
        _this.isPressing = true

        const _this$getPointerPos = _this.getPointerPos(e),
          x = _this$getPointerPos.x,
          y = _this$getPointerPos.y

        if (e.touches && e.touches.length > 0) {
          // on touch, set catenary position to touch pos
          _this.lazy.update({ x: x, y: y }, { both: true })
        }

        // Ensure the initial down position gets added to our line
        _this.handlePointerMove(x, y)
      }

      _this.handleDrawMove = function (e) {
        e.preventDefault()

        const _this$getPointerPos2 = _this.getPointerPos(e),
          x = _this$getPointerPos2.x,
          y = _this$getPointerPos2.y

        _this.handlePointerMove(x, y)
      }

      _this.handleDrawEnd = function (e) {
        e.preventDefault()

        // Draw to this end pos
        _this.handleDrawMove(e)

        // Stop drawing & save the drawn line
        _this.isDrawing = false
        _this.isPressing = false
        _this.saveLine()
      }

      _this.handleCanvasResize = function (entries, observer) {
        const saveData = _this.getSaveData()
        for (
          var _iterator = entries,
            _isArray = Array.isArray(_iterator),
            _i = 0,
            _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();
          ;

        ) {
          var _ref2

          if (_isArray) {
            if (_i >= _iterator.length) break
            _ref2 = _iterator[_i++]
          } else {
            _i = _iterator.next()
            if (_i.done) break
            _ref2 = _i.value
          }

          const entry = _ref2
          const _entry$contentRect = entry.contentRect,
            width = _entry$contentRect.width,
            height = _entry$contentRect.height

          _this.setCanvasSize(_this.canvas.interface, width, height)
          _this.setCanvasSize(_this.canvas.drawing, width, height)
          _this.setCanvasSize(_this.canvas.temp, width, height)
          _this.setCanvasSize(_this.canvas.grid, width, height)

          _this.drawGrid(_this.ctx.grid)
          _this.drawImage()
          _this.loop({ once: true })
        }
        _this.loadSaveData(saveData, true)
      }

      _this.setCanvasSize = function (canvas, width, height) {
        canvas.width = width
        canvas.height = height
        canvas.style.width = width
        canvas.style.height = height
      }

      _this.getPointerPos = function (e) {
        const rect = _this.canvas.interface.getBoundingClientRect()

        // use cursor pos as default
        let clientX = e.clientX
        let clientY = e.clientY

        // use first touch if available
        if (e.changedTouches && e.changedTouches.length > 0) {
          clientX = e.changedTouches[0].clientX
          clientY = e.changedTouches[0].clientY
        }

        // return mouse/touch position inside canvas
        return {
          x: clientX - rect.left,
          y: clientY - rect.top,
        }
      }

      _this.handlePointerMove = function (x, y) {
        if (_this.props.disabled) return

        _this.lazy.update({ x: x, y: y })
        const isDisabled = !_this.lazy.isEnabled()

        if (
          (_this.isPressing && !_this.isDrawing) ||
          (isDisabled && _this.isPressing)
        ) {
          // Start drawing and add point
          _this.isDrawing = true
          _this.points.push(_this.lazy.brush.toObject())
        }

        if (_this.isDrawing) {
          // Add new point
          _this.points.push(_this.lazy.brush.toObject())

          // Draw current points
          _this.drawPoints({
            points: _this.points,
            brushColor: _this.props.brushColor,
            brushRadius: _this.props.brushRadius,
          })
        }

        _this.mouseHasMoved = true
      }

      _this.drawPoints = function (_ref3) {
        const points = _ref3.points,
          brushColor = _ref3.brushColor,
          brushRadius = _ref3.brushRadius

        _this.ctx.temp.lineJoin = 'round'
        _this.ctx.temp.lineCap = 'round'
        _this.ctx.temp.strokeStyle = brushColor

        _this.ctx.temp.clearRect(
          0,
          0,
          _this.ctx.temp.canvas.width,
          _this.ctx.temp.canvas.height
        )
        _this.ctx.temp.lineWidth = brushRadius * 2

        let p1 = points[0]
        let p2 = points[1]

        _this.ctx.temp.moveTo(p2.x, p2.y)
        _this.ctx.temp.beginPath()

        for (let i = 1, len = points.length; i < len; i++) {
          // we pick the point between pi+1 & pi+2 as the
          // end point and p1 as our control point
          const midPoint = midPointBtw(p1, p2)
          _this.ctx.temp.quadraticCurveTo(p1.x, p1.y, midPoint.x, midPoint.y)
          p1 = points[i]
          p2 = points[i + 1]
        }
        // Draw last line as a straight line while
        // we wait for the next point to be able to calculate
        // the bezier control point
        _this.ctx.temp.lineTo(p1.x, p1.y)
        _this.ctx.temp.stroke()
      }

      _this.saveLine = function () {
        const _ref4 =
            arguments.length > 0 && arguments[0] !== undefined
              ? arguments[0]
              : {},
          brushColor = _ref4.brushColor,
          brushRadius = _ref4.brushRadius

        if (_this.points.length < 2) return

        // Save as new line
        _this.lines.push({
          points: [].concat(_this.points),
          brushColor: brushColor || _this.props.brushColor,
          brushRadius: brushRadius || _this.props.brushRadius,
        })

        // Reset points array
        _this.points.length = 0

        const width = _this.canvas.temp.width
        const height = _this.canvas.temp.height

        // Copy the line to the drawing canvas
        _this.ctx.drawing.drawImage(_this.canvas.temp, 0, 0, width, height)

        // Clear the temporary line-drawing canvas
        _this.ctx.temp.clearRect(0, 0, width, height)

        _this.triggerOnChange()
      }

      _this.triggerOnChange = function () {
        _this.props.onChange && _this.props.onChange(_this)
      }

      _this.clear = function () {
        _this.lines = []
        _this.valuesChanged = true
        _this.ctx.drawing.clearRect(
          0,
          0,
          _this.canvas.drawing.width,
          _this.canvas.drawing.height
        )
        _this.ctx.temp.clearRect(
          0,
          0,
          _this.canvas.temp.width,
          _this.canvas.temp.height
        )
      }

      _this.loop = function () {
        const _ref5 =
            arguments.length > 0 && arguments[0] !== undefined
              ? arguments[0]
              : {},
          _ref5$once = _ref5.once,
          once = _ref5$once === undefined ? false : _ref5$once

        if (_this.mouseHasMoved || _this.valuesChanged) {
          const pointer = _this.lazy.getPointerCoordinates()
          const brush = _this.lazy.getBrushCoordinates()

          _this.drawInterface(_this.ctx.interface, pointer, brush)
          _this.mouseHasMoved = false
          _this.valuesChanged = false
        }

        if (!once) {
          window.requestAnimationFrame(function () {
            _this.loop()
          })
        }
      }

      _this.drawGrid = function (ctx) {
        if (_this.props.hideGrid) return

        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

        ctx.beginPath()
        ctx.setLineDash([5, 1])
        ctx.setLineDash([])
        ctx.strokeStyle = _this.props.gridColor
        ctx.lineWidth = 0.5

        const gridSize = 25

        let countX = 0
        while (countX < ctx.canvas.width) {
          countX += gridSize
          ctx.moveTo(countX, 0)
          ctx.lineTo(countX, ctx.canvas.height)
        }
        ctx.stroke()

        let countY = 0
        while (countY < ctx.canvas.height) {
          countY += gridSize
          ctx.moveTo(0, countY)
          ctx.lineTo(ctx.canvas.width, countY)
        }
        ctx.stroke()
      }

      _this.drawInterface = function (ctx, pointer, brush) {
        if (_this.props.hideInterface) return

        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

        // Draw brush preview
        ctx.beginPath()
        ctx.fillStyle = _this.props.brushColor
        ctx.arc(brush.x, brush.y, _this.props.brushRadius, 0, Math.PI * 2, true)
        ctx.fill()

        // Draw mouse point (the one directly at the cursor)
        ctx.beginPath()
        ctx.fillStyle = _this.props.catenaryColor
        ctx.arc(pointer.x, pointer.y, 4, 0, Math.PI * 2, true)
        ctx.fill()

        // Draw catenary
        if (_this.lazy.isEnabled()) {
          ctx.beginPath()
          ctx.lineWidth = 2
          ctx.lineCap = 'round'
          ctx.setLineDash([2, 4])
          ctx.strokeStyle = _this.props.catenaryColor
          _this.catenary.drawToCanvas(
            _this.ctx.interface,
            brush,
            pointer,
            _this.chainLength
          )
          ctx.stroke()
        }

        // Draw brush point (the one in the middle of the brush preview)
        ctx.beginPath()
        ctx.fillStyle = _this.props.catenaryColor
        ctx.arc(brush.x, brush.y, 2, 0, Math.PI * 2, true)
        ctx.fill()
      }

      _this.canvas = {}
      _this.ctx = {}

      _this.catenary = new Catenary()

      _this.points = []
      _this.lines = []

      _this.mouseHasMoved = true
      _this.valuesChanged = true
      _this.isDrawing = false
      _this.isPressing = false
      return _this
    }

    _default.prototype.componentDidMount = function componentDidMount() {
      const _this2 = this

      this.lazy = new LazyBrush({
        radius: this.props.lazyRadius * window.devicePixelRatio,
        enabled: true,
        initialPoint: {
          x: window.innerWidth / 2,
          y: window.innerHeight / 2,
        },
      })
      this.chainLength = this.props.lazyRadius * window.devicePixelRatio

      this.canvasObserver = new ResizeObserver(function (entries, observer) {
        return _this2.handleCanvasResize(entries, observer)
      })
      this.canvasObserver.observe(this.canvasContainer)

      this.drawImage()
      this.loop()

      window.setTimeout(function () {
        const initX = window.innerWidth / 2
        const initY = window.innerHeight / 2
        _this2.lazy.update(
          { x: initX - _this2.chainLength / 4, y: initY },
          { both: true }
        )
        _this2.lazy.update(
          { x: initX + _this2.chainLength / 4, y: initY },
          { both: false }
        )
        _this2.mouseHasMoved = true
        _this2.valuesChanged = true
        _this2.clear()

        // Load saveData from prop if it exists
        if (_this2.props.saveData) {
          _this2.loadSaveData(_this2.props.saveData)
        }
      }, 100)
    }

    _default.prototype.componentDidUpdate = function componentDidUpdate(
      prevProps
    ) {
      if (prevProps.lazyRadius !== this.props.lazyRadius) {
        // Set new lazyRadius values
        this.chainLength = this.props.lazyRadius * window.devicePixelRatio
        this.lazy.setRadius(this.props.lazyRadius * window.devicePixelRatio)
      }

      if (prevProps.saveData !== this.props.saveData) {
        this.loadSaveData(this.props.saveData)
      }

      if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
        // Signal this.loop function that values changed
        this.valuesChanged = true
      }
    }

    _default.prototype.render = function render() {
      const _this3 = this

      return React.createElement(
        'div',
        {
          className: this.props.className,
          style: _extends(
            {
              display: 'block',
              background: this.props.backgroundColor,
              touchAction: 'none',
              width: this.props.canvasWidth,
              height: this.props.canvasHeight,
            },
            this.props.style
          ),
          ref: function ref(container) {
            if (container) {
              _this3.canvasContainer = container
            }
          },
        },
        canvasTypes.map(function (_ref6) {
          const name = _ref6.name,
            zIndex = _ref6.zIndex

          const isInterface = name === 'interface'
          return React.createElement('canvas', {
            key: name,
            ref: function ref(canvas) {
              if (canvas) {
                _this3.canvas[name] = canvas
                _this3.ctx[name] = canvas.getContext('2d')
              }
            },
            style: _extends({}, canvasStyle, { zIndex: zIndex }),
            onMouseDown: isInterface ? _this3.handleDrawStart : undefined,
            onMouseMove: isInterface ? _this3.handleDrawMove : undefined,
            onMouseUp: isInterface ? _this3.handleDrawEnd : undefined,
            onMouseOut: isInterface ? _this3.handleDrawEnd : undefined,
            onTouchStart: isInterface ? _this3.handleDrawStart : undefined,
            onTouchMove: isInterface ? _this3.handleDrawMove : undefined,
            onTouchEnd: isInterface ? _this3.handleDrawEnd : undefined,
            onTouchCancel: isInterface ? _this3.handleDrawEnd : undefined,
          })
        })
      )
    }

    return _default
  })(PureComponent)),
  (_class.propTypes = {
    onChange: PropTypes.func,
    loadTimeOffset: PropTypes.number,
    lazyRadius: PropTypes.number,
    brushRadius: PropTypes.number,
    brushColor: PropTypes.string,
    catenaryColor: PropTypes.string,
    gridColor: PropTypes.string,
    backgroundColor: PropTypes.string,
    hideGrid: PropTypes.bool,
    canvasWidth: dimensionsPropTypes,
    canvasHeight: dimensionsPropTypes,
    disabled: PropTypes.bool,
    imgSrc: PropTypes.string,
    saveData: PropTypes.string,
    immediateLoading: PropTypes.bool,
    hideInterface: PropTypes.bool,
  }),
  (_class.defaultProps = {
    onChange: null,
    loadTimeOffset: 5,
    lazyRadius: 12,
    brushRadius: 10,
    brushColor: '#444',
    catenaryColor: '#0a0302',
    gridColor: 'rgba(150,150,150,0.17)',
    backgroundColor: '#FFF',
    hideGrid: false,
    canvasWidth: 400,
    canvasHeight: 400,
    disabled: false,
    imgSrc: '',
    saveData: '',
    immediateLoading: false,
    hideInterface: false,
  }),
  _temp)

export { _default as default }
