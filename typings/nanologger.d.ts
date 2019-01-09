// Type definitions for nanologger 1.3
// Project: https://github.com/choojs/nanologger
// Definitions by: Mike Cousins <https://mike.cousins.io>

declare module 'nanologger' {
  class Nanologger {
    constructor(name: string, options?: Nanologger.Options)
    readonly level: Nanologger.LogLevel
    trace: Nanologger.LevelLogger
    debug: Nanologger.LevelLogger
    info: Nanologger.LevelLogger
    warn: Nanologger.LevelLogger
    error: Nanologger.LevelLogger
    fatal: Nanologger.LevelLogger
  }

  namespace Nanologger {
    type LogLevel = 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal'

    interface Options {
      colors?: Partial<Colors> | null
    }

    interface Colors {
      foreground: string
      background: string
      black: string
      red: string
      green: string
      yellow: string
      blue: string
      magenta: string
      cyan: string
      white: string
      brightBlack: string
    }

    interface LevelLogger {
      (...rest: Array<unknown>): void
    }
  }

  export = Nanologger
}
