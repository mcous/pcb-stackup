import React from 'react'
import cx from 'classnames'

import {Label, Icon} from '../ui'

type BoardUrlProps = {
  url: string
}

type BoardUrlState = {
  selected: boolean
  success: boolean
}

const SUCCESS_TIMEOUT = 1200

const PARAM = '?boardUrl='

const STYLE = 'justify-center f6 lh-solid mb3'
const TEXT_STYLE =
  'flex items-center mv0 lh-copy near-black bg-animate near-black'
const ICON_STYLE = 'flex-none ml1 nr4 br2 c-animate bg-animate'

class BoardUrl extends React.Component<BoardUrlProps, BoardUrlState> {
  successTimeout: number | null

  constructor(props: BoardUrlProps) {
    super(props)
    this.state = {selected: false, success: false}
    this.successTimeout = null
  }

  handleBlur = () => this.setState({selected: false, success: false})

  handleFocus: React.FocusEventHandler<HTMLInputElement> = event => {
    event.currentTarget.select()
    this.setState({selected: true})
  }

  handleClick: React.MouseEventHandler<HTMLInputElement> = event => {
    event.currentTarget.select()
    document.execCommand('copy')
  }

  handleCopy: React.ClipboardEventHandler<HTMLElement> = event => {
    this.setState({success: true}, () => {
      this.successTimeout = window.setTimeout(() => {
        this.setState({success: false})
        this.successTimeout = null
      }, SUCCESS_TIMEOUT)
    })

    event.currentTarget.focus()
    event.clipboardData.setData('text/plain', this.getUrl().copyValue)
    event.preventDefault()
  }

  getUrl(): {host: string; copyValue: string; url: string} {
    const {url} = this.props
    const host = window.location.href
    const copyValue = url ? `${host}${PARAM}${encodeURIComponent(url)}` : ''

    return {host, copyValue, url}
  }

  componentWillUnmount(): void {
    if (this.successTimeout !== null) clearTimeout(this.successTimeout)
  }

  render(): JSX.Element {
    const {selected, success} = this.state
    const {url, host, copyValue} = this.getUrl()
    const textStyle = cx(TEXT_STYLE, selected ? 'bg-light-blue' : 'bg-white')
    const iconStyle = cx(
      ICON_STYLE,
      success ? 'white bg-brand' : 'near-black bg-white'
    )

    return (
      <Label className={STYLE} onCopy={this.handleCopy}>
        <p className={textStyle}>
          <span className="fw3">
            {host}
            {PARAM}
          </span>
          <span>{url}</span>
        </p>
        <Icon name="copy" className={iconStyle} />
        <input
          type="text"
          value={copyValue}
          className="clip"
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onClick={this.handleClick}
          readOnly
        />
      </Label>
    )
  }
}

export default BoardUrl
