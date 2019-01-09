import React from 'react'
import cx from 'classnames'

import {Icon} from './Icon'

export type ButtonProps = {
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  disabled?: boolean
  className?: string
  children?: React.ReactNode
  title?: string
  type?: 'button' | 'submit' | 'reset'
}

export const BUTTON_CLASSNAME = 'bn pa0 br2 color-inherit bg-transparent'

export function Button(props: ButtonProps): JSX.Element {
  const {onClick, title, children} = props
  const type = props.type || 'button'
  const disabled = Boolean(props.disabled)
  const className = getButtonStyle(props)

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={className}
      title={title}
      suppressHydrationWarning={true}
    >
      {children}
    </button>
  )
}

export type DeleteButtonProps = {
  className?: string
  onClick: () => void
}

type DeleteButtonState = {
  armed: boolean
}

export const DELETE_BUTTON_CLASSNAME =
  'flex items-center bn pa0 br2 pointer c-animate overflow-hidden'

const DELETE_COPY = 'delete?'

export class DeleteButton extends React.Component<
  DeleteButtonProps,
  DeleteButtonState
> {
  state: DeleteButtonState

  constructor(props: DeleteButtonProps) {
    super(props)
    this.state = {armed: false}
  }

  arm: React.MouseEventHandler = event => {
    event.stopPropagation()
    this.setState({armed: true})
    window.addEventListener('click', this.disarm)
  }

  fire: React.MouseEventHandler = event => {
    event.stopPropagation()
    this.disarm()
    this.props.onClick()
  }

  disarm = () => {
    this.cleanup()
    this.setState({armed: false})
  }

  cleanup(): void {
    window.removeEventListener('click', this.disarm)
  }

  componentWillUnmount(): void {
    this.cleanup()
  }

  render(): JSX.Element {
    const {armed} = this.state
    const onClick = armed ? this.fire : this.arm
    const className = cx(
      DELETE_BUTTON_CLASSNAME,
      this.props.className,
      armed
        ? 'white bg-red hover-bg-dark-red'
        : 'red bg-white hover-bg-black-20'
    )

    return (
      <button type="button" onClick={onClick} className={className}>
        <Icon name="trash-alt" />
        <div
          className={cx(
            'flex-none mw-animate overflow-hidden',
            armed ? 'mw4' : 'mw0'
          )}
        >
          <span className="dib pl1 pr2">{DELETE_COPY}</span>
        </div>
      </button>
    )
  }
}

export function getButtonStyle(props: ButtonProps): string {
  return cx(
    {
      'o-40': props.disabled,
      'pointer bg-animate hover-bg-black-20': !props.disabled,
    },
    BUTTON_CLASSNAME,
    props.className
  )
}
