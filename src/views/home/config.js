// 绿色通道类型为标准批发市场
function isWholesaleMarket(form) {
  return form.openMethods === 'WholesaleMarket'
}
// 绿色通道类型为钢贸
function isSteelTrade(form) {
  return form.openMethods === 'SteelTrade'
}
// 普通客户
function isStandard(form) {
  return form.openMethods === 'Standard'
}

// 选择上门
function chooseTheDoor(form) {
  return form.goSiteVerify === 'Y'
}

export const openMethodEnum = {
  SteelTrade: '绿通-钢贸用户',
  WholesaleMarket: '绿通-标准批发市场用户',
  Standard: '普通客户'
}
// 销售实地核查证明文件
export const fieldVerificationEnum = {
  SteelTrade: '请上传与客户企业logo合影照片（至少1张）、企业微信外出拍照打卡照片（至少1张）以及客户办公场所室内照片（至少3张）',
  WholesaleMarket: '请上传客户门头照片（至少1张）、店铺环境照片（至少3张）以及与店铺老板合照（至少1张）',
  Standard: '请上传与客户企业1ogo合影照片(室少1张）、企业微信外出拍照打卡照片（至少1张）以及客户办公场所室内照片 （至少3张）'
}
// 历史贸易背景证明材料
export const historicalTradeEnum = {
  SteelTrade: '请上传历史交易的PI/CI/ 合同、提单、收款凭证。如额外上传进仓单或历史与钢厂的订购合同，可加速准入审核',
  Standard: '请上传历史交易的PI/CI/ 合同、提单、收款凭证。如额外上传进仓单或历史与钢厂的订购合同，可加速淮入审核'
}
// 客户其他证明材料
export const otherEnum = {
  SteelTrade: '如客户提供货易背景证明文件与skyee注册主体不一致或非同一实控人。可上传客户的关联关系证明文件，加速准入审校。',
  WholesaleMarket: '如客户提供货易背景证明文件与skyee注册主体不一致或非同一实控人。可上传客户的关联关系证明文件，加速准入审核',
  Standard: '如客户提供货易背景证明文件与skyee注册主体不一致或非同一实控人。可上传客户的关联关系证明文件，加速淮入审核'
}

const uploadRules = [
  {
    validator: (value) => {
      const list = value.filter(item => item.status === 'done')
      if (!value.length) {
        return '必填'
      } else if (list.length < 1) {
        return '至少上传1张照片'
      } else {
        return Promise.resolve()
      }
    },
    trigger: 'onBlur'
  }
]

export const formConfig = [
  {
    tag: 'radio',
    prop: 'goSiteVerify',
    itemAttrs: {
      mt: true,
      mb: true
    },
    attrs: {
      fieldLabel: '上门方式',
      columns: []
    },
    getAttrs(form) {
      return {
        columns: [
          { value: 'Y', label: '选择上门' },
          { value: 'N', label: '放弃上门' }
        ]
      }
    }
  },
  {
    tag: 'upload',
    prop: 'fieldVerifyEnvFiles',
    itemAttrs: {
      label: '销售实地核查证明文件',
      labelTipsSlot: 'fieldVerificationSlot'
    },
    attrs: {
      rules: uploadRules,
      maxCount: 10
    },
    ifRender(form) {
      return chooseTheDoor(form)
    }
  },
  {
    tag: 'upload',
    prop: 'historyTradeProofFiles',
    itemAttrs: {
      labelTipsSlot: 'historicalTradeSlot'
    },
    attrs: {
      maxCount: 10
    },
    getItemAttrs(form) {
      return {
        label: isStandard(form) ? '历史贸易背景证明材料' : '历史贸易背景证明材料(选填)'
      }
    },
    getAttrs(form) {
      return {
        rules: isStandard(form) ? uploadRules : [{ required: false }]
      }
    },
    ifRender(form) {
      return !isWholesaleMarket(form) && chooseTheDoor(form)
    }
  },
  {
    tag: 'upload',
    prop: 'otherFiles',
    itemAttrs: {
      label: '客户其他证明材料(选填)',
      labelTipsSlot: 'otherSlot'
    },
    attrs: {
      rules: [{ required: false }],
      maxCount: 10
    },
    ifRender(form) {
      return chooseTheDoor(form)
    }
  },
  {
    tag: 'radio',
    prop: 'partnerWithSoeFlag',
    itemAttrs: {
      label: '客户是否有与国企合作(选填)'
    },
    attrs: {
      rules: [{ required: false }],
      columns: [
        { value: 'N', label: '没有' },
        { value: 'Y', label: '有' }
      ]
    },
    ifRender(form) {
      return chooseTheDoor(form) && isSteelTrade(form)
    }
  },
  {
    prop: 'partnerWithSoeFlagOther',
    attrs: {
      fieldLabel: '合作国企名称',
      placeholder: '请填写合作的国企名称'
    },
    ifRender(form) {
      return chooseTheDoor(form) && isSteelTrade(form) && form.partnerWithSoeFlag === 'Y'
    }
  },
  {
    tag: 'radio',
    prop: 'partnerWithSteelMillsMode',
    itemAttrs: {
      label: '客户是否有与国企合作(选填)'
    },
    attrs: {
      rules: [{ required: false }],
      isMax: true,
      columns: [
        { value: '采购成品货物', label: '采购成品货物' },
        { value: '采购原材料并自行加工', label: '采购原材料并自行加工' },
        { value: '工贸一体', label: '工贸一体' },
        { value: '其他', label: '其他' }
      ]
    },
    ifRender(form) {
      return chooseTheDoor(form) && isSteelTrade(form)
    }
  },
  {
    prop: 'partnerWithSteelMillsModeOther',
    attrs: {
      fieldLabel: '合作模式',
      placeholder: '请描述客户与钢厂现有的合作模式'
    },
    ifRender(form) {
      return chooseTheDoor(form) && isSteelTrade(form) && form.partnerWithSteelMillsMode === '其他'
    }
  },
  {
    tag: 'checkbox',
    prop: 'mainCollCurrencies',
    itemAttrs: {
      label: '客户目前主要收款的货币(选填)'
    },
    attrs: {
      rules: [{ required: false }],
      path: [
        { value: '人民币', label: '人民币' },
        { value: '外币', label: '外币' }
      ]
    },
    ifRender(form) {
      return chooseTheDoor(form) && isSteelTrade(form)
    }
  },
  {
    prop: 'mainCollCurrenciesOther',
    attrs: {
      fieldLabel: '主要收款货币',
      placeholder: '如有多个币种建议/分割，例:美元/欧元'
    },
    ifRender(form) {
      return chooseTheDoor(form) && isSteelTrade(form) && form.mainCollCurrencies.includes('外币')
    }
  },
  {
    prop: 'remarks',
    getItemAttrs(form) {
      return {
        mt: chooseTheDoor(form)
      }
    },
    attrs: {
      fieldLabel: '备注',
      placeholder: '请输入备注',
      type: 'textarea',
      autosize: true,
      rows: '1'
    },
    getAttrs(form) {
      return {
        optional: chooseTheDoor(form)
      }
    }
  }
]
