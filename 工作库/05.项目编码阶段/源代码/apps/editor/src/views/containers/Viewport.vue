<template>
  <div ref="refInstance" :class="cls(prefixRef)" :style="viewportStyle">
    <slot></slot>
    <AuxToolWidget></AuxToolWidget>
    <EmptyWidget :drag-tips-direction="dragTipsDirection">
      {{ placeholder }}
    </EmptyWidget>
  </div>
</template>

<script lang="ts">
import { usePrefix, useViewport } from "fusion-renderer";
import { Viewport as ViewportType, requestIdle } from "fusion-core";
import cls from "classnames";
import { defineComponent, onBeforeUnmount, onMounted, ref } from "vue";
import {EmptyWidget} from "../widgets/EmptyWidget";
import {AuxToolWidget} from "../widgets/AuxToolWidget";
import { useStyle } from "@/utils";

export default defineComponent({
  components: {
    EmptyWidget,
    AuxToolWidget,
  },
  props: {
    placeholder: {},
    dragTipsDirection: {
      type: String,
      default: "",
    },
  },
  setup() {
    const loaded = ref(false);
    const prefixRef = usePrefix("viewport");
    const viewportHookRef = useViewport();
    const refInstance = ref<HTMLElement>();

    // 该组件内部缓存的ref
    const viewportRef = ref<ViewportType>();
    const isFrameRef = ref(false);
    onMounted(() => {
      const ref = refInstance;
      const frameElement = ref.value?.querySelector("iframe");
      if (!viewportHookRef.value) return;
      if (viewportRef.value && viewportRef.value !== viewportHookRef.value) {
        viewportRef.value.onUnmount();
      }
      if (frameElement) {
        frameElement.addEventListener("load", () => {
          frameElement.contentWindow && viewportHookRef.value.onMount(
            frameElement,
            frameElement.contentWindow
          );
          requestIdle(() => {
            isFrameRef.value = true;
            loaded.value = true;
          });
        });
      } else {
        ref.value && viewportHookRef.value.onMount(ref.value, window);
        requestIdle(() => {
          isFrameRef.value = false;
          loaded.value = true;
        });
      }
      viewportRef.value = viewportHookRef.value;
    });

    onBeforeUnmount(() => {
      viewportHookRef.value.onUnmount();
    });

    let style = useStyle();
    const viewportStyle = Object.assign(
      { ...style },
      {
        opacity: loaded.value ? 0 : 1,
        overflow: isFrameRef.value ? "hidden" : "overlay",
      }
    );

    return { cls, prefixRef, viewportStyle, refInstance };
  },
});
</script>

<style lang="less">
@import "../../variables.less";

.@{prefix-cls}-viewport {
  height: 100%;
  width: 100%;
  min-height: 100px;
  position: relative;
  outline: none;
  box-sizing: border-box;
  user-select: none;
  overflow: overlay;

  // & > * {
  //   width: fit-content;
  //   height: fit-content;
  //   min-width: 100%;
  //   min-height: 100%;
  // }
}
</style>
