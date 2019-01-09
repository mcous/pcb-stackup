import React from 'react'

import pkg from '../../package.json'
import {connect, deleteAllBoards, Dispatch} from '../state'
import {DeleteButton, Drawer, Label} from '../ui'

const TITLE = 'app settings'
const FOOTER = `tracespace v${pkg.version}`

const DELETE_SAVED_COPY = 'delete all saved boards'

const FOOTER_STYLE = 'mt3 mb1 f7 lh-copy'

export type SettingsDrawerProps = {
  open: boolean
  close: () => void
  dispatch: Dispatch
}

class SettingsDrawer extends React.Component<SettingsDrawerProps> {
  handleDeleteAllClick = () => {
    this.props.dispatch(deleteAllBoards())
    this.props.close()
  }

  render(): JSX.Element {
    const {open, close} = this.props

    return (
      <Drawer title={TITLE} open={open} close={close}>
        <Label>
          <span className="mr-auto">{DELETE_SAVED_COPY}</span>
          <DeleteButton className="nr2" onClick={this.handleDeleteAllClick} />
        </Label>
        <footer className={FOOTER_STYLE}>{FOOTER}</footer>
      </Drawer>
    )
  }
}

export default connect<SettingsDrawerProps>(SettingsDrawer)
