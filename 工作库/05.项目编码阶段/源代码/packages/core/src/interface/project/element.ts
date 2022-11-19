import { FromNodeEvent, ITreeNode, TreeNode } from "../..";
import { useTreeNodes } from "../../hooks/useTreeNodes";
import {ITreeNodeMethodParam} from "./projectParam";
export interface EventsMethods {

  // 名称
  label: string;

  // key名
  key: string;

  // 提示信息
  annotation?: string;

  // 参数
  params?: ITreeNodeMethodParam[];
}

export interface EventsEvents {

  // 名称
  label: string;

  // key名
  key: string;

  // 提示信息
  annotation?: string;
}

export interface EventsParams {

  // 名称
  label: string;

  // key名
  key: string;

  // 值
  value: any;

  // 提示信息
  annotation?: string;

  // 获取完毕判断
  state: boolean;
}

//组件参数
export type EventsEleParams = Record<string, EventsParams[]>;

export interface ITreeNodeEvents {

  // 可触发事件
  methods?: EventsMethods[];

  // 可触发元素
  events?: EventsEvents[];

  // 抛出参数
  params?: EventsParams[];
}
export interface ITreeNodeBaseStyle {
  left?: number;
  top?: number;
  width?: number;
  height?: number;
  zIndex?: number;
  show?: boolean;
}
export interface InitValueBaseAttr {
  left: number;
  top: number;
  width: number;
  height: number;
  zIndex?: number;
}
export interface ITreeNodeInitValue {
  baseAttr: InitValueBaseAttr,
  extendAttr: Record<string, any>
}

export interface ITreeNodeFilter {
  id: string;

  /** 名称 */
  name: string;

  /** 若是容器組件，则有子节点，子节点多一个slotName键 */
  children?: Element[];
}
export interface IElement extends ITreeNode{}
const TreeNodes = useTreeNodes();
export class Element extends TreeNode {

  children: Element[] = [];

  constructor(node?: ITreeNode, parent?: TreeNode) {
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
          TreeNodes.delete(this.id);
          TreeNodes.set(node.id, this);
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
      name,
      sourceName,
      props,
    } = this;
    return {
      id,
      name,
      sourceName,
      props,
      children: this.children.map((element) => {
        return element.serialize();
      }),
    };
  }
}
