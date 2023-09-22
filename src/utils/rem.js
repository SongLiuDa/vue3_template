/**
 * @description: 计算rem
 * @param {Number} pictureWidth 设计图的宽度
 * @param {Number} remWidth 使用的rem宽度
 * @return {Void}
 */
function useRem (pictureWidth = 750, remWidth = 100) {
  const html = document.documentElement
  html.style.fontSize = ((html.clientWidth / pictureWidth) * remWidth) > 100 ? '100px' : ((html.clientWidth / pictureWidth) * remWidth) + 'px'
}
window.onresize = () => {
  useRem()
}
export default useRem
