import {h as _h } from 'vue'
import ReactiveField from './ReactiveField'
import { getRawComponent } from '../utils/getRawComponent'

import type { IObjectFieldProps, DefineComponent } from '../types'
import { getFieldProps } from '../utils/getFieldProps'

let ObjectField: DefineComponent<IObjectFieldProps>


  ObjectField = {
    name: 'ObjectField',
    props: getFieldProps(),
    setup(props: IObjectFieldProps, context) {
      return () => {
        const componentData = {
          fieldType: 'ObjectField',
          fieldProps: {
            ...props,
            ...getRawComponent(props),
          },
        } as Record<string, unknown>
        return _h(ReactiveField, componentData, context.slots)
      }
    },
  } as unknown as DefineComponent<IObjectFieldProps>

export default ObjectField
