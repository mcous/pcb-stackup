import React from 'react'

import {State, Dispatch, connect, getBoard} from '../state'

import {Fade, Slide} from '../ui'
import ShowButton from './ShowButton'
import SavedBoardList from './SavedBoardList'

type BoardListProps = {
  mode: State['mode']
  loading: State['loading']
  board: State['board']
  savedBoards: State['savedBoards']
  dispatch: Dispatch
}

type BoardListState = {
  show: boolean
  selected: string | null
}

class BoardList extends React.Component<BoardListProps, BoardListState> {
  constructor(props: BoardListProps) {
    super(props)

    this.state = {
      show: props.mode === null,
      selected: props.board ? props.board.id : null,
    }
  }

  toggleShow = () => this.setState({show: !this.state.show})

  selectBoard = (id: string) => {
    this.props.dispatch(getBoard(id))
    this.setState({selected: id})
  }

  componentDidUpdate(prevProps: BoardListProps): void {
    const {loading, board} = this.props

    if (prevProps.loading && !loading) {
      this.setState({show: false, selected: board ? board.id : null})
    }
  }

  render(): JSX.Element {
    const {savedBoards} = this.props
    const {selected} = this.state
    const haveBoards = savedBoards.length > 0
    const show = haveBoards && this.state.show

    return (
      <>
        <Fade in={haveBoards}>
          <ShowButton show={show} toggle={this.toggleShow} />
        </Fade>
        <Slide in={show} from="right">
          <SavedBoardList
            selectedId={selected}
            boards={savedBoards}
            onItemClick={this.selectBoard}
          />
        </Slide>
      </>
    )
  }
}

export default connect<BoardListProps>(BoardList)
