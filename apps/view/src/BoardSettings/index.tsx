import React from 'react'

import {BoardRender} from '../types'
import {Button, Icon, Fade} from '../ui'
import {BoardName} from './name'
import ModeSelect from './ModeSelect'
import SettingsForm from './SettingsForm'

type Props = BoardRender & {updating: boolean}

type State = {
  open: boolean
  shift: number
}

const OPEN_TOOLTIP = 'Board settings'

const STYLE = 'dib ph3 tc v-top w-third'
const NAME_STYLE = 'flex items-center justify-center'
const MODAL_STYLE = 'fixed top-1 left-0 right-0 bottom-1 z-1 nt2'
const MODAL_CONTENTS_STYLE =
  'relative w-50 mxh-100 center pt2 ph4 br3 near-black bg-white shadow overflow-y-auto'

const FORM_STYLE = 'dib w-100'

const stopPropagation = (e: React.SyntheticEvent): void => e.stopPropagation()

export default class BoardSettings extends React.Component<Props, State> {
  modalContentsRef: React.RefObject<HTMLDivElement>
  state: State

  constructor(props: Props) {
    super(props)
    this.modalContentsRef = React.createRef()
    this.state = {open: false, shift: 0}
  }

  toggleOpen = () => this.setState({open: !this.state.open})

  componentDidUpdate(): void {
    console.log('sup', this.modalContentsRef.current)
    const $modalContents = this.modalContentsRef.current
    if ($modalContents) {
      const {width} = $modalContents.getBoundingClientRect()
      const clientWidth = $modalContents.clientWidth
      const shift = (width - clientWidth) / 2
      // shift modal contents by scrollbar width if present
      $modalContents.style.transform = `translateX(${shift}px)`
    }
  }

  render(): JSX.Element {
    const {name, updating} = this.props
    const {open} = this.state

    return (
      <div className={STYLE}>
        <div className={NAME_STYLE}>
          <BoardName>{name}</BoardName>
          <Button
            onClick={this.toggleOpen}
            disabled={updating}
            className="nr4"
            title={OPEN_TOOLTIP}
          >
            <Icon
              name={updating ? 'spinner' : 'cog'}
              faProps={{pulse: updating}}
            />
          </Button>
        </div>
        <ModeSelect />
        <Fade in={open}>
          <div className={MODAL_STYLE} onWheel={stopPropagation}>
            <div className={MODAL_CONTENTS_STYLE} ref={this.modalContentsRef}>
              <SettingsForm className={FORM_STYLE} close={this.toggleOpen} />
            </div>
          </div>
        </Fade>
      </div>
    )
  }
}
