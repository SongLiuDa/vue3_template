import { phoneReg, emailReg } from './reg'

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
        return '请同意协议'
      } else {
        return Promise.resolve()
      }
    },
    trigger: 'onChange'
  }
]

// 邮箱
export const emailRules = [
  {
    validator: (value) => {
      if (!value) {
        return '必填'
      } else if (!emailReg.test(value)) {
        return '请输入正确的电子邮件'
      } else {
        return Promise.resolve()
      }
    },
    trigger: 'onBlur'
  }
]

// 手机rules
export const mobileRules = [
  {
    validator: (value) => {
      if (!value) {
        return '必填'
      } else if (!phoneReg.test(value)) {
        return '请输入正确的手机号'
      } else {
        return Promise.resolve()
      }
    },
    trigger: 'onBlur'
  }
]

// swiftCode验证
export function getSwiftCodeRules(code) {
  return [{
    validator: (value) => {
      const _code = value.slice(4, 6)
      if (!value) {
        return '必填'
      } else if ((value.length !== 8 && value.length !== 11) || _code !== code) {
        return '请输入正确的SWIFT/BIC代码'
      } else {
        return Promise.resolve()
      }
    },
    trigger: 'onBlur'
  }]
}
