<template>
  <div :class="workspacePanelPrefix">
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { usePrefix } from "fusion-renderer";

export default defineComponent({
  components: {
  },
  props: {
    flexable: { type: Boolean, default: false, },
  },
  setup() {
    const workspacePanelPrefix = usePrefix("workspace-panel");
    return {
      workspacePanelPrefix,
    };
  },
});
</script>
