<template>
  <div :class="cls(prefixRef, { ['direction-' + direction]: !!direction })">
    <div :class="prefixRef + '-tabs'">
      <div
        v-for="(item, index) in items"
        :key="index"
        :href="item.href"
        :class="
          cls(prefixRef + '-tabs-pane', { active: activeKeyRef == item.key })
        "
        @click="openTabContentPanel(item, $event)"
      >
        <div :class="prefixRef + '-tabs-pane-title'">
          {{ item.title }}
        </div>
      </div>
    </div>
    <div v-show="visible" :class="cls(prefixRef + '-tabs-content', { pinning: pinning })">
      <div :class="prefixRef + '-tabs-header'">
        <div :class="prefixRef + '-tabs-header-title'">
          {{ currentItem.title }}
        </div>
        <div :class="prefixRef + '-tabs-header-actions'">
          <div :class="prefixRef + '-tabs-header-extra'">
            {{ currentItem?.extra }}
          </div>
          <IconWidget
            v-if="pinning"
            :key="prefixRef + '-tabs-header-pin-filled'"
            :class="prefixRef + '-tabs-header-pin-filled'"
            @click="onTriggePanel"
          ></IconWidget>
          <IconWidget
            v-else
            :key="prefixRef + '-tabs-header-pin'"
            :icon="'icon-xinjianyemian'"
            :class="prefixRef + '-tabs-header-pin'"
            @click="onTriggePanel"
          ></IconWidget>
          <IconWidget
            :class="prefixRef + '-tabs-header-close'"
            :icon="'icon-xinjianyemian'"
            @click="onCloseTabContent"
          ></IconWidget>
        </div>
      </div>
      <div :key="activeKeyRef" :class="prefixRef + '-tabs-body'">
        <slot :active-key="activeKeyRef"></slot>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { usePrefix } from "@/hooks";
import cls from "classnames";
import { isValid } from "fusion-core";
import { computed, defineComponent, Ref, ref, VNode, watch,h} from "vue";
import IconWidget from "../widgets/IconWidget/index.vue";

export interface ICompositePanelProps {
  direction?: "left" | "right";
  showNavTitle?: boolean;
  defaultOpen?: boolean;
  defaultPinning?: boolean;
  defaultActiveKey?: number;
  activeKey?: number | string;
  onChange?: () => void;
}
export interface ICompositePanelItemProps {
  shape?: "tab" | "button" | "link";
  title?: VNode;
  icon?: VNode;
  key?: number | string;
  href?: string;
  onClick?: () => void;
  extra?: VNode;
}

const parseItems = (children: VNode[]): Array<any> => {
  const items: any[] = [];
  children.forEach((item, index) => {
    items.push({
      key: item.key ?? index,
      ...item?.props,
      children: item,
    });
  });
  return items;
};
const findItem = (items: any[], key: Ref<number>) => {
  for (let index = 0,count = items.length; index < count; index++) {
    const item = items[index];
    if (key.value === index) return item;
    if (key.value === item.key) return item;
  }
};
const getDefaultKey = (children: VNode[]) => {
  const items = parseItems(children);
  return items?.[0]?.key;
};
export default defineComponent({
  components: { IconWidget, },
  props: {
    activeKey: {
      type: Number,
      default: 0,
    },
    defaultActiveKey: {
      type: Number,
      default: 0,
    },
    defaultPinning: {
      type: Boolean,
      default: false,
    },
    showNavTitle: Boolean,
    defaultOpen: {
      type: Boolean,
      default: true,
    },
    direction: {
      type: String,
      default: "",
    },
    onChange: {
      type: Function,
      default: () => {},
    },
  },
  setup(props, ctx) {
    const prefixRef = usePrefix("composite-panel");
    const children = ctx.slots.default?.();
    const activeKeyRef = ref(
      props.defaultActiveKey ?? getDefaultKey(children as unknown as VNode[])
    );

    // 获取所有子组件
    const items = parseItems(children as unknown as VNode[]);

    // 获取所有子组件
    const pinning = ref(props.defaultPinning ?? false);
    const onTriggePanel = () => {
      pinning.value = !pinning.value
    }
    const visible = ref(props.defaultOpen ?? true);
    watch(
      () => props.activeKey,
      () => {
        if (isValid(props.activeKey)) {
          if (props.activeKey !== activeKeyRef.value) {
            activeKeyRef.value = props.activeKey;
          }
        }
      },
      { immediate: true, }
    );
    const currentItem = computed(() => findItem(items, activeKeyRef));

    const openTabContentPanel = function (item: { key: number; onClick: (arg0: MouseEvent) => void; }, e: MouseEvent) {
      if (activeKeyRef.value === item.key) {
        visible.value = !visible.value;
      } else {
        visible.value = true;
      }
      if (!props?.activeKey || !props?.onChange) activeKeyRef.value = item.key;
      item.onClick?.(e);
      props.onChange?.(item.key);
    };
    const onCloseTabContent = function () {
      visible.value = false;
    }
    return {
      cls,
      prefixRef,
      pinning,
      visible,
      items,
      openTabContentPanel,
      currentItem,
      onTriggePanel,
      activeKeyRef,
      onCloseTabContent,
    };
  },
});
</script>
