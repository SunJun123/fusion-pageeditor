import { useTree, usePrefix, IconWidget } from 'fusion-renderer'
import './styles.less'
import { defineComponent } from 'vue'

export interface IEmptyWidgetProps {
  dragTipsDirection?: 'left' | 'right'
}

const EmptyWidgetComponent = defineComponent({
  name: 'DnEmptyWidget',
  props: {
    dragTipsDirection: { type: String, default: 'left' },
  },
  setup(props, { slots }) {
    const treeRef = useTree()
    const prefixRef = usePrefix('empty')

    return () => {
      const renderEmpty = () => {
        return (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div class="animations">
              <IconWidget
                {...{
                  infer:
                    props.dragTipsDirection === 'left'
                      ? 'DragLeftSourceAnimation'
                      : 'DragRightSourceAnimation',
                  size: 240,
                }}
              />
              <IconWidget {...{ infer: 'BatchDragAnimation', size: 240 }} />
            </div>
            <div class="hotkeys-list">
              <div>
                Selection <IconWidget infer="Command" /> + Click /{' '}
                <IconWidget infer="Shift" /> + Click /{' '}
                <IconWidget infer="Command" /> + A
              </div>
              <div>
                Copy <IconWidget infer="Command" /> + C / Paste{' '}
                <IconWidget infer="Command" /> + V
              </div>
              <div>
                Delete <IconWidget infer="Delete" />
              </div>
            </div>
          </div>
        )
      }
      if (!treeRef.value.children.value.length) {
        return (
          <div class={prefixRef.value}>
            {renderEmpty()}
          </div>
        )
      }
      return null
    }
  },
})
export const EmptyWidget = EmptyWidgetComponent
