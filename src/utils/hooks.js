import { ref, computed, onMounted, isRef } from 'vue'

/**
 * @description: 列表hooks
 * @param {Promise} fun
 * @return {Array}
 */
export function useList (fun, params) {
  const _params = isRef(params) ? params.value : params
  const loading = ref(false)
  const total = ref(null) // 总数
  const list = ref([]) // 列表
  const finished = computed(() => total.value === list.value.length || total.value === 0) // 完成
  const error = ref(false) // 错误
  function doFetch() {
    loading.value = true
    fun(_params).then(res => {
      const { content, totalElements } = res
      list.value = [...list.value, ...content]
      total.value = totalElements
      loading.value = false
    }).catch(() => {
      loading.value = false
      error.value = true
    })
  }
  return {
    doFetch,
    loading,
    list,
    finished,
    error,
    total
  }
}
/**
 * @description: 请求api
 * @param {Promise} apiFn
 * @param {Object} params
 * @param {Function} success
 * @return {Array}
 */
export function useApi(apiFn, params, success) {
  const _params = isRef(params) ? params.value : params
  const loading = ref(false)
  const data = ref({})
  function doFetch() {
    data.value = {}
    loading.value = true
    apiFn(_params).then(res => {
      data.value = res
      loading.value = false
      success && success(res)
    }).catch(() => {
      loading.value = false
    })
  }
  onMounted(() => {
    if (_params && _params._stop) return
    doFetch()
  })
  return [data, loading]
}
/**
 * @description: 请求手动触发api
 * @param {Promise} apiFn
 * @param {Object} params
 * @param {Function} success
 * @return {Array}
 */
export function useHandleApi(apiFn, params, success) {
  const _params = isRef(params) ? params.value : params
  const loading = ref(false)
  function doFetch() {
    loading.value = true
    apiFn(_params).then(res => {
      loading.value = false
      success && success(res)
    }).catch(() => {
      loading.value = false
    })
  }
  return [doFetch, loading]
}
