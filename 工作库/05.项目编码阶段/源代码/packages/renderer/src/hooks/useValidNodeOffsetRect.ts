import { TreeNode, CursorStatus, CursorDragType,LayoutObserver, Rect } from 'fusion-core'
import { useViewport } from './useViewport'
import { useDesigner } from './useDesigner'
import { watchEffect } from 'vue'

const isEqualRect = (rect1: Rect, rect2: Rect) => {
  return (
    rect1?.x === rect2?.x &&
    rect1?.y === rect2?.y &&
    rect1?.width === rect2?.width &&
    rect1?.height === rect2?.height
  )
}

export const useValidNodeOffsetRect = (node: TreeNode) => {
  const engine = useDesigner()
  const viewport = useViewport()
  let rectRef = viewport.value.getValidNodeOffsetRect(node)

  const element = viewport.value.findElementById(node?.id)

  const compute = () => {
    if (
      engine.value.cursor.status !== CursorStatus.Normal &&
      engine.value.cursor.dragType === CursorDragType.Move
    )
      return
    const nextRect = viewport.value.getValidNodeOffsetRect(node)
    if (!isEqualRect(rectRef, nextRect) && nextRect) {
      rectRef = nextRect
    }
  }

  watchEffect((onCleanup) => {
    const layoutObserver = new LayoutObserver(compute)
    if (element) layoutObserver.observe(element)
    return () => {
      layoutObserver.disconnect()
    }
  })
  return rectRef
}
