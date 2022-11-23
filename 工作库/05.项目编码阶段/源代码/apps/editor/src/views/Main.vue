<template>
  <Designer :engine="engine">
    <Workbench>
      <StudioPanel>
        <template #logo>
          <LogoWidget></LogoWidget>
        </template>
        <!-- <SiderBarTabPanel #="soltProps">
          <SiderBarPanel title="组件" icon="Component">
            <ResourceWidget
              v-if="soltProps?.activeKey == 0"
              :component-category-list="materialList"
            ></ResourceWidget>
          </SiderBarPanel>
          <SiderBarPanel title="大纲树" icon="Outline">
            <div v-if="soltProps?.activeKey == 1">大纲树</div>
          </SiderBarPanel>
          <SiderBarPanel title="历史记录" icon="History">
            <div v-if="soltProps?.activeKey == 2">历史记录</div>
          </SiderBarPanel>
        </SiderBarTabPanel> -->
        <CompositePanel>
          <CompositePanelItem title="panels.Component" icon="Component">
            <ResourceWidget
              :component-category-list="materialList"
            ></ResourceWidget>
          </CompositePanelItem>
          <CompositePanelItem title="panels.OutlinedTree" icon="Outline">
          </CompositePanelItem>
          <CompositePanelItem title="panels.History" icon="History">
            <HistoryWidget></HistoryWidget>
          </CompositePanelItem>
        </CompositePanel>
        <WorkspacePanel :style="{ height: '100%' }">
          <ViewportPanel>
            <ViewPanel type="DESIGNABLE">
              <ComponentTreeWidget :components="components"></ComponentTreeWidget>
            </ViewPanel>
          </ViewportPanel>
        </WorkspacePanel>
      </StudioPanel>
    </Workbench>
  </Designer>
</template>
<script lang="ts">
import "../theme.less";
import "./panels/styles.less";
import Designer from "./containers/Designer.vue";
import Workbench from "./containers/Workbench.vue";
import StudioPanel from "./panels/StudioPanel.vue";
import SiderBarTabPanel from "./panels/SiderBarTabPanel.vue";
import WorkspacePanel from "./panels/WorkspacePanel.vue";
import ViewportPanel from "./panels/ViewportPanel.vue";
import ViewPanel from "./panels/ViewPanel.vue";
import SiderBarPanel from "./panels/SiderBarPanel.vue";
import {ComponentTreeWidget} from "./widgets/ComponentTreeWidget";
import ResourceWidget from "./widgets/ResourceWidget/index.vue";
import LogoWidget from "./widgets/LogoWidget/index.vue";
import {CompositePanel,CompositePanelItem} from "./panels/CompositePanel"
import {HistoryWidget} from "./widgets/HistoryWidget"
import { createDesigner, GlobalRegistry} from "fusion-core";
import { defineComponent, Ref, ref } from "vue";
import {Element} from "fusion-core"
import { IComponentCategoryListType } from "@/interface";
import {
  Form,
  Field,
  Input,
} from 'fusion-renderer'
export default defineComponent({
  components: {
    Designer,
    Workbench,
    StudioPanel,
    CompositePanel,
    CompositePanelItem,
    WorkspacePanel,
    ViewportPanel,
    ViewPanel,
    ComponentTreeWidget,
    ResourceWidget,
    LogoWidget,
    HistoryWidget,
  },
  setup() {
    const engine = createDesigner({
      rootComponentName: "Form",
    });
    const res = {
      code: "0",
      msg: "成功",
      data: [
        {
          code: "a",
          compInfoVos: [
            {
              id: Input.Resource[0].node.id, //组件id
              createTime: "2022-09-23T21:55:19.000+00:00",
              updateTime: "2022-09-26T15:57:48.000+00:00",
              createId: 0,
              updateId: 0,
              source: 1, //来源：1：云，2：端
              name: "输入框", //组件名称
              code: "E", //组件编码
              version: "1.0.0", //组件版本
              icon: "InputSource", //组件icon
              level: 2, //级别1-行业级、2-应用级
              projectType: "2", //类型，1-移动端组件，2-网页端组件，3-大屏组件
              categoryId: 1, //所属分类id1-公共控制2-公共展示3-权限4-数据容器5-基础业务6-统计图表7-GIS地图9-能管业务
              formatCode: "aaaa", //数据格式code
              sort: 1, //排序
              visibility: 1, //可见性，0：不可见，1：可见
              state: 1, //状态，0：删除，1：开发中，2：提测，3：发布，4：禁用
              thumbnail: "aaaa", //缩略图地址
              desp: "开关组件", //组件描述
              type: "component", //category: 分类 component: 组件
            },
          ],
          icon: "icon iconfont icon-vue-public-control",
          name: "公共控制",
          type: "category",
        },
      ],
    };
    const materialList: Ref<any[]> = ref([]);
    materialList.value = [...res.data];

    return {
      materialList,
      engine,
      components: {
        Form,
        Field,
        Input,
      },
      sources: {
        Inputs: ["ElInput"],
        Arrays: [],
        Displays: [],
        Layouts: ["ElForm"],
      },
    };
  },
});
</script>
