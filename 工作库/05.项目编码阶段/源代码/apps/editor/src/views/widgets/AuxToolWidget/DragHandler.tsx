import { TreeNode } from 'fusion-core'
import { observer } from 'fusion-reactive-vue'
import { useDesigner, usePrefix,IconWidget } from 'fusion-renderer'
import { useStyle } from 'fusion-utils'
import { defineComponent,PropType } from 'vue'

export interface IDragHandlerProps {
  node: TreeNode
}

export const DragHandler = observer(
  defineComponent({
    name: 'DragHandler',
    props: { node: { type: Object as PropType<TreeNode> } },
    setup(props) {
      const designerRef = useDesigner()
      const style = useStyle()
      const prefixRef = usePrefix('aux-drag-handler')

      return () => {
        const prefix = prefixRef.value
        const designer = designerRef.value
        const node = props.node!
        if (node === node.root || !node.allowDrag()) return null
        const handlerProps = {
          [designer.props.nodeDragHandlerAttrName!]: 'true',
        }
        return (
          <button {...handlerProps} class={prefix} style={style}>
            <IconWidget infer="Move" />
          </button>
        )
      }
    }
  })

)

DragHandler.displayName = 'DragHandler'
