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
/**
 * @description: 格式化分隔符金额
 * @param {string} s 分隔符金额
 * @return {string}
 */
export function formatAmt (v) {
  if (!v) return 0
  v = v.toString()
  return +v.replace(/[^\d\.]/g, '')
}
/**
 * @description: 币种对拆分
 * @param {string} s 币种对
 * @return {string}
 */
export function currencyPairFormat(s) {
  if (!s) return
  return { start: s.slice(0, 3), end: s.slice(-3) }
}
