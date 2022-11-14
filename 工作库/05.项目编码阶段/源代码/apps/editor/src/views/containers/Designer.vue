<template>
  <Layout :theme="theme" :prefix-cls="prefixCls">
    <slot></slot>
  </Layout>
</template>
<script lang="ts">
import { Engine } from "fusion-core";
import { DesignerEngineSymbol } from "@/context";
import { IDesignerProps } from "@/types";
import Layout from "./Layout.vue";
import {
  defineComponent,
  onBeforeUnmount,
  provide,
  ref,
  toRef,
  PropType,
  watchEffect
} from "vue";
export default defineComponent({
  name: "Designer",
  components: {
    Layout,
  },
  props: {
    engine: {
      type: Object as PropType<IDesignerProps["engine"]>,
      default: null,
    },
    theme: {
      type: String as PropType<IDesignerProps["theme"]>,
      default: "light",
    },
    prefixCls: {
      type: String as PropType<IDesignerProps["prefixCls"]>,
      default: "dn-",
    },
    variables: {
      type: Object as PropType<IDesignerProps["variables"]>,
      default: () => {},
    },
  },
  setup(props) {
    const refInstance = ref<Engine | null>(null);

    watchEffect(() => {
      if (props.engine) {
        if (props.engine && refInstance.value) {
          if (props.engine !== refInstance.value) {
            refInstance.value.unmount();
          }
        }
        props.engine.mount();
        refInstance.value = props.engine;
      }
    });
    provide(DesignerEngineSymbol, toRef(props, "engine"));
    onBeforeUnmount(() => {
      if (props.engine) {
        props.engine.unmount();
      }
    });

    return {};
  },
});
</script>
