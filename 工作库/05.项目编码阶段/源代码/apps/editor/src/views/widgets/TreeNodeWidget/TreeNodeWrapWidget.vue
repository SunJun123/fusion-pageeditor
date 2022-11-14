<template>
  <component :is="elementName">
    <slot :tree-node="childElement"></slot>
  </component>
</template>

<script setup lang="ts">
import { computed, toRefs } from "vue";
import { IElement } from "fusion-core";
const props = defineProps<{
  childElement: IElement;
}>();
const { childElement,} = toRefs(props);

// 组件名称
const elementName = computed(() => childElement.value.name.split('-')[0])
</script>
