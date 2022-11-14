import { TComponentLevel, TProjectType } from "@/type";

export interface IComponentInfoVo {
  id: number;

  createTime: string;

  updateTime: string;

  createId: number;

  updateId: number;

  source: number;

  name: string;

  code: string;

  version: string;

  icon: string;

  level: TComponentLevel;

  projectType: TProjectType;

  categoryId: number;

  formatCode: string;

  sort: number;

  visibility: number;

  state: number;

  thumbnail: string;

  desp: string;

  type: string;
}

export interface IComponentCategoryType {

  code: string;

  // 数据源code
  formaCode: string;

  // 组件icon
  icon: string;

  // 组件id
  id: string;

  // 组件名称
  name: string;

  // 组件版本
  version: string;

  // 支持的端类型
  projectType: string;

  // 组件状态
  state: number;

  // 组件类型：component: 组件
  type: string;

  // 是否可见
  visibility: number;

  // 组件描述
  desc: string;

  compInfoVos: IComponentInfoVo[];
}

// 组件分类类型
export interface IComponentCategoryListType {

  code: string;

  // 分类组件组
  compInfoVos: IComponentCategoryType[];

  // 分类icon
  icon: string;

  // 分类名称
  name: string;

  // 分类类型：category: 分类
  type: string;
}
