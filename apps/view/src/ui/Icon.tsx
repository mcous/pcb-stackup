import React from 'react'
import cx from 'classnames'
import {Omit} from '../types'

import {
  FontAwesomeIcon as FaIcon,
  Props as FaIconProps,
} from '@fortawesome/react-fontawesome'

import {
  library,
  IconPrefix,
  IconProp as FaIconName,
} from '@fortawesome/fontawesome-svg-core'

import {
  faArrowCircleDown,
  faCaretDown,
  faCheck,
  faCheckSquare,
  faChevronLeft,
  faChevronRight,
  faCircle,
  faCog,
  faCogs,
  faCopy,
  faDotCircle,
  faDownload,
  faExpand,
  faEye,
  faEyeSlash,
  faFileDownload,
  faFileUpload,
  faPlus,
  faPlusHexagon,
  faPlusCircle,
  faPlusSquare,
  faSearchMinus,
  faSearchPlus,
  faSlidersH,
  faSpinner,
  faSquare,
  faTimes,
  faTrashAlt,
  faQuestion,
  faQuestionCircle,
} from '@fortawesome/pro-regular-svg-icons'

export type IconName =
  | 'arrow-circle-down'
  | 'caret-down'
  | 'check'
  | 'check-square'
  | 'chevron-left'
  | 'chevron-right'
  | 'circle'
  | 'cog'
  | 'cogs'
  | 'copy'
  | 'dot-circle'
  | 'download'
  | 'expand'
  | 'eye'
  | 'eye-slash'
  | 'file-download'
  | 'file-upload'
  | 'plus'
  | 'plus-circle'
  | 'plus-hexagon'
  | 'plus-square'
  | 'search-plus'
  | 'search-minus'
  | 'sliders-h'
  | 'spinner'
  | 'square'
  | 'times'
  | 'trash-alt'
  | 'question'
  | 'question-circle'

export type IconProps = {
  name: IconName
  className?: string
  style?: React.CSSProperties
  faProps?: Omit<FaIconProps, 'icon' | 'className'>
}

const PREFIX: IconPrefix = 'far'

library.add(
  faArrowCircleDown,
  faCaretDown,
  faCheck,
  faCheckSquare,
  faChevronLeft,
  faChevronRight,
  faCircle,
  faCog,
  faCogs,
  faCopy,
  faDownload,
  faDotCircle,
  faExpand,
  faEye,
  faEyeSlash,
  faFileDownload,
  faFileUpload,
  faPlus,
  faPlusCircle,
  faPlusHexagon,
  faPlusSquare,
  faSearchMinus,
  faSearchPlus,
  faSlidersH,
  faSpinner,
  faSquare,
  faTimes,
  faTrashAlt,
  faQuestion,
  faQuestionCircle
)

export function Icon(props: IconProps): JSX.Element {
  const {style, faProps} = props
  const icon: FaIconName = [PREFIX, props.name]
  const className = cx(props.className, 'relative w2 h2 pa2')

  return (
    <div className={className} style={style}>
      <span className="db absolute absolute--center">
        <FaIcon icon={icon} {...faProps} />
      </span>
    </div>
  )
}
