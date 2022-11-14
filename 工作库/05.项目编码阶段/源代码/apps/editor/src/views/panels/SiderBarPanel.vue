<template>
  <slot></slot>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    activeKey: {
      type: Number,
      default: 0,
    },
    index: {
      type: Number,
      default: 0,
    },
    shape: {
      type: String,
      default: "tab",
    },
    title: {
      type: String,
      default: "",
    },
    icon: {
      type: String,
      default: "",
    },
    href: {
      type: String,
      default: "",
    },
    extra: {
      type: String,
      default: "",
    },
    onClick: {
      type: String,
      default: "",
    },
  }
});
</script>
