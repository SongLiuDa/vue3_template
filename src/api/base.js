import axios from '@/utils/request'

export function upload(data) {
  return axios({
    url: 'api/admin/ProxyUpload',
    method: 'post',
    data
  })
}
// 获取中台存储的图片文件
export function getUpload(params) {
  return axios({
    url: 'api/admin/ProxyUpload',
    method: 'get',
    params
  })
}
