// import React from 'react'
// import App from './App'
// import StateProvider from './state/StateProvider'
import {setLogLevel} from './logger'

import './styles'

const logLevel = process.env.NODE_ENV === 'production' ? 'warn' : 'debug'

setLogLevel(window, logLevel)

Promise.all([
  import('react'),
  import('react-dom'),
  import('./state/StateProvider'),
  import('./App'),
]).then(imports => {
  const [
    {default: React},
    {default: ReactDom},
    {default: StateProvider},
    {default: App},
  ] = imports

  ReactDom.hydrate(
    <StateProvider>
      <App />
    </StateProvider>,
    document.querySelector('[data-hook=root]')
  )
})
