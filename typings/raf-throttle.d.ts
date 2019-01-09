// Type definitions for raf-throttle 1.0
// Project: https://github.com/wuct/raf-throttle
// Definitions by: Mike Cousins <https://mike.cousins.io>

declare module 'raf-throttle' {
  function rafThrottle(callable: rafThrottle.Callable): () => void

  namespace rafThrottle {
    interface Callable {
      (...args: Array<unknown>): unknown
    }
  }

  export = rafThrottle
}
