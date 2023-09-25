export const defaultBlur = [{
  required: true,
  message: '必填',
  trigger: 'onBlur'
}]
export const defaultChange = [{
  required: true,
  message: '必填',
  trigger: 'onChange'
}]
// 同意协议rules
export const confirmRules = [
  {
    validator: (value, rule) => {
      if (!value) {
        return 'Please agree to the agreement'
      } else {
        return Promise.resolve()
      }
    },
    trigger: 'onChange'
  }
]

// 上传图片
export const uploadRules = [
  {
    validator: (value) => {
      const isPass = value.every(item => item.status === 'done')
      if (!isPass || !value.length) {
        return '必填'
      } else {
        return Promise.resolve()
      }
    },
    trigger: 'onBlur'
  }
]
