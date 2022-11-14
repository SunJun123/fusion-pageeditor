import { h as _h } from 'vue'
import ReactiveField from './ReactiveField'
import { getRawComponent } from '../utils/getRawComponent'

import type { IFieldProps, DefineComponent } from '../types'
import { getFieldProps } from '../utils/getFieldProps'

let Field: DefineComponent<IFieldProps>

  Field = {
    name: 'Field',
    props: getFieldProps(),
    setup(props: IFieldProps, context) {
      return () => {
        const componentData = {
          fieldType: 'Field',
          fieldProps: {
            ...props,
            ...getRawComponent(props),
          },
        } as Record<string, unknown>
        return _h(ReactiveField, componentData, context.slots)
      }
    },
  } as unknown as DefineComponent<IFieldProps>

export default Field
