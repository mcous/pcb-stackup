import React from 'react'

import {INITIAL_STATE} from './reducer'
import {ContextProps} from './types'

export const StateContext = React.createContext<ContextProps>({
  ...INITIAL_STATE,
  dispatch: () => {},
})
