<template>
  <WorkspacePanelItem>
    <Simulator>
      <slot></slot>
    </Simulator>
  </WorkspacePanelItem>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import WorkspacePanelItem from "./WorkspacePanelItem.vue";
import Simulator from "../containers/Simulator.vue";
export default defineComponent({
  components: {
    WorkspacePanelItem,
    Simulator,
  },
  setup() {
    return {};
  },
});
</script>

<style scoped></style>
