import { DefineComponent } from '../types'
import { defineComponent } from 'vue'

export const Fragment = '#fragment'

let FragmentComponent: DefineComponent<{}>

  /* istanbul ignore next */
  FragmentComponent = defineComponent({
    name: 'Fragment',
    render() {
      return this.$slots.default()
    },
  })

export { FragmentComponent }
