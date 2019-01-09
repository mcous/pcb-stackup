import React from 'react'

import {State, connect} from '../state'
import {PageTitle, Slide} from '../ui'
import {FileEvent} from '../types'
import AppSettings from '../AppSettings'
import BoardSettings from '../BoardSettings'
import FileControls from './FileControls'

import Footer from './Footer'

type Props = {
  board: State['board']
  loading: State['loading']
  updating: State['updating']
  handleFiles: (event: FileEvent) => void
  handleUrl: (url: string) => void
}

const BUTTON_CLASS_NAME = 'ml1 pa1 f3'

function Nav(props: Props): JSX.Element {
  const {board, loading, updating, handleFiles, handleUrl} = props
  const show = !loading && board !== null

  return (
    <nav className="flex items-start justify-between relative w-100 h3">
      <PageTitle subtitle="view" className="w-third flex-none" />
      {board && (
        <Slide in={show} from="top">
          <BoardSettings {...board} updating={updating} />
        </Slide>
      )}
      <div className="flex-none flex items-start justify-end w-third">
        <FileControls
          buttonClassName={BUTTON_CLASS_NAME}
          handleFiles={handleFiles}
          handleUrl={handleUrl}
        />
        <AppSettings buttonClassName={BUTTON_CLASS_NAME} />
      </div>
      <Footer />
    </nav>
  )
}

export default connect<Props>(Nav)
