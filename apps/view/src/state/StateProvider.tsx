import React from 'react'
import {saveAs} from 'file-saver'

import {createLogger} from '../logger'
import RenderWorker, {WorkerMessageEvent} from '../RenderWorker'
import * as actions from './actions'
import reducer, {INITIAL_STATE} from './reducer'
import {StateContext} from './context'
import {State, Action, Dispatch, ContextProps} from './types'

const log = createLogger()

export default class StateProvider extends React.Component<{}, State> {
  worker: RenderWorker | null

  constructor(props: {}) {
    super(props)
    this.worker = null
    this.state = INITIAL_STATE
  }

  dispatch: Dispatch = (action: Action) => {
    const prevState = this.state
    const nextState = reducer(this.state, action)

    this.setState(nextState, () =>
      this.triggerEffects(action, nextState, prevState)
    )
  }

  handleWorkerMessage = (event: WorkerMessageEvent) => {
    log.debug('action recieved from RenderWorker', event.data.type)
    this.dispatch(event.data)
  }

  triggerEffects(action: Action, nextState: State, prevState: State): void {
    // debug logger
    log.debug('previous state', prevState)
    log.debug('action', action)
    log.debug('next state', nextState)

    switch (action.type) {
      case actions.CREATE_BOARD:
      case actions.CREATE_BOARD_FROM_URL:
      case actions.GET_BOARD:
      case actions.GET_BOARD_PACKAGE:
      case actions.UPDATE_BOARD:
      case actions.DELETE_BOARD:
      case actions.DELETE_ALL_BOARDS: {
        log.debug('sending action to RenderWorker', action.type)

        if (this.worker) {
          this.worker.postMessage(action)
        } else {
          log.warn('no RenderWorker available; page refresh needed')
        }
        break
      }

      case actions.WORKER_INITIALIZED: {
        const query = new URLSearchParams(window.location.search.slice(1))
        const url = query.get('boardUrl')

        if (url) this.dispatch(actions.createBoardFromUrl(url))
        break
      }

      case actions.BOARD_PACKAGED: {
        saveAs(action.payload.file, `${action.payload.name}.zip`)
        break
      }
    }
  }

  getContextValue(): ContextProps {
    return {
      ...this.state,
      dispatch: this.dispatch,
    }
  }

  componentDidMount(): void {
    this.worker = new RenderWorker()
    this.worker.onmessage = this.handleWorkerMessage

    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(window as any)._dispatch = this.dispatch
    }
  }

  componentWillUnmount(): void {
    if (this.worker) this.worker.terminate()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (window as any)._dispatch
  }

  render(): JSX.Element {
    return (
      <StateContext.Provider value={this.getContextValue()}>
        {this.props.children}
      </StateContext.Provider>
    )
  }
}
