// root component
import React from 'react'
import {hot} from 'react-hot-loader'

import {
  connect,
  createBoard,
  createBoardFromUrl,
  State,
  Dispatch,
} from './state'
import BoardDisplay from './BoardDisplay'
import FileList from './FileList'
import BoardList from './BoardList'
import Nav from './Nav'
import LoadFiles from './LoadFiles'
import {Main} from './ui'
import {FileEvent} from './types'

export type AppProps = {
  board: State['board']
  mode: State['mode']
  loading: State['loading']
  dispatch: Dispatch
}

class App extends React.Component<AppProps> {
  handleDragOver = (event: React.DragEvent<HTMLMainElement>) => {
    event.preventDefault()
  }

  handleFiles = (event: FileEvent) => {
    const files =
      'dataTransfer' in event
        ? Array.from(event.dataTransfer.files)
        : Array.from(event.target.files || [])

    if (files.length > 0) this.props.dispatch(createBoard(files))
    if ('value' in event.target) event.target.value = ''
    event.preventDefault()
  }

  handleUrl = (url: string) => {
    if (url) {
      this.props.dispatch(createBoardFromUrl(url))
    }
  }

  render(): JSX.Element {
    const {mode, loading} = this.props

    return (
      <Main onDragOver={this.handleDragOver} onDrop={this.handleFiles}>
        <BoardDisplay />
        <FileList />
        <BoardList />
        <Nav handleFiles={this.handleFiles} handleUrl={this.handleUrl} />
        <LoadFiles
          {...{mode, loading}}
          handleFiles={this.handleFiles}
          handleUrl={this.handleUrl}
        />
      </Main>
    )
  }
}

export default hot(module)(connect<AppProps>(App))
