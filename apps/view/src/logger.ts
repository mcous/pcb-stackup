import Nanologger from 'nanologger'
import pkg from '../package.json'

export function createLogger(): Nanologger {
  return new Nanologger(pkg.name)
}

export function setLogLevel(root: Window, level: Nanologger.LogLevel): void {
  root.localStorage.setItem('logLevel', level)
}
