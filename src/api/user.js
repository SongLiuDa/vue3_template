import axios from '@/utils/request'

export function login(data) {
  return axios({
    url: 'api/v1/siteVerifyAuth',
    method: 'post',
    data
  })
}

export function profile(params) {
  return axios({
    url: 'api/v1/Profile',
    method: 'get',
    params
  })
}
