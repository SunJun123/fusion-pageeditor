<template>
  <div :class="cls(prefixRef)" v-bind="dataId">
    <template v-for="item in elementNodes" :key="item.id">
      <TreeNodeWidget :child-element="item"></TreeNodeWidget>
    </template>
  </div>
</template>

<script lang="ts">
import './styles.less'
import { useDesigner, usePrefix, useTree } from "fusion-renderer";
import { TreeNode } from "fusion-core";
import { defineComponent, PropType } from "vue";
import cls from "classnames";
import TreeNodeWidget from "../TreeNodeWidget/index.vue"
import TreeNodeWrapWidget from "../TreeNodeWidget/TreeNodeWrapWidget.vue"
import app from "@/appInstance";
import {treeJson} from "./formData.js"
app.component("TreeNodeWidget",TreeNodeWidget);
app.component("TreeNodeWrapWidget",TreeNodeWrapWidget);
export default defineComponent({
  props: {
    node: {
      type: Object as PropType<TreeNode>,
      default: () => {},
    },
  },
  setup() {
    const prefixRef = usePrefix('component-tree')
    const designerRef = useDesigner();
    const treeRef = useTree();
    designerRef.value.setCurrentTree(treeJson)
    const elementNodes = treeRef.value.serialize().children;
    const dataId: Record<string, string> = {}
    if (designerRef.value && treeRef.value && designerRef.value?.props?.nodeIdAttrName) {
      dataId[designerRef.value.props.nodeIdAttrName!] = treeRef.value.id.toString()
    }
    return { elementNodes, cls,prefixRef,dataId, };
  },
});
</script>

<style scoped></style>
