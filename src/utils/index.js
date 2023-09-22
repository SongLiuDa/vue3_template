import { emailReg, phoneReg } from './reg'

/**
 * @description: 字节大小转换
 * @param {Number} bytes 字节
 * @return {Sting} 格式化字节
 */
export function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i))) + '' + sizes[i]
}

/**
 * @description: 格式化金额
 * @param {string} s [金额]
 * @param {number} n [保留小数位]
 * @return {string}
 */
export const formatMoney = function(s, n = 2) {
  if (!s) return '0.00'
  let minus = ''
  s = s.toString()
  if (s < 0) {
    s = s.replace(/\-/, '')
    minus = '-'
  }
  s = parseFloat((s + '').replace(/[^\d\.]/g, '')).toFixed(n) + ''
  const l = s.split('.')[0].split('').reverse()
  const r = s.split('.')[1]
  let t = ''
  for (let i = 0; i < l.length; i++) {
    t += l[i] + ((i + 1) % 3 === 0 && (i + 1) !== l.length ? ',' : '')
  }
  return `${minus}${t.split('').reverse().join('')}${n > 0 ? '.' + r : ''}`
}
// 是否是邮箱
export function isEamil(s) {
  return emailReg.test(s)
}
// 是否是手机
export function isPhone(s) {
  return phoneReg.test(s)
}
