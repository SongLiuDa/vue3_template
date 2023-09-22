// 动态注册全局组件
const modulesFiles = require.context('.', true, /\.vue$/)
export function useComponent(app) {
  modulesFiles.keys().forEach(element => {
    const component = modulesFiles(element).default
    if (component && component.name) {
      app.component(component.name, component)
    }
  })
}
