<template>
  <Designer :engine="engine">
    <Workbench>
      <StudioPanel>
        <template #logo>
          <LogoWidget></LogoWidget>
        </template>
        <SiderBarTabPanel #="soltProps">
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
        </SiderBarTabPanel>
        <WorkspacePanel :style="{ height: '100%' }">
          <ViewportPanel>
            <ViewPanel type="DESIGNABLE">
              <ComponentTreeWidget></ComponentTreeWidget>
              <!-- <Suspense>
                <ComponentTreeWidget></ComponentTreeWidget>
                <template #fallback>
                  Loading...
                </template>
              </Suspense> -->
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
import ComponentTreeWidget from "./widgets/ComponentTreeWidget/index.vue";
import ResourceWidget from "./widgets/ResourceWidget/index.vue";
import LogoWidget from "./widgets/LogoWidget/index.vue";
import { createDesigner, uid } from "fusion-core";
import { defineComponent, Ref, ref } from "vue";
import {Element} from "fusion-core"
import { getComponent } from "@/api/pageService";
import { ProjectTypeEnum, ComponentLevelEnum } from "@/enum";
import type { ResData } from "fusion-apis";
import { IComponentCategoryListType } from "@/interface";

export default defineComponent({
  components: {
    Designer,
    Workbench,
    StudioPanel,
    SiderBarTabPanel,
    WorkspacePanel,
    ViewportPanel,
    ViewPanel,
    SiderBarPanel,
    ComponentTreeWidget,
    ResourceWidget,
    LogoWidget,
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
              id: "awefawefawe1wdawe", //组件id
              createTime: "2022-09-23T21:55:19.000+00:00",
              updateTime: "2022-09-26T15:57:48.000+00:00",
              createId: 0,
              updateId: 0,
              source: 1, //来源：1：云，2：端
              name: "开关", //组件名称
              code: "E", //组件编码
              version: "1.0.0", //组件版本
              icon: "icon-shezhi1", //组件icon
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
            {
              id: 2, //组件id
              createTime: "2022-09-26T16:11:51.000+00:00",
              updateTime: "2022-09-26T16:11:51.000+00:00",
              createId: 0,
              updateId: 0,
              source: 1, //来源：1：云，2：端
              name: "按钮", //组件名称
              code: "bbbb", //组件编码
              version: "1.0.0", //组件版本
              icon: "icon-xianshi-xianshi", //组件icon
              level: 2, //级别1-行业级、2-应用级
              projectType: "2", //类型，1-移动端组件，2-网页端组件，3-大屏组件
              categoryId: 1, //所属分类id1-公共控制2-公共展示3-权限4-数据容器5-基础业务6-统计图表7-GIS地图9-能管业务
              formatCode: "bbbb", //数据格式code
              sort: 2, //排序
              visibility: 1, //可见性，0：不可见，1：可见
              state: 1, //状态，0：删除，1：开发中，2：提测，3：发布，4：禁用
              thumbnail: "bbbb", //缩略图地址
              desp: "按钮组件", //组件描述
              type: "component", //category: 分类 component: 组件
            },
          ],
          icon: "icon iconfont icon-vue-public-control",
          name: "公共控制",
          type: "category",
        },
        {
          code: "b",
          compInfoVos: [],
          icon: "icon iconfont icon-vue-show",
          name: "公共展示",
          type: "category",
        },
        {
          code: "c",
          compInfoVos: [],
          icon: "icon iconfont icon-vue-power",
          name: "权限",
          type: "category",
        },
        {
          code: "d",
          compInfoVos: [],
          icon: "icon iconfont icon-vue-databox",
          name: "数据容器",
          type: "category",
        },
        {
          code: "e",
          compInfoVos: [],
          icon: "icon iconfont icon-vue-basic-business",
          name: "基础业务",
          type: "category",
        },
        {
          code: "f",
          compInfoVos: [],
          icon: "icon iconfont icon-vue-chart2",
          name: "统计图表",
          type: "category",
        },
        {
          code: "g",
          compInfoVos: [],
          icon: "icon iconfont icon-mapselection",
          name: "GIS地图",
          type: "category",
        },
        {
          code: "h",
          compInfoVos: [],
          icon: "icon iconfont icon-vue-databox",
          name: "能管业务",
          type: "category",
        },
      ],
    };

      new Element({
        id: "awefawefawe1wdawe",
        kind: "component",
        props: {},
        name: "$$ResourceNode$$",
        isSourceNode: true,
        code: "ELInput",
        mId: 0,
        mVersion: '0.0.0',
        style: {},
        initValue: {
          baseAttr: {
            left: 0,
            top: 0,
            width: 200,
            height: 40,
          },
          extendAttr: {},
        },
        events: {},
        isReady: true,
        children: [],
      });

    const materialList: Ref<IComponentCategoryListType[]> = ref([]);
    materialList.value = [...res.data];
    // getComponent({
    //   type: ProjectTypeEnum.PC,
    //   level: ComponentLevelEnum.APPLICATION,
    // }).then((res: ResData) => {
    //   if (res.code === "0") {
    //     materialList.value = [...res.data]
    //   }
    // });

    return {
      materialList,
      engine,
      components: {},
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
