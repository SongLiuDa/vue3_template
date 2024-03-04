import useUserStore from './modules/user'
import useAppStore from './modules/app'

// 模块化处理
export default function useStore() {
  return {
    user: useUserStore(),
    app: useAppStore()
  }
}
