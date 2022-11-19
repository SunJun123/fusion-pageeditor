import { observer } from 'fusion-reactive-vue'
import { defineComponent,PropType } from 'vue'
import { TreeNode } from 'fusion-core'

const NodeTitleWidgetComponent = defineComponent({
  name: 'DnNodeTitleWidget',
  props: {
    node: Object as PropType<TreeNode>
  },
  setup(props) {
    const takeNode = () => {
      const node = props.node!
      if (node.name === '$$ResourceNode$$') {
        return node.children[0]
      }
      return node
    }

    return () => {
      const node = takeNode()
      return (
        <>{node.getMessage('title') || node.name}</>
      )
    }
  },
})
export const NodeTitleWidget = observer(NodeTitleWidgetComponent)
