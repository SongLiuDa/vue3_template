import { customRef } from 'vue'

/**
 * @description: 防抖的 ref
 * @param {*} delay 值
 * @param {Number} delay 延迟时间
 * @return {Ref}
 */
export function debounceRef(value, delay = 1000) {
  let timer
  return customRef((track, trigger) => {
    return {
      get() {
        // 依赖收集
        track()
        return value
      },
      set(val) {
        clearTimeout(timer)
        timer = setTimeout(() => {
          // 派发更新
          trigger()
          value = val
        }, delay)
      }
    }
  })
}
