import axios from '@/utils/request'

export function upload(data) {
  return axios({
    url: '/my_api/api/v1/ProxyUpload',
    method: 'post',
    data
  })
}
// 获取中台存储的图片文件
export function getUpload(params) {
  return axios({
    url: '/my_api/api/v1/ProxyUpload',
    method: 'get',
    params
  })
}
