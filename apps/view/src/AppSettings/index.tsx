import React from 'react'

import {Button, Icon, getButtonStyle} from '../ui'
import SettingsDrawer from './SettingsDrawer'

const HELP_TOOLTIP = 'Troubleshooting'
const HELP_HREF =
  'https://github.com/tracespace/tracespace/blob/next/apps/view/HELP.md'

const SETTINGS_TOOLTIP = 'App settings'

export type AppSettingsProps = {
  buttonClassName: string
}

export type AppSettingsState = {
  open: boolean
}

class AppSettings extends React.Component<AppSettingsProps, AppSettingsState> {
  state: AppSettingsState

  constructor(props: AppSettingsProps) {
    super(props)
    this.state = {open: false}
  }

  toggleOpen = () => this.setState({open: !this.state.open})

  render(): JSX.Element {
    const {buttonClassName} = this.props
    const {open} = this.state

    return (
      <>
        <a
          href={HELP_HREF}
          title={HELP_TOOLTIP}
          target="_blank"
          rel="noreferrer noopener"
          className={getButtonStyle({className: buttonClassName})}
        >
          <Icon name="question-circle" />
        </a>
        <Button
          onClick={this.toggleOpen}
          title={SETTINGS_TOOLTIP}
          className={buttonClassName}
        >
          <Icon name="sliders-h" />
        </Button>
        <SettingsDrawer open={open} close={this.toggleOpen} />
      </>
    )
  }
}

export default AppSettings
