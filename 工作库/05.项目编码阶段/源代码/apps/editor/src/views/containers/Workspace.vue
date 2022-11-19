<template>
  <slot></slot>
</template>
<script lang="ts">
import { WorkspaceSymbol,useDesigner } from "fusion-renderer";
import {
  defineComponent, provide, ref, unref
} from "vue";

export default defineComponent({
  name: "Workspace",
  props: {
    id: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    //const oldId = ref<string>()
    const designerRef = useDesigner()

    // memo [id, designer]
    // const workspace = computed(() => {
    //   const designer = unref(designerRef)
    //   if (!designer) return
    //   if (oldId.value && oldId.value !== props.id) {
    //     const old = designer.workbench.findWorkspaceById(oldId.value)
    //     if (old) old.viewport.detachEvents()
    //   }
    //   const workspace = {
    //     id: props.id || 'index',
    //     title: props.title,
    //     description: props.description,
    //   }
    //   designer.workbench.ensureWorkspace(workspace)
    //   console.log("-------Workspace--------")
    //   // eslint-disable-next-line vue/no-side-effects-in-computed-properties
    //   oldId.value = workspace.id
    //   return workspace
    // })
    const designer = unref(designerRef)
    const workspace = {
        id: props.id || 'index',
        title: props.title,
        description: props.description,
      };
     designer.workbench.ensureWorkspace(workspace)
    provide(WorkspaceSymbol, ref(workspace))
    return {};
  },
});
</script>
