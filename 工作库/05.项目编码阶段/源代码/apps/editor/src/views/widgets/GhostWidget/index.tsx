import { useCursor, usePrefix, useDesigner,NodeTitleWidget } from 'fusion-renderer'
import { CursorStatus } from 'fusion-core'
import { observer } from 'fusion-reactive-vue'
import './styles.less'
import { composeExport } from 'fusion-utils'
import { defineComponent, isReactive, isRef, ref, unref, watch, watchEffect } from 'vue'

const GhostWidgetComponent = defineComponent({
  setup() {
    const designerRef = useDesigner()
    const cursorRef = useCursor()
    const refInstance = ref<HTMLDivElement>()
    const prefixRef = usePrefix('ghost')
    watch(cursorRef.value.position,
      () =>{
        const position = unref(cursorRef.value.position)
        const ref = refInstance.value
        const transform = `perspective(1px) translate3d(${position.topClientX! - 18
          }px,${position.topClientY! - 12}px,0) scale(0.8)`
        if (!ref) return
        ref.style.transform = transform
      },{
        deep: true
      },
    )

    return () => {
      const designer = unref(designerRef)
      const cursor = unref(cursorRef)

      const draggingNodes = designer.findMovingNodes()
      const firstNode = draggingNodes[0]

      const renderNodes = () => {
        return (
          <span
            style={{
              whiteSpace: 'nowrap',
            }}
          >
            <NodeTitleWidget node={firstNode} />
            {draggingNodes.length > 1 ? '...' : ''}
          </span>
        )
      }

      if (!firstNode) return null

      return cursor.status.value === CursorStatus.Dragging ? (
        <div class={prefixRef.value} ref={refInstance}>
          {renderNodes()}
        </div>
      ) : null
    }
  },
})

export const GhostWidget = composeExport(observer(GhostWidgetComponent), {
  displayName: 'GhostWidget',
})
