import {
  useViewport,
  useMoveHelper,
  useCursor,
  useValidNodeOffsetRect,
  usePrefix,
} from 'fusion-renderer'
import { observer } from 'fusion-reactive-vue'
import { CursorStatus, ClosestPosition } from 'fusion-core'
import cls from 'classnames'
import { defineComponent, toRef } from 'vue'
import { composeExport,isNum } from 'fusion-utils'

// interface ICoverRectProps {
//   node: TreeNode
//   dragging?: boolean
//   dropping?: boolean
// }

const CoverRect = defineComponent({
  name: 'CoverRect',
  props: ['dragging', 'dropping', 'node'],
  setup(props) {
    const prefixRef = usePrefix('aux-cover-rect')
    const rectRef = useValidNodeOffsetRect(props.node)

    return () => {
      const rect = rectRef
      const createCoverStyle = () => {
        const baseStyle: any = {
          position: 'absolute',
          top: 0,
          left: 0,
          pointerEvents: 'none',
        }
        if (rect) {
          baseStyle.transform = `perspective(1px) translate3d(${rect.x}px,${rect.y}px,0)`
          baseStyle.height = isNum(rect.height)
            ? rect.height + 'px'
            : rect.height
          baseStyle.width = isNum(rect.width) ? rect.width + 'px' : rect.width
        }
        return baseStyle
      }
      return (
        <div
          class={cls(prefixRef.value, {
            dragging: props.dragging,
            dropping: props.dropping,
          })}
          style={createCoverStyle()}
        ></div>
      )
    }
  },
})

const CoverComponent = observer(
  defineComponent({
    name: 'CoverComponent',
    setup() {
      const viewportDragonRef = useMoveHelper()
      const viewportRef = useViewport()
      const cursorRef = useCursor()

      return () => {
        if (cursorRef.value.status !== CursorStatus.Dragging) return null

        const renderDropCover = () => {
          if (
            !viewportDragonRef.closestNode ||
            !viewportDragonRef.closestNode?.allowAppend(
              viewportDragonRef.dragNodes
            ) ||
            viewportDragonRef.closestDirection !== ClosestPosition.Inner
          )
            return null
          return (
            <CoverRect
              {...{
                dropping: true,
                node: viewportDragonRef.closestNode,
              }}
            />
          )
        }

        return (
          <>
            {viewportDragonRef.dragNodes.map((node) => {
              if (!node) return
              if (!viewportRef.value.findElementById(node.id)) return
              return (
                <CoverRect
                  key={node.id}
                  {...{ dragging: true, node: node }}
                />
              )
            })}
            {renderDropCover()}
          </>
        )
      }
    },
  })
)

export const Cover = composeExport(CoverComponent, { displayName: 'Cover' })
