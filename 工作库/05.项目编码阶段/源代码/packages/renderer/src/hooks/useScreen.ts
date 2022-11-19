import { useDesigner } from './useDesigner'
import { computed } from 'vue'
import { Engine } from 'fusion-core'

export const useScreen = () => {
  const designer = useDesigner()
  return computed<Engine['screen']>(() => designer.value?.screen)
}
