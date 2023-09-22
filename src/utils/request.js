import axios from 'axios'
import { getToken } from '@/utils/auth'
import { Notify } from 'vant'

const isDev = process.env.NODE_ENV === 'development'
const http = axios.create({
  baseURL: !isDev ? process.env.VUE_APP_BASE_API : '',
  // timeout: 15000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截
http.interceptors.request.use(
  (config) => {
    if (getToken()) {
      config.headers.Authorization = getToken()
    }
    // console.log('准备请求了', config)
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截
http.interceptors.response.use(
  (data) => {
    // console.log('请求拦截', data)
    const res = data.data
    if (res.meta.ack !== 'true') {
      Notify.clear()
      Notify({
        type: 'danger',
        duration: 5 * 1000,
        message: res.body || 'error'
      })
      return Promise.reject(res)
    } else {
      return Promise.resolve(res.body)
    }
  },
  (err) => {
    if (err.code === 'ECONNABORTED' && err.message.indexOf('timeout') !== -1) {
      console.log('timeout')
      // $message.closeAll()
      // $message({
      //   type: 'error',
      //   message: '请检查网络',
      //   duration: 5 * 1000
      // })
      return Promise.reject(err)
    }
    if (err.response) {
      switch (err.response.status) {
        case 404:
          break
        case 500:
          break
      }
    }
    return Promise.reject(err)
  }
)

export default http
