import { components } from './components'

export function useVant (app) {
  for (const component of components) {
    app.component(component.name, component)
  }
}
