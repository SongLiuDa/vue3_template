import { getToken, removeToken, setToken } from '@/utils/auth'
import { profile, login } from '@api/user'
import { defineStore } from 'pinia'

// 用户信息
export const useUser = defineStore('userInfo', {
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
          this.token = res.token
          resolve(res)
        }).catch(() => {
          reject()
        })
      })
    },
    // 个人信息
    getProfile() {
      return new Promise((resolve, reject) => {
        const params = {
          t: Date.now()
        }
        profile(params).then(res => {
          // console.log('客户个人资料', res)
          this.profile = res
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
