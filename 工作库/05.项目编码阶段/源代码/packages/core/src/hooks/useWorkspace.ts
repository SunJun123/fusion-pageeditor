import { useDesigner } from './useDesigner'
import { WorkspaceContext } from '../context'
import { Workspace } from '../models'
import { globalThisPolyfill } from '../shared'

export const useWorkspace = (id?: string): Workspace => {
  const designer = useDesigner()
  const workspaceId = id || WorkspaceContext?.id
  if (workspaceId) {
    return designer.workbench.findWorkspaceById(workspaceId)
  }
  if (globalThisPolyfill['__DESIGNABLE_WORKSPACE__'])
    return globalThisPolyfill['__DESIGNABLE_WORKSPACE__']
  return designer.workbench.currentWorkspace
}
