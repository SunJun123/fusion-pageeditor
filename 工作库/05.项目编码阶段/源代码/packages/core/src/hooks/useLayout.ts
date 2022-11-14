import { DesignerLayoutContext } from '../context'
import { IDesignerLayoutContext } from '../types'
import { globalThisPolyfill } from '../shared'

export const useLayout = (): IDesignerLayoutContext => {
  return (
    globalThisPolyfill['__DESIGNABLE_LAYOUT__'] ||
    DesignerLayoutContext
  )
}
