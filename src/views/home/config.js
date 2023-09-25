// 极速开户类型
function isQuick(form) {
  return form.openMethods !== 'Standard'
}
// 普通开户
function isGeneralOPenAcc(form) {
  return form.openMethods === 'Standard'
}
// 绿色通道类型为标准批发市场
function isWholesaleMarket(form) {
  return form.openMethods === 'WholesaleMarket'
}
// 选择上门
function chooseTheDoor(form) {
  return form.methods === 'Y'
}

export const openMethodEnum = {
  SameBizCollPlat: '同业收款平台用户',
  Alibaba: '阿里巴巴国际站Verified用户',
  WholesaleMarket: '标准批发市场用户',
  SinosureCustomer: '信保用户',
  HistoryECommerce: '历史电商合作用户'
}

const uploadRules = [
  {
    validator: (value) => {
      if (!value.length) {
        return '必填'
      } else if (value.length < 3) {
        return '至少上传3张照片'
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
    prop: 'methods',
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
          { value: 'N', label: '放弃上门', hide: isWholesaleMarket(form) }
        ]
      }
    }
  },
  {
    tag: 'upload',
    prop: 'a1',
    itemAttrs: {
      label: '销售与客户企业logo合影'
    },
    ifRender(form) {
      return isGeneralOPenAcc(form) && chooseTheDoor(form)
    }
  },
  {
    tag: 'upload',
    prop: 'a2',
    itemAttrs: {
      label: '企业外出拍照打卡',
      labelTipsSlot: 'goOutSlot'
    },
    ifRender(form) {
      return isGeneralOPenAcc(form) && chooseTheDoor(form)
    }
  },
  {
    tag: 'upload',
    prop: 'a3',
    itemAttrs: {
      label: '客户办公场所室内拍照',
      labelTipsSlot: 'officeSlot',
      mb: true
    },
    attrs: {
      rules: uploadRules,
      maxCount: 9
    },
    ifRender(form) {
      return isGeneralOPenAcc(form) && chooseTheDoor(form)
    }
  },
  {
    tag: 'upload',
    prop: 'a4',
    itemAttrs: {
      label: '门头照片'
    },
    ifRender(form) {
      return isQuick(form) && chooseTheDoor(form)
    }
  },
  {
    tag: 'upload',
    prop: 'a5',
    itemAttrs: {
      label: '店铺环境照片',
      labelTipsSlot: 'storeSlot'
    },
    attrs: {
      rules: uploadRules,
      maxCount: 9
    },
    ifRender(form) {
      return isQuick(form) && chooseTheDoor(form)
    }
  },
  {
    tag: 'upload',
    prop: 'a6',
    itemAttrs: {
      label: '销售与店铺老板合照照片',
      mb: true
    },
    ifRender(form) {
      return isQuick(form) && chooseTheDoor(form)
    }
  },
  {
    prop: 'B4',
    attrs: {
      fieldLabel: '备注',
      placeholder: '请输入备注'
    },
    getAttrs(form) {
      return {
        optional: chooseTheDoor(form)
      }
    }
  }
]
