<template>
  <div :class="prefix" :style="workspacePanelStyle">
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { usePrefix } from "@/hooks";
import { useStyle } from "@/utils";
export interface IWorkspaceItemProps {
  style?: any;
  flexable?: boolean;
}

export default defineComponent({
  props: {
    flexable: { type: Boolean, default: true, },
  },
  setup(props) {
    const prefix = usePrefix("workspace-panel-item");
    const style = useStyle();
    const workspacePanelStyle = Object.assign(
      { ...style, },
      {
        flexGrow: props.flexable ? 1 : 0,
        flexShrink: props.flexable ? 1 : 0,
      }
    );
    return {
      prefix,
      workspacePanelStyle,
    };
  },
});
</script>
