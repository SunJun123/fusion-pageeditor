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
        if (rect.value) {
          baseStyle.transform = `perspective(1px) translate3d(${rect.value.x}px,${rect.value.y}px,0)`
          baseStyle.height = isNum(rect.value.height)
            ? rect.value.height + 'px'
            : rect.value.height
          baseStyle.width = isNum(rect.value.width) ? rect.value.width + 'px' : rect.value.width
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
        if (cursorRef.value.status.value !== CursorStatus.Dragging) return null

        const renderDropCover = () => {
          if (
            !viewportDragonRef.closestNode.value ||
            !viewportDragonRef.closestNode.value?.allowAppend(
              viewportDragonRef.dragNodes.value
            ) ||
            viewportDragonRef.closestDirection !== ClosestPosition.Inner
          )
            return null
          return (
            <CoverRect
              {...{
                dropping: true,
                node: viewportDragonRef.closestNode.value,
              }}
            />
          )
        }

        return (
          <>
            {viewportDragonRef.dragNodes.value.map((node) => {
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
