<template>
  <div ref="containerRef" :class="{[prefixCls+`app`]: true,[`${prefixCls}${theme}`]: theme,}">
    <slot></slot>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  provide,
  ref,
  watch,
  computed,
  type PropType
} from "vue";
import {
  DesignerLayoutSymbol,
  IDesignerLayoutContext,
  useContext,
  IDesignerLayoutProps
} from "fusion-renderer";

export default defineComponent({
  name: "Layout",
  props: {
    theme: {
      type: String as PropType<IDesignerLayoutProps["theme"]>,
      default: "light",
    },
    prefixCls: {
      type: String as PropType<IDesignerLayoutProps["prefixCls"]>,
      default: "dn-",
    },
    variables: {
      type: Object as PropType<IDesignerLayoutProps["variables"]>,
      default: () => {},
    },
    position: {
      type: String as PropType<IDesignerLayoutProps["position"]>,
      default: "fixed",
    },
  },
  setup(props, { slots,}) {
    const layoutRef = useContext<IDesignerLayoutContext>(DesignerLayoutSymbol);
    const containerRef = ref<HTMLDivElement>();

    watch(containerRef, () => {
      if (containerRef.value) {
        /* each(props.variables!, (value, key) => {
          containerRef.value?.style?.setProperty(`--${key}`, value);
        }); */
      }
    });

    if (layoutRef.value) {
      return () => {
        return slots.default?.();
      };
    }

    provide(
      DesignerLayoutSymbol,
      computed(() => {
        return {
          theme: props.theme!,
          prefixCls: props.prefixCls!,
          position: props.position!,
        };
      })
    );
    return {};
  },
});
</script>
