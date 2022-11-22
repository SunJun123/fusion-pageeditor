<template>
  <el-collapse>
    <el-collapse-item
      v-for="(componentCategory, componentCategoryIndex) in componentCategoryList"
      :key="componentCategoryIndex"
      title="Consistency"
      :name="componentCategoryIndex"
    >
      <template #title>
        <i :class="componentCategory.icon"></i>
        {{ componentCategory.name }}
      </template>
      <div class="list-box">
        <template
          v-for="(component, componentIndex) in componentCategory.compInfoVos"
          :key="componentIndex"
        >
          <el-popover
            placement="bottom-start"
            popper-class="compopper-panel"
            :width="230"
            trigger="hover"
            :show-arrow="false"
            :offset="6"
          >
            <template #reference>
              <div :key="component?.id" :data-designer-source-id="component?.id" class="compItem">
                <div class="compItem-icon">
                  <IconWidget :class="prefixRef + '-item-icon'" :infer="component?.icon" :style="{ width: '150px', height: '40px' }"></IconWidget>
                </div>
                <div class="compItem-title">
                  {{ component.name }}
                </div>
              </div>
            </template>
            <div class="compopper">
              <div class="compopper-title">
                <span class="name">{{ component.name }}</span>
                <span class="version">v{{ component.version }}</span>
              </div>
              <div class="compopper-desc">
                <span>{{ component.desc }}</span>
              </div>
              <div class="compopper-thumbnail">
                <!-- 缩略图 -->
              </div>
            </div>
          </el-popover>
        </template>
      </div>
    </el-collapse-item>
  </el-collapse>
</template>

<script lang="ts" setup>
import { PropType, ref, Ref } from "vue";
import {IconWidget,usePrefix} from "fusion-renderer"
const prefixRef = usePrefix('resource')
const props = defineProps({
  componentCategoryList: {
    type: Object as PropType<any[]> ,
    default: ():Ref<any[]> => ref([]),
  },
})
</script>
<style src="./styles.less"></style>
