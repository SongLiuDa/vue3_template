import { defineStore } from 'pinia'

// 应用配置
const useAppStore = defineStore('app', {
  state: () => {
    return {
      cachedViews: []
    }
  },
  actions: {
    // 添加缓存
    addCachedView(view) {
      const { params, name } = view
      if (this.cachedViews.includes(name)) return
      const paramsList = Object.keys(params)
      if (!paramsList.length) {
        this.cachedViews = []
      }
      if (view.meta?.cache) {
        this.cachedViews.push(name)
      }
    },
    // 删除缓存
    delCachedView() {
      this.cachedViews = []
    }
  },
  getters: {
    _cachedViews: state => state.cachedViews
  }
})

export default useAppStore
