import axios from '@/utils/request'

export function register(data) {
  return axios({
    url: '/my_api/api/v1/Register',
    method: 'post',
    data
  })
}
export function login(data) {
  return axios({
    url: '/my_api/api/v1/Login',
    method: 'post',
    data
  })
}

export function profile(params) {
  return axios({
    url: '/my_api/api/v1/Profile',
    method: 'get',
    params
  })
}
