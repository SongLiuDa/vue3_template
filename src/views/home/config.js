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
  return form.goSiteVerify === 'Y'
}

export const openMethodEnum = {
  WholesaleMarket: '绿通-标准批发市场用户',
  Standard: '普通客户'
}

const uploadRules = [
  {
    validator: (value) => {
      const list = value.filter(item => item.status === 'done')
      if (!value.length) {
        return '必填'
      } else if (list.length < 3) {
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
          { value: 'N', label: '放弃上门', hide: isWholesaleMarket(form) }
        ]
      }
    }
  },
  {
    tag: 'upload',
    prop: 'groupPhotoFile',
    itemAttrs: {
      label: '销售与客户企业logo合影'
    },
    ifRender(form) {
      return isGeneralOPenAcc(form) && chooseTheDoor(form)
    }
  },
  {
    tag: 'upload',
    prop: 'positionFile',
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
    prop: 'envFile',
    itemAttrs: {
      label: '客户办公场所室内拍照',
      labelTipsSlot: 'officeSlot'
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
    prop: 'tradeContractFile',
    itemAttrs: {
      label: '近三个月一笔完整贸易背景证明文件(选填)',
      labelTipsSlot: 'bookingNoteSlot'
    },
    attrs: {
      rules: [{ required: false }]
    },
    ifRender(form) {
      return isGeneralOPenAcc(form) && chooseTheDoor(form)
    }
  },
  {
    tag: 'upload',
    prop: 'tradeLogisticsOrderFile',
    itemAttrs: {
      label: '物流单'
    },
    attrs: {
      rules: [{ required: false }]
    },
    ifRender(form) {
      return isGeneralOPenAcc(form) && chooseTheDoor(form)
    }
  },
  {
    tag: 'upload',
    prop: 'tradeReceiptStatementFile',
    itemAttrs: {
      label: '收款流水单'
    },
    attrs: {
      rules: [{ required: false }]
    },
    ifRender(form) {
      return isGeneralOPenAcc(form) && chooseTheDoor(form)
    }
  },
  {
    tag: 'upload',
    prop: 'otherFiles',
    itemAttrs: {
      label: '其他材料(选填)',
      labelTipsSlot: 'otherFileSlot'
    },
    attrs: {
      rules: [{ required: false }],
      maxCount: 9
    },
    ifRender(form) {
      return isGeneralOPenAcc(form) && chooseTheDoor(form)
    }
  },
  {
    tag: 'upload',
    prop: 'proofOfAssociationFile',
    itemAttrs: {
      label: '关联关系证明(选填)',
      labelTipsSlot: 'correlationProofSlot',
      mb: true
    },
    attrs: {
      rules: [{ required: false }],
      maxCount: 5
    },
    ifRender(form) {
      return isGeneralOPenAcc(form) && chooseTheDoor(form)
    }
  },
  {
    tag: 'upload',
    prop: 'positionFile',
    itemAttrs: {
      label: '门头照片'
    },
    ifRender(form) {
      return isQuick(form) && chooseTheDoor(form)
    }
  },
  {
    tag: 'upload',
    prop: 'envFile',
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
    prop: 'groupPhotoFile',
    itemAttrs: {
      label: '销售与店铺老板合照照片',
      mb: true
    },
    ifRender(form) {
      return isQuick(form) && chooseTheDoor(form)
    }
  },
  {
    prop: 'remarks',
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
