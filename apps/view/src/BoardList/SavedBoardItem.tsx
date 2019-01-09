import React from 'react'
import cx from 'classnames'

import {BoardSummary} from '../types'
import {Icon} from '../ui'

type Props = BoardSummary & {
  onClick: (id: string) => void
  selected: boolean
}

type State = {
  thumbnailLoaded: boolean
}

// TODO(mc, 2018-12-26): dedupe this logic
const DEFAULT_COLOR = 'rgba(00, 66, 00, 0.75)'

export default class SavedBoardItem extends React.Component<Props, State> {
  imageRef: React.RefObject<HTMLImageElement>

  constructor(props: Props) {
    super(props)
    this.imageRef = React.createRef()
    this.state = {thumbnailLoaded: false}
  }

  handleClick = () => {
    if (!this.props.selected) {
      this.props.onClick(this.props.id)
    }
  }

  setThumbnailLoaded = () => {
    this.setState({thumbnailLoaded: true})
  }

  componentDidMount(): void {
    const {current} = this.imageRef
    if (current) {
      current.addEventListener('load', this.setThumbnailLoaded)
    }
  }

  componentWillUnmount(): void {
    const {current} = this.imageRef
    if (current) {
      current.removeEventListener('load', this.setThumbnailLoaded)
    }
  }

  render(): JSX.Element {
    const {name, selected, options, thumbnail} = this.props
    const {thumbnailLoaded} = this.state
    const color = options.color.sm || DEFAULT_COLOR
    const thumbnailBackground = thumbnailLoaded
      ? `url("${thumbnail}") no-repeat center/contain`
      : 'transparent'

    return (
      <li
        className={cx('dib w-50 pl3 pb3 fr', {pointer: !selected})}
        onClick={this.handleClick}
      >
        <div className={cx('relative overflow-hidden w-100 h4 br3 shadow')}>
          <div className="w-100 h-100 bg-white">
            <p
              className={cx('f6 lh-title mv0 mh4 pt2 tc', {
                b: selected,
              })}
            >
              {name}
            </p>
            <div
              className="absolute top-2 bottom-1 left-1 right-1 flex items-center justify-center"
              style={{background: thumbnailBackground}}
            >
              {!thumbnailLoaded && (
                <>
                  <img className="clip" ref={this.imageRef} src={thumbnail} />
                  <Icon
                    name="spinner"
                    className="f2"
                    style={{color}}
                    faProps={{pulse: true}}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </li>
    )
  }
}
