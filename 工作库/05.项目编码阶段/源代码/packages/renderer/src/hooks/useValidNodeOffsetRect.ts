import { TreeNode, CursorStatus, CursorDragType,LayoutObserver, Rect } from 'fusion-core'
import { useViewport } from './useViewport'
import { useDesigner } from './useDesigner'
import { getCurrentInstance, onMounted, Ref, shallowRef, watch, watchEffect } from 'vue'

const isEqualRect = (rect1: Rect, rect2: Rect) => {
  return (
    rect1?.x === rect2?.x &&
    rect1?.y === rect2?.y &&
    rect1?.width === rect2?.width &&
    rect1?.height === rect2?.height
  )
}

export const useValidNodeOffsetRect = (nodeRef: Ref<TreeNode>) => {
  const { proxy: { $forceUpdate: forceUpdate } } = getCurrentInstance()!
  const engine = useDesigner()
  const viewportRef = useViewport()
  const rectRef = shallowRef<Ref<Rect>>(
    nodeRef.value ? viewportRef.value.getValidNodeOffsetRect(nodeRef.value) as any : null
  )

  const compute = async () => {
    if (
      nodeRef.value && engine.value.cursor.status.value !== CursorStatus.Normal &&
      engine.value.cursor.dragType === CursorDragType.Move
    ) return

    await Promise.resolve()
    const nextRect = viewportRef.value.getValidNodeOffsetRect(nodeRef.value)
    if (!isEqualRect(rectRef.value, nextRect) && nextRect) {
      rectRef.value = nextRect
      forceUpdate()
    }
  }

  onMounted(()=>{
    compute()
  })
  watch(nodeRef,()=>{
    const node = nodeRef.value
    const viewport = viewportRef.value
    const element = viewport.findElementById(node?.id)
    const layoutObserver = new LayoutObserver(compute)
    if (element && element.isConnected) layoutObserver.observe(element)
  },{
    immediate: true
  })
  return rectRef
}
