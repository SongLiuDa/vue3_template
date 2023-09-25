import { getToken, getPasswod } from '@/utils/auth'
import router from '@/router'
import { useUser } from '@/store'
import { Toast } from 'vant'

function urlSign(r) {
  return r.query.sign
}

// 未登录白名单
export const whiteList = ['Login']

// 登录黑名单页面
const loginBlack = ['Login']
router.beforeEach(async(to, from) => {
  const userStore = useUser()
  if (getToken()) {
    if (loginBlack.indexOf(to.name) !== -1) {
      return '/?sign=' + urlSign(to)
    } else {
      if (userStore._profile.status !== undefined) {
        return true
      } else {
        try {
          const params = {
            viewPassword: getPasswod(),
            urlSign: urlSign(to)
          }
          await userStore.login(params)
          return true
        } catch {
          userStore.resetToken()
          Toast.fail('请重新登录')
          return '/login?sign=' + urlSign(to)
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.name) !== -1) {
      return true
    } else {
      return '/login?sign=' + urlSign(to)
    }
  }
})
