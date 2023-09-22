import { getToken } from '@/utils/auth'
import router from '@/router'
import { useUser } from '@/store'
import { Toast } from 'vant'
// 未登录白名单
export const whiteList = ['Login']

// 登录黑名单页面
const loginBlack = ['Login']
router.beforeEach(async(to, from) => {
  const userStore = useUser()
  if (getToken()) {
    if (loginBlack.indexOf(to.name) !== -1) {
      return '/'
    } else {
      if (userStore._profile.status !== undefined) {
        return true
      } else {
        try {
          await userStore.getProfile()
          return true
        } catch {
          Toast.fail('Please log in again')
          return '/login'
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.name) !== -1) {
      return true
    } else {
      return `/login`
    }
  }
})
