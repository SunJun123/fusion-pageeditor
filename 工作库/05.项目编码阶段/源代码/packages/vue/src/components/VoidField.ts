import { h as _h } from 'vue'
import ReactiveField from './ReactiveField'
import { getRawComponent } from '../utils/getRawComponent'

import type { IVoidFieldProps, DefineComponent } from '../types'
import { getVoidFieldProps } from '../utils/getFieldProps'

let VoidField: DefineComponent<IVoidFieldProps>

  VoidField = {
    name: 'VoidField',
    props: getVoidFieldProps(),
    setup(props: IVoidFieldProps, context) {
      return () => {
        const componentData = {
          fieldType: 'VoidField',
          fieldProps: {
            ...props,
            ...getRawComponent(props),
          },
        } as Record<string, unknown>
        return _h(ReactiveField, componentData, context.slots)
      }
    },
  } as unknown as DefineComponent<IVoidFieldProps>
export default VoidField
