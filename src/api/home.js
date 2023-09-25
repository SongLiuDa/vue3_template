import axios from '@/utils/request'

export function getSiteVerify(params) {
  return axios({
    url: 'api/v1/SiteVerify',
    method: 'get',
    params
  })
}
export function siteVerify(data) {
  return axios({
    url: 'api/v1/SiteVerify',
    method: 'post',
    data
  })
}
