import { useCursor, usePrefix, useViewport } from 'fusion-renderer'
import { observer } from 'fusion-reactive-vue'
import { CursorStatus, CursorType } from 'fusion-core'
import { calcRectByStartEndPoint, isNum } from 'fusion-utils'
import cls from 'classnames'
import { defineComponent } from 'vue'

export const FreeSelection = observer(
  defineComponent({
    name: 'FreeSelection',
    props: [],
    setup() {
      const cursorRef = useCursor()
      const viewportRef = useViewport()
      const prefixRef = usePrefix('aux-free-selection')

      return () => {
        const cursor = cursorRef.value
        const viewport = viewportRef.value
        const createSelectionStyle = () => {
          const startDragPoint = viewport.getOffsetPoint({
            x: cursor.dragStartPosition.topClientX as number,
            y: cursor.dragStartPosition.topClientY as number,
          })
          const currentPoint = viewport.getOffsetPoint({
            x: cursor.position.topClientX as number,
            y: cursor.position.topClientY as number,
          })
          const rect = calcRectByStartEndPoint(
            startDragPoint,
            currentPoint,
            viewport.dragScrollXDelta,
            viewport.dragScrollYDelta
          )

          const baseStyle: any = {
            position: 'absolute',
            top: 0,
            left: 0,
            opacity: 0.2,
            borderWidth: 1,
            borderStyle: 'solid',
            transform: `perspective(1px) translate3d(${rect.x}px,${rect.y}px,0)`,
            height: isNum(rect.height) ? rect.height + 'px' : rect.height,
            width: isNum(rect.width) ? rect.width + 'px' : rect.width,
            pointerEvents: 'none',
            boxSizing: 'border-box',
            zIndex: 1,
          }
          return baseStyle
        }

        if (
          cursorRef.value.status !== CursorStatus.Dragging ||
          cursorRef.value.type !== CursorType.Selection
        )
          return null
        return (
          <div
            class={cls(prefixRef.value)}
            style={createSelectionStyle()}
          ></div>
        )
      }
    },
  })
)
