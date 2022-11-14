<template>
  <div :class="cls(prefix, className)">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import './styles.less'
import cls from 'classnames'
import { defineComponent } from 'vue'
import { usePrefix } from '@/hooks'

export default defineComponent({
  props: {
    className: {
        type: Object,
        default: ()=>{},
    },
  },
  setup() {
    const prefix = usePrefix('pc-simulator')
    return {prefix,cls,};
  },
});
</script>

<style scoped></style>
