import { defaultBlur, defaultChange } from '@/utils/rules'

export const basic = {
  input: {
    component: 'AppInput',
    itemAttrs: {},
    attrs: {
      rules: defaultBlur
    },
    rulesRrigger: 'onBlur'
  },
  'pwd-input': { // 密码输入框
    component: 'AppPasswordInput',
    itemAttrs: {},
    attrs: {},
    rulesRrigger: 'onBlur'
  },
  select: {
    component: 'AppSelect',
    itemAttrs: {},
    attrs: {},
    rulesRrigger: 'onChange'
  },
  upload: { // 上传组件
    component: 'AppUpload',
    itemAttrs: {},
    attrs: {}
  },
  radio: {
    component: 'AppRadio',
    itemAttrs: {},
    attrs: {
      rules: defaultChange
    },
    rulesRrigger: 'onChange'
  }
}
