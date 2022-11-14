import { Engine } from '../models'
import { DesignerEngineContext } from '../context'
import { isFn, globalThisPolyfill } from '../shared'
import { onMounted } from 'vue'
export interface IEffects {
  (engine: Engine): void
}

export const useDesigner = (effects?: IEffects): Engine => {
  const designer: Engine =
    globalThisPolyfill['__DESIGNABLE_ENGINE__'] ||
    DesignerEngineContext
  onMounted(() => {
    if (isFn(effects)) {
      return effects(designer)
    }
  })
  return designer
}
