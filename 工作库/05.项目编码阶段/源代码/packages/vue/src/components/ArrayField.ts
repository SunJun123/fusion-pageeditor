import { h as _h } from 'vue'
import ReactiveField from './ReactiveField'
import { getRawComponent } from '../utils/getRawComponent'

import type { IArrayFieldProps, DefineComponent } from '../types'
import { getFieldProps } from '../utils/getFieldProps'

let ArrayField: DefineComponent<IArrayFieldProps>

  ArrayField = {
    name: 'ArrayField',
    props: getFieldProps(),
    setup(props: IArrayFieldProps, context) {
      return () => {
        const componentData = {
          fieldType: 'ArrayField',
          fieldProps: {
            ...props,
            ...getRawComponent(props),
          },
        } as Record<string, unknown>
        return _h(ReactiveField, componentData, context.slots)
      }
    },
  } as unknown as DefineComponent<IArrayFieldProps>

export default ArrayField
