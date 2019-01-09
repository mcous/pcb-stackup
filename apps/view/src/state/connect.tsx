// HOC to connect a component to the application state context
import React from 'react'

import {StateContext} from './context'
import {ContextProps} from './types'

type OwnProps<Props> = Pick<Props, Exclude<keyof Props, keyof ContextProps>>

export function connect<Props extends Partial<ContextProps>>(
  OriginalComponent: React.ComponentType<Props>
): React.ComponentType<OwnProps<Props>> {
  return class StateConnectedComponent extends React.Component<
    OwnProps<Props>
  > {
    static contextType = StateContext

    render(): JSX.Element {
      return <OriginalComponent {...this.props} {...this.context} />
    }
  }
}
