import React from 'react'
import cx from 'classnames'

import {connect, setMode, State, Dispatch} from '../state'
import {Button} from '../ui'

type Props = {
  mode: State['mode']
  dispatch: Dispatch
}

const STYLE = 'mt2'
const BUTTON_STYLE = 'dib tc'
const TEXT_STYLE = 'db w3 mt2 mh2 mb1 bw2 bb'
const DESELECTED_STYLE = 'b--transparent'
const SELECTED_STYLE = 'b--brand'

class ModeSelect extends React.Component<Props> {
  setTopMode = () => this.props.dispatch(setMode('top'))
  setBottomMode = () => this.props.dispatch(setMode('bottom'))
  setLayersMode = () => this.props.dispatch(setMode('layers'))

  render(): JSX.Element | null {
    const {mode} = this.props
    if (!mode) return null

    const buttons = [
      {mode: 'layers', onClick: this.setLayersMode},
      {mode: 'top', onClick: this.setTopMode},
      {mode: 'bottom', onClick: this.setBottomMode},
    ]

    return (
      <div className={STYLE}>
        {buttons.map(b => (
          <Button key={b.mode} className={BUTTON_STYLE} onClick={b.onClick}>
            <span
              className={cx(
                TEXT_STYLE,
                mode === b.mode ? SELECTED_STYLE : DESELECTED_STYLE
              )}
            >
              {b.mode}
            </span>
          </Button>
        ))}
      </div>
    )
  }
}

export default connect<Props>(ModeSelect)
