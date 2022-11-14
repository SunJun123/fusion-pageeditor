import { TreeNode, Engine } from './models'
import {
  IDesignerLayoutContext,
  IWorkspaceContext
} from './types'

export const DesignerLayoutContext:IDesignerLayoutContext = null

export const DesignerEngineContext:Engine = null

export const TreeNodeContext:TreeNode = null

export const WorkspaceContext:IWorkspaceContext = null

export const TreeNodes:Map<string, TreeNode> = new Map<string, TreeNode>()
