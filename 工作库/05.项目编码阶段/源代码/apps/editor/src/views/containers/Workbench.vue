<template>
  <Workspace :id="workbench.currentWorkspace?.id">
    <slot></slot>
  </Workspace>
</template>
<script lang="ts">
import { useWorkbench } from "fusion-renderer";
import Workspace from "./Workspace.vue"
import {
  defineComponent
} from "vue";

export default defineComponent({
  name: 'Workbench',
  components: {
    Workspace,
  },
  setup() {
    const workbench = useWorkbench()
    return {workbench,}
  },
});
</script>
