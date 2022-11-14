import { FromNodeEvent } from "../../events";
import { useTreeNodes } from "../../hooks/useTreeNodes";
import { ITreeNode, TreeNode } from "../../models/TreeNode";
import { Element } from "./element";

/** 可触发事件中关联事件相关信息接口定义 */
export interface RelationOption {

  //目标组件id
  targetId: string;

  //目标组件名称
  targetName: string;

  //目标方法标识
  method: string;

  //   type: string;//触发类型，如click、change当前只有click

  //方法所需参数
  params: any[];
}

/** 可触发事件中路由相关信息接口定义 */
export interface RouterOption {
  jumpType: number; //路由跳转展示类型 1：页面覆盖；2：新页面
  sourceType: number; //跳转类型 1:页面；2：链接
  page: any; //跳转的页面信息sourceType为1时有效
  url: string; //跳转的链接sourceType为2时有效
  isInMemu: boolean; //是否菜单内跳转 sourceType为1时有效
  keepAlive: boolean; //是否路由保持 sourceType为1时有效
  params: any[]; //跳转参数
}

//事件数据源类型接口定义
export interface DatasourceOption {

  //数据源名称
  name: string;

  // 数据源地址id
  urlId?: number;
  dataUrl?: string; // 数据源地址
  params?: dataSourcesParamsType[]; // 参数
  isOperationTip: boolean; //是否增加操作提示
  operationTitle?: string; //操作标题
  operationConfirm?: string; //操作确认文案
  operationCancel?: string; //操作取消文案
}

/** 可触发事件接口定义 */
export interface Ievet {
  id: string; //事件id
  name: string; //事件名称
  type: number; //relation关联1、route路由2、calculation计算脚本3、custom自定义脚本4、dataSource数据源5、builtIn内置方法6
  trigger: string; //触发元素名称
  builtIn?: number; //内置方法编码，当type为6存在
  routerOption?: RouterOption; //路由事件，当type为2存在
  relationOption?: RelationOption; //关联事件，当type为1存在
  isDatasourceSuccess?: boolean; //数据源是否执行成功标识，当type为5存在
  datasource?: DatasourceOption; //数据源信息，当type为5存在
  isCallback?: boolean; //是否有回调
  methodCatch?: any[]; //失败回调
  methodThen?: any[]; //成功回调
}

// 数据源参数类型，由后端传递过来
export interface dataSourcesParamsType {

  // 描述
  description: string;

  // 名称
  name: string;

  // 选项
  option: string | object;

  // 参数类型
  paramType: string;

  // 是否必填 1:必填
  required: string;

  // 标题
  title: string;

  // 类型
  type: string;

  // 值，结构未确定，需要等待参数选择器确定数据结构
  value: string;
}

//组件数据源结构定义
export interface dataSourcesType {

  // 数据源id, ds_*,*表示8位自增数据
  id: string;

  // 数据源地址id
  urlId?: number;

  // 组件code
  code: string;

  // 数据源地址
  dataUrl?: string;

  // 数据源类型："customize"：自定义；"config"：数据源
  definiteMethod: string;

  // 是否自触发
  isSelfTriggering?: boolean;

  // 是否定时
  isInterval?: boolean;

  // 间隔时间
  intervalTime?: number;

  // 参数
  params?: dataSourcesParamsType[];

  // 自定义值
  value?: string;
}
export interface IPage extends ITreeNode{}
const TreeNodes = useTreeNodes();
export class Page extends TreeNode{
  children: Element[] = [];
  constructor(node?: ITreeNode, parent?: TreeNode){
    super(node,parent)
    if (node) {
      this.from(node);
    }
  }
  from(node?: ITreeNode) {
    if (!node) return;
    return this.triggerMutation(
      new FromNodeEvent({
        target: this,
        source: node,
      }),
      () => {
        if (node.id && node.id !== this.id) {
          TreeNodes.delete(this.id.toString());
          TreeNodes.set(node.id.toString(), this);
          this.id = node.id;
        }
        if (node.name) {
          this.name = node.name;
        }
        this.props = node.props ?? {};
        if (node.children) {
          this.children =
            node.children?.map?.((node) => {
              return new Element(node, this);
            }) || [];
        }
      }
    );
  }
  serialize(): ITreeNode {
    const {
      id,
      kind,
      name,
      sourceName,
      props,
    } = this;
    return {
      id,
      kind,
      name,
      sourceName,
      props,
      children: this.children.map((element) => {
        return element.serialize();
      }),
    };
  }

}

export interface IRouterInfo {
  component: string|number;
  children?: IRouterInfo[];
  routerNumber: number;
}

export interface ITreeNodeInfo {
  pageData: ITreeNode | {};
  routerInfo: IRouterInfo | {};
  compParams: {};
  compDependency: Array<string>;
}

export interface PageTreeEle {
  id: number;
  name: string;
}
export type PageTree = PageTreeEle[];

// 生成页面模板接口
export interface ITreeNodeTemplate {

  // 模板
  templateCode?: string;

  // 引入依赖项
  scriptCode?: string;

  // 引入组件
  componentsCode?: string;

  // 样式
  styleCode?: string;

  // 完整模板
  completeCode?: string;
}

export interface SkeletonStyle {
  width: string;
  height: string;
  top: string;
  left: string;
}

// 页面属性
export interface attrType {
  name: string;
  layout: string;
  canvasSize: {
    width: number;
    height: number;
  };
  isKeepAlive: boolean;
  isScroll: boolean;
  isHorizontalScroll: boolean;
  isShowScrollBar: boolean;
  isScale: boolean;
  backgroundType: string;
  backgroundColor: string;
  isLoading: boolean;
  loadColor: string;
  loadText: string;
  isGrid: boolean;
}

export interface DomPosition {
	left: string | number,
	top: string | number
}

export interface AfterDomPosition {
	afterLeft: string | number,
	afterTop: string | number
}

export interface CanvasSize {
  width: number;
  height: number;
}
