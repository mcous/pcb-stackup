import React from 'react'

import {State, connect} from '../state'

import {Fade, Slide} from '../ui'
import SideList from './SideList'
import ShowFilenamesButton from './ShowFilenamesButton'

type FileListProps = {
  loading: State['loading']
  board: State['board']
}

type FileListState = {
  showFilenames: boolean
}

class FileList extends React.Component<FileListProps, FileListState> {
  constructor(props: FileListProps) {
    super(props)
    this.state = {showFilenames: false}
  }

  toggleShowFilenames = () => {
    this.setState({showFilenames: !this.state.showFilenames})
  }

  render(): JSX.Element {
    const {loading, board} = this.props
    const layers = board ? board.layers : []
    const {showFilenames} = this.state
    const show = !loading && board !== null

    return (
      <>
        <Slide in={show} from="left">
          <SideList layers={layers} showFilenames={showFilenames} />
        </Slide>
        <Fade in={show}>
          <ShowFilenamesButton
            showFilenames={showFilenames}
            toggle={this.toggleShowFilenames}
          />
        </Fade>
      </>
    )
  }
}

export default connect<FileListProps>(FileList)
