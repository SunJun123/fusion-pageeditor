<template>
  <div :class="prefix + '-header'">
    <div :class="prefix + '-header-logo'">
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts">
import cls from "classnames";
import { defineComponent, unref } from "vue";
import { usePosition, usePrefix } from "fusion-renderer";

export default defineComponent({
  setup() {
    const prefixRef = usePrefix("main-panel");
    const positionRef = usePosition();
    const position = unref(positionRef);
    const prefix = unref(prefixRef);
    return { cls, position, prefix, prefixRef, positionRef, };
  },
});
</script>
