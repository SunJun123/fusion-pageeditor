<template>
  <div :class="prefixRef">
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { usePrefix } from "@/hooks";

export default defineComponent({
  setup() {
    const prefixRef = usePrefix("main-panel");
    return { prefixRef, };
  },
});
</script>
