import { useOperation, usePrefix,IconWidget } from 'fusion-renderer'
import { composeExport } from 'fusion-utils'
import { defineComponent } from 'vue'
import { TreeNode } from 'fusion-core'

// export interface IDeleteProps {
//   node: TreeNode
//   style?: React.CSSProperties
// }

const DeleteComponent = defineComponent({
  props: ['node'],
  setup(props) {
    const operationRef = useOperation()
    const prefixRef = usePrefix('aux-copy')
    return () => {
      if (props.node === props.node.root) return null
      return (
        <button
          class={prefixRef.value}
          onClick={() => {
            TreeNode.remove([props.node])
          }}
        >
          <IconWidget infer="Remove" />
        </button>
      )
    }
  },
})
export const Delete = composeExport(DeleteComponent, { displayName: 'Delete' })
