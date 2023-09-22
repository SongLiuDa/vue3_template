import {
  getToken,
  removeToken,
  setToken,
  getPasswod,
  removePasswod,
  setPassword
} from '@/utils/auth'
import { login } from '@api/user'
import { defineStore } from 'pinia'

// 用户信息
export const useUser = defineStore('userInfo', {
  state: () => {
    return {
      urlSign: getToken(),
      password: getPasswod(),
      profile: {}
    }
  },
  actions: {
    // 登录
    login(params) {
      return new Promise((resolve, reject) => {
        login(params).then(res => {
          // console.log('登录', res)
          const { viewPassword, urlSign } = params
          this.profile = res
          this.urlSign = urlSign
          this.password = viewPassword
          setToken(urlSign)
          setPassword(viewPassword)
          resolve(res)
        }).catch(() => {
          reject()
        })
      })
    },
    resetToken() {
      removeToken()
      removePasswod()
      this.$reset()
      return Promise.resolve()
    }
  },
  getters: {
    _urlSign: state => state.urlSign,
    _password: state => state.password,
    _profile: state => state.profile
  }
})
