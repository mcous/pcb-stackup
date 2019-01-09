import React from 'react'
import cx from 'classnames'
import debounce from 'lodash/debounce'

import {connect, State} from '../state'
import {Fade, Slide, SvgRender} from '../ui'
import {INITIAL_STATE, pan, zoom, getScale} from './display'
import PanZoom from './PanZoom'
import Controls from './Controls'
import LayersRender from './LayersRender'
import {DisplayState, HandlePan, HandleZoom} from './types'

type Props = {
  mode: State['mode']
  board: State['board']
  loading: State['loading']
  layerVisibility: State['layerVisibility']
}

const UPDATE_THROTTLE_MS = 50

const percent = (n: number): string => `${n * 100}%`

class BoardDisplay extends React.Component<Props, DisplayState> {
  state: DisplayState
  displayState: DisplayState
  containerRef: React.RefObject<HTMLDivElement>

  constructor(props: Props) {
    super(props)
    this.state = INITIAL_STATE
    this.displayState = INITIAL_STATE
    this.containerRef = React.createRef()
  }

  reset = () => this.update(INITIAL_STATE)
  pan: HandlePan = (...args) => this.update(pan(this.displayState, ...args))
  zoom: HandleZoom = (...args) => this.update(zoom(this.displayState, ...args))
  zoomIn = () => this.update(zoom(this.displayState, 1))
  zoomOut = () => this.update(zoom(this.displayState, -1))

  throttledSetState = debounce(this.setState.bind(this), UPDATE_THROTTLE_MS)

  update(state: DisplayState): void {
    if (this.containerRef.current) {
      const {x, y, step} = state
      const {scale} = getScale(step)
      const transform = `translate(${percent(x)},${percent(y)}) scale(${scale})`

      this.containerRef.current.style.transform = transform
      this.displayState = state
      this.throttledSetState(state)
    }
  }

  componentDidMount(): void {
    this.update(this.displayState)
  }

  componentDidUpdate(prevProps: Props): void {
    const prevId = prevProps.board ? prevProps.board.id : null
    const currId = this.props.board ? this.props.board.id : null

    if ((prevId || currId) && prevId !== currId) this.reset()
  }

  render(): JSX.Element {
    const {mode, board, loading, layerVisibility} = this.props
    const show = !loading && board !== null

    const controllerProps = {
      step: this.state.step,
      reset: this.reset,
      pan: this.pan,
      zoom: this.zoom,
      zoomIn: this.zoomIn,
      zoomOut: this.zoomOut,
    }

    return (
      <>
        <Fade in={show}>
          <PanZoom {...controllerProps} containerRef={this.containerRef}>
            {board && (
              <>
                <SvgRender
                  className={cx('w-100', {dn: mode !== 'top'})}
                  source={board.top}
                />
                <SvgRender
                  className={cx('w-100', {dn: mode !== 'bottom'})}
                  source={board.bottom}
                />
                <LayersRender
                  className={cx('w-100', {dn: mode !== 'layers'})}
                  viewBox={board.viewBox}
                  layers={board.layers}
                  layerVisibility={layerVisibility}
                />
              </>
            )}
          </PanZoom>
        </Fade>
        <Slide in={show} from="bottom">
          <Controls {...controllerProps} />
        </Slide>
      </>
    )
  }
}

export default connect<Props>(BoardDisplay)
