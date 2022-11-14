import { observer as observerV3 } from './observerInVue3'
import collectData from './collectData'
import { IObserverOptions } from '../types'

export function observer<C>(baseComponent: C, options?: IObserverOptions): C {
  return observerV3(baseComponent, options)
}

export { collectData }
