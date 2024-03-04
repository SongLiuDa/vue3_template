import {
  getToken,
  removeToken,
  setToken
} from '@/utils/auth'
import { login } from '@api/user'
import { defineStore } from 'pinia'

// 用户信息
const useUserStore = defineStore('user', {
  state: () => {
    return {
      token: getToken(),
      profile: {}
    }
  },
  actions: {
    // 登录
    login(params) {
      return new Promise((resolve, reject) => {
        login(params).then(res => {
          // console.log('登录', res)
          setToken(res.token)
          resolve(res)
        }).catch(() => {
          reject()
        })
      })
    },
    resetToken() {
      removeToken()
      this.$reset()
      return Promise.resolve()
    }
  },
  getters: {
    _token: state => state.token,
    _profile: state => state.profile
  }
})

export default useUserStore
