<template>
  <PCSimulator v-if="screenRef.type === ScreenType.PC">
    <slot></slot>
  </PCSimulator>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ScreenType } from 'fusion-core'
import { useScreen } from 'fusion-renderer'
import PCSimulator from "../simulators/PCSimulator/index.vue"
export type ISimulatorProps = HTMLDivElement & any
export default defineComponent({
  components: {
    PCSimulator,
  },
  setup() {
    const screenRef = useScreen()
    return {screenRef,ScreenType,};
  },
});
</script>

<style scoped></style>
