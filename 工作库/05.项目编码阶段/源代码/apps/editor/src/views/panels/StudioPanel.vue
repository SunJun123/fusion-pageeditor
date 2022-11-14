<template>
  <Layout :theme="theme" :prefix-cls="prefixCls" :position="position">
    <div :class="cls(prefix + '-container', 'root', position)">
      <StudioHeaderPanel>
        <slot name="logo"></slot>
      </StudioHeaderPanel>
      <StudioBodyPanel>
        <slot></slot>
      </StudioBodyPanel>
    </div>
  </Layout>
</template>
<script lang="ts">
import Layout from '../containers/Layout.vue'
import StudioHeaderPanel from './StudioHeaderPanel.vue'
import StudioBodyPanel from './StudioBodyPanel.vue'
import { defineComponent, PropType, StyleValue, unref } from 'vue'
import { IDesignerLayoutProps } from '@/types'
import cls from "classnames";
import { usePrefix } from '@/hooks'

export interface IStudioPanelProps {
  style?: StyleValue
  className?: string
  prefixCls?: string
  theme?: string
  position?: IDesignerLayoutProps['position']
}

export default defineComponent({
  components: {
    Layout,
    StudioBodyPanel,
    StudioHeaderPanel,
  },
  props: {
    theme: { type: String, default: 'light', },
    prefixCls: { type: String, default: 'dn-', },
    position: { type: String as PropType<IDesignerLayoutProps["position"]>, default: 'fixed', },
  },
  setup() {
    const prefixRef = usePrefix("main-panel");
    const prefix = unref(prefixRef);
    return { cls, prefix, prefixRef, };
  },
});
</script>
