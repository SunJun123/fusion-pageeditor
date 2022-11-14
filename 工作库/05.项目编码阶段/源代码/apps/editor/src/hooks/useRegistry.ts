import { GlobalRegistry, IDesignerRegistry } from 'fusion-core'

export const useRegistry = (): IDesignerRegistry => {
  return window['__DESIGNER_REGISTRY__'] || GlobalRegistry
}
