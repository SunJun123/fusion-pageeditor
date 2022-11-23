import { TreeNode } from 'fusion-core'
import { reaction } from 'fusion-reactive'
import cls from 'classnames'
import { useDesigner, usePrefix, useViewport } from 'fusion-renderer'
import { Selector } from './Selector'
import { Copy } from './Copy'
import { Delete } from './Delete'
import { composeExport } from 'fusion-utils'
import { defineComponent, nextTick, ref, unref, watchEffect } from 'vue'
import { DragHandler } from './DragHandler'

const HELPER_DEBOUNCE_TIMEOUT = 100

export interface IHelpersProps {
  node: TreeNode
  nodeRect: DOMRect
}
export interface IViewportState {
  viewportWidth?: number
  viewportHeight?: number
  viewportScrollX?: number
  viewportScrollY?: number
  viewportIsScrollTop?: boolean
  viewportIsScrollBottom?: boolean
}

const HelpersComponent = defineComponent({
  name: 'Helpers',
  props: ['node', 'nodeRect'],
  emits: ['click'],
  setup(props) {
    const prefixRef = usePrefix('aux-helpers')
    const designerRef = useDesigner()
    const viewportRef = useViewport()
    const unmountRef = ref(false)
    const refContainer = ref<HTMLDivElement>()

    const position = ref('top-right')

    watchEffect(
      () => {
        let request: NodeJS.Timeout
        const getYInViewport = (nodeRect: DOMRect, helpersRect: DOMRect) => {
          if (nodeRect.top - viewportRef.value.scrollY > helpersRect.height) {
            return 'top'
          } else if (
            viewportRef.value.isScrollTop &&
            nodeRect.height + helpersRect.height > viewportRef.value.height
          ) {
            return 'inner-top'
          } else if (
            viewportRef.value.isScrollBottom &&
            nodeRect.height + helpersRect.height > viewportRef.value.height
          ) {
            return 'inner-bottom'
          }

          return 'bottom'
        }

        const getXInViewport = (nodeRect: DOMRect, helpersRect: DOMRect) => {
          const widthDelta = helpersRect.width - nodeRect.width
          if (widthDelta >= 0) {
            if (nodeRect.x < widthDelta) {
              return 'left'
            } else if (nodeRect.right + widthDelta > viewportRef.value.width) {
              return 'right'
            } else {
              return 'center'
            }
          }
          return 'right'
        }

        const update = () => {
          const nodeRect = props.nodeRect
          const ref = refContainer
          const helpersRect = ref.value?.getBoundingClientRect()
          if (!helpersRect || !nodeRect) return
          if (unmountRef.value) return
          position.value =
            getYInViewport(nodeRect, helpersRect) +
            '-' +
            getXInViewport(nodeRect, helpersRect)
        }

        nextTick(() => {
          update()
        })
      }
    )

    return () => {
      const node = props.node
      const nodeRect = props.nodeRect
      const designer = designerRef.value
      if (!nodeRect || !node) return null

      return (
        <div
          class={cls(prefixRef.value, {
            [unref(position)]: true,
          })}
          ref={refContainer}
          onClick={e => e.stopPropagation()}
        >
          <div class={cls(prefixRef.value + '-content')}>
            <Selector node={node} />
            {node?.allowClone() === false ? null : <Copy node={node} />}
            {node?.allowDrag() === false ? null : <DragHandler node={node} />}
            {node?.allowDelete() === false ? null : <Delete node={node} />}
          </div>
        </div>
      )
    }
  },
})

export const Helpers = composeExport(HelpersComponent, {
  displayName: 'Helpers',
})
