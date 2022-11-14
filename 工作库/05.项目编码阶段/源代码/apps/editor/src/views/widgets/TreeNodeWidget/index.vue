<template>
  <TreeNodeWrapWidget :child-element="childElement">
    <template v-if="childElement.children.length>0">
      <template v-for="child in childElement.children" :key="child.id">
        <TreeNodeWidget :child-element="child"></TreeNodeWidget>
      </template>
    </template>
  </TreeNodeWrapWidget>
</template>

<script lang="ts">
import { useTree } from "@/hooks";
import { IElement } from "fusion-core";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    childElement: {
      type: Object as PropType<IElement>,
      default: () => {},
    },
  },
  setup() {
    const treeRef = useTree();
    const treeNode = treeRef.value.serialize();

    return { treeNode, };
  },
});
</script>

<style scoped></style>
