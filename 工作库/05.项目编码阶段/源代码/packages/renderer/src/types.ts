import { Engine} from "fusion-core";
import { IBehavior, IResource } from "fusion-core/src/types";
import { Component, ComputedOptions } from "vue";

export interface IDesignerLayoutProps {
  prefixCls?: string
  theme?: 'dark' | 'light' | (string & {})
  variables?: Record<string, string>
  position?: 'fixed' | 'absolute' | 'relative'
}
export interface IDesignerProps extends IDesignerLayoutProps {
  engine: Engine
}

export interface IDesignerLayoutContext {
  theme?: 'dark' | 'light' | (string & {})
  prefixCls: string
  position: 'fixed' | 'absolute' | 'relative'
}

export interface IWorkspaceContext {
  id: string
  title?: string
  description?: string
}
export type DnFC= Component<any, any, any, ComputedOptions> & {
  Resource?: IResource[]
  Behavior?: IBehavior[]
}

export type DnComponent = Component<any, any, any, ComputedOptions> & {
  Resource?: IResource[]
  Behavior?: IBehavior[]
}
export interface IDesignerComponents {
  [key: string]: DnFC
}