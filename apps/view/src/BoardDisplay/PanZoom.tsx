import React from 'react'

import {DisplayControllerProps, Point} from './types'

type Props = DisplayControllerProps & {
  containerRef: React.Ref<HTMLDivElement>
  children?: React.ReactNode
}

const WHEEL_THRESHOLD = 24
const WHEEL_THRESHOLD_LINE = 0

const getEventCenter = (event: WheelEvent | React.MouseEvent): Point => ({
  x: event.pageX / window.innerWidth,
  y: event.pageY / window.innerHeight,
})

export default class PanZoom extends React.Component<Props> {
  panStart: {x: number; y: number} | null
  zoomDeltaY: number
  count: number

  constructor(props: Props) {
    super(props)
    this.panStart = null
    this.zoomDeltaY = 0
    this.count = 0
  }

  handleWheel = (event: WheelEvent) => {
    const threshhold =
      event.deltaMode === event.DOM_DELTA_LINE
        ? WHEEL_THRESHOLD_LINE
        : WHEEL_THRESHOLD

    this.zoomDeltaY += event.deltaY
    this.count =
      Math.sign(event.deltaY) === Math.sign(this.zoomDeltaY)
        ? this.count + 1
        : 1

    if (this.count > threshhold) {
      const direction = Math.sign(-this.zoomDeltaY) || 0
      const {x, y} = getEventCenter(event)

      this.zoomDeltaY = 0
      this.count = 0
      this.props.zoom(direction, x, y)
    }
  }

  handleMouseDown: React.MouseEventHandler = event => {
    this.panStart = getEventCenter(event)
  }

  handleMouseUp: React.MouseEventHandler = _event => {
    this.panStart = null
  }

  handleMouseMove: React.MouseEventHandler = event => {
    if (this.panStart) {
      const {x: prevX, y: prevY} = this.panStart
      const {x, y} = getEventCenter(event)

      this.props.pan(x - prevX, y - prevY)
      this.panStart = {x, y}
    }
  }

  componentDidMount(): void {
    window.addEventListener('wheel', this.handleWheel)
  }

  componentWillUnmount(): void {
    window.removeEventListener('wheel', this.handleWheel)
  }

  render(): JSX.Element {
    const {containerRef} = this.props

    return (
      <div
        className="absolute absolute--fill"
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
        onMouseMove={this.handleMouseMove}
        ref={containerRef}
      >
        <div className="absolute top-50 left-50 tf-center w-100">
          {this.props.children}
        </div>
      </div>
    )
  }
}
