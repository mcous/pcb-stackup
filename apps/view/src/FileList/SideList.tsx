import React from 'react'
import cx from 'classnames'
import wtg from 'whats-that-gerber'

import {LayerRender} from '../types'
import {orderLayers} from '../layers'
import SideItem from './SideItem'

type Props = {
  layers: Array<LayerRender>
  showFilenames: boolean
}

const SIDES = [
  {label: 'top', side: wtg.SIDE_TOP},
  {label: 'bottom', side: wtg.SIDE_BOTTOM},
  {label: 'inner', side: wtg.SIDE_INNER},
  {label: 'mechanical', side: wtg.SIDE_ALL},
  {label: 'other', side: null},
]

const stopPropagation = (e: React.SyntheticEvent): void => e.stopPropagation()

export default function SideList(props: Props): JSX.Element {
  const {layers, showFilenames} = props

  return (
    <div
      className={cx(
        'absolute left-0 top-5 bottom-5 overflow-y-hidden w-animate',
        showFilenames ? 'w-third' : 'w-sixth'
      )}
    >
      <div
        onWheel={stopPropagation}
        className={cx('w-100 mxh-100 overflow-y-auto ph3 tf-flip-x')}
      >
        <ul className="list mt0 mb3 pl0 tf-flip-x">
          {SIDES.map(sideProps => (
            <SideItem
              key={sideProps.label}
              label={sideProps.label}
              layers={layers
                .filter(ly => ly.side === sideProps.side)
                .sort(orderLayers)}
              showFilenames={showFilenames}
            />
          ))}
        </ul>
      </div>
    </div>
  )
}
