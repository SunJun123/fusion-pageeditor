import { GlobalRegistry, IDesignerRegistry } from '../registry'
import { globalThisPolyfill } from '../shared'

export const useRegistry = (): IDesignerRegistry => {
  return globalThisPolyfill['__DESIGNER_REGISTRY__'] || GlobalRegistry
}
