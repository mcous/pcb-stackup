import React from 'react'

import {connect, getBoardPackage, State, Dispatch} from '../state'
import {Button, Icon} from '../ui'
import {FileEvent} from '../types'
import OpenFileDrawer from './OpenFileDrawer'

const DOWNLOAD_TOOLTIP = 'Download SVG renders'
const UPLOAD_TOOLTIP = 'Upload Gerber/drill files'

export type FileControlsProps = {
  buttonClassName: string
  handleFiles: (event: FileEvent) => void
  handleUrl: (url: string) => void
  board: State['board']
  mode: State['mode']
  loading: State['loading']
  downloading: State['downloading']
  dispatch: Dispatch
}

export type FileControlsState = {
  uploadOpen: boolean
}

class FileControls extends React.Component<
  FileControlsProps,
  FileControlsState
> {
  state: FileControlsState

  constructor(props: FileControlsProps) {
    super(props)
    this.state = {uploadOpen: false}
  }

  toggleUploadOpen = () => {
    this.setState({uploadOpen: !this.state.uploadOpen})
  }

  handleFiles = (event: FileEvent) => {
    this.setState({uploadOpen: false})
    this.props.handleFiles(event)
  }

  handleUrl = (url: string) => {
    this.setState({uploadOpen: false})
    this.props.handleUrl(url)
  }

  downloadBoard = () => {
    if (this.props.board) {
      this.props.dispatch(getBoardPackage(this.props.board.id))
    }
  }

  render(): JSX.Element {
    const {buttonClassName, board, loading, downloading} = this.props

    const {uploadOpen} = this.state

    return (
      <>
        <Button
          className={buttonClassName}
          onClick={this.toggleUploadOpen}
          disabled={loading}
          title={UPLOAD_TOOLTIP}
        >
          <Icon name="plus" />
        </Button>
        <Button
          className={buttonClassName}
          onClick={this.downloadBoard}
          disabled={!board || downloading}
          title={DOWNLOAD_TOOLTIP}
        >
          <Icon
            name={downloading ? 'spinner' : 'file-download'}
            faProps={{pulse: downloading}}
          />
        </Button>
        <OpenFileDrawer
          open={uploadOpen}
          handleFiles={this.handleFiles}
          handleUrl={this.handleUrl}
          close={this.toggleUploadOpen}
        />
      </>
    )
  }
}

export default connect<FileControlsProps>(FileControls)
