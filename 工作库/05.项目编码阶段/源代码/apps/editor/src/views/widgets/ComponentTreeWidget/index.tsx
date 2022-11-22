import { useTree, usePrefix, useDesigner, useComponents,TreeNodeSymbol, DesignerComponentsSymbol,IDesignerComponents } from 'fusion-renderer'
import { TreeNode, GlobalRegistry, ITreeNode } from 'fusion-core'
import { observer } from 'fusion-reactive-vue'
import cls from 'classnames'
import {treeJson} from "./formData.js"
import './styles.less'
import { defineComponent, PropType, provide, VNode, toRef, watch,Component } from 'vue'
import { composeExport } from 'fusion-utils'

export interface IComponentTreeWidgetProps {
  components: IDesignerComponents
}

export interface ITreeNodeWidgetProps {
  node: TreeNode
  // children?: React.ReactChild
}

export const TreeNodeWidgetComponent =
  defineComponent({
    name: 'DnTreeNodeWidget',
    props: {
      node: Object as PropType<TreeNode>,
    },
    setup(props) {
      const designerRef = useDesigner()
      const componentsRef = useComponents()

      provide(TreeNodeSymbol, toRef(props, 'node'))

      return () => {
        const node = props.node!
        // default slot
        const renderChildren = () => {
          return node?.children?.filter(child => {
            const slot = child.props?.['x-slot']
            return !slot || slot === 'default'
          })?.map((child) => {
            return <TreeNodeWidget {...{ node: child }} key={child.id} />
          })
        }
        // 支持 x-slot
        const renderSlots = () => {
          if (node?.designerProps?.selfRenderChildren) return []
          const result = node?.children?.reduce((buffer, child) => {
            const slot = child.props?.['x-slot']
            if (slot) {
              if (!buffer[slot]) buffer[slot] = []
              buffer[slot].push(<TreeNodeWidget node={child} key={child.id} />)
            }
            return buffer
          }, {} as Record<string, VNode[]>)
          return Object.entries(result).reduce((buffer, [key, value]) => {
            buffer[key] = () => value
            return buffer
          }, {} as Record<string, () => VNode[]>)
        }
        const renderProps = (extendsProps: any = {}) => {
          const props = {
            ...node.designerProps?.defaultProps,
            ...extendsProps,
            ...node.props,
            ...node.designerProps?.getComponentProps?.(node),
          }
          return props
        }

        const renderComponent = () => {
          const componentName = node.name
          const Component = componentsRef.value?.[componentName]
          console.log(componentName,Component)
          const dataId = {Component}
          if (Component) {
            if (designerRef.value) {
              dataId[designerRef.value?.props?.nodeIdAttrName] = node.id
            }
            const { style, ...attrs } = renderProps(dataId)
            return (
              <Component {...attrs} key={node.id} style={style} v-slots={renderSlots()}>
                {renderChildren()}
              </Component>
            )
          } else {
            if (node?.children?.length) {
              return <>{renderChildren()}</>
            }
          }
        }
        if (!node) return null
        return renderComponent()
      }
    },
  })

export const TreeNodeWidget = observer(TreeNodeWidgetComponent)

export const ComponentTreeWidgetComponent =
observer(defineComponent({
      name: 'DnComponentTreeWidget',
      props: { components: [Object] },
      setup(props) {
        const treeRef = useTree()
        const prefixRef = usePrefix('component-tree')
        const designerRef = useDesigner()
        designerRef.value.setCurrentTree(treeJson)
        GlobalRegistry.registerDesignerBehaviors(props.components!)
        provide(DesignerComponentsSymbol, toRef(props, 'components'))

        return () => {
          const dataId: Record<string, string> = {}
          if (designerRef.value && treeRef.value && designerRef.value?.props?.nodeIdAttrName) {
            dataId[designerRef.value.props.nodeIdAttrName!] = treeRef.value.id
          }
          return (
            <div class={cls(prefixRef.value)} {...dataId}>
             <TreeNodeWidget {...{ node: treeRef.value }} />
            </div>
          )
        }
      },
    }))

export const ComponentTreeWidget = composeExport(ComponentTreeWidgetComponent, {
  displayName: 'ComponentTreeWidget',
})
