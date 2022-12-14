import { usePrefix,IconWidget } from 'fusion-renderer'
import { defineComponent } from 'vue'
import { composeExport,useStyle } from 'fusion-utils'
import { TreeNode } from 'fusion-core'

const CopyComponent = defineComponent({
  name: 'CopyComponent',
  props: ['node'],
  setup(props) {
    const prefixRef = usePrefix('aux-copy')
    const style = useStyle()
    return () => {
      if (props.node === props.node.root) return null
      return (
        <button
          class={prefixRef.value}
          style={style}
          onClick={() => {
            TreeNode.clone([props.node])
          }}
        >
          <IconWidget infer="Clone" />
        </button>
      )
    }
  },
})

export const Copy = composeExport(CopyComponent, { displayName: 'Copy' })
