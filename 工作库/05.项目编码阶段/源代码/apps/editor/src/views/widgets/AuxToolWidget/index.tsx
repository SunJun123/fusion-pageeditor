import {
  useViewport,
  useDesigner,
  usePrefix,
} from 'fusion-renderer'
import { Insertion } from './Insertion'
import { Selection } from './Selection'
import { FreeSelection } from './FreeSelection'
import { Cover } from './Cover'
import { DashedBox } from './DashedBox'
import './styles.less'
import { composeExport } from 'fusion-utils'
import { defineComponent, onBeforeUnmount, ref } from 'vue'

const AuxToolWidgetComponent = defineComponent({
  name: 'DnAuxToolWidget',
  props: [],
  setup() {
    const engineRef = useDesigner()
    const viewportRef = useViewport()
    const prefixRef = usePrefix('auxtool')
    const _ref = ref<HTMLDivElement>()

    let engineSubs: any = []

    // [engine, viewport]
    const cb1 = engineRef.value.subscribeWith('viewport:scroll', () => {
      if (viewportRef.value.isIframe && _ref.value) {
        _ref.value.style.transform = `perspective(1px) translate3d(${-viewportRef
          .value.scrollX}px,${-viewportRef.value.scrollY}px,0)`
      }
    })

    engineSubs.push(cb1)

    onBeforeUnmount(() => {
      engineSubs.map((enginecb: () => any) => enginecb())
    })

    return () => {
      if (!viewportRef.value) return null

      return (
        <div ref={_ref} class={prefixRef.value}>
          <Insertion />
          <DashedBox />
          <Selection />
          <Cover />
          <FreeSelection />
        </div>
      )
    }
  },
})

export const AuxToolWidget = composeExport(AuxToolWidgetComponent, {
  displayName: 'AuxToolWidget',
})
