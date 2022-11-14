<template v-if="!treeRef?.children?.length">
  <div :class="prefixRef">
    <template v-if="allIsComment">
      <slot></slot>
    </template>
    <template v-else>
      <div :style="{ display: 'flex', flexDirection: 'column' }">
        <div class="animations">
          <IconWidget :size="240"></IconWidget>
          <IconWidget :size="240"></IconWidget>
        </div>
        <div class="hotkeys-list">
          <div>
            Selection
            <IconWidget infer="Command"></IconWidget> + Click /{' '}
            <IconWidget infer="Shift"></IconWidget> + Click /{' '}
            <IconWidget infer="Command"></IconWidget> + A
          </div>
          <div>
            Copy <IconWidget infer="Command"></IconWidget> + C / Paste{' '}
            <IconWidget infer="Command"></IconWidget> + V
          </div>
          <div>Delete <IconWidget infer="Delete"></IconWidget></div>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useTree, usePrefix } from "@/hooks";
import IconWidget from "../IconWidget/index.vue";
import "./styles.less";
import { isComment } from "element-plus/es/utils/index";
export interface IEmptyWidgetProps {
  dragTipsDirection?: "left" | "right";
}
export default defineComponent({
  components: {
    IconWidget,
  },
  props: {
    dragTipsDirection: { type: String, default: "left",},
  },
  setup(props, { slots,}) {
    const treeRef = useTree();
    const prefixRef = usePrefix("empty");
    const emptyContent = slots.default?.();
    const allIsComment = !emptyContent?.every(isComment);

    return { treeRef, prefixRef, allIsComment,};
  },
});
</script>

<style scoped></style>
