
type AnyFunc = (...args: any[]) => any

interface DebouncedFunc<T extends AnyFunc> {
  (...args: Parameters<T>): ReturnType<T> | undefined;
  cancel(): void;
}

export const debounce = <T extends AnyFunc>(
  fn: T,
  wait = 500,
  immediate = false
): DebouncedFunc<T> => {
  let timer: number
  const later = (context: any, ...args: any[]) => {
    window.clearTimeout(timer);
    timer = window.setTimeout(() => {
      fn.apply(context, args);
    }, wait);
  }
  const debounced = function(this: any, ...args: any[]) {
    if (immediate && !timer) {
      fn.apply(this, args);
    }
    later(this, ...args)
  }
  debounced.cancel = () => {
    window.clearTimeout(timer)
  }
  return debounced as DebouncedFunc<T>
}

export const throttle = <T extends AnyFunc>(
  fn: T,
  wait = 500,
  immediate = false
): DebouncedFunc<T> => {
  let timer: number
  const throttled = function(this: any, ...args: any[]) {
    if (!timer) {
      fn.apply(this, args);
      timer = window.setTimeout(() => {
        timer = 0;
      }, wait);
    }
  }
  throttled.cancel = () => {
    window.clearTimeout(timer)
  }
  return throttled as DebouncedFunc<T>
}