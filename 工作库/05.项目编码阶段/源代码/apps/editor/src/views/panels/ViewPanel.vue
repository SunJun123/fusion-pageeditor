<template>
  <template v-if="workbenchRef.type !== type"></template>
  <template v-else-if="workbenchRef.type === 'DESIGNABLE'">
    <Viewport :drag-tips-direction="dragTipsDirection">
      <slot></slot>
    </Viewport>
  </template>
  <template v-else>
    <div :style="{overflow: scrollable ? 'overlay' : 'hidden', height: '100%',cursor: 'auto',userSelect: 'text',}">
      <slot></slot>
    </div>
  </template>
</template>

<script lang="ts">
import { useWorkbench } from "@/hooks";
import Viewport from "../containers/Viewport.vue";
import { defineComponent } from "vue";
export default defineComponent({
  components: {
    Viewport,
  },
  props: {
    type: { type: String, default: "", },
    scrollable: { type: Boolean, default: true, },
    dragTipsDirection: { type: String, default: "", },
  },
  setup(props) {
    const workbenchRef = useWorkbench();
    return { workbenchRef, };
  },
});
</script>

<style scoped></style>
