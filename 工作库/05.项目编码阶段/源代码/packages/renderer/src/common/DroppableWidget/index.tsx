import { TreeNode } from 'fusion-core'
import { observer } from 'fusion-reactive-vue'
import { useTreeNode, useNodeIdProps } from '../../hooks'
import { NodeTitleWidget } from '../NodeTitleWidget'
import { INodeActionsWidgetActionProps, NodeActionsWidget } from '../NodeActionsWidget'
import './styles.less'
import { defineComponent, CSSProperties, PropType } from 'vue'
import { isNum, isStr } from 'fusion-utils'

export interface IDroppableWidgetProps {
  node?: TreeNode
  actions?: INodeActionsWidgetActionProps[]
  placeholder?: boolean
  height?: number
  style?: CSSProperties
  hasChildren?: boolean
}

export const DroppableWidget =
  defineComponent({
    name: 'DnDroppableWidget',
    inheritAttrs: false,
    props: {
      node: { type: Object as PropType<TreeNode> },
      height: {
        type: Number || String
      },
      actions: { type: Array as PropType<Array<INodeActionsWidgetActionProps>> },
      placeholder: { type: Boolean as PropType<boolean>, default: true },
      hasChildren: { type: Boolean as PropType<boolean>, default: undefined }
    },
    setup(props, { attrs, slots }) {
      const nodeRef = useTreeNode()
      const nodeIdRef = useNodeIdProps(props.node)

      return () => {
        const target = props.node ?? nodeRef.value
        if (!target) return
        const children = slots.default?.()
        const hasChildren = props.hasChildren ?? (target.children?.length > 0 && children)
        return (
          <div {...nodeIdRef.value} {...attrs} class={attrs.class}>
            {hasChildren ? (
              children
            ) : props.placeholder ? (
              <div style={{ height: isStr(props.height) ? props.height : props.height + 'px' }} class="dn-droppable-placeholder">
                <NodeTitleWidget node={target} />
              </div>
            ) : (
              children
            )}
            {props.actions?.length ? (
              <NodeActionsWidget>
                {props.actions.map((action, key) => (
                  <NodeActionsWidget.Action {...action} key={key} />
                ))}
              </NodeActionsWidget>
            ) : null}
          </div>
        )
      }
    }
  })
