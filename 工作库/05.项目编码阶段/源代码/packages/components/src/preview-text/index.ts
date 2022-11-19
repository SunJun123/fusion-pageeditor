import {
  createContext,
  resolveComponent,
  useContext,
} from '../__builtins__/shared'
import { isValid,composeExport } from 'fusion-utils'
import { stylePrefix } from '../__builtins__/configs'
import {Space} from '../space'
import { computed, defineComponent, h, Ref, toRef } from 'vue'

const prefixCls = `${stylePrefix}-preview-text`
const PlaceholderContext = createContext('N/A')

export const usePlaceholder = (value?: Ref<any>) => {
  const placeholderCtx = useContext(PlaceholderContext)
  const placeholder = computed(() => {
    return isValid(value?.value) && value?.value !== ''
      ? value?.value
      : resolveComponent(placeholderCtx.value) || 'N/A'
  })
  return placeholder
}

const Input = defineComponent({
  name: 'FPreviewTextInput',
  props: ['value'],
  setup(props, { attrs, slots }) {
    const value = toRef(props, 'value')
    const placeholder = usePlaceholder(value)
    return () => {
      return h(
        Space,
        {
          class: [prefixCls],
          style: attrs.style,
        },
        {
          default: () =>
            [
              slots?.prepend?.(),
              slots?.prefix?.(),
              placeholder.value,
              slots?.suffix?.(),
              slots?.append?.(),
            ].filter((child) => !!child),
        }
      )
    }
  },
})

const Text = defineComponent<any>({
  name: 'FPreviewText',
  setup(_props, { attrs }) {
    const placeholder = usePlaceholder()

    return () => {
      return h(
        'div',
        {
          class: [prefixCls],
          style: attrs.style,
        },
        {
          default: () => placeholder.value,
        }
      )
    }
  },
})

export const PreviewText = composeExport(Text, {
  Input,
  Placeholder: PlaceholderContext.Provider,
  usePlaceholder,
}) as any

export default PreviewText
