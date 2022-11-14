<template>
  <ElTooltip v-if="tooltip" :show-after="200">
    <span
      :class="cls(prefixRef, 'iconfont', icon)"
      :style="{
        cursor: $attrs.onClick ? 'pointer' : style?.cursor,
        width: width,
        height: height,
      }"
      @click="() => $emit('click')"
    >
    </span>
  </ElTooltip>
  <span
    v-else
    :class="cls(prefixRef, 'iconfont', icon)"
    :style="{
      cursor: $attrs.onClick ? 'pointer' : style?.cursor,
      width: width,
      height: height,
    }"
    @click="() => $emit('click')"
  >
  </span>
</template>

<script lang="ts">
import "./styles.less";
import cls from "classnames";
import { usePrefix, useTheme } from "@/hooks";
import { useStyle } from "@/utils";
import { ElTooltipProps } from "element-plus";
import { defineComponent } from "vue";
const isNumSize = (val: any) => /^[\d.]+$/.test(val);
export interface IIconWidgetProps extends HTMLElement {
  tooltip?: ElTooltipProps;
  size?: number | string;
}
export default defineComponent({
  props: {
    tooltip: {
      type: String,
      default: () => {},
    },
    infer: {
      type: String,
      default: "",
     },
    icon: {
      type: String,
      default: "",
    },
    size: {
      type: [Number, String],
      default: "1em",
    },
  },
  emits: ["click"],
  setup(props) {
    const themeRef = useTheme();
    const prefixRef = usePrefix("icon");
    const size = isNumSize(props.size)
      ? `${props.size}px`
      : props.size || "1em";
    const style = useStyle();
    const height = style?.height || size;
    const width = style?.width || size;
    return {
      cls,
      themeRef,
      prefixRef,
      style,
      height,
      width,
    };
  },
});
</script>

<style scoped></style>
