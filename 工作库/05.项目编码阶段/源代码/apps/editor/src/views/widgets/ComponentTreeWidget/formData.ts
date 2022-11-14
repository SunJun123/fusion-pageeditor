import { IPage } from "fusion-core";

export const treeJson: IPage = {
  id: "940680405676",
  name: "12312321",
  kind: "page",
  props: {},
  children: [
    {
      id: "sotzQEuqrEZpoxu-eimQdJPAm",
      mVersion: "0.0.0",
      kind: "detail-table",
      name: "ElForm-sotzQEuqrEZpoxu-eimQdJPAm",
      code: "ElForm",
      mId: 11,
      style: {},
      props: {},
      events: {},
      initValue: {
        baseAttr: {
          width: 200,
          height: 350,
          left: 344,
          top: 130,
          zIndex: 1,
        },
        extendAttr: { layout: "flow", },
      },
      children: [
        {
          id: "vsqo_wz_K1IVn9M_MCTo1lQdj",
          mVersion: "0.0.0",
          kind: "element",
          name: "ElInput-vsqo_wz_K1IVn9M_MCTo1lQdj",
          code: "ElInput",
          mId: 11000000006,
          style: {},
          props: {},
          initValue: {
            baseAttr: {
              width: 100,
              height: 20,
              left: 395,
              top: 197,
              zIndex: 1,
            },
            extendAttr: {
              defaultParams: false,
              orient: "horizon",
              space: 0,
              confirmTitle: "提示",
            },
          },
          events: {
            params: [
              {
                label: "按钮值",
                key: "value",
                value: "0001",
                annotation: "",
                state: true,
              },
              {
                label: "动态值",
                key: "dynamic",
                value: "123",
                annotation: "",
                state: false,
              }
            ],
            events: [
              { label: "按钮", key: "btn", annotation: "", },
              { label: "按钮1", key: "btn1", },
              { label: "按钮2", key: "btn2", }
            ],
            methods: [{ label: "值改变", key: "valueChange", annotation: "", }],
          },
          children: [],
          isReady: false,
        },
        {
          id: "vsqo_wz_K1IVn9M_MCTo1lQdj",
          mVersion: "0.0.0",
          kind: "element",
          name: "ElButton-vsqo_wz_K1IVn9M_MCTo1lQdj",
          code: "ElButton",
          mId: 11000000006,
          style: {},
          props: {},
          initValue: {
            baseAttr: {
              width: 100,
              height: 20,
              left: 395,
              top: 197,
              zIndex: 1,
            },
            extendAttr: {
              defaultParams: false,
              orient: "horizon",
              space: 0,
              confirmTitle: "提示",
            },
          },
          events: {
            params: [
              {
                label: "按钮值",
                key: "value",
                value: "0001",
                annotation: "",
                state: true,
              },
              {
                label: "动态值",
                key: "dynamic",
                value: "123",
                annotation: "",
                state: false,
              }
            ],
            events: [
              { label: "按钮", key: "btn", annotation: "", },
              { label: "按钮1", key: "btn1", },
              { label: "按钮2", key: "btn2", }
            ],
            methods: [{ label: "值改变", key: "valueChange", annotation: "", }],
          },
          children: [],
          isReady: false,
        }
      ],
      isReady: false,
    }
  ],
  events: {},
  attribute: {
    name: "New Page",
    layout: "absolute",
    canvasSize: {
      width: 1920,
      height: 1080,
    },
    isKeepAlive: false,
    isScroll: true,
    isHorizontalScroll: true,
    isShowScrollBar: true,
    isScale: true,
    backgroundType: "color",
    backgroundColor: "rgba(255,255,255,1)",
    isLoading: true,
    loadColor: "rgba(255,255,255,.5)",
    loadText: "加载中...",
    isGrid: true,
  },
  dataSources: {},
  routerInfo: { component: "940680405676", routerNumber: 1, },
};
